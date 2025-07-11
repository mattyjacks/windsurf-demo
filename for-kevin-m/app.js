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
    content: 'Narrative trading is the new alpha... here\'s why cross-platform monitoring matters.',
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

/********************** Tab Display Logic **********************/
// Show/hide sections based on active tab
function updateTabDisplay(activeTab) {
  const cryptoPrices = document.getElementById('crypto-prices');
  const cryptoDirectories = document.getElementById('crypto-directories');
  const pushNarrativesForm = document.getElementById('push-narratives-form');
  const toolsSection = document.getElementById('tools-section');
  const feed = document.getElementById('feed');
  
  // Hide all sections by default
  cryptoPrices.style.display = 'none';
  cryptoDirectories.style.display = 'none';
  pushNarrativesForm.style.display = 'none';
  toolsSection.style.display = 'none';
  feed.style.display = 'grid';
  
  // Show relevant section based on active tab
  if (activeTab === 'tools') {
    toolsSection.style.display = 'block';
    cryptoPrices.style.display = 'block';
    feed.style.display = 'none';
  } else if (activeTab === 'directories') {
    cryptoDirectories.style.display = 'block';
    feed.style.display = 'none';
  } else if (activeTab === 'push') {
    pushNarrativesForm.style.display = 'block';
    feed.style.display = 'none';
  }
}

// Update tab click handler to show/hide sections
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // Highlight nav
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    // Show relevant benefit list
    Object.keys(benefitsSections).forEach((key) => {
      benefitsSections[key].style.display = key === tab.dataset.tab ? 'block' : 'none';
    });
    
    // Update display based on active tab
    updateTabDisplay(tab.dataset.tab);
  });
});

/********************** Crypto Price Checker **********************/
const coins = [
  { id: 'bitcoin', symbol: 'BTC' },
  { id: 'ethereum', symbol: 'ETH' },
  { id: 'litecoin', symbol: 'LTC' },
  { id: 'binancecoin', symbol: 'BNB' },
  { id: 'solana', symbol: 'SOL' },
  { id: 'ripple', symbol: 'XRP' },
  { id: 'cardano', symbol: 'ADA' },
  { id: 'dogecoin', symbol: 'DOGE' },
  { id: 'avalanche-2', symbol: 'AVAX' },
  { id: 'polkadot', symbol: 'DOT' },
  { id: 'chainlink', symbol: 'LINK' },
  { id: 'matic-network', symbol: 'MATIC' },
  { id: 'shiba-inu', symbol: 'SHIB' },
];

async function fetchPrices() {
  try {
    const idsParam = coins.map(c => c.id).join(',');
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${idsParam}&vs_currencies=usd`);
    const data = await res.json();
    updatePriceTable(data);
  } catch (err) {
    console.error('Price fetch error:', err);
  }
}

function updatePriceTable(priceData) {
  const tbody = document.querySelector('#priceTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  coins.forEach(({ id, symbol }) => {
    const tr = document.createElement('tr');
    const price = priceData[id]?.usd ? `$${priceData[id].usd.toLocaleString()}` : '—';
    tr.innerHTML = `<td>${symbol}</td><td>${price}</td>`;
    tbody.appendChild(tr);
  });
}

// Initial fetch and refresh every minute
fetchPrices();
setInterval(fetchPrices, 60000);
/******************** End Price Checker ***************************/

/********************** Crypto Directories Table **********************/
// Directory data
const directoryData = [
  {
    name: 'CoinMarketCap',
    description: 'Leading cryptocurrency data platform with price, volume, and market cap rankings',
    category: 'Market Data',
    url: 'https://coinmarketcap.com/'
  },
  {
    name: 'CoinGecko',
    description: 'Comprehensive cryptocurrency data platform with market analysis and insights',
    category: 'Market Data',
    url: 'https://www.coingecko.com/'
  },
  {
    name: 'CryptoCompare',
    description: 'Real-time cryptocurrency data, portfolio tracking, and market analysis',
    category: 'Market Data',
    url: 'https://www.cryptocompare.com/'
  },
  {
    name: 'DeFiLlama',
    description: 'DeFi TVL rankings, analytics, and yield farming opportunities',
    category: 'DeFi Analytics',
    url: 'https://defillama.com/'
  },
  {
    name: 'Messari',
    description: 'Crypto market intelligence, data, and research platform',
    category: 'Research',
    url: 'https://messari.io/'
  },
  {
    name: 'CryptoSlate',
    description: 'Cryptocurrency news, data, and information hub',
    category: 'News & Data',
    url: 'https://cryptoslate.com/'
  },
  {
    name: 'Dune Analytics',
    description: 'Community-driven crypto analytics platform with customizable dashboards',
    category: 'Analytics',
    url: 'https://dune.com/'
  },
  {
    name: 'Glassnode',
    description: 'On-chain market intelligence and analytics platform',
    category: 'Analytics',
    url: 'https://glassnode.com/'
  },
  {
    name: 'CoinDesk',
    description: 'Cryptocurrency news, insights, and data journalism',
    category: 'News',
    url: 'https://www.coindesk.com/'
  },
  {
    name: 'Etherscan',
    description: 'Ethereum blockchain explorer and analytics platform',
    category: 'Explorer',
    url: 'https://etherscan.io/'
  },
  {
    name: 'BscScan',
    description: 'Binance Smart Chain explorer and analytics platform',
    category: 'Explorer',
    url: 'https://bscscan.com/'
  },
  {
    name: 'CryptoLinks',
    description: 'Curated directory of verified cryptocurrency websites and resources',
    category: 'Directory',
    url: 'https://cryptolinks.com/'
  },
  {
    name: 'CryptoDirectories',
    description: 'Comprehensive listing platform for crypto websites and resources',
    category: 'Directory',
    url: 'https://cryptodirectories.com/'
  },
  {
    name: 'DappRadar',
    description: 'Decentralized application tracking and analytics platform',
    category: 'Dapps',
    url: 'https://dappradar.com/'
  },
  {
    name: 'DeBank',
    description: 'DeFi portfolio tracker and analytics dashboard',
    category: 'DeFi Analytics',
    url: 'https://debank.com/'
  },
  {
    name: 'Token Terminal',
    description: 'Financial metrics for crypto protocols and applications',
    category: 'Analytics',
    url: 'https://tokenterminal.com/'
  },
  {
    name: 'CoinAPI',
    description: 'Cryptocurrency market data API for developers',
    category: 'API',
    url: 'https://www.coinapi.io/'
  },
  {
    name: 'CryptoFees',
    description: 'Tracking fees generated by various crypto networks',
    category: 'Analytics',
    url: 'https://cryptofees.info/'
  },
  {
    name: 'L2BEAT',
    description: 'Analytics and research platform for Ethereum Layer 2 solutions',
    category: 'Layer 2',
    url: 'https://l2beat.com/'
  },
  {
    name: 'DeepDAO',
    description: 'Analytics and rankings for decentralized autonomous organizations',
    category: 'DAO',
    url: 'https://deepdao.io/'
  },
  {
    name: 'NFTGo',
    description: 'NFT analytics, portfolio tracking, and market insights',
    category: 'NFT',
    url: 'https://nftgo.io/'
  },
  {
    name: 'CryptoQuant',
    description: 'On-chain data analytics and market insights platform',
    category: 'Analytics',
    url: 'https://cryptoquant.com/'
  },
  {
    name: 'Nansen',
    description: 'Blockchain analytics platform for Ethereum and EVM chains',
    category: 'Analytics',
    url: 'https://www.nansen.ai/'
  },
  {
    name: 'CoinTracker',
    description: 'Cryptocurrency portfolio tracking and tax reporting platform',
    category: 'Portfolio',
    url: 'https://www.cointracker.io/'
  },
  {
    name: 'TradingView',
    description: 'Advanced charting and trading platform for cryptocurrencies',
    category: 'Trading',
    url: 'https://www.tradingview.com/'
  },
  {
    name: 'CoinStats',
    description: 'Cryptocurrency portfolio tracker and manager',
    category: 'Portfolio',
    url: 'https://coinstats.app/'
  },
  {
    name: 'CryptoTaxCalculator',
    description: 'Tax reporting and portfolio tracking for crypto investors',
    category: 'Tax',
    url: 'https://cryptotaxcalculator.io/'
  },
  {
    name: 'Santiment',
    description: 'Crypto market insights and behavior analytics platform',
    category: 'Analytics',
    url: 'https://santiment.net/'
  },
  {
    name: 'CoinCodex',
    description: 'Cryptocurrency prices, charts, and market insights',
    category: 'Market Data',
    url: 'https://coincodex.com/'
  },
  {
    name: 'BitInfoCharts',
    description: 'Cryptocurrency statistics and information charts',
    category: 'Analytics',
    url: 'https://bitinfocharts.com/'
  }
];

// Populate directory table
function populateDirectoryTable(filterText = '') {
  const tbody = document.querySelector('#directoryTable tbody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  const filteredData = filterText ? 
    directoryData.filter(item => {
      const searchText = filterText.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText) ||
        item.category.toLowerCase().includes(searchText)
      );
    }) : 
    directoryData;
  
  filteredData.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.description}</td>
      <td>${item.category}</td>
      <td><a href="${item.url}" target="_blank">${item.url}</a></td>
    `;
    tbody.appendChild(tr);
  });
}

// Directory search functionality
const directorySearchInput = document.getElementById('directorySearchInput');
if (directorySearchInput) {
  directorySearchInput.addEventListener('input', () => {
    populateDirectoryTable(directorySearchInput.value);
  });
}

// Initialize directory table
populateDirectoryTable();

// Initialize UI with Pull Narratives tab active
updateTabDisplay('pull');
/******************** End Directories Table **************************/

/********************** Push Narratives Form Handling **********************/
const narrativeForm = document.getElementById('narrativeForm');
const saveDraftBtn = document.querySelector('.btn-save');

if (narrativeForm) {
  narrativeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const title = document.getElementById('narrativeTitle').value;
    const content = document.getElementById('narrativeContent').value;
    const scheduledTime = document.getElementById('scheduledTime').value;
    
    // Get selected platforms
    const selectedPlatforms = [];
    document.querySelectorAll('.platform-checkbox input[type="checkbox"]:checked').forEach(checkbox => {
      selectedPlatforms.push(checkbox.value);
    });
    
    // For demo purposes, just show an alert with the submitted data
    alert(`Narrative "${title}" scheduled for publishing on ${selectedPlatforms.length} platform(s)!\n\nThis is a placeholder. In a real application, this would push your narrative to the selected platforms.`);
    
    // Reset form
    narrativeForm.reset();
  });
}

if (saveDraftBtn) {
  saveDraftBtn.addEventListener('click', function() {
    const title = document.getElementById('narrativeTitle').value;
    
    if (title) {
      alert(`Draft saved: "${title}"\n\nThis is a placeholder. In a real application, this would save your narrative as a draft.`);
    } else {
      alert('Please enter at least a title to save as draft.');
    }
  });
}
/******************** End Push Narratives Form Handling **************************/

/********************** Tools Section Handling **********************/
const toolButtons = document.querySelectorAll('.tool-btn');

if (toolButtons.length > 0) {
  toolButtons.forEach(button => {
    button.addEventListener('click', function() {
      const toolName = this.parentElement.querySelector('h3').textContent;
      alert(`${toolName} will be available in the full version!\n\nThis is a placeholder. In a real application, this would launch the ${toolName} tool.`);
    });
  });
}
/******************** End Tools Section Handling **************************/
