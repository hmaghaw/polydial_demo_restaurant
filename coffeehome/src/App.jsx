import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════
   COFFEE HOME — coffeehome.ca
   Bilingual Arabic / English café website
   PolyDial iframe placeholder included
══════════════════════════════════════════════ */

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cairo:wght@300;400;500;600;700&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');
`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --espresso: #1A0A00;
    --roast:    #3D1C00;
    --brown:    #6B3A1F;
    --caramel:  #C4813A;
    --latte:    #E8C99A;
    --cream:    #FAF3E8;
    --milk:     #FFFCF6;
    --steam:    #F5ECD8;
    --teal:     #0D6B5E;
    --teal-l:   #14907F;
    --white:    #FFFFFF;
    --shadow-sm: 0 2px 12px rgba(26,10,0,0.08);
    --shadow-md: 0 8px 32px rgba(26,10,0,0.12);
    --shadow-lg: 0 20px 60px rgba(26,10,0,0.18);
    --radius:   16px;
    --radius-sm:10px;
    --font-display: 'Playfair Display', serif;
    --font-ar-display: 'Amiri', serif;
    --font-body: 'Cairo', sans-serif;
  }
  html { scroll-behavior: smooth; }
  body { background: var(--cream); color: var(--espresso); font-family: var(--font-body); }
  
  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: var(--latte); border-radius: 4px; }
  
  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 999;
    background: rgba(26,10,0,0.92); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5%;
    height: 68px;
    border-bottom: 1px solid rgba(196,129,58,0.2);
    transition: all .3s;
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .nav-logo-icon {
    width: 40px; height: 40px; border-radius: 12px;
    background: linear-gradient(135deg, var(--caramel), #8B4513);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
  }
  .nav-logo-text { font-family: var(--font-display); font-size: 20px; color: var(--latte); font-style: italic; }
  .nav-logo-text-ar { font-family: var(--font-ar-display); font-size: 20px; color: var(--latte); }
  .nav-links { display: flex; align-items: center; gap: 28px; }
  .nav-link {
    color: rgba(232,201,154,0.75); font-size: 13px; font-weight: 500;
    text-decoration: none; cursor: pointer; transition: color .2s;
    letter-spacing: 0.3px;
  }
  .nav-link:hover { color: var(--latte); }
  .nav-right { display: flex; align-items: center; gap: 12px; }
  .lang-btn {
    background: rgba(196,129,58,0.2); border: 1px solid rgba(196,129,58,0.35);
    color: var(--latte); font-family: var(--font-body); font-size: 12px; font-weight: 700;
    padding: 6px 14px; border-radius: 20px; cursor: pointer; transition: all .2s;
  }
  .lang-btn:hover { background: rgba(196,129,58,0.35); }
  .order-btn {
    background: var(--caramel); border: none; color: var(--espresso);
    font-family: var(--font-body); font-size: 13px; font-weight: 700;
    padding: 9px 20px; border-radius: 20px; cursor: pointer; transition: all .2s;
  }
  .order-btn:hover { background: var(--latte); transform: translateY(-1px); }
  .menu-toggle {
    display: none; background: none; border: none; cursor: pointer;
    color: var(--latte); font-size: 24px;
  }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    background: 
      radial-gradient(ellipse at 30% 50%, rgba(196,129,58,0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(61,28,0,0.4) 0%, transparent 50%),
      var(--espresso);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 100px 24px 60px;
    position: relative; overflow: hidden;
  }
  .hero-bg-circles {
    position: absolute; inset: 0; pointer-events: none; overflow: hidden;
  }
  .hero-circle {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(196,129,58,0.12);
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(196,129,58,0.15); border: 1px solid rgba(196,129,58,0.3);
    border-radius: 20px; padding: 6px 16px;
    font-size: 12px; font-weight: 600; color: var(--caramel);
    letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 28px;
  }
  .hero-title {
    font-family: var(--font-display); font-size: clamp(48px, 8vw, 88px);
    font-weight: 700; color: var(--cream); line-height: 1.08;
    margin-bottom: 20px;
  }
  .hero-title em { font-style: italic; color: var(--caramel); }
  .hero-title-ar {
    font-family: var(--font-ar-display); font-size: clamp(42px, 7vw, 76px);
    font-weight: 700; color: var(--cream); line-height: 1.3; margin-bottom: 20px;
  }
  .hero-title-ar em { font-style: normal; color: var(--caramel); }
  .hero-sub {
    font-size: clamp(15px, 2.5vw, 18px); color: rgba(232,201,154,0.7);
    max-width: 480px; line-height: 1.7; margin-bottom: 40px; font-weight: 300;
  }
  .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-bottom: 48px; }
  .btn-hero-primary {
    background: var(--caramel); border: none; color: var(--espresso);
    font-family: var(--font-body); font-size: 15px; font-weight: 700;
    padding: 14px 32px; border-radius: 50px; cursor: pointer; transition: all .25s;
    display: flex; align-items: center; gap: 8px;
  }
  .btn-hero-primary:hover { background: var(--latte); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(196,129,58,0.4); }
  .btn-hero-ghost {
    background: transparent; border: 1px solid rgba(232,201,154,0.4);
    color: var(--latte); font-family: var(--font-body); font-size: 15px; font-weight: 600;
    padding: 14px 32px; border-radius: 50px; cursor: pointer; transition: all .25s;
  }
  .btn-hero-ghost:hover { border-color: var(--latte); transform: translateY(-2px); }
  .hero-stats { display: flex; gap: 40px; flex-wrap: wrap; justify-content: center; }
  .hero-stat { text-align: center; }
  .hero-stat-num { font-family: var(--font-display); font-size: 32px; font-weight: 700; color: var(--caramel); }
  .hero-stat-lbl { font-size: 12px; color: rgba(232,201,154,0.55); margin-top: 2px; }
  .hero-scroll {
    position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    color: rgba(232,201,154,0.4); font-size: 11px; cursor: pointer;
    animation: bounce 2s infinite;
  }
  @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
  .scroll-arrow { width: 20px; height: 20px; border-right: 1.5px solid; border-bottom: 1.5px solid; border-color: rgba(232,201,154,0.4); transform: rotate(45deg); }

  /* ── SECTIONS ── */
  section { padding: 80px 5%; }
  .section-tag {
    display: inline-block; background: rgba(196,129,58,0.12);
    border: 1px solid rgba(196,129,58,0.25); border-radius: 20px;
    padding: 5px 14px; font-size: 11px; font-weight: 700; color: var(--caramel);
    letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px;
  }
  .section-title {
    font-family: var(--font-display); font-size: clamp(32px, 5vw, 48px);
    font-weight: 700; color: var(--espresso); line-height: 1.15; margin-bottom: 12px;
  }
  .section-title em { font-style: italic; color: var(--caramel); }
  .section-title-ar {
    font-family: var(--font-ar-display); font-size: clamp(28px, 4.5vw, 44px);
    font-weight: 700; color: var(--espresso); line-height: 1.4; margin-bottom: 12px;
  }
  .section-title-ar em { font-style: normal; color: var(--caramel); }
  .section-sub { font-size: 15px; color: var(--brown); max-width: 500px; line-height: 1.8; font-weight: 400; }

  /* ── ABOUT ── */
  .about-section { background: var(--espresso); }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .about-visual {
    position: relative; display: flex; align-items: center; justify-content: center;
    min-height: 380px;
  }
  .about-circle-main {
    width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, rgba(196,129,58,0.3), rgba(61,28,0,0.8));
    border: 1px solid rgba(196,129,58,0.25);
    display: flex; align-items: center; justify-content: center; font-size: 90px;
    position: relative; z-index: 1;
  }
  .about-circle-ring {
    position: absolute; border-radius: 50%;
    border: 1px dashed rgba(196,129,58,0.15);
  }
  .about-badge {
    position: absolute; bottom: 10%; right: 5%;
    background: var(--caramel); border-radius: 14px; padding: 12px 18px;
    text-align: center; box-shadow: 0 8px 24px rgba(196,129,58,0.4);
  }
  .about-badge-num { font-family: var(--font-display); font-size: 28px; font-weight: 700; color: var(--espresso); line-height: 1; }
  .about-badge-txt { font-size: 11px; color: var(--roast); font-weight: 600; margin-top: 3px; }
  .about-content .section-title { color: var(--cream); }
  .about-content .section-title-ar { color: var(--cream); }
  .about-content .section-sub { color: rgba(232,201,154,0.65); }
  .about-features { display: flex; flex-direction: column; gap: 16px; margin-top: 28px; }
  .about-feature {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 16px; border-radius: var(--radius-sm);
    background: rgba(196,129,58,0.08); border: 1px solid rgba(196,129,58,0.15);
  }
  .about-feature-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(196,129,58,0.2); display: flex; align-items: center;
    justify-content: center; font-size: 20px; flex-shrink: 0;
  }
  .about-feature-title { font-size: 14px; font-weight: 700; color: var(--latte); margin-bottom: 3px; }
  .about-feature-sub { font-size: 12px; color: rgba(232,201,154,0.55); line-height: 1.6; }

  /* ── MENU ── */
  .menu-section { background: var(--milk); }
  .menu-cats { display: flex; gap: 10px; flex-wrap: wrap; margin: 28px 0; }
  .menu-cat {
    padding: 9px 20px; border-radius: 20px; border: 1.5px solid var(--latte);
    background: transparent; cursor: pointer; font-family: var(--font-body);
    font-size: 13px; font-weight: 600; color: var(--brown); transition: all .2s;
  }
  .menu-cat.active { background: var(--espresso); border-color: var(--espresso); color: var(--latte); }
  .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
  .menu-card {
    background: var(--cream); border-radius: var(--radius);
    border: 1px solid rgba(196,129,58,0.15); overflow: hidden;
    box-shadow: var(--shadow-sm); transition: transform .25s, box-shadow .25s;
    cursor: pointer;
  }
  .menu-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
  .menu-card-img {
    height: 160px; background: var(--roast);
    display: flex; align-items: center; justify-content: center; font-size: 64px;
    position: relative; overflow: hidden;
  }
  .menu-card-badge {
    position: absolute; top: 10px; left: 10px;
    background: var(--caramel); color: var(--espresso);
    font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 8px;
    letter-spacing: 0.5px;
  }
  .menu-card-body { padding: 16px; }
  .menu-card-name { font-size: 15px; font-weight: 700; color: var(--espresso); margin-bottom: 4px; }
  .menu-card-desc { font-size: 12px; color: var(--brown); line-height: 1.6; margin-bottom: 12px; min-height: 36px; }
  .menu-card-footer { display: flex; align-items: center; justify-content: space-between; }
  .menu-price { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--caramel); }
  .menu-add {
    width: 32px; height: 32px; border-radius: 50%;
    background: var(--espresso); color: var(--latte); border: none;
    font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all .2s; line-height: 1;
  }
  .menu-add:hover { background: var(--caramel); color: var(--espresso); transform: scale(1.1); }

  /* ── POLYDIAL SECTION ── */
  .polydial-section {
    background: linear-gradient(160deg, var(--roast) 0%, var(--espresso) 60%);
    text-align: center; position: relative; overflow: hidden;
  }
  .polydial-section::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(196,129,58,0.2), transparent 60%);
  }
  .polydial-section .section-title { color: var(--cream); position: relative; z-index: 1; }
  .polydial-section .section-title-ar { color: var(--cream); position: relative; z-index: 1; }
  .polydial-section .section-sub { color: rgba(232,201,154,0.65); margin: 0 auto 12px; position: relative; z-index: 1; }
  .polydial-section .section-tag { position: relative; z-index: 1; }
  .polydial-frame-wrap {
    position: relative; z-index: 1;
    max-width: 420px; margin: 32px auto 0;
    border-radius: 28px; overflow: hidden;
    box-shadow: 0 24px 80px rgba(0,0,0,0.5);
    border: 1px solid rgba(196,129,58,0.25);
  }
  .polydial-placeholder {
    background: var(--milk); height: 600px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 16px; padding: 32px;
  }
  .polydial-placeholder-icon {
    width: 72px; height: 72px; border-radius: 20px;
    background: linear-gradient(135deg, #0055FF, #003BB3);
    display: flex; align-items: center; justify-content: center;
    font-size: 36px; box-shadow: 0 8px 24px rgba(0,85,255,0.3);
  }
  .polydial-placeholder-title { font-size: 18px; font-weight: 700; color: var(--espresso); }
  .polydial-placeholder-sub { font-size: 13px; color: var(--brown); text-align: center; line-height: 1.6; max-width: 280px; }
  .polydial-placeholder-code {
    background: var(--steam); border: 1px solid var(--latte);
    border-radius: 10px; padding: 10px 18px; font-size: 11px;
    color: var(--brown); font-family: monospace; letter-spacing: 0.5px;
    margin-top: 8px;
  }

  /* ── AMBIANCE ── */
  .ambiance-section { background: var(--steam); }
  .ambiance-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 40px; }
  .ambiance-card {
    border-radius: var(--radius); overflow: hidden;
    box-shadow: var(--shadow-sm); transition: transform .25s;
    cursor: pointer;
  }
  .ambiance-card:hover { transform: scale(1.02); }
  .ambiance-card.tall { grid-row: span 2; }
  .ambiance-img {
    height: 200px; display: flex; align-items: center; justify-content: center;
    font-size: 72px; position: relative;
  }
  .ambiance-card.tall .ambiance-img { height: 100%; min-height: 440px; }
  .ambiance-caption {
    padding: 14px 16px; background: var(--milk);
    font-size: 13px; font-weight: 600; color: var(--espresso);
  }

  /* ── VISIT / CONTACT ── */
  .visit-section { background: var(--espresso); }
  .visit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .visit-info-box {
    background: rgba(196,129,58,0.08); border: 1px solid rgba(196,129,58,0.2);
    border-radius: var(--radius); padding: 24px; margin-bottom: 16px;
    display: flex; gap: 16px; align-items: flex-start;
  }
  .visit-info-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: rgba(196,129,58,0.2); display: flex; align-items: center;
    justify-content: center; font-size: 22px; flex-shrink: 0;
  }
  .visit-info-title { font-size: 13px; font-weight: 700; color: var(--latte); margin-bottom: 4px; }
  .visit-info-val { font-size: 13px; color: rgba(232,201,154,0.6); line-height: 1.7; }
  .visit-content .section-title { color: var(--cream); }
  .visit-content .section-title-ar { color: var(--cream); }
  .visit-content .section-sub { color: rgba(232,201,154,0.6); }
  .map-placeholder {
    background: rgba(196,129,58,0.08); border: 1px solid rgba(196,129,58,0.2);
    border-radius: var(--radius); height: 320px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 12px; font-size: 52px;
  }
  .map-placeholder p { font-size: 13px; color: rgba(232,201,154,0.5); }

  /* ── FOOTER ── */
  footer {
    background: #0D0500; padding: 48px 5% 28px;
    border-top: 1px solid rgba(196,129,58,0.15);
  }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; margin-bottom: 40px; }
  .footer-brand-name { font-family: var(--font-display); font-size: 22px; color: var(--latte); font-style: italic; margin-bottom: 10px; }
  .footer-brand-name-ar { font-family: var(--font-ar-display); font-size: 22px; color: var(--latte); margin-bottom: 10px; }
  .footer-brand-desc { font-size: 13px; color: rgba(232,201,154,0.45); line-height: 1.7; max-width: 260px; }
  .footer-col-title { font-size: 12px; font-weight: 700; color: var(--caramel); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-links a { font-size: 13px; color: rgba(232,201,154,0.45); text-decoration: none; cursor: pointer; transition: color .2s; }
  .footer-links a:hover { color: var(--latte); }
  .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid rgba(196,129,58,0.1); flex-wrap: wrap; gap: 12px; }
  .footer-copy { font-size: 12px; color: rgba(232,201,154,0.3); }
  .footer-polydial { display: flex; align-items: center; gap: 6px; font-size: 12px; color: rgba(232,201,154,0.35); }
  .footer-polydial span { color: rgba(0,120,255,0.7); font-weight: 600; }
  .social-links { display: flex; gap: 10px; }
  .social-btn {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(196,129,58,0.1); border: 1px solid rgba(196,129,58,0.2);
    display: flex; align-items: center; justify-content: center; font-size: 16px;
    cursor: pointer; transition: all .2s; text-decoration: none;
  }
  .social-btn:hover { background: rgba(196,129,58,0.25); transform: translateY(-2px); }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .menu-toggle { display: block; }
    .about-grid, .visit-grid, .footer-top { grid-template-columns: 1fr; }
    .ambiance-grid { grid-template-columns: 1fr 1fr; }
    .ambiance-card.tall { grid-row: auto; }
    .ambiance-card.tall .ambiance-img { min-height: 200px; }
    .hero-stats { gap: 24px; }
    section { padding: 60px 5%; }
  }
  @media (max-width: 480px) {
    .nav-right .order-btn { display: none; }
    .ambiance-grid { grid-template-columns: 1fr; }
    .footer-top { grid-template-columns: 1fr; gap: 32px; }
  }
`;

/* ── DATA ── */
const MENU = {
  coffee: [
    { emoji:"☕", name:{ar:"إسبريسو مضاعف",en:"Double Espresso"},       desc:{ar:"جرعة مزدوجة من أفضل حبوب البن",en:"Double shot of our finest beans"}, price:"CAD 4.50", badge:{ar:"الأكثر طلباً",en:"Best Seller"} },
    { emoji:"🥛", name:{ar:"لاتيه قرفة",en:"Cinnamon Latte"},            desc:{ar:"لاتيه كريمي بنكهة القرفة والعسل",en:"Creamy latte with cinnamon & honey"},  price:"CAD 6.25", badge:null },
    { emoji:"🍵", name:{ar:"موكا بلجيكي",en:"Belgian Mocha"},             desc:{ar:"شوكولاتة بلجيكية مع الإسبريسو",en:"Belgian chocolate meets espresso"},  price:"CAD 6.75", badge:{ar:"جديد",en:"New"} },
    { emoji:"❄️", name:{ar:"كولد برو",en:"Cold Brew"},                    desc:{ar:"مستخلص على بارد لـ 18 ساعة",en:"18-hour cold extraction process"},   price:"CAD 5.50", badge:null },
    { emoji:"🍦", name:{ar:"فرابيه بالكراميل",en:"Caramel Frappé"},       desc:{ar:"مثلج ومنعش مع كراميل ذهبي",en:"Icy blend with golden caramel drizzle"}, price:"CAD 7.25", badge:null },
    { emoji:"🫖", name:{ar:"شاي عربي بالهيل",en:"Arabic Cardamom Tea"},   desc:{ar:"شاي أحمر بالهيل والزعفران",en:"Red tea with cardamom & saffron"},   price:"CAD 4.00", badge:{ar:"تراثي",en:"Traditional"} },
  ],
  food: [
    { emoji:"🥐", name:{ar:"كرواسان لوز",en:"Almond Croissant"},          desc:{ar:"طازج يومياً مع حشوة اللوز",en:"Freshly baked with almond filling"},  price:"CAD 4.75", badge:null },
    { emoji:"🧇", name:{ar:"وافل بلجيكي",en:"Belgian Waffle"},            desc:{ar:"وافل مع مربى التوت والكريمة",en:"Waffle with berry jam & cream"},     price:"CAD 9.50", badge:{ar:"الإفطار",en:"Breakfast"} },
    { emoji:"🥙", name:{ar:"كيشة الجبن",en:"Cheese Quiche"},               desc:{ar:"فطيرة فرنسية بجبن الغودة",en:"French tart with Gouda cheese"},     price:"CAD 7.00", badge:null },
    { emoji:"🍰", name:{ar:"تشيز كيك العسل",en:"Honey Cheesecake"},        desc:{ar:"قطعة كيك بارد مع العسل الكندي",en:"Chilled cake with Canadian honey"}, price:"CAD 8.50", badge:{ar:"موصى به",en:"Recommended"} },
    { emoji:"🥗", name:{ar:"سلطة الأفوكادو",en:"Avocado Salad"},           desc:{ar:"سلطة منعشة مع الحمص والليمون",en:"Fresh salad with hummus & lemon"},  price:"CAD 11.00", badge:null },
    { emoji:"🥪", name:{ar:"ساندوتش كلوب",en:"Club Sandwich"},             desc:{ar:"دجاج مشوي مع خضار طازج",en:"Grilled chicken with fresh veggies"},   price:"CAD 12.50", badge:null },
  ],
  seasonal: [
    { emoji:"🎃", name:{ar:"لاتيه اليقطين",en:"Pumpkin Spice Latte"},     desc:{ar:"نكهة الخريف الكندي المميزة",en:"The iconic Canadian autumn flavour"}, price:"CAD 6.75", badge:{ar:"موسمي",en:"Seasonal"} },
    { emoji:"🍁", name:{ar:"سيروب القيقب",en:"Maple Syrup Flat White"},    desc:{ar:"فلات وايت مع سيروب القيقب",en:"Flat white with pure maple syrup"},  price:"CAD 6.50", badge:{ar:"كندي",en:"Canadian"} },
    { emoji:"🫐", name:{ar:"سموذي التوت",en:"Wild Blueberry Smoothie"},    desc:{ar:"توت بري كندي مع زبادي",en:"Wild Canadian berries with yogurt"},     price:"CAD 7.00", badge:null },
  ],
};

const AMBIANCE = [
  { emoji:"🏠", gradient:"135deg, #3D1C00, #1A0A00", label:{ar:"جلسة داخلية دافئة",en:"Warm indoor seating"}, tall:true },
  { emoji:"🌿", gradient:"135deg, #1A3A1A, #0A1A0A", label:{ar:"ركن المزروعات",en:"The plant corner"}, tall:false },
  { emoji:"☕", gradient:"135deg, #4A2010, #2A0F05", label:{ar:"بار التحضير",en:"Brew bar"}, tall:false },
  { emoji:"🪑", gradient:"135deg, #2D1B0E, #1A0A00", label:{ar:"منطقة العمل",en:"Work-friendly zone"}, tall:false },
  { emoji:"🌙", gradient:"135deg, #0D1A2A, #05090F", label:{ar:"جلسة المساء",en:"Evening lounge"}, tall:false },
];

/* ── CAT LABEL ── */
const catLabel = (lang) => ({
  coffee: lang==="ar" ? "المشروبات" : "Drinks",
  food:   lang==="ar" ? "الأكل"     : "Food",
  seasonal: lang==="ar" ? "موسمي"   : "Seasonal",
});

export default function CoffeeHome() {
  const [lang, setLang]   = useState("ar");
  const [cat, setCat]     = useState("coffee");
  const [added, setAdded] = useState({});
  const [mobileNav, setMobileNav] = useState(false);
  const t = lang === "ar";
  const dir = t ? "rtl" : "ltr";

  const handleAdd = (name) => {
    setAdded(prev => ({ ...prev, [name]: (prev[name]||0)+1 }));
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setMobileNav(false);
  };

  return (
    <div dir={dir} style={{ fontFamily:"'Cairo',sans-serif" }}>
      <style>{FONTS}{CSS}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <a className="nav-logo">
          <div className="nav-logo-icon">☕</div>
          {t
            ? <span className="nav-logo-text-ar">كوفي هوم</span>
            : <span className="nav-logo-text">Coffee Home</span>}
        </a>
        <div className="nav-links" style={{display: mobileNav ? "none" : "flex"}}>
          {[
            ["about",    t?"من نحن":  "About"],
            ["menu",     t?"القائمة": "Menu"],
            ["order",    t?"اطلب الآن":"Order"],
            ["ambiance", t?"الأجواء": "Ambiance"],
            ["visit",    t?"زيارتنا": "Visit Us"],
          ].map(([id, label]) => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</span>
          ))}
        </div>
        <div className="nav-right">
          <button className="lang-btn" onClick={() => setLang(l => l==="ar"?"en":"ar")}>
            {t ? "EN" : "ع"}
          </button>
          <button className="order-btn" onClick={() => scrollTo("order")}>
            {t ? "🎙 اطلب الآن" : "🎙 Order Now"}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-bg-circles">
          {[[400,400,"right:5%","top:10%"],[280,280,"left:8%","bottom:20%"],[180,180,"right:30%","bottom:5%"]].map(([w,h,r,b],i) => (
            <div key={i} className="hero-circle" style={{width:w,height:h,...Object.fromEntries([r,b].map(s=>s.split(":").map((x,j)=>j===0?x:x+"px")))}} />
          ))}
        </div>
        <div className="hero-eyebrow">
          ☕ {t ? "مرحباً بك في كوفي هوم — coffeehome.ca" : "Welcome to Coffee Home — coffeehome.ca"}
        </div>
        {t
          ? <h1 className="hero-title-ar">حيث تلتقي<br/><em>رائحة القهوة</em><br/>بالدفء الكندي</h1>
          : <h1 className="hero-title">Where the scent of<br/><em>fresh coffee</em><br/>meets Canadian warmth</h1>}
        <p className="hero-sub">
          {t
            ? "قهوة مختصة وأطباق منزلية في قلب المدينة. مكانك المفضل للإفطار والعمل والاسترخاء."
            : "Specialty coffee and homestyle food in the heart of the city. Your go-to for breakfast, work, and unwinding."}
        </p>
        <div className="hero-actions">
          <button className="btn-hero-primary" onClick={() => scrollTo("menu")}>
            {t ? "🍽 استكشف القائمة" : "🍽 Explore Menu"}
          </button>
          <button className="btn-hero-ghost" onClick={() => scrollTo("order")}>
            {t ? "🎙 اطلب بصوتك" : "🎙 Voice Order"}
          </button>
        </div>
        <div className="hero-stats">
          {[
            [t?"٣٠٠+":"300+",   t?"نوع قهوة":"Coffee varieties"],
            [t?"٤.٩":"4.9",     t?"تقييم العملاء":"Customer rating"],
            [t?"٢٠١٨":"2018",   t?"تأسسنا":"Est."],
            [t?"كندا":"Canada", t?"موقعنا":"Location"],
          ].map(([num,lbl],i) => (
            <div key={i} className="hero-stat">
              <div className="hero-stat-num">{num}</div>
              <div className="hero-stat-lbl">{lbl}</div>
            </div>
          ))}
        </div>
        <div className="hero-scroll" onClick={() => scrollTo("about")}>
          <div className="scroll-arrow"/>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="about-section" id="about">
        <div className="about-grid">
          <div className="about-visual">
            <div className="about-circle-ring" style={{width:320,height:320}}/>
            <div className="about-circle-ring" style={{width:400,height:400}}/>
            <div className="about-circle-main">☕</div>
            <div className="about-badge">
              <div className="about-badge-num">+5</div>
              <div className="about-badge-txt">{t?"سنوات خبرة":"Yrs Experience"}</div>
            </div>
          </div>
          <div className="about-content">
            <div className="section-tag">{t?"قصتنا":"Our Story"}</div>
            {t
              ? <h2 className="section-title-ar">أكثر من مجرد<br/><em>فنجان قهوة</em></h2>
              : <h2 className="section-title">More than just<br/><em>a cup of coffee</em></h2>}
            <p className="section-sub">
              {t
                ? "كوفي هوم مكان يجمع بين دفء المنزل وحرفة صنع القهوة المختصة. كل فنجان عندنا حكاية من حبات البن حتى يصل لإيدك."
                : "Coffee Home blends the warmth of home with the craft of specialty coffee. Every cup we serve tells a story from bean to hand."}
            </p>
            <div className="about-features">
              {[
                ["🌱", t?"حبوب عضوية":"Organic Beans",       t?"مصدرها مزارع مستدامة حول العالم":"Sourced from sustainable farms worldwide"],
                ["🍁", t?"كندي بامتياز":"Proudly Canadian",   t?"من مطبخ كندا الدافئ":"From Canada's warm kitchen to you"],
                ["🎙", t?"اطلب بصوتك":"Voice-Powered Orders", t?"تجربة طلب ذكية مع بولي دايل":"Smart ordering experience with PolyDial"],
              ].map(([icon, title, sub]) => (
                <div key={title} className="about-feature">
                  <div className="about-feature-icon">{icon}</div>
                  <div>
                    <div className="about-feature-title">{title}</div>
                    <div className="about-feature-sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MENU ── */}
      <section className="menu-section" id="menu">
        <div className="section-tag">{t?"قائمتنا":"Our Menu"}</div>
        {t
          ? <h2 className="section-title-ar">اختار اللي <em>يعجبك</em></h2>
          : <h2 className="section-title">Pick what <em>delights you</em></h2>}
        <p className="section-sub">
          {t
            ? "من إسبريسو كلاسيكي إلى وصفات موسمية خاصة — كل يوم عندنا جديد."
            : "From classic espresso to exclusive seasonal creations — something new every day."}
        </p>
        <div className="menu-cats">
          {Object.keys(MENU).map(k => (
            <button key={k} className={`menu-cat ${cat===k?"active":""}`} onClick={() => setCat(k)}>
              {catLabel(lang)[k]}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {MENU[cat].map((item) => {
            const nm = item.name[lang]; const cnt = added[nm]||0;
            return (
              <div key={nm} className="menu-card">
                <div className="menu-card-img" style={{background:`linear-gradient(135deg,hsl(${nm.charCodeAt(0)*5%360},30%,18%),#1A0A00)`}}>
                  <span style={{fontSize:64}}>{item.emoji}</span>
                  {item.badge && <span className="menu-card-badge">{item.badge[lang]}</span>}
                </div>
                <div className="menu-card-body">
                  <div className="menu-card-name">{nm}</div>
                  <div className="menu-card-desc">{item.desc[lang]}</div>
                  <div className="menu-card-footer">
                    <span className="menu-price">{item.price}</span>
                    <button className="menu-add" onClick={() => handleAdd(nm)} title={t?"أضف للسلة":"Add to cart"}>
                      {cnt > 0 ? <span style={{fontSize:13,fontWeight:700}}>{cnt}</span> : "+"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── POLYDIAL ORDER ── */}
      <section className="polydial-section" id="order">
        <div className="section-tag" style={{background:"rgba(0,85,255,0.15)",borderColor:"rgba(0,85,255,0.3)",color:"#5599FF"}}>
          {t?"🎙 اطلب بصوتك":"🎙 Order by Voice"}
        </div>
        {t
          ? <h2 className="section-title-ar" style={{color:"var(--cream)"}}>اطلب من <em style={{color:"var(--caramel)"}}>كوفي هوم</em> بصوتك</h2>
          : <h2 className="section-title" style={{color:"var(--cream)"}}>Order from <em>Coffee Home</em> by voice</h2>}
        <p className="section-sub" style={{maxWidth:460, margin:"0 auto 8px"}}>
          {t
            ? "بمساعدة بولي دايل يمكنك طلب مشروبك وأكلك بالكلام — بدون ضغط على أي زرار!"
            : "Powered by PolyDial — just talk and our AI takes your order. No buttons needed!"}
        </p>
        <div className="polydial-frame-wrap">
          {/* ── POLYDIAL IFRAME PLACEHOLDER ──
              Replace the div below with:
              <iframe
                src="https://customer.polydial.com/?rk=YOUR_RESTAURANT_KEY"
                width="420"
                height="600"
                frameBorder="0"
                allow="microphone"
                style={{display:'block', border:'none'}}
              />
          */}
          <div className="polydial-placeholder">
            <div className="polydial-placeholder-icon">🎙</div>
            <div className="polydial-placeholder-title">
              {t ? "بولي دايل — نظام الطلب الذكي" : "PolyDial — Smart Voice Ordering"}
            </div>
            <div className="polydial-placeholder-sub">
              {t
                ? "هنا سيتم تضمين نظام الطلب الصوتي من بولي دايل. المستخدم يتكلم وبولي يفهم ويسجل الطلب."
                : "The PolyDial voice ordering widget will be embedded here. Customers speak and Poly understands their order."}
            </div>
            <div className="polydial-placeholder-code">
              {`<iframe src="https://customer.polydial.com/?rk=YOUR_KEY" />`}
            </div>
            <div style={{marginTop:8, fontSize:12, color:"#8B7050", display:"flex", alignItems:"center", gap:6}}>
              <span>⚡</span>
              {t ? "سيتم توفير المفتاح من فريق بولي دايل" : "Key provided by the PolyDial team"}
            </div>
          </div>
        </div>
      </section>

      {/* ── AMBIANCE ── */}
      <section className="ambiance-section" id="ambiance">
        <div className="section-tag">{t?"أجواؤنا":"Our Ambiance"}</div>
        {t
          ? <h2 className="section-title-ar">مكان يحسسك <em>ببيتك</em></h2>
          : <h2 className="section-title">A place that <em>feels like home</em></h2>}
        <p className="section-sub">
          {t
            ? "جلسات هادئة، إضاءة دافئة، ورائحة قهوة تملأ المكان."
            : "Quiet seating, warm lighting, and the aroma of fresh coffee fills every corner."}
        </p>
        <div className="ambiance-grid">
          {AMBIANCE.map((a, i) => (
            <div key={i} className={`ambiance-card ${a.tall?"tall":""}`}>
              <div className="ambiance-img" style={{background:`linear-gradient(${a.gradient})`}}>
                <span style={{fontSize: a.tall ? 100 : 72}}>{a.emoji}</span>
              </div>
              <div className="ambiance-caption">{a.label[lang]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VISIT ── */}
      <section className="visit-section" id="visit">
        <div className="visit-grid">
          <div className="visit-content">
            <div className="section-tag" style={{color:"var(--caramel)"}}>{t?"زيارتنا":"Visit Us"}</div>
            {t
              ? <h2 className="section-title-ar">نتطلع <em>لرؤيتك</em></h2>
              : <h2 className="section-title">We look forward<br/>to <em>seeing you</em></h2>}
            <p className="section-sub" style={{marginBottom:28}}>
              {t
                ? "نفتح أبوابنا كل يوم لنقدم لك أفضل تجربة قهوة في المدينة."
                : "Our doors are open every day to give you the best coffee experience in town."}
            </p>
            {[
              ["📍", t?"العنوان":"Address",       t?"١٢٣ شارع ميبل، تورنتو، كندا":"123 Maple Street, Toronto, ON, Canada"],
              ["🕐", t?"أوقات العمل":"Hours",      t?"السبت–الخميس: ٧ص – ١٠م\nالجمعة: ٩ص – ١١م":"Mon–Fri: 7am–10pm\nSat–Sun: 8am–11pm"],
              ["📞", t?"اتصل بنا":"Phone",         "+1 (416) 555-0199"],
              ["📧", t?"البريد":"Email",            "hello@coffeehome.ca"],
            ].map(([icon, title, val]) => (
              <div key={title} className="visit-info-box">
                <div className="visit-info-icon">{icon}</div>
                <div>
                  <div className="visit-info-title">{title}</div>
                  <div className="visit-info-val" style={{whiteSpace:"pre-line"}}>{val}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="map-placeholder">
              <span>🗺️</span>
              <p>{t ? "خريطة الموقع — تورنتو، كندا" : "Map — Toronto, Canada"}</p>
            </div>
            <div style={{marginTop:20, display:"flex", gap:10, justifyContent:"center"}}>
              {["Instagram","Twitter","Facebook","TikTok"].map(s => (
                <a key={s} className="social-btn" title={s}>
                  {s==="Instagram"?"📸":s==="Twitter"?"🐦":s==="Facebook"?"📘":"🎵"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-top">
          <div>
            {t
              ? <div className="footer-brand-name-ar">كوفي هوم</div>
              : <div className="footer-brand-name">Coffee Home</div>}
            <p className="footer-brand-desc">
              {t
                ? "مكانك في قلب تورنتو لأجواء دافئة وقهوة مميزة — coffeehome.ca"
                : "Your place in the heart of Toronto for warm vibes and exceptional coffee — coffeehome.ca"}
            </p>
          </div>
          <div>
            <div className="footer-col-title">{t?"روابط":"Links"}</div>
            <ul className="footer-links">
              {[["about",t?"من نحن":"About"],["menu",t?"القائمة":"Menu"],["order",t?"اطلب":"Order"],["visit",t?"زيارتنا":"Visit"]].map(([id,lbl]) => (
                <li key={id}><a onClick={() => scrollTo(id)}>{lbl}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">{t?"تواصل":"Contact"}</div>
            <ul className="footer-links">
              <li><a>hello@coffeehome.ca</a></li>
              <li><a>+1 (416) 555-0199</a></li>
              <li><a>{t?"تورنتو، كندا":"Toronto, Canada"}</a></li>
              <li><a onClick={() => setLang(l => l==="ar"?"en":"ar")}>{t?"English":"العربية"}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">
            © 2024 Coffee Home · coffeehome.ca · {t?"جميع الحقوق محفوظة":"All rights reserved"}
          </div>
          <div className="footer-polydial">
            {t?"الطلبات عبر":"Orders powered by"} <span>PolyDial</span> 🎙
          </div>
        </div>
      </footer>
    </div>
  );
}
