// Page-level interactions (forms, toasts)
(function () {
  function toast(msg, timeout) {
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    // force reflow
    void t.offsetWidth;
    t.classList.add('show');
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 250); }, timeout || 2200);
  }

  function bindDemoForm(id) {
    var form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      setTimeout(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Send'; }
        form.reset();
        toast('Thanks! We\'ll be in touch shortly.');
      }, 900);
    });
  }

  document.addEventListener('layout:ready', function () {
    ['contact-form', 'hire-form', 'jobs-alert-form'].forEach(bindDemoForm);
  });
})();
