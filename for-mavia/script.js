// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Navigation and header functionality
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    
    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show a success message
            showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Function to show form submission messages
    function showFormMessage(message, type) {
        // Check if a message element already exists and remove it
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Add the message to the form
        contactForm.appendChild(messageElement);
        
        // Remove the message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.skill-item, .project-card, .timeline-content, .education-item');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for animation
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check elements on load and scroll
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
    
    // Typing effect for hero section
    const typingElement = document.querySelector('.hero-text h2');
    const originalText = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            typingElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);

    // Scroll progress bar
    const progressBar = document.getElementById('progressBar');
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) progressBar.style.width = progress + '%';
    };
    window.addEventListener('scroll', updateProgress);
    updateProgress();

    // Dark mode toggle with persistence
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    const applyThemeIcon = () => {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (!icon) return;
        if (document.body.classList.contains('dark')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    };
    if (isDark) document.body.classList.add('dark');
    applyThemeIcon();
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyThemeIcon();
        });
    }

    // Stats counters
    const counters = document.querySelectorAll('.counter');
    if (counters.length) {
        const speed = 30; // smaller = faster
        const startCounter = (el) => {
            const target = +el.getAttribute('data-target');
            const isPercent = el.parentElement && el.parentElement.textContent.includes('%');
            let current = 0;
            const increment = Math.max(1, Math.ceil(target / 100));
            const step = () => {
                current += increment;
                if (current >= target) {
                    current = target;
                    el.textContent = target.toLocaleString();
                } else {
                    el.textContent = current.toLocaleString();
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target.querySelector('.counter') || entry.target;
                    if (el && !el.dataset.started) {
                        el.dataset.started = '1';
                        startCounter(el);
                    }
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        document.querySelectorAll('.stat, .counter').forEach(node => observer.observe(node));
    }

    // Tilt hover effect
    const tiltTargets = document.querySelectorAll('.project-card, .skill-item');
    const addTilt = (el) => {
        const maxTilt = 10; // degrees
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const px = (x / rect.width) - 0.5;
            const py = (y / rect.height) - 0.5;
            const rx = (-py * maxTilt).toFixed(2);
            const ry = (px * maxTilt).toFixed(2);
            el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
            el.style.boxShadow = `0 20px 35px -10px rgba(0,0,0,0.2)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
            el.style.boxShadow = '';
        });
    };
    tiltTargets.forEach(addTilt);

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    const toggleBackToTop = () => {
        if (!backToTop) return;
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    };
    window.addEventListener('scroll', toggleBackToTop);
    if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Subtle hero parallax
    const hero = document.querySelector('.hero');
    const heroText = document.querySelector('.hero-text');
    window.addEventListener('scroll', () => {
        if (!heroText) return;
        const y = window.scrollY * 0.1;
        heroText.style.transform = `translateY(${y}px)`;
    });
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            if (heroText) heroText.style.transform = `translate3d(${x * 10}px, ${y * 10}px, 0)`;
        });
        hero.addEventListener('mouseleave', () => {
            if (heroText) heroText.style.transform = '';
        });
    }
});
