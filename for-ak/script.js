/* Blueberries — Interactions & Canvas */
(() => {
  'use strict';

  // Mobile nav toggle
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (navToggle && header && nav) {
    navToggle.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      header.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const hash = a.getAttribute('href');
      if (!hash || hash === '#') return;
      const el = document.querySelector(hash);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealIO.observe(el));

  // Tilt effect (mouse + touch)
  const tilts = document.querySelectorAll('.tilt');
  tilts.forEach(el => {
    let raf = 0;
    const max = 10; // deg
    const setFromPoint = (clientX, clientY) => {
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width; // 0..1
      const y = (clientY - rect.top) / rect.height; // 0..1
      const rx = (0.5 - y) * max;
      const ry = (x - 0.5) * max;
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const reset = () => { el.style.transform = 'rotateX(0) rotateY(0)'; };

    el.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setFromPoint(e.clientX, e.clientY));
    });
    el.addEventListener('mouseleave', reset);
    el.addEventListener('touchstart', (e) => { if (e.touches[0]) setFromPoint(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    el.addEventListener('touchmove', (e) => { if (e.touches[0]) setFromPoint(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    el.addEventListener('touchend', reset, { passive: true });
  });

  // Nutrition visuals: rings and bars
  document.querySelectorAll('.ring').forEach(el => {
    const v = Math.max(0, Math.min(100, Number(el.dataset.value) || 0));
    const label = el.dataset.label || '';
    el.style.setProperty('--pct', `0deg`); // start at 0 for animation
    el.innerHTML = `${Math.round(v)}%<span>${label}</span>`;
    // animate to value after reveal
    requestAnimationFrame(() => {
      setTimeout(() => el.style.setProperty('--pct', `${v * 3.6}deg`), 80);
    });
  });

  document.querySelectorAll('.bar').forEach(el => {
    const label = el.dataset.label || '';
    const max = Number(el.dataset.max) || 100;
    const value = Number(el.dataset.value) || 0;
    const pct = Math.max(0, Math.min(100, (value / max) * 100));
    el.innerHTML = `
      <div class="bar-row">
        <span class="bar-label">${label}</span>
        <span class="bar-track"><span class="bar-fill" style="width:0%"></span></span>
        <span class="bar-val">${value}</span>
      </div>`;
    const fill = el.querySelector('.bar-fill');
    requestAnimationFrame(() => setTimeout(() => { fill.style.width = `${pct}%`; }, 80));
  });

  // Canvas blueberries background
  const canvas = document.getElementById('berryCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = 'ontouchstart' in window || (navigator.maxTouchPoints || 0) > 0;

  const pointer = { x: 0, y: 0, down: false, active: false };
  const rand = (min, max) => Math.random() * (max - min) + min;

  class Berry {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.r = rand(6, 16) * (isTouch ? 1.15 : 1);
      this.x = initial ? rand(0, W) : (Math.random() < 0.5 ? -this.r : W + this.r);
      this.y = initial ? rand(0, H) : rand(0, H);
      const speed = prefersReduced ? 0.05 : rand(0.15, 0.55);
      const angle = rand(0, Math.PI * 2);
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.hue = rand(220, 235); // blue range
      this.alpha = rand(0.45, 0.85);
      this.spin = rand(-0.02, 0.02);
      this.rot = rand(0, Math.PI * 2);
    }
    update() {
      // Gentle attraction/repulsion from pointer
      if (pointer.active) {
        const dx = this.x - pointer.x;
        const dy = this.y - pointer.y;
        const dist = Math.hypot(dx, dy) || 1;
        const radius = 120;
        if (dist < radius) {
          const force = (1 - dist / radius) * (pointer.down ? 2.2 : 1.1);
          this.vx += (dx / dist) * force * 0.08;
          this.vy += (dy / dist) * force * 0.08;
        }
      }
      this.x += this.vx;
      this.y += this.vy;
      this.rot += this.spin;

      // Soft bounds with wrap
      if (this.x < -this.r) this.x = W + this.r;
      if (this.x > W + this.r) this.x = -this.r;
      if (this.y < -this.r) this.y = H + this.r;
      if (this.y > H + this.r) this.y = -this.r;

      // Damp velocities slightly
      this.vx *= 0.995;
      this.vy *= 0.995;
    }
    draw(ctx) {
      const r = this.r;
      const x = this.x, y = this.y;
      // body gradient
      const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.2, x, y, r);
      g.addColorStop(0, `hsla(${this.hue}, 85%, 82%, ${this.alpha})`);
      g.addColorStop(0.6, `hsla(${this.hue}, 60%, 47%, ${this.alpha})`);
      g.addColorStop(1, `hsla(${this.hue}, 60%, 30%, ${this.alpha})`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      // highlight
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.beginPath();
      ctx.arc(x - r * 0.35, y - r * 0.38, r * 0.18, 0, Math.PI * 2);
      ctx.fill();

      // calyx/star at bottom
      ctx.save();
      ctx.translate(x, y + r * 0.2);
      ctx.rotate(this.rot);
      ctx.strokeStyle = `hsla(${this.hue}, 70%, 18%, ${this.alpha})`;
      ctx.lineWidth = Math.max(1, r * 0.08);
      const s = r * 0.42;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
      }
      ctx.stroke();
      ctx.restore();
    }
  }

  let berries = [];

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const target = Math.round(Math.min(90, Math.max(28, (W * H) / 38000)));
    if (berries.length === 0) {
      berries = Array.from({ length: target }, () => new Berry());
    } else if (berries.length < target) {
      const add = target - berries.length;
      for (let i = 0; i < add; i++) berries.push(new Berry());
    } else if (berries.length > target) {
      berries.length = target;
    }
  }

  let rafId = 0;
  function loop() {
    rafId = requestAnimationFrame(loop);
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < berries.length; i++) {
      const b = berries[i];
      b.update();
      b.draw(ctx);
    }
  }

  function onMove(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = clientX - rect.left;
    pointer.y = clientY - rect.top;
    pointer.active = true;
  }

  // Event handling
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY), { passive: true });
  window.addEventListener('mousedown', (e) => { pointer.down = true; onMove(e.clientX, e.clientY); });
  window.addEventListener('mouseup', () => { pointer.down = false; });
  window.addEventListener('mouseleave', () => { pointer.active = false; });

  window.addEventListener('touchstart', (e) => {
    if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    pointer.down = true;
  }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  window.addEventListener('touchend', () => { pointer.down = false; pointer.active = false; }, { passive: true });

  // Start
  resize();
  if (prefersReduced) {
    // fewer berries and slower updates
    berries.forEach(b => { b.vx *= 0.5; b.vy *= 0.5; });
  }
  loop();
})();
