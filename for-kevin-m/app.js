// Crypto Wizard Front-End Logic
// Basic tab switching, search & platform filter, and dummy feed rendering.
// Future integration: replace dummyFeed with live API calls per platform.

const tabs = document.querySelectorAll('.tab');
const benefitsSections = {
  pull: document.getElementById('benefits-pull'),
  push: document.getElementById('benefits-push'),
  tools: document.getElementById('benefits-tools'),
  directories: document.getElementById('benefits-directories'),
};
const feed = document.getElementById('feed');
const platformButtons = document.querySelectorAll('.platform-btn');
const searchInput = document.getElementById('searchInput');

// Dummy feed data (tweet-like cards)
const dummyFeed = [
  {
    id: 1,
    platform: 'x',
    username: 'Simon Fairhurst',
    handle: '@simonfairhurst',
    avatar: '',
    content:
      'Figma, Webflow, or Framer. Which one will take the lead in 2023 and be the go-to for digital design?',
    meta: '1.1M · 1,240 · 5,579 · 3,987',
  },
  {
    id: 2,
    platform: 'reddit',
    username: 'CryptoGuru',
    handle: 'u/cryptoguru',
    avatar: '',
    content: 'Narrative trading is the new alpha… here’s why cross-platform monitoring matters.',
    meta: '14.2k upvotes · 612 comments',
  },
  {
    id: 3,
    platform: 'youtube',
    username: 'BlockChainDaily',
    handle: 'youtube.com/BlockChainDaily',
    avatar: '',
    content: 'Top 5 narratives set to explode in the next bull run (Web3, AI, RWAs, MEME, DePIN).',
    meta: '112k views · 2 days ago',
  },
];

let activePlatform = null;

/** Renders feed based on activePlatform & searchKeyword */
function renderFeed() {
  const keyword = searchInput.value.toLowerCase();
  feed.innerHTML = '';
  dummyFeed
    .filter((item) => {
      const matchesPlatform = activePlatform ? item.platform === activePlatform : true;
      const matchesKeyword = keyword ? item.content.toLowerCase().includes(keyword) : true;
      return matchesPlatform && matchesKeyword;
    })
    .forEach((item) => {
      feed.appendChild(createCard(item));
    });
}

/** Creates a card element */
function createCard({ username, handle, content, meta }) {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <div class="card-header">
      <div class="avatar"></div>
      <div>
        <div class="username">${username}</div>
        <div class="handle">${handle}</div>
      </div>
    </div>
    <div class="content">${content}</div>
    <div class="meta">${meta}</div>
  `;
  return card;
}

// Tab switching
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // Highlight nav
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    // Show relevant benefit list
    Object.keys(benefitsSections).forEach((key) => {
      benefitsSections[key].style.display = key === tab.dataset.tab ? 'block' : 'none';
    });
  });
});

// Platform filter buttons
platformButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const platform = btn.dataset.platform;
    if (activePlatform === platform) {
      // toggle off
      activePlatform = null;
      btn.classList.remove('active');
    } else {
      activePlatform = platform;
      platformButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    }
    renderFeed();
  });
});

// Search input listener
searchInput.addEventListener('input', renderFeed);

// Initialize UI
Object.keys(benefitsSections).forEach((key) => {
  benefitsSections[key].style.display = key === 'pull' ? 'block' : 'none';
});
renderFeed();
