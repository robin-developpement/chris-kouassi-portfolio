/* nav.js — navbar + footer + theme toggle */
(function(){

  /* Apply saved theme BEFORE paint to avoid flash */
  const saved = localStorage.getItem('rb_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  document.body.setAttribute('data-theme', saved);

  const nav = `
<div id="cursor"></div><div id="cursor-ring"></div>

<div class="mobile-menu" id="mobileMenu">
  <button class="mobile-close" id="mobileClose">×</button>
  <a href="index.html">Accueil</a>
  <a href="about.html">À propos</a>
  <a href="creations.html">Créations</a>
  <a href="contact.html">Contact</a>
  <button class="theme-toggle mobile-theme" id="mobileThemeBtn" aria-label="Changer le thème">🌙</button>
</div>

<nav class="navbar" id="navbar">
  <a href="index.html" class="logo">
    <div class="logo-box">R</div>
    Robin<span style="color:var(--orange)">.</span>
  </a>
  <div class="nav-links">
    <a href="index.html">Accueil</a>
    <a href="about.html">À propos</a>
    <a href="creations.html">Créations</a>
    <a href="contact.html" class="nav-cta">Me contacter</a>
    <button class="theme-toggle" id="themeBtn" aria-label="Changer le thème">🌙</button>
  </div>
  <div style="display:flex;gap:.8rem;align-items:center">
    <button class="theme-toggle" id="themeBtnMob" aria-label="Changer le thème">🌙</button>
    <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
  </div>
</nav>`;

  const foot = `
<div class="marquee-wrap">
  <div class="marquee-track">
    <span class="mitem">Webdesign</span><span class="mdot"> ✦ </span>
    <span class="mitem">Développement</span><span class="mdot"> ✦ </span>
    <span class="mitem">Infographie</span><span class="mdot"> ✦ </span>
    <span class="mitem">Digital Content</span><span class="mdot"> ✦ </span>
    <span class="mitem">Réseaux</span><span class="mdot"> ✦ </span>
    <span class="mitem">Branding</span><span class="mdot"> ✦ </span>
    <span class="mitem">SEO</span><span class="mdot"> ✦ </span>
    <span class="mitem">Webdesign</span><span class="mdot"> ✦ </span>
    <span class="mitem">Développement</span><span class="mdot"> ✦ </span>
    <span class="mitem">Infographie</span><span class="mdot"> ✦ </span>
    <span class="mitem">Digital Content</span><span class="mdot"> ✦ </span>
    <span class="mitem">Réseaux</span><span class="mdot"> ✦ </span>
    <span class="mitem">Branding</span><span class="mdot"> ✦ </span>
    <span class="mitem">SEO</span><span class="mdot"> ✦ </span>
  </div>
</div>
<footer>
  <div class="fcopy">Robin<span style="color:var(--orange)">.</span> — © 2025 Kouassi Chris Bah Robin Becanti</div>
  <div class="flinks">
    <a href="index.html">Accueil</a>
    <a href="creations.html">Créations</a>
    <a href="contact.html">Contact</a>
  </div>
</footer>`;

  document.body.insertAdjacentHTML('afterbegin', nav);
  document.body.insertAdjacentHTML('beforeend', foot);
})();
