// Inject shared header and footer, handle nav + sticky header
(function () {
  const headerTemplate = `
<header class="site-header" id="app-header">
  <div class="container nav">
    <a class="brand" href="index.html" aria-label="Go to Home">
      <span class="brand-name">Work Coach Group 2</span>
      <span class="brand-tag">Resurrection</span>
    </a>
    <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
      <span class="bar"></span>
    </button>
    <nav class="nav-menu" aria-label="Primary">
      <a href="index.html">Home</a>
      <a href="hire-talent.html">Hire Talent</a>
      <a href="find-jobs.html">Find Jobs</a>
      <a href="services.html">Services</a>
      <a href="contact.html">Contact</a>
      <a class="btn btn-primary nav-cta" href="hire-talent.html">Hire Now</a>
    </nav>
  </div>
</header>`;

  const footerTemplate = `
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <div class="brand">Work Coach Group 2: Resurrection</div>
      <p>Professional staffing and career services. Hire talent. Find jobs. Succeed.</p>
    </div>
    <div class="footer-links">
      <strong>Company</strong>
      <a href="index.html">Home</a>
      <a href="services.html">Services</a>
      <a href="contact.html">Contact</a>
    </div>
    <div class="footer-links">
      <strong>Legal</strong>
      <a href="privacy-policy.html">Privacy Policy</a>
    </div>
  </div>
  <div class="container" style="padding-bottom:16px; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;">
    <small>© <span id="year"></span> Work Coach Group 2: Resurrection. All rights reserved.</small>
  </div>
  <div class="ad-banner">
    <span>Built by </span>
    <a href="https://mattyjacks.com/" target="_blank" rel="noopener">mattyjacks.com</a>
  </div>
</footer>`;

  function inject(id, html) {
    var mount = document.getElementById(id);
    if (!mount) {
      mount = document.createElement('div');
      mount.id = id;
      document.body.prepend(mount);
    }
    mount.innerHTML = html;
  }

  function highlightActive() {
    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(function (a) {
      var href = a.getAttribute('href');
      var normalized = href.split('/').pop();
      if (normalized === path) a.classList.add('active');
    });
  }

  function stickyHeader() {
    var header = document.getElementById('app-header');
    var last = 0;
    window.addEventListener('scroll', function () {
      var y = window.scrollY || window.pageYOffset;
      if (!header) return;
      if (y > 8) header.classList.add('is-sticky'); else header.classList.remove('is-sticky');
      last = y;
    }, { passive: true });
  }

  function mobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  function smoothAnchors() {
    document.addEventListener('click', function (e) {
      var t = e.target.closest('a[href^="#"]');
      if (!t) return;
      var id = t.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    inject('site-header', headerTemplate);
    inject('site-footer', footerTemplate);
    highlightActive();
    mobileNav();
    stickyHeader();
    smoothAnchors();

    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    document.dispatchEvent(new Event('layout:ready'));
  });
})();
