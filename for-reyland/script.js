// Remote Pro VAs — script.js
(function () {
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // Smooth scroll for in-page links
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('href');
      if (targetId.length > 1) {
        const el = $(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));

  // Back to top
  const toTop = $('#toTop');
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 600;
    toTop.classList.toggle('show', show);
  });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Year in footer
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();

  // Calculator
  const agents = $('#agents');
  const hours = $('#hours');
  const rate = $('#rate');
  const weekly = $('#weeklyCost');
  const monthly = $('#monthlyCost');

  function formatUSD(n) {
    try { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n); }
    catch { return `$${Math.round(n)}`; }
  }

  function updateCalc() {
    const a = Math.max(1, Number(agents.value || 0));
    const h = Math.max(1, Number(hours.value || 0));
    const r = Math.max(5, Number(rate.value || 5));
    const weeklyCost = a * h * r;
    const monthlyCost = weeklyCost * 4.33; // industry average weeks/month
    weekly.textContent = formatUSD(weeklyCost);
    monthly.textContent = formatUSD(monthlyCost);
  }

  [agents, hours, rate].forEach(i => i && i.addEventListener('input', updateCalc));
  updateCalc();

  // Contact form: open mailto with pre-filled content
  const contactForm = $('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(contactForm).entries());
      const subject = encodeURIComponent(`Inquiry — Remote Pro VAs ($5/hr, ${data.role || 'Talent'})`);
      const body = encodeURIComponent([
        `Name: ${data.name || ''}`,
        `Email: ${data.email || ''}`,
        `Company: ${data.company || ''}`,
        `Role needed: ${data.role || ''}`,
        '',
        (data.message || 'Goals / KPIs / tools: '),
      ].join('\n'));
      const mailto = `mailto:info@remoteprovas.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;
    });
  }
  
  // --- Fight the Fire Game -------------------------------------------------
  const canvas = $('#gameCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const baseW = canvas.width;
    const baseH = canvas.height;
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.floor(baseW * DPR);
    canvas.height = Math.floor(baseH * DPR);
    ctx.scale(DPR, DPR);
    const W = baseW;
    const H = baseH;

    // Helpers
    const TAU = Math.PI * 2;
    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
    const rand = (a, b) => a + Math.random() * (b - a);
    const dist2 = (x1, y1, x2, y2) => {
      const dx = x2 - x1, dy = y2 - y1; return dx*dx + dy*dy;
    };
    const drawEmoji = (emoji, x, y, size, rot=0) => {
      ctx.save();
      ctx.translate(x, y);
      if (rot) ctx.rotate(rot);
      ctx.font = `${size}px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, 0, 0);
      ctx.restore();
    };

    // Input
    const keys = new Set();
    const mouse = { x: W/2, y: H/2, down: false, angle: 0 };
    const updateMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      const scaleX = W / r.width; const scaleY = H / r.height;
      mouse.x = (e.clientX - r.left) * scaleX;
      mouse.y = (e.clientY - r.top) * scaleY;
    };
    window.addEventListener('keydown', (e) => { keys.add(e.key); });
    window.addEventListener('keyup', (e) => { keys.delete(e.key); });
    canvas.addEventListener('mousemove', updateMouse);
    canvas.addEventListener('mousedown', (e) => { updateMouse(e); mouse.down = true; });
    window.addEventListener('mouseup', () => { mouse.down = false; });

    // World state
    const player = { x: W/2, y: H/2, speed: 230, size: 28 };
    let score = 0;
    const fires = []; // {x,y,health}
    const waters = []; // {x,y,vx,vy,life,power,emoji,size}
    const FIRE_RADIUS = 18;
    const WATER_RADIUS_SMALL = 10;
    const WATER_RADIUS_BIG = 14;
    let timeToNextSpawn = 0;

    const spawnFire = () => {
      const margin = 40;
      let x = rand(margin, W - margin);
      let y = rand(margin, H - margin);
      // Avoid spawning too close to player
      let tries = 0;
      while (dist2(x,y,player.x,player.y) < 140*140 && tries < 10) {
        x = rand(margin, W - margin); y = rand(margin, H - margin); tries++;
      }
      fires.push({ x, y, health: 100, flicker: Math.random()*TAU });
    };

    for (let i=0;i<5;i++) spawnFire();

    const spawnWater = (type) => {
      const dx = Math.cos(mouse.angle), dy = Math.sin(mouse.angle);
      const baseSpeed = type === 'big' ? 520 : 560;
      const power = type === 'big' ? 40 : 14;
      const size = type === 'big' ? 26 : 18;
      const life = type === 'big' ? 0.9 : 0.55;
      const spread = type === 'big' ? 0.05 : 0.12;
      const angle = mouse.angle + rand(-spread, spread);
      const vx = Math.cos(angle) * baseSpeed + rand(-30, 30);
      const vy = Math.sin(angle) * baseSpeed + rand(-30, 30);
      const offset = 26; // from player muzzle
      waters.push({
        x: player.x + dx*offset,
        y: player.y + dy*offset,
        vx, vy,
        life,
        power,
        emoji: type === 'big' ? '💧' : '💦',
        size,
        r: type === 'big' ? WATER_RADIUS_BIG : WATER_RADIUS_SMALL,
      });
    };

    let bigTimer = 0, smallTimer = 0;

    // Loop
    let last = performance.now();
    function tick(now) {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      // Update player
      let ax = 0, ay = 0;
      if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) ax -= 1;
      if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) ax += 1;
      if (keys.has('ArrowUp') || keys.has('w') || keys.has('W')) ay -= 1;
      if (keys.has('ArrowDown') || keys.has('s') || keys.has('S')) ay += 1;
      if (ax || ay) {
        const len = Math.hypot(ax, ay) || 1;
        ax /= len; ay /= len;
        player.x = clamp(player.x + ax * player.speed * dt, 20, W-20);
        player.y = clamp(player.y + ay * player.speed * dt, 20, H-20);
      }
      mouse.angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);

      // Spray water while mouse is down
      if (mouse.down) {
        bigTimer -= dt; smallTimer -= dt;
        if (smallTimer <= 0) { spawnWater('small'); smallTimer = 0.045; }
        if (bigTimer <= 0) { spawnWater('big'); bigTimer = 0.14; }
      }

      // Update waters
      for (let i = waters.length - 1; i >= 0; i--) {
        const w = waters[i];
        w.x += w.vx * dt;
        w.y += w.vy * dt;
        w.life -= dt;
        if (w.x < -30 || w.x > W+30 || w.y < -30 || w.y > H+30 || w.life <= 0) {
          waters.splice(i,1); continue;
        }
      }

      // Spawn fires over time
      timeToNextSpawn -= dt;
      if (fires.length < 12 && timeToNextSpawn <= 0) {
        spawnFire();
        timeToNextSpawn = rand(0.8, 2.2);
      }

      // Collisions water -> fire
      for (let i = waters.length - 1; i >= 0; i--) {
        const w = waters[i];
        for (let j = fires.length - 1; j >= 0; j--) {
          const f = fires[j];
          if (dist2(w.x, w.y, f.x, f.y) <= (w.r + FIRE_RADIUS) * (w.r + FIRE_RADIUS)) {
            f.health -= w.power;
            w.life = 0; // consume water
            waters.splice(i,1);
            if (f.health <= 0) {
              fires.splice(j,1);
              score++;
            }
            break;
          }
        }
      }

      // Draw
      // background
      ctx.clearRect(0,0,W,H);
      const grd = ctx.createLinearGradient(0,0,W,H);
      grd.addColorStop(0, 'rgba(91,140,255,0.08)');
      grd.addColorStop(1, 'rgba(139,92,246,0.08)');
      ctx.fillStyle = grd;
      ctx.fillRect(0,0,W,H);

      // grid
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      for (let x=0; x<=W; x+=40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y=0; y<=H; y+=40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
      ctx.restore();

      // fires
      for (const f of fires) {
        f.flicker += dt * 6;
        const s = 30 + Math.sin(f.flicker)*2;
        drawEmoji('🔥', f.x, f.y, s);
      }

      // waters
      for (const w of waters) {
        drawEmoji(w.emoji, w.x, w.y, w.size);
      }

      // player and extinguisher
      drawEmoji('🧑‍🚒', player.x, player.y, player.size);
      const exOff = 24; // distance from player center
      const exX = player.x + Math.cos(mouse.angle) * exOff;
      const exY = player.y + Math.sin(mouse.angle) * exOff;
      drawEmoji('🧯', exX, exY, 24, mouse.angle);

      // HUD DOM updates
      const sEl = $('#hudScore');
      const fEl = $('#hudFires');
      if (sEl) sEl.textContent = String(score);
      if (fEl) fEl.textContent = String(fires.length);

      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

})();
