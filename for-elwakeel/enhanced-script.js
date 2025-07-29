// Enhanced Real Estate Dashboard with Interactive Map and Search

class EnhancedRealEstateDashboard {
    constructor() {
        this.map = null;
        this.markers = [];
        this.charts = {};
        this.currentSection = 'dashboard';
        this.searchIndex = this.buildSearchIndex();
        this.init();
    }

    init() {
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            this.initNavigation();
            this.initSearch();
            this.initMap();
            this.loadDashboard();
            this.initCharts();
            this.animateStats();
            this.animateProgressBars();
            this.initEventListeners();
        }, 2000);
    }

    showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) overlay.classList.remove('hidden');
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) overlay.classList.add('hidden');
    }

    // Navigation System
    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.navigateToSection(section);
            });
        });

        // Handle view all buttons
        document.querySelectorAll('[data-section]').forEach(btn => {
            if (!btn.classList.contains('nav-link')) {
                btn.addEventListener('click', (e) => {
                    const section = btn.dataset.section;
                    this.navigateToSection(section);
                });
            }
        });
    }

    navigateToSection(sectionName) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;
            
            // Load section-specific content
            this.loadSectionContent(sectionName);
        }

        this.showNotification(`Navigated to ${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}`, 'success');
    }

    loadSectionContent(section) {
        switch(section) {
            case 'properties':
                this.loadPropertiesSection();
                break;
            case 'analytics':
                this.loadAnalyticsSection();
                break;
            case 'clients':
                this.loadClientsSection();
                break;
            case 'calendar':
                this.loadCalendarSection();
                break;
        }
    }

    // Search System
    initSearch() {
        const searchInput = document.getElementById('globalSearch');
        const searchResults = document.getElementById('searchResults');

        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length >= 2) {
                const results = this.performSearch(query);
                this.displaySearchResults(results);
            } else {
                searchResults.classList.remove('show');
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.classList.remove('show');
            }
        });
    }

    buildSearchIndex() {
        const index = [];
        
        // Index properties
        mockData.properties.forEach(property => {
            index.push({
                type: 'property',
                id: property.id,
                title: property.title,
                details: `${property.location} • ${property.price}`,
                searchText: `${property.title} ${property.location} ${property.type} ${property.price}`.toLowerCase()
            });
        });

        // Index clients
        mockData.clients.forEach(client => {
            index.push({
                type: 'client',
                id: client.id,
                title: client.name,
                details: `${client.status} • ${client.budget}`,
                searchText: `${client.name} ${client.email} ${client.status}`.toLowerCase()
            });
        });

        // Index locations
        mockData.locations.forEach(location => {
            index.push({
                type: 'location',
                id: location.name,
                title: location.name,
                details: `${location.properties} properties • Avg: ${location.avgPrice}`,
                searchText: `${location.name}`.toLowerCase()
            });
        });

        return index;
    }

    performSearch(query) {
        const queryLower = query.toLowerCase();
        return this.searchIndex
            .filter(item => item.searchText.includes(queryLower))
            .slice(0, 8); // Limit results
    }

    displaySearchResults(results) {
        const searchResults = document.getElementById('searchResults');
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
            searchResults.innerHTML = results.map(result => `
                <div class="search-result-item" data-type="${result.type}" data-id="${result.id}">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-type">${result.type}</div>
                    <div class="search-result-details">${result.details}</div>
                </div>
            `).join('');

            // Add click handlers
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.handleSearchResultClick(item.dataset.type, item.dataset.id);
                    searchResults.classList.remove('show');
                    document.getElementById('globalSearch').value = '';
                });
            });
        }
        
        searchResults.classList.add('show');
    }

    handleSearchResultClick(type, id) {
        switch(type) {
            case 'property':
                this.showPropertyDetails(id);
                break;
            case 'client':
                this.navigateToSection('clients');
                // Highlight specific client
                break;
            case 'location':
                this.focusMapOnLocation(id);
                break;
        }
    }

    // Interactive Map System
    initMap() {
        const mapContainer = document.getElementById('propertyMap');
        if (!mapContainer) return;

        // Initialize Leaflet map centered on New Hampshire coast
        this.map = L.map('propertyMap').setView([43.0642, -70.7829], 11);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Add property markers
        this.addPropertyMarkers();

        // Initialize map controls
        this.initMapControls();
    }

    addPropertyMarkers() {
        mockData.properties.forEach(property => {
            // Generate coordinates around NH coast
            const coords = this.generateCoordinates(property.location);
            
            const markerColor = this.getMarkerColor(property.status);
            
            const marker = L.circleMarker(coords, {
                radius: 8,
                fillColor: markerColor,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(this.map);

            // Create popup content
            const popupContent = `
                <div class="custom-popup">
                    <h4>${property.title}</h4>
                    <p><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                    <p class="price">${property.price}</p>
                    <p>${property.bedrooms} bed • ${property.bathrooms} bath • ${property.sqft} sqft</p>
                    <button onclick="dashboard.showPropertyDetails(${property.id})" class="property-action-btn primary">
                        View Details
                    </button>
                </div>
            `;

            marker.bindPopup(popupContent);
            this.markers.push({ marker, property });
        });
    }

    generateCoordinates(location) {
        const baseCoords = {
            'Portsmouth, NH': [43.0717, -70.7626],
            'Hampton Beach, NH': [42.9097, -70.8119],
            'Rye, NH': [43.0148, -70.7648],
            'New Castle, NH': [43.0626, -70.7176],
            'Seabrook, NH': [42.8942, -70.8717]
        };

        const base = baseCoords[location] || [43.0642, -70.7829];
        // Add small random offset for clustering
        return [
            base[0] + (Math.random() - 0.5) * 0.02,
            base[1] + (Math.random() - 0.5) * 0.02
        ];
    }

    getMarkerColor(status) {
        const colors = {
            'For Sale': '#10b981',
            'Under Contract': '#f59e0b',
            'Sold': '#ef4444'
        };
        return colors[status] || '#6b7280';
    }

    initMapControls() {
        const toggleHeatmap = document.getElementById('toggleHeatmap');
        const toggleClusters = document.getElementById('toggleClusters');
        const fullscreenMap = document.getElementById('fullscreenMap');

        if (toggleHeatmap) {
            toggleHeatmap.addEventListener('click', () => {
                this.toggleHeatmap();
                toggleHeatmap.classList.toggle('active');
            });
        }

        if (toggleClusters) {
            toggleClusters.addEventListener('click', () => {
                this.toggleClusters();
                toggleClusters.classList.toggle('active');
            });
        }

        if (fullscreenMap) {
            fullscreenMap.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }
    }

    toggleHeatmap() {
        // Simulate heatmap toggle
        this.showNotification('Heatmap view toggled', 'info');
    }

    toggleClusters() {
        // Simulate cluster toggle
        this.showNotification('Marker clustering toggled', 'info');
    }

    toggleFullscreen() {
        const mapCard = document.querySelector('.map-card');
        mapCard.classList.toggle('fullscreen');
        
        setTimeout(() => {
            this.map.invalidateSize();
        }, 300);
    }

    focusMapOnLocation(locationName) {
        const coords = {
            'Portsmouth': [43.0717, -70.7626],
            'Hampton Beach': [42.9097, -70.8119],
            'Rye': [43.0148, -70.7648]
        };

        const coord = coords[locationName];
        if (coord && this.map) {
            this.map.setView(coord, 13);
            this.showNotification(`Focused on ${locationName}`, 'success');
        }
    }

    // Content Loading Methods
    loadDashboard() {
        this.loadProperties();
        this.loadAppointments();
        this.loadActivity();
    }

    loadProperties() {
        const container = document.getElementById('propertiesList');
        if (!container) return;

        const recentProperties = mockData.properties.slice(0, 4);
        
        container.innerHTML = recentProperties.map(property => `
            <div class="property-item" data-property-id="${property.id}">
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}" loading="lazy">
                </div>
                <div class="property-details">
                    <div class="property-title">${property.title}</div>
                    <div class="property-location">
                        <i class="fas fa-map-marker-alt"></i> ${property.location}
                    </div>
                    <div class="property-price">${property.price}</div>
                </div>
                <div class="property-status ${property.status.toLowerCase().replace(' ', '-')}">
                    ${property.status}
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.property-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const propertyId = e.currentTarget.dataset.propertyId;
                this.showPropertyDetails(propertyId);
            });
        });
    }

    loadPropertiesSection() {
        const container = document.getElementById('propertiesGrid');
        if (!container) return;

        container.innerHTML = mockData.properties.map(property => `
            <div class="property-card" data-property-id="${property.id}">
                <div class="property-card-image">
                    <img src="${property.image}" alt="${property.title}" loading="lazy">
                    <div class="property-status-badge ${property.status.toLowerCase().replace(' ', '-')}">
                        ${property.status}
                    </div>
                </div>
                <div class="property-card-content">
                    <h4 class="property-card-title">${property.title}</h4>
                    <div class="property-card-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${property.location}
                    </div>
                    <div class="property-card-price">${property.price}</div>
                    <div class="property-card-details">
                        <div class="property-detail">
                            <div class="property-detail-value">${property.bedrooms}</div>
                            <div class="property-detail-label">Beds</div>
                        </div>
                        <div class="property-detail">
                            <div class="property-detail-value">${property.bathrooms}</div>
                            <div class="property-detail-label">Baths</div>
                        </div>
                        <div class="property-detail">
                            <div class="property-detail-value">${property.sqft}</div>
                            <div class="property-detail-label">Sqft</div>
                        </div>
                    </div>
                    <div class="property-card-actions">
                        <button class="property-action-btn primary" onclick="dashboard.showPropertyDetails(${property.id})">
                            View Details
                        </button>
                        <button class="property-action-btn secondary" onclick="dashboard.scheduleShowing(${property.id})">
                            Schedule
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.initPropertyFilters();
    }

    loadClientsSection() {
        const container = document.getElementById('clientsGrid');
        if (!container) return;

        container.innerHTML = mockData.clients.map(client => `
            <div class="client-card" data-client-id="${client.id}">
                <div class="client-header">
                    <div class="client-avatar">
                        <img src="${client.avatar}" alt="${client.name}">
                    </div>
                    <div class="client-info">
                        <h4>${client.name}</h4>
                        <div class="client-status ${client.status.toLowerCase().replace(' ', '-')}">${client.status}</div>
                    </div>
                </div>
                <div class="client-details">
                    <div class="client-detail">
                        <i class="fas fa-envelope"></i>
                        ${client.email}
                    </div>
                    <div class="client-detail">
                        <i class="fas fa-phone"></i>
                        ${client.phone}
                    </div>
                    <div class="client-detail">
                        <i class="fas fa-dollar-sign"></i>
                        ${client.budget}
                    </div>
                    <div class="client-detail">
                        <i class="fas fa-heart"></i>
                        ${client.preferences}
                    </div>
                    <div class="client-detail">
                        <i class="fas fa-calendar"></i>
                        Last contact: ${client.lastContact}
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadAnalyticsSection() {
        setTimeout(() => {
            this.initAnalyticsCharts();
        }, 100);
    }

    loadCalendarSection() {
        this.loadAppointments();
    }

    loadAppointments() {
        const container = document.getElementById('appointmentsList');
        if (!container) return;

        container.innerHTML = mockData.appointments.map(appointment => `
            <div class="appointment-item" data-appointment-id="${appointment.id}">
                <div class="appointment-time">
                    <div>${appointment.time.split(' ')[0]}</div>
                    <div>${appointment.time.split(' ')[1]}</div>
                </div>
                <div class="appointment-details">
                    <div class="appointment-title">${appointment.title}</div>
                    <div class="appointment-client">
                        <i class="fas fa-user"></i> ${appointment.client}
                    </div>
                    <div class="appointment-property">
                        <i class="fas fa-home"></i> ${appointment.property}
                    </div>
                </div>
                <div class="appointment-type ${appointment.type}">
                    <i class="fas fa-${this.getAppointmentIcon(appointment.type)}"></i>
                </div>
            </div>
        `).join('');
    }

    loadActivity() {
        const container = document.getElementById('activityFeed');
        if (!container) return;

        const recentActivities = mockData.activities.slice(0, 5);
        
        container.innerHTML = recentActivities.map(activity => `
            <div class="activity-item" data-activity-id="${activity.id}">
                <div class="activity-icon ${activity.type}">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-text">${activity.text}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `).join('');
    }

    // Charts and Analytics
    initCharts() {
        const ctx = document.getElementById('marketChart');
        if (!ctx) return;

        this.charts.market = new Chart(ctx, {
            type: 'line',
            data: mockData.marketData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: { grid: { color: 'rgba(0, 0, 0, 0.05)' } }
                },
                animation: { duration: 2000, easing: 'easeInOutQuart' }
            }
        });
    }

    initAnalyticsCharts() {
        // Sales Chart
        const salesCtx = document.getElementById('salesChart');
        if (salesCtx) {
            this.charts.sales = new Chart(salesCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Sales Volume ($M)',
                        data: [2.1, 2.8, 3.2, 2.9, 3.5, 4.1],
                        backgroundColor: 'rgba(30, 64, 175, 0.8)',
                        borderColor: '#1e40af',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // Property Types Chart
        const typeCtx = document.getElementById('typeChart');
        if (typeCtx) {
            this.charts.types = new Chart(typeCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Villa', 'Cottage', 'House', 'Condo'],
                    datasets: [{
                        data: [25, 30, 35, 10],
                        backgroundColor: [
                            '#1e40af',
                            '#3b82f6',
                            '#60a5fa',
                            '#93c5fd'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }

    // Property Filters
    initPropertyFilters() {
        const statusFilter = document.getElementById('statusFilter');
        const typeFilter = document.getElementById('typeFilter');

        [statusFilter, typeFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', () => {
                    this.applyPropertyFilters();
                });
            }
        });
    }

    applyPropertyFilters() {
        const statusFilter = document.getElementById('statusFilter')?.value || '';
        const typeFilter = document.getElementById('typeFilter')?.value || '';

        let filteredProperties = mockData.properties;

        if (statusFilter) {
            filteredProperties = filteredProperties.filter(p => 
                p.status.toLowerCase().replace(' ', '-') === statusFilter
            );
        }

        if (typeFilter) {
            filteredProperties = filteredProperties.filter(p => 
                p.type.toLowerCase() === typeFilter
            );
        }

        // Re-render properties grid with filtered results
        const container = document.getElementById('propertiesGrid');
        if (container) {
            // Update grid with filtered properties
            this.showNotification(`Filtered ${filteredProperties.length} properties`, 'info');
        }
    }

    // Event Handlers
    initEventListeners() {
        // Profile dropdown
        const profileDropdown = document.querySelector('.nav-profile');
        const dropdown = document.getElementById('profileDropdown');
        
        if (profileDropdown && dropdown) {
            profileDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            });

            document.addEventListener('click', () => {
                dropdown.classList.remove('show');
            });
        }

        // Action buttons
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.closest('[data-action]').dataset.action;
                this.handleAction(action);
            });
        });

        // Modal close
        const modal = document.getElementById('propertyModal');
        const closeModal = document.getElementById('closeModal');
        
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        }
    }

    handleAction(action) {
        const actions = {
            'add-property': () => this.showNotification('Opening add property form...', 'info'),
            'schedule-showing': () => this.showNotification('Opening schedule form...', 'info'),
            'new-client': () => this.showNotification('Opening new client form...', 'info'),
            'generate-report': () => this.showNotification('Generating report...', 'info')
        };

        if (actions[action]) {
            actions[action]();
        }
    }

    // Property Details Modal
    showPropertyDetails(propertyId) {
        const property = mockData.properties.find(p => p.id == propertyId);
        if (!property) return;

        const modal = document.getElementById('propertyModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = property.title;
        modalBody.innerHTML = `
            <div class="property-detail-modal">
                <img src="${property.image}" alt="${property.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 1.5rem;">
                <div class="property-detail-grid">
                    <div class="detail-section">
                        <h4>Property Information</h4>
                        <p><strong>Location:</strong> ${property.location}</p>
                        <p><strong>Price:</strong> ${property.price}</p>
                        <p><strong>Type:</strong> ${property.type}</p>
                        <p><strong>Status:</strong> ${property.status}</p>
                        <p><strong>Days on Market:</strong> ${property.daysOnMarket}</p>
                    </div>
                    <div class="detail-section">
                        <h4>Property Details</h4>
                        <p><strong>Bedrooms:</strong> ${property.bedrooms}</p>
                        <p><strong>Bathrooms:</strong> ${property.bathrooms}</p>
                        <p><strong>Square Feet:</strong> ${property.sqft}</p>
                    </div>
                </div>
                <div class="detail-section">
                    <h4>Description</h4>
                    <p>${property.description}</p>
                </div>
                <div class="modal-actions" style="margin-top: 2rem; display: flex; gap: 1rem;">
                    <button class="action-btn primary" onclick="dashboard.scheduleShowing(${property.id})">
                        <i class="fas fa-calendar"></i> Schedule Showing
                    </button>
                    <button class="action-btn secondary" onclick="dashboard.contactAboutProperty(${property.id})">
                        <i class="fas fa-envelope"></i> Contact Agent
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('show');
    }

    scheduleShowing(propertyId) {
        this.showNotification('Scheduling showing...', 'info');
        document.getElementById('propertyModal').classList.remove('show');
    }

    contactAboutProperty(propertyId) {
        this.showNotification('Opening contact form...', 'info');
        document.getElementById('propertyModal').classList.remove('show');
    }

    // Utility Methods
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.dataset.target);
            const isDecimal = target % 1 !== 0;
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
            }, 30);
        });
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        setTimeout(() => {
            progressBars.forEach(bar => {
                const progress = bar.dataset.progress;
                bar.style.width = `${progress}%`;
            });
        }, 1000);
    }

    getAppointmentIcon(type) {
        const icons = {
            showing: 'eye',
            consultation: 'comments',
            inspection: 'search',
            closing: 'handshake',
            analysis: 'chart-line'
        };
        return icons[type] || 'calendar';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            info: 'info-circle',
            success: 'check-circle',
            warning: 'exclamation-triangle',
            error: 'times-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            info: '#3b82f6',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444'
        };
        return colors[type] || '#3b82f6';
    }
}

// Initialize dashboard when DOM is loaded
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new EnhancedRealEstateDashboard();
});

// Export for global access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedRealEstateDashboard;
}
