// Particle animation background
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 5 + 2}px;
        height: ${Math.random() * 5 + 2}px;
        background: ${Math.random() > 0.5 ? '#0066cc' : '#ff6b35'};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
    `;
    document.body.appendChild(particle);
    
    const duration = Math.random() * 3000 + 2000;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 200 + 100;
    
    particle.animate([
        { transform: 'translate(0, 0) scale(0)', opacity: 0 },
        { transform: 'translate(0, 0) scale(1)', opacity: 1, offset: 0.1 },
        { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'ease-out'
    }).onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 300);

// Mouse trail effect
const trail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.7) {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail';
        dot.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(0, 102, 204, 0.6), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${e.clientX - 5}px;
            top: ${e.clientY - 5}px;
        `;
        document.body.appendChild(dot);
        
        dot.animate([
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(0)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => dot.remove();
    }
});

// Smooth scrolling for anchor links with extra flair
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Create explosion effect
            for (let i = 0; i < 20; i++) {
                createParticle();
            }
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated counter for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate stats if they're in view
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

// Add animation classes to cards on scroll
document.querySelectorAll('.service-card, .feature-card, .area-tag').forEach(element => {
    observer.observe(element);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Add entrance animations
const style = document.createElement('style');
style.textContent = `
    .service-card,
    .feature-card,
    .area-tag {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.animate-in,
    .feature-card.animate-in,
    .area-tag.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .service-card {
        transition-delay: 0.1s;
    }
    
    .service-card:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .service-card:nth-child(3) {
        transition-delay: 0.3s;
    }
    
    .feature-card {
        transition-delay: 0.1s;
    }
    
    .feature-card:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .feature-card:nth-child(3) {
        transition-delay: 0.3s;
    }
`;
document.head.appendChild(style);

// Preload images for better performance
const imagesToPreload = [
    'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1600&h=900&fit=crop',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop'
];

imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Ripple effect on click
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: fixed;
        border: 3px solid ${Math.random() > 0.5 ? '#0066cc' : '#ff6b35'};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 0;
        height: 0;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(ripple);
    
    ripple.animate([
        { width: '0', height: '0', opacity: 1 },
        { width: '100px', height: '100px', opacity: 0 }
    ], {
        duration: 800,
        easing: 'ease-out'
    }).onfinish = () => ripple.remove();
});

// Parallax effect on hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// 3D tilt effect on cards
document.querySelectorAll('.service-card, .feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Shake effect on stats when visible
document.querySelectorAll('.stat-number').forEach(stat => {
    stat.addEventListener('mouseenter', () => {
        stat.style.animation = 'shake 0.5s ease-in-out, pulse 1.5s ease-in-out infinite';
    });
});

// Add explosion effect to buttons
document.querySelectorAll('.btn, .contact-btn, .phone-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = Math.random() * 100 + 50;
            
            particle.style.cssText = `
                position: fixed;
                width: 5px;
                height: 5px;
                background: ${btn.classList.contains('btn-primary') ? '#ff6b35' : '#0066cc'};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            document.body.appendChild(particle);
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { 
                    transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    });
});

// Floating animation for area tags on hover
document.querySelectorAll('.area-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    
    tag.addEventListener('mouseenter', () => {
        tag.style.animation = 'float 0.6s ease-in-out, wiggle 0.5s ease-in-out';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.animation = '';
        setTimeout(() => {
            tag.style.animation = `fadeInScale 0.6s ease-out both`;
            tag.style.animationDelay = `${index * 0.1}s`;
        }, 10);
    });
});

// Add active state to phone buttons on mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.phone-btn, .contact-btn').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Animated gradient background for hero
const heroOverlay = document.querySelector('.hero-overlay');
if (heroOverlay) {
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        heroOverlay.style.background = `radial-gradient(circle at ${50 + Math.sin(hue * 0.02) * 30}% ${50 + Math.cos(hue * 0.02) * 30}%, 
            rgba(255, 107, 53, ${0.1 + Math.sin(hue * 0.05) * 0.05}) 0%, transparent 60%)`;
    }, 50);
}

// Random animation trigger for service icons
setInterval(() => {
    const icons = document.querySelectorAll('.service-icon, .feature-icon');
    if (icons.length > 0) {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        randomIcon.style.animation = 'rotate 0.6s ease-in-out, pulse 0.5s ease-in-out';
        setTimeout(() => {
            randomIcon.style.animation = '';
        }, 600);
    }
}, 3000);

// Text glitch effect on hover
document.querySelectorAll('h1, h2, h3').forEach(heading => {
    heading.addEventListener('mouseenter', () => {
        const originalText = heading.textContent;
        let glitchCount = 0;
        const glitchInterval = setInterval(() => {
            if (glitchCount < 3) {
                heading.textContent = originalText.split('').map(char => 
                    Math.random() > 0.7 ? String.fromCharCode(65 + Math.random() * 26) : char
                ).join('');
                glitchCount++;
            } else {
                heading.textContent = originalText;
                clearInterval(glitchInterval);
            }
        }, 50);
    });
});

// Confetti effect on logo click
document.querySelector('.logo h1')?.addEventListener('click', () => {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: hsl(${Math.random() * 360}, 70%, 60%);
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 10001;
                left: 50%;
                top: 10%;
                transform: translate(-50%, -50%);
            `;
            document.body.appendChild(confetti);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 300 + 200;
            const rotations = Math.random() * 720 - 360;
            
            confetti.animate([
                { 
                    transform: 'translate(-50%, -50%) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translate(calc(-50% + ${Math.cos(angle) * velocity}px), calc(-50% + ${Math.sin(angle) * velocity + 500}px)) rotate(${rotations}deg)`,
                    opacity: 0
                }
            ], {
                duration: 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => confetti.remove();
        }, i * 10);
    }
});

// Screen shake on emergency CTA section view
const emergencyCTA = document.querySelector('.emergency-cta');
if (emergencyCTA) {
    const emergencyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.body.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 500);
                emergencyObserver.unobserve(emergencyCTA);
            }
        });
    }, { threshold: 0.5 });
    emergencyObserver.observe(emergencyCTA);
}

// Stagger animation for contact buttons
document.querySelectorAll('.contact-btn').forEach((btn, index) => {
    btn.style.animationDelay = `${index * 0.2}s`;
});

// Dynamic color shift on service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        const colors = ['#0066cc', '#ff6b35', '#00cc66', '#cc00ff', '#ffcc00'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        card.style.borderColor = randomColor;
        card.style.boxShadow = `0 20px 60px ${randomColor}33`;
    });
});

// Scroll-triggered rainbow effect
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    document.body.style.filter = 'hue-rotate(0deg)';
    
    scrollTimeout = setTimeout(() => {
        document.body.style.transition = 'filter 2s ease';
        document.body.style.filter = 'hue-rotate(0deg)';
    }, 100);
});

// Easter egg: Konami code activates rainbow mode
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateRainbowMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateRainbowMode() {
    document.body.style.animation = 'shake 0.5s ease-in-out';
    
    // Create massive confetti explosion
    for (let i = 0; i < 500; i++) {
        setTimeout(() => createParticle(), i * 5);
    }
    
    // Rainbow all headings
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
        heading.style.animation = 'rainbowText 2s linear infinite';
    });
    
    alert('🎉 RAINBOW MODE ACTIVATED! 🌈✨');
    
    // Reset after 10 seconds
    setTimeout(() => {
        document.querySelectorAll('h1, h2, h3').forEach(heading => {
            heading.style.animation = '';
        });
    }, 10000);
}

// Random sparkle effect
setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 10002;
        font-size: ${Math.random() * 20 + 10}px;
    `;
    document.body.appendChild(sparkle);
    
    sparkle.animate([
        { opacity: 0, transform: 'scale(0) rotate(0deg)' },
        { opacity: 1, transform: 'scale(1) rotate(180deg)', offset: 0.5 },
        { opacity: 0, transform: 'scale(0) rotate(360deg)' }
    ], {
        duration: 2000,
        easing: 'ease-out'
    }).onfinish = () => sparkle.remove();
}, 2000);

// Console message for developers
console.log('%cRunHVAC Website', 'color: #0066cc; font-size: 24px; font-weight: bold;');
console.log('%cImproved & Redesigned', 'color: #ff6b35; font-size: 16px;');
console.log('%cCRAZY ANIMATED VERSION! 🎉✨💥🌈', 'color: #ff6b35; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%cContact: (224) 444-9786', 'color: #666; font-size: 14px;');
console.log('%cEaster Egg: Try the Konami code! ⬆⬆⬇⬇⬅➡⬅➡BA', 'color: #00cc66; font-size: 12px; font-style: italic;');
