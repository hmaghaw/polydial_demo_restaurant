import { useState } from "react";

/* ══════════════════════════════════════════════
   CARDSMAX — cardsmax.com
   Egyptian Family Restaurant · Max Portions · Max Fun
   Bilingual Arabic / English · PolyDial ready
══════════════════════════════════════════════ */

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Cairo:wght@300;400;500;600;700;900&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');
`;

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --pharaoh:   #B8860B;
  --gold:      #D4A017;
  --gold-l:    #F0C040;
  --gold-xl:   #FFD966;
  --gold-bg:   #FDF6E3;
  --brick:     #C0392B;
  --brick-l:   #E04030;
  --brick-bg:  #FCEAEA;
  --nile:      #0A4D6B;
  --nile-l:    #0E6A94;
  --nile-bg:   #E6F2F8;
  --sand:      #F5EDD8;
  --linen:     #FAF4E8;
  --cream:     #FFFDF5;
  --papyrus:   #EDE0C4;
  --ink:       #1A1006;
  --mid:       #3A2810;
  --muted:     #7A5A30;
  --border:    #DCCCA0;
  --green:     #1A6B3A;
  --green-bg:  #E8F5EE;
  --shadow-sm: 0 2px 14px rgba(26,16,6,.08);
  --shadow-md: 0 8px 36px rgba(26,16,6,.13);
  --shadow-lg: 0 24px 72px rgba(26,16,6,.2);
  --r:   18px;
  --rsm: 11px;
  --fen: 'Playfair Display', serif;
  --far: 'Amiri', serif;
  --fb:  'Cairo', sans-serif;
}
html { scroll-behavior: smooth; }
body { background: var(--linen); color: var(--ink); font-family: var(--fb); }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 4px; }

/* ══ EGYPTIAN PATTERN BG ══ */
.pharaoh-bg {
  background-image:
    repeating-linear-gradient(45deg,  transparent, transparent 14px, rgba(184,134,11,.06) 14px, rgba(184,134,11,.06) 15px),
    repeating-linear-gradient(-45deg, transparent, transparent 14px, rgba(184,134,11,.06) 14px, rgba(184,134,11,.06) 15px);
}

/* ══ NAV ══ */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  background: rgba(26,16,6,.96); backdrop-filter: blur(14px);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 5%; height: 70px;
  border-bottom: 1px solid rgba(212,160,23,.25);
}
.nav-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; }
.nav-emblem {
  display: flex; align-items: center; justify-content: center;
  width: 42px; height: 42px; border-radius: 12px;
  background: linear-gradient(135deg, var(--pharaoh), var(--gold-l));
  font-family: var(--fen); font-size: 17px; font-weight: 900;
  color: var(--ink); letter-spacing: -1px; box-shadow: 0 4px 12px rgba(212,160,23,.4);
}
.nav-name-en { font-family: var(--fen); font-size: 20px; font-weight: 900; color: var(--cream); letter-spacing: -0.3px; }
.nav-name-ar { font-family: var(--far); font-size: 20px; font-weight: 700; color: var(--cream); }
.nav-max-badge {
  background: rgba(212,160,23,.15); border: 1px solid rgba(212,160,23,.3);
  color: var(--gold-xl); font-size: 9px; font-weight: 900;
  padding: 3px 8px; border-radius: 8px; letter-spacing: 1px; text-transform: uppercase;
}
.nav-links { display: flex; gap: 24px; }
.nav-link { color: rgba(255,217,102,.5); font-size: 13px; font-weight: 500; cursor: pointer; transition: color .2s; }
.nav-link:hover { color: var(--gold-xl); }
.nav-right { display: flex; gap: 10px; align-items: center; }
.lang-btn {
  background: rgba(212,160,23,.12); border: 1px solid rgba(212,160,23,.28);
  color: var(--gold-xl); font-family: var(--fb); font-size: 12px; font-weight: 700;
  padding: 6px 14px; border-radius: 20px; cursor: pointer; transition: all .2s;
}
.lang-btn:hover { background: rgba(212,160,23,.25); }
.book-btn {
  background: linear-gradient(135deg, var(--brick), var(--brick-l));
  border: none; color: #fff; font-family: var(--fb);
  font-size: 13px; font-weight: 800; padding: 9px 20px;
  border-radius: 20px; cursor: pointer; transition: all .2s;
}
.book-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(192,57,43,.4); }

/* ══ HERO ══ */
.hero {
  min-height: 100vh; display: flex; align-items: center;
  padding: 100px 5% 80px; position: relative; overflow: hidden;
  background:
    radial-gradient(ellipse at 75% 40%, rgba(192,57,43,.3) 0%, transparent 50%),
    radial-gradient(ellipse at 15% 70%, rgba(212,160,23,.15) 0%, transparent 45%),
    radial-gradient(ellipse at 50% 5%,  rgba(10,77,107,.1) 0%, transparent 40%),
    #110A04;
}
.hero-hieroglyph {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    repeating-linear-gradient(0deg,   transparent, transparent 39px, rgba(212,160,23,.04) 39px, rgba(212,160,23,.04) 40px),
    repeating-linear-gradient(90deg,  transparent, transparent 39px, rgba(212,160,23,.04) 39px, rgba(212,160,23,.04) 40px);
}
.hero-pyramid {
  position: absolute; bottom: 0; inset-inline-end: 3%;
  width: 0; height: 0;
  border-left: 220px solid transparent;
  border-right: 220px solid transparent;
  border-bottom: 340px solid rgba(212,160,23,.05);
  filter: blur(2px);
}
.hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; width: 100%; max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(212,160,23,.12); border: 1px solid rgba(212,160,23,.28);
  border-radius: 20px; padding: 6px 16px; margin-bottom: 22px;
  font-size: 11px; font-weight: 700; color: var(--gold-xl);
  letter-spacing: 1.5px; text-transform: uppercase;
}
.hero-h-en {
  font-family: var(--fen); font-size: clamp(44px,6vw,76px);
  font-weight: 900; color: var(--cream); line-height: 1.05; margin-bottom: 18px;
  letter-spacing: -0.5px;
}
.hero-h-en em { font-style: italic; color: var(--gold-xl); }
.hero-h-ar {
  font-family: var(--far); font-size: clamp(40px,5.5vw,68px);
  font-weight: 700; color: var(--cream); line-height: 1.4; margin-bottom: 18px;
}
.hero-h-ar em { font-style: normal; color: var(--gold-xl); }
.hero-sub { font-size: 15px; color: rgba(255,253,245,.5); line-height: 1.85; max-width: 460px; margin-bottom: 36px; font-weight: 300; }
.hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 44px; }
.btn-gold {
  background: linear-gradient(135deg, var(--gold), var(--gold-l));
  border: none; color: var(--ink); font-family: var(--fb);
  font-size: 15px; font-weight: 800; padding: 14px 30px;
  border-radius: 50px; cursor: pointer; transition: all .25s;
}
.btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(212,160,23,.45); }
.btn-ghost-h {
  background: transparent; border: 1.5px solid rgba(255,253,245,.22);
  color: var(--cream); font-family: var(--fb); font-size: 15px; font-weight: 600;
  padding: 13px 28px; border-radius: 50px; cursor: pointer; transition: all .25s;
}
.btn-ghost-h:hover { border-color: var(--gold-xl); color: var(--gold-xl); }
.hero-nums { display: flex; gap: 32px; flex-wrap: wrap; }
.hero-num-n { font-family: var(--fen); font-size: 36px; font-weight: 900; line-height: 1; }
.hero-num-l { font-size: 11px; color: rgba(255,217,102,.4); margin-top: 4px; }
/* hero visual — max plate */
.hero-plate-wrap { position: relative; display: flex; align-items: center; justify-content: center; min-height: 400px; }
.max-circle {
  width: 360px; height: 360px; border-radius: 50%;
  background: radial-gradient(circle at 38% 35%, rgba(192,57,43,.5), rgba(17,10,4,.9));
  border: 1px solid rgba(212,160,23,.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 120px; position: relative; z-index: 2;
  box-shadow: 0 0 80px rgba(212,160,23,.1);
}
.max-ring { position: absolute; border-radius: 50%; z-index: 1; }
.max-badge {
  position: absolute; border-radius: 14px; padding: 11px 15px; z-index: 3;
  box-shadow: var(--shadow-md); font-weight: 800; font-size: 13px;
}

/* ══ SECTIONS ══ */
section { padding: 88px 5%; }
.sec-tag {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 10px; font-weight: 700; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--pharaoh); margin-bottom: 14px;
}
.sec-tag::before { content:''; display:inline-block; width:28px; height:2px; background:var(--pharaoh); border-radius:2px; }
[dir="rtl"] .sec-tag::before { display:none; }
[dir="rtl"] .sec-tag::after { content:''; display:inline-block; width:28px; height:2px; background:var(--pharaoh); border-radius:2px; }
.sec-h-en {
  font-family: var(--fen); font-size: clamp(28px,4vw,50px);
  font-weight: 900; color: var(--ink); line-height: 1.1; margin-bottom: 12px;
  letter-spacing: -0.3px;
}
.sec-h-en em { font-style: italic; color: var(--brick); }
.sec-h-ar {
  font-family: var(--far); font-size: clamp(25px,3.6vw,44px);
  font-weight: 700; color: var(--ink); line-height: 1.5; margin-bottom: 12px;
}
.sec-h-ar em { font-style: normal; color: var(--brick); }
.sec-p { font-size: 15px; color: var(--muted); line-height: 1.9; max-width: 540px; }

/* ══ OFFER TICKER ══ */
.offer-ticker {
  background: var(--brick); padding: 15px 5%;
  display: flex; gap: 0; overflow: hidden;
  border-top: 1px solid rgba(255,255,255,.1);
  border-bottom: 1px solid rgba(255,255,255,.1);
}
.ticker-t {
  display: flex; gap: 0; animation: tickerScroll 22s linear infinite; flex-shrink: 0;
  align-items: center;
}
@keyframes tickerScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
.ticker-it {
  display: flex; align-items: center; gap: 10px;
  padding: 0 32px; border-right: 1px solid rgba(255,255,255,.2); flex-shrink: 0;
  font-size: 13px; font-weight: 700; color: rgba(255,255,255,.9); white-space: nowrap;
}
[dir="rtl"] .ticker-it { border-right: none; border-left: 1px solid rgba(255,255,255,.2); }
.ticker-it span { font-size: 20px; }
.ticker-it:last-child { border: none; }

/* ══ ABOUT ══ */
.about-section { background: var(--cream); }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
.about-mosaic { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 185px 185px; gap: 12px; }
.mosaic-t {
  border-radius: var(--r); display: flex; flex-direction: column;
  align-items: center; justify-content: flex-end;
  font-size: 52px; position: relative; overflow: hidden;
  padding-bottom: 12px; cursor: default; transition: transform .2s;
}
.mosaic-t:hover { transform: scale(1.02); }
.mosaic-t.wide { grid-column: span 2; font-size: 68px; }
.mosaic-label {
  position: absolute; top: 10px; inset-inline-start: 10px;
  background: rgba(26,16,6,.6); color: #fff; backdrop-filter: blur(4px);
  font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 8px; letter-spacing: .3px;
}
.mosaic-dish {
  position: relative; z-index: 1;
  font-size: 11px; font-weight: 700; color: rgba(255,253,245,.88);
  text-shadow: 0 1px 4px rgba(0,0,0,.6); text-align: center;
}
.about-pills { display: flex; flex-direction: column; gap: 18px; margin-top: 28px; }
.about-pill {
  display: flex; gap: 16px; align-items: flex-start;
  background: var(--linen); border: 1px solid var(--border);
  border-radius: var(--rsm); padding: 16px 18px; border-left: 4px solid var(--gold);
  transition: border-left-color .2s;
}
[dir="rtl"] .about-pill { border-left: 1px solid var(--border); border-right: 4px solid var(--gold); }
.about-pill:hover { border-left-color: var(--brick); }
[dir="rtl"] .about-pill:hover { border-right-color: var(--brick); border-left-color: var(--border); }
.pill-icon { font-size: 26px; flex-shrink: 0; }
.pill-title { font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
.pill-sub { font-size: 12px; color: var(--muted); line-height: 1.65; }

/* ══ CARDS SYSTEM ══ */
.cards-section { background: var(--ink); }
.cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px,1fr)); gap: 18px; margin-top: 44px; }
.deal-card {
  border-radius: var(--r); overflow: hidden; cursor: pointer;
  transition: transform .25s, box-shadow .25s; position: relative;
  box-shadow: var(--shadow-md);
}
.deal-card:hover { transform: translateY(-6px) rotate(.5deg); box-shadow: 0 28px 70px rgba(0,0,0,.5); }
.deal-card-top {
  padding: 28px 24px 24px; position: relative;
  display: flex; flex-direction: column; gap: 10px;
}
.deal-tier-badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 10px; font-weight: 900; letter-spacing: 2px;
  text-transform: uppercase; padding: 4px 10px; border-radius: 8px;
  width: fit-content;
}
.deal-multiplier {
  font-family: var(--fen); font-size: 56px; font-weight: 900;
  line-height: 1; letter-spacing: -2px;
}
.deal-name-en { font-family: var(--fen); font-size: 20px; font-weight: 900; letter-spacing: -0.3px; }
.deal-name-ar { font-family: var(--far); font-size: 22px; font-weight: 700; }
.deal-desc { font-size: 12px; opacity: .7; line-height: 1.65; }
.deal-card-bottom {
  border-top: 1px solid rgba(255,255,255,.1);
  padding: 16px 24px;
  display: flex; justify-content: space-between; align-items: center;
}
.deal-price-from { font-size: 10px; opacity: .55; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px; }
.deal-price { font-family: var(--fen); font-size: 22px; font-weight: 900; }
.deal-btn {
  border: none; font-family: var(--fb); font-size: 12px; font-weight: 800;
  padding: 8px 16px; border-radius: 20px; cursor: pointer; transition: all .2s;
}
/* card color themes */
.card-family   { background: linear-gradient(140deg, #2C1A06, #1A0A02); color: var(--gold-xl); }
.card-feast    { background: linear-gradient(140deg, #3A0A12, #1A0408); color: #FFB3C0; }
.card-nile     { background: linear-gradient(140deg, #051A2C, #020D18); color: #7FD4F0; }
.card-pharaoh  { background: linear-gradient(140deg, #1A1600, #0E0C00); color: var(--gold-xl); }

/* ══ MENU ══ */
.menu-section { background: var(--sand); }
.menu-cats { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 30px; }
.menu-cat {
  display: flex; align-items: center; gap: 7px;
  padding: 9px 18px; border-radius: 20px;
  border: 1.5px solid var(--border); background: var(--cream);
  cursor: pointer; font-family: var(--fb); font-size: 12px; font-weight: 700;
  color: var(--mid); transition: all .2s;
}
.menu-cat.active { background: var(--brick); border-color: var(--brick); color: #fff; }
.menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 18px; }
.dish-card {
  background: var(--cream); border-radius: var(--r);
  border: 1px solid var(--border); box-shadow: var(--shadow-sm);
  overflow: hidden; cursor: pointer; transition: all .25s;
}
.dish-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
.dish-img {
  height: 175px; display: flex; align-items: center; justify-content: center;
  font-size: 76px; position: relative;
}
.dish-max-badge {
  position: absolute; top: 10px; inset-inline-start: 10px;
  background: var(--brick); color: #fff;
  font-size: 9px; font-weight: 900; padding: 4px 9px; border-radius: 8px;
  letter-spacing: .5px; text-transform: uppercase;
}
.dish-fam-badge {
  position: absolute; top: 10px; inset-inline-end: 10px;
  background: var(--gold); color: var(--ink);
  font-size: 9px; font-weight: 900; padding: 4px 9px; border-radius: 8px;
  letter-spacing: .5px;
}
.dish-body { padding: 18px 20px; }
.dish-name { font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
.dish-name-ar { font-family: var(--far); font-size: 15px; color: var(--muted); margin-bottom: 8px; }
.dish-desc { font-size: 12px; color: var(--muted); line-height: 1.7; margin-bottom: 14px; min-height: 50px; }
.dish-sizes {
  display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;
}
.size-chip {
  padding: 4px 10px; border-radius: 8px; font-size: 10px; font-weight: 700;
  border: 1.5px solid var(--border); color: var(--mid); cursor: pointer; transition: all .15s;
}
.size-chip.active { background: var(--gold-bg); border-color: var(--gold); color: var(--pharaoh); }
.dish-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 12px; }
.dish-price { font-family: var(--fen); font-size: 20px; font-weight: 900; color: var(--brick); }
.dish-add {
  background: var(--brick); color: #fff; border: none;
  width: 34px; height: 34px; border-radius: 50%; font-size: 20px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .2s; line-height: 1; font-weight: 700;
}
.dish-add:hover { background: var(--brick-l); transform: scale(1.1); }

/* ══ EXPERIENCE ══ */
.exp-section { background: var(--linen); }
.exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
.exp-visual { position: relative; min-height: 440px; display: flex; align-items: center; justify-content: center; }
.exp-big-circle {
  width: 340px; height: 340px; border-radius: 50%;
  background: linear-gradient(135deg, var(--brick), #6A1208);
  display: flex; align-items: center; justify-content: center;
  font-size: 110px; position: relative; z-index: 2;
  box-shadow: var(--shadow-lg);
}
.exp-ring { position: absolute; border-radius: 50%; }
.exp-float {
  position: absolute; background: var(--cream); border: 1px solid var(--border);
  border-radius: 14px; padding: 12px 16px; box-shadow: var(--shadow-md); z-index: 3;
}
.exp-float-num { font-family: var(--fen); font-size: 26px; font-weight: 900; color: var(--brick); line-height: 1; }
.exp-float-lbl { font-size: 11px; color: var(--muted); margin-top: 3px; font-weight: 600; }
.exp-features { display: flex; flex-direction: column; gap: 22px; margin-top: 28px; }
.exp-feat { display: flex; gap: 16px; align-items: flex-start; }
.exp-feat-ic {
  width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 24px;
  border: 1.5px solid var(--border);
}
.exp-feat-title { font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
.exp-feat-sub { font-size: 13px; color: var(--muted); line-height: 1.65; }

/* ══ ORDER / POLYDIAL ══ */
.order-section {
  background:
    radial-gradient(ellipse at 20% 60%, rgba(192,57,43,.35) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(212,160,23,.12) 0%, transparent 45%),
    #0E0802;
  position: relative; overflow: hidden;
}
.order-geo {
  position: absolute; inset: 0; pointer-events: none; opacity: .04;
  background-image:
    repeating-linear-gradient(45deg,  rgba(212,160,23,1) 0, rgba(212,160,23,1) 1px, transparent 1px, transparent 28px),
    repeating-linear-gradient(-45deg, rgba(212,160,23,1) 0, rgba(212,160,23,1) 1px, transparent 1px, transparent 28px);
}
.order-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.order-content .sec-h-en { color: var(--cream); }
.order-content .sec-h-ar { color: var(--cream); }
.order-content .sec-tag { color: var(--gold-xl); }
.order-content .sec-tag::before { background: var(--gold-xl); }
.order-content .sec-tag::after { background: var(--gold-xl); }
.order-content .sec-p { color: rgba(255,253,245,.5); max-width: 420px; }
.order-feats { display: flex; flex-direction: column; gap: 13px; margin-top: 28px; }
.order-feat {
  display: flex; gap: 14px; align-items: flex-start;
  background: rgba(212,160,23,.07); border: 1px solid rgba(212,160,23,.14);
  border-radius: var(--rsm); padding: 14px 16px;
}
.of-ic { font-size: 22px; flex-shrink: 0; }
.of-t { font-size: 14px; font-weight: 700; color: var(--gold-xl); margin-bottom: 3px; }
.of-s { font-size: 12px; color: rgba(255,253,245,.4); line-height: 1.6; }
/* polydial */
.pd-device {
  background: #0A0602; border-radius: 34px; padding: 8px;
  box-shadow: 0 0 0 1px rgba(212,160,23,.3), var(--shadow-lg);
}
.pd-screen {
  background: var(--linen); border-radius: 28px;
  min-height: 580px; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 36px 24px; gap: 16px; text-align: center;
}
.pd-ic { width: 70px; height: 70px; border-radius: 20px; background: linear-gradient(135deg,#0055FF,#003BB3); display: flex; align-items: center; justify-content: center; font-size: 34px; box-shadow: 0 8px 28px rgba(0,85,255,.3); }
.pd-tit { font-size: 17px; font-weight: 800; color: var(--ink); }
.pd-sub { font-size: 13px; color: var(--muted); line-height: 1.7; max-width: 260px; }
.pd-code { background: var(--sand); border: 1px solid var(--border); border-radius: var(--rsm); padding: 10px 16px; font-size: 10px; font-family: monospace; color: var(--muted); letter-spacing: .5px; word-break: break-all; }
.pd-note { font-size: 11px; color: var(--muted); display: flex; align-items: center; gap: 6px; }

/* ══ VISIT ══ */
.visit-section { background: var(--sand); }
.visit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
.info-row {
  background: var(--cream); border: 1px solid var(--border); border-radius: var(--r);
  padding: 20px 22px; margin-bottom: 13px; display: flex; gap: 16px; align-items: flex-start;
  box-shadow: var(--shadow-sm); transition: border-color .2s;
}
.info-row:hover { border-color: var(--gold); }
.info-ic {
  width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--brick), var(--brick-l));
  display: flex; align-items: center; justify-content: center; font-size: 22px;
}
.info-lbl { font-size: 10px; font-weight: 700; color: var(--brick); letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 5px; }
.info-val { font-size: 13px; color: var(--mid); line-height: 1.8; white-space: pre-line; }
.map-card {
  background: var(--cream); border: 1px solid var(--border); border-radius: var(--r);
  min-height: 280px; display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 10px; font-size: 56px;
  padding: 32px; box-shadow: var(--shadow-sm);
}
.map-card p { font-size: 13px; color: var(--muted); }
.booking-card {
  background: linear-gradient(135deg, var(--brick), #8B1A0E);
  border-radius: var(--r); padding: 24px; margin-top: 14px;
  border: 1px solid rgba(255,255,255,.1);
}
.booking-title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 8px; }
.booking-sub { font-size: 13px; color: rgba(255,255,255,.6); line-height: 1.7; margin-bottom: 18px; }
.btn-book-white {
  background: #fff; border: none; color: var(--brick);
  font-family: var(--fb); font-size: 14px; font-weight: 800;
  padding: 12px; border-radius: var(--rsm); cursor: pointer;
  width: 100%; transition: all .2s;
}
.btn-book-white:hover { background: var(--cream); transform: translateY(-1px); }

/* ══ FOOTER ══ */
footer {
  background: var(--ink); padding: 56px 5% 28px;
  border-top: 1px solid rgba(212,160,23,.15);
}
.footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 44px; }
.footer-brand-en { font-family: var(--fen); font-size: 24px; font-weight: 900; color: var(--cream); letter-spacing: -0.3px; margin-bottom: 8px; }
.footer-brand-ar { font-family: var(--far); font-size: 22px; color: var(--cream); margin-bottom: 8px; }
.footer-tagline { font-size: 12px; color: rgba(255,253,245,.3); line-height: 1.7; max-width: 235px; }
.footer-col-h { font-size: 10px; font-weight: 700; color: var(--gold-l); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px; }
.footer-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.footer-list a { font-size: 13px; color: rgba(255,253,245,.32); text-decoration: none; cursor: pointer; transition: color .2s; }
.footer-list a:hover { color: var(--gold-xl); }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid rgba(212,160,23,.1); flex-wrap: wrap; gap: 12px; }
.footer-copy { font-size: 12px; color: rgba(255,253,245,.2); }
.footer-pd { font-size: 12px; color: rgba(255,253,245,.28); display: flex; align-items: center; gap: 5px; }
.footer-pd span { color: rgba(100,160,255,.65); font-weight: 600; }

/* ══ RESPONSIVE ══ */
@media (max-width: 960px) {
  .hero-inner, .about-grid, .exp-grid, .order-inner, .visit-grid { grid-template-columns: 1fr; gap: 40px; }
  .hero-plate-wrap { display: none; }
  .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
  .nav-links { display: none; }
  .nav-right .book-btn { display: none; }
  .exp-visual { min-height: 280px; }
  .exp-big-circle { width: 240px; height: 240px; font-size: 80px; }
}
@media (max-width: 540px) {
  .footer-top { grid-template-columns: 1fr; }
  section { padding: 64px 5%; }
}
`;

/* ══ DATA ══ */
const TICKER_ITEMS = [
  { icon:"🍽", text:{ ar:"حصص ماكسيموم للعيلة الكبيرة", en:"Maximum portions for big families" } },
  { icon:"🎉", text:{ ar:"احتفالاتك معانا أحلى", en:"Celebrations are better with us" } },
  { icon:"🥘", text:{ ar:"أكلات مصرية أصيلة", en:"Authentic Egyptian cuisine" } },
  { icon:"♟️", text:{ ar:"بطاقات ماكسيموم — وفّر أكتر", en:"Max Cards — Save More" } },
  { icon:"👨‍👩‍👧‍👦", text:{ ar:"مناسب لأفراح والعزايم", en:"Perfect for weddings and gatherings" } },
  { icon:"🔥", text:{ ar:"عروض لا تتفوت كل يوم", en:"Unmissable daily offers" } },
];

const DEAL_CARDS = [
  {
    tier:{ ar:"بطاقة الفاميلي", en:"Family Card" },
    multiplier:"×2",
    nameEn:"Family Max", nameAr:"فاميلي ماكس",
    desc:{ ar:"كل الأصناف ضعف — مناسب لـ ٤–٦ أشخاص مع خبز بلدي غير محدود", en:"Double every dish — ideal for 4–6 people with unlimited baladi bread" },
    priceFrom:{ ar:"من", en:"From" }, price:"CAD 45",
    btnLabel:{ ar:"اختار", en:"Choose" },
    theme:"card-family",
    btnStyle:{ background:"rgba(212,160,23,.2)", color:"var(--gold-xl)" },
    badgeStyle:{ background:"rgba(212,160,23,.2)", color:"var(--gold-xl)" },
  },
  {
    tier:{ ar:"بطاقة العزومة", en:"Feast Card" },
    multiplier:"×3",
    nameEn:"Feast Max", nameAr:"إيزومة ماكس",
    desc:{ ar:"ثلاثة أضعاف مع حلويات مصرية مجانية — مناسب لـ ٨–١٢ شخص", en:"Triple portions with free Egyptian desserts — perfect for 8–12 people" },
    priceFrom:{ ar:"من", en:"From" }, price:"CAD 99",
    btnLabel:{ ar:"اختار", en:"Choose" },
    theme:"card-feast",
    btnStyle:{ background:"rgba(255,100,120,.15)", color:"#FFB3C0" },
    badgeStyle:{ background:"rgba(255,100,120,.15)", color:"#FFB3C0" },
  },
  {
    tier:{ ar:"بطاقة النيل", en:"Nile Card" },
    multiplier:"×4",
    nameEn:"Nile Max", nameAr:"نيل ماكس",
    desc:{ ar:"أربعة أضعاف + مشروبات طبيعية وحلويات شرقية لكل الطاولة", en:"Quadruple + fresh drinks and Oriental sweets for the whole table" },
    priceFrom:{ ar:"من", en:"From" }, price:"CAD 179",
    btnLabel:{ ar:"اختار", en:"Choose" },
    theme:"card-nile",
    btnStyle:{ background:"rgba(127,212,240,.12)", color:"#7FD4F0" },
    badgeStyle:{ background:"rgba(127,212,240,.12)", color:"#7FD4F0" },
  },
  {
    tier:{ ar:"بطاقة الفرعون", en:"Pharaoh Card" },
    multiplier:"×5",
    nameEn:"Pharaoh Max", nameAr:"فرعون ماكس",
    desc:{ ar:"خمسة أضعاف لولائم الأفراح والاحتفالات الكبيرة — مع ضيافة VIP", en:"Quintuple for weddings and grand celebrations — with VIP table service" },
    priceFrom:{ ar:"من", en:"From" }, price:"CAD 299",
    btnLabel:{ ar:"اختار", en:"Choose" },
    theme:"card-pharaoh",
    btnStyle:{ background:"rgba(212,160,23,.2)", color:"var(--gold-xl)" },
    badgeStyle:{ background:"rgba(212,160,23,.2)", color:"var(--gold-xl)" },
  },
];

const CATS = {
  mains:    { ar:"🥘 أطباق رئيسية", en:"🥘 Mains" },
  street:   { ar:"🫓 ستريت فود",   en:"🫓 Street Food" },
  grills:   { ar:"🔥 مشاوي",        en:"🔥 Grills" },
  desserts: { ar:"🍮 حلويات",       en:"🍮 Desserts" },
  drinks:   { ar:"🥤 مشروبات",      en:"🥤 Drinks" },
};

const MENU = {
  mains: [
    { emoji:"🍝", name:{ar:"مكرونة بالبشاميل",en:"Macarona Béchamel"}, nameAr:"مَكْرُونَة بَشَامِيل", desc:{ar:"طبق مصري كلاسيكي بالمكرونة واللحم المفروم وصلصة البشاميل الكريمية — فاميلي سايز",en:"Classic Egyptian baked pasta with minced meat and creamy béchamel — family-size tray"}, price:"CAD 28.00", maxBadge:true, famBadge:true, sizes:[{ar:"متوسط",en:"Medium"},{ar:"كبير",en:"Large"},{ar:"عيلة",en:"Family"}] },
    { emoji:"🥬", name:{ar:"ملوخية بالأرانب",en:"Molokhia & Rabbit"}, nameAr:"مُلُوخِيَّة", desc:{ar:"الطبق المصري الأصيل — ملوخية خضراء مع أرانب مشوية وأرز وخبز بلدي",en:"Egypt's signature dish — green molokhia with grilled rabbit, rice and baladi bread"}, price:"CAD 32.00", maxBadge:false, famBadge:true, sizes:[{ar:"متوسط",en:"Medium"},{ar:"كبير",en:"Large"}] },
    { emoji:"🍲", name:{ar:"فول مدمس",en:"Ful Medames"}, nameAr:"فُول مُدَمَّس", desc:{ar:"فول مصري على أصوله بالليمون والكمون وزيت الزيتون والبيض — طبق العيلة الكبيرة",en:"Egyptian fava beans with lemon, cumin, olive oil and egg — the great family platter"}, price:"CAD 18.00", maxBadge:false, famBadge:true, sizes:[{ar:"صغير",en:"Small"},{ar:"كبير",en:"Large"},{ar:"عيلة",en:"Family"}] },
    { emoji:"🍜", name:{ar:"كشري مصري",en:"Egyptian Koshari"}, nameAr:"كُشَرِي", desc:{ar:"الأرز والمعكرونة والعدس مع صلصة الطماطم الحارة والبصل المقلي — ملك الأكل المصري",en:"Rice, pasta and lentils with spicy tomato sauce and crispy onions — the king of Egyptian street food"}, price:"CAD 16.00", maxBadge:true, famBadge:false, sizes:[{ar:"فردي",en:"Single"},{ar:"كبير",en:"Large"},{ar:"عيلة",en:"Family"}] },
  ],
  street: [
    { emoji:"🥙", name:{ar:"حواوشي لحم",en:"Hawawshi"}, nameAr:"حَوَاوِشِي", desc:{ar:"فينو مصري محشو باللحم المفروم والبصل والفلفل — مقلي على النار الحجرية",en:"Egyptian bun stuffed with minced meat, onion and peppers — stone-fire grilled"}, price:"CAD 14.00", maxBadge:true, famBadge:false, sizes:[{ar:"حبة",en:"Single"},{ar:"تلتة",en:"3-pack"},{ar:"ستة",en:"6-pack"}] },
    { emoji:"🧆", name:{ar:"طعمية مصرية",en:"Ta'meya (Falafel)"}, nameAr:"طَعْمِيَّة", desc:{ar:"فلافل مصري بالفول الأخضر والكزبرة والسمسم — مقرمش من الخارج طري من الداخل",en:"Egyptian falafel made with broad beans, coriander and sesame — crispy outside, fluffy inside"}, price:"CAD 12.00", maxBadge:false, famBadge:false, sizes:[{ar:"طبق",en:"Plate"},{ar:"كبير",en:"Large"}] },
    { emoji:"🥚", name:{ar:"بيض بالبسطرمة",en:"Eggs & Pastirma"}, nameAr:"بَيْض بَالبَسطَرمَة", desc:{ar:"بيض مقلي مع البسطرمة المصرية الحارة والخبز البلدي الطازج",en:"Fried eggs with spicy Egyptian pastirma and fresh baladi bread — a Cairo classic"}, price:"CAD 15.00", maxBadge:false, famBadge:false, sizes:[{ar:"فردي",en:"Single"},{ar:"مضاعف",en:"Double"}] },
    { emoji:"🫓", name:{ar:"فطير مشلتت",en:"Feteer Meshaltet"}, nameAr:"فَطِير مَشَلتَت", desc:{ar:"عجين ورقي بالسمن البلدي — شهي بالعسل أو الجبنة أو اللحم",en:"Flaky pastry with clarified butter — delicious with honey, cheese or minced meat"}, price:"CAD 20.00", maxBadge:true, famBadge:true, sizes:[{ar:"صغير",en:"Small"},{ar:"وسط",en:"Medium"},{ar:"كبير",en:"Large"}] },
  ],
  grills: [
    { emoji:"🍗", name:{ar:"فراخ مشوية",en:"Grilled Chicken"}, nameAr:"فِرَاخ مَشْوِيَّة", desc:{ar:"فراخ بلدي مشوية على الفحم الحجري مع الخبز والسلطة والطحينة",en:"Free-range chicken grilled on stone charcoal with bread, salad and tahini"}, price:"CAD 34.00", maxBadge:false, famBadge:true, sizes:[{ar:"ربعة",en:"Quarter"},{ar:"نص",en:"Half"},{ar:"كاملة",en:"Whole"}] },
    { emoji:"🥩", name:{ar:"كفتة مشوية",en:"Grilled Kofta"}, nameAr:"كُفْتَة", desc:{ar:"كفتة لحمة بلدي على أصوب الطريقة المصرية — مع أرز وسلطة وصلصة البقدونس",en:"Traditional Egyptian kofta on the grill — with rice, salad and parsley sauce"}, price:"CAD 28.00", maxBadge:false, famBadge:false, sizes:[{ar:"عدد ٤",en:"4 pcs"},{ar:"عدد ٨",en:"8 pcs"},{ar:"عدد ١٢",en:"12 pcs"}] },
    { emoji:"🫀", name:{ar:"مشكل مشاوي",en:"Mixed Grill Platter"}, nameAr:"مَشَاوِي مِشكَّل", desc:{ar:"كباب وكفتة وفراخ وكبدة على الفحم — وليمة المشاوي الكاملة للعيلة",en:"Kebab, kofta, chicken and liver on charcoal — the complete grill feast for the family"}, price:"CAD 55.00", maxBadge:true, famBadge:true, sizes:[{ar:"متوسط ٤",en:"4 people"},{ar:"كبير ٦",en:"6 people"},{ar:"فرعون ١٠",en:"10 people"}] },
  ],
  desserts: [
    { emoji:"🍮", name:{ar:"أم علي",en:"Om Ali"}, nameAr:"أُمّ عَلِي", desc:{ar:"حلوى مصرية أيقونية بالعجين والمكسرات والقشطة والحليب المحلى — دافية ومريحة",en:"Iconic Egyptian dessert with bread, nuts, cream and sweetened milk — warm and comforting"}, price:"CAD 12.00", maxBadge:false, famBadge:true, sizes:[{ar:"فردي",en:"Single"},{ar:"طبق كبير",en:"Family bowl"}] },
    { emoji:"🍯", name:{ar:"كنافة بالجبن",en:"Cheese Konafa"}, nameAr:"كُنَافَة بِالجُبنَة", desc:{ar:"كنافة مصرية طازجة بالجبنة المطاطة وقطر السكر والقشطة — تقيلة وحلوة",en:"Fresh Egyptian konafa with stretchy cheese, sugar syrup and cream — indulgent and sweet"}, price:"CAD 14.00", maxBadge:true, famBadge:true, sizes:[{ar:"ربع كيلو",en:"¼ kg"},{ar:"نص كيلو",en:"½ kg"},{ar:"كيلو",en:"1 kg"}] },
    { emoji:"🧁", name:{ar:"بسبوسة بالقشطة",en:"Basbousa with Cream"}, nameAr:"بَسبُوسَة", desc:{ar:"بسبوسة مصرية أصيلة بالسميد وجوز الهند وقطر السكر وطبقة قشطة سميكة",en:"Authentic Egyptian semolina cake with coconut, sugar syrup and a thick cream layer"}, price:"CAD 11.00", maxBadge:false, famBadge:false, sizes:[{ar:"قطعة",en:"Slice"},{ar:"طبق",en:"Plate"}] },
  ],
  drinks: [
    { emoji:"🎋", name:{ar:"عصير قصب السكر",en:"Fresh Sugarcane Juice"}, nameAr:"عَصِير قَصَب", desc:{ar:"قصب سكر طازج معصور لحظياً — شرب مصر الأول",en:"Freshly pressed sugarcane juice — Egypt's number one street drink"}, price:"CAD 6.00", maxBadge:false, famBadge:false, sizes:[{ar:"كوب",en:"Cup"},{ar:"لتر",en:"Litre"}] },
    { emoji:"🌺", name:{ar:"كركديه",en:"Hibiscus Karkade"}, nameAr:"كَرْكَدِيه", desc:{ar:"مشروب الكركديه الأحمر بارد أو ساخن — غني بالحديد والفيتامينات",en:"Red hibiscus drink served cold or hot — rich in iron and vitamins"}, price:"CAD 5.00", maxBadge:false, famBadge:false, sizes:[{ar:"كوب",en:"Cup"},{ar:"إبريق",en:"Pot"}] },
    { emoji:"🍋", name:{ar:"تمر هندي",en:"Tamarind Tamr Hindi"}, nameAr:"تَمَر هِنْدِي", desc:{ar:"تمر هندي أصلي حامض وحلو معاً — المشروب الفرعوني منذ آلاف السنين",en:"Authentic tamarind drink, sweet and sour — Pharaonic refreshment for millennia"}, price:"CAD 5.50", maxBadge:false, famBadge:false, sizes:[{ar:"كوب",en:"Cup"},{ar:"إبريق",en:"Pitcher"}] },
  ],
};

const COLLAGE_DATA = [
  { emoji:"🥘",  bg:"135deg,#5C2A0A,#2A1004", label:{ar:"الأطباق الرئيسية",en:"Main Dishes"}, dish:{ar:"مكرونة بشاميل",en:"Béchamel"}, wide:true },
  { emoji:"🥩",  bg:"135deg,#4A0A14,#1A0408", label:{ar:"المشاوي",en:"Grills"}, dish:{ar:"مشكل مشاوي",en:"Mixed Grill"}, wide:false },
  { emoji:"🍮",  bg:"135deg,#2A1A06,#1A0A02", label:{ar:"الحلويات",en:"Desserts"}, dish:{ar:"أم علي",en:"Om Ali"}, wide:false },
];

export default function CardsMax() {
  const [lang, setLang] = useState("ar");
  const [cat,  setCat]  = useState("mains");
  const [cart, setCart] = useState({});
  const [sizes, setSizes] = useState({});
  const t   = lang === "ar";
  const dir = t ? "rtl" : "ltr";
  const add = (k) => setCart(p => ({ ...p, [k]: (p[k]||0)+1 }));
  const setSize = (dish, size) => setSizes(p => ({ ...p, [dish]: size }));
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <div dir={dir} style={{ fontFamily:"'Cairo',sans-serif" }}>
      <style>{FONTS}{CSS}</style>

      {/* ══ NAV ══ */}
      <nav className="nav">
        <div className="nav-brand" onClick={() => scrollTo("home")}>
          <div className="nav-emblem">CM</div>
          <div>
            {t
              ? <div className="nav-name-ar">كاردز ماكس</div>
              : <div className="nav-name-en">CardsMax</div>}
          </div>
          <div className="nav-max-badge">MAX</div>
        </div>
        <div className="nav-links">
          {[["about",t?"ليه احنا":"Why Us"],["cards",t?"بطاقاتنا":"Max Cards"],["menu",t?"القائمة":"Menu"],["experience",t?"التجربة":"Experience"],["order",t?"اطلب":"Order"],["visit",t?"زيارتنا":"Visit Us"]].map(([id,lbl]) => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{lbl}</span>
          ))}
        </div>
        <div className="nav-right">
          <button className="lang-btn" onClick={() => setLang(l => l==="ar"?"en":"ar")}>{t?"EN":"ع"}</button>
          <button className="book-btn" onClick={() => scrollTo("visit")}>{t?"📅 احجز طاولة":"📅 Book Table"}</button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"100px 5% 80px",position:"relative",overflow:"hidden",background:"radial-gradient(ellipse at 75% 40%, rgba(192,57,43,.3) 0%,transparent 50%),radial-gradient(ellipse at 15% 70%,rgba(212,160,23,.15) 0%,transparent 45%),#110A04"}} id="home">
        <div className="hero-hieroglyph"/>
        <div className="hero-pyramid"/>
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">🍽 cardsmax.com</div>
            {t
              ? <h1 className="hero-h-ar">أكل مصري<br/><em>ماكسيموم</em><br/>للعيلة الكبيرة</h1>
              : <h1 className="hero-h-en">Egyptian food<br/>at <em>maximum</em><br/>for big families</h1>}
            <p className="hero-sub">
              {t
                ? "مطعم مصري أصيل متخصص في تعظيم الكميات والعروض للعيلات الكبيرة والتجمعات — اختار بطاقتك وابدأ الأكل."
                : "Authentic Egyptian restaurant specialising in maximum portions and deals for big families and gatherings — pick your card and start eating."}
            </p>
            <div className="hero-btns">
              <button className="btn-gold" onClick={() => scrollTo("cards")}>{t ? "♟️ شوف البطاقات" : "♟️ See Max Cards"}</button>
              <button className="btn-ghost-h" onClick={() => scrollTo("menu")}>{t ? "🥘 القائمة" : "🥘 Full Menu"}</button>
            </div>
            <div className="hero-nums">
              {[
                {n:t?"×٥":"×5",        l:t?"حد أقصى للكميات":"Max multiplier",  c:"var(--gold-xl)"},
                {n:t?"٤":"4",           l:t?"بطاقات عروض":"Deal cards",          c:"var(--brick-l)"},
                {n:t?"+٥٠":"+50",       l:t?"طبق مصري":"Egyptian dishes",        c:"var(--gold-l)"},
                {n:t?"٤.٩":"4.9",       l:t?"تقييم العيلات":"Family rating",     c:"#FFD966"},
              ].map(({n,l,c},i) => (
                <div key={i}>
                  <div className="hero-num-n" style={{color:c}}>{n}</div>
                  <div className="hero-num-l">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-plate-wrap">
            <div className="max-ring" style={{width:440,height:440,border:"1px solid rgba(212,160,23,.12)"}}/>
            <div className="max-ring" style={{width:330,height:330,border:"1px solid rgba(192,57,43,.15)"}}/>
            <div className="max-circle">🥘</div>
            <div className="max-badge" style={{top:"7%",insetInlineEnd:"-4%",background:"var(--gold)",color:"var(--ink)"}}>
              {t ? "♟️ فرعون ×٥" : "♟️ Pharaoh ×5"}
            </div>
            <div className="max-badge" style={{bottom:"7%",insetInlineStart:"-6%",background:"var(--brick)",color:"#fff"}}>
              {t ? "🎉 عيلة كاملة" : "🎉 Full Family"}
            </div>
          </div>
        </div>
      </section>

      {/* ══ OFFER TICKER ══ */}
      <div className="offer-ticker">
        <div className="ticker-t">
          {[...TICKER_ITEMS,...TICKER_ITEMS].map((item,i) => (
            <div key={i} className="ticker-it">
              <span>{item.icon}</span>{item.text[lang]}
            </div>
          ))}
        </div>
      </div>

      {/* ══ ABOUT ══ */}
      <section className="about-section" id="about">
        <div className="about-grid">
          <div className="about-mosaic">
            {COLLAGE_DATA.map((tile,i) => (
              <div key={i} className={`mosaic-t${tile.wide?" wide":""}`}
                style={{background:`linear-gradient(${tile.bg})`}}>
                <span style={{fontSize:tile.wide?80:56,marginBottom:10}}>{tile.emoji}</span>
                <div className="mosaic-label">{tile.label[lang]}</div>
                <div className="mosaic-dish">{tile.dish[lang]}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="sec-tag">{t?"ليه كاردز ماكس؟":"Why CardsMax?"}</div>
            {t
              ? <h2 className="sec-h-ar">الأكل المصري<br/>بـ<em>أقصى قيمة</em></h2>
              : <h2 className="sec-h-en">Egyptian food<br/>at <em>maximum value</em></h2>}
            <p className="sec-p" style={{marginBottom:8}}>
              {t
                ? "كاردز ماكس مش بس مطعم — هو تجربة عيلة كاملة. اتفلسفنا على فكرة إن الأكل المصري الأصيل لازم ياكلوه ناس كتير مع بعض، وإن القيمة هتكون ماكسيموم لما الكمية تكون ماكسيموم."
                : "CardsMax isn't just a restaurant — it's a full family experience. We built on the idea that authentic Egyptian food is best shared, and value is maximised when portions are maximised."}
            </p>
            <div className="about-pills">
              {[
                ["🥘", t?"أصناف مصرية أصيلة ١٠٠٪":"100% Authentic Egyptian Dishes",   t?"من الكشري والملوخية للمشاوي والحلويات الشرقية":"From Koshari and Molokhia to grills and Oriental sweets"],
                ["♟️", t?"نظام البطاقات الذكي":"Smart Cards System",                   t?"اختار بطاقتك وضاعف الكمية — الفاميلي والإيزومة والنيل والفرعون":"Pick your card and multiply the portion — Family, Feast, Nile, Pharaoh"],
                ["👨‍👩‍👧‍👦", t?"خامة العزايم والأفراح":"Made for Gatherings & Celebrations", t?"قاعات خاصة وخدمة ماكسيموم لأكبر التجمعات العيلية":"Private halls and max service for the largest family gatherings"],
              ].map(([ic,title,sub]) => (
                <div key={title} className="about-pill">
                  <span className="pill-icon">{ic}</span>
                  <div><div className="pill-title">{title}</div><div className="pill-sub">{sub}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ MAX CARDS ══ */}
      <section className="cards-section pharaoh-bg" id="cards">
        <div className="sec-tag" style={{color:"var(--gold-xl)"}}>
          <span style={{display:"inline-block",width:28,height:2,background:"var(--gold-xl)",borderRadius:2,marginInlineEnd:10}}/>
          {t?"بطاقات ماكسيموم":"Max Cards"}
        </div>
        {t
          ? <h2 className="sec-h-en" style={{color:"var(--cream)"}}>اختار <span style={{fontStyle:"italic",color:"var(--gold-xl)"}}>بطاقتك</span> واضاعف</h2>
          : <h2 className="sec-h-en" style={{color:"var(--cream)"}}>Pick your card &<br/><em style={{color:"var(--gold-xl)"}}>multiply your feast</em></h2>}
        <p className="sec-p" style={{color:"rgba(255,253,245,.5)",marginBottom:8}}>
          {t
            ? "كل بطاقة بتضاعف كميات كل الأصناف — كل ما اخترت بطاقة أكبر، كل ما وفّرت أكتر وأكلت أكتر."
            : "Each card multiplies every dish portion — the bigger the card, the more you save and eat."}
        </p>
        <div className="cards-grid">
          {DEAL_CARDS.map((card) => (
            <div key={card.nameEn} className={`deal-card ${card.theme}`}>
              <div className="deal-card-top">
                <div className="deal-tier-badge" style={card.badgeStyle}>
                  ♟️ {card.tier[lang]}
                </div>
                <div className="deal-multiplier">{card.multiplier}</div>
                {t
                  ? <div className="deal-name-ar">{card.nameAr}</div>
                  : <div className="deal-name-en">{card.nameEn}</div>}
                <div className="deal-desc">{card.desc[lang]}</div>
              </div>
              <div className="deal-card-bottom">
                <div>
                  <div className="deal-price-from">{card.priceFrom[lang]}</div>
                  <div className="deal-price">{card.price}</div>
                </div>
                <button className="deal-btn" style={card.btnStyle}
                  onClick={() => scrollTo("order")}>
                  {card.btnLabel[lang]} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ MENU ══ */}
      <section className="menu-section" id="menu">
        <div className="sec-tag">{t?"القائمة الكاملة":"Full Menu"}</div>
        {t
          ? <h2 className="sec-h-ar">أصناف <em>مصرية</em> أصيلة</h2>
          : <h2 className="sec-h-en">Authentic <em>Egyptian</em> dishes</h2>}
        <p className="sec-p" style={{marginBottom:28}}>
          {t
            ? "كل الأصناف متاحة بأحجام مختلفة — فردي وكبير وعيلة. كل الأطباق مناسبة لبطاقات ماكسيموم."
            : "All dishes available in multiple sizes — single, large and family. All dishes compatible with Max Cards."}
        </p>
        <div className="menu-cats">
          {Object.entries(CATS).map(([k,v]) => (
            <button key={k} className={`menu-cat ${cat===k?"active":""}`} onClick={() => setCat(k)}>
              {v[lang]}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {MENU[cat].map((dish) => {
            const key = dish.name.en; const cnt = cart[key]||0;
            const selSize = sizes[key] || dish.sizes[0][lang];
            return (
              <div key={key} className="dish-card">
                <div className="dish-img" style={{background:`linear-gradient(150deg,hsl(${key.charCodeAt(0)*11%40+10},40%,18%),#0E0802)`}}>
                  <span style={{fontSize:76}}>{dish.emoji}</span>
                  {dish.maxBadge && <div className="dish-max-badge">MAX ♟️</div>}
                  {dish.famBadge && <div className="dish-fam-badge">👨‍👩‍👧‍👦 {t?"عيلة":"Family"}</div>}
                </div>
                <div className="dish-body">
                  <div className="dish-name">{dish.name[lang]}</div>
                  <div className="dish-name-ar">{dish.nameAr}</div>
                  <div className="dish-desc">{dish.desc[lang]}</div>
                  <div className="dish-sizes">
                    {dish.sizes.map(sz => (
                      <button key={sz[lang]} className={`size-chip ${selSize===sz[lang]?"active":""}`}
                        onClick={() => setSize(key, sz[lang])}>
                        {sz[lang]}
                      </button>
                    ))}
                  </div>
                  <div className="dish-footer">
                    <span className="dish-price">{dish.price}</span>
                    <button className="dish-add" onClick={() => add(key)}>
                      {cnt > 0 ? <span style={{fontSize:13,fontWeight:800}}>{cnt}</span> : "+"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ EXPERIENCE ══ */}
      <section className="exp-section" id="experience">
        <div className="exp-grid">
          <div className="exp-visual">
            <div className="exp-ring" style={{width:420,height:420,border:"1px solid rgba(192,57,43,.12)"}}/>
            <div className="exp-ring" style={{width:310,height:310,border:"1px solid rgba(212,160,23,.1)"}}/>
            <div className="exp-big-circle">🎉</div>
            <div className="exp-float" style={{top:"6%",insetInlineEnd:"-4%"}}>
              <div className="exp-float-num">+٥٠</div>
              <div className="exp-float-lbl">{t?"طبق مصري":"Egyptian dishes"}</div>
            </div>
            <div className="exp-float" style={{bottom:"6%",insetInlineStart:"-4%"}}>
              <div className="exp-float-num">×٥</div>
              <div className="exp-float-lbl">{t?"أقصى كمية":"Max portion"}</div>
            </div>
          </div>
          <div>
            <div className="sec-tag">{t?"تجربة كاردز ماكس":"The CardsMax Experience"}</div>
            {t
              ? <h2 className="sec-h-ar">عزومة <em>ما تنسيش</em></h2>
              : <h2 className="sec-h-en">A gathering<br/>you <em>won't forget</em></h2>}
            <p className="sec-p" style={{marginBottom:8}}>
              {t
                ? "مش بس أكل — كاردز ماكس تجربة كاملة للعيلة المصرية. من لحظة الدخول لآخر لقمة حلوة."
                : "Not just food — CardsMax is a complete experience for the Egyptian family. From the moment you walk in to the last sweet bite."}
            </p>
            <div className="exp-features">
              {[
                ["🏛", t?"ديكور فرعوني أصيل":"Authentic Pharaonic Décor",      t?"جو مصري كامل — فسيفساء وزخارف وإضاءة دافية":"Full Egyptian atmosphere — mosaics, ornaments and warm lighting", "var(--gold-bg)"],
                ["🎉", t?"قاعات العيلات الكبيرة":"Private Family Halls",        t?"قاعات خاصة لـ ٢٠–١٠٠ شخص لأفراحك وعزايمك":"Private halls for 20–100 people for your celebrations",           "var(--brick-bg)"],
                ["♟️", t?"نظام البطاقات الحصري":"Exclusive Cards System",       t?"اطلب بطاقتك وضاعف وفّر — بدون تعقيد":"Pick your card, multiply, save — no complexity",                    "var(--gold-bg)"],
                ["🎙", t?"طلب ذكي مع بولي دايل":"Smart Voice Order (PolyDial)", t?"اطلب بصوتك عربي أو إنجليزي مع بولي دايل":"Voice-order in Arabic or English via PolyDial",                  "var(--nile-bg)"],
              ].map(([ic,title,sub,bg]) => (
                <div key={title} className="exp-feat">
                  <div className="exp-feat-ic" style={{background:bg}}>{ic}</div>
                  <div>
                    <div className="exp-feat-title">{title}</div>
                    <div className="exp-feat-sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ORDER / POLYDIAL ══ */}
      <section className="order-section" id="order">
        <div className="order-geo"/>
        <div className="order-inner">
          <div className="order-content">
            <div className="sec-tag">{t?"اطلب الآن":"Order Now"}</div>
            {t
              ? <h2 className="sec-h-ar">اطلب بطاقتك<br/><em>بصوتك</em></h2>
              : <h2 className="sec-h-en">Order your card<br/><em>by voice</em></h2>}
            <p className="sec-p">
              {t
                ? "بولي دايل بيسمعك — قوله اسم البطاقة والأصناف اللي تحبها وهو هيرتب كل شيء."
                : "PolyDial listens — tell it your card type and favourite dishes and it handles everything."}
            </p>
            <div className="order-feats">
              {[
                ["🎙", t?"اطلب بصوتك":"Voice Order",        t?"عربي أو إنجليزي — بولي بيفهم الاثنين":"Arabic or English — Poly understands both"],
                ["♟️", t?"اختار بطاقتك":"Pick Your Card",   t?"قول فاميلي أو فيست أو نيل أو فرعون":"Say Family, Feast, Nile or Pharaoh"],
                ["👨‍👩‍👧‍👦", t?"للعيلة والعزايم":"Family & Gatherings",t?"احجز طاولة لـ ٤ لـ ١٠٠ شخص":"Book for 4 to 100 people"],
                ["🔄", t?"أعد طلبك":"Reorder",               t?"عزومتك المفضلة بضغطة واحدة":"Your favourite feast in one tap"],
              ].map(([ic,t_,s_]) => (
                <div key={t_} className="order-feat">
                  <span className="of-ic">{ic}</span>
                  <div><div className="of-t">{t_}</div><div className="of-s">{s_}</div></div>
                </div>
              ))}
            </div>
          </div>
          {/* ══ POLYDIAL IFRAME PLACEHOLDER ══
              Replace .pd-screen with:
              <iframe
                src="https://customer.polydial.com/?rk=YOUR_RESTAURANT_KEY"
                width="100%"
                height="580"
                frameBorder="0"
                allow="microphone"
                style={{ display:'block', border:'none' }}
              />
          */}
          <div className="pd-device">
            <div className="pd-screen">
              <div className="pd-ic">🎙</div>
              <div className="pd-tit">{t ? "بولي دايل — طلبك الصوتي" : "PolyDial — Voice Ordering"}</div>
              <div className="pd-sub">
                {t
                  ? "نظام بولي دايل سيُضمَّن هنا — اطلب بطاقتك وأصنافك بصوتك."
                  : "PolyDial widget embedded here — order your card and dishes by voice."}
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
            <div className="sec-tag">{t?"زيارتنا":"Visit Us"}</div>
            {t
              ? <h2 className="sec-h-ar">أهلاً وسهلاً<br/>في <em>بيتكم</em></h2>
              : <h2 className="sec-h-en">Welcome<br/>to <em>your home</em></h2>}
            <p className="sec-p" style={{marginBottom:24}}>
              {t
                ? "مطعم كاردز ماكس في مصر وكندا — مكانك لتجمعات العيلة والأفراح والمناسبات الكبيرة."
                : "CardsMax in Egypt and Canada — your place for family gatherings, weddings and big occasions."}
            </p>
            {[
              ["📍", t?"العنوان (كندا)":"Address (Canada)",     t?"٧٧ شارع ميسيساغا، مصيسوغا، أونتاريو":"77 Mississauga Rd, Mississauga, ON, Canada"],
              ["🕐", t?"ساعات العمل":"Hours",                   t?"كل يوم: ١١ص – ١٢ مدمغ\nرمضان: ٤م – ٢ص":"Daily: 11am – 12am\nRamadan: 4pm – 2am"],
              ["📞", t?"هاتف":"Phone",                           "+1 (905) 555-0166"],
              ["🎉", t?"حجز قاعات الأفراح":"Hall Bookings",      t?"لـ ٢٠–١٠٠ شخص — متصل بنا قبل ٧٢ ساعة":"For 20–100 people — contact us 72 hrs in advance"],
            ].map(([ic,lbl,val]) => (
              <div key={lbl} className="info-row">
                <div className="info-ic">{ic}</div>
                <div><div className="info-lbl">{lbl}</div><div className="info-val">{val}</div></div>
              </div>
            ))}
          </div>
          <div>
            <div className="map-card"><span>🗺️</span><p>{t?"مصيسوغا، أونتاريو، كندا":"Mississauga, ON, Canada"}</p></div>
            <div className="booking-card">
              <div className="booking-title">{t ? "📅 احجز عزومتك الماكسيموم" : "📅 Book Your Max Feast"}</div>
              <div className="booking-sub">
                {t
                  ? "قاعات خاصة لأفراحك وعزايمك — أكل مصري ماكسيموم مع خدمة VIP كاملة."
                  : "Private halls for weddings and gatherings — maximum Egyptian food with full VIP service."}
              </div>
              <button className="btn-book-white" onClick={() => window.open("tel:+19055550166")}>
                {t ? "📞 اتصل واحجز دلوقتي" : "📞 Call and Book Now"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="footer-top">
          <div>
            {t
              ? <div className="footer-brand-ar">كاردز ماكس</div>
              : <div className="footer-brand-en">CardsMax</div>}
            <p className="footer-tagline">{t ? "أكل مصري ماكسيموم للعيلة الكبيرة — cardsmax.com" : "Maximum Egyptian food for big families — cardsmax.com"}</p>
          </div>
          <div>
            <div className="footer-col-h">{t?"روابط":"Links"}</div>
            <ul className="footer-list">
              {[["about",t?"ليه احنا":"Why Us"],["cards",t?"البطاقات":"Cards"],["menu",t?"القائمة":"Menu"],["visit",t?"زيارتنا":"Visit"]].map(([id,lbl]) => (
                <li key={id}><a onClick={() => scrollTo(id)}>{lbl}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-h">{t?"البطاقات":"Cards"}</div>
            <ul className="footer-list">
              {[t?"فاميلي ×٢":"Family ×2", t?"إيزومة ×٣":"Feast ×3", t?"نيل ×٤":"Nile ×4", t?"فرعون ×٥":"Pharaoh ×5"].map(lbl => (
                <li key={lbl}><a onClick={() => scrollTo("cards")}>{lbl}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-h">{t?"تواصل":"Contact"}</div>
            <ul className="footer-list">
              <li><a>hello@cardsmax.com</a></li>
              <li><a>+1 (905) 555-0166</a></li>
              <li><a>{t?"مصيسوغا، كندا":"Mississauga, Canada"}</a></li>
              <li><a onClick={() => setLang(l => l==="ar"?"en":"ar")}>{t?"English":"العربية"}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2024 CardsMax · cardsmax.com · {t?"جميع الحقوق محفوظة":"All rights reserved"}</div>
          <div className="footer-pd">{t?"الطلبات عبر":"Orders via"} <span>PolyDial</span> 🎙</div>
        </div>
      </footer>
    </div>
  );
}
