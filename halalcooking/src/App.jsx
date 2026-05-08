import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════
   HALAL COOKING — halalcooking.ca
   Bilingual Arabic / English halal restaurant website
   PolyDial iframe placeholder included
══════════════════════════════════════════════ */

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cairo:wght@300;400;500;600;700;900&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap');
`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --saffron:    #D4A017;
    --saffron-l:  #F0BE3A;
    --saffron-bg: #FDF6E3;
    --burgundy:   #7A1A2E;
    --burgundy-l: #A02240;
    --ruby:       #C0392B;
    --spice:      #8B3A0F;
    --cumin:      #5C2E00;
    --parchment:  #FAF4E8;
    --ivory:      #FFFDF7;
    --sand:       #F2E8D5;
    --sage:       #3D6147;
    --sage-l:     #4F7A5B;
    --sage-bg:    #EBF2EC;
    --ink:        #1A0E06;
    --mid:        #4A2E18;
    --muted:      #8C6A4A;
    --border:     #DED0B4;
    --shadow-sm:  0 2px 14px rgba(26,14,6,0.08);
    --shadow-md:  0 8px 36px rgba(26,14,6,0.13);
    --shadow-lg:  0 24px 72px rgba(26,14,6,0.2);
    --radius:     18px;
    --radius-sm:  11px;
    --font-display: 'Cormorant Garamond', serif;
    --font-ar:    'Noto Naskh Arabic', serif;
    --font-body:  'Cairo', sans-serif;
  }
  html { scroll-behavior: smooth; }
  body { background: var(--parchment); color: var(--ink); font-family: var(--font-body); }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: var(--saffron); border-radius: 4px; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    background: rgba(26,14,6,0.94); backdrop-filter: blur(14px);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5%; height: 70px;
    border-bottom: 1px solid rgba(212,160,23,0.2);
  }
  .nav-brand { display: flex; align-items: center; gap: 11px; cursor: pointer; }
  .nav-emblem {
    width: 42px; height: 42px; border-radius: 50%;
    background: conic-gradient(from 0deg, var(--saffron), var(--burgundy), var(--sage), var(--saffron));
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; box-shadow: 0 0 0 2px rgba(212,160,23,0.3);
    position: relative; overflow: hidden;
  }
  .nav-emblem::after {
    content: ''; position: absolute; inset: 3px; border-radius: 50%;
    background: var(--ink);
    display: flex; align-items: center; justify-content: center;
  }
  .nav-emblem span { position: relative; z-index: 1; }
  .nav-name-en { font-family: var(--font-display); font-size: 20px; color: #F2E8D5; letter-spacing: 0.3px; font-style: italic; }
  .nav-name-ar { font-family: var(--font-ar); font-size: 19px; color: #F2E8D5; }
  .nav-halal-badge {
    background: rgba(61,97,71,0.25); border: 1px solid rgba(61,97,71,0.4);
    color: #7EC897; font-size: 10px; font-weight: 700; padding: 3px 9px;
    border-radius: 10px; letter-spacing: 0.8px;
  }
  .nav-links { display: flex; align-items: center; gap: 26px; }
  .nav-link {
    color: rgba(242,232,213,0.6); font-size: 13px; font-weight: 500;
    cursor: pointer; transition: color .2s; text-decoration: none;
  }
  .nav-link:hover { color: var(--saffron-l); }
  .nav-right { display: flex; align-items: center; gap: 10px; }
  .lang-btn {
    background: rgba(212,160,23,0.15); border: 1px solid rgba(212,160,23,0.3);
    color: var(--saffron-l); font-family: var(--font-body); font-size: 12px; font-weight: 700;
    padding: 6px 14px; border-radius: 20px; cursor: pointer; transition: all .2s;
  }
  .lang-btn:hover { background: rgba(212,160,23,0.28); }
  .order-btn-nav {
    background: linear-gradient(135deg, var(--saffron), var(--saffron-l));
    border: none; color: var(--ink); font-family: var(--font-body);
    font-size: 13px; font-weight: 800; padding: 9px 20px;
    border-radius: 20px; cursor: pointer; transition: all .2s;
  }
  .order-btn-nav:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(212,160,23,0.4); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh; padding: 90px 5% 70px;
    background:
      radial-gradient(ellipse at 70% 40%, rgba(122,26,46,0.35) 0%, transparent 55%),
      radial-gradient(ellipse at 20% 70%, rgba(212,160,23,0.12) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 0%, rgba(61,97,71,0.08) 0%, transparent 40%),
      #100806;
    display: flex; align-items: center;
    position: relative; overflow: hidden;
  }
  .hero-geo {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.07;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(212,160,23,0.8) 59px, rgba(212,160,23,0.8) 60px),
      repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(212,160,23,0.8) 59px, rgba(212,160,23,0.8) 60px);
  }
  .hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; width: 100%; position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; }
  .hero-content {}
  .hero-certification {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(61,97,71,0.2); border: 1px solid rgba(61,97,71,0.4);
    border-radius: 20px; padding: 6px 14px; margin-bottom: 24px;
    font-size: 12px; font-weight: 700; color: #7EC897; letter-spacing: 0.8px;
  }
  .hero-title-en {
    font-family: var(--font-display); font-size: clamp(44px, 6vw, 76px);
    font-weight: 700; color: var(--parchment); line-height: 1.1; margin-bottom: 18px;
  }
  .hero-title-en em { font-style: italic; color: var(--saffron-l); }
  .hero-title-ar {
    font-family: var(--font-ar); font-size: clamp(36px, 5.5vw, 64px);
    font-weight: 700; color: var(--parchment); line-height: 1.45; margin-bottom: 18px;
  }
  .hero-title-ar em { font-style: normal; color: var(--saffron-l); }
  .hero-sub {
    font-size: 15px; color: rgba(242,232,213,0.6); line-height: 1.8;
    max-width: 440px; margin-bottom: 36px; font-weight: 300;
  }
  .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 44px; }
  .btn-saffron {
    background: linear-gradient(135deg, var(--saffron), var(--saffron-l));
    border: none; color: var(--ink);
    font-family: var(--font-body); font-size: 15px; font-weight: 800;
    padding: 14px 30px; border-radius: 50px; cursor: pointer; transition: all .25s;
  }
  .btn-saffron:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(212,160,23,0.45); }
  .btn-ghost-light {
    background: transparent; border: 1.5px solid rgba(242,232,213,0.3);
    color: var(--parchment); font-family: var(--font-body); font-size: 15px; font-weight: 600;
    padding: 13px 28px; border-radius: 50px; cursor: pointer; transition: all .25s;
  }
  .btn-ghost-light:hover { border-color: var(--saffron-l); color: var(--saffron-l); }
  .hero-trust { display: flex; gap: 28px; flex-wrap: wrap; }
  .trust-item { display: flex; align-items: center; gap: 8px; }
  .trust-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--saffron); flex-shrink: 0; }
  .trust-text { font-size: 12px; color: rgba(242,232,213,0.5); font-weight: 500; }
  /* hero visual */
  .hero-visual { position: relative; display: flex; align-items: center; justify-content: center; }
  .hero-plate {
    width: 340px; height: 340px; border-radius: 50%;
    background: radial-gradient(circle at 40% 35%, rgba(122,26,46,0.5), rgba(16,8,6,0.9));
    border: 1px solid rgba(212,160,23,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 130px;
    position: relative; z-index: 2;
    box-shadow: 0 0 60px rgba(212,160,23,0.1), inset 0 0 40px rgba(0,0,0,0.4);
  }
  .hero-ring { position: absolute; border-radius: 50%; }
  .hero-float-badge {
    position: absolute; border-radius: 14px; padding: 12px 16px;
    box-shadow: var(--shadow-md); z-index: 3;
  }
  .float-halal {
    top: 8%; right: -5%;
    background: var(--sage); color: #fff;
    font-size: 13px; font-weight: 700;
  }
  .float-rating {
    bottom: 10%; left: -8%;
    background: var(--saffron); color: var(--ink);
    font-size: 13px; font-weight: 800;
  }

  /* ── SECTION COMMON ── */
  section { padding: 80px 5%; }
  .section-label {
    display: inline-block;
    border-left: 3px solid var(--saffron);
    padding-left: 12px; margin-bottom: 14px;
    font-size: 11px; font-weight: 700; color: var(--saffron);
    letter-spacing: 1.8px; text-transform: uppercase;
  }
  [dir="rtl"] .section-label { border-left: none; border-right: 3px solid var(--saffron); padding-left: 0; padding-right: 12px; }
  .section-h-en {
    font-family: var(--font-display); font-size: clamp(30px, 4.5vw, 50px);
    font-weight: 700; color: var(--ink); line-height: 1.15; margin-bottom: 12px;
  }
  .section-h-en em { font-style: italic; color: var(--burgundy); }
  .section-h-ar {
    font-family: var(--font-ar); font-size: clamp(26px, 4vw, 44px);
    font-weight: 700; color: var(--ink); line-height: 1.4; margin-bottom: 12px;
  }
  .section-h-ar em { font-style: normal; color: var(--burgundy); }
  .section-p { font-size: 15px; color: var(--mid); line-height: 1.85; max-width: 520px; }

  /* ── SPECIALS STRIP ── */
  .specials-strip {
    background: var(--burgundy); padding: 18px 5%;
    display: flex; gap: 0; align-items: stretch;
    border-top: 1px solid rgba(212,160,23,0.2);
    border-bottom: 1px solid rgba(212,160,23,0.2);
    overflow-x: auto;
  }
  .special-item {
    display: flex; align-items: center; gap: 12px;
    padding: 0 32px; flex-shrink: 0;
    border-right: 1px solid rgba(212,160,23,0.2);
  }
  [dir="rtl"] .special-item { border-right: none; border-left: 1px solid rgba(212,160,23,0.2); }
  .special-item:last-child { border: none; }
  .special-icon { font-size: 28px; }
  .special-name { font-size: 13px; font-weight: 700; color: var(--parchment); }
  .special-sub { font-size: 11px; color: rgba(242,232,213,0.55); margin-top: 2px; }

  /* ── STORY ── */
  .story-section { background: var(--ivory); }
  .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .story-mosaic { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 200px 200px; gap: 12px; }
  .mosaic-tile {
    border-radius: var(--radius-sm); display: flex; align-items: center;
    justify-content: center; font-size: 56px; position: relative; overflow: hidden;
  }
  .mosaic-tile.span2 { grid-column: span 2; font-size: 72px; }
  .mosaic-caption {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: linear-gradient(0deg, rgba(26,14,6,0.8), transparent);
    padding: 10px 12px 8px; font-size: 11px; font-weight: 600; color: #F2E8D5;
  }
  .story-pillars { display: flex; flex-direction: column; gap: 20px; margin-top: 28px; }
  .pillar { display: flex; gap: 16px; align-items: flex-start; }
  .pillar-num {
    width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
    background: var(--saffron-bg); border: 1.5px solid var(--saffron);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--saffron);
  }
  .pillar-title { font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
  .pillar-sub { font-size: 12px; color: var(--muted); line-height: 1.65; }

  /* ── MENU ── */
  .menu-section { background: var(--sand); }
  .menu-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 28px; }
  .menu-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
  .menu-tab {
    padding: 9px 18px; border-radius: 20px; border: 1.5px solid var(--border);
    background: transparent; cursor: pointer; font-family: var(--font-body);
    font-size: 12px; font-weight: 700; color: var(--muted); transition: all .2s;
  }
  .menu-tab.active { background: var(--burgundy); border-color: var(--burgundy); color: #F2E8D5; }
  .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; }
  .dish-card {
    background: var(--ivory); border-radius: var(--radius);
    border: 1px solid rgba(222,208,180,0.8);
    box-shadow: var(--shadow-sm); transition: all .25s; cursor: pointer;
    overflow: hidden;
  }
  .dish-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
  .dish-img {
    height: 170px; display: flex; align-items: center; justify-content: center;
    font-size: 72px; position: relative;
  }
  .dish-tags { position: absolute; top: 10px; inset-inline-start: 10px; display: flex; gap: 5px; }
  .dish-tag {
    font-size: 9px; font-weight: 800; padding: 3px 7px; border-radius: 8px;
    letter-spacing: 0.5px; text-transform: uppercase;
  }
  .tag-halal { background: var(--sage); color: #fff; }
  .tag-popular { background: var(--saffron); color: var(--ink); }
  .tag-spicy { background: var(--ruby); color: #fff; }
  .tag-new { background: var(--burgundy); color: #F2E8D5; }
  .dish-body { padding: 16px 18px; }
  .dish-name { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 5px; }
  .dish-desc { font-size: 12px; color: var(--muted); line-height: 1.65; margin-bottom: 14px; min-height: 38px; }
  .dish-footer { display: flex; align-items: center; justify-content: space-between; }
  .dish-price { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--burgundy); }
  .dish-add-btn {
    background: var(--ink); color: var(--saffron-l); border: none;
    width: 34px; height: 34px; border-radius: 50%; font-size: 20px;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all .2s; line-height: 1;
  }
  .dish-add-btn:hover { background: var(--burgundy); color: #fff; transform: scale(1.1); }

  /* ── ORDER / POLYDIAL ── */
  .order-section {
    background: linear-gradient(150deg, var(--cumin) 0%, #180900 60%, #0E0500 100%);
    position: relative; overflow: hidden;
  }
  .order-pattern {
    position: absolute; inset: 0; opacity: 0.04; pointer-events: none;
    background-image: 
      radial-gradient(circle at 2px 2px, rgba(212,160,23,1) 1px, transparent 0);
    background-size: 32px 32px;
  }
  .order-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .order-content .section-h-en { color: var(--parchment); }
  .order-content .section-h-ar { color: var(--parchment); }
  .order-content .section-label { color: var(--saffron); border-color: var(--saffron); }
  .order-content .section-p { color: rgba(242,232,213,0.6); }
  .order-perks { display: flex; flex-direction: column; gap: 14px; margin-top: 28px; }
  .order-perk {
    display: flex; align-items: center; gap: 14px;
    background: rgba(212,160,23,0.08); border: 1px solid rgba(212,160,23,0.15);
    border-radius: var(--radius-sm); padding: 14px 16px;
  }
  .perk-icon { font-size: 22px; flex-shrink: 0; }
  .perk-title { font-size: 14px; font-weight: 700; color: var(--saffron-l); margin-bottom: 2px; }
  .perk-sub { font-size: 12px; color: rgba(242,232,213,0.5); }
  /* polydial frame */
  .polydial-device {
    background: linear-gradient(170deg, #1A0E06, #100806);
    border-radius: 32px; overflow: hidden; padding: 8px;
    box-shadow: 0 0 0 1px rgba(212,160,23,0.25), 0 32px 80px rgba(0,0,0,0.6);
  }
  .polydial-inner-frame {
    background: #FAF4E8; border-radius: 26px; overflow: hidden;
    min-height: 580px; display: flex; flex-direction: column; align-items: center;
    justify-content: center; padding: 32px 24px; gap: 16px; text-align: center;
  }
  .pd-logo-wrap {
    width: 68px; height: 68px; border-radius: 18px;
    background: linear-gradient(135deg, #0055FF, #003BB3);
    display: flex; align-items: center; justify-content: center;
    font-size: 34px; box-shadow: 0 8px 24px rgba(0,85,255,0.3);
  }
  .pd-title { font-size: 17px; font-weight: 800; color: var(--ink); }
  .pd-sub { font-size: 13px; color: var(--muted); line-height: 1.65; max-width: 260px; }
  .pd-code {
    background: var(--sand); border: 1px solid var(--border);
    border-radius: 10px; padding: 10px 16px;
    font-size: 10px; font-family: monospace; color: var(--muted);
    letter-spacing: 0.5px; word-break: break-all; text-align: center;
  }
  .pd-note { font-size: 11px; color: var(--muted); display: flex; align-items: center; gap: 6px; }

  /* ── PROCESS ── */
  .process-section { background: var(--ivory); text-align: center; }
  .process-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0; margin-top: 48px; position: relative; }
  .process-steps::before {
    content: ''; position: absolute; top: 36px; left: 10%; right: 10%; height: 1px;
    background: repeating-linear-gradient(90deg, var(--saffron) 0px, var(--saffron) 8px, transparent 8px, transparent 18px);
    z-index: 0;
  }
  .step-card { padding: 0 20px 0; position: relative; z-index: 1; text-align: center; }
  .step-num {
    width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 20px;
    background: var(--saffron-bg); border: 2px solid var(--saffron);
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; position: relative;
  }
  .step-num-inner { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--saffron); }
  .step-title { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
  .step-desc { font-size: 13px; color: var(--muted); line-height: 1.7; max-width: 200px; margin: 0 auto; }

  /* ── VISIT ── */
  .visit-section { background: var(--parchment); }
  .visit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
  .info-card {
    background: var(--ivory); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 20px 22px; margin-bottom: 14px;
    display: flex; gap: 16px; align-items: flex-start;
    box-shadow: var(--shadow-sm);
  }
  .info-icon {
    width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0;
    background: var(--saffron-bg); border: 1.5px solid rgba(212,160,23,0.3);
    display: flex; align-items: center; justify-content: center; font-size: 22px;
  }
  .info-title { font-size: 12px; font-weight: 700; color: var(--saffron); letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 5px; }
  .info-val { font-size: 13px; color: var(--mid); line-height: 1.75; white-space: pre-line; }
  .map-box {
    background: var(--ivory); border: 1px solid var(--border);
    border-radius: var(--radius); min-height: 300px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 12px; font-size: 56px; box-shadow: var(--shadow-sm);
    padding: 32px;
  }
  .map-box p { font-size: 13px; color: var(--muted); }
  .socials { display: flex; gap: 10px; margin-top: 20px; }
  .social-pill {
    display: flex; align-items: center; gap: 8px;
    background: var(--ivory); border: 1px solid var(--border);
    border-radius: 20px; padding: 8px 16px; cursor: pointer; transition: all .2s;
    font-size: 12px; font-weight: 600; color: var(--mid);
  }
  .social-pill:hover { border-color: var(--saffron); color: var(--saffron); transform: translateY(-2px); }

  /* ── FOOTER ── */
  footer {
    background: var(--ink); padding: 52px 5% 28px;
    border-top: 1px solid rgba(212,160,23,0.15);
  }
  .footer-grid { display: grid; grid-template-columns: 1.8fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 44px; }
  .footer-brand-en { font-family: var(--font-display); font-size: 24px; font-style: italic; color: var(--parchment); margin-bottom: 8px; }
  .footer-brand-ar { font-family: var(--font-ar); font-size: 22px; color: var(--parchment); margin-bottom: 8px; }
  .footer-tagline { font-size: 12px; color: rgba(242,232,213,0.35); line-height: 1.7; max-width: 230px; }
  .footer-col-hd { font-size: 11px; font-weight: 700; color: var(--saffron); letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 16px; }
  .footer-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-list a { font-size: 13px; color: rgba(242,232,213,0.38); cursor: pointer; text-decoration: none; transition: color .2s; }
  .footer-list a:hover { color: var(--saffron-l); }
  .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid rgba(212,160,23,0.1); flex-wrap: wrap; gap: 12px; }
  .footer-copy { font-size: 12px; color: rgba(242,232,213,0.25); }
  .polydial-credit { font-size: 12px; color: rgba(242,232,213,0.3); display: flex; align-items: center; gap: 5px; }
  .polydial-credit span { color: rgba(80,140,255,0.7); font-weight: 600; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .hero-inner, .story-grid, .order-inner, .visit-grid { grid-template-columns: 1fr; gap: 40px; }
    .hero-visual { display: none; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    .nav-links { display: none; }
    .process-steps::before { display: none; }
  }
  @media (max-width: 520px) {
    .footer-grid { grid-template-columns: 1fr; }
    .nav-right .order-btn-nav { display: none; }
    section { padding: 60px 5%; }
    .specials-strip { padding: 14px 5%; }
    .special-item { padding: 0 18px; }
  }
`;

/* ── DATA ── */
const DISHES = {
  mains: [
    { emoji:"🍗", name:{ar:"دجاج مشوي حلال",     en:"Grilled Halal Chicken"},   desc:{ar:"دجاج طازج متبّل بالكمون والكزبرة مع أرز بسمتي",en:"Fresh chicken marinated with cumin & coriander, served with basmati"}, price:"CAD 17.50", tags:["halal","popular"] },
    { emoji:"🥩", name:{ar:"كباب مشكل",           en:"Mixed Kabab Platter"},     desc:{ar:"لحمة وفراخ وكفتة مع فتوش وصلصات",en:"Beef, chicken & kofta kabab with fattoush and dipping sauces"},             price:"CAD 24.00", tags:["halal","popular"] },
    { emoji:"🍲", name:{ar:"مرق خروف",            en:"Slow-Cooked Lamb Stew"},   desc:{ar:"خروف حلال على نار هادئة مع توابل عربية",en:"Halal lamb slow-cooked with a blend of Arabic spices"},                  price:"CAD 21.50", tags:["halal","new"] },
    { emoji:"🐟", name:{ar:"سمك مقلي بالثوم",     en:"Garlic Fried Fish"},       desc:{ar:"سمك هش مع صلصة الثوم والليمون",en:"Crispy fried fish with garlic lemon sauce and fries"},                     price:"CAD 18.00", tags:["halal"] },
    { emoji:"🌯", name:{ar:"شاورما لحم",           en:"Beef Shawarma Wrap"},      desc:{ar:"لحمة حلال مع طحينة وخيار مخلل وطماطم",en:"Halal beef with tahini, pickled cucumber and tomato"},                  price:"CAD 13.50", tags:["halal","popular","spicy"] },
    { emoji:"🍛", name:{ar:"بريياني دجاج",        en:"Chicken Biryani"},          desc:{ar:"أرز بسمتي مع دجاج حلال وزعفران",en:"Basmati rice layered with halal chicken, saffron and fried onions"},     price:"CAD 16.00", tags:["halal","spicy"] },
  ],
  starters: [
    { emoji:"🥗", name:{ar:"فتوش",               en:"Fattoush Salad"},           desc:{ar:"خضار طازج مع خبز مقرمش وصلصة الرمان",en:"Fresh vegetables with crispy bread and pomegranate dressing"},          price:"CAD 9.00",  tags:["halal"] },
    { emoji:"🫘", name:{ar:"حمص بالزيت",         en:"Classic Hummus"},            desc:{ar:"حمص كريمي مع زيت الزيتون والفلفل",en:"Creamy hummus with extra virgin olive oil and paprika"},                  price:"CAD 8.50",  tags:["halal","popular"] },
    { emoji:"🧆", name:{ar:"فلافل مقرمش",        en:"Crispy Falafel"},            desc:{ar:"فلافل ذهبي مع صلصة الطحينة",en:"Golden falafel bites with tahini and pickled turnips"},                       price:"CAD 10.50", tags:["halal"] },
    { emoji:"🥙", name:{ar:"بريك تونسي",         en:"Tunisian Brik"},              desc:{ar:"عجينة ورقية بالتونة والبيض",en:"Crispy pastry with tuna, egg and harissa"},                                  price:"CAD 11.00", tags:["halal","new"] },
  ],
  desserts: [
    { emoji:"🍮", name:{ar:"كنافة بالجبن",       en:"Cheese Kunafa"},             desc:{ar:"كنافة طازجة بجبنة المصلية وقطر السكر",en:"Fresh kunafa with stretchy cheese and simple syrup"},                   price:"CAD 10.00", tags:["popular"] },
    { emoji:"🍯", name:{ar:"أم علي",             en:"Om Ali"},                    desc:{ar:"حلوى مصرية دافئة بالمكسرات والقشطة",en:"Warm Egyptian pastry pudding with nuts and cream"},                     price:"CAD 9.50",  tags:["popular"] },
    { emoji:"🧁", name:{ar:"قطايف بالمكسرات",   en:"Qatayef Stuffed Pancakes"},  desc:{ar:"قطايف محشوة بالمكسرات والعسل",en:"Stuffed mini pancakes with nuts and drizzled with honey"},                   price:"CAD 8.00",  tags:["new"] },
  ],
  drinks: [
    { emoji:"🍵", name:{ar:"شاي بالنعناع",       en:"Moroccan Mint Tea"},          desc:{ar:"شاي أخضر بالنعناع الطازج والسكر",en:"Classic Moroccan green tea with fresh mint and sugar"},                   price:"CAD 4.50",  tags:["halal"] },
    { emoji:"🥛", name:{ar:"لبن الأوراق",        en:"Rose Laban"},                 desc:{ar:"مشروب زبادي مع ماء الورد",en:"Refreshing yogurt drink with rosewater and mint"},                             price:"CAD 5.00",  tags:["halal"] },
    { emoji:"🧃", name:{ar:"عصير الرمان",        en:"Fresh Pomegranate Juice"},    desc:{ar:"عصير رمان طازج معصور لحظياً",en:"Freshly squeezed pomegranate juice, no additives"},                          price:"CAD 7.50",  tags:["halal","popular"] },
  ],
};

const TAG_LABELS = {
  halal:   { ar:"حلال", en:"Halal" },
  popular: { ar:"مشهور", en:"Popular" },
  spicy:   { ar:"حار", en:"Spicy" },
  new:     { ar:"جديد", en:"New" },
};

const CAT_LABELS = {
  mains:    { ar:"الأطباق الرئيسية", en:"Main Dishes" },
  starters: { ar:"مقبلات",          en:"Starters" },
  desserts: { ar:"حلويات",          en:"Desserts" },
  drinks:   { ar:"مشروبات",         en:"Drinks" },
};

const SPECIALS = [
  { emoji:"🌙", label:{ ar:"قائمة رمضان متاحة", en:"Ramadan Menu Available" } },
  { emoji:"🍗", label:{ ar:"ذبح يومي طازج",     en:"Fresh daily halal slaughter" } },
  { emoji:"🥩", label:{ ar:"لحوم مستوردة معتمدة", en:"Certified halal imports" } },
  { emoji:"🚗", label:{ ar:"توصيل سريع",         en:"Fast delivery" } },
  { emoji:"🍁", label:{ ar:"مطبخ كندي حلال",    en:"Canadian halal kitchen" } },
];

export default function HalalCooking() {
  const [lang, setLang] = useState("ar");
  const [cat, setCat]   = useState("mains");
  const [cart, setCart] = useState({});
  const t   = lang === "ar";
  const dir = t ? "rtl" : "ltr";

  const add = (name) => setCart(p => ({ ...p, [name]: (p[name]||0)+1 }));
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <div dir={dir} style={{ fontFamily:"'Cairo',sans-serif" }}>
      <style>{FONTS}{CSS}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-brand" onClick={() => scrollTo("home")}>
          <div className="nav-emblem"><span>🥘</span></div>
          {t
            ? <span className="nav-name-ar">حلال كوكينج</span>
            : <span className="nav-name-en">Halal Cooking</span>}
          <span className="nav-halal-badge">HALAL ✓</span>
        </div>
        <div className="nav-links">
          {[["story",t?"قصتنا":"Our Story"],["menu",t?"القائمة":"Menu"],["order",t?"اطلب":"Order"],["process",t?"كيف يعمل":"How It Works"],["visit",t?"زيارتنا":"Visit"]].map(([id,lbl]) => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{lbl}</span>
          ))}
        </div>
        <div className="nav-right">
          <button className="lang-btn" onClick={() => setLang(l => l==="ar"?"en":"ar")}>{t?"EN":"ع"}</button>
          <button className="order-btn-nav" onClick={() => scrollTo("order")}>🎙 {t?"اطلب الآن":"Order Now"}</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-geo"/>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-certification">✅ {t ? "مطعم حلال معتمد — كندا" : "Certified Halal Restaurant — Canada"}</div>
            {t
              ? <h1 className="hero-title-ar">طعام <em>حلال</em> أصيل<br/>من قلب<br/>المطبخ العربي</h1>
              : <h1 className="hero-title-en">Authentic <em>Halal</em> cuisine<br/>from the heart of<br/>the Arab kitchen</h1>}
            <p className="hero-sub">
              {t
                ? "مطبخ حلال متكامل في كندا — من الكباب والمشاوي إلى الحلويات الشرقية. كل شيء حلال، طازج، ومحضّر بحب."
                : "A complete halal kitchen in Canada — from kabab and grills to oriental desserts. Everything halal, fresh, and made with love."}
            </p>
            <div className="hero-btns">
              <button className="btn-saffron" onClick={() => scrollTo("menu")}>{t ? "🍽 القائمة الكاملة" : "🍽 Full Menu"}</button>
              <button className="btn-ghost-light" onClick={() => scrollTo("order")}>{t ? "🎙 اطلب بصوتك" : "🎙 Voice Order"}</button>
            </div>
            <div className="hero-trust">
              {[
                [t?"حلال معتمد":"Halal Certified"],
                [t?"طازج يومياً":"Fresh Daily"],
                [t?"توصيل سريع":"Fast Delivery"],
                [t?"عائلي":"Family Friendly"],
              ].map(([txt]) => (
                <div key={txt} className="trust-item">
                  <div className="trust-dot"/>
                  <span className="trust-text">{txt}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-ring" style={{width:420,height:420,border:"1px solid rgba(212,160,23,0.12)"}}/>
            <div className="hero-ring" style={{width:310,height:310,border:"1px solid rgba(122,26,46,0.2)"}}/>
            <div className="hero-plate">🥘</div>
            <div className="hero-float-badge float-halal">✅ {t?"حلال":"Halal"}</div>
            <div className="hero-float-badge float-rating">⭐ 4.9 / 5</div>
          </div>
        </div>
      </section>

      {/* ── SPECIALS STRIP ── */}
      <div className="specials-strip">
        {[...SPECIALS, ...SPECIALS].map((s, i) => (
          <div key={i} className="special-item">
            <div className="special-icon">{s.emoji}</div>
            <div>
              <div className="special-name">{s.label[lang]}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── STORY ── */}
      <section className="story-section" id="story">
        <div className="story-grid">
          <div className="story-mosaic">
            {[
              { emoji:"🥩", bg:"135deg,#5C1A10,#2A0A04", lbl:{ar:"لحوم معتمدة",en:"Certified meat"}, span2:false },
              { emoji:"🌿", bg:"135deg,#1A3020,#0A1808", lbl:{ar:"مكونات طبيعية",en:"Natural ingredients"}, span2:false },
              { emoji:"🔥", bg:"135deg,#4A1A08,#1A0804", lbl:{ar:"مشوي يومياً",en:"Grilled daily"}, span2:true },
            ].map((tile, i) => (
              <div key={i} className={`mosaic-tile${tile.span2?" span2":""}`}
                style={{background:`linear-gradient(${tile.bg})`}}>
                <span style={{fontSize: tile.span2 ? 90 : 60}}>{tile.emoji}</span>
                <div className="mosaic-caption">{tile.lbl[lang]}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="section-label">{t?"قصتنا":"Our Story"}</div>
            {t
              ? <h2 className="section-h-ar">التزامنا بـ<em>الحلال</em><br/>لا يتزعزع</h2>
              : <h2 className="section-h-en">Our commitment<br/>to <em>Halal</em> is unwavering</h2>}
            <p className="section-p" style={{marginBottom:8}}>
              {t
                ? "منذ اليوم الأول، قررنا أن نقدم أطعمة حلالاً بالمعنى الحقيقي — ذبح إسلامي، مكونات طبيعية، ولا مسّ بالجودة."
                : "From day one, we decided to serve halal food in the truest sense — Islamic slaughter, natural ingredients, and zero compromise on quality."}
            </p>
            <div className="story-pillars">
              {[
                [t?"ذبح إسلامي يومي":"Daily Islamic Slaughter",      t?"لحومنا تُذبح بشكل يومي وفق الشريعة الإسلامية":"Our meats are slaughtered daily according to Islamic law"],
                [t?"شهادات حلال معتمدة":"Certified Halal Documents",   t?"كل منتج يصلك معنا موثّق ومشهود بالحلال":"Every product is verified and certified halal"],
                [t?"مطبخ منفصل تماماً":"Fully Separated Kitchen",      t?"لا تقاطع بين الحلال وغيره في مطبخنا":"Absolutely zero cross-contamination in our kitchen"],
              ].map(([title, sub], i) => (
                <div key={i} className="pillar">
                  <div className="pillar-num">{i+1}</div>
                  <div>
                    <div className="pillar-title">{title}</div>
                    <div className="pillar-sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MENU ── */}
      <section className="menu-section" id="menu">
        <div className="menu-header">
          <div>
            <div className="section-label">{t?"قائمتنا":"Our Menu"}</div>
            {t
              ? <h2 className="section-h-ar">اختار <em>وجبتك</em> الحلال</h2>
              : <h2 className="section-h-en">Choose your <em>halal</em> meal</h2>}
          </div>
          <div className="menu-tabs">
            {Object.keys(DISHES).map(k => (
              <button key={k} className={`menu-tab ${cat===k?"active":""}`} onClick={() => setCat(k)}>
                {CAT_LABELS[k][lang]}
              </button>
            ))}
          </div>
        </div>
        <div className="menu-grid">
          {DISHES[cat].map((dish) => {
            const nm = dish.name[lang]; const cnt = cart[nm]||0;
            return (
              <div key={nm} className="dish-card">
                <div className="dish-img" style={{background:`linear-gradient(135deg, hsl(${(nm.charCodeAt(0)*7)%30+10},35%,18%), #1A0E06)`}}>
                  <span style={{fontSize:72}}>{dish.emoji}</span>
                  <div className="dish-tags">
                    {dish.tags.map(tag => (
                      <span key={tag} className={`dish-tag tag-${tag}`}>{TAG_LABELS[tag][lang]}</span>
                    ))}
                  </div>
                </div>
                <div className="dish-body">
                  <div className="dish-name">{nm}</div>
                  <div className="dish-desc">{dish.desc[lang]}</div>
                  <div className="dish-footer">
                    <span className="dish-price">{dish.price}</span>
                    <button className="dish-add-btn" onClick={() => add(nm)}>
                      {cnt > 0 ? <span style={{fontSize:13,fontWeight:700}}>{cnt}</span> : "+"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ORDER / POLYDIAL ── */}
      <section className="order-section" id="order">
        <div className="order-pattern"/>
        <div className="order-inner">
          <div className="order-content">
            <div className="section-label">{t?"اطلب الآن":"Order Now"}</div>
            {t
              ? <h2 className="section-h-ar">اطلب حلالك<br/><em>بصوتك</em></h2>
              : <h2 className="section-h-en">Order your halal<br/>meal <em>by voice</em></h2>}
            <p className="section-p">
              {t
                ? "بولي دايل يفهم طلبك بالعربية والإنجليزية — بس اتكلم وهو يرتب الباقي."
                : "PolyDial understands your order in Arabic and English — just speak and it handles the rest."}
            </p>
            <div className="order-perks">
              {[
                ["🎙", t?"صوتي أو كتابي":"Voice or Text",          t?"اطلب بطريقتك المفضلة":"Order your preferred way"],
                ["🔒", t?"دفع آمن":"Secure Payment",               t?"كاش أو بطاقة أو إنستاباي":"Cash, card, or InstaPay"],
                ["🚴", t?"توصيل سريع":"Fast Delivery",              t?"وصول في ٣٠ دقيقة أو أقل":"Arrive in 30 min or less"],
                ["🔄", t?"إعادة الطلب":"Reorder in 1 tap",          t?"تاريخ طلباتك محفوظ دائماً":"Your order history is always saved"],
              ].map(([icon, title, sub]) => (
                <div key={title} className="order-perk">
                  <span className="perk-icon">{icon}</span>
                  <div>
                    <div className="perk-title">{title}</div>
                    <div className="perk-sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ── POLYDIAL DEVICE ── */}
          <div className="polydial-device">
            {/* 
              ══ POLYDIAL IFRAME ══
              Replace .polydial-inner-frame with:
              <iframe
                src="https://customer.polydial.com/?rk=YOUR_RESTAURANT_KEY"
                width="100%"
                height="600"
                frameBorder="0"
                allow="microphone"
                style={{ display:'block', border:'none' }}
              />
            */}
            <div className="polydial-inner-frame">
              <div className="pd-logo-wrap">🎙</div>
              <div className="pd-title">
                {t ? "بولي دايل — نظام الطلب الصوتي" : "PolyDial — Voice Ordering System"}
              </div>
              <div className="pd-sub">
                {t
                  ? "سيُضمَّن هنا نظام بولي دايل للطلب الصوتي. المستخدم يتكلم وبولي يفهم الطلب ويسجله."
                  : "The PolyDial voice ordering widget will be embedded here. Users speak and Poly understands their order."}
              </div>
              <div className="pd-code">
                {`<iframe src="https://customer.polydial.com/?rk=YOUR_KEY" />`}
              </div>
              <div className="pd-note">
                <span>⚡</span>
                {t ? "المفتاح يُوفَّر من فريق بولي دايل" : "Key provided by the PolyDial team"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="process-section" id="process">
        <div style={{textAlign:t?"right":"left"}}>
          <div className="section-label">{t?"كيف يعمل":"How It Works"}</div>
        </div>
        {t
          ? <h2 className="section-h-ar" style={{textAlign:"center"}}>٤ خطوات لـ<em>وجبتك</em> الحلال</h2>
          : <h2 className="section-h-en" style={{textAlign:"center"}}>4 steps to your <em>halal</em> meal</h2>}
        <div className="process-steps">
          {[
            ["🎙", t?"تكلم":"Speak",        t?"قول إيه اللي تحب تاكل بالعربي أو الإنجليزي":"Tell Poly what you want in Arabic or English"],
            ["🤖", t?"بولي يفهم":"Poly Listens",  t?"بولي بيفهم طلبك ويعمل القائمة":"Poly understands and builds your order"],
            ["✅", t?"تأكيد":"Confirm",     t?"بتراجع الطلب وتأكد وتدفع":"Review, confirm, and pay"],
            ["🚴", t?"توصيل":"Delivery",    t?"طلبك يوصلك طازج وحلال":"Your halal order arrives fresh"],
          ].map(([icon, title, desc], i) => (
            <div key={i} className="step-card">
              <div className="step-num">
                <span style={{fontSize:28}}>{icon}</span>
              </div>
              <div className="step-title">{title}</div>
              <div className="step-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VISIT ── */}
      <section className="visit-section" id="visit">
        <div className="visit-grid">
          <div>
            <div className="section-label">{t?"زيارتنا":"Visit Us"}</div>
            {t
              ? <h2 className="section-h-ar">أهلاً بك في <em>مطبخنا</em></h2>
              : <h2 className="section-h-en">Welcome to <em>our kitchen</em></h2>}
            <p className="section-p" style={{marginBottom:24}}>
              {t
                ? "مطعمنا مكان للعائلات الكندية والعربية — أجواء دافئة وطعام حلال بالقلب."
                : "Our restaurant is a place for Canadian and Arab families — warm atmosphere and halal food made with heart."}
            </p>
            {[
              ["📍", t?"العنوان":"Address",        t?"٤٥ شارع بروسبكت، أوتاوا، أونتاريو، كندا":"45 Prospect Ave, Ottawa, ON, Canada"],
              ["🕐", t?"أوقات العمل":"Hours",       t?"الاثنين–السبت: ١١ص – ١٠م\nالأحد: ١٢م – ٩م":"Mon–Sat: 11am – 10pm\nSunday: 12pm – 9pm"],
              ["📞", t?"اتصل بنا":"Phone",          "+1 (613) 555-0277"],
              ["✅", t?"شهادة الحلال":"Halal Cert", t?"معتمد من المجلس الإسلامي الكندي":"Certified by the Islamic Council of Canada"],
            ].map(([icon, title, val]) => (
              <div key={title} className="info-card">
                <div className="info-icon">{icon}</div>
                <div>
                  <div className="info-title">{title}</div>
                  <div className="info-val">{val}</div>
                </div>
              </div>
            ))}
            <div className="socials">
              {[["📸","Instagram"],["🐦","Twitter"],["📘","Facebook"],["🎵","TikTok"]].map(([ic,nm]) => (
                <div key={nm} className="social-pill">{ic} {nm}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="map-box">
              <span>🗺️</span>
              <p>{t ? "الخريطة — أوتاوا، كندا" : "Map — Ottawa, Canada"}</p>
            </div>
            <div style={{background:"var(--ivory)", border:"1px solid var(--border)", borderRadius:"var(--radius)", padding:"20px 22px", marginTop:14, boxShadow:"var(--shadow-sm)"}}>
              <div style={{fontSize:13, fontWeight:700, color:"var(--sage)", marginBottom:10}}>
                {t ? "🚴 منطقة التوصيل" : "🚴 Delivery Zone"}
              </div>
              <div style={{fontSize:13, color:"var(--muted)", lineHeight:1.8}}>
                {t
                  ? "نوصّل لكل أحياء أوتاوا. توصيل مجاني للطلبات فوق ٣٠ دولار."
                  : "We deliver to all Ottawa neighborhoods. Free delivery on orders over $30."}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-grid">
          <div>
            {t
              ? <div className="footer-brand-ar">حلال كوكينج</div>
              : <div className="footer-brand-en">Halal Cooking</div>}
            <p className="footer-tagline">
              {t
                ? "مطبخ حلال أصيل في كندا — halalcooking.ca"
                : "Authentic halal kitchen in Canada — halalcooking.ca"}
            </p>
          </div>
          <div>
            <div className="footer-col-hd">{t?"روابط":"Links"}</div>
            <ul className="footer-list">
              {[["story",t?"قصتنا":"Story"],["menu",t?"القائمة":"Menu"],["order",t?"اطلب":"Order"],["visit",t?"زيارتنا":"Visit"]].map(([id,lbl]) => (
                <li key={id}><a onClick={() => scrollTo(id)}>{lbl}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-hd">{t?"الحلال":"Halal"}</div>
            <ul className="footer-list">
              {[t?"شهادة الحلال":"Halal Certificate",t?"مصادر اللحوم":"Meat Sources",t?"الطهي الحلال":"Halal Cooking",t?"اتصل بنا":"Contact Us"].map((lbl) => (
                <li key={lbl}><a>{lbl}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-hd">{t?"تواصل":"Contact"}</div>
            <ul className="footer-list">
              <li><a>hello@halalcooking.ca</a></li>
              <li><a>+1 (613) 555-0277</a></li>
              <li><a>{t?"أوتاوا، كندا":"Ottawa, Canada"}</a></li>
              <li><a onClick={() => setLang(l => l==="ar"?"en":"ar")}>{t?"English":"العربية"}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2024 Halal Cooking · halalcooking.ca · {t?"جميع الحقوق محفوظة":"All rights reserved"}</div>
          <div className="polydial-credit">{t?"الطلبات عبر":"Orders via"} <span>PolyDial</span> 🎙</div>
        </div>
      </footer>
    </div>
  );
}
