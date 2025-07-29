// Main JavaScript file for the real estate dashboard

class RealEstateDashboard {
    constructor() {
        this.chart = null;
        this.init();
    }

    init() {
        // Show loading overlay initially
        this.showLoading();
        
        // Initialize dashboard after a short delay to show loading animation
        setTimeout(() => {
            this.hideLoading();
            this.loadProperties();
            this.loadAppointments();
            this.loadActivity();
            this.initChart();
            this.animateStats();
            this.animateProgressBars();
            this.initEventListeners();
        }, 2000);
    }

    showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('hidden');
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    loadProperties() {
        const container = document.getElementById('propertiesList');
        if (!container) return;

        // Get recent properties (first 4)
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

        // Add click handlers
        container.querySelectorAll('.property-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const propertyId = e.currentTarget.dataset.propertyId;
                this.showPropertyDetails(propertyId);
            });
        });
    }

    loadAppointments() {
        const container = document.getElementById('appointmentsList');
        if (!container) return;

        // Get today's appointments (first 4)
        const todayAppointments = mockData.appointments.slice(0, 4);
        
        container.innerHTML = todayAppointments.map(appointment => `
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

        // Get recent activities (first 5)
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

    initChart() {
        const ctx = document.getElementById('marketChart');
        if (!ctx) return;

        this.chart = new Chart(ctx, {
            type: 'line',
            data: mockData.marketData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: 'Inter',
                                size: 12
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 11
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 11
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 4,
                        hoverRadius: 6
                    },
                    line: {
                        borderWidth: 3
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

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

    initEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(e.target);
            });
        });

        // Action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleActionClick(e.target);
            });
        });

        // View all properties button
        const viewAllBtn = document.querySelector('.view-all-btn');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                this.showAllProperties();
            });
        }

        // Profile dropdown
        const profileDropdown = document.querySelector('.nav-profile');
        if (profileDropdown) {
            profileDropdown.addEventListener('click', () => {
                this.toggleProfileMenu();
            });
        }

        // Map markers
        document.querySelectorAll('.map-marker').forEach(marker => {
            marker.addEventListener('click', (e) => {
                this.showLocationDetails(e.currentTarget);
            });
        });

        // Window resize handler for chart
        window.addEventListener('resize', () => {
            if (this.chart) {
                this.chart.resize();
            }
        });
    }

    handleNavigation(target) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        target.classList.add('active');
        
        // Show notification
        this.showNotification(`Navigating to ${target.textContent}...`, 'info');
    }

    handleActionClick(target) {
        const button = target.closest('.action-btn');
        const action = button.querySelector('i').classList[1]; // Get the icon class
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Handle different actions
        switch(action) {
            case 'fa-plus':
                this.showAddPropertyModal();
                break;
            case 'fa-calendar-plus':
                this.showScheduleModal();
                break;
            case 'fa-user-plus':
                this.showNewClientModal();
                break;
            case 'fa-chart-line':
                this.generateReport();
                break;
        }
    }

    showPropertyDetails(propertyId) {
        const property = mockData.properties.find(p => p.id == propertyId);
        if (!property) return;
        
        this.showNotification(`Viewing details for ${property.title}`, 'success');
        
        // In a real app, this would open a detailed property modal
        console.log('Property details:', property);
    }

    showAllProperties() {
        this.showNotification('Loading all properties...', 'info');
        // In a real app, this would navigate to the properties page
    }

    showAddPropertyModal() {
        this.showNotification('Opening add property form...', 'info');
        // In a real app, this would open a modal form
    }

    showScheduleModal() {
        this.showNotification('Opening schedule appointment form...', 'info');
        // In a real app, this would open a calendar modal
    }

    showNewClientModal() {
        this.showNotification('Opening new client form...', 'info');
        // In a real app, this would open a client form modal
    }

    generateReport() {
        this.showNotification('Generating market report...', 'info');
        // In a real app, this would generate and download a report
    }

    toggleProfileMenu() {
        this.showNotification('Profile menu clicked', 'info');
        // In a real app, this would show a dropdown menu
    }

    showLocationDetails(marker) {
        const tooltip = marker.querySelector('.marker-tooltip');
        this.showNotification(`Viewing ${tooltip.textContent}`, 'info');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
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
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
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
}

// Utility functions for enhanced interactivity
function addHoverEffects() {
    // Add subtle hover effects to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function addScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

function addParallaxEffect() {
    // Subtle parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImg = document.querySelector('.hero-background img');
        if (heroImg) {
            heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new RealEstateDashboard();
    
    // Add enhanced effects after initial load
    setTimeout(() => {
        addHoverEffects();
        addScrollAnimations();
        addParallaxEffect();
    }, 2500);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh data when page becomes visible
        console.log('Page is now visible - refreshing data...');
    }
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealEstateDashboard;
}
