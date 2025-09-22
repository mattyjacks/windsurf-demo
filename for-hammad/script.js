// Courses Online 123 Go — script.js

// ---- Data: Curated courses (official links) ----
// Images courtesy of Pexels (see footer). We use direct CDN links with compression params.
const COURSES = [
  {
    id: 'cs50',
    title: "CS50: Introduction to Computer Science",
    provider: 'Harvard University',
    url: 'https://cs50.harvard.edu/x/',
    price: 0,
    rating: 4.9,
    level: 'Beginner',
    categories: ['Programming', 'Computer Science', 'Foundations'],
    image: 'https://images.pexels.com/photos/3862142/pexels-photo-3862142.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'mlcc',
    title: 'Machine Learning Crash Course',
    provider: 'Google',
    url: 'https://developers.google.com/machine-learning/crash-course',
    price: 0,
    rating: 4.8,
    level: 'Beginner',
    categories: ['AI', 'Machine Learning'],
    image: 'https://images.pexels.com/photos/6424590/pexels-photo-6424590.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'ml-specialization',
    title: 'Machine Learning Specialization',
    provider: 'DeepLearning.AI (Coursera)',
    url: 'https://www.deeplearning.ai/courses/machine-learning-specialization/',
    price: 49,
    rating: 4.8,
    level: 'Beginner',
    categories: ['AI', 'Machine Learning'],
    image: 'https://images.pexels.com/photos/5483075/pexels-photo-5483075.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'fastai-pdl',
    title: 'Practical Deep Learning for Coders',
    provider: 'fast.ai',
    url: 'https://course.fast.ai/',
    price: 0,
    rating: 4.8,
    level: 'Intermediate',
    categories: ['AI', 'Deep Learning'],
    image: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'cs231n',
    title: 'CS231n: Deep Learning for Computer Vision',
    provider: 'Stanford University',
    url: 'https://cs231n.stanford.edu/',
    price: 0,
    rating: 4.9,
    level: 'Intermediate',
    categories: ['AI', 'Computer Vision', 'Deep Learning'],
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'cs224n',
    title: 'CS224N: Natural Language Processing with Deep Learning',
    provider: 'Stanford University',
    url: 'https://web.stanford.edu/class/cs224n/',
    price: 0,
    rating: 4.9,
    level: 'Intermediate',
    categories: ['AI', 'NLP', 'Deep Learning'],
    image: 'https://images.pexels.com/photos/6424590/pexels-photo-6424590.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'mit-6s191',
    title: 'MIT 6.S191: Introduction to Deep Learning',
    provider: 'MIT',
    url: 'https://introtodeeplearning.com/',
    price: 0,
    rating: 4.7,
    level: 'Intermediate',
    categories: ['AI', 'Deep Learning'],
    image: 'https://images.pexels.com/photos/17483874/pexels-photo-17483874.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'udacity-ai-python',
    title: 'AI Programming with Python Nanodegree',
    provider: 'Udacity',
    url: 'https://www.udacity.com/course/ai-programming-python-nanodegree--nd089',
    price: 399,
    rating: 4.6,
    level: 'Beginner',
    categories: ['AI', 'Python', 'Machine Learning'],
    image: 'https://images.pexels.com/photos/5483075/pexels-photo-5483075.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'ibm-ds-cert',
    title: 'IBM Data Science Professional Certificate',
    provider: 'IBM (Coursera)',
    url: 'https://www.coursera.org/professional-certificates/ibm-data-science',
    price: 49,
    rating: 4.6,
    level: 'Beginner',
    categories: ['Data Science', 'Python', 'Machine Learning'],
    image: 'https://images.pexels.com/photos/3862142/pexels-photo-3862142.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'kaggle-intro-ml',
    title: 'Kaggle Learn: Intro to Machine Learning',
    provider: 'Kaggle',
    url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
    price: 0,
    rating: 4.7,
    level: 'Beginner',
    categories: ['AI', 'Machine Learning'],
    image: 'https://images.pexels.com/photos/6424590/pexels-photo-6424590.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'deeplearn-prompt',
    title: 'ChatGPT Prompt Engineering for Developers',
    provider: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    price: 0,
    rating: 4.7,
    level: 'Beginner',
    categories: ['AI', 'LLMs', 'Prompt Engineering'],
    image: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'deeplearn-langchain',
    title: 'LangChain for LLM Application Development',
    provider: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/',
    price: 0,
    rating: 4.6,
    level: 'Intermediate',
    categories: ['AI', 'LLMs', 'LangChain'],
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'gcp-ml-specialization',
    title: 'Machine Learning on Google Cloud (TensorFlow on GCP)',
    provider: 'Google Cloud (Coursera)',
    url: 'https://www.coursera.org/specializations/machine-learning-tensorflow-gcp',
    price: 49,
    rating: 4.6,
    level: 'Intermediate',
    categories: ['AI', 'Cloud', 'MLOps'],
    image: 'https://images.pexels.com/photos/5483075/pexels-photo-5483075.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'aws-ml-specialty',
    title: 'AWS Certified Machine Learning – Specialty (prep)',
    provider: 'AWS',
    url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/',
    price: 149,
    rating: 4.5,
    level: 'Advanced',
    categories: ['AI', 'Cloud', 'Certification'],
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'udemy-python-bootcamp',
    title: 'The Complete Python Bootcamp',
    provider: 'Udemy',
    url: 'https://www.udemy.com/course/complete-python-bootcamp/',
    price: 59,
    rating: 4.7,
    level: 'Beginner',
    categories: ['Python', 'Programming'],
    image: 'https://images.pexels.com/photos/5483075/pexels-photo-5483075.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
  {
    id: 'codecademy-python3',
    title: 'Learn Python 3',
    provider: 'Codecademy',
    url: 'https://www.codecademy.com/learn/learn-python-3',
    price: 39,
    rating: 4.5,
    level: 'Beginner',
    categories: ['Python', 'Programming'],
    image: 'https://images.pexels.com/photos/3862142/pexels-photo-3862142.jpeg?auto=compress&cs=tinysrgb&h=350&w=600',
  },
];

// ---- State ----
const state = {
  selectedCategories: new Set(),
  search: '',
  sort: 'pop', // 'pop' | 'price-asc' | 'price-desc' | 'rating-desc'
  cart: new Map(), // id -> { course, qty }
};

// Load cart from localStorage
(function loadCart() {
  try {
    const raw = localStorage.getItem('co123_cart');
    if (raw) {
      const arr = JSON.parse(raw);
      arr.forEach(([id, entry]) => state.cart.set(id, entry));
    }
  } catch (_) {}
})();

function saveCart() {
  try { localStorage.setItem('co123_cart', JSON.stringify([...state.cart])); } catch (_) {}
}

// ---- Utilities ----
function formatPrice(v) {
  if (!v || v <= 0) return 'Free';
  return `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}
function starText(r) {
  return `${r.toFixed(1)} ★`;
}

// ---- Elements ----
const els = {
  grid: document.getElementById('coursesGrid'),
  empty: document.getElementById('emptyState'),
  chips: document.getElementById('categoryChips'),
  sort: document.getElementById('sortSelect'),
  search: document.getElementById('searchInput'),
  clearSearch: document.getElementById('clearSearch'),
  resetFilters: document.getElementById('resetFiltersBtn'),
  // Cart
  cartDrawer: document.getElementById('cartDrawer'),
  cartItems: document.getElementById('cartItems'),
  cartTotal: document.getElementById('cartTotal'),
  cartCount: document.getElementById('cartCount'),
  openCartBtn: document.getElementById('openCartBtn'),
  closeCartBtn: document.getElementById('closeCartBtn'),
  checkoutBtn: document.getElementById('checkoutBtn'),
  scrim: document.getElementById('scrim'),
  // Modal
  checkoutModal: document.getElementById('checkoutModal'),
  orderSummary: document.getElementById('orderSummary'),
  checkoutForm: document.getElementById('checkoutForm'),
  placeOrderBtn: document.getElementById('placeOrderBtn'),
  nameInput: document.getElementById('nameInput'),
  emailInput: document.getElementById('emailInput'),
  // Misc
  toTop: document.getElementById('toTop'),
};
// Attach once to avoid duplicate listeners on re-render
if (els.grid) els.grid.addEventListener('click', onGridClick);

// ---- Build category chips ----
function buildChips() {
  const cats = new Set();
  COURSES.forEach(c => c.categories.forEach(cat => cats.add(cat)));
  const list = ['All', ...[...cats].sort()];
  els.chips.innerHTML = list.map(cat => `<button class="chip" role="tab" aria-selected="${cat==='All'}" data-cat="${cat}">${cat}</button>`).join('');
  // Set initial visual active state for "All"
  const allChip = els.chips.querySelector('.chip[data-cat="All"]');
  if (allChip) allChip.classList.add('active');
  els.chips.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    const cat = btn.dataset.cat;
    if (cat === 'All') {
      state.selectedCategories.clear();
      [...els.chips.querySelectorAll('.chip')].forEach(el => el.classList.toggle('active', el.dataset.cat==='All'));
      update();
      return;
    }
    // toggle category
    if (state.selectedCategories.has(cat)) state.selectedCategories.delete(cat); else state.selectedCategories.add(cat);
    // update visuals
    [...els.chips.querySelectorAll('.chip')].forEach(el => {
      if (el.dataset.cat === 'All') {
        el.classList.toggle('active', state.selectedCategories.size === 0);
      } else {
        el.classList.toggle('active', state.selectedCategories.has(el.dataset.cat));
      }
    });
    update();
  });
}

// ---- Render Courses ----
function courseCard(c) {
  const badge = c.price === 0 ? 'Free' : (c.rating >= 4.8 ? 'Top Rated' : c.level);
  return `
    <article class="card">
      <div class="card-media">
        <img src="${c.image}" alt="${c.title} course thumbnail" loading="lazy" />
        <span class="badge">${badge}</span>
      </div>
      <div class="card-body">
        <h3>${c.title}</h3>
        <div class="provider">${c.provider}</div>
        <div class="meta-row">
          <div>${starText(c.rating)} • ${c.level}</div>
          <div class="price">${formatPrice(c.price)}</div>
        </div>
      </div>
      <div class="card-actions">
        <button class="btn btn-primary" data-add="${c.id}">Add to Cart</button>
        <a class="more" href="${c.url}" target="_blank" rel="noopener noreferrer">More →</a>
      </div>
    </article>
  `;
}

function renderCourses(list) {
  els.grid.innerHTML = list.map(courseCard).join('');
}

function onGridClick(e) {
  const addBtn = e.target.closest('[data-add]');
  if (!addBtn) return;
  const id = addBtn.getAttribute('data-add');
  const course = COURSES.find(c => c.id === id);
  if (!course) return;
  const existing = state.cart.get(id);
  const qty = existing ? existing.qty + 1 : 1;
  state.cart.set(id, { course, qty });
  saveCart();
  updateCartUI();
  openCart();
}

// ---- Filter / Sort / Search ----
function getFilteredSorted() {
  let list = [...COURSES];
  // search
  const q = state.search.trim().toLowerCase();
  if (q) {
    list = list.filter(c => (
      c.title.toLowerCase().includes(q) ||
      c.provider.toLowerCase().includes(q) ||
      c.categories.some(cat => cat.toLowerCase().includes(q))
    ));
  }
  // categories
  if (state.selectedCategories.size > 0) {
    list = list.filter(c => c.categories.some(cat => state.selectedCategories.has(cat)));
  }
  // sort
  switch (state.sort) {
    case 'price-asc': list.sort((a,b) => (a.price||0) - (b.price||0)); break;
    case 'price-desc': list.sort((a,b) => (b.price||0) - (a.price||0)); break;
    case 'rating-desc': list.sort((a,b) => b.rating - a.rating); break;
    default: // pop
      list.sort((a,b) => (b.rating - a.rating) || (a.price - b.price));
  }
  return list;
}

function update() {
  const list = getFilteredSorted();
  if (list.length === 0) {
    els.grid.innerHTML = '';
    els.empty.hidden = false;
  } else {
    els.empty.hidden = true;
    renderCourses(list);
  }
}

// ---- Empty state reset ----
if (els.resetFilters) {
  els.resetFilters.addEventListener('click', () => {
    state.selectedCategories.clear();
    state.search = '';
    els.search.value = '';
    els.clearSearch.style.visibility = 'hidden';
    els.sort.value = 'pop';
    state.sort = 'pop';
    [...els.chips.querySelectorAll('.chip')].forEach(el => el.classList.toggle('active', el.dataset.cat==='All'));
    update();
  });
}

// ---- Search ----
if (els.search) {
  els.search.addEventListener('input', () => {
    state.search = els.search.value;
    els.clearSearch.style.visibility = state.search ? 'visible' : 'hidden';
    update();
  });
}
if (els.clearSearch) {
  els.clearSearch.addEventListener('click', () => {
    els.search.value = '';
    state.search = '';
    els.clearSearch.style.visibility = 'hidden';
    update();
  });
}

// ---- Sort ----
if (els.sort) {
  els.sort.addEventListener('change', () => {
    state.sort = els.sort.value;
    update();
  });
}

// ---- Cart Drawer ----
function openCart() {
  els.cartDrawer.classList.add('open');
  els.scrim.hidden = false;
  els.cartDrawer.setAttribute('aria-hidden', 'false');
}
function closeCart() {
  els.cartDrawer.classList.remove('open');
  els.scrim.hidden = true;
  els.cartDrawer.setAttribute('aria-hidden', 'true');
}
if (els.openCartBtn) els.openCartBtn.addEventListener('click', openCart);
if (els.closeCartBtn) els.closeCartBtn.addEventListener('click', closeCart);
if (els.scrim) els.scrim.addEventListener('click', closeCart);

function updateCartUI() {
  let total = 0;
  const items = [...state.cart.values()];
  els.cartItems.innerHTML = items.map(entry => {
    const { course, qty } = entry;
    const line = (course.price || 0) * qty;
    total += line;
    return `
      <div class="cart-item" data-id="${course.id}">
        <img src="${course.image}" alt="${course.title}" />
        <div>
          <h4>${course.title}</h4>
          <div class="provider">${course.provider}</div>
          <div class="price">${formatPrice(course.price)}</div>
        </div>
        <div>
          <div class="qty">
            <button data-dec>−</button>
            <span aria-live="polite">${qty}</span>
            <button data-inc>+</button>
          </div>
          <button class="icon-btn" data-remove title="Remove">✕</button>
        </div>
      </div>
    `;
  }).join('');
  els.cartTotal.textContent = `$${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  const count = items.reduce((n, e) => n + e.qty, 0);
  els.cartCount.textContent = count;
  els.checkoutBtn.disabled = count === 0;
  // quantity events
  els.cartItems.querySelectorAll('.cart-item').forEach(row => {
    const id = row.getAttribute('data-id');
    row.querySelector('[data-inc]').addEventListener('click', () => {
      const entry = state.cart.get(id); entry.qty += 1; state.cart.set(id, entry); saveCart(); updateCartUI();
    });
    row.querySelector('[data-dec]').addEventListener('click', () => {
      const entry = state.cart.get(id); entry.qty = Math.max(0, entry.qty - 1);
      if (entry.qty === 0) state.cart.delete(id); else state.cart.set(id, entry);
      saveCart(); updateCartUI();
    });
    row.querySelector('[data-remove]').addEventListener('click', () => {
      state.cart.delete(id); saveCart(); updateCartUI();
    });
  });
}

// ---- Checkout ----
if (els.checkoutBtn) {
  els.checkoutBtn.addEventListener('click', () => {
    buildOrderSummary();
    els.checkoutModal.showModal();
  });
}

function buildOrderSummary() {
  const lines = [...state.cart.values()].map(({ course, qty }) => `
    <div class="order-item">
      <div>
        <strong>${course.title}</strong>
        <div class="muted">${course.provider} • ${qty} × ${formatPrice(course.price)}</div>
      </div>
      <a class="btn" href="${course.url}" target="_blank" rel="noopener noreferrer">Provider →</a>
    </div>
  `).join('');
  els.orderSummary.innerHTML = lines || '<div class="muted">Your cart is empty.</div>';
}

if (els.checkoutForm) {
  els.checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = els.nameInput.value.trim();
    const email = els.emailInput.value.trim();
    if (!name || !email) return; // browser will also enforce required
    const orderId = Math.random().toString(36).slice(2, 8).toUpperCase();
    // Simulate success
    els.checkoutModal.close();
    alert(`Thank you, ${name}! Your demo order #${orderId} is noted. Open each Provider link in the summary to enroll.`);
    // Clear cart
    state.cart.clear(); saveCart(); updateCartUI();
  });
}

// ---- Back to top ----
function onScroll() {
  if (window.scrollY > 400) els.toTop.classList.add('show'); else els.toTop.classList.remove('show');
}
window.addEventListener('scroll', onScroll, { passive: true });
if (els.toTop) els.toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---- Reveal on scroll ----
const io = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    if (ent.isIntersecting) {
      ent.target.classList.add('visible');
      io.unobserve(ent.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---- Smooth anchor scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ---- Init ----
buildChips();
update();
updateCartUI();
// set initial search clear visibility
if (els.clearSearch) els.clearSearch.style.visibility = 'hidden';
