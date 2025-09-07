// Shadow Broker — client-side demo logic
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const form = $('#shadow-form');
  const statusEl = $('#status');
  const receiptBody = $('#receipt-body');
  const ledgerList = $('#ledger-list');
  const clearBtn = $('#clear-ledger');
  const yearEl = $('#year');
  const fxLayer = $('#fx-layer');

  const LEDGER_KEY = 'sb_ledger_v1';

  // Utilities
  const nowISO = () => new Date().toISOString();
  const niceDate = (d) => new Date(d).toLocaleString();
  const rand = (min, max) => Math.random() * (max - min) + min;
  const id = () => 'sb_' + Math.random().toString(36).slice(2, 10);

  function loadLedger() {
    try {
      return JSON.parse(localStorage.getItem(LEDGER_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveLedger(items) {
    localStorage.setItem(LEDGER_KEY, JSON.stringify(items));
  }

  function addToLedger(entry) {
    const items = loadLedger();
    items.unshift(entry);
    // keep last 25
    if (items.length > 25) items.length = 25;
    saveLedger(items);
    renderLedger();
  }

  function clearLedger() {
    saveLedger([]);
    renderLedger();
  }

  function renderLedger() {
    const items = loadLedger();
    if (!items.length) {
      ledgerList.innerHTML = '<div class="card muted">No entries yet. Cast a payment to populate the ledger.</div>';
      return;
    }
    ledgerList.innerHTML = items
      .map((t) => {
        const amt = Number(t.amount).toFixed(2);
        return `
          <div class="card ledger-item">
            <div class="row"><strong>${t.merchant}</strong><span>$${amt}</span></div>
            <div class="row"><span class="muted">${t.shadow} · intensity ${t.intensity}</span><span class="muted">${t.customer}</span></div>
            <div class="row"><span class="muted">${niceDate(t.created)}</span><span class="muted">${t.id}</span></div>
          </div>
        `;
      })
      .join('');
  }

  function setYear() {
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // FX: mouse-guided glow
  function attachFxLayer() {
    if (!fxLayer) return;
    window.addEventListener('pointermove', (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      fxLayer.style.setProperty('--mx', `${x}%`);
      fxLayer.style.setProperty('--my', `${y}%`);
    });
  }

  // FX: cast shadow particles on submit
  function castShadowFX() {
    if (!fxLayer) return;
    const n = 18 + Math.floor(Math.random() * 12);
    for (let i = 0; i < n; i++) {
      const p = document.createElement('span');
      p.className = 'sb-particle';
      const size = rand(6, 16);
      p.style.position = 'fixed';
      p.style.left = rand(30, 70) + 'vw';
      p.style.top = rand(30, 70) + 'vh';
      p.style.width = p.style.height = size + 'px';
      p.style.borderRadius = '50%';
      p.style.background = `radial-gradient(circle at 30% 30%, rgba(138,92,255,.9), rgba(25,227,214,.6))`;
      p.style.filter = 'blur(1px)';
      p.style.opacity = '0.85';
      p.style.pointerEvents = 'none';
      p.style.transform = `translate(${rand(-40, 40)}px, ${rand(-40, 40)}px) scale(${rand(0.8, 1.4)})`;
      p.style.transition = 'transform 900ms ease, opacity 900ms ease';
      fxLayer.appendChild(p);
      // animate out
      requestAnimationFrame(() => {
        p.style.transform = `translate(${rand(-200, 200)}px, ${rand(-140, 140)}px) scale(${rand(0.3, 0.8)})`;
        p.style.opacity = '0';
      });
      setTimeout(() => p.remove(), 1100);
    }
  }

  async function simulateProcessing({ merchant, amount, shadow, customer, intensity, note }) {
    // playful status updates
    statusEl.textContent = 'Casting ambient umbra…';
    await sleep(400 + rand(0, 300));
    statusEl.textContent = 'Verifying chiaroscuro signatures…';
    await sleep(450 + rand(0, 300));
    statusEl.textContent = 'Anti-photon shielding engaged…';
    await sleep(420 + rand(0, 320));

    // Random outcome with bias to success
    const ok = Math.random() > 0.06 || Number(amount) < 10;
    if (!ok) {
      statusEl.textContent = 'Declined: insufficient darkness in vicinity.';
      return { ok: false };
    }

    statusEl.textContent = 'Approved in the shadows.';

    const entry = {
      id: id(),
      merchant,
      amount: Number(amount),
      shadow,
      customer,
      intensity: Number(intensity),
      note: note || '',
      created: nowISO(),
    };

    addToLedger(entry);
    return { ok: true, entry };
  }

  function renderReceipt(entry) {
    if (!entry) {
      receiptBody.innerHTML = '<p class="muted">No transaction yet.</p>';
      return;
    }
    const lines = [
      `Merchant: ${entry.merchant}`,
      `Customer: ${entry.customer}`,
      `Amount: $${entry.amount.toFixed(2)}`,
      `Shadow: ${entry.shadow}`,
      `Intensity: ${entry.intensity}`,
      entry.note ? `Note: ${entry.note}` : '',
      `Txn: ${entry.id}`,
      `When: ${niceDate(entry.created)}`,
      '',
      'Signature: ███▒▒▒▓▓ umbra-ok',
    ].filter(Boolean);

    receiptBody.innerHTML = `
      <div class="muted">Approved · Noir-Grade</div>
      <pre>${lines.join('\n')}</pre>
    `;
  }

  function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  function attachForm() {
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      statusEl.textContent = '';

      const merchant = $('#merchant').value.trim();
      const amount = $('#amount').value;
      const shadow = $('#shadow').value;
      const customer = $('#customer').value.trim();
      const intensity = $('#intensity').value;
      const note = $('#note').value.trim();

      if (!merchant || !amount || !customer) {
        statusEl.textContent = 'Missing fields — the night demands details.';
        return;
      }

      castShadowFX();
      $('#pay').disabled = true;

      const res = await simulateProcessing({ merchant, amount, shadow, customer, intensity, note });
      $('#pay').disabled = false;

      if (res.ok) {
        renderReceipt(res.entry);
      }
    });
  }

  function attachClear() {
    if (!clearBtn) return;
    clearBtn.addEventListener('click', () => {
      clearLedger();
      receiptBody.innerHTML = '<p>No transaction yet. Cast a payment to see a spectral receipt.</p>';
      statusEl.textContent = 'Ledger cleared at dawn.';
    });
  }

  // Init
  setYear();
  attachFxLayer();
  attachForm();
  attachClear();
  renderLedger();
})();
