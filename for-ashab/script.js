// AshaBoard - Pinterest Clone by Ashab
// Developed by MattyJacks.com

// Sample pins data with Pexels images
const pinsData = [
    {
        id: 1,
        title: "Sunset Mountain Vista",
        description: "Breathtaking mountain landscape bathed in golden sunset light. Nature's masterpiece captured at the perfect moment.",
        image: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["nature", "sunset", "mountains", "landscape"],
        source: "https://www.pexels.com/photo/1266810/",
        views: 15234,
        likes: 892,
        saves: 234
    },
    {
        id: 2,
        title: "Modern Architecture Marvel",
        description: "Stunning contemporary building design showcasing clean lines and innovative architectural concepts.",
        image: "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["architecture", "modern", "design", "building"],
        source: "https://www.pexels.com/photo/1595385/",
        views: 8921,
        likes: 567,
        saves: 189
    },
    {
        id: 3,
        title: "Gourmet Food Plating",
        description: "Exquisite culinary presentation featuring vibrant colors and artistic food arrangement.",
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["food", "gourmet", "culinary", "delicious"],
        source: "https://www.pexels.com/photo/1640777/",
        views: 12543,
        likes: 1023,
        saves: 456
    },
    {
        id: 4,
        title: "Fashion Street Style",
        description: "Urban fashion photography capturing the essence of contemporary street style and personal expression.",
        image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["fashion", "style", "streetwear", "trendy"],
        source: "https://www.pexels.com/photo/1926769/",
        views: 9876,
        likes: 678,
        saves: 321
    },
    {
        id: 5,
        title: "Minimalist Interior Design",
        description: "Clean and serene living space showcasing minimalist design principles and neutral color palette.",
        image: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["interior", "minimalist", "design", "home"],
        source: "https://www.pexels.com/photo/1643384/",
        views: 11234,
        likes: 789,
        saves: 298
    },
    {
        id: 6,
        title: "Tropical Paradise Beach",
        description: "Crystal clear waters and pristine white sand create the perfect tropical getaway destination.",
        image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["travel", "beach", "tropical", "paradise"],
        source: "https://www.pexels.com/photo/1450353/",
        views: 18765,
        likes: 1456,
        saves: 678
    },
    {
        id: 7,
        title: "Abstract Art Expression",
        description: "Vibrant colors and bold brushstrokes create a powerful abstract composition full of emotion.",
        image: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["art", "abstract", "colorful", "creative"],
        source: "https://www.pexels.com/photo/1269968/",
        views: 7654,
        likes: 432,
        saves: 167
    },
    {
        id: 8,
        title: "Wildlife Photography",
        description: "Majestic wildlife captured in their natural habitat, showcasing the beauty of the animal kingdom.",
        image: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["wildlife", "nature", "animals", "photography"],
        source: "https://www.pexels.com/photo/247502/",
        views: 14567,
        likes: 987,
        saves: 432
    },
    {
        id: 9,
        title: "Urban City Lights",
        description: "Dazzling cityscape illuminated by thousands of lights creating a mesmerizing urban landscape.",
        image: "https://images.pexels.com/photos/1538177/pexels-photo-1538177.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["city", "urban", "night", "lights"],
        source: "https://www.pexels.com/photo/1538177/",
        views: 10234,
        likes: 678,
        saves: 234
    },
    {
        id: 10,
        title: "Vintage Camera Collection",
        description: "Beautiful collection of vintage cameras showcasing the evolution of photography technology.",
        image: "https://images.pexels.com/photos/1203819/pexels-photo-1203819.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["vintage", "camera", "photography", "retro"],
        source: "https://www.pexels.com/photo/1203819/",
        views: 6789,
        likes: 345,
        saves: 123
    },
    {
        id: 11,
        title: "Zen Garden Tranquility",
        description: "Peaceful Japanese garden featuring carefully arranged stones and raked sand patterns.",
        image: "https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["garden", "zen", "peaceful", "nature"],
        source: "https://www.pexels.com/photo/1212487/",
        views: 8765,
        likes: 567,
        saves: 234
    },
    {
        id: 12,
        title: "Coffee Art Masterpiece",
        description: "Expertly crafted latte art creating beautiful patterns in creamy coffee foam.",
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["coffee", "art", "latte", "cafe"],
        source: "https://www.pexels.com/photo/312418/",
        views: 9876,
        likes: 678,
        saves: 345
    },
    {
        id: 13,
        title: "Space & Cosmos",
        description: "Stunning view of the cosmos featuring distant galaxies and nebulae in all their glory.",
        image: "https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["space", "cosmos", "galaxy", "astronomy"],
        source: "https://www.pexels.com/photo/816608/",
        views: 16789,
        likes: 1234,
        saves: 567
    },
    {
        id: 14,
        title: "Fitness & Wellness",
        description: "Inspiring fitness journey showcasing dedication to health and wellness lifestyle.",
        image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["fitness", "health", "wellness", "lifestyle"],
        source: "https://www.pexels.com/photo/841130/",
        views: 11234,
        likes: 789,
        saves: 432
    },
    {
        id: 15,
        title: "Autumn Forest Trail",
        description: "Golden autumn foliage creating a magical pathway through the enchanted forest.",
        image: "https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=600",
        tags: ["autumn", "forest", "nature", "trail"],
        source: "https://www.pexels.com/photo/1438761/",
        views: 13456,
        likes: 987,
        saves: 456
    }
];

// State management
let currentPins = [...pinsData];
let savedPins = [];
let likedPins = [];
let currentFilter = 'All';
let isLoading = false;

// DOM Elements
const pinsContainer = document.getElementById('pinsContainer');
const searchInput = document.getElementById('searchInput');
const pinModal = document.getElementById('pinModal');
const createModal = document.getElementById('createModal');
const createBtn = document.getElementById('createBtn');
const toast = document.getElementById('toast');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderPins();
    setupEventListeners();
    animateOnScroll();
});

// Render pins with staggered animation
function renderPins(pins = currentPins) {
    pinsContainer.innerHTML = '';
    
    pins.forEach((pin, index) => {
        const pinCard = createPinCard(pin);
        pinCard.style.animationDelay = `${index * 0.1}s`;
        pinsContainer.appendChild(pinCard);
    });
}

// Create pin card element
function createPinCard(pin) {
    const card = document.createElement('div');
    card.className = 'pin-card';
    card.dataset.pinId = pin.id;
    
    const isLiked = likedPins.includes(pin.id);
    const isSaved = savedPins.includes(pin.id);
    
    card.innerHTML = `
        <div class="pin-image-container">
            <img src="${pin.image}" alt="${pin.title}" class="pin-image" loading="lazy">
            <div class="pin-overlay">
                <div class="pin-actions">
                    <button class="pin-action-btn quick-like" data-id="${pin.id}">
                        <i class="fas fa-heart ${isLiked ? 'liked' : ''}"></i>
                    </button>
                    <button class="pin-action-btn quick-share" data-id="${pin.id}">
                        <i class="fas fa-share"></i>
                    </button>
                    <button class="pin-action-btn pin-save-btn ${isSaved ? 'saved' : ''}" data-id="${pin.id}">
                        ${isSaved ? 'Saved' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
        <div class="pin-content">
            <h3 class="pin-title">${pin.title}</h3>
            <div class="pin-tags">
                ${pin.tags.map(tag => `<span class="pin-tag">#${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    // Add click event to open modal
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.pin-action-btn')) {
            openPinModal(pin);
        }
    });
    
    // Add quick action events
    const quickLike = card.querySelector('.quick-like');
    const quickShare = card.querySelector('.quick-share');
    const quickSave = card.querySelector('.pin-save-btn');
    
    quickLike.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLike(pin.id);
        quickLike.querySelector('i').classList.toggle('liked');
        showToast(isLiked ? 'Removed from likes' : 'Added to likes!');
    });
    
    quickShare.addEventListener('click', (e) => {
        e.stopPropagation();
        sharePinCool(pin);
    });
    
    quickSave.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSave(pin.id);
        quickSave.classList.toggle('saved');
        quickSave.textContent = quickSave.classList.contains('saved') ? 'Saved' : 'Save';
        showToast(isSaved ? 'Removed from saved' : 'Pin saved!');
    });
    
    return card;
}

// Open pin modal with details
function openPinModal(pin) {
    const modal = document.getElementById('pinModal');
    
    // Update modal content
    document.getElementById('modalImage').src = pin.image;
    document.getElementById('modalTitle').textContent = pin.title;
    document.getElementById('modalDescription').textContent = pin.description;
    document.getElementById('modalSource').href = pin.source;
    document.getElementById('viewCount').textContent = pin.views.toLocaleString();
    document.getElementById('likeCount').textContent = pin.likes.toLocaleString();
    document.getElementById('saveCount').textContent = pin.saves.toLocaleString();
    
    // Update tags
    const tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = pin.tags.map(tag => 
        `<span class="pin-tag">#${tag}</span>`
    ).join('');
    
    // Update action buttons state
    const likeBtn = modal.querySelector('.like-btn');
    const saveBtn = modal.querySelector('.save-btn');
    
    if (likedPins.includes(pin.id)) {
        likeBtn.classList.add('liked');
        likeBtn.innerHTML = '<i class="fas fa-heart" style="color: red;"></i>';
    } else {
        likeBtn.classList.remove('liked');
        likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
    }
    
    if (savedPins.includes(pin.id)) {
        saveBtn.classList.add('saved');
        saveBtn.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
    } else {
        saveBtn.classList.remove('saved');
        saveBtn.innerHTML = '<i class="fas fa-bookmark"></i> Save';
    }
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Increment view count
    pin.views++;
    document.getElementById('viewCount').textContent = pin.views.toLocaleString();
    
    // Load comments
    loadComments();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.toLowerCase();
        if (query) {
            const filtered = pinsData.filter(pin => 
                pin.title.toLowerCase().includes(query) ||
                pin.description.toLowerCase().includes(query) ||
                pin.tags.some(tag => tag.toLowerCase().includes(query))
            );
            renderPins(filtered);
        } else {
            renderPins();
        }
    }, 300));
    
    // Category filters
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            const category = pill.textContent.toLowerCase();
            if (category === 'all') {
                renderPins();
            } else {
                const filtered = pinsData.filter(pin => 
                    pin.tags.some(tag => tag.toLowerCase().includes(category))
                );
                renderPins(filtered);
            }
        });
    });
    
    // Modal close buttons
    document.querySelector('.close-modal').addEventListener('click', closePinModal);
    document.querySelector('.close-create-modal').addEventListener('click', closeCreateModal);
    
    // Create button
    createBtn.addEventListener('click', () => {
        createModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Create pin form
    document.getElementById('createPinForm').addEventListener('submit', (e) => {
        e.preventDefault();
        createNewPin();
    });
    
    // Modal action buttons
    document.querySelector('.like-btn').addEventListener('click', function() {
        const pinId = parseInt(document.getElementById('modalImage').dataset.pinId || 1);
        toggleLike(pinId);
        this.classList.toggle('liked');
        if (this.classList.contains('liked')) {
            this.innerHTML = '<i class="fas fa-heart" style="color: red;"></i>';
            showToast('Added to likes!');
        } else {
            this.innerHTML = '<i class="fas fa-heart"></i>';
            showToast('Removed from likes');
        }
    });
    
    document.querySelector('.save-btn').addEventListener('click', function() {
        const pinId = parseInt(document.getElementById('modalImage').dataset.pinId || 1);
        toggleSave(pinId);
        this.classList.toggle('saved');
        if (this.classList.contains('saved')) {
            this.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
            showToast('Pin saved!');
        } else {
            this.innerHTML = '<i class="fas fa-bookmark"></i> Save';
            showToast('Removed from saved');
        }
    });
    
    document.querySelector('.share-btn').addEventListener('click', () => {
        sharePinCool(currentPins[0]);
    });
    
    // Comment functionality
    document.getElementById('addCommentBtn').addEventListener('click', addComment);
    document.getElementById('commentInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addComment();
        }
    });
    
    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === pinModal) {
            closePinModal();
        }
        if (e.target === createModal) {
            closeCreateModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePinModal();
            closeCreateModal();
        }
    });
}

// Close pin modal
function closePinModal() {
    pinModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close create modal
function closeCreateModal() {
    createModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('createPinForm').reset();
}

// Toggle like functionality
function toggleLike(pinId) {
    const index = likedPins.indexOf(pinId);
    if (index > -1) {
        likedPins.splice(index, 1);
    } else {
        likedPins.push(pinId);
    }
}

// Toggle save functionality
function toggleSave(pinId) {
    const index = savedPins.indexOf(pinId);
    if (index > -1) {
        savedPins.splice(index, 1);
    } else {
        savedPins.push(pinId);
    }
}

// Share pin with cool animation
function sharePinCool(pin) {
    if (navigator.share) {
        navigator.share({
            title: pin.title,
            text: pin.description,
            url: window.location.href
        }).then(() => {
            showToast('Pin shared successfully!');
        }).catch(() => {
            copyToClipboard(window.location.href);
        });
    } else {
        copyToClipboard(window.location.href);
    }
}

// Copy to clipboard
function copyToClipboard(text) {
    const temp = document.createElement('input');
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    showToast('Link copied to clipboard!');
}

// Create new pin
function createNewPin() {
    const title = document.getElementById('newPinTitle').value;
    const description = document.getElementById('newPinDescription').value;
    const image = document.getElementById('newPinImage').value;
    const tags = document.getElementById('newPinTags').value.split(',').map(t => t.trim());
    
    const newPin = {
        id: pinsData.length + 1,
        title,
        description,
        image,
        tags,
        source: image,
        views: 0,
        likes: 0,
        saves: 0
    };
    
    pinsData.unshift(newPin);
    renderPins();
    closeCreateModal();
    showToast('Pin created successfully!');
}

// Add comment
function addComment() {
    const input = document.getElementById('commentInput');
    const comment = input.value.trim();
    
    if (comment) {
        const commentsList = document.getElementById('commentsList');
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <div class="comment-avatar">A</div>
            <div class="comment-content">
                <div class="comment-author">Ashab</div>
                <div class="comment-text">${comment}</div>
            </div>
        `;
        commentsList.insertBefore(commentDiv, commentsList.firstChild);
        input.value = '';
        showToast('Comment added!');
    }
}

// Load sample comments
function loadComments() {
    const comments = [
        { author: 'Sarah', text: 'This is absolutely stunning! 😍', avatar: 'S' },
        { author: 'Mike', text: 'Great inspiration for my next project!', avatar: 'M' },
        { author: 'Emma', text: 'Love the colors and composition', avatar: 'E' }
    ];
    
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-avatar">${comment.avatar}</div>
            <div class="comment-content">
                <div class="comment-author">${comment.author}</div>
                <div class="comment-text">${comment.text}</div>
            </div>
        </div>
    `).join('');
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Animate on scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.pin-card').forEach(card => {
        observer.observe(card);
    });
}

// Infinite scroll simulation
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        if (!isLoading) {
            loadMorePins();
        }
    }
});

// Load more pins (simulated)
function loadMorePins() {
    isLoading = true;
    
    // Simulate loading delay
    setTimeout(() => {
        const morePins = pinsData.map(pin => ({
            ...pin,
            id: pin.id + Math.random() * 1000,
            title: pin.title + ' - New',
            views: Math.floor(Math.random() * 10000),
            likes: Math.floor(Math.random() * 1000),
            saves: Math.floor(Math.random() * 500)
        }));
        
        currentPins.push(...morePins.slice(0, 5));
        renderPins();
        isLoading = false;
        showToast('More pins loaded!');
    }, 1000);
}

// Add some cool console messages for Ashab
console.log('%c🎨 Welcome to AshaBoard! 🎨', 'color: #E60023; font-size: 24px; font-weight: bold;');
console.log('%cCreated by Ashab - The coolest guy! 😎', 'color: #111111; font-size: 16px;');
console.log('%cDeveloped with ❤️ by MattyJacks.com', 'color: #767676; font-size: 14px;');
console.log('%c💡 Pro tip: Press ESC to close modals!', 'color: #E60023; font-size: 12px;');
