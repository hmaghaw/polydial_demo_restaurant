import { useState, useEffect } from "react";

/* ══════════════════════════════════════════════
   WEFIND — wefind.ca
   We find what young people want to eat
   from around the world
   Bilingual Arabic / English · PolyDial ready
══════════════════════════════════════════════ */

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;600;700;800&family=Cairo:wght@300;400;500;600;700;900&family=Tajawal:wght@300;400;500;700;800&display=swap');
`;

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --void:    #08060C;
  --dark:    #100D18;
  --panel:   #16121F;
  --card:    #1C1828;
  --border:  rgba(255,255,255,0.08);
  --border2: rgba(255,255,255,0.13);
  --lime:    #BFFF00;
  --lime-d:  #96CC00;
  --pink:    #FF2D78;
  --pink-l:  #FF6FA0;
  --cyan:    #00E5FF;
  --purple:  #9B5CFF;
  --orange:  #FF6B1A;
  --yellow:  #FFD600;
  --white:   #F5F2FF;
  --muted:   rgba(245,242,255,0.45);
  --muted2:  rgba(245,242,255,0.25);
  --r:   16px;
  --rsm: 10px;
  --fen: 'Syne', sans-serif;
  --far: 'Tajawal', sans-serif;
  --fb:  'Cairo', sans-serif;
}
html { scroll-behavior: smooth; }
body { background: var(--void); color: var(--white); font-family: var(--fb); }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-thumb { background: var(--lime); border-radius: 4px; }

/* ══ NOISE TEXTURE OVERLAY ══ */
body::before {
  content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  opacity: 0.4;
}

/* ══ NAV ══ */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  background: rgba(8,6,12,0.9); backdrop-filter: blur(20px);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 5%; height: 68px;
  border-bottom: 1px solid var(--border);
}
.nav-brand { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.nav-logo-box {
  width: 38px; height: 38px; border-radius: 10px;
  background: var(--lime); display: flex; align-items: center; justify-content: center;
  font-size: 20px; font-family: var(--fen); font-weight: 800;
  color: var(--void); letter-spacing: -1px; line-height: 1;
}
.nav-wordmark-en { font-family: var(--fen); font-size: 20px; font-weight: 800; color: var(--white); letter-spacing: -0.5px; }
.nav-wordmark-ar { font-family: var(--far); font-size: 20px; font-weight: 800; color: var(--white); }
.nav-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--lime); flex-shrink: 0; }
.nav-links { display: flex; gap: 28px; }
.nav-link {
  font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 500;
  color: var(--muted); cursor: pointer; transition: color .2s; letter-spacing: 0.2px;
}
.nav-link:hover { color: var(--lime); }
.nav-right { display: flex; align-items: center; gap: 10px; }
.lang-btn {
  background: var(--border); border: 1px solid var(--border2);
  color: var(--white); font-family: var(--fb); font-size: 12px; font-weight: 700;
  padding: 6px 14px; border-radius: 20px; cursor: pointer; transition: all .2s;
}
.lang-btn:hover { background: var(--lime); color: var(--void); border-color: var(--lime); }
.order-btn-nav {
  background: var(--lime); border: none; color: var(--void);
  font-family: var(--fen); font-size: 13px; font-weight: 800;
  padding: 9px 20px; border-radius: 20px; cursor: pointer;
  transition: all .2s; letter-spacing: -0.2px;
}
.order-btn-nav:hover { background: #D4FF20; transform: translateY(-1px); }

/* ══ HERO ══ */
.hero {
  min-height: 100vh; display: flex; flex-direction: column;
  align-items: flex-start; justify-content: center;
  padding: 110px 5% 80px; position: relative; overflow: hidden;
}
/* Glow blobs */
.glow-blob {
  position: absolute; border-radius: 50%; filter: blur(80px);
  pointer-events: none; opacity: .18;
}
.hero-ticker {
  display: flex; gap: 0; overflow: hidden; width: 100%;
  margin-bottom: 36px; position: relative; z-index: 1;
}
.ticker-track {
  display: flex; gap: 0; animation: ticker 20s linear infinite; flex-shrink: 0;
}
@keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
.ticker-item {
  display: flex; align-items: center; gap: 10px;
  padding: 0 28px; border-right: 1px solid var(--border);
  font-family: 'Space Grotesk', sans-serif; font-size: 12px;
  font-weight: 600; color: var(--muted); white-space: nowrap; flex-shrink: 0;
}
.ticker-item span { font-size: 18px; }
.hero-chip {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(191,255,0,.1); border: 1px solid rgba(191,255,0,.25);
  border-radius: 20px; padding: 7px 16px; margin-bottom: 24px;
  font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 700;
  color: var(--lime); letter-spacing: 1.5px; text-transform: uppercase;
  position: relative; z-index: 1;
}
.hero-chip-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--lime); animation: blink 1.5s infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
.hero-h-en {
  font-family: var(--fen); font-size: clamp(52px,7.5vw,100px);
  font-weight: 800; color: var(--white); line-height: .96;
  margin-bottom: 24px; letter-spacing: -2px; max-width: 820px;
  position: relative; z-index: 1;
}
.hero-h-en .accent-lime { color: var(--lime); }
.hero-h-en .accent-pink { color: var(--pink); }
.hero-h-ar {
  font-family: var(--far); font-size: clamp(44px,6.5vw,84px);
  font-weight: 800; color: var(--white); line-height: 1.2;
  margin-bottom: 24px; max-width: 800px;
  position: relative; z-index: 1;
}
.hero-h-ar .accent-lime { color: var(--lime); }
.hero-h-ar .accent-pink { color: var(--pink); }
.hero-sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 17px; color: var(--muted); line-height: 1.7;
  max-width: 520px; margin-bottom: 40px; font-weight: 400;
  position: relative; z-index: 1;
}
.hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 56px; position: relative; z-index: 1; }
.btn-lime {
  background: var(--lime); border: none; color: var(--void);
  font-family: var(--fen); font-size: 15px; font-weight: 800;
  padding: 15px 32px; border-radius: 50px; cursor: pointer; transition: all .2s;
  letter-spacing: -0.3px;
}
.btn-lime:hover { background: #D4FF20; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(191,255,0,.3); }
.btn-outline-white {
  background: transparent; border: 1.5px solid var(--border2);
  color: var(--white); font-family: var(--fen); font-size: 15px; font-weight: 700;
  padding: 14px 30px; border-radius: 50px; cursor: pointer; transition: all .2s;
  letter-spacing: -0.3px;
}
.btn-outline-white:hover { border-color: var(--lime); color: var(--lime); }
.hero-stats { display: flex; gap: 40px; flex-wrap: wrap; position: relative; z-index: 1; }
.hero-stat-n {
  font-family: var(--fen); font-size: 36px; font-weight: 800;
  line-height: 1; letter-spacing: -1px;
}
.hero-stat-l { font-size: 11px; color: var(--muted); margin-top: 4px; letter-spacing: 0.3px; font-family: 'Space Grotesk', sans-serif; }
/* hero food grid */
.hero-food-grid {
  position: absolute; top: 50%; inset-inline-end: 4%;
  transform: translateY(-50%); z-index: 1;
  display: grid; grid-template-columns: 1fr 1fr 1fr;
  gap: 10px; width: 340px;
}
.hfg-cell {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 14px; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 16px 10px; cursor: default; transition: all .2s;
  font-size: 32px;
}
.hfg-cell:hover { border-color: var(--lime); transform: scale(1.05); }
.hfg-cell.featured { grid-column: span 3; font-size: 48px; padding: 20px; }
.hfg-label { font-size: 10px; color: var(--muted); margin-top: 6px; font-weight: 600; font-family: 'Space Grotesk',sans-serif; text-align: center; }
.hfg-trend { font-size: 8px; color: var(--lime); font-weight: 700; margin-top: 2px; letter-spacing: .5px; }

/* ══ TRENDING SECTION ══ */
.trending-section { background: var(--dark); padding: 80px 5%; }
.section-eyebrow {
  font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 700;
  letter-spacing: 2.5px; text-transform: uppercase;
  display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
}
.eyebrow-bar { width: 28px; height: 2px; border-radius: 2px; }
.sec-h-en {
  font-family: var(--fen); font-size: clamp(28px,4vw,50px);
  font-weight: 800; color: var(--white); line-height: 1.05;
  margin-bottom: 12px; letter-spacing: -1px;
}
.sec-h-ar {
  font-family: var(--far); font-size: clamp(24px,3.5vw,44px);
  font-weight: 800; color: var(--white); line-height: 1.4; margin-bottom: 12px;
}
.sec-p { font-size: 14px; color: var(--muted); line-height: 1.8; max-width: 520px; font-family: 'Space Grotesk', sans-serif; }
.trend-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px,1fr)); gap: 16px; margin-top: 36px; }
.trend-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--r); overflow: hidden; cursor: pointer; transition: all .25s;
  position: relative;
}
.trend-card:hover { transform: translateY(-5px); border-color: var(--border2); box-shadow: 0 20px 50px rgba(0,0,0,.5); }
.trend-img {
  height: 180px; display: flex; align-items: center; justify-content: center;
  font-size: 80px; position: relative;
}
.trend-rank {
  position: absolute; top: 12px; inset-inline-start: 12px;
  background: var(--lime); color: var(--void);
  font-family: var(--fen); font-size: 12px; font-weight: 800;
  padding: 3px 10px; border-radius: 8px; letter-spacing: 0;
}
.trend-viral {
  position: absolute; top: 12px; inset-inline-end: 12px;
  background: rgba(255,45,120,.15); border: 1px solid rgba(255,45,120,.3);
  color: var(--pink); font-size: 9px; font-weight: 800; padding: 3px 8px;
  border-radius: 8px; letter-spacing: .5px; text-transform: uppercase;
}
.trend-body { padding: 18px 18px 20px; }
.trend-country { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: var(--muted); margin-bottom: 6px; letter-spacing: .3px; font-family: 'Space Grotesk',sans-serif; }
.trend-name { font-family: var(--fen); font-size: 18px; font-weight: 800; color: var(--white); margin-bottom: 4px; letter-spacing: -0.3px; }
.trend-name-ar { font-family: var(--far); font-size: 17px; font-weight: 700; color: var(--white); margin-bottom: 4px; }
.trend-desc { font-size: 12px; color: var(--muted); line-height: 1.65; margin-bottom: 14px; min-height: 50px; font-family: 'Space Grotesk',sans-serif; }
.trend-footer { display: flex; align-items: center; justify-content: space-between; }
.trend-price { font-family: var(--fen); font-size: 19px; font-weight: 800; color: var(--lime); letter-spacing: -0.5px; }
.add-btn {
  width: 34px; height: 34px; border-radius: 50%; border: none;
  background: var(--lime); color: var(--void); font-size: 20px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .2s; line-height: 1; font-weight: 700;
}
.add-btn:hover { background: #D4FF20; transform: scale(1.1); }
.trend-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
.trend-tag {
  font-size: 9px; font-weight: 800; padding: 3px 8px; border-radius: 6px;
  letter-spacing: .5px; text-transform: uppercase; font-family: 'Space Grotesk',sans-serif;
}
.tag-tiktok { background: rgba(0,229,255,.1); color: var(--cyan); border: 1px solid rgba(0,229,255,.2); }
.tag-insta  { background: rgba(255,107,26,.1); color: var(--orange); border: 1px solid rgba(255,107,26,.2); }
.tag-street { background: rgba(155,92,255,.1); color: var(--purple); border: 1px solid rgba(155,92,255,.2); }
.tag-viral  { background: rgba(255,45,120,.1); color: var(--pink); border: 1px solid rgba(255,45,120,.2); }
.tag-fusion { background: rgba(255,214,0,.1); color: var(--yellow); border: 1px solid rgba(255,214,0,.2); }
.tag-new    { background: rgba(191,255,0,.1); color: var(--lime); border: 1px solid rgba(191,255,0,.2); }

/* ══ VIBE FILTERS ══ */
.vibe-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
.vibe-btn {
  display: flex; align-items: center; gap: 7px;
  padding: 9px 18px; border-radius: 20px;
  border: 1px solid var(--border); background: var(--panel);
  cursor: pointer; font-family: 'Space Grotesk', sans-serif;
  font-size: 12px; font-weight: 700; color: var(--muted); transition: all .2s;
}
.vibe-btn.active { border-color: var(--lime); background: rgba(191,255,0,.1); color: var(--lime); }
.vibe-btn:hover:not(.active) { border-color: var(--border2); color: var(--white); }

/* ══ HOW WE FIND ══ */
.how-section { background: var(--panel); padding: 88px 5%; }
.how-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; margin-top: 48px; }
.how-steps { display: flex; flex-direction: column; gap: 0; }
.how-step { display: flex; gap: 20px; align-items: flex-start; padding: 24px 0; border-bottom: 1px solid var(--border); cursor: default; transition: all .2s; }
.how-step:last-child { border: none; }
.how-step:hover .step-num-box { background: var(--lime); color: var(--void); }
.step-num-box {
  width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
  background: var(--card); border: 1px solid var(--border2);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--fen); font-size: 18px; font-weight: 800; color: var(--lime);
  transition: all .2s;
}
.step-title { font-family: var(--fen); font-size: 16px; font-weight: 800; color: var(--white); margin-bottom: 5px; letter-spacing: -0.3px; }
.step-desc { font-size: 13px; color: var(--muted); line-height: 1.7; font-family: 'Space Grotesk',sans-serif; }
/* discovery visual */
.discovery-visual {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 24px; padding: 28px; position: relative; overflow: hidden;
}
.disc-inner-glow {
  position: absolute; width: 200px; height: 200px; border-radius: 50%;
  background: radial-gradient(circle, rgba(191,255,0,.15), transparent 70%);
  top: -60px; inset-inline-end: -60px; pointer-events: none;
}
.disc-title { font-family: var(--fen); font-size: 14px; font-weight: 800; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 20px; }
.disc-items { display: flex; flex-direction: column; gap: 10px; }
.disc-item {
  background: var(--panel); border: 1px solid var(--border);
  border-radius: 12px; padding: 12px 16px;
  display: flex; align-items: center; gap: 12px;
  transition: all .2s;
}
.disc-item:hover { border-color: var(--lime); }
.disc-emoji { font-size: 24px; }
.disc-info { flex: 1; }
.disc-name { font-size: 13px; font-weight: 700; color: var(--white); }
.disc-src  { font-size: 10px; color: var(--muted); margin-top: 2px; font-family: 'Space Grotesk',sans-serif; }
.disc-score { font-family: var(--fen); font-size: 14px; font-weight: 800; }
.disc-bar-wrap { height: 3px; background: var(--border); border-radius: 3px; margin-top: 6px; }
.disc-bar { height: 3px; border-radius: 3px; background: var(--lime); }

/* ══ ORDER / POLYDIAL ══ */
.order-section {
  background: var(--void); padding: 88px 5%;
  position: relative; overflow: hidden;
}
.order-glow-1 { position: absolute; width: 400px; height: 400px; border-radius: 50%; filter: blur(100px); background: rgba(191,255,0,.08); top: -100px; left: -100px; pointer-events: none; }
.order-glow-2 { position: absolute; width: 300px; height: 300px; border-radius: 50%; filter: blur(80px); background: rgba(255,45,120,.06); bottom: -80px; right: -80px; pointer-events: none; }
.order-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.order-content .sec-h-en { color: var(--white); }
.order-content .sec-h-ar { color: var(--white); }
.order-features { display: flex; flex-direction: column; gap: 12px; margin-top: 28px; }
.order-feat {
  display: flex; gap: 14px; align-items: center;
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--rsm); padding: 14px 16px; transition: all .2s;
}
.order-feat:hover { border-color: rgba(191,255,0,.25); }
.of-icon { font-size: 22px; flex-shrink: 0; }
.of-title { font-family: var(--fen); font-size: 14px; font-weight: 800; color: var(--lime); margin-bottom: 2px; letter-spacing: -0.2px; }
.of-sub { font-size: 12px; color: var(--muted); font-family: 'Space Grotesk',sans-serif; }
/* device */
.pd-device {
  background: #0A0810; border-radius: 34px; padding: 8px;
  box-shadow: 0 0 0 1px rgba(191,255,0,.2), 0 32px 80px rgba(0,0,0,.7);
}
.pd-screen {
  background: var(--dark); border-radius: 28px;
  min-height: 560px; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 36px 24px; gap: 16px; text-align: center;
  border: 1px solid var(--border);
}
.pd-logo { width: 70px; height: 70px; border-radius: 20px; background: linear-gradient(135deg,#0055FF,#003BB3); display: flex; align-items: center; justify-content: center; font-size: 34px; box-shadow: 0 8px 28px rgba(0,85,255,.35); }
.pd-title { font-family: var(--fen); font-size: 17px; font-weight: 800; color: var(--white); letter-spacing: -0.3px; }
.pd-sub { font-size: 13px; color: var(--muted); line-height: 1.7; max-width: 250px; font-family: 'Space Grotesk',sans-serif; }
.pd-code { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 10px 16px; font-size: 10px; font-family: monospace; color: var(--muted); letter-spacing: .4px; word-break: break-all; }
.pd-note { font-size: 11px; color: var(--muted); display: flex; align-items: center; gap: 6px; font-family: 'Space Grotesk',sans-serif; }

/* ══ VISIT ══ */
.visit-section { background: var(--panel); padding: 88px 5%; }
.visit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
.info-row {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--r); padding: 20px 22px; margin-bottom: 12px;
  display: flex; gap: 16px; align-items: flex-start; transition: border-color .2s;
}
.info-row:hover { border-color: var(--border2); }
.info-ic {
  width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
  background: rgba(191,255,0,.1); border: 1px solid rgba(191,255,0,.2);
  display: flex; align-items: center; justify-content: center; font-size: 20px;
}
.info-lbl { font-family: var(--fen); font-size: 11px; font-weight: 800; color: var(--lime); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 5px; }
.info-val { font-size: 13px; color: var(--muted); line-height: 1.8; white-space: pre-line; font-family: 'Space Grotesk',sans-serif; }
.map-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--r); min-height: 270px;
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 10px; font-size: 56px; padding: 32px;
}
.map-card p { font-size: 13px; color: var(--muted); font-family: 'Space Grotesk',sans-serif; }
.social-row { display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap; }
.social-chip {
  display: flex; align-items: center; gap: 8px;
  background: var(--card); border: 1px solid var(--border);
  border-radius: 20px; padding: 8px 16px; cursor: pointer; transition: all .2s;
  font-size: 12px; font-weight: 700; color: var(--muted);
  font-family: 'Space Grotesk',sans-serif;
}
.social-chip:hover { border-color: var(--lime); color: var(--lime); }

/* ══ FOOTER ══ */
footer { background: var(--void); padding: 56px 5% 28px; border-top: 1px solid var(--border); }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 44px; }
.footer-brand-en { font-family: var(--fen); font-size: 24px; font-weight: 800; color: var(--white); letter-spacing: -0.5px; margin-bottom: 8px; }
.footer-brand-ar { font-family: var(--far); font-size: 22px; font-weight: 800; color: var(--white); margin-bottom: 8px; }
.footer-tagline { font-size: 12px; color: var(--muted2); line-height: 1.7; max-width: 230px; font-family: 'Space Grotesk',sans-serif; }
.footer-col-h { font-family: var(--fen); font-size: 11px; font-weight: 800; color: var(--lime); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
.footer-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.footer-list a { font-size: 13px; color: var(--muted2); cursor: pointer; text-decoration: none; transition: color .2s; font-family: 'Space Grotesk',sans-serif; }
.footer-list a:hover { color: var(--lime); }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid var(--border); flex-wrap: wrap; gap: 12px; }
.footer-copy { font-size: 12px; color: rgba(255,255,255,.15); font-family: 'Space Grotesk',sans-serif; }
.footer-pd { font-size: 12px; color: rgba(255,255,255,.25); display: flex; align-items: center; gap: 5px; font-family: 'Space Grotesk',sans-serif; }
.footer-pd span { color: rgba(100,160,255,.6); font-weight: 700; }

/* ══ RESPONSIVE ══ */
@media (max-width: 960px) {
  .how-grid, .order-inner, .visit-grid { grid-template-columns: 1fr; gap: 40px; }
  .hero-food-grid { display: none; }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
  .nav-links { display: none; }
  .nav-right .order-btn-nav { display: none; }
}
@media (max-width: 540px) {
  .footer-grid { grid-template-columns: 1fr; }
  section { padding: 64px 5%; }
  .trending-section, .how-section, .order-section, .visit-section { padding: 64px 5%; }
}
`;

/* ══ DATA ══ */
const TICKER_ITEMS = [
  { flag:"🇰🇷", name:"Korean Corn Dog" }, { flag:"🇦🇪", name:"Dubai Chocolate" },
  { flag:"🇯🇵", name:"Mochi Ice Cream" }, { flag:"🇲🇽", name:"Birria Tacos" },
  { flag:"🇹🇭", name:"Thai Boba Tea" },  { flag:"🇹🇷", name:"Turkish Ice Cream" },
  { flag:"🇮🇹", name:"Arancini" },        { flag:"🇵🇭", name:"Ube Latte" },
  { flag:"🇮🇳", name:"Masala Fries" },    { flag:"🇲🇦", name:"Msemen Sandwich" },
  { flag:"🇮🇩", name:"Indomie Remix" },   { flag:"🇱🇧", name:"Manakish" },
];

const VIBES = {
  all:    { ar:"🔥 كل شيء", en:"🔥 Everything" },
  tiktok: { ar:"📱 تيك توك", en:"📱 TikTok Viral" },
  street: { ar:"🛵 ستريت فود", en:"🛵 Street Food" },
  fusion: { ar:"🧪 فيوجن", en:"🧪 Fusion" },
  sweet:  { ar:"🍭 حلويات", en:"🍭 Sweets" },
  halal:  { ar:"✅ حلال", en:"✅ Halal picks" },
};

const MENU = {
  all: [
    { emoji:"🍡", rank:1,  flag:"🇦🇪", name:{ar:"شوكولاتة دبي",en:"Dubai Chocolate Bar"},  nameAr:"شوكولاتة دبي",   origin:{ar:"دبي، الإمارات",en:"Dubai, UAE"}, desc:{ar:"شوكولاتة دبي الفيروسية بالفستق والقشطة والكنافة — الترند الأول عالمياً",en:"The viral Dubai chocolate with pistachio, cream and kataifi — the world's No.1 trend"}, price:"CAD 12.00", tags:["tiktok","viral"], color:"#9B5CFF" },
    { emoji:"🌮", rank:2,  flag:"🇲🇽", name:{ar:"تاكو بيريا",en:"Birria Tacos"},            nameAr:"تاكو بيريا",     origin:{ar:"جاليسكو، المكسيك",en:"Jalisco, Mexico"}, desc:{ar:"تاكو لحم بقر مشوي مغموس في كونسوميه غني بالتوابل المكسيكية",en:"Crispy beef taco dipped in rich spiced consommé — the king of TikTok food"}, price:"CAD 16.50", tags:["tiktok","street","viral"], color:"#FF6B1A" },
    { emoji:"🌭", rank:3,  flag:"🇰🇷", name:{ar:"هوت دوغ كوري",en:"Korean Corn Dog"},       nameAr:"كورن دوغ كوري",  origin:{ar:"سيول، كوريا",en:"Seoul, Korea"}, desc:{ar:"هوت دوغ بعجينة اللبن الرائب والجبن المتمطط مع بودرة السكر",en:"Hot dog in yogurt batter with stretchy mozzarella and powdered sugar coating"}, price:"CAD 11.00", tags:["street","tiktok"], color:"#FF2D78" },
    { emoji:"🧋", rank:4,  flag:"🇹🇭", name:{ar:"بوبا تي بالعسل",en:"Honey Boba Tea"},      nameAr:"بوبا تي بالعسل", origin:{ar:"بانكوك، تايلاند",en:"Bangkok, Thailand"}, desc:{ar:"شاي بالحليب مع كرات التابيوكا المحلاة بالعسل الأصلي",en:"Milk tea with honey-glazed tapioca pearls — the global youth obsession"}, price:"CAD 9.50", tags:["tiktok","viral"], color:"#00E5FF" },
    { emoji:"🥐", rank:5,  flag:"🇲🇦", name:{ar:"مسمن بالجبن",en:"Msemen Cheese Sandwich"}, nameAr:"مسمن بالجبن",    origin:{ar:"المغرب / ترند كندا",en:"Morocco / Canada trend"}, desc:{ar:"خبز مسمن مغربي محشو بالجبن المذاب والعسل — أشهر فطور الجيل الجديد",en:"Moroccan msemen flatbread stuffed with melted cheese and honey — next-gen breakfast"}, price:"CAD 13.00", tags:["fusion","street"], color:"#FFD600" },
    { emoji:"🍠", rank:6,  flag:"🇵🇭", name:{ar:"يوبي لاتيه",en:"Ube Latte"},               nameAr:"يوبي لاتيه",     origin:{ar:"مانيلا، الفلبين",en:"Manila, Philippines"}, desc:{ar:"لاتيه بنفسجي بالبطاطا الأرجوانية الفلبينية — الجرعة التي ملأت انستغرام",en:"Purple latte with Filipino ube yam — the drink that took over Instagram"}, price:"CAD 8.50", tags:["insta","tiktok"], color:"#9B5CFF" },
    { emoji:"🍛", rank:7,  flag:"🇮🇳", name:{ar:"بطاطس ماسالا تشيز",en:"Masala Cheese Fries"}, nameAr:"ماسالا تشيز",  origin:{ar:"مومباي، الهند",en:"Mumbai, India"}, desc:{ar:"بطاطس مقلية مع صوص ماسالا البهاري والجبن المذاب والثوم المشوي",en:"Fries loaded with masala spice sauce, melted cheese and roasted garlic"}, price:"CAD 14.00", tags:["street","fusion"], color:"#FF6B1A" },
    { emoji:"🍦", rank:8,  flag:"🇹🇷", name:{ar:"دندورما تركي",en:"Turkish Dondurma"},       nameAr:"دندورما",        origin:{ar:"قهرمان مرعش، تركيا",en:"Kahramanmaraş, Turkey"}, desc:{ar:"آيس كريم مطاط بالمصطكي والسحلب — يتمطط ويلتصق ويجنن!",en:"Stretchy elastic ice cream with mastic and orchid powder — the ultimate performance dessert"}, price:"CAD 10.00", tags:["street","viral"], color:"#00E5FF" },
  ],
};

const HOW_STEPS = [
  { n:"01", title:{ar:"نراقب الترندات",en:"We Watch Trends"},       desc:{ar:"فريقنا يراقب تيك توك وانستغرام وسناب شات كل يوم ليكتشف أكلات الشباب حول العالم",en:"Our team monitors TikTok, Instagram and Snapchat daily to discover what youth are eating worldwide"} },
  { n:"02", title:{ar:"نجرب ونطبخ",en:"We Test & Cook"},             desc:{ar:"نجرب كل وصفة ونطبخها بأيدينا حتى نتأكد أنها بنفس الجودة والطعم الأصلي",en:"We test every recipe in our kitchen until we nail the authentic taste and quality"} },
  { n:"03", title:{ar:"نضيف لمستنا",en:"We Add Our Twist"},          desc:{ar:"نحافظ على أصل الطبق ونضيف لمسة كندية مسلمة — حلال وبمكونات محلية",en:"We keep the original soul and add a Canadian Muslim touch — halal and locally sourced"} },
  { n:"04", title:{ar:"يصلك طازج",en:"Fresh to Your Door"},          desc:{ar:"اطلب بصوتك عبر بولي دايل وتصلك أشهى الترندات العالمية طازجة وساخنة",en:"Voice-order via PolyDial and get the hottest global trends fresh and hot at your door"} },
];

const DISCOVERY_FEED = [
  { emoji:"🍡", name:{ar:"شوكولاتة دبي",en:"Dubai Chocolate"},     src:{ar:"تيك توك — ٤.٢ مليون مشاهدة",en:"TikTok — 4.2M views"},   score:98, color:"#9B5CFF" },
  { emoji:"🌮", name:{ar:"تاكو بيريا",en:"Birria Tacos"},           src:{ar:"تيك توك — ٣.٨ مليون مشاهدة",en:"TikTok — 3.8M views"},   score:95, color:"#FF6B1A" },
  { emoji:"🌭", name:{ar:"كورن دوغ كوري",en:"Korean Corn Dog"},     src:{ar:"انستغرام — ٢.١ مليون",en:"Instagram — 2.1M likes"},     score:91, color:"#FF2D78" },
  { emoji:"🧋", name:{ar:"بوبا هوني",en:"Honey Boba"},              src:{ar:"يوتيوب — ١.٥ مليون",en:"YouTube — 1.5M views"},           score:88, color:"#00E5FF" },
];

const TAG_CSS = { tiktok:"tag-tiktok", insta:"tag-insta", street:"tag-street", viral:"tag-viral", fusion:"tag-fusion", new:"tag-new" };
const TAG_LABELS = {
  tiktok: {ar:"تيك توك",en:"TikTok"},
  insta:  {ar:"انستغرام",en:"Instagram"},
  street: {ar:"ستريت فود",en:"Street Food"},
  viral:  {ar:"فيروسي",en:"Viral"},
  fusion: {ar:"فيوجن",en:"Fusion"},
  new:    {ar:"جديد",en:"New"},
};

export default function WeFind() {
  const [lang, setLang]   = useState("ar");
  const [vibe, setVibe]   = useState("all");
  const [cart, setCart]   = useState({});
  const t   = lang === "ar";
  const dir = t ? "rtl" : "ltr";
  const add = (k) => setCart(p => ({ ...p, [k]: (p[k]||0)+1 }));
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  const filteredMenu = vibe === "all"
    ? MENU.all
    : MENU.all.filter(d => d.tags.includes(vibe));

  return (
    <div dir={dir} style={{ fontFamily:"'Cairo',sans-serif" }}>
      <style>{FONTS}{CSS}</style>

      {/* ══ NAV ══ */}
      <nav className="nav">
        <div className="nav-brand" onClick={() => scrollTo("home")}>
          <div className="nav-logo-box">WF</div>
          {t
            ? <div className="nav-wordmark-ar">وي فايند</div>
            : <div className="nav-wordmark-en">WeFind</div>}
          <div className="nav-dot"/>
        </div>
        <div className="nav-links">
          {[["trending",t?"الترندات":"Trending"],["how",t?"كيف نشتغل":"How It Works"],["order",t?"اطلب":"Order"],["visit",t?"زيارتنا":"Visit"]].map(([id,lbl]) => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{lbl}</span>
          ))}
        </div>
        <div className="nav-right">
          <button className="lang-btn" onClick={() => setLang(l => l==="ar"?"en":"ar")}>{t?"EN":"ع"}</button>
          <button className="order-btn-nav" onClick={() => scrollTo("order")}>{t?"اطلب الآن 🎙":"Order Now 🎙"}</button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center",padding:"110px 5% 80px",position:"relative",overflow:"hidden",background:"var(--void)"}} id="home">
        {/* glow blobs */}
        <div className="glow-blob" style={{width:500,height:500,background:"var(--lime)",top:"-150px",insetInlineStart:"-100px"}}/>
        <div className="glow-blob" style={{width:400,height:400,background:"var(--pink)",bottom:"-100px",insetInlineEnd:"-80px"}}/>
        <div className="glow-blob" style={{width:300,height:300,background:"var(--cyan)",top:"40%",left:"40%"}}/>

        {/* ticker */}
        <div className="hero-ticker">
          <div className="ticker-track">
            {[...TICKER_ITEMS,...TICKER_ITEMS].map((item,i) => (
              <div key={i} className="ticker-item"><span>{item.flag}</span>{item.name}</div>
            ))}
          </div>
        </div>

        <div className="hero-chip"><div className="hero-chip-dot"/>{t ? "نكتشف كل يوم" : "Discovering daily"}</div>

        {t
          ? <h1 className="hero-h-ar" style={{position:"relative",zIndex:1}}>
              نلاقي <span className="accent-lime">أحلى</span><br/>
              أكل <span className="accent-pink">الشباب</span><br/>
              من كل العالم
            </h1>
          : <h1 className="hero-h-en" style={{position:"relative",zIndex:1}}>
              We <span className="accent-lime">find</span><br/>
              what youth<br/>
              <span className="accent-pink">want to eat</span>
            </h1>}

        <p className="hero-sub" style={{position:"relative",zIndex:1}}>
          {t
            ? "من تاكو بيريا المكسيكي إلى شوكولاتة دبي الفيروسية — نشوف الترندات، نطبخها، ونوصلها لك."
            : "From Mexican Birria Tacos to viral Dubai Chocolate — we spot the trends, cook them right, and bring them to you."}
        </p>

        <div className="hero-btns" style={{position:"relative",zIndex:1}}>
          <button className="btn-lime" onClick={() => scrollTo("trending")}>{t ? "🔥 شوف الترندات" : "🔥 See Trending"}</button>
          <button className="btn-outline-white" onClick={() => scrollTo("order")}>{t ? "🎙 اطلب بصوتك" : "🎙 Voice Order"}</button>
        </div>

        <div className="hero-stats" style={{position:"relative",zIndex:1}}>
          {[
            {n:t?"٨+":"8+",   l:t?"ترندات جديدة أسبوعياً":"New trends weekly", c:"var(--lime)"},
            {n:t?"٢٠+":"20+", l:t?"دولة مصدر الطعام":"Source countries",        c:"var(--pink)"},
            {n:t?"٤.٩":"4.9", l:t?"تقييم الشباب":"Youth rating",               c:"var(--cyan)"},
            {n:t?"١٠٠٪":"100%",l:t?"حلال معتمد":"Halal certified",              c:"var(--yellow)"},
          ].map(({n,l,c},i) => (
            <div key={i}>
              <div className="hero-stat-n" style={{color:c}}>{n}</div>
              <div className="hero-stat-l">{l}</div>
            </div>
          ))}
        </div>

        {/* food grid */}
        <div className="hero-food-grid">
          <div className="hfg-cell featured">🌮<div className="hfg-label">{t?"ترند الأسبوع":"Trend of the Week"}</div><div className="hfg-trend">#1 TIKTOK</div></div>
          {[["🍡","Dubai Choc","VIRAL"],["🌭","Corn Dog","HOT"],["🧋","Boba","WEEKLY"],["🍠","Ube Latte","INSTA"],["🥐","Msemen","LOCAL"],["🍦","Dondurma","RISING"]].map(([e,n,t2]) => (
            <div key={n} className="hfg-cell">{e}<div className="hfg-label">{n}</div><div className="hfg-trend">{t2}</div></div>
          ))}
        </div>
      </section>

      {/* ══ TRENDING ══ */}
      <section className="trending-section" id="trending">
        <div className="section-eyebrow" style={{color:"var(--lime)"}}>
          <div className="eyebrow-bar" style={{background:"var(--lime)"}}/>
          {t ? "ترندات هذا الأسبوع" : "This Week's Trends"}
        </div>
        {t
          ? <h2 className="sec-h-ar">الأكل اللي<br/><span style={{color:"var(--lime)"}}>الكل بيتكلم عنه</span></h2>
          : <h2 className="sec-h-en">Food everyone's<br/><span style={{color:"var(--lime)"}}>talking about</span></h2>}
        <p className="sec-p">{t ? "من تيك توك وانستغرام لصحنك مباشرة — كل أسبوع نجيب أحدث الترندات العالمية." : "From TikTok and Instagram directly to your plate — every week we bring the latest global food trends."}</p>

        <div className="vibe-row" style={{marginTop:28}}>
          {Object.keys(VIBES).map(k => (
            <button key={k} className={`vibe-btn ${vibe===k?"active":""}`} onClick={() => setVibe(k)}>
              {VIBES[k][lang]}
            </button>
          ))}
        </div>

        <div className="trend-grid">
          {filteredMenu.map((dish) => {
            const key = dish.name.en; const cnt = cart[key]||0;
            return (
              <div key={key} className="trend-card" style={{"--hover-color":dish.color}}>
                <div className="trend-img" style={{background:`linear-gradient(160deg, ${dish.color}22, #0C0A14)`}}>
                  <span style={{fontSize:80}}>{dish.emoji}</span>
                  <div className="trend-rank">#{dish.rank}</div>
                  {dish.tags.includes("viral") && <div className="trend-viral">🔥 VIRAL</div>}
                </div>
                <div className="trend-body">
                  <div className="trend-country">{dish.flag} {dish.origin[lang]}</div>
                  <div className="trend-tags">
                    {dish.tags.map(tg => (
                      <span key={tg} className={`trend-tag ${TAG_CSS[tg]||"tag-new"}`}>{TAG_LABELS[tg]?.[lang]||tg}</span>
                    ))}
                  </div>
                  {t
                    ? <div className="trend-name-ar">{dish.nameAr}</div>
                    : <div className="trend-name">{dish.name.en}</div>}
                  <div className="trend-desc">{dish.desc[lang]}</div>
                  <div className="trend-footer">
                    <span className="trend-price">{dish.price}</span>
                    <button className="add-btn" onClick={() => add(key)}>
                      {cnt > 0 ? <span style={{fontSize:13,fontWeight:800}}>{cnt}</span> : "+"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ HOW WE FIND ══ */}
      <section className="how-section" id="how">
        <div className="section-eyebrow" style={{color:"var(--cyan)"}}>
          <div className="eyebrow-bar" style={{background:"var(--cyan)"}}/>
          {t ? "كيف نشتغل" : "How It Works"}
        </div>
        {t
          ? <h2 className="sec-h-ar"><span style={{color:"var(--cyan)"}}>نكتشف</span> قبل كل الناس</h2>
          : <h2 className="sec-h-en">We discover<br/><span style={{color:"var(--cyan)"}}>before everyone</span></h2>}
        <div className="how-grid">
          <div className="how-steps">
            {HOW_STEPS.map((step,i) => (
              <div key={i} className="how-step">
                <div className="step-num-box">{step.n}</div>
                <div>
                  <div className="step-title">{step.title[lang]}</div>
                  <div className="step-desc">{step.desc[lang]}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="discovery-visual">
            <div className="disc-inner-glow"/>
            <div className="disc-title">{t ? "🔍 ترندات مكتشفة هذا الأسبوع" : "🔍 Discovered This Week"}</div>
            <div className="disc-items">
              {DISCOVERY_FEED.map((item,i) => (
                <div key={i} className="disc-item">
                  <span className="disc-emoji">{item.emoji}</span>
                  <div className="disc-info">
                    <div className="disc-name">{item.name[lang]}</div>
                    <div className="disc-src">{item.src[lang]}</div>
                    <div className="disc-bar-wrap"><div className="disc-bar" style={{width:`${item.score}%`,background:item.color}}/></div>
                  </div>
                  <div className="disc-score" style={{color:item.color}}>{item.score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ORDER / POLYDIAL ══ */}
      <section className="order-section" id="order">
        <div className="order-glow-1"/><div className="order-glow-2"/>
        <div className="order-inner">
          <div className="order-content">
            <div className="section-eyebrow" style={{color:"var(--lime)"}}>
              <div className="eyebrow-bar" style={{background:"var(--lime)"}}/>
              {t ? "اطلب الآن" : "Order Now"}
            </div>
            {t
              ? <h2 className="sec-h-ar">اطلب ترندك<br/><span style={{color:"var(--lime)"}}>بصوتك</span></h2>
              : <h2 className="sec-h-en">Order your trend<br/><span style={{color:"var(--lime)"}}>by voice</span></h2>}
            <p className="sec-p">{t ? "بولي دايل يسمعك — اطلب أي ترند شفته على تيك توك وهنجيبهولك." : "PolyDial hears you — order any trend you saw on TikTok and we'll bring it to you."}</p>
            <div className="order-features">
              {[
                ["🎙",t?"كلم بولي":"Talk to Poly",        t?"اطلب بالعربي أو الإنجليزي — بولي يفهم":"Order in Arabic or English — Poly gets it"],
                ["🔥",t?"اطلب بالترند":"Order by Trend",   t?"قول اسم الأكل اللي شفته على تيك توك":"Just say the food name you saw on TikTok"],
                ["⚡",t?"توصيل سريع":"Fast Delivery",      t?"ساخن وطازج في ٣٠ دقيقة":"Hot and fresh in 30 minutes"],
                ["🔄",t?"أعد طلبك":"Reorder Fast",          t?"ترندك المفضل بضغطة واحدة":"Your favourite trend in one tap"],
              ].map(([ic,title,sub]) => (
                <div key={title} className="order-feat">
                  <span className="of-icon">{ic}</span>
                  <div><div className="of-title">{title}</div><div className="of-sub">{sub}</div></div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ POLYDIAL IFRAME PLACEHOLDER ══
              Replace .pd-screen with:
              <iframe
                src="https://customer.polydial.com/?rk=YOUR_RESTAURANT_KEY"
                width="100%"
                height="560"
                frameBorder="0"
                allow="microphone"
                style={{ display:'block', border:'none' }}
              />
          */}
          <div className="pd-device">
            <div className="pd-screen">
              <div className="pd-logo">🎙</div>
              <div className="pd-title">{t ? "بولي دايل — طلبك الصوتي" : "PolyDial — Voice Order"}</div>
              <div className="pd-sub">
                {t
                  ? "نظام بولي دايل سيُضمَّن هنا — قول الترند اللي تحبه وبولي يرتب كل شيء."
                  : "PolyDial widget embedded here — say the trend you want and Poly sorts it all."}
              </div>
              <div className="pd-code">{`<iframe src="https://customer.polydial.com/?rk=YOUR_KEY" />`}</div>
              <div className="pd-note"><span>⚡</span>{t ? "المفتاح من فريق بولي دايل" : "Key from PolyDial team"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VISIT ══ */}
      <section className="visit-section" id="visit">
        <div className="visit-grid">
          <div>
            <div className="section-eyebrow" style={{color:"var(--pink)"}}>
              <div className="eyebrow-bar" style={{background:"var(--pink)"}}/>
              {t ? "زيارتنا" : "Find Us"}
            </div>
            {t
              ? <h2 className="sec-h-ar">تعال <span style={{color:"var(--pink)"}}>جرب</span> بنفسك</h2>
              : <h2 className="sec-h-en">Come <span style={{color:"var(--pink)"}}>try</span> it yourself</h2>}
            <p className="sec-p" style={{marginBottom:24}}>{t ? "مطعمنا في كندا — مكانك إذا تحب تجرب أحدث الترندات العالمية وجهاً لوجه." : "Our restaurant in Canada — your spot to experience the latest global food trends face to face."}</p>
            {[
              ["📍",t?"العنوان":"Address",           t?"٥٥ شارع يونغ، تورنتو، أونتاريو، كندا":"55 Yonge St, Toronto, ON, Canada"],
              ["🕐",t?"ساعات العمل":"Hours",          t?"الأحد–الخميس: ١١ص – ١١م\nالجمعة–السبت: ١١ص – ١ص":"Sun–Thu: 11am – 11pm\nFri–Sat: 11am – 1am"],
              ["📞",t?"هاتف":"Phone",                 "+1 (416) 555-0244"],
              ["✅",t?"حلال معتمد":"Halal Certified", t?"كل ترنداتنا حلال ومعتمدة":"All our trends are halal-certified"],
            ].map(([ic,lbl,val]) => (
              <div key={lbl} className="info-row">
                <div className="info-ic">{ic}</div>
                <div><div className="info-lbl">{lbl}</div><div className="info-val">{val}</div></div>
              </div>
            ))}
            <div className="social-row">
              {[["🎵","TikTok"],["📸","Instagram"],["📘","Facebook"],["▶️","YouTube"]].map(([ic,nm]) => (
                <div key={nm} className="social-chip">{ic} {nm}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="map-card"><span>🗺️</span><p>{t?"تورنتو، كندا":"Toronto, Canada"}</p></div>
            <div style={{background:"var(--card)",border:"1px solid rgba(191,255,0,.15)",borderRadius:"var(--r)",padding:"22px",marginTop:14}}>
              <div style={{fontFamily:"var(--fen)",fontSize:12,fontWeight:800,color:"var(--lime)",letterSpacing:"1px",marginBottom:10}}>
                {t ? "🔥 ترند الأسبوع في المطعم" : "🔥 IN-STORE TREND THIS WEEK"}
              </div>
              <div style={{fontSize:18,fontWeight:800,color:"var(--white)",fontFamily:"var(--fen)",letterSpacing:"-0.3px",marginBottom:4}}>
                {t ? "شوكولاتة دبي 🍡" : "Dubai Chocolate 🍡"}
              </div>
              <div style={{fontSize:12,color:"var(--muted)",fontFamily:"Space Grotesk,sans-serif"}}>
                {t ? "🇦🇪 دبي، الإمارات · CAD 12.00 · #٤٢مليون_مشاهدة" : "🇦🇪 Dubai, UAE · CAD 12.00 · #42MillionViews"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="footer-grid">
          <div>
            {t ? <div className="footer-brand-ar">وي فايند</div> : <div className="footer-brand-en">WeFind</div>}
            <p className="footer-tagline">{t ? "نلاقي أحلى أكل الشباب من كل العالم — wefind.ca" : "We find what youth want to eat from around the world — wefind.ca"}</p>
          </div>
          <div>
            <div className="footer-col-h">{t?"روابط":"Links"}</div>
            <ul className="footer-list">
              {[["trending",t?"الترندات":"Trending"],["how",t?"كيف نشتغل":"How It Works"],["order",t?"اطلب":"Order"],["visit",t?"زيارتنا":"Visit"]].map(([id,lbl]) => (
                <li key={id}><a onClick={() => scrollTo(id)}>{lbl}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-h">{t?"الفايب":"Vibe"}</div>
            <ul className="footer-list">
              {Object.keys(VIBES).slice(1).map(k => <li key={k}><a onClick={() => {setVibe(k);scrollTo("trending");}}>{VIBES[k][lang]}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="footer-col-h">{t?"تواصل":"Contact"}</div>
            <ul className="footer-list">
              <li><a>hello@wefind.ca</a></li>
              <li><a>+1 (416) 555-0244</a></li>
              <li><a>{t?"تورنتو، كندا":"Toronto, Canada"}</a></li>
              <li><a onClick={() => setLang(l => l==="ar"?"en":"ar")}>{t?"English":"العربية"}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2024 WeFind · wefind.ca · {t?"جميع الحقوق محفوظة":"All rights reserved"}</div>
          <div className="footer-pd">{t?"الطلبات عبر":"Orders via"} <span>PolyDial</span> 🎙</div>
        </div>
      </footer>
    </div>
  );
}
