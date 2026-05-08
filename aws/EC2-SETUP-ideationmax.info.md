# EC2 Amazon Linux 2023 — Setup Guide
## transcribe.doc-u-meant.com

---

## Prerequisites
- EC2 instance running Amazon Linux 2023
- Elastic IP assigned to the instance
- A record added at domain registrar:
  ```
  Type:  A
  Name:  transcribe.doc-u-meant.com
  Value: YOUR-ELASTIC-IP
  TTL:   300
  ```
- DNS propagated — verify before running Certbot:
  ```bash
  nslookup transcribe.doc-u-meant.com
  ```

---

## Step 1 — System Update

```bash
sudo dnf update -y
```

---

## Step 2 — Install Docker

```bash
sudo dnf install -y docker
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER
newgrp docker
```

Verify:
```bash
docker --version
```

---

## Step 3 — Install Docker Compose

```angular2html
sudo curl -L "https://github.com/docker/compose/releases/download/v2.17.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
# DO NOT do: sudo chmod 666 /var/run/docker.sock  # Avoid this for security reasons
docker-compose --version
```

> Note: on AL2023 use `docker compose` (space) not `docker-compose` (hyphen)

---

## Step 4 — Install nginx

```bash
sudo dnf install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

Verify:
```bash
curl http://localhost
```

---

## Step 5 — Configure nginx

Create the config file:
```bash
sudo nano /etc/nginx/conf.d/transcribe.conf
```

Paste this content:
```nginx
server {
    listen 80;
    server_name transcribe.ideationmax.info;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name transcribe.ideationmax.info;

    # SSL Certificates (use your own cert paths)
    ssl_certificate     /etc/letsencrypt/live/transcribe.ideationmax.info/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/transcribe.ideationmax.info/privkey.pem;

    # WebSocket endpoint
    location /ws/transcribe {
        proxy_pass http://127.0.0.1:8000;  # Your backend port

        # WebSocket upgrade headers
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Pass real client info
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Keep connection alive (important for long transcriptions)
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
        proxy_connect_timeout 60s;
    }
}
```

Test and reload:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 6 — Install Certbot

```bash
sudo dnf install -y python3 augeas-libs
sudo python3 -m venv /opt/certbot/
sudo /opt/certbot/bin/pip install --upgrade pip
sudo /opt/certbot/bin/pip install certbot certbot-nginx
sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot
```

Get SSL certificate:
```bash
sudo certbot --nginx -d transcribe.doc-u-meant.com
```
You will see this:
```angular2html
Enter email address or hit Enter to skip.
 (Enter 'c' to cancel): hanyelgaml@ideationmax.com

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please read the Terms of Service at:
https://letsencrypt.org/documents/LE-SA-v1.6-August-18-2025.pdf
You must agree in order to register with the ACME server. Do you agree?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: y

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing, once your first certificate is successfully issued, to
share your email address with the Electronic Frontier Foundation, a founding
partner of the Let's Encrypt project and the non-profit organization that
develops Certbot? We'd like to send you email about our work encrypting the web,
EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: y
Account registered.
Requesting a certificate for transcribe.ideationmax.info

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/transcribe.ideationmax.info/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/transcribe.ideationmax.info/privkey.pem
This certificate expires on 2026-06-15.
These files will be updated when the certificate renews.

Deploying certificate
Successfully deployed certificate for transcribe.ideationmax.info to /etc/nginx/conf.d/transcribe.conf
Congratulations! You have successfully enabled HTTPS on https://transcribe.ideationmax.info

NEXT STEPS:
- The certificate will need to be renewed before it expires. Certbot can automatically renew the certificate in the background, but you may need to take steps to enable that functionality. See https://certbot.org/renewal-setup for instructions.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le

```

Test auto-renewal:
```bash
sudo certbot renew --dry-run
```

> Certbot will automatically update the nginx config for HTTPS
> and add an HTTP → HTTPS redirect.

---
#  Customer Create Deploy Key
```angular2html
ssh-keygen -t ed25519 -C "hanyelgaml@ideationmax.com"
```
- They can save it to the default location or a custom path (e.g., `~/.ssh/github_customer`)
- They **send you the public key** (the `.pub` file contents), which looks like:
```angular2html
cat /home/ec2-user/.ssh/id_ed25519.pub
```
```
  ssh-ed25519 AAAAC3Nza... customer@example.com
```

---

## Step 2: Add the Deploy Key to Your Repo
1. Go to your repo on GitHub
2. **Settings** → **Deploy keys** → **Add deploy key**
3. Give it a **title** (e.g., "Customer ABC")
4. Paste their **public key**
5. Choose access level:
   - ☐ **Allow write access** → leave unchecked for **read-only**
   - ☑ **Allow write access** → check if they need to push
6. Click **Add key**

---

## Step 3: Customer Configures Their SSH (Optional but Recommended)
If they saved the key to a custom path, they add this to `~/.ssh/config`:
```
Host github.com
  IdentityFile ~/.ssh/github_customer
```

## Step 7 — Install Git & Clone Repo

```bash
sudo dnf install -y git
git clone YOUR-REPO-URL
cd transcribe-medical
```

---

## Step 8 — Configure Environment

```bash
nano backend/.env
```

Set production values:
```
BASE_URL=https://transcribe.doc-u-meant.com
AWS_REGION=us-east-1
S3_BUCKET=your-s3-bucket-name
```

---

## Step 9 — Run the Container

```bash
docker compose up --build -d
```

Check it is running:
```bash
docker compose ps
docker compose logs -f
```

---

## Step 10 — Verify End to End

```bash
# Health check
curl https://transcribe.doc-u-meant.com/health

# Widget
# Open in browser: https://transcribe.doc-u-meant.com/widget
```

---

## Useful Commands

| Command | Description |
|---|---|
| `docker compose up --build -d` | Build and start container |
| `docker compose down` | Stop container |
| `docker compose logs -f` | Stream logs |
| `docker compose restart` | Restart container |
| `sudo systemctl reload nginx` | Reload nginx config |
| `sudo certbot renew --dry-run` | Test SSL renewal |
| `nslookup transcribe.doc-u-meant.com` | Verify DNS |

---

## EC2 Security Group — Required Ports

| Port | Protocol | Source | Purpose |
|---|---|---|---|
| 22 | TCP | Your IP | SSH |
| 80 | TCP | 0.0.0.0/0 | HTTP (redirects to HTTPS) |
| 443 | TCP | 0.0.0.0/0 | HTTPS + WSS |

> Port 8000 does NOT need to be open publicly —
> nginx proxies all traffic internally.

---

## Order of Operations (Critical)

1. EC2 running + Elastic IP assigned
2. A record added at registrar
3. DNS propagated (`nslookup` confirms)
4. nginx installed and config in place
5. **Certbot runs** — domain must resolve first
6. Docker container started
7. End-to-end test
