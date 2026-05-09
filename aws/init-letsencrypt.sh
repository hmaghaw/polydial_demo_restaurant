#!/bin/bash
# ══════════════════════════════════════════════════════════
#  init-letsencrypt.sh
#  Issues Let's Encrypt certificates for all 6 domains
#  using DNS-01 challenge via certbot-dns-route53.
#
#  Prerequisites:
#    - Nginx installed on this EC2 host
#    - This EC2 instance has an IAM role with the
#      permissions in iam-policy.json attached
#    - All domains have their DNS hosted in Route 53
#    - Ports 80 and 443 open in the EC2 Security Group
#
#  Run once on first deploy:
#    chmod +x init-letsencrypt.sh
#    sudo ./init-letsencrypt.sh
# ══════════════════════════════════════════════════════════

set -e

# ── CONFIGURE THIS ────────────────────────────────────────
EMAIL="hanyelgaml@ideationmax.com"   # Let's Encrypt expiry notifications
STAGING=0                # Set to 1 while testing (no rate limits)
# ─────────────────────────────────────────────────────────

DOMAINS=(
  "coffeehome.ca www.coffeehome.ca"
  "halalcooking.ca www.halalcooking.ca"
  "islamic-heritage.ca www.islamic-heritage.ca"
  "muslimfamily.ca www.muslimfamily.ca"
  "wefind.ca www.wefind.ca"
  "cardsmax.com www.cardsmax.com"
)

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# ── HELPERS ───────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
info()  { echo -e "${GREEN}[INFO]${NC}  $1"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# ── PREFLIGHT ─────────────────────────────────────────────
[[ $EUID -ne 0 ]] && error "Run as root: sudo ./init-letsencrypt.sh"
[[ "$EMAIL" == "your@email.com" ]] && error "Set your email address at the top of this script."

command -v nginx  &>/dev/null || error "nginx not found on this host."
command -v certbot &>/dev/null || error "certbot not found. Install it first (see below)."
command -v docker-compose &>/dev/null || error "docker-compose not found."

# Verify the Route 53 DNS plugin is installed
python3 -c "import certbot_dns_route53" 2>/dev/null || {
  error "certbot-dns-route53 plugin not found. Install it:
  Ubuntu/Debian:    sudo apt install python3-certbot-dns-route53
  Amazon Linux 2:   sudo pip3 install certbot-dns-route53
  Amazon Linux 2023: sudo pip3 install certbot-dns-route53
  Then re-run this script."
}

# Verify AWS credentials are available (via instance role or env vars)
aws sts get-caller-identity &>/dev/null 2>&1 || {
  # aws cli may not be present — check boto3 which certbot uses directly
  python3 -c "
import boto3
try:
    boto3.client('sts').get_caller_identity()
    print('AWS credentials OK')
except Exception as e:
    print('FAIL: ' + str(e))
    exit(1)
" || error "No AWS credentials found. Attach the IAM role from iam-policy.json to this EC2 instance."
}

info "All prerequisites met."

# ── STEP 1: TLS PARAMETERS ────────────────────────────────
if [ ! -f /etc/letsencrypt/options-ssl-nginx.conf ]; then
  info "Downloading recommended TLS parameters..."
  mkdir -p /etc/letsencrypt
  curl -fsSL \
    https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf \
    -o /etc/letsencrypt/options-ssl-nginx.conf
fi

if [ ! -f /etc/letsencrypt/ssl-dhparams.pem ]; then
  info "Generating DH params (~30s)..."
  openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048 2>/dev/null
fi

# ── STEP 2: ISSUE ALL CERTIFICATES FIRST ─────────────────
# With DNS-01 we don't need nginx running at all to get certs.
# We issue everything before nginx starts — no dummy cert hack needed.

STAGING_FLAG=""
[ $STAGING -eq 1 ] && STAGING_FLAG="--staging" && \
  warn "Using STAGING server — certs won't be browser-trusted."

for ENTRY in "${DOMAINS[@]}"; do
  APEX=$(echo "$ENTRY" | awk '{print $1}')

  D_FLAGS=""
  for D in $ENTRY; do D_FLAGS="$D_FLAGS -d $D"; done

  info "Requesting certificate for: ${ENTRY}..."

  certbot certonly \
    --dns-route53 \
    --non-interactive \
    --agree-tos \
    --no-eff-email \
    --email "$EMAIL" \
    --rsa-key-size 4096 \
    $STAGING_FLAG \
    $D_FLAGS

  info "  Certificate issued for ${APEX} ✓"
done

# ── STEP 3: INSTALL NGINX CONFIGS ────────────────────────
info "Installing nginx snippets..."
mkdir -p /etc/nginx/snippets
cp "${SCRIPT_DIR}/nginx/snippets/ssl.conf" /etc/nginx/snippets/ssl.conf

info "Installing site configs..."
for CONF in "${SCRIPT_DIR}/nginx/sites-available/"*.conf; do
  BASENAME=$(basename "$CONF")
  cp "$CONF" /etc/nginx/sites-available/
  ln -sf "/etc/nginx/sites-available/${BASENAME}" \
         "/etc/nginx/sites-enabled/${BASENAME}"
  info "  Enabled: ${BASENAME}"
done

# Remove the default nginx site if it exists (conflicts on port 80)
rm -f /etc/nginx/sites-enabled/default

# ── STEP 4: START NGINX ───────────────────────────────────
# Certs exist now — nginx starts cleanly with real certificates.
info "Testing nginx config..."
nginx -t || error "nginx config test failed — check errors above."

info "Starting / reloading nginx..."
systemctl enable nginx
systemctl reload nginx 2>/dev/null || systemctl start nginx
info "Nginx is up ✓"

# ── STEP 5: START APP CONTAINERS ─────────────────────────
info "Starting app containers..."
docker-compose -f "${SCRIPT_DIR}/docker-compose.yml" up -d
info "App containers are up ✓"

# ── STEP 6: INSTALL RENEWAL DEPLOY HOOK ──────────────────
# certbot handles its own renewal schedule via systemd timer or cron.
# This hook reloads nginx whenever any cert is successfully renewed.

HOOK_DIR="/etc/letsencrypt/renewal-hooks/deploy"
mkdir -p "$HOOK_DIR"

cat > "${HOOK_DIR}/reload-nginx.sh" << 'EOF'
#!/bin/bash
# Auto-reload nginx after certbot renews any certificate
systemctl reload nginx
echo "[$(date)] nginx reloaded after cert renewal" \
  >> /var/log/letsencrypt/nginx-reload.log
EOF

chmod +x "${HOOK_DIR}/reload-nginx.sh"
info "Renewal hook installed: ${HOOK_DIR}/reload-nginx.sh"

# Confirm renewal automation is active
if systemctl is-enabled certbot.timer &>/dev/null; then
  info "certbot.timer is active — renewals handled by systemd ✓"
elif crontab -l 2>/dev/null | grep -q certbot || \
     [ -f /etc/cron.d/certbot ]; then
  info "certbot cron found — renewals handled by cron ✓"
else
  warn "No certbot timer or cron found. Adding cron fallback..."
  echo "0 3 * * * root certbot renew --quiet" > /etc/cron.d/certbot
  info "Cron fallback written to /etc/cron.d/certbot"
fi

# ── DONE ─────────────────────────────────────────────────
echo ""
echo -e "${GREEN}══════════════════════════════════════════${NC}"
echo -e "${GREEN}  All certificates issued successfully!   ${NC}"
echo -e "${GREEN}══════════════════════════════════════════${NC}"
echo ""
echo "  https://coffeehome.ca"
echo "  https://halalcooking.ca"
echo "  https://islamic-heritage.ca"
echo "  https://muslimfamily.ca"
echo "  https://wefind.ca"
echo "  https://cardsmax.com"
echo ""
echo "Useful commands:"
echo "  Check certs:    sudo certbot certificates"
echo "  Test renewal:   sudo certbot renew --dry-run"
echo "  Nginx reload:   sudo systemctl reload nginx"
echo "  App containers: docker-compose ps"
echo ""
