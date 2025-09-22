// Julia's Burger House — scripts
(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  // Mobile nav toggle
  const toggle = $('.mobile-toggle');
  const nav = $('.nav');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.style.display === 'flex';
      nav.style.display = open ? 'none' : 'flex';
      toggle.setAttribute('aria-expanded', String(!open));
    });
  }

  // Smooth scroll (native CSS handles most, this ensures offset behavior)
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const el = $(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.15 });
  $$('.reveal').forEach(el => io.observe(el));

  // Filter chips
  const chips = $$('.chip');
  const items = $$('.item');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      items.forEach(it => {
        const show = filter === 'all' || it.dataset.category === filter;
        it.classList.toggle('hide', !show);
      });
    });
  });

  // Add to cart (demo only)
  const cart = [];
  $$('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price)
      };
      cart.push(item);
      btn.textContent = 'Added ✓';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Add';
        btn.disabled = false;
      }, 1400);
      console.log('Cart:', cart);
    });
  });

  // Testimonials carousel
  const carousel = $('.carousel');
  if (carousel){
    const slides = $$('.slide', carousel);
    const prev = $('.prev', carousel);
    const next = $('.next', carousel);
    const dotsWrap = $('.dots', carousel);

    let index = 0;
    const makeDots = () => {
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.setAttribute('aria-label', `Slide ${i+1}`);
        b.addEventListener('click', () => go(i));
        dotsWrap.appendChild(b);
      });
    };
    const update = () => {
      slides.forEach((s, i) => s.classList.toggle('current', i === index));
      $$('.dots button', carousel).forEach((d, i) => d.classList.toggle('active', i === index));
    };
    const go = (i) => { index = (i + slides.length) % slides.length; update(); };

    makeDots();
    update();

    prev.addEventListener('click', () => go(index - 1));
    next.addEventListener('click', () => go(index + 1));

    let auto = setInterval(() => go(index + 1), 4500);
    carousel.addEventListener('mouseenter', () => clearInterval(auto));
    carousel.addEventListener('mouseleave', () => auto = setInterval(() => go(index + 1), 4500));
  }

  // Newsletter form
  const form = $('.cta-form');
  const note = $('.form-note');
  if (form){
    form.addEventListener('submit', () => {
      note.textContent = 'Thanks! We\'ll ping you when the secret menu drops.';
      setTimeout(() => note.textContent = '', 4000);
    });
  }

  // Back to top
  const btt = $('.back-to-top');
  window.addEventListener('scroll', () => {
    btt.classList.toggle('show', window.scrollY > 400);
  });
  btt.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  // Year in footer
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();

  // Burger Blaster Game
  const area = $('#gg-area');
  const startBtn = $('#gg-start');
  const scoreEl = $('#gg-score');
  const timeEl = $('#gg-time');
  const accEl = $('#gg-acc');

  if (area && startBtn && scoreEl && timeEl && accEl){
    let score = 0;
    let shots = 0;
    let hits = 0;
    let timeLeft = 30;
    let spawnTimer = null;
    let countdownTimer = null;

    const rnd = (min, max) => Math.random() * (max - min) + min;

    const updateHUD = () => {
      scoreEl.textContent = String(score);
      timeEl.textContent = String(timeLeft);
      const acc = shots === 0 ? 100 : Math.round((hits / shots) * 100);
      accEl.textContent = `${acc}%`;
    };

    const clearBurgers = () => {
      $$('.burger', area).forEach(b => b.remove());
    };

    const splatAt = (x, y) => {
      const s = document.createElement('div');
      s.className = 'splat';
      s.style.left = `${x - area.getBoundingClientRect().left}px`;
      s.style.top = `${y - area.getBoundingClientRect().top}px`;
      area.appendChild(s);
      // force reflow then animate
      void s.offsetWidth; 
      s.classList.add('animate');
      setTimeout(() => s.remove(), 500);
    };

    const spawnBurger = () => {
      const rect = area.getBoundingClientRect();
      const size = 34; // font size in px approximated
      const x = rnd(8, rect.width - 8 - size);
      const y = rnd(8, rect.height - 8 - size);
      const life = rnd(900, 1600); // ms on screen

      const el = document.createElement('button');
      el.className = 'burger';
      el.type = 'button';
      el.setAttribute('aria-label', 'Eat burger');
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.textContent = '🍔';

      const remove = () => { if (el && el.parentNode) el.remove(); };
      const ttl = setTimeout(remove, life);

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        hits += 1;
        shots += 1;
        score += 1;
        updateHUD();
        clearTimeout(ttl);
        remove();
        // small feedback splat
        splatAt(e.clientX, e.clientY);
      }, { once: true });

      area.appendChild(el);
    };

    const endGame = () => {
      clearInterval(spawnTimer); spawnTimer = null;
      clearInterval(countdownTimer); countdownTimer = null;
      startBtn.disabled = false;
      startBtn.textContent = 'Play Again';
      area.style.pointerEvents = 'auto';
      // brief end splash message
      const msg = document.createElement('div');
      msg.style.position = 'absolute';
      msg.style.inset = '0';
      msg.style.display = 'grid';
      msg.style.placeItems = 'center';
      msg.style.background = 'rgba(0,0,0,0.25)';
      msg.style.backdropFilter = 'blur(2px)';
      msg.style.fontWeight = '800';
      msg.style.letterSpacing = '.5px';
      msg.style.textAlign = 'center';
      msg.innerHTML = `<div>Time! Score: ${score} • Accuracy: ${shots ? Math.round((hits/shots)*100) : 100}%</div>`;
      area.appendChild(msg);
      setTimeout(() => msg.remove(), 1200);
      clearBurgers();
    };

    const startGame = () => {
      // reset
      score = 0; shots = 0; hits = 0; timeLeft = 30;
      updateHUD();
      clearBurgers();
      startBtn.disabled = true;
      startBtn.textContent = 'Good luck!';
      area.style.pointerEvents = 'auto';

      // timers
      spawnTimer = setInterval(spawnBurger, 650);
      countdownTimer = setInterval(() => {
        timeLeft -= 1;
        updateHUD();
        if (timeLeft <= 0){
          endGame();
        }
      }, 1000);
    };

    // miss detection and splat
    area.addEventListener('click', (e) => {
      // only count miss if clicking the area itself, not child burger (stopped above)
      if (e.target === area){
        shots += 1;
        updateHUD();
        splatAt(e.clientX, e.clientY);
      }
    });

    startBtn.addEventListener('click', startGame);
  }
})();
