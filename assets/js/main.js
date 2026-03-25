/* =============================================
   main.js — shared interactions
   Theme toggle + secret admin upload shortcut
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ─── Theme ─── */
  const applyTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t);
    document.body.setAttribute('data-theme', t);
    localStorage.setItem('rb_theme', t);
    const icon = t === 'dark' ? '☀️' : '🌙';
    document.querySelectorAll('#themeBtn,#themeBtnMob,#mobileThemeBtn').forEach(b => {
      if(b) b.textContent = icon;
    });
  };

  // Init icon on load
  const current = localStorage.getItem('rb_theme') || 'dark';
  applyTheme(current);

  // Click handlers
  document.querySelectorAll('#themeBtn,#themeBtnMob,#mobileThemeBtn').forEach(btn => {
    if(!btn) return;
    btn.addEventListener('click', () => {
      const now = document.body.getAttribute('data-theme');
      applyTheme(now === 'dark' ? 'light' : 'dark');
    });
  });

  /* ─── Cursor ─── */
  const C = document.getElementById('cursor');
  const R = document.getElementById('cursor-ring');
  if(C && R){
    let mx=0, my=0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      C.style.left = mx+'px'; C.style.top = my+'px';
    });
    setInterval(() => { R.style.left = mx+'px'; R.style.top = my+'px'; }, 80);
    document.querySelectorAll('a,button,[data-h]').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('chover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('chover'));
    });
  }

  /* ─── Navbar scroll ─── */
  const nb = document.querySelector('.navbar');
  if(nb) window.addEventListener('scroll', () => nb.classList.toggle('scrolled', scrollY > 40));

  /* ─── Active nav link ─── */
  const cur = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a,.mobile-menu a').forEach(a => {
    if(a.getAttribute('href') === cur) a.classList.add('active');
  });

  /* ─── Mobile menu ─── */
  const hb=document.getElementById('hamburger'), mm=document.getElementById('mobileMenu'), mc=document.getElementById('mobileClose');
  if(hb && mm){
    hb.addEventListener('click', () => mm.classList.add('open'));
    mc?.addEventListener('click', () => mm.classList.remove('open'));
    mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mm.classList.remove('open')));
  }

  /* ─── Scroll reveal ─── */
  const obs = new IntersectionObserver(en => {
    en.forEach(e => { if(e.isIntersecting) e.target.classList.add('v'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));

  /* Hero instant reveal */
  setTimeout(() => {
    document.querySelectorAll('.hero-z .reveal,.hero-z .reveal-left,.hero-z .reveal-right')
      .forEach(el => el.classList.add('v'));
  }, 80);

  /* ─── SECRET UPLOAD PANEL (Ctrl + Shift + A) ─── */
  /* Only visible on creations.html */
  if(location.pathname.includes('creations')) {
    let keys = [];
    document.addEventListener('keydown', e => {
      if(e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        toggleAdminPanel();
      }
    });

    function toggleAdminPanel() {
      let panel = document.getElementById('adminPanel');
      if(!panel) {
        panel = document.createElement('div');
        panel.id = 'adminPanel';
        panel.innerHTML = `
          <div id="ap-inner">
            <div id="ap-header">
              <span id="ap-title">⚙️ Espace Créations</span>
              <button id="ap-close">×</button>
            </div>
            <p id="ap-hint">Importez vos créations — elles s'affichent automatiquement dans la galerie.</p>
            <label id="ap-uplabel" for="ap-file">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Choisir des images
            </label>
            <input type="file" id="ap-file" multiple accept="image/*" style="display:none"/>
            <div id="ap-list"></div>
            <button id="ap-clear">🗑 Effacer toutes mes imports</button>
          </div>`;
        document.body.appendChild(panel);

        // Styles
        const s = document.createElement('style');
        s.textContent = `
          #adminPanel {
            position:fixed; inset:0; z-index:800;
            background:rgba(0,0,0,.7); backdrop-filter:blur(10px);
            display:flex; align-items:center; justify-content:center; padding:2rem;
          }
          #ap-inner {
            background:var(--bg2); border:1px solid var(--border);
            border-radius:16px; padding:2.5rem; width:100%; max-width:480px;
            box-shadow:0 24px 80px rgba(0,0,0,.5);
          }
          #ap-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:.8rem; }
          #ap-title { font-family:var(--font-display); font-size:1.1rem; font-weight:800; color:var(--text); }
          #ap-close { background:none; border:none; color:var(--text-muted); font-size:1.6rem; cursor:pointer; transition:color .2s; }
          #ap-close:hover { color:var(--orange); }
          #ap-hint { font-size:.82rem; color:var(--text-muted); margin-bottom:1.5rem; line-height:1.5; }
          #ap-uplabel {
            display:flex; align-items:center; gap:.6rem;
            padding:.8rem 1.5rem; border-radius:8px;
            background:var(--orange); color:#fff;
            font-size:.8rem; font-weight:700; cursor:pointer;
            transition:background .2s, transform .2s; margin-bottom:1.5rem;
            width:fit-content;
          }
          #ap-uplabel:hover { background:var(--orange2); transform:translateY(-2px); }
          #ap-list { display:flex; flex-wrap:wrap; gap:.5rem; margin-bottom:1.2rem; max-height:160px; overflow-y:auto; }
          .ap-chip {
            display:flex; align-items:center; gap:.4rem;
            padding:.3rem .7rem; border-radius:6px;
            background:var(--card-bg); border:1px solid var(--border);
            font-size:.72rem; color:var(--text-muted); font-family:var(--font-mono);
          }
          .ap-chip img { width:24px; height:24px; object-fit:cover; border-radius:3px; }
          .ap-chip-del { background:none; border:none; color:#ff5555; cursor:pointer; font-size:.9rem; }
          #ap-clear { width:100%; padding:.7rem; background:rgba(255,60,60,.1); border:1px solid rgba(255,60,60,.25); border-radius:8px; color:#ff5555; font-size:.78rem; cursor:pointer; transition:background .2s; font-weight:600; }
          #ap-clear:hover { background:rgba(255,60,60,.2); }
        `;
        document.head.appendChild(s);

        // Events
        document.getElementById('ap-close').addEventListener('click', () => panel.remove());
        panel.addEventListener('click', e => { if(e.target === panel) panel.remove(); });

        document.getElementById('ap-file').addEventListener('change', function(){
          const files = [...this.files]; if(!files.length) return;
          let done = 0;
          files.forEach(f => {
            const reader = new FileReader();
            reader.onload = ev => {
              let items = [];
              try { items = JSON.parse(localStorage.getItem('rb_gallery')||'[]'); } catch(e){}
              items.push({
                id: 'u'+Date.now()+Math.random(),
                src: ev.target.result,
                title: f.name.replace(/\.[^.]+$/,'').replace(/[-_]/g,' '),
                cat: 'user', type: 'user'
              });
              localStorage.setItem('rb_gallery', JSON.stringify(items));
              if(++done === files.length) {
                refreshPanel();
                if(typeof window.renderGallery === 'function') window.renderGallery();
              }
            };
            reader.readAsDataURL(f);
          });
          this.value = '';
        });

        document.getElementById('ap-clear').addEventListener('click', () => {
          if(confirm('Effacer toutes les images importées ?')) {
            localStorage.removeItem('rb_gallery');
            refreshPanel();
            if(typeof window.renderGallery === 'function') window.renderGallery();
          }
        });
      }

      refreshPanel();
      panel.style.display = panel.style.display === 'none' ? 'flex' : (panel.id ? 'flex' : 'none');
    }

    function refreshPanel() {
      const list = document.getElementById('ap-list');
      if(!list) return;
      let items = [];
      try { items = JSON.parse(localStorage.getItem('rb_gallery')||'[]'); } catch(e){}
      if(!items.length) { list.innerHTML = '<span style="font-size:.78rem;color:var(--text-muted);font-family:var(--font-mono)">Aucune image importée.</span>'; return; }
      list.innerHTML = items.map(it => `
        <div class="ap-chip">
          <img src="${it.src}" alt=""/>
          <span style="max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${it.title}</span>
          <button class="ap-chip-del" data-id="${it.id}">✕</button>
        </div>`).join('');
      list.querySelectorAll('.ap-chip-del').forEach(btn => {
        btn.addEventListener('click', () => {
          let its = [];
          try { its = JSON.parse(localStorage.getItem('rb_gallery')||'[]'); } catch(e){}
          its = its.filter(i => i.id !== btn.dataset.id);
          localStorage.setItem('rb_gallery', JSON.stringify(its));
          refreshPanel();
          if(typeof window.renderGallery === 'function') window.renderGallery();
        });
      });
    }
  }

});
