import { useState } from "react";

/* ══════════════════════════════════════════════
   MUSLIM FAMILY — muslimfamily.ca
   Food from Muslim Family Kitchens Around the World
   Bilingual Arabic / English · PolyDial ready
══════════════════════════════════════════════ */

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Cairo:wght@300;400;500;600;700;900&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');
`;

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --clay:      #C85A2A;
  --clay-l:    #E07040;
  --clay-d:    #8C3A18;
  --clay-bg:   #FDF0E8;
  --turmeric:  #D4920A;
  --tur-l:     #F0AE28;
  --tur-bg:    #FDF6E3;
  --forest:    #2C5F3A;
  --forest-l:  #3A7A4C;
  --forest-bg: #EAF3EC;
  --teal:      #0A5C6E;
  --teal-bg:   #E6F2F5;
  --plum:      #6A1A4A;
  --plum-bg:   #F5EAF2;
  --warm-wh:   #FFFCF7;
  --cream:     #FAF3E6;
  --sand:      #F0E6D0;
  --linen:     #F7F0E4;
  --ink:       #1A0F08;
  --mid:       #4A3020;
  --muted:     #8A6A4A;
  --border:    #E0CEAA;
  --shadow-sm: 0 2px 14px rgba(26,15,8,.07);
  --shadow-md: 0 8px 36px rgba(26,15,8,.11);
  --shadow-lg: 0 24px 72px rgba(26,15,8,.17);
  --r:    18px;
  --rsm:  11px;
  --fen:  'Fraunces', serif;
  --far:  'Amiri', serif;
  --fb:   'Cairo', sans-serif;
}
html { scroll-behavior: smooth; }
body { background: var(--warm-wh); color: var(--ink); font-family: var(--fb); }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb { background: var(--clay); border-radius: 4px; }

/* ══ NAV ══ */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  background: rgba(26,15,8,.95); backdrop-filter: blur(14px);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 5%; height: 70px;
  border-bottom: 1px solid rgba(200,90,42,.22);
}
.nav-logo { display: flex; align-items: center; gap: 12px; cursor: pointer; }
.nav-pot {
  width: 44px; height: 44px; border-radius: 50%;
  background: radial-gradient(circle at 38% 35%, var(--clay), var(--clay-d));
  display: flex; align-items: center; justify-content: center; font-size: 22px;
  box-shadow: 0 0 0 2px rgba(200,90,42,.35);
}
.nav-name-en { font-family: var(--fen); font-size: 19px; color: #FAF3E6; font-weight: 600; line-height: 1.1; }
.nav-name-ar { font-family: var(--far); font-size: 20px; color: #FAF3E6; line-height: 1.2; }
.nav-sub { font-size: 9px; color: rgba(240,174,40,.45); letter-spacing: 1.5px; text-transform: uppercase; font-family: var(--fb); }
.nav-links { display: flex; gap: 24px; }
.nav-link { color: rgba(240,174,40,.5); font-size: 12.5px; font-weight: 500; cursor: pointer; transition: color .2s; }
.nav-link:hover { color: var(--tur-l); }
.nav-right { display: flex; gap: 10px; align-items: center; }
.lang-btn {
  background: rgba(200,90,42,.14); border: 1px solid rgba(200,90,42,.3);
  color: var(--tur-l); font-family: var(--fb); font-size: 12px; font-weight: 700;
  padding: 6px 14px; border-radius: 20px; cursor: pointer; transition: all .2s;
}
.lang-btn:hover { background: rgba(200,90,42,.26); }
.order-nav-btn {
  background: linear-gradient(135deg, var(--clay), var(--clay-l));
  border: none; color: #fff; font-family: var(--fb);
  font-size: 13px; font-weight: 800; padding: 9px 20px;
  border-radius: 20px; cursor: pointer; transition: all .2s;
}
.order-nav-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(200,90,42,.4); }

/* ══ HERO ══ */
.hero {
  min-height: 100vh; position: relative; overflow: hidden;
  display: flex; align-items: center;
  background:
    radial-gradient(ellipse at 15% 70%, rgba(200,90,42,.2) 0%, transparent 50%),
    radial-gradient(ellipse at 85% 20%, rgba(212,146,10,.12) 0%, transparent 45%),
    radial-gradient(ellipse at 50% 95%, rgba(44,95,58,.15) 0%, transparent 40%),
    #110A04;
  padding: 100px 5% 70px;
}
.hero-tiles {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(200,90,42,.14) 1px, transparent 0);
  background-size: 36px 36px; opacity: .6;
}
.hero-world-blur {
  position: absolute; inset-inline-end: -5%; top: 50%; transform: translateY(-50%);
  font-size: 260px; opacity: .04; pointer-events: none; user-select: none;
  filter: blur(2px); line-height: 1;
}
.hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; width: 100%; max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(200,90,42,.15); border: 1px solid rgba(200,90,42,.3);
  border-radius: 20px; padding: 6px 16px; margin-bottom: 22px;
  font-size: 11px; font-weight: 700; color: var(--clay-l); letter-spacing: 1.5px; text-transform: uppercase;
}
.hero-h-en {
  font-family: var(--fen); font-size: clamp(42px,5.5vw,72px);
  font-weight: 700; color: var(--cream); line-height: 1.1; margin-bottom: 18px;
}
.hero-h-en em { font-style: italic; color: var(--tur-l); font-weight: 300; }
.hero-h-ar {
  font-family: var(--far); font-size: clamp(38px,5vw,64px);
  font-weight: 700; color: var(--cream); line-height: 1.5; margin-bottom: 18px;
}
.hero-h-ar em { font-style: normal; color: var(--tur-l); }
.hero-sub { font-size: 15px; color: rgba(250,243,230,.5); line-height: 1.85; max-width: 460px; margin-bottom: 36px; font-weight: 300; }
.hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 44px; }
.btn-clay {
  background: linear-gradient(135deg, var(--clay), var(--clay-l));
  border: none; color: #fff; font-family: var(--fb); font-size: 15px; font-weight: 800;
  padding: 14px 30px; border-radius: 50px; cursor: pointer; transition: all .25s;
}
.btn-clay:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(200,90,42,.45); }
.btn-ghost-warm {
  background: transparent; border: 1.5px solid rgba(250,243,230,.25);
  color: var(--cream); font-family: var(--fb); font-size: 15px; font-weight: 600;
  padding: 13px 28px; border-radius: 50px; cursor: pointer; transition: all .25s;
}
.btn-ghost-warm:hover { border-color: var(--tur-l); color: var(--tur-l); }
.hero-flags { display: flex; gap: 8px; flex-wrap: wrap; }
.flag-chip {
  display: flex; align-items: center; gap: 7px;
  background: rgba(250,243,230,.07); border: 1px solid rgba(250,243,230,.12);
  border-radius: 20px; padding: 6px 12px;
  font-size: 12px; color: rgba(250,243,230,.55); font-weight: 500;
  transition: all .2s; cursor: pointer;
}
.flag-chip:hover { background: rgba(200,90,42,.15); border-color: rgba(200,90,42,.3); color: var(--clay-l); }
/* hero visual: world plate */
.hero-visual { display: flex; align-items: center; justify-content: center; position: relative; }
.world-plate {
  width: 360px; height: 360px; border-radius: 50%; position: relative; z-index: 2;
  background: radial-gradient(circle at 40% 38%, rgba(200,90,42,.45), #0E0702);
  border: 1px solid rgba(212,146,10,.2);
  display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 30px;
  box-shadow: 0 0 80px rgba(200,90,42,.12);
}
.plate-dish {
  background: rgba(250,243,230,.05); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 36px; border: 1px solid rgba(212,146,10,.1);
  transition: all .3s; cursor: default;
}
.plate-dish:hover { background: rgba(200,90,42,.15); transform: scale(1.08); }
.plate-dish.center { grid-column: span 2; font-size: 52px; border-radius: 16px; height: 80px; }
.world-ring { position: absolute; border-radius: 50%; }
.float-tag {
  position: absolute; border-radius: 14px; padding: 10px 14px; z-index: 3;
  box-shadow: var(--shadow-md); font-size: 12px; font-weight: 700;
}

/* ══ SECTIONS ══ */
section { padding: 88px 5%; }
.sec-tag {
  font-size: 10px; font-weight: 700; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--clay);
  display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
}
.sec-tag::before { content:''; display:block; width:28px; height:2px; background:var(--clay); border-radius:2px; }
[dir="rtl"] .sec-tag::before { display:none; }
[dir="rtl"] .sec-tag::after { content:''; display:block; width:28px; height:2px; background:var(--clay); border-radius:2px; }
.sec-h-en {
  font-family: var(--fen); font-size: clamp(28px,4vw,50px);
  font-weight: 700; color: var(--ink); line-height: 1.15; margin-bottom: 12px;
}
.sec-h-en em { font-style: italic; color: var(--clay); font-weight: 300; }
.sec-h-ar {
  font-family: var(--far); font-size: clamp(25px,3.6vw,44px);
  font-weight: 700; color: var(--ink); line-height: 1.5; margin-bottom: 12px;
}
.sec-h-ar em { font-style: normal; color: var(--clay); }
.sec-p { font-size: 15px; color: var(--muted); line-height: 1.9; max-width: 560px; }

/* ══ FAMILIES STRIP ══ */
.families-strip {
  background: var(--cream); border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border); padding: 20px 5%;
  display: flex; gap: 0; overflow-x: auto;
}
.family-item {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 0 28px; flex-shrink: 0; cursor: pointer;
  border-right: 1px solid var(--border); transition: all .2s;
}
[dir="rtl"] .family-item { border-right: none; border-left: 1px solid var(--border); }
.family-item:last-child { border: none; }
.family-item:hover .family-flag { transform: scale(1.15); }
.family-flag { font-size: 30px; transition: transform .2s; }
.family-name { font-size: 11px; font-weight: 700; color: var(--mid); letter-spacing: .3px; }
.family-dish { font-size: 10px; color: var(--muted); }

/* ══ ABOUT ══ */
.about-section { background: var(--linen); }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
.kitchen-collage { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 190px 190px; gap: 12px; }
.collage-tile {
  border-radius: var(--r); display: flex; flex-direction: column;
  align-items: center; justify-content: flex-end; font-size: 56px;
  position: relative; overflow: hidden; padding-bottom: 12px; cursor: default;
  transition: transform .2s;
}
.collage-tile:hover { transform: scale(1.02); }
.collage-tile.big { grid-column: span 2; font-size: 72px; }
.collage-country {
  position: absolute; top: 12px; inset-inline-start: 12px;
  background: rgba(26,15,8,.55); backdrop-filter: blur(6px);
  color: #fff; font-size: 10px; font-weight: 700;
  padding: 3px 8px; border-radius: 8px; letter-spacing: .5px;
}
.collage-dish-name {
  position: relative; z-index: 1; font-size: 11px; font-weight: 700;
  color: rgba(250,243,230,.9); text-shadow: 0 1px 4px rgba(0,0,0,.6);
  text-align: center; padding: 0 8px;
}
.about-values { display: flex; flex-direction: column; gap: 20px; margin-top: 28px; }
.value-row { display: flex; gap: 16px; align-items: flex-start; }
.value-icon {
  width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 22px;
}
.value-title { font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
.value-sub { font-size: 13px; color: var(--muted); line-height: 1.65; }

/* ══ MENU ══ */
.menu-section { background: var(--sand); }
.region-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
.region-tab {
  display: flex; align-items: center; gap: 7px;
  padding: 9px 18px; border-radius: 20px;
  border: 1.5px solid var(--border); background: var(--warm-wh);
  cursor: pointer; font-family: var(--fb); font-size: 12px; font-weight: 700;
  color: var(--mid); transition: all .2s;
}
.region-tab.active { background: var(--clay); border-color: var(--clay); color: #fff; }
.menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 20px; }
.dish-card {
  background: var(--warm-wh); border-radius: var(--r);
  border: 1px solid var(--border); box-shadow: var(--shadow-sm);
  overflow: hidden; cursor: pointer; transition: all .25s;
}
.dish-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
.dish-img {
  height: 175px; display: flex; align-items: center; justify-content: center;
  font-size: 76px; position: relative;
}
.dish-flag-ribbon {
  position: absolute; top: 0; inset-inline-end: 0;
  font-size: 22px; padding: 8px 10px;
  background: rgba(26,15,8,.45); backdrop-filter: blur(6px);
  border-radius: 0 0 0 14px;
}
.dish-family-tag {
  position: absolute; bottom: 10px; inset-inline-start: 10px;
  background: rgba(26,15,8,.55); color: rgba(250,243,230,.9);
  font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 20px;
  letter-spacing: .3px; backdrop-filter: blur(4px);
}
.dish-body { padding: 18px 20px; }
.dish-name { font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
.dish-name-sub { font-family: var(--far); font-size: 14px; color: var(--muted); margin-bottom: 8px; }
.dish-origin {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 700; color: var(--clay);
  letter-spacing: .5px; text-transform: uppercase; margin-bottom: 8px;
}
.dish-desc { font-size: 12px; color: var(--muted); line-height: 1.7; margin-bottom: 14px; min-height: 54px; }
.dish-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 12px; }
.dish-price { font-family: var(--fen); font-size: 20px; font-weight: 700; color: var(--clay); }
.dish-add {
  background: var(--clay); color: #fff; border: none;
  width: 34px; height: 34px; border-radius: 50%; font-size: 20px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .2s; line-height: 1;
}
.dish-add:hover { background: var(--clay-l); transform: scale(1.1); }

/* ══ WORLD MAP SECTION ══ */
.world-section { background: var(--warm-wh); text-align: center; }
.world-regions { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 16px; margin-top: 44px; }
.region-card {
  background: var(--linen); border: 1px solid var(--border); border-radius: var(--r);
  padding: 24px 20px; cursor: pointer; transition: all .25s;
  position: relative; overflow: hidden;
}
.region-card::before {
  content: ''; position: absolute; inset: 0; opacity: 0;
  transition: opacity .25s;
}
.region-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.region-card:hover::before { opacity: 1; }
.region-emoji { font-size: 36px; margin-bottom: 12px; display: block; }
.region-title { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
.region-dishes { font-size: 12px; color: var(--muted); line-height: 1.65; }
.region-count { font-size: 11px; font-weight: 700; color: var(--clay); margin-top: 8px; }

/* ══ ORDER / POLYDIAL ══ */
.order-section {
  background:
    radial-gradient(ellipse at 10% 50%, rgba(200,90,42,.28) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 30%, rgba(44,95,58,.18) 0%, transparent 45%),
    #0E0702;
  position: relative; overflow: hidden;
}
.order-dots {
  position: absolute; inset: 0; pointer-events: none; opacity: .05;
  background-image: radial-gradient(circle at 2px 2px, rgba(212,146,10,1) 1.5px, transparent 0);
  background-size: 32px 32px;
}
.order-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.order-content .sec-h-en { color: var(--cream); }
.order-content .sec-h-ar { color: var(--cream); }
.order-content .sec-tag { color: var(--tur-l); }
.order-content .sec-tag::before { background: var(--tur-l); }
.order-content .sec-tag::after { background: var(--tur-l); }
.order-content .sec-p { color: rgba(250,243,230,.5); max-width: 420px; }
.order-feats { display: flex; flex-direction: column; gap: 13px; margin-top: 28px; }
.order-feat {
  display: flex; gap: 14px; align-items: flex-start;
  background: rgba(200,90,42,.08); border: 1px solid rgba(200,90,42,.15);
  border-radius: var(--rsm); padding: 14px 16px;
}
.feat-ic { font-size: 22px; flex-shrink: 0; }
.feat-t { font-size: 14px; font-weight: 700; color: var(--tur-l); margin-bottom: 3px; }
.feat-s { font-size: 12px; color: rgba(250,243,230,.42); line-height: 1.6; }
/* polydial device */
.pd-device {
  background: #0A0602; border-radius: 34px; padding: 8px;
  box-shadow: 0 0 0 1px rgba(200,90,42,.3), var(--shadow-lg);
}
.pd-screen {
  background: var(--warm-wh); border-radius: 28px;
  min-height: 580px; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 36px 24px; gap: 16px; text-align: center;
}
.pd-icon { width: 72px; height: 72px; border-radius: 20px; background: linear-gradient(135deg,#0055FF,#003BB3); display: flex; align-items: center; justify-content: center; font-size: 34px; box-shadow: 0 8px 28px rgba(0,85,255,.3); }
.pd-title { font-size: 17px; font-weight: 800; color: var(--ink); }
.pd-sub { font-size: 13px; color: var(--muted); line-height: 1.7; max-width: 260px; }
.pd-code { background: var(--cream); border: 1px solid var(--border); border-radius: var(--rsm); padding: 10px 16px; font-size: 10px; font-family: monospace; color: var(--muted); letter-spacing: .5px; word-break: break-all; }
.pd-note { font-size: 11px; color: var(--muted); display: flex; align-items: center; gap: 6px; }

/* ══ VISIT ══ */
.visit-section { background: var(--cream); }
.visit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
.info-block {
  background: var(--warm-wh); border: 1px solid var(--border); border-radius: var(--r);
  padding: 20px 22px; margin-bottom: 13px; display: flex; gap: 16px; align-items: flex-start;
  box-shadow: var(--shadow-sm);
}
.info-ic {
  width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--clay), var(--clay-l));
  display: flex; align-items: center; justify-content: center; font-size: 22px;
}
.info-lbl { font-size: 10px; font-weight: 700; color: var(--clay); letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 5px; }
.info-val { font-size: 13px; color: var(--mid); line-height: 1.8; white-space: pre-line; }
.map-box {
  background: var(--warm-wh); border: 1px solid var(--border); border-radius: var(--r);
  min-height: 280px; display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 10px; font-size: 56px;
  padding: 32px; box-shadow: var(--shadow-sm);
}
.map-box p { font-size: 13px; color: var(--muted); }
.daily-special {
  background: var(--clay); border-radius: var(--r); padding: 22px;
  margin-top: 16px; border: 1px solid rgba(250,243,230,.1);
}
.ds-label { font-size: 10px; font-weight: 700; color: rgba(250,243,230,.55); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px; }
.ds-dish { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 4px; }
.ds-origin { font-size: 12px; color: rgba(250,243,230,.65); }

/* ══ FOOTER ══ */
footer { background: #0E0702; padding: 56px 5% 28px; border-top: 1px solid rgba(200,90,42,.15); }
.footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 44px; }
.footer-brand-en { font-family: var(--fen); font-size: 22px; font-weight: 600; color: var(--cream); margin-bottom: 8px; }
.footer-brand-ar { font-family: var(--far); font-size: 22px; color: var(--cream); margin-bottom: 8px; }
.footer-tagline { font-size: 12px; color: rgba(250,243,230,.3); line-height: 1.7; max-width: 235px; }
.footer-col-h { font-size: 10px; font-weight: 700; color: var(--tur-l); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px; }
.footer-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.footer-list a { font-size: 13px; color: rgba(250,243,230,.32); text-decoration: none; cursor: pointer; transition: color .2s; }
.footer-list a:hover { color: var(--tur-l); }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid rgba(200,90,42,.1); flex-wrap: wrap; gap: 12px; }
.footer-copy { font-size: 12px; color: rgba(250,243,230,.2); }
.footer-pd { font-size: 12px; color: rgba(250,243,230,.28); display: flex; align-items: center; gap: 5px; }
.footer-pd span { color: rgba(100,160,255,.65); font-weight: 600; }

/* ══ RESPONSIVE ══ */
@media (max-width: 960px) {
  .hero-inner, .about-grid, .order-inner, .visit-grid { grid-template-columns: 1fr; gap: 40px; }
  .hero-visual { display: none; }
  .world-regions { grid-template-columns: repeat(auto-fill, minmax(160px,1fr)); }
  .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
  .nav-links { display: none; }
  .nav-right .order-nav-btn { display: none; }
}
@media (max-width: 540px) {
  .footer-top { grid-template-columns: 1fr; }
  section { padding: 64px 5%; }
  .families-strip { padding: 16px 5%; }
  .family-item { padding: 0 16px; }
}
`;

/* ══ DATA ══ */
const FAMILIES = [
  { flag:"🇲🇦", name:{ar:"المغرب",en:"Morocco"},         dish:{ar:"طاجين",en:"Tagine"} },
  { flag:"🇸🇦", name:{ar:"السعودية",en:"Saudi Arabia"},   dish:{ar:"كبسة",en:"Kabsa"} },
  { flag:"🇵🇰", name:{ar:"باكستان",en:"Pakistan"},        dish:{ar:"بريياني",en:"Biryani"} },
  { flag:"🇹🇷", name:{ar:"تركيا",en:"Turkey"},            dish:{ar:"كفتة",en:"Kofta"} },
  { flag:"🇮🇩", name:{ar:"إندونيسيا",en:"Indonesia"},     dish:{ar:"رندانغ",en:"Rendang"} },
  { flag:"🇳🇬", name:{ar:"نيجيريا",en:"Nigeria"},         dish:{ar:"جولوف رايس",en:"Jollof"} },
  { flag:"🇪🇬", name:{ar:"مصر",en:"Egypt"},               dish:{ar:"كشري",en:"Koshari"} },
  { flag:"🇮🇷", name:{ar:"إيران",en:"Iran"},              dish:{ar:"غورمه سبزي",en:"Ghormeh"} },
  { flag:"🇸🇳", name:{ar:"السنغال",en:"Senegal"},         dish:{ar:"ثيبو جين",en:"Thiebou"} },
  { flag:"🇧🇩", name:{ar:"بنغلاديش",en:"Bangladesh"},     dish:{ar:"هلیم",en:"Haleem"} },
];

const MENU_DATA = {
  arab: [
    { emoji:"🥘", flag:"🇸🇦", name:{ar:"كبسة الدجاج",en:"Chicken Kabsa"},  subAr:"كَبْسَة الدجاج",      origin:{ar:"المملكة العربية السعودية",en:"Saudi Arabia"}, family:{ar:"عائلة آل رشيد",en:"Al-Rashid Family"}, desc:{ar:"أرز بسمتي بالدجاج والبهارات السعودية والزبيب والمكسرات — وصفة الجدة نورة",en:"Basmati rice with chicken, Saudi spices, raisins and nuts — Grandma Nora's recipe"}, price:"CAD 19.50" },
    { emoji:"🍲", flag:"🇪🇬", name:{ar:"ملوخية بالأرانب",en:"Molokhia with Rabbit"}, subAr:"مُلُوخِيَّة", origin:{ar:"مصر",en:"Egypt"},                family:{ar:"عائلة حلمي — القاهرة",en:"Helmy Family — Cairo"},   desc:{ar:"ملوخية مصرية مطبوخة مع لحم الأرانب وثوم مقلي — طريقة ست الكل",en:"Egyptian molokhia cooked with rabbit and fried garlic — the grandmother's way"}, price:"CAD 22.00" },
    { emoji:"🫕", flag:"🇱🇧", name:{ar:"كبة بالصينية",en:"Kibbeh bil-Saniyeh"}, subAr:"كِبَّة",          origin:{ar:"لبنان",en:"Lebanon"},              family:{ar:"عائلة فرحات — بيروت",en:"Farhat Family — Beirut"},   desc:{ar:"كبة مخبوزة بالخراف واللحم المفروم والصنوبر والبصل المكرمل",en:"Baked kibbeh with lamb, minced meat, pine nuts and caramelised onion"}, price:"CAD 21.00" },
    { emoji:"🍗", flag:"🇮🇶", name:{ar:"تشريب دجاج",en:"Chicken Tashreeb"},     subAr:"تَشْرِيب",         origin:{ar:"العراق",en:"Iraq"},               family:{ar:"عائلة الجبوري — بغداد",en:"Al-Jabouri Family — Baghdad"}, desc:{ar:"خبز التنور منقوع بمرق الدجاج الدافئ والبهارات العراقية",en:"Tanoor bread soaked in warm chicken broth with Iraqi spices"}, price:"CAD 18.50" },
  ],
  southasia: [
    { emoji:"🍛", flag:"🇵🇰", name:{ar:"بريياني اللحم",en:"Beef Biryani"},    subAr:"بِرْيَانِي",         origin:{ar:"لاهور، باكستان",en:"Lahore, Pakistan"},  family:{ar:"عائلة خان — لاهور",en:"Khan Family — Lahore"},     desc:{ar:"أرز بسمتي بلحم البقر والزعفران والزبيب والبهارات — وصفة الأم المحبوبة",en:"Basmati rice with beef, saffron, raisins and spices — mother's treasured recipe"}, price:"CAD 20.00" },
    { emoji:"🥣", flag:"🇧🇩", name:{ar:"هليم",en:"Haleem"},                   subAr:"هَلِيم",              origin:{ar:"دكا، بنغلاديش",en:"Dhaka, Bangladesh"}, family:{ar:"عائلة رحمن",en:"Rahman Family"},                  desc:{ar:"قمح مهروس مع لحم الخروف والعدس على نار هادئة لساعات — طعام الشتاء",en:"Wheat and lentils slow-cooked with lamb for hours — a winter soul food"}, price:"CAD 17.50" },
    { emoji:"🍖", flag:"🇮🇳", name:{ar:"نيهاري لحم",en:"Nihari Lamb"},        subAr:"نِيهَارِي",           origin:{ar:"دلهي، الهند",en:"Delhi, India"},         family:{ar:"عائلة أنصاري",en:"Ansari Family"},                desc:{ar:"يخنة لحم الخروف المطبوخة ببطء طوال الليل مع الزنجبيل والكزبرة",en:"Lamb stew slow-cooked overnight with ginger, coriander and whole spices"}, price:"CAD 23.00" },
    { emoji:"🫓", flag:"🇵🇰", name:{ar:"باراتا بالدجاج",en:"Chicken Paratha"}, subAr:"بَارَاتَا",           origin:{ar:"باكستان",en:"Pakistan"},                 family:{ar:"عائلة ملك — راولبندي",en:"Malik Family — Rawalpindi"}, desc:{ar:"خبز مقلي طبقات مع دجاج مبهر بالكاري والزبدة المذابة",en:"Layered fried flatbread with curried chicken and melted butter"}, price:"CAD 14.50" },
  ],
  africa: [
    { emoji:"🍚", flag:"🇸🇳", name:{ar:"ثيبو جين",en:"Thiéboudienne"},         subAr:"تْيِبُو جِين",        origin:{ar:"داكار، السنغال",en:"Dakar, Senegal"},    family:{ar:"عائلة ديالو",en:"Diallo Family"},                  desc:{ar:"أرز بالسمك ومرق الطماطم والخضار — الطبق الوطني السنغالي",en:"Rice cooked in tomato fish broth with vegetables — Senegal's national dish"}, price:"CAD 21.00" },
    { emoji:"🍛", flag:"🇳🇬", name:{ar:"جولوف رايس",en:"Jollof Rice"},          subAr:"جُولُوف",             origin:{ar:"لاغوس، نيجيريا",en:"Lagos, Nigeria"},    family:{ar:"عائلة إبراهيم",en:"Ibrahim Family"},              desc:{ar:"أرز مطبوخ ببطء في صلصة الطماطم مع دجاج مشوي وبصل مكرمل",en:"Rice slow-cooked in tomato sauce with grilled chicken and crispy onions"}, price:"CAD 19.00" },
    { emoji:"🥩", flag:"🇲🇦", name:{ar:"طاجين الخروف بالمشمش",en:"Lamb & Apricot Tagine"}, subAr:"طَاجِين", origin:{ar:"مراكش، المغرب",en:"Marrakech, Morocco"}, family:{ar:"عائلة المنصوري — مراكش",en:"Al-Mansouri Family — Marrakech"}, desc:{ar:"خروف مطبوخ ببطء مع المشمش المجفف والزنجبيل والقرفة في إناء طيني",en:"Lamb slow-cooked with dried apricots, ginger and cinnamon in a clay pot"}, price:"CAD 26.00" },
    { emoji:"🍲", flag:"🇪🇹", name:{ar:"دورو وات",en:"Doro Wat"},               subAr:"دُورُو وَات",         origin:{ar:"أديس أبابا، إثيوبيا",en:"Addis Ababa, Ethiopia"}, family:{ar:"عائلة أحمد",en:"Ahmed Family"},              desc:{ar:"يخنة الدجاج الحارة مع بيض مسلوق والخبز الإثيوبي — وصفة المنزل",en:"Spiced chicken stew with boiled eggs and injera bread — a home recipe"}, price:"CAD 20.00" },
  ],
  southeast: [
    { emoji:"🥩", flag:"🇮🇩", name:{ar:"رندانغ اللحم",en:"Beef Rendang"},       subAr:"رَنْدَانْغ",          origin:{ar:"بادانغ، إندونيسيا",en:"Padang, Indonesia"}, family:{ar:"عائلة حسن — سومطرة",en:"Hasan Family — Sumatra"}, desc:{ar:"لحم البقر المطبوخ ببطء مع جوز الهند والليمون وتوابل سومطرية",en:"Beef slow-cooked in coconut milk, lemongrass and Sumatran spices"}, price:"CAD 24.00" },
    { emoji:"🍜", flag:"🇲🇾", name:{ar:"لاكسا",en:"Laksa Lemak"},               subAr:"لَاكْسَا",             origin:{ar:"كوالالمبور، ماليزيا",en:"Kuala Lumpur, Malaysia"}, family:{ar:"عائلة يوسف — كوالا لمبور",en:"Yusof Family — KL"}, desc:{ar:"شوربة نودلز بحليب جوز الهند والجمبري وعجينة التوابل الماليزية",en:"Noodle soup in coconut milk with prawns and Malaysian spice paste"}, price:"CAD 18.00" },
    { emoji:"🍗", flag:"🇮🇩", name:{ar:"أيام بنيه",en:"Ayam Bakar"},              subAr:"أَيَام بَاكَر",       origin:{ar:"جاوة، إندونيسيا",en:"Java, Indonesia"},     family:{ar:"عائلة رحمواتي",en:"Rahmawati Family"},           desc:{ar:"دجاج مشوي على الفحم مع صوص الكيكب الجاوي والأرز والخضار",en:"Charcoal-grilled chicken with Javanese kecap sauce, rice and vegetables"}, price:"CAD 21.00" },
    { emoji:"🍮", flag:"🇲🇾", name:{ar:"كيك بولوس",en:"Kuih Bahulu"},            subAr:"كُوِيه بَاهُولُو",    origin:{ar:"ماليزيا",en:"Malaysia"},                     family:{ar:"عائلة نور — پينانغ",en:"Nur Family — Penang"},    desc:{ar:"كعك البيض الإسفنجي الصغير — حلوى المناسبات الماليزية",en:"Small spongy egg cakes — Malaysia's beloved celebration sweet"}, price:"CAD 11.00" },
  ],
  turkey: [
    { emoji:"🥙", flag:"🇹🇷", name:{ar:"إسكندر كباب",en:"Iskender Kebab"},     subAr:"إِسْكَنْدَر",         origin:{ar:"بورصة، تركيا",en:"Bursa, Turkey"},         family:{ar:"عائلة أيدين — بورصة",en:"Aydin Family — Bursa"},   desc:{ar:"لحم الخروف المشوي فوق خبز البيدة مع صوص الطماطم والزبدة والزبادي",en:"Grilled lamb over pide bread with tomato sauce, butter and yogurt"}, price:"CAD 26.00" },
    { emoji:"🍖", flag:"🇹🇷", name:{ar:"كفتة بالصلصة",en:"Sauced Köfte"},      subAr:"كُفْتَة",              origin:{ar:"إسطنبول، تركيا",en:"Istanbul, Turkey"},     family:{ar:"عائلة يلماظ",en:"Yilmaz Family"},                 desc:{ar:"كرات اللحم المتبلة مع صوص الطماطم وبطاطا مقلية — وجبة البيت التركي",en:"Spiced meatballs in tomato sauce with fried potatoes — the Turkish home meal"}, price:"CAD 22.00" },
    { emoji:"🥐", flag:"🇹🇷", name:{ar:"بوريك بالجبن",en:"Cheese Börek"},       subAr:"بُورَك",              origin:{ar:"تركيا",en:"Turkey"},                         family:{ar:"عائلة قايا",en:"Kaya Family"},                   desc:{ar:"عجينة الفيلو المقرمشة محشوة بجبنة الفيتا والبقدونس",en:"Crispy filo pastry stuffed with feta cheese and parsley"}, price:"CAD 14.00" },
    { emoji:"🍮", flag:"🇹🇷", name:{ar:"سوت لاجي",en:"Sütlaç"},               subAr:"سُوتْ لَاجِي",         origin:{ar:"تركيا",en:"Turkey"},                         family:{ar:"عائلة دمير — أنقرة",en:"Demir Family — Ankara"},  desc:{ar:"حلى الأرز بالحليب والسكر وجوز الهند — مُحمَّر في الفرن التركي",en:"Creamy rice pudding with milk, sugar and vanilla — oven-browned in Turkish style"}, price:"CAD 10.00" },
  ],
};

const REGIONS = [
  { emoji:"🌍", title:{ar:"العالم العربي",en:"Arab World"},          dishes:{ar:"كبسة · ملوخية · طاجين · كبة",en:"Kabsa · Molokhia · Tagine · Kibbeh"}, count:{ar:"١٦ طبق",en:"16 dishes"}, bg:"linear-gradient(135deg,#3A1A08,#1A0A04)" },
  { emoji:"🌏", title:{ar:"جنوب آسيا",en:"South Asia"},              dishes:{ar:"بريياني · هليم · نيهاري",en:"Biryani · Haleem · Nihari"},             count:{ar:"١٢ طبق",en:"12 dishes"}, bg:"linear-gradient(135deg,#1A0A3A,#0A0420)" },
  { emoji:"🌍", title:{ar:"أفريقيا المسلمة",en:"Muslim Africa"},     dishes:{ar:"جولوف · ثيبو جين · دورو وات",en:"Jollof · Thiébou · Doro Wat"},       count:{ar:"١٠ أطباق",en:"10 dishes"}, bg:"linear-gradient(135deg,#1A3A0A,#0A1804)" },
  { emoji:"🌏", title:{ar:"جنوب شرق آسيا",en:"Southeast Asia"},      dishes:{ar:"رندانغ · لاكسا · أيام بنيه",en:"Rendang · Laksa · Ayam Bakar"},       count:{ar:"١٠ أطباق",en:"10 dishes"}, bg:"linear-gradient(135deg,#0A2A3A,#041420)" },
  { emoji:"🌍", title:{ar:"تركيا وآسيا الوسطى",en:"Turkey & Central Asia"}, dishes:{ar:"إسكندر · بوريك · بلاو",en:"Iskender · Börek · Plov"},         count:{ar:"٨ أطباق",en:"8 dishes"},  bg:"linear-gradient(135deg,#3A0A1A,#1A0408)" },
  { emoji:"🌎", title:{ar:"المسلمون في الغرب",en:"Western Muslims"},  dishes:{ar:"مزيج مبتكر من المطابخ",en:"Creative multicultural fusion"},           count:{ar:"٦ أطباق",en:"6 dishes"},  bg:"linear-gradient(135deg,#1A1A3A,#08081A)" },
];

const REGION_LABELS = {
  arab:      { ar:"العالم العربي",      en:"Arab World" },
  southasia: { ar:"جنوب آسيا",          en:"South Asia" },
  africa:    { ar:"أفريقيا المسلمة",   en:"Muslim Africa" },
  southeast: { ar:"جنوب شرق آسيا",     en:"Southeast Asia" },
  turkey:    { ar:"تركيا",              en:"Turkey" },
};

const COLLAGE = [
  { emoji:"🍲", bg:"135deg,#3A1A08,#1A0A04", country:{ar:"مصر",en:"Egypt"}, dish:{ar:"ملوخية",en:"Molokhia"}, big:false },
  { emoji:"🥘", bg:"135deg,#1A0A3A,#08041A", country:{ar:"باكستان",en:"Pakistan"}, dish:{ar:"بريياني",en:"Biryani"}, big:false },
  { emoji:"🌍", bg:"135deg,#1A3A1A,#08180A", country:{ar:"حول العالم",en:"Around the World"}, dish:{ar:"مطابخ مسلمة",en:"Muslim Kitchens"}, big:true },
  { emoji:"🥩", bg:"135deg,#0A1A3A,#04081A", country:{ar:"إندونيسيا",en:"Indonesia"}, dish:{ar:"رندانغ",en:"Rendang"}, big:false },
  { emoji:"🥙", bg:"135deg,#2A0A1A,#120408", country:{ar:"تركيا",en:"Turkey"}, dish:{ar:"إسكندر",en:"Iskender"}, big:false },
];

export default function MuslimFamily() {
  const [lang, setLang]   = useState("ar");
  const [region, setRegion] = useState("arab");
  const [cart, setCart]   = useState({});
  const t   = lang === "ar";
  const dir = t ? "rtl" : "ltr";
  const add = (k) => setCart(p => ({ ...p, [k]: (p[k]||0)+1 }));
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <div dir={dir} style={{ fontFamily:"'Cairo',sans-serif" }}>
      <style>{FONTS}{CSS}</style>

      {/* ══ NAV ══ */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => scrollTo("home")}>
          <div className="nav-pot">🍲</div>
          <div>
            {t
              ? <div className="nav-name-ar">المطبخ العائلي المسلم</div>
              : <><div className="nav-name-en">Muslim Family</div><div className="nav-sub">KITCHENS OF THE WORLD</div></>}
          </div>
        </div>
        <div className="nav-links">
          {[["about",t?"قصتنا":"Our Story"],["menu",t?"القائمة":"Menu"],["world",t?"حول العالم":"World Map"],["order",t?"اطلب":"Order"],["visit",t?"زيارتنا":"Visit"]].map(([id,lbl]) => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{lbl}</span>
          ))}
        </div>
        <div className="nav-right">
          <button className="lang-btn" onClick={() => setLang(l => l==="ar"?"en":"ar")}>{t?"EN":"ع"}</button>
          <button className="order-nav-btn" onClick={() => scrollTo("order")}>🎙 {t?"اطلب الآن":"Order Now"}</button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero" id="home">
        <div className="hero-tiles"/>
        <div className="hero-world-blur">🌍</div>
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">🌍 muslimfamily.ca</div>
            {t
              ? <h1 className="hero-h-ar">من مطبخ كل<br/><em>أم مسلمة</em><br/>في العالم</h1>
              : <h1 className="hero-h-en">From the kitchen<br/>of every <em>Muslim</em><br/>mother on Earth</h1>}
            <p className="hero-sub">
              {t
                ? "وصفات حقيقية من مطابخ عائلات مسلمة في المغرب والسنغال وباكستان وتركيا وإندونيسيا وأكثر — على مائدة واحدة في كندا."
                : "Real recipes from Muslim family kitchens in Morocco, Senegal, Pakistan, Turkey, Indonesia and beyond — one table in Canada."}
            </p>
            <div className="hero-btns">
              <button className="btn-clay" onClick={() => scrollTo("menu")}>{t ? "🍽 استكشف المطابخ" : "🍽 Explore Kitchens"}</button>
              <button className="btn-ghost-warm" onClick={() => scrollTo("order")}>{t ? "🎙 اطلب بصوتك" : "🎙 Voice Order"}</button>
            </div>
            <div className="hero-flags">
              {["🇲🇦","🇵🇰","🇹🇷","🇮🇩","🇳🇬","🇸🇳","🇧🇩","🇸🇦"].map(f => (
                <span key={f} className="flag-chip">{f}</span>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="world-ring" style={{width:420,height:420,border:"1px solid rgba(200,90,42,.12)"}}/>
            <div className="world-ring" style={{width:310,height:310,border:"1px solid rgba(200,90,42,.08)"}}/>
            <div className="world-plate">
              {["🍲","🥘","🍛","🥙","🍗","🥗","🫕","🍖"].map((d,i) => <div key={i} className="plate-dish">{d}</div>)}
            </div>
            <div className="float-tag" style={{top:"8%",insetInlineEnd:"-6%",background:"var(--clay)",color:"#fff"}}>
              {t ? "🌍 ١٠+ دول" : "🌍 10+ Countries"}
            </div>
            <div className="float-tag" style={{bottom:"8%",insetInlineStart:"-8%",background:"var(--turmeric)",color:"var(--ink)"}}>
              {t ? "✅ حلال معتمد" : "✅ Halal Certified"}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAMILIES STRIP ══ */}
      <div className="families-strip">
        {[...FAMILIES, ...FAMILIES].map((f,i) => (
          <div key={i} className="family-item" onClick={() => scrollTo("menu")}>
            <span className="family-flag">{f.flag}</span>
            <span className="family-name">{f.name[lang]}</span>
            <span className="family-dish">{f.dish[lang]}</span>
          </div>
        ))}
      </div>

      {/* ══ ABOUT ══ */}
      <section className="about-section" id="about">
        <div className="about-grid">
          <div className="kitchen-collage">
            {COLLAGE.map((tile,i) => (
              <div key={i} className={`collage-tile${tile.big?" big":""}`}
                style={{background:`linear-gradient(${tile.bg})`}}>
                <span style={{fontSize:tile.big?90:60,marginBottom:10}}>{tile.emoji}</span>
                <div className="collage-country">{tile.country[lang]}</div>
                <div className="collage-dish-name">{tile.dish[lang]}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="sec-tag">{t?"قصتنا":"Our Story"}</div>
            {t
              ? <h2 className="sec-h-ar">وصفة الأم<br/><em>لا تُشترى</em></h2>
              : <h2 className="sec-h-en">A mother's recipe<br/>is <em>beyond price</em></h2>}
            <p className="sec-p" style={{marginBottom:20}}>
              {t
                ? "بدأت الفكرة بسؤال بسيط: لماذا لا تجد في كندا طعام بيت حقيقي من كل المطابخ المسلمة حول العالم؟ فقررنا أن نجمع الوصفات من الأمهات والجدات — من داكار إلى دكا إلى مراكش."
                : "It started with a simple question: why can't you find real home food from all Muslim kitchens around the world in Canada? So we gathered recipes from mothers and grandmothers — from Dakar to Dhaka to Marrakech."}
            </p>
            <div className="about-values">
              {[
                ["🏠","var(--clay-bg)",  t?"وصفات بيتية حقيقية":"Real Home Recipes",    t?"كل وصفة جاءت من عائلة حقيقية — لا مطابخ تجارية":"Every recipe comes from a real family — no commercial kitchens"],
                ["✅","var(--forest-bg)", t?"حلال ١٠٠٪":"100% Halal",                  t?"كل مكوناتنا حلال معتمدة في كندا":"All our ingredients are halal-certified in Canada"],
                ["🌍","var(--teal-bg)",  t?"تنوع حقيقي":"Genuine Diversity",             t?"من ١٠ دول مسلمة — وصفات موثقة بالاسم والعائلة":"From 10 Muslim countries — recipes documented by name and family"],
              ].map(([ic, bg, title, sub]) => (
                <div key={title} className="value-row">
                  <div className="value-icon" style={{background:bg}}>{ic}</div>
                  <div>
                    <div className="value-title">{title}</div>
                    <div className="value-sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ MENU ══ */}
      <section className="menu-section" id="menu">
        <div className="sec-tag">{t?"قائمتنا":"Our Menu"}</div>
        {t
          ? <h2 className="sec-h-ar">اختر <em>مطبخك</em> اليوم</h2>
          : <h2 className="sec-h-en">Choose your <em>kitchen</em> today</h2>}
        <p className="sec-p" style={{marginBottom:28}}>
          {t
            ? "كل طبق منسوب لعائلته وبلده — طعام بيت حقيقي، لا مطعم."
            : "Every dish attributed to its family and country — real home food, not a restaurant formula."}
        </p>
        <div className="region-tabs">
          {Object.keys(MENU_DATA).map(k => (
            <button key={k} className={`region-tab ${region===k?"active":""}`} onClick={() => setRegion(k)}>
              {{ arab:"🌙", southasia:"🌿", africa:"🌍", southeast:"🌴", turkey:"🕌" }[k]}
              {REGION_LABELS[k][lang]}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {MENU_DATA[region].map((dish) => {
            const key = dish.name.en; const cnt = cart[key]||0;
            return (
              <div key={key} className="dish-card">
                <div className="dish-img" style={{background:`linear-gradient(150deg,hsl(${key.charCodeAt(0)*11%360},35%,18%),#0E0702)`}}>
                  <span style={{fontSize:76}}>{dish.emoji}</span>
                  <div className="dish-flag-ribbon">{dish.flag}</div>
                  <div className="dish-family-tag">{dish.family[lang]}</div>
                </div>
                <div className="dish-body">
                  <div className="dish-name">{dish.name[lang]}</div>
                  <div className="dish-name-sub">{dish.subAr}</div>
                  <div className="dish-origin">📍 {dish.origin[lang]}</div>
                  <div className="dish-desc">{dish.desc[lang]}</div>
                  <div className="dish-footer">
                    <span className="dish-price">{dish.price}</span>
                    <button className="dish-add" onClick={() => add(key)}>
                      {cnt > 0 ? <span style={{fontSize:13,fontWeight:700}}>{cnt}</span> : "+"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ WORLD MAP ══ */}
      <section className="world-section" id="world">
        <div className="sec-tag" style={{justifyContent:"center"}}>{t?"حول العالم":"Around the World"}</div>
        {t
          ? <h2 className="sec-h-ar" style={{textAlign:"center"}}><em>٦ مناطق</em> مسلمة — مطبخ واحد</h2>
          : <h2 className="sec-h-en" style={{textAlign:"center"}}><em>6 Muslim regions</em> — one table</h2>}
        <p className="sec-p" style={{margin:"0 auto",textAlign:"center"}}>
          {t
            ? "المسلمون في كل ركن من أركان الأرض — ولكل منطقة مطبخ فريد يعكس ثقافتها وتاريخها."
            : "Muslims in every corner of the Earth — each region with a unique kitchen reflecting its culture and history."}
        </p>
        <div className="world-regions">
          {REGIONS.map((r) => (
            <div key={r.title.en} className="region-card" onClick={() => scrollTo("menu")}
              style={{borderTop:`3px solid var(--clay)`}}>
              <span className="region-emoji">{r.emoji}</span>
              <div className="region-title">{r.title[lang]}</div>
              <div className="region-dishes">{r.dishes[lang]}</div>
              <div className="region-count">{r.count[lang]} →</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ORDER / POLYDIAL ══ */}
      <section className="order-section" id="order">
        <div className="order-dots"/>
        <div className="order-inner">
          <div className="order-content">
            <div className="sec-tag">{t?"اطلب الآن":"Order Now"}</div>
            {t
              ? <h2 className="sec-h-ar">اطلب من<br/>مطبخ أي <em>أم</em><br/>في العالم</h2>
              : <h2 className="sec-h-en">Order from<br/>any <em>mother's</em><br/>kitchen in the world</h2>}
            <p className="sec-p">
              {t
                ? "بولي دايل يسمعك بالعربية والإنجليزية ويرشدك عبر مطابخ العالم الإسلامي."
                : "PolyDial listens in Arabic and English and guides you through the world's Muslim kitchens."}
            </p>
            <div className="order-feats">
              {[
                ["🎙", t?"اطلب بصوتك":"Voice Order",            t?"تكلم وبولي يفهم طلبك — عربي وإنجليزي":"Speak and Poly understands — Arabic & English"],
                ["🌍", t?"اختر المطبخ":"Choose the Kitchen",    t?"أخبر بولي أي مطبخ تريد اليوم":"Tell Poly which kitchen you want today"],
                ["✅", t?"كل شيء حلال":"All Halal",             t?"كل أطباقنا حلال معتمدة في كندا":"All our dishes are halal-certified in Canada"],
                ["🔄", t?"أعد طلبك":"Reorder",                   t?"وجبتك المفضلة بضغطة واحدة":"Your favourite meal in one tap"],
              ].map(([ic,title,sub]) => (
                <div key={title} className="order-feat">
                  <span className="feat-ic">{ic}</span>
                  <div><div className="feat-t">{title}</div><div className="feat-s">{sub}</div></div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ POLYDIAL IFRAME PLACEHOLDER ══
              Replace .pd-screen with:
              <iframe
                src="https://customer.polydial.com/?rk=YOUR_RESTAURANT_KEY"
                width="100%"
                height="600"
                frameBorder="0"
                allow="microphone"
                style={{ display:'block', border:'none' }}
              />
          */}
          <div className="pd-device">
            <div className="pd-screen">
              <div className="pd-icon">🎙</div>
              <div className="pd-title">{t ? "بولي دايل — طلبك الصوتي" : "PolyDial — Your Voice Order"}</div>
              <div className="pd-sub">
                {t
                  ? "نظام الطلب الصوتي من بولي دايل سيُضمَّن هنا — اطلب من أي مطبخ مسلم حول العالم."
                  : "PolyDial voice ordering will be embedded here — order from any Muslim kitchen around the world."}
              </div>
              <div className="pd-code">{`<iframe src="https://customer.polydial.com/?rk=YOUR_KEY" />`}</div>
              <div className="pd-note"><span>⚡</span> {t ? "المفتاح من فريق بولي دايل" : "Key from PolyDial team"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VISIT ══ */}
      <section className="visit-section" id="visit">
        <div className="visit-grid">
          <div>
            <div className="sec-tag">{t?"زيارتنا":"Visit Us"}</div>
            {t
              ? <h2 className="sec-h-ar">تعال <em>وتذوّق</em> العالم</h2>
              : <h2 className="sec-h-en">Come <em>taste</em> the world</h2>}
            <p className="sec-p" style={{marginBottom:24}}>
              {t
                ? "مطعمنا في كندا يجمع على مائدة واحدة طعام عشرات العائلات المسلمة من كل أنحاء العالم."
                : "Our Canadian restaurant brings together the food of dozens of Muslim families from around the world on one table."}
            </p>
            {[
              ["📍", t?"العنوان":"Address",         t?"٢٢ شارع دايفرسيتي، تورنتو، أونتاريو، كندا":"22 Diversity Ave, Toronto, ON, Canada"],
              ["🕐", t?"ساعات العمل":"Hours",        t?"الاثنين–السبت: ١١ص – ١٠م\nالأحد: ١٢م – ٩م":"Mon–Sat: 11am – 10pm\nSunday: 12pm – 9pm"],
              ["📞", t?"هاتف":"Phone",               "+1 (416) 555-0188"],
              ["✅", t?"حلال معتمد":"Halal Cert",    t?"معتمد من المجلس الإسلامي الكندي":"Certified by the Islamic Council of Canada"],
            ].map(([ic,label,val]) => (
              <div key={label} className="info-block">
                <div className="info-ic">{ic}</div>
                <div><div className="info-lbl">{label}</div><div className="info-val">{val}</div></div>
              </div>
            ))}
          </div>
          <div>
            <div className="map-box">
              <span>🗺️</span>
              <p>{t ? "تورنتو، كندا" : "Toronto, Canada"}</p>
            </div>
            <div className="daily-special">
              <div className="ds-label">{t ? "🍽 وجبة اليوم" : "🍽 Today's Special"}</div>
              <div className="ds-dish">{t ? "رندانغ اللحم الإندونيسي" : "Indonesian Beef Rendang"}</div>
              <div className="ds-origin">{t ? "🇮🇩 عائلة حسن — سومطرة · CAD 24.00" : "🇮🇩 Hasan Family — Sumatra · CAD 24.00"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="footer-top">
          <div>
            {t
              ? <div className="footer-brand-ar">المطبخ العائلي المسلم</div>
              : <div className="footer-brand-en">Muslim Family</div>}
            <p className="footer-tagline">
              {t ? "من مطبخ كل أم مسلمة في العالم — muslimfamily.ca" : "From every Muslim mother's kitchen — muslimfamily.ca"}
            </p>
          </div>
          <div>
            <div className="footer-col-h">{t?"روابط":"Links"}</div>
            <ul className="footer-list">
              {[["about",t?"قصتنا":"Story"],["menu",t?"القائمة":"Menu"],["world",t?"العالم":"World"],["order",t?"اطلب":"Order"],["visit",t?"زيارتنا":"Visit"]].map(([id,lbl]) => (
                <li key={id}><a onClick={() => scrollTo(id)}>{lbl}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-h">{t?"المطابخ":"Kitchens"}</div>
            <ul className="footer-list">
              {Object.keys(REGION_LABELS).map(k => <li key={k}><a onClick={() => {setRegion(k);scrollTo("menu");}}>{REGION_LABELS[k][lang]}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="footer-col-h">{t?"تواصل":"Contact"}</div>
            <ul className="footer-list">
              <li><a>hello@muslimfamily.ca</a></li>
              <li><a>+1 (416) 555-0188</a></li>
              <li><a>{t?"تورنتو، كندا":"Toronto, Canada"}</a></li>
              <li><a onClick={() => setLang(l => l==="ar"?"en":"ar")}>{t?"English":"العربية"}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2024 Muslim Family Restaurant · muslimfamily.ca · {t?"جميع الحقوق محفوظة":"All rights reserved"}</div>
          <div className="footer-pd">{t?"الطلبات عبر":"Orders via"} <span>PolyDial</span> 🎙</div>
        </div>
      </footer>
    </div>
  );
}
