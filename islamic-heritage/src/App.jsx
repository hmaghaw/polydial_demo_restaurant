import { useState } from "react";

/* ══════════════════════════════════════════════
   ISLAMIC HERITAGE — islamic-heritage.ca
   Restaurant of Ancestral Islamic Cuisine
   Bilingual Arabic / English · PolyDial ready
══════════════════════════════════════════════ */

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=IM+Fell+DW+Pica:ital@0;1&family=Cairo:wght@300;400;500;600;700;900&family=Amiri+Quran&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');
`;

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --parchment:  #F5ECD5;
  --aged:       #EAD9B8;
  --vellum:     #FBF6EC;
  --ink:        #1A1106;
  --sepia:      #3D2B0E;
  --ochre:      #7A5A1A;
  --gold:       #B8900A;
  --gold-l:     #D4AE30;
  --gold-xl:    #ECCA5A;
  --gold-bg:    #FBF3D8;
  --lapis:      #1A3A6A;
  --lapis-l:    #254E90;
  --lapis-bg:   #EBF0FA;
  --ruby:       #7A1A2A;
  --ruby-l:     #A02238;
  --ruby-bg:    #FAEBEE;
  --emerald:    #0B4D35;
  --emerald-bg: #E8F2EE;
  --night:      #0E0A04;
  --border:     #D8C89A;
  --shadow-sm:  0 2px 16px rgba(26,17,6,.07);
  --shadow-md:  0 8px 40px rgba(26,17,6,.13);
  --shadow-lg:  0 24px 80px rgba(26,17,6,.22);
  --r:   16px;
  --rsm: 10px;
  --fen: 'IM Fell DW Pica', serif;
  --far: 'Amiri', serif;
  --fb:  'Cairo', sans-serif;
}
html { scroll-behavior: smooth; }
body { background: var(--parchment); color: var(--ink); font-family: var(--fb); }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 4px; }

/* ═══ ORNAMENTAL DIVIDER ═══ */
.divider-ornament {
  display: flex; align-items: center; gap: 14px; justify-content: center;
  margin: 0 0 20px;
}
.div-line { flex: 1; max-width: 80px; height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }
.div-gem { color: var(--gold); font-size: 14px; }

/* ═══ NAV ═══ */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  background: rgba(14,10,4,.95); backdrop-filter: blur(14px);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 5%; height: 70px;
  border-bottom: 1px solid rgba(184,144,10,.25);
}
.nav-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; }
.nav-seal {
  width: 42px; height: 42px; border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, var(--gold), #6B5200);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; box-shadow: 0 0 0 1px rgba(184,144,10,.4);
}
.nav-title-en { font-family: 'Cinzel', serif; font-size: 15px; color: var(--parchment); letter-spacing: .5px; line-height: 1.2; }
.nav-title-ar { font-family: var(--far); font-size: 18px; color: var(--parchment); line-height: 1.2; }
.nav-sub { font-size: 9px; color: rgba(236,202,90,.45); letter-spacing: 1.5px; text-transform: uppercase; }
.nav-links { display: flex; gap: 24px; }
.nav-link { color: rgba(236,202,90,.5); font-size: 12.5px; font-weight: 500; cursor: pointer; transition: color .2s; }
.nav-link:hover { color: var(--gold-xl); }
.nav-right { display: flex; gap: 10px; align-items: center; }
.lang-btn {
  background: rgba(184,144,10,.13); border: 1px solid rgba(184,144,10,.3);
  color: var(--gold-xl); font-family: var(--fb); font-size: 12px; font-weight: 700;
  padding: 6px 14px; border-radius: 20px; cursor: pointer; transition: all .2s;
}
.lang-btn:hover { background: rgba(184,144,10,.26); }
.reserve-btn {
  background: linear-gradient(135deg, var(--gold), var(--gold-l));
  border: none; color: var(--night); font-family: var(--fb);
  font-size: 13px; font-weight: 800; padding: 9px 20px;
  border-radius: 20px; cursor: pointer; transition: all .2s;
}
.reserve-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(184,144,10,.4); }

/* ═══ HERO ═══ */
.hero {
  min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center;
  padding: 110px 5% 80px; position: relative; overflow: hidden;
  background:
    radial-gradient(ellipse at 50% 110%, rgba(184,144,10,.18) 0%, transparent 55%),
    radial-gradient(ellipse at 85% 15%,  rgba(122,26,42,.25)  0%, transparent 50%),
    radial-gradient(ellipse at 10% 60%,  rgba(26,58,106,.15)  0%, transparent 45%),
    var(--night);
}
/* geometric star lattice */
.hero-lattice {
  position: absolute; inset: 0; pointer-events: none; opacity: .055;
  background-image:
    repeating-linear-gradient(45deg,  rgba(184,144,10,1) 0, rgba(184,144,10,1) 1px, transparent 1px, transparent 50%),
    repeating-linear-gradient(-45deg, rgba(184,144,10,1) 0, rgba(184,144,10,1) 1px, transparent 1px, transparent 50%);
  background-size: 48px 48px;
}
.hero-arc {
  position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%);
  width: 900px; height: 450px;
  background: var(--parchment);
  border-radius: 50% 50% 0 0 / 100% 100% 0 0; opacity: .035;
}
.era-tag {
  display: inline-flex; align-items: center; gap: 10px;
  background: rgba(184,144,10,.12); border: 1px solid rgba(184,144,10,.3);
  border-radius: 20px; padding: 6px 18px; margin-bottom: 22px;
  font-size: 11px; font-weight: 700; color: var(--gold-xl);
  letter-spacing: 2px; text-transform: uppercase; position: relative; z-index: 1;
}
.hero-ayah {
  font-family: var(--far); font-size: clamp(16px,3vw,22px);
  color: rgba(236,202,90,.45); margin-bottom: 24px; font-style: italic;
  position: relative; z-index: 1; line-height: 1.8;
}
.hero-h-en {
  font-family: 'Cinzel', serif;
  font-size: clamp(40px,6vw,76px); font-weight: 700;
  color: var(--parchment); line-height: 1.1; margin-bottom: 20px;
  position: relative; z-index: 1; letter-spacing: .5px;
}
.hero-h-en em { font-style: italic; font-family: var(--fen); color: var(--gold-xl); font-weight: 400; }
.hero-h-ar {
  font-family: var(--far);
  font-size: clamp(38px,5.5vw,70px); font-weight: 700;
  color: var(--parchment); line-height: 1.45; margin-bottom: 20px;
  position: relative; z-index: 1;
}
.hero-h-ar em { font-style: normal; color: var(--gold-xl); }
.hero-sub {
  font-size: 16px; color: rgba(245,236,213,.5); line-height: 1.9;
  max-width: 560px; margin: 0 auto 40px; font-weight: 300;
  position: relative; z-index: 1;
}
.hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; z-index: 1; position: relative; }
.btn-primary {
  background: linear-gradient(135deg, var(--gold), var(--gold-l));
  border: none; color: var(--night); font-family: var(--fb);
  font-size: 15px; font-weight: 800; padding: 15px 32px;
  border-radius: 50px; cursor: pointer; transition: all .25s;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(184,144,10,.45); }
.btn-ghost {
  background: transparent; border: 1.5px solid rgba(236,202,90,.3);
  color: var(--gold-xl); font-family: var(--fb); font-size: 15px; font-weight: 600;
  padding: 14px 30px; border-radius: 50px; cursor: pointer; transition: all .25s;
}
.btn-ghost:hover { border-color: var(--gold-xl); background: rgba(184,144,10,.1); }
.hero-eras { display: flex; gap: 36px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }
.era-n { font-family: 'Cinzel', serif; font-size: 32px; font-weight: 700; color: var(--gold-xl); line-height: 1; }
.era-l { font-size: 11px; color: rgba(236,202,90,.4); margin-top: 5px; }

/* ═══ SECTIONS ═══ */
section { padding: 90px 5%; }
.sec-tag {
  font-size: 10px; font-weight: 700; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--gold);
  display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
}
.sec-tag::before { content:''; display:block; width:30px; height:1px; background:var(--gold); }
[dir="rtl"] .sec-tag::before { display:none; }
[dir="rtl"] .sec-tag::after { content:''; display:block; width:30px; height:1px; background:var(--gold); }
.sec-h-en {
  font-family: 'Cinzel', serif; font-size: clamp(28px,4vw,50px);
  font-weight: 700; color: var(--ink); line-height: 1.15; margin-bottom: 12px;
  letter-spacing: .3px;
}
.sec-h-en em { font-style: italic; font-family: var(--fen); color: var(--ruby); font-weight: 400; }
.sec-h-ar {
  font-family: var(--far); font-size: clamp(26px,3.8vw,46px);
  font-weight: 700; color: var(--ink); line-height: 1.5; margin-bottom: 12px;
}
.sec-h-ar em { font-style: normal; color: var(--ruby); }
.sec-p { font-size: 15px; color: var(--ochre); line-height: 1.9; max-width: 540px; }

/* ═══ HERITAGE STRIP ═══ */
.strip {
  background: var(--ruby); padding: 16px 5%;
  display: flex; gap: 0; align-items: center; overflow-x: auto;
  border-top: 1px solid rgba(236,202,90,.2);
  border-bottom: 1px solid rgba(236,202,90,.2);
}
.strip-item {
  display: flex; align-items: center; gap: 10px;
  padding: 0 28px; flex-shrink: 0;
  border-right: 1px solid rgba(236,202,90,.2);
}
[dir="rtl"] .strip-item { border-right: none; border-left: 1px solid rgba(236,202,90,.2); }
.strip-item:last-child { border: none; }
.strip-icon { font-size: 24px; }
.strip-text { font-size: 13px; font-weight: 600; color: rgba(245,236,213,.85); }

/* ═══ STORY ═══ */
.story-section { background: var(--vellum); }
.story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
.manuscript-card {
  background: linear-gradient(150deg, #2A1A06, #100A02);
  border-radius: var(--r); padding: 36px 32px; position: relative; overflow: hidden;
  box-shadow: var(--shadow-lg); border: 1px solid rgba(184,144,10,.25);
}
.manuscript-card::before {
  content: ''; position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient(0deg,   transparent, transparent 23px, rgba(184,144,10,.04) 23px, rgba(184,144,10,.04) 24px),
    repeating-linear-gradient(90deg,  transparent, transparent 23px, rgba(184,144,10,.04) 23px, rgba(184,144,10,.04) 24px);
}
.manuscript-title {
  font-family: var(--far); font-size: 22px; color: var(--gold-xl);
  text-align: center; margin-bottom: 24px; position: relative;
  border-bottom: 1px solid rgba(184,144,10,.25); padding-bottom: 16px;
}
.era-block { margin-bottom: 20px; position: relative; }
.era-label {
  font-size: 10px; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: var(--gold-l); margin-bottom: 6px;
}
.era-text { font-size: 13px; color: rgba(245,236,213,.6); line-height: 1.75; }
.era-divider { height: 1px; background: rgba(184,144,10,.15); margin: 16px 0; }
.story-content .sec-p { margin-bottom: 24px; }
.heritage-quote {
  background: var(--gold-bg); border-left: 3px solid var(--gold);
  border-radius: 0 var(--rsm) var(--rsm) 0; padding: 16px 20px;
  margin-top: 24px;
}
[dir="rtl"] .heritage-quote { border-left: none; border-right: 3px solid var(--gold); border-radius: var(--rsm) 0 0 var(--rsm); }
.heritage-quote p { font-family: var(--far); font-size: 15px; color: var(--sepia); line-height: 1.8; font-style: italic; }
.heritage-quote cite { font-size: 11px; color: var(--ochre); font-weight: 600; margin-top: 8px; display: block; }

/* ═══ MENU ═══ */
.menu-section { background: var(--aged); }
.menu-eras { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
.era-btn {
  padding: 9px 20px; border-radius: 20px;
  border: 1.5px solid var(--border); background: transparent;
  cursor: pointer; font-family: var(--fb); font-size: 12px; font-weight: 700;
  color: var(--ochre); transition: all .2s;
}
.era-btn.active { background: var(--ruby); border-color: var(--ruby); color: var(--parchment); }
.menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 20px; }
.dish-card {
  background: var(--vellum); border-radius: var(--r);
  border: 1px solid var(--border); box-shadow: var(--shadow-sm);
  overflow: hidden; cursor: pointer; transition: all .25s;
}
.dish-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
.dish-img {
  height: 175px; display: flex; align-items: center; justify-content: center;
  font-size: 72px; position: relative;
}
.dish-era-ribbon {
  position: absolute; top: 0; inset-inline-end: 0;
  background: var(--ruby); color: var(--parchment);
  font-size: 9px; font-weight: 800; letter-spacing: 1px;
  padding: 5px 12px 5px 16px; text-transform: uppercase;
  clip-path: polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%);
}
[dir="rtl"] .dish-era-ribbon { clip-path: polygon(0% 0%, 88% 0%, 100% 100%, 0% 100%); }
.dish-prophet-badge {
  position: absolute; top: 10px; inset-inline-start: 10px;
  background: var(--emerald); color: #fff;
  font-size: 9px; font-weight: 800; padding: 3px 8px; border-radius: 8px;
  letter-spacing: .5px;
}
.dish-body { padding: 18px 20px; }
.dish-name-ar { font-family: var(--far); font-size: 18px; font-weight: 700; color: var(--ink); margin-bottom: 2px; }
.dish-name-en { font-family: var(--fen); font-size: 15px; font-style: italic; color: var(--sepia); margin-bottom: 8px; }
.dish-origin { font-size: 10px; font-weight: 700; color: var(--lapis); letter-spacing: .8px; text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
.dish-desc { font-size: 12px; color: var(--ochre); line-height: 1.7; margin-bottom: 14px; min-height: 50px; }
.dish-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 12px; }
.dish-price { font-family: 'Cinzel', serif; font-size: 18px; font-weight: 700; color: var(--ruby); }
.dish-add {
  background: var(--ruby); color: var(--parchment); border: none;
  width: 34px; height: 34px; border-radius: 50%; font-size: 20px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .2s; line-height: 1;
}
.dish-add:hover { background: var(--ruby-l); transform: scale(1.1); }

/* ═══ ORDER / POLYDIAL ═══ */
.order-section {
  background:
    radial-gradient(ellipse at 20% 50%,  rgba(122,26,42,.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 30%,  rgba(184,144,10,.1) 0%, transparent 45%),
    #0A0602;
  position: relative; overflow: hidden;
}
.order-lattice {
  position: absolute; inset: 0; opacity: .04; pointer-events: none;
  background-image:
    repeating-linear-gradient(30deg,  rgba(184,144,10,1) 0, rgba(184,144,10,1) 1px, transparent 1px, transparent 60%),
    repeating-linear-gradient(-30deg, rgba(184,144,10,1) 0, rgba(184,144,10,1) 1px, transparent 1px, transparent 60%),
    repeating-linear-gradient(90deg,  rgba(184,144,10,1) 0, rgba(184,144,10,1) 1px, transparent 1px, transparent 60%);
  background-size: 40px 40px;
}
.order-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.order-content .sec-h-en { color: var(--parchment); }
.order-content .sec-h-ar { color: var(--parchment); }
.order-content .sec-tag { color: var(--gold-xl); }
.order-content .sec-tag::before { background: var(--gold-xl); }
.order-content .sec-tag::after { background: var(--gold-xl); }
.order-content .sec-p { color: rgba(245,236,213,.55); max-width: 420px; }
.order-features { display: flex; flex-direction: column; gap: 14px; margin-top: 28px; }
.order-feat {
  display: flex; gap: 14px; align-items: flex-start;
  background: rgba(184,144,10,.07); border: 1px solid rgba(184,144,10,.15);
  border-radius: var(--rsm); padding: 14px 16px;
}
.feat-icon { font-size: 22px; flex-shrink: 0; }
.feat-title { font-size: 14px; font-weight: 700; color: var(--gold-xl); margin-bottom: 3px; }
.feat-sub { font-size: 12px; color: rgba(245,236,213,.45); line-height: 1.6; }
/* polydial frame */
.pd-device {
  background: #0A0602; border-radius: 34px; padding: 8px;
  box-shadow: 0 0 0 1px rgba(184,144,10,.3), var(--shadow-lg);
}
.pd-screen {
  background: var(--vellum); border-radius: 28px;
  min-height: 580px; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 36px 24px; gap: 16px; text-align: center;
}
.pd-seal {
  width: 72px; height: 72px; border-radius: 20px;
  background: linear-gradient(135deg, #0055FF, #003BB3);
  display: flex; align-items: center; justify-content: center;
  font-size: 34px; box-shadow: 0 8px 28px rgba(0,85,255,.3);
}
.pd-title { font-size: 17px; font-weight: 800; color: var(--ink); }
.pd-sub { font-size: 13px; color: var(--ochre); line-height: 1.7; max-width: 260px; }
.pd-code {
  background: var(--aged); border: 1px solid var(--border);
  border-radius: var(--rsm); padding: 10px 16px;
  font-size: 10px; font-family: monospace; color: var(--ochre);
  letter-spacing: .5px; word-break: break-all;
}
.pd-note { font-size: 11px; color: var(--ochre); display: flex; align-items: center; gap: 6px; }

/* ═══ EXPERIENCE ═══ */
.exp-section { background: var(--vellum); }
.exp-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; margin-top: 44px; }
.exp-card {
  border-radius: var(--r); overflow: hidden;
  box-shadow: var(--shadow-sm); transition: transform .25s; cursor: pointer;
  border: 1px solid var(--border);
}
.exp-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
.exp-img {
  height: 180px; display: flex; align-items: center; justify-content: center;
  font-size: 72px; position: relative;
}
.exp-body { padding: 18px; background: var(--vellum); }
.exp-title { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
.exp-desc { font-size: 12px; color: var(--ochre); line-height: 1.7; }

/* ═══ VISIT ═══ */
.visit-section { background: var(--parchment); }
.visit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
.info-box {
  background: var(--vellum); border: 1px solid var(--border);
  border-radius: var(--r); padding: 20px 22px; margin-bottom: 14px;
  display: flex; gap: 16px; align-items: flex-start;
  box-shadow: var(--shadow-sm);
}
.info-icon {
  width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--ruby), var(--ruby-l));
  display: flex; align-items: center; justify-content: center; font-size: 22px;
}
.info-label { font-size: 10px; font-weight: 700; color: var(--ruby); letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 5px; }
.info-val { font-size: 13px; color: var(--sepia); line-height: 1.8; white-space: pre-line; }
.map-box {
  background: var(--vellum); border: 1px solid var(--border); border-radius: var(--r);
  min-height: 290px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 10px;
  font-size: 52px; padding: 32px; box-shadow: var(--shadow-sm);
}
.map-box p { font-size: 13px; color: var(--ochre); }

/* ═══ FOOTER ═══ */
footer {
  background: var(--night); padding: 56px 5% 28px;
  border-top: 1px solid rgba(184,144,10,.15);
}
.footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 44px; }
.footer-brand-en { font-family: 'Cinzel', serif; font-size: 18px; color: var(--parchment); margin-bottom: 8px; letter-spacing: .3px; }
.footer-brand-ar { font-family: var(--far); font-size: 22px; color: var(--parchment); margin-bottom: 8px; }
.footer-tagline { font-size: 12px; color: rgba(245,236,213,.3); line-height: 1.7; max-width: 230px; }
.footer-col-h { font-size: 10px; font-weight: 700; color: var(--gold-l); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px; }
.footer-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.footer-list a { font-size: 13px; color: rgba(245,236,213,.32); text-decoration: none; cursor: pointer; transition: color .2s; }
.footer-list a:hover { color: var(--gold-xl); }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid rgba(184,144,10,.1); flex-wrap: wrap; gap: 12px; }
.footer-copy { font-size: 12px; color: rgba(245,236,213,.2); }
.footer-pd { font-size: 12px; color: rgba(245,236,213,.28); display: flex; align-items: center; gap: 5px; }
.footer-pd span { color: rgba(100,160,255,.65); font-weight: 600; }

/* ═══ RESPONSIVE ═══ */
@media (max-width: 960px) {
  .story-grid, .order-grid, .visit-grid { grid-template-columns: 1fr; gap: 40px; }
  .exp-grid { grid-template-columns: 1fr 1fr; }
  .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
  .nav-links { display: none; }
  .nav-right .reserve-btn { display: none; }
}
@media (max-width: 540px) {
  .exp-grid, .footer-top { grid-template-columns: 1fr; }
  .hero-eras { gap: 20px; }
  section { padding: 64px 5%; }
}
`;

/* ══════════════════════════════════════════════
   MENU DATA — authentic ancient Islamic dishes
══════════════════════════════════════════════ */
const MENU = {
  prophetic: [
    {
      emoji:"🍯", era:{ar:"سنوي",en:"Prophetic"},
      nameAr:"ثريد", nameEn:"Tharid",
      origin:{ar:"الجزيرة العربية",en:"Arabian Peninsula"},
      desc:{ar:"خبز مفتوت مع مرق الخروف — أحب الطعام إلى رسول الله ﷺ، ذُكر في الصحيح",en:"Bread crumbled in lamb broth — the Prophet's ﷺ most beloved dish, mentioned in authentic hadith"},
      price:"CAD 22.00", prophet:true,
    },
    {
      emoji:"🫒", era:{ar:"سنوي",en:"Prophetic"},
      nameAr:"زيت وزيتون", nameEn:"Olive & Olive Oil",
      origin:{ar:"بلاد الشام",en:"Levant"},
      desc:{ar:"خبز مخبوز على الحطب مع زيت الزيتون البكر — شجرة مباركة في القرآن الكريم",en:"Wood-fired flatbread with extra virgin olive oil — the blessed tree of the Holy Quran"},
      price:"CAD 12.00", prophet:true,
    },
    {
      emoji:"🍖", era:{ar:"سنوي",en:"Prophetic"},
      nameAr:"لحم مشوي بالتمر", nameEn:"Grilled Lamb with Dates",
      origin:{ar:"المدينة المنورة",en:"Madinah"},
      desc:{ar:"لحم خروف مشوي على الفحم مع تمر العجوة — وليمة على سنة النبي ﷺ",en:"Charcoal-grilled lamb with premium Ajwa dates — a feast in the Prophetic tradition"},
      price:"CAD 34.00", prophet:true,
    },
    {
      emoji:"🥛", era:{ar:"سنوي",en:"Prophetic"},
      nameAr:"حيس", nameEn:"Hays",
      origin:{ar:"الحجاز",en:"Hijaz"},
      desc:{ar:"تمر وسمن وأقط — حلوى النبي ﷺ في أفراحه وأعياده",en:"Dates, clarified butter and dried cheese — the Prophet's ﷺ sweet for celebrations"},
      price:"CAD 16.00", prophet:true,
    },
  ],
  abbasid: [
    {
      emoji:"🍲", era:{ar:"عباسي",en:"Abbasid"},
      nameAr:"سكباج", nameEn:"Sikbāj",
      origin:{ar:"بغداد — القرن العاشر",en:"Baghdad — 10th Century"},
      desc:{ar:"لحم مطبوخ بالخل والعسل وبهارات فارسية — من كتاب الطبيخ لابن سيار الوراق",en:"Meat braised with vinegar, honey & Persian spices — from Ibn Sayyar al-Warraq's cookbook"},
      price:"CAD 28.00", prophet:false,
    },
    {
      emoji:"🍛", era:{ar:"عباسي",en:"Abbasid"},
      nameAr:"هريسة البغدادية", nameEn:"Baghdadi Harisah",
      origin:{ar:"بغداد",en:"Baghdad"},
      desc:{ar:"قمح مطحون مع لحم الخروف والسمن — طعام الخلفاء العباسيين في ليالي الشتاء",en:"Wheat slow-cooked with lamb and clarified butter — the Abbasid caliphs' winter feast dish"},
      price:"CAD 24.00", prophet:false,
    },
    {
      emoji:"🥘", era:{ar:"عباسي",en:"Abbasid"},
      nameAr:"مضيرة", nameEn:"Madhīrah",
      origin:{ar:"بغداد",en:"Baghdad"},
      desc:{ar:"لحم مطبوخ باللبن الحامض — طبق الوزير الشهير ابن المدبر المذكور في الأغاني",en:"Lamb cooked in soured milk — the famous dish of Vizier Ibn al-Mudabbir, mentioned in Kitab al-Aghani"},
      price:"CAD 26.00", prophet:false,
    },
    {
      emoji:"🧁", era:{ar:"عباسي",en:"Abbasid"},
      nameAr:"لوزينج", nameEn:"Lauzinaj",
      origin:{ar:"فارس — بغداد",en:"Persia via Baghdad"},
      desc:{ar:"معين اللوز المحشو بالسكر والورد — جد البقلاوة الحديثة",en:"Diamond-shaped almond pastry with rosewater sugar — the ancestor of modern baklava"},
      price:"CAD 14.00", prophet:false,
    },
  ],
  andalusian: [
    {
      emoji:"🍗", era:{ar:"أندلسي",en:"Andalusian"},
      nameAr:"مرقة الدجاج بالزعفران", nameEn:"Saffron Chicken Broth",
      origin:{ar:"قرطبة — القرن الثاني عشر",en:"Córdoba — 12th Century"},
      desc:{ar:"دجاج مطبوخ بالزعفران الإسباني والقرفة — من كتاب الطبخ الأندلسي المجهول",en:"Chicken braised with Spanish saffron & cinnamon — from the anonymous Andalusian cookbook"},
      price:"CAD 29.00", prophet:false,
    },
    {
      emoji:"🥐", era:{ar:"أندلسي",en:"Andalusian"},
      nameAr:"إسفنج الأندلس", nameEn:"Andalusian Isfunj",
      origin:{ar:"الأندلس",en:"Al-Andalus"},
      desc:{ar:"خبز مقلي بالعسل والزعفران — جد الدونات الحديث، وُصف في المخطوطات الأندلسية",en:"Fried dough with honey & saffron — the ancestor of the modern doughnut, described in Andalusian manuscripts"},
      price:"CAD 13.00", prophet:false,
    },
    {
      emoji:"🫕", era:{ar:"أندلسي",en:"Andalusian"},
      nameAr:"تنجية الحمل", nameEn:"Lamb Tanjia",
      origin:{ar:"غرناطة",en:"Granada"},
      desc:{ar:"خروف يُطهى ببطء في إناء طيني بالزيت والكمون — وصفة محفوظة من عصر ملوك الطوائف",en:"Lamb slow-cooked in a clay pot with olive oil & cumin — a preserved recipe from the Taifa period"},
      price:"CAD 36.00", prophet:false,
    },
    {
      emoji:"🍮", era:{ar:"أندلسي",en:"Andalusian"},
      nameAr:"عصيدة اللوز", nameEn:"Almond Asida",
      origin:{ar:"الأندلس",en:"Al-Andalus"},
      desc:{ar:"حليب اللوز المكثف بالعسل وماء الورد — من حلوى قرطبة في المناسبات الكبرى",en:"Thickened almond milk with honey & rosewater — Córdoba's celebration dessert"},
      price:"CAD 15.00", prophet:false,
    },
  ],
  ottoman: [
    {
      emoji:"🍖", era:{ar:"عثماني",en:"Ottoman"},
      nameAr:"قوزي محشي", nameEn:"Stuffed Qawzi Lamb",
      origin:{ar:"إسطنبول — القرن السادس عشر",en:"Istanbul — 16th Century"},
      desc:{ar:"خروف كامل محشو بالأرز والمكسرات والتوابل العثمانية — وليمة السلاطين",en:"Whole lamb stuffed with rice, nuts & Ottoman spices — the sultan's feast dish"},
      price:"CAD 48.00", prophet:false,
    },
    {
      emoji:"🥣", era:{ar:"عثماني",en:"Ottoman"},
      nameAr:"آش رشته", nameEn:"Ash Reshteh",
      origin:{ar:"الإمبراطورية العثمانية",en:"Ottoman Empire"},
      desc:{ar:"شوربة العدس والمعكرونة اليدوية والسبانخ — طعام الشتاء في المطابخ العثمانية",en:"Lentil soup with hand-rolled pasta and spinach — the Ottoman palace winter staple"},
      price:"CAD 18.00", prophet:false,
    },
    {
      emoji:"🍬", era:{ar:"عثماني",en:"Ottoman"},
      nameAr:"بقلاوة السلطان", nameEn:"Sultan's Baklava",
      origin:{ar:"مطبخ توب قابي",en:"Topkapi Palace Kitchen"},
      desc:{ar:"طبقات رقيقة من عجينة الفيلو بالفستق الحلبي وقطر الورد — وصفة القرن السابع عشر",en:"Thin filo layers with Aleppo pistachios and rose syrup — a 17th-century palace recipe"},
      price:"CAD 16.00", prophet:false,
    },
  ],
};

const ERA_LABELS = {
  prophetic:  {ar:"الطعام النبوي",    en:"Prophetic Table"},
  abbasid:    {ar:"المطبخ العباسي",   en:"Abbasid Kitchen"},
  andalusian: {ar:"مطبخ الأندلس",    en:"Andalusian Table"},
  ottoman:    {ar:"المطبخ العثماني",  en:"Ottoman Kitchen"},
};

const EXPERIENCES = [
  {
    emoji:"📜", bg:"135deg,#2A1A06,#100A02",
    title:{ar:"مجلس الطعام التاريخي",         en:"Historical Dining Majlis"},
    desc:{ar:"تناول طعامك جالساً على الأرض كما كانت العادة في المجالس الإسلامية العريقة",en:"Dine seated on the floor as was the tradition in classical Islamic gatherings"},
  },
  {
    emoji:"🎙", bg:"135deg,#0B4D35,#051A12",
    title:{ar:"الراوي — مرشدك الصوتي",        en:"The Narrator — Voice Guide"},
    desc:{ar:"اطلب طعامك بصوتك مع بولي دايل واستمع لقصة كل طبق عبر الذكاء الاصطناعي",en:"Voice-order with PolyDial and hear the story of every dish through AI narration"},
  },
  {
    emoji:"🕌", bg:"135deg,#3A1A0A,#160A04",
    title:{ar:"ليالي رمضان التاريخية",         en:"Historic Ramadan Nights"},
    desc:{ar:"سفرة إفطار أندلسية وعباسية كاملة — حجز مسبق مطلوب في الشهر الكريم",en:"Full Andalusian & Abbasid Iftar spread — advance booking required in Ramadan"},
  },
];

export default function IslamicHeritage() {
  const [lang, setLang] = useState("ar");
  const [era, setEra]   = useState("prophetic");
  const [cart, setCart] = useState({});
  const t   = lang === "ar";
  const dir = t ? "rtl" : "ltr";
  const add = (k) => setCart(p => ({ ...p, [k]: (p[k]||0)+1 }));
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <div dir={dir} style={{ fontFamily:"'Cairo',sans-serif" }}>
      <style>{FONTS}{CSS}</style>

      {/* ══ NAV ══ */}
      <nav className="nav">
        <div className="nav-brand" onClick={() => scrollTo("home")}>
          <div className="nav-seal">☪️</div>
          <div>
            {t
              ? <div className="nav-title-ar">موروث إسلامي</div>
              : <><div className="nav-title-en">Islamic Heritage</div><div className="nav-sub">ANCESTRAL TABLE · CANADA</div></>}
          </div>
        </div>
        <div className="nav-links">
          {[["story",t?"الحكاية":"Our Story"],["menu",t?"القائمة":"The Menu"],["order",t?"اطلب":"Order"],["experience",t?"التجربة":"Experience"],["visit",t?"زيارتنا":"Visit"]].map(([id,lbl]) => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{lbl}</span>
          ))}
        </div>
        <div className="nav-right">
          <button className="lang-btn" onClick={() => setLang(l => l==="ar"?"en":"ar")}>{t?"EN":"ع"}</button>
          <button className="reserve-btn" onClick={() => scrollTo("visit")}>{t ? "📅 احجز طاولتك" : "📅 Reserve"}</button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero" id="home">
        <div className="hero-lattice"/><div className="hero-arc"/>
        <div className="era-tag">🌙 islamic-heritage.ca</div>
        <div className="hero-ayah">
          {t ? "﴿ كُلُوا مِن طَيِّبَاتِ مَا رَزَقْنَاكُمْ ﴾" : "﴿ Eat of the good things We have provided for you ﴾"}
        </div>
        {t
          ? <h1 className="hero-h-ar">على مائدة<br/><em>أجدادنا</em></h1>
          : <h1 className="hero-h-en">At the table of<br/><em>our ancestors</em></h1>}
        <p className="hero-sub">
          {t
            ? "مطعم يُحيي وصفات الحضارة الإسلامية — من المائدة النبوية إلى طهي الأندلس والعباسيين والعثمانيين."
            : "A restaurant reviving the recipes of Islamic civilisation — from the Prophetic table to the kitchens of Andalusia, Baghdad and Istanbul."}
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollTo("menu")}>{t ? "🍽 تصفح القائمة التاريخية" : "🍽 Browse Heritage Menu"}</button>
          <button className="btn-ghost" onClick={() => scrollTo("order")}>{t ? "🎙 اطلب بصوتك" : "🎙 Voice Order"}</button>
        </div>
        <div className="hero-eras">
          {[[t?"نبوي":"Prophetic",t?"المائدة النبوية":"Table"],[t?"عباسي":"Abbasid",t?"بغداد":"Baghdad"],[t?"أندلسي":"Andalusian",t?"قرطبة":"Córdoba"],[t?"عثماني":"Ottoman",t?"إسطنبول":"Istanbul"]].map(([n,l],i) => (
            <div key={i} style={{textAlign:"center"}}>
              <div className="era-n">{n}</div>
              <div className="era-l">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ STRIP ══ */}
      <div className="strip">
        {[
          [t?"وصفات موثّقة في المخطوطات":"Recipes from historical manuscripts","📜"],
          [t?"مكونات أصيلة مستوردة":"Authentic imported ingredients","🌿"],
          [t?"طهاة متخصصون في الطبخ التاريخي":"Specialist heritage chefs","👨‍🍳"],
          [t?"حلال ومعتمد":"Halal certified","✅"],
          [t?"تجربة ثقافية فريدة":"Unique cultural experience","🏛"],
        ].map(([txt,ic],i) => (
          <div key={i} className="strip-item">
            <span className="strip-icon">{ic}</span>
            <span className="strip-text">{txt}</span>
          </div>
        ))}
      </div>

      {/* ══ STORY ══ */}
      <section className="story-section" id="story">
        <div className="story-grid">
          <div className="manuscript-card">
            <div className="manuscript-title">
              {t ? "من مخطوطات المطبخ الإسلامي" : "From Islamic Culinary Manuscripts"}
            </div>
            {[
              [t?"المائدة النبوية (٦٢٢–٦٣٢م)":"Prophetic Table (622–632 CE)", t?"ثريد، حيس، تمر، لبن — ما أكله خير البشر ﷺ":"Tharid, Hays, dates, laban — what the best of creation ﷺ ate"],
              [t?"كتاب الطبيخ — بغداد (٩٥٠م)":"Kitab al-Tabikh — Baghdad (950 CE)", t?"أقدم كتاب طبخ إسلامي محفوظ لابن سيار الوراق":"The oldest preserved Islamic cookbook by Ibn Sayyar al-Warraq"],
              [t?"المطبخ الأندلسي (١١٧٩م)":"Andalusian Cuisine (1179 CE)", t?"مخطوط ابن رزين التجيبي في الطبخ الأندلسي":"Ibn Razin al-Tujibi's Andalusian culinary manuscript"],
              [t?"كنز الفوائد العثماني (١٦٠٠م)":"Ottoman Kanz al-Fawa'id (1600 CE)", t?"وصفات مطبخ قصر توب قابي وولائم السلاطين":"Recipes from Topkapi Palace kitchen and Sultan's banquets"],
            ].map(([label, text], i) => (
              <div key={i}>
                {i > 0 && <div className="era-divider"/>}
                <div className="era-block">
                  <div className="era-label">{label}</div>
                  <div className="era-text">{text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="story-content">
            <div className="sec-tag">{t?"حكايتنا":"Our Story"}</div>
            {t
              ? <h2 className="sec-h-ar">الطعام <em>ذاكرةٌ</em><br/>لا تُنسى</h2>
              : <h2 className="sec-h-en">Food is an<br/><em>unforgettable</em> memory</h2>}
            <p className="sec-p" style={{marginBottom:16}}>
              {t
                ? "وراء كل طبق في مطعمنا مخطوطة قديمة أو رواية صحيحة. نعيد إحياء وصفات ثبتت في كتب الطبخ الإسلامية ووصلت إلينا عبر مئات السنين."
                : "Behind every dish in our restaurant is an ancient manuscript or authentic narration. We revive recipes documented in Islamic culinary books, passed down through centuries."}
            </p>
            <p className="sec-p">
              {t
                ? "من ثريد النبي ﷺ إلى سكباج بغداد العباسية وإسفنج الأندلس وبقلاوة توب قابي — كل لقمة سفرٌ عبر الزمن."
                : "From the Prophet's ﷺ Tharid to Abbasid Baghdad's Sikbaj, Andalusian Isfunj, and Topkapi Baklava — every bite is a journey through time."}
            </p>
            <div className="heritage-quote">
              <p>{t ? "«فَضْلُ عَائِشَةَ عَلَى النِّسَاءِ كَفَضْلِ الثَّرِيدِ عَلَى سَائِرِ الطَّعَامِ»" : '"The virtue of Aisha over women is like the virtue of Tharid over all other food."'}</p>
              <cite>{t ? "— رواه البخاري ومسلم" : "— Narrated by al-Bukhari and Muslim"}</cite>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MENU ══ */}
      <section className="menu-section" id="menu">
        <div className="sec-tag">{t?"القائمة التاريخية":"Heritage Menu"}</div>
        {t
          ? <h2 className="sec-h-ar">اختر <em>حقبتك</em> التاريخية</h2>
          : <h2 className="sec-h-en">Choose your <em>era</em></h2>}
        <p className="sec-p" style={{marginBottom:28}}>
          {t
            ? "كل طبق موثّق من مصدره التاريخي — مخطوطة، رواية، أو وصف في كتب التراث."
            : "Every dish sourced from its historical record — manuscript, narration, or description in heritage literature."}
        </p>
        <div className="menu-eras">
          {Object.keys(MENU).map(k => (
            <button key={k} className={`era-btn ${era===k?"active":""}`} onClick={() => setEra(k)}>
              {ERA_LABELS[k][lang]}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {MENU[era].map((dish) => {
            const key = dish.nameEn; const cnt = cart[key]||0;
            return (
              <div key={key} className="dish-card">
                <div className="dish-img" style={{background:`linear-gradient(150deg,hsl(${key.charCodeAt(0)*9%40+10},40%,14%),#0A0602)`}}>
                  <span style={{fontSize:72}}>{dish.emoji}</span>
                  <div className="dish-era-ribbon">{dish.era[lang]}</div>
                  {dish.prophet && <div className="dish-prophet-badge">{t?"نبوي ✓":"Prophetic ✓"}</div>}
                </div>
                <div className="dish-body">
                  <div className="dish-name-ar">{dish.nameAr}</div>
                  <div className="dish-name-en">{dish.nameEn}</div>
                  <div className="dish-origin">🗺 {dish.origin[lang]}</div>
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

      {/* ══ ORDER / POLYDIAL ══ */}
      <section className="order-section" id="order">
        <div className="order-lattice"/>
        <div className="order-grid">
          <div className="order-content">
            <div className="sec-tag">{t?"اطلب الآن":"Order Now"}</div>
            {t
              ? <h2 className="sec-h-ar">اطلب طعام<br/><em>أجدادك</em> بصوتك</h2>
              : <h2 className="sec-h-en">Order your<br/><em>ancestors' food</em> by voice</h2>}
            <p className="sec-p">
              {t
                ? "بولي دايل يفهم طلبك بالعربية والإنجليزية ويرويلك قصة كل طبق اخترته."
                : "PolyDial understands your order in Arabic and English — and narrates the story of every dish you choose."}
            </p>
            <div className="order-features">
              {[
                ["🎙", t?"اطلب بصوتك":"Order by Voice",       t?"تكلم وبولي يفهم — عربي وإنجليزي":"Speak and Poly understands — Arabic & English"],
                ["📜", t?"قصة كل طبق":"Story of Every Dish",  t?"بولي يروي تاريخ الطبق وأصله":"Poly narrates each dish's history and origin"],
                ["🕌", t?"حجز طاولة":"Table Reservation",      t?"احجز تجربة المجلس التاريخي":"Book the historical Majlis experience"],
                ["🔄", t?"أعد طلبك":"Reorder Easily",           t?"تاريخ طلباتك محفوظ دائماً":"Your order history is always saved"],
              ].map(([icon, title, sub]) => (
                <div key={title} className="order-feat">
                  <span className="feat-icon">{icon}</span>
                  <div>
                    <div className="feat-title">{title}</div>
                    <div className="feat-sub">{sub}</div>
                  </div>
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
              <div className="pd-seal">🎙</div>
              <div className="pd-title">{t ? "بولي دايل — الراوي الصوتي" : "PolyDial — Voice Narrator"}</div>
              <div className="pd-sub">
                {t
                  ? "نظام بولي دايل للطلب الصوتي سيُضمَّن هنا — اطلب وجبتك واستمع لتاريخها."
                  : "PolyDial voice ordering widget will be embedded here — order and hear each dish's history."}
              </div>
              <div className="pd-code">{`<iframe src="https://customer.polydial.com/?rk=YOUR_KEY" />`}</div>
              <div className="pd-note">
                <span>⚡</span>
                {t ? "المفتاح يُوفَّر من فريق بولي دايل" : "Key provided by the PolyDial team"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section className="exp-section" id="experience">
        <div className="sec-tag">{t?"التجربة":"The Experience"}</div>
        {t
          ? <h2 className="sec-h-ar">أكثر من مجرد<br/><em>وجبة</em></h2>
          : <h2 className="sec-h-en">More than<br/>just a <em>meal</em></h2>}
        <div className="exp-grid">
          {EXPERIENCES.map((e) => (
            <div key={e.title.en} className="exp-card">
              <div className="exp-img" style={{background:`linear-gradient(${e.bg})`}}>
                <span style={{fontSize:72}}>{e.emoji}</span>
              </div>
              <div className="exp-body">
                <div className="exp-title">{e.title[lang]}</div>
                <div className="exp-desc">{e.desc[lang]}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ VISIT ══ */}
      <section className="visit-section" id="visit">
        <div className="visit-grid">
          <div>
            <div className="sec-tag">{t?"زيارتنا":"Visit Us"}</div>
            {t
              ? <h2 className="sec-h-ar">نتشرف<br/>بضيافتكم</h2>
              : <h2 className="sec-h-en">We are honoured<br/>to host you</h2>}
            <p className="sec-p" style={{marginBottom:28}}>
              {t
                ? "مطعم في قلب كندا يرحب بكل من يريد أن يذوق طعام التاريخ الإسلامي العريق."
                : "A restaurant in the heart of Canada welcoming all who wish to taste the food of Islamic history."}
            </p>
            {[
              ["📍", t?"العنوان":"Address",          t?"٨٨ شارع هيريتيج، أوتاوا، أونتاريو، كندا":"88 Heritage Way, Ottawa, ON, Canada"],
              ["🕐", t?"أوقات العمل":"Hours",         t?"الثلاثاء–الأحد: ١٢م – ١٠م\nالاثنين: مغلق":"Tue–Sun: 12pm – 10pm\nMonday: Closed"],
              ["📞", t?"هاتف":"Phone",                "+1 (613) 555-0312"],
              ["📧", t?"بريد إلكتروني":"Email",       "dine@islamic-heritage.ca"],
              ["✅", t?"حلال معتمد":"Halal Certified",t?"معتمد من المجلس الإسلامي الكندي":"Certified by the Islamic Council of Canada"],
            ].map(([icon,label,val]) => (
              <div key={label} className="info-box">
                <div className="info-icon">{icon}</div>
                <div><div className="info-label">{label}</div><div className="info-val">{val}</div></div>
              </div>
            ))}
          </div>
          <div>
            <div className="map-box">
              <span>🗺️</span>
              <p>{t ? "الخريطة — أوتاوا، كندا" : "Map — Ottawa, Canada"}</p>
            </div>
            <div style={{marginTop:16,background:"linear-gradient(135deg,var(--ruby),var(--ruby-l))",borderRadius:"var(--r)",padding:"24px",border:"1px solid rgba(245,236,213,.1)"}}>
              <div style={{fontSize:16,fontWeight:700,color:"var(--parchment)",marginBottom:8}}>
                {t ? "📅 حجز الطاولات" : "📅 Table Reservations"}
              </div>
              <div style={{fontSize:13,color:"rgba(245,236,213,.6)",lineHeight:1.75,marginBottom:16}}>
                {t
                  ? "لتجربة المجلس التاريخي أو وليمة الإفطار الرمضاني — الحجز مطلوب قبل ٤٨ ساعة."
                  : "For the historical Majlis experience or Ramadan Iftar banquet — booking required 48 hours in advance."}
              </div>
              <button className="btn-primary" style={{width:"100%"}}>
                {t ? "احجز عبر الهاتف أو البريد" : "Book via Phone or Email"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="divider-ornament" style={{marginBottom:40}}>
          <div className="div-line"/><div className="div-gem">✦</div>
          <div className="div-gem" style={{fontFamily:"var(--far)",fontSize:18,color:"rgba(184,144,10,.5)"}}>☪</div>
          <div className="div-gem">✦</div><div className="div-line"/>
        </div>
        <div className="footer-top">
          <div>
            {t
              ? <div className="footer-brand-ar">موروث إسلامي</div>
              : <div className="footer-brand-en">Islamic Heritage</div>}
            <p className="footer-tagline">
              {t
                ? "على مائدة أجدادنا — islamic-heritage.ca — أوتاوا، كندا"
                : "At the table of our ancestors — islamic-heritage.ca — Ottawa, Canada"}
            </p>
          </div>
          <div>
            <div className="footer-col-h">{t?"روابط":"Links"}</div>
            <ul className="footer-list">
              {[["story",t?"حكايتنا":"Story"],["menu",t?"القائمة":"Menu"],["order",t?"اطلب":"Order"],["visit",t?"زيارتنا":"Visit"]].map(([id,lbl]) => (
                <li key={id}><a onClick={() => scrollTo(id)}>{lbl}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-h">{t?"الحقب":"Eras"}</div>
            <ul className="footer-list">
              {Object.keys(ERA_LABELS).map(k => <li key={k}><a onClick={() => {setEra(k);scrollTo("menu");}}>{ERA_LABELS[k][lang]}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="footer-col-h">{t?"تواصل":"Contact"}</div>
            <ul className="footer-list">
              <li><a>dine@islamic-heritage.ca</a></li>
              <li><a>+1 (613) 555-0312</a></li>
              <li><a>{t?"أوتاوا، كندا":"Ottawa, Canada"}</a></li>
              <li><a onClick={() => setLang(l => l==="ar"?"en":"ar")}>{t?"English":"العربية"}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2024 Islamic Heritage Restaurant · islamic-heritage.ca · {t?"جميع الحقوق محفوظة":"All rights reserved"}</div>
          <div className="footer-pd">{t?"الطلبات عبر":"Orders via"} <span>PolyDial</span> 🎙</div>
        </div>
      </footer>
    </div>
  );
}
