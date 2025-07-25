// Global variables
let championsData = [];
let currentRegion = 'na1';
let performanceChart = null;

// API Configuration
const API_CONFIG = {
    // Using Data Dragon for static data (no API key required)
    dataDragon: 'https://ddragon.leagueoflegends.com',
    // Community Dragon for additional data
    communityDragon: 'https://raw.communitydragon.org',
    // For demo purposes, we'll use mock data for some features that require API keys
    mockData: true
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Initialize navigation
        setupNavigation();
        
        // Load initial data
        await loadLatestVersion();
        await loadChampionsData();
        await loadFreeRotation();
        
        // Setup event listeners
        setupEventListeners();
        
        // Initialize charts
        initializeChart();
        
        // Load mock statistics
        loadMockStatistics();
        loadMockEsportsData();
        loadMockLeaderboard();
        
        console.log('Legendary Windsurfing Webpage League initialized successfully!');
    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Failed to initialize application. Please refresh the page.');
    }
}

// Navigation functionality
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 32, 39, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 32, 39, 0.95)';
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Region selector
    const regionSelect = document.getElementById('regionSelect');
    regionSelect.addEventListener('change', (e) => {
        currentRegion = e.target.value;
        loadRegionSpecificData();
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// API Data Loading Functions
async function loadLatestVersion() {
    try {
        const response = await fetch(`${API_CONFIG.dataDragon}/api/versions.json`);
        const versions = await response.json();
        const latestVersion = versions[0];
        
        document.getElementById('patchVersion').textContent = `Patch ${latestVersion}`;
        document.getElementById('patchNotes').textContent = `Latest game version with balance updates and new content.`;
        
        return latestVersion;
    } catch (error) {
        console.error('Error loading version:', error);
        document.getElementById('patchVersion').textContent = 'Patch 14.1';
        document.getElementById('patchNotes').textContent = 'Unable to fetch latest patch information.';
    }
}

async function loadChampionsData() {
    try {
        const version = await loadLatestVersion();
        const response = await fetch(`${API_CONFIG.dataDragon}/cdn/${version}/data/en_US/champion.json`);
        const data = await response.json();
        
        championsData = Object.values(data.data).map(champion => ({
            ...champion,
            imageUrl: `${API_CONFIG.dataDragon}/cdn/${version}/img/champion/${champion.image.full}`,
            isRotation: false // Will be updated when rotation data loads
        }));
        
        displayChampions(championsData);
        
    } catch (error) {
        console.error('Error loading champions:', error);
        showError('Failed to load champions data.');
    }
}

async function loadFreeRotation() {
    // Since we can't access the actual rotation API without a key, we'll simulate it
    if (API_CONFIG.mockData) {
        const mockRotationIds = [1, 12, 23, 34, 45, 56, 67, 78, 89, 90, 101, 112, 123, 134];
        championsData.forEach((champion, index) => {
            if (mockRotationIds.includes(parseInt(champion.key))) {
                champion.isRotation = true;
            }
        });
        
        // Update the display
        displayChampions(championsData);
    }
}

function displayChampions(champions) {
    const grid = document.getElementById('championsGrid');
    
    if (champions.length === 0) {
        grid.innerHTML = '<div class="no-results">No champions found.</div>';
        return;
    }
    
    grid.innerHTML = champions.map(champion => `
        <div class="champion-card fade-in" data-champion="${champion.id}" data-tags="${champion.tags.join(' ').toLowerCase()}">
            <img src="${champion.imageUrl}" alt="${champion.name}" class="champion-image" loading="lazy">
            <div class="champion-info">
                <div class="champion-name">${champion.name}</div>
                <div class="champion-title">${champion.title}</div>
                <div class="champion-tags">
                    ${champion.tags.map(tag => `<span class="champion-tag">${tag}</span>`).join('')}
                    ${champion.isRotation ? '<span class="champion-tag" style="background: #00F5FF;">Free</span>' : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    // Add hover effects and click handlers
    document.querySelectorAll('.champion-card').forEach(card => {
        card.addEventListener('click', () => {
            const championId = card.dataset.champion;
            showChampionDetails(championId);
        });
    });
}

function showChampionDetails(championId) {
    const champion = championsData.find(c => c.id === championId);
    if (champion) {
        alert(`${champion.name} - ${champion.title}\n\nDifficulty: ${champion.info.difficulty}/10\nAttack: ${champion.info.attack}/10\nDefense: ${champion.info.defense}/10\nMagic: ${champion.info.magic}/10\n\n${champion.blurb}`);
    }
}

// Event Listeners
function setupEventListeners() {
    // Champion search
    const searchInput = document.getElementById('championSearch');
    searchInput.addEventListener('input', (e) => {
        filterChampions(e.target.value);
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Filter champions
            const filter = e.target.dataset.filter;
            filterChampionsByRole(filter);
        });
    });
    
    // Rank tabs
    document.querySelectorAll('.rank-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.rank-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            const tier = e.target.dataset.tier;
            loadLeaderboardByTier(tier);
        });
    });
}

function filterChampions(searchTerm) {
    const filteredChampions = championsData.filter(champion =>
        champion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        champion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        champion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    displayChampions(filteredChampions);
}

function filterChampionsByRole(role) {
    let filteredChampions;
    
    switch (role) {
        case 'all':
            filteredChampions = championsData;
            break;
        case 'rotation':
            filteredChampions = championsData.filter(c => c.isRotation);
            break;
        case 'assassin':
            filteredChampions = championsData.filter(c => c.tags.includes('Assassin'));
            break;
        case 'fighter':
            filteredChampions = championsData.filter(c => c.tags.includes('Fighter'));
            break;
        case 'mage':
            filteredChampions = championsData.filter(c => c.tags.includes('Mage'));
            break;
        case 'marksman':
            filteredChampions = championsData.filter(c => c.tags.includes('Marksman'));
            break;
        case 'support':
            filteredChampions = championsData.filter(c => c.tags.includes('Support'));
            break;
        case 'tank':
            filteredChampions = championsData.filter(c => c.tags.includes('Tank'));
            break;
        default:
            filteredChampions = championsData;
    }
    
    displayChampions(filteredChampions);
}

// Mock Data Functions (since we don't have API keys)
function loadMockStatistics() {
    // Mock top win rates
    const topWinRates = [
        { name: 'Aurelion Sol', winRate: 54.2, pickRate: 2.1 },
        { name: 'Singed', winRate: 53.8, pickRate: 1.8 },
        { name: 'Heimerdinger', winRate: 53.5, pickRate: 2.3 },
        { name: 'Zilean', winRate: 53.2, pickRate: 1.5 },
        { name: 'Malzahar', winRate: 52.9, pickRate: 3.2 }
    ];
    
    document.getElementById('topWinRates').innerHTML = topWinRates.map(champ => `
        <div class="stat-item">
            <div class="stat-name">${champ.name}</div>
            <div class="stat-value">${champ.winRate}% WR</div>
            <div class="stat-secondary">${champ.pickRate}% PR</div>
        </div>
    `).join('');
    
    // Mock most popular
    const mostPopular = [
        { name: 'Jinx', pickRate: 18.5, banRate: 12.3 },
        { name: 'Yasuo', pickRate: 16.2, banRate: 25.1 },
        { name: 'Lee Sin', pickRate: 15.8, banRate: 8.7 },
        { name: 'Thresh', pickRate: 14.9, banRate: 15.2 },
        { name: 'Ezreal', pickRate: 14.1, banRate: 6.8 }
    ];
    
    document.getElementById('mostPopular').innerHTML = mostPopular.map(champ => `
        <div class="stat-item">
            <div class="stat-name">${champ.name}</div>
            <div class="stat-value">${champ.pickRate}% PR</div>
            <div class="stat-secondary">${champ.banRate}% BR</div>
        </div>
    `).join('');
    
    // Mock most banned
    const mostBanned = [
        { name: 'Kassadin', banRate: 45.2, pickRate: 8.1 },
        { name: 'Yasuo', banRate: 25.1, pickRate: 16.2 },
        { name: 'Zed', banRate: 22.8, pickRate: 12.5 },
        { name: 'Master Yi', banRate: 21.5, pickRate: 9.8 },
        { name: 'Darius', banRate: 19.7, pickRate: 11.2 }
    ];
    
    document.getElementById('mostBanned').innerHTML = mostBanned.map(champ => `
        <div class="stat-item">
            <div class="stat-name">${champ.name}</div>
            <div class="stat-value">${champ.banRate}% BR</div>
            <div class="stat-secondary">${champ.pickRate}% PR</div>
        </div>
    `).join('');
}

function loadMockEsportsData() {
    // Mock tournament data
    const tournaments = [
        { name: 'LCS Spring Split', date: '2024-01-15', status: 'Ongoing' },
        { name: 'LEC Winter Season', date: '2024-01-10', status: 'Ongoing' },
        { name: 'LCK Spring', date: '2024-01-08', status: 'Ongoing' },
        { name: 'MSI 2024', date: '2024-05-01', status: 'Upcoming' }
    ];
    
    document.getElementById('tournamentsList').innerHTML = tournaments.map(tournament => `
        <div class="tournament-item">
            <div class="tournament-name">${tournament.name}</div>
            <div class="tournament-date">${tournament.date}</div>
            <div class="tournament-status status-${tournament.status.toLowerCase()}">${tournament.status}</div>
        </div>
    `).join('');
    
    // Mock recent matches
    const matches = [
        { team1: 'Team Liquid', team2: 'Cloud9', score: '2-1', date: '2024-01-20' },
        { team1: 'G2 Esports', team2: 'Fnatic', score: '2-0', date: '2024-01-19' },
        { team1: 'T1', team2: 'Gen.G', score: '2-1', date: '2024-01-18' },
        { team1: 'FlyQuest', team2: '100 Thieves', score: '1-2', date: '2024-01-17' }
    ];
    
    document.getElementById('matchesList').innerHTML = matches.map(match => `
        <div class="match-item">
            <div class="match-teams">${match.team1} vs ${match.team2}</div>
            <div class="match-score">${match.score}</div>
            <div class="match-date">${match.date}</div>
        </div>
    `).join('');
}

function loadMockLeaderboard() {
    loadLeaderboardByTier('challenger');
}

function loadLeaderboardByTier(tier) {
    // Mock leaderboard data
    const leaderboards = {
        challenger: [
            { rank: 1, name: 'Faker', lp: 1247, winRate: 68.2 },
            { rank: 2, name: 'Canyon', lp: 1198, winRate: 71.5 },
            { rank: 3, name: 'Showmaker', lp: 1156, winRate: 65.8 },
            { rank: 4, name: 'Chovy', lp: 1134, winRate: 69.1 },
            { rank: 5, name: 'Ruler', lp: 1089, winRate: 66.7 }
        ],
        grandmaster: [
            { rank: 1, name: 'ProPlayer1', lp: 987, winRate: 64.3 },
            { rank: 2, name: 'ProPlayer2', lp: 945, winRate: 62.1 },
            { rank: 3, name: 'ProPlayer3', lp: 923, winRate: 65.9 },
            { rank: 4, name: 'ProPlayer4', lp: 901, winRate: 61.8 },
            { rank: 5, name: 'ProPlayer5', lp: 878, winRate: 63.4 }
        ],
        master: [
            { rank: 1, name: 'SkillfulPlayer1', lp: 456, winRate: 59.2 },
            { rank: 2, name: 'SkillfulPlayer2', lp: 434, winRate: 61.1 },
            { rank: 3, name: 'SkillfulPlayer3', lp: 412, winRate: 58.7 },
            { rank: 4, name: 'SkillfulPlayer4', lp: 398, winRate: 60.3 },
            { rank: 5, name: 'SkillfulPlayer5', lp: 376, winRate: 57.9 }
        ]
    };
    
    const players = leaderboards[tier] || [];
    
    document.getElementById('leaderboardTable').innerHTML = `
        <div class="leaderboard-header-row">
            <div class="rank-col">Rank</div>
            <div class="name-col">Summoner</div>
            <div class="lp-col">LP</div>
            <div class="wr-col">Win Rate</div>
        </div>
        ${players.map(player => `
            <div class="leaderboard-row">
                <div class="rank-col">#${player.rank}</div>
                <div class="name-col">${player.name}</div>
                <div class="lp-col">${player.lp} LP</div>
                <div class="wr-col">${player.winRate}%</div>
            </div>
        `).join('')}
    `;
}

// Chart initialization
function initializeChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jinx', 'Yasuo', 'Lee Sin', 'Thresh', 'Ezreal', 'Lux', 'Garen', 'Darius'],
            datasets: [{
                label: 'Win Rate (%)',
                data: [52.3, 49.8, 51.2, 53.1, 50.7, 52.8, 54.2, 51.9],
                backgroundColor: 'rgba(200, 155, 60, 0.8)',
                borderColor: 'rgba(200, 155, 60, 1)',
                borderWidth: 2
            }, {
                label: 'Pick Rate (%)',
                data: [18.5, 16.2, 15.8, 14.9, 14.1, 13.2, 12.8, 11.9],
                backgroundColor: 'rgba(0, 245, 255, 0.8)',
                borderColor: 'rgba(0, 245, 255, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#F0E6D2'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#F0E6D2'
                    },
                    grid: {
                        color: 'rgba(240, 230, 210, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#F0E6D2'
                    },
                    grid: {
                        color: 'rgba(240, 230, 210, 0.1)'
                    }
                }
            }
        }
    });
}

// Region-specific data loading
async function loadRegionSpecificData() {
    console.log(`Loading data for region: ${currentRegion}`);
    // In a real implementation, this would fetch region-specific leaderboard and stats
    // For now, we'll just reload the mock data
    loadMockLeaderboard();
}

// Utility functions
function showError(message) {
    console.error(message);
    // You could implement a toast notification system here
}

// Add CSS for the new elements
const additionalCSS = `
.stat-item, .tournament-item, .match-item {
    padding: 1rem;
    margin-bottom: 0.5rem;
    background: rgba(30, 35, 40, 0.5);
    border-radius: 8px;
    border-left: 3px solid var(--primary-gold);
}

.stat-name, .tournament-name, .match-teams {
    font-weight: 600;
    color: var(--text-light);
    margin-bottom: 0.25rem;
}

.stat-value {
    color: var(--primary-gold);
    font-weight: 700;
    font-size: 1.1rem;
}

.stat-secondary, .tournament-date, .match-date {
    color: var(--text-gold);
    font-size: 0.9rem;
}

.tournament-status {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    margin-top: 0.25rem;
    display: inline-block;
}

.status-ongoing {
    background: var(--success-green);
    color: var(--dark-blue);
}

.status-upcoming {
    background: var(--primary-gold);
    color: var(--dark-blue);
}

.match-score {
    color: var(--primary-gold);
    font-weight: 600;
    font-size: 1.1rem;
}

.leaderboard-header-row, .leaderboard-row {
    display: grid;
    grid-template-columns: 80px 1fr 100px 100px;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid var(--border-gold);
}

.leaderboard-header-row {
    background: var(--darker-blue);
    font-weight: 600;
    color: var(--primary-gold);
}

.leaderboard-row:hover {
    background: rgba(200, 155, 60, 0.1);
}

.no-results {
    text-align: center;
    color: var(--text-gold);
    padding: 3rem;
    font-size: 1.2rem;
}
`;

// Add the additional CSS to the page
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

console.log('Legendary Windsurfing Webpage League script loaded!');
