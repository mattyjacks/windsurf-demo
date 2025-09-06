// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    }, 2000);
});

// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Trailer Modal
const trailerBtn = document.querySelector('.watch-trailer');
const modal = document.getElementById('trailerModal');
const closeModal = document.querySelector('.close-modal');

trailerBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Audio Toggle (simulated)
let audioPlaying = false;
const audioToggle = document.getElementById('audioToggle');
const audioIcon = document.querySelector('.audio-icon');

audioToggle.addEventListener('click', () => {
    audioPlaying = !audioPlaying;
    audioIcon.textContent = audioPlaying ? '🔇' : '🎵';
    // In a real implementation, you would control actual audio here
    if (audioPlaying) {
        console.log('Medieval music would start playing...');
    } else {
        console.log('Music paused');
    }
});

// Animated Counter for Production Stats
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.textContent === '0') {
            animateCounter(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Character Cards Data
const characters = [
    {
        name: 'Lyra Shadowmend',
        title: 'The Scholar of Twilight',
        bio: 'A brilliant young scribe whose curiosity unleashes an ancient prophecy. Marked by both light and shadow, she alone can read the Twilight Codex.',
        weapon: 'Quill of Truth',
        power: 'Memory Magic',
        burden: 'Visions of possible futures',
        class: ''
    },
    {
        name: 'Sir Aldric Ironheart',
        title: 'The Fallen Knight',
        bio: 'Once the greatest champion of the Dawnguard, now seeking redemption for a terrible mistake. His sword still burns with holy fire, though his heart is shadowed by guilt.',
        weapon: 'Dawnbreaker Blade',
        power: 'Light Manipulation',
        burden: 'Cannot lie or break an oath',
        class: ''
    },
    {
        name: 'Thorne Whisperwind',
        title: 'Ranger of the Old Ways',
        bio: 'A mysterious ranger who speaks with forest spirits and walks between worlds. His arrows never miss, but he carries the weight of an ancient pact.',
        weapon: 'Bow of Seasons',
        power: "Nature's Voice",
        burden: "Bound to the forest's will",
        class: ''
    },
    {
        name: 'Morgana the Veiled',
        title: 'Sorceress of Shadows',
        bio: 'A powerful sorceress whose face is hidden behind enchanted veils. She commands shadow magic but pays a terrible price for each spell cast.',
        weapon: 'Staff of Echoes',
        power: 'Shadow Weaving',
        burden: 'Each spell ages her',
        class: ''
    },
    {
        name: 'The Shadow Lord',
        title: 'Herald of Eternal Night',
        bio: 'An ancient being who seeks to extinguish the Dying Daylight and plunge all realms into eternal darkness. His true name is forbidden to speak.',
        weapon: 'Void Blade',
        power: 'Reality Corruption',
        burden: 'Cannot exist in pure light',
        class: 'villain'
    },
    {
        name: 'Queen Seraphina',
        title: 'The Last Light Bearer',
        bio: 'The enigmatic ruler of Valdoria who harbors a divine secret. Her crown contains a fragment of the first dawn.',
        weapon: 'Scepter of Stars',
        power: 'Divine Authority',
        burden: 'Immortal but fading',
        class: ''
    }
];

// Populate Character Cards
const charactersGrid = document.querySelector('.characters-grid');
if (charactersGrid) {
    characters.forEach(char => {
        const card = document.createElement('div');
        card.className = `character-card ${char.class}`;
        card.innerHTML = `
            <div class="character-portrait">
                <div class="stained-glass-effect"></div>
                <div class="character-image"></div>
            </div>
            <div class="character-info">
                <h3 class="character-name">${char.name}</h3>
                <p class="character-title">${char.title}</p>
                <div class="character-details">
                    <p class="character-bio">${char.bio}</p>
                    <div class="character-stats">
                        <span class="stat">Weapon: ${char.weapon}</span>
                        <span class="stat">Power: ${char.power}</span>
                        <span class="stat">Burden: ${char.burden}</span>
                    </div>
                </div>
            </div>
        `;
        charactersGrid.appendChild(card);
    });
}

// Map Locations Data
const mapLocations = [
    {
        id: 'valdoria',
        name: 'Kingdom of Valdoria',
        description: 'The shining capital where our tale begins. Home to the Crystal Palace and the Great Library of Ages.'
    },
    {
        id: 'whispering-woods',
        name: 'The Whispering Woods',
        description: 'Ancient forest where trees speak in riddles and time flows differently. Home to the Elderwood Druids.'
    },
    {
        id: 'shadowpeak',
        name: 'Shadowpeak Mountains',
        description: 'Treacherous peaks where reality grows thin. The Twilight Citadel stands at its highest point.'
    },
    {
        id: 'fallen-sea',
        name: 'Sea of Fallen Stars',
        description: 'A mystical ocean where starlight has crystallized into islands. Ships sail upside-down at midnight.'
    },
    {
        id: 'void-wastes',
        name: 'The Void Wastes',
        description: 'Desolate lands where the Shadow Lord\'s influence is strongest. Nothing grows, nothing dies.'
    }
];

// Populate Map Locations
const interactiveMap = document.querySelector('.interactive-map');
if (interactiveMap) {
    mapLocations.forEach(location => {
        const marker = document.createElement('div');
        marker.className = 'map-location';
        marker.setAttribute('data-location', location.id);
        marker.innerHTML = `
            <div class="location-marker"></div>
            <div class="location-info">
                <h3>${location.name}</h3>
                <p>${location.description}</p>
            </div>
        `;
        interactiveMap.appendChild(marker);
    });
}

// Gallery Items Data
const galleryItems = [
    { title: 'Concept Art', description: 'Original designs for the Twilight Citadel' },
    { title: 'Costume Design', description: 'Handcrafted armor for the Dawnguard' },
    { title: 'Location Scouting', description: 'Finding the perfect Whispering Woods' },
    { title: 'Combat Training', description: 'Cast learning medieval swordplay' },
    { title: 'Practical Effects', description: 'Creating magic without CGI' },
    { title: 'Set Construction', description: 'Building the throne room' }
];

// Populate Gallery
const galleryContainer = document.querySelector('.gallery-container');
if (galleryContainer) {
    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <div class="gallery-image"></div>
            <div class="gallery-caption">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `;
        galleryContainer.appendChild(galleryItem);
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('.email-input').value;
        if (email) {
            alert(`Thank you for joining the realm! We'll send updates to ${email}`);
            e.target.querySelector('.email-input').value = '';
        }
    });
}

// Ticket Purchase Buttons
document.querySelectorAll('.tier-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tierCard = this.closest('.tier-card');
        const tierName = tierCard.querySelector('.tier-name').textContent;
        const tierPrice = tierCard.querySelector('.tier-price').textContent;
        alert(`Prepare to claim your ${tierName} status for ${tierPrice}! Ticket purchase system coming soon.`);
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg, .particle-field');
    
    parallaxElements.forEach(element => {
        const speed = element.classList.contains('particle-field') ? 0.5 : 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add floating animation to random elements
const addFloatingAnimation = () => {
    const elements = document.querySelectorAll('.tier-crown, .torch, .candle');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
};

addFloatingAnimation();

// Intersection Observer for fade-in animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 1s ease, transform 1s ease';
    fadeObserver.observe(section);
});

// Create ambient particles
const createParticles = () => {
    const particleContainer = document.querySelector('.particle-field');
    if (!particleContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(212, 175, 55, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        particleContainer.appendChild(particle);
    }
};

createParticles();

// Inspiration Slider: Smooth auto-scroll + draggable with inertia
(() => {
    const slider = document.querySelector('.inspiration-slider');
    if (!slider) return;

    const track = slider.querySelector('.slider-track');
    const loops = slider.querySelectorAll('.slider-loop');

    // Use all images from the inspirations folder
    const inspirationImages = [
        'dying daylight inspiration still 1.jpg',
        'dying daylight inspiration still 2.jpg',
        'dying daylight inspiration still 3.jpg',
        'dying daylight inspiration still 4.jpg',
        'dying daylight inspiration still 5.jpg',
        'dying daylight inspiration still 6.jpg',
        'dying daylight inspiration still 7.jpg',
        'dying daylight inspiration still 8.jpg',
        'dying daylight inspiration still 9.jpg',
        'dying daylight inspiration still 10.jpg',
        'dying daylight inspiration still 11.jpg',
        'dying daylight inspiration still 12.jpg',
        'dying daylight inspiration still 13.jpg',
        'dying daylight inspiration still 14.jpg',
        'dying daylight inspiration still 15.jpg',
        'dying daylight inspiration still 16.jpg',
        'dying daylight inspiration still 17.jpg',
        'dying daylight inspiration still 18.jpg',
        'dying daylight inspiration still 19.jpg',
        'dying daylight inspiration still 20.jpg',
        'dying daylight inspiration still 21.jpg',
        'dying daylight inspiration still 22.jpg'
    ].map(name => `images/inspiration stills/${name}`);

    const buildLoop = (loopEl) => {
        inspirationImages.forEach((src, idx) => {
            const item = document.createElement('div');
            item.className = 'slider-item';
            const img = document.createElement('img');
            img.alt = `Inspiration still ${idx + 1}`;
            img.draggable = false;
            img.src = encodeURI(src);
            item.appendChild(img);
            loopEl.appendChild(item);
        });
    };

    loops.forEach(loop => buildLoop(loop));

    let posX = 0;
    let lastX = 0;
    let dragging = false;
    let velocity = 0; // px per frame
    let lastMoveTime = 0;
    let baseAuto = 0.7; // base auto drift speed (px/frame)
    const friction = 0.94; // inertia friction per frame
    let loopWidth = 0;

    const updateAutoSpeed = () => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        baseAuto = isMobile ? 0.35 : 0.7; // slower drift on mobile
    };
    updateAutoSpeed();

    const measure = () => {
        // Width of a single loop plus the gap between loops (track has gap set via CSS)
        const loopRect = loops[0].getBoundingClientRect();
        const gap = parseFloat(getComputedStyle(track).gap || '0');
        loopWidth = loopRect.width + gap;
    };

    const clampMod = (value, mod) => {
        if (mod === 0) return value;
        // Keep value within (-mod, 0]
        while (value <= -mod) value += mod;
        while (value > 0) value -= mod;
        return value;
    };

    const apply = () => {
        if (loopWidth === 0) measure();
        posX = clampMod(posX, loopWidth);
        track.style.transform = `translate3d(${posX}px, 0, 0)`;
    };

    const onPointerDown = (e) => {
        dragging = true;
        lastX = e.clientX;
        lastMoveTime = performance.now();
        slider.classList.add('grabbing');
        slider.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (!dragging) return;
        const now = performance.now();
        const dx = e.clientX - lastX;
        const dt = Math.max(1, now - lastMoveTime);
        posX += dx;
        velocity = dx / (dt / 16); // approx px per frame
        lastX = e.clientX;
        lastMoveTime = now;
        apply();
    };

    const endDrag = () => {
        dragging = false;
        slider.classList.remove('grabbing');
        // velocity preserved for inertia
    };

    slider.addEventListener('pointerdown', onPointerDown);
    slider.addEventListener('pointermove', onPointerMove);
    slider.addEventListener('pointerup', endDrag);
    slider.addEventListener('pointercancel', endDrag);
    slider.addEventListener('mouseleave', () => { if (dragging) endDrag(); });

    window.addEventListener('resize', () => {
        updateAutoSpeed();
        const prevLoop = loopWidth;
        measure();
        if (prevLoop > 0 && loopWidth > 0) {
            // Keep visual position consistent after resize
            posX = (posX / prevLoop) * loopWidth;
        }
        apply();
    });

    // Auto animation loop
    const tick = () => {
        const speed = baseAuto; // passive drift to the left
        if (!dragging) {
            // Inertia in the direction of the last drag
            posX += velocity;
            velocity *= friction;
            if (Math.abs(velocity) < 0.01) velocity = 0;
            // Constant drift to the left
            posX -= speed;
        }
        apply();
        requestAnimationFrame(tick);
    };

    // Initial measure and start
    measure();
    apply();
    requestAnimationFrame(tick);
})();

// Scroll-reactive Coins (hero main title and banquet title)
(() => {
    const coins = document.querySelectorAll('.coin');
    if (!coins.length) return;

    // Per-coin wandering state
    const state = new WeakMap();
    const rand = (min, max) => Math.random() * (max - min) + min;

    coins.forEach(coin => {
        state.set(coin, {
            seedX: rand(0.5, 1.5),
            seedY: rand(0.4, 1.2),
            ampX: coin.dataset.wander ? rand(18, 42) : 0,
            ampY: coin.dataset.wander ? rand(10, 28) : 0
        });
    });

    const applyTransforms = (timeMs) => {
        const t = (timeMs || performance.now()) / 1000; // seconds
        const y = window.scrollY || window.pageYOffset;
        const vh = window.innerHeight || 800;
        coins.forEach(coin => {
            const rect = coin.getBoundingClientRect();
            const mid = rect.top + rect.height / 2;
            const norm = Math.max(-1, Math.min(1, (mid - vh / 2) / (vh / 2))); // -1..1
            const speed = parseFloat(coin.dataset.speed || '0.3');
            const dir = parseFloat(coin.dataset.dir || '1');
            const tilt = parseFloat(coin.dataset.tilt || '1');
            const s = state.get(coin) || { seedX: 1, seedY: 1, ampX: 0, ampY: 0 };

            // Wander offsets (if enabled)
            const wanderX = s.ampX * Math.sin(t * 0.7 * s.seedX + Math.cos(t * 0.31));
            const wanderY = s.ampY * Math.cos(t * 0.9 * s.seedY + Math.sin(t * 0.21));

            // Parallax translate with stronger follow and wander
            const translateY = (y * speed * dir) + wanderY;
            const translateX = wanderX;
            const rotZ = norm * 10 * dir + Math.sin(t * 0.6) * (coin.dataset.wander ? 2 : 1);
            coin.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotZ}deg)`;

            // 3D spin that varies with scroll position and time
            const spinY = (y * 0.25 + norm * 40 + Math.sin(t * 1.2) * 25) * dir;
            const spinX = (norm * 18 + Math.cos(t * 0.9) * 10) * tilt;
            const spinEl = coin.querySelector('.coin-spin');
            if (spinEl) {
                spinEl.style.transform = `rotateY(${spinY}deg) rotateX(${spinX}deg)`;
            }
        });
    };

    // rAF loop to keep wander alive even when not scrolling
    const tick = () => {
        applyTransforms(performance.now());
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
})();

// Console Easter Egg
console.log('%c⚔️ Tales of the Dying Daylight ⚔️', 'color: #d4af37; font-size: 24px; font-weight: bold;');
console.log('%cLight holds secrets no shadow can hide...', 'color: #ff6b35; font-style: italic;');
console.log('%cJoin us at the Banquet! 🏰', 'color: #f4e8c1;');
