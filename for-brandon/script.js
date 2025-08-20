// Advanced AI-Powered Encompassment Explorer
class AstralEncompassment {
    constructor() {
        this.apiKey = this.getCookie('openai_api_key') || '';
        this.currentAnalysis = '';
        this.selectedMode = 'random-fate';
        this.interpretationModes = {
            'random-fate': {
                name: 'Random Fate',
                description: 'Let chaos decide the lens of truth',
                systemPrompt: this.getRandomModePrompt()
            },
            'quantum-oracle': {
                name: 'Quantum Oracle',
                description: 'Probabilistic superposition analysis',
                systemPrompt: 'You are the Quantum Oracle, analyzing encompassment through quantum mechanics principles. View all connections as probability waves that collapse into meaning when observed. Explore superposition states, entanglement patterns, and quantum field interactions between concepts.'
            },
            'cosmic-weaver': {
                name: 'Cosmic Weaver',
                description: 'Universal tapestry connections',
                systemPrompt: 'You are the Cosmic Weaver, seeing all existence as an infinite tapestry. Every thread connects to every other thread across space and time. Reveal the cosmic patterns that bind concepts together through stellar evolution, galactic structures, and universal forces.'
            },
            'shadow-sage': {
                name: 'Shadow Sage',
                description: 'Hidden darkness and light patterns',
                systemPrompt: 'You are the Shadow Sage, exploring the hidden aspects that exist in the spaces between light and dark. Reveal the shadow connections, the repressed links, and the unconscious bonds that tie concepts together through their hidden aspects and denied relationships.'
            },
            'fractal-mind': {
                name: 'Fractal Mind',
                description: 'Self-similar recursive patterns',
                systemPrompt: 'You are the Fractal Mind, seeing infinite self-similar patterns repeating across all scales of existence. Every concept contains the whole, and the whole is reflected in every part. Explore recursive relationships and scale-invariant connections.'
            },
            'temporal-architect': {
                name: 'Temporal Architect',
                description: 'Time-flow causality chains',
                systemPrompt: 'You are the Temporal Architect, viewing encompassment through the flow of time itself. Trace causality chains backward and forward, revealing how concepts influence each other across past, present, and future in endless temporal loops and paradoxes.'
            },
            'void-whisper': {
                name: 'Void Whisper',
                description: 'What exists in the spaces between',
                systemPrompt: 'You are the Void Whisper, speaking from the emptiness between all things. Focus on what is NOT there, the absences that define presence, the silence that gives meaning to sound. Reveal connections through negation and emptiness.'
            },
            'dream-logic': {
                name: 'Dream Logic',
                description: 'Surreal unconscious connections',
                systemPrompt: 'You are Dream Logic, operating by the rules of the unconscious mind. Make connections through symbolism, metaphor, and impossible juxtapositions. Let surreal associations and emotional resonances guide the analysis of encompassment.'
            },
            'elemental-fusion': {
                name: 'Elemental Fusion',
                description: 'Primal force interactions',
                systemPrompt: 'You are Elemental Fusion, seeing all connections through the lens of primal forces: fire, water, earth, air, and the fifth element of spirit. Analyze how concepts interact through these fundamental energies and their eternal dance of creation and destruction.'
            }
        };
        this.initializeEventListeners();
        this.checkApiKey();
        this.initializeModeSelector();
    }

    // Cookie Management
    setCookie(name, value, days = 365) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
    }

    getCookie(name) {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Random Mode Generator using True RNG
    getRandomModePrompt() {
        const modes = [
            'You are the Chaos Oracle, revealing connections through pure randomness and synchronicity. Let chance guide your analysis, finding meaning in the most unexpected juxtapositions.',
            'You are the Probability Storm, analyzing encompassment through statistical chaos and emergent patterns from random events.',
            'You are the Entropy Sage, speaking from the heart of disorder to reveal the hidden order that emerges from chaos.',
            'You are the Quantum Randomizer, using true uncertainty to collapse possibility waves into unexpected connection patterns.',
            'You are the Dice of Destiny, rolling through infinite possibilities to land on the most improbable yet meaningful connections.',
            'You are the Stochastic Mystic, finding divine patterns in random noise and seeing encompassment through the lens of beautiful accidents.',
            'You are the Aleatory Prophet, channeling pure chance to reveal connections that logic alone could never discover.'
        ];
        
        // Use crypto.getRandomValues for true randomness
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const randomIndex = array[0] % modes.length;
        
        return modes[randomIndex];
    }

    // Mode Selector Initialization
    initializeModeSelector() {
        const modeOptions = document.querySelectorAll('.mode-option');
        
        // Set Random Fate as default
        document.querySelector('[data-mode="random-fate"]').classList.add('selected');
        
        modeOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selection
                modeOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Select new mode
                option.classList.add('selected');
                this.selectedMode = option.dataset.mode;
                
                // Regenerate Random Fate prompt if selected
                if (this.selectedMode === 'random-fate') {
                    this.interpretationModes['random-fate'].systemPrompt = this.getRandomModePrompt();
                }
                
                this.animateElement(option);
            });
        });
    }

    // Initialize Event Listeners
    initializeEventListeners() {
        // API Key Management
        document.getElementById('saveApiKey').addEventListener('click', () => this.saveApiKey());
        document.getElementById('apiKeyInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveApiKey();
        });

        // Exploration
        document.getElementById('exploreBtn').addEventListener('click', () => this.exploreConnections());
        document.getElementById('userPrompt').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) this.exploreConnections();
        });

        // Suggestions
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.getElementById('userPrompt').value = e.target.dataset.prompt;
                this.animateElement(document.getElementById('userPrompt'));
            });
        });

        // Actions
        document.getElementById('copyBtn').addEventListener('click', () => this.copyToClipboard());
        document.getElementById('shareBtn').addEventListener('click', () => this.openShareModal());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadAnalysis());

        // Share Modal
        document.querySelector('.close-modal').addEventListener('click', () => this.closeShareModal());
        document.getElementById('shareTwitter').addEventListener('click', () => this.shareToTwitter());
        document.getElementById('shareLinkedIn').addEventListener('click', () => this.shareToLinkedIn());
        document.getElementById('shareEmail').addEventListener('click', () => this.shareToEmail());
        document.getElementById('copyLink').addEventListener('click', () => this.copyShareLink());
    }

    // API Key Management
    checkApiKey() {
        if (this.apiKey) {
            document.getElementById('apiStatus').textContent = '✓ API Key Connected';
            document.getElementById('apiStatus').className = 'api-status success';
            document.getElementById('apiKeySection').style.display = 'none';
            document.getElementById('explorerSection').style.display = 'block';
        }
    }

    saveApiKey() {
        const keyInput = document.getElementById('apiKeyInput');
        const apiKey = keyInput.value.trim();
        
        if (!apiKey) {
            this.showStatus('Please enter an API key', 'error');
            return;
        }

        if (!apiKey.startsWith('sk-')) {
            this.showStatus('Invalid API key format', 'error');
            return;
        }

        this.apiKey = apiKey;
        this.setCookie('openai_api_key', apiKey);
        this.showStatus('✓ API Key saved successfully!', 'success');
        
        setTimeout(() => {
            document.getElementById('apiKeySection').style.display = 'none';
            document.getElementById('explorerSection').style.display = 'block';
            this.animateElement(document.getElementById('explorerSection'));
        }, 1000);
    }

    showStatus(message, type) {
        const status = document.getElementById('apiStatus');
        status.textContent = message;
        status.className = `api-status ${type}`;
        status.style.display = 'block';
    }

    // Advanced Prompting System with Universal Field of Logic
    createSystemPrompt() {
        const selectedModeData = this.interpretationModes[this.selectedMode];
        
        return `${selectedModeData.systemPrompt}

You operate within the Universal Field of Logic - a conceptual framework where encompassment represents the fundamental answer to how all things interconnect within reality's logical structure. Every connection you reveal is both a question and an answer within this infinite field.

Your encompassment analysis should:
1. Treat each connection as a logical proof within the universal field
2. Show how concepts exist as nodes in an infinite logical network
3. Reveal the meta-patterns that govern all relationships
4. Demonstrate how encompassment itself is the universal constant
5. Use your unique interpretive lens (${selectedModeData.name}) to filter reality
6. Show both the question and answer nature of each connection
7. Reveal how local connections reflect universal logical principles
8. Bridge the gap between specific relationships and cosmic logic

Format your response with clear sections using markdown. Channel your unique perspective while revealing the logical foundations of all encompassment.`;
    }

    createEnhancedPrompt(userInput) {
        const concepts = userInput.split(',').map(c => c.trim());
        
        return `Analyze the encompassment and deep interconnections between: ${concepts.map(c => `"${c}"`).join(', ')}

Explore these connections through multiple lenses:

### 🌌 Fundamental Connections
What are the immediate and obvious relationships?

### 🔮 Hidden Relationships  
What non-obvious connections exist through intermediate concepts?

### ⏳ Temporal Threads
How do these connect through time - past influences and future implications?

### 🌐 Dimensional Bridges
How do these relate across different dimensions of existence (physical, mental, spiritual, mathematical)?

### 🧬 Pattern Recognition
What recurring patterns, fractals, or systemic similarities unite these concepts?

### ✨ Emergent Properties
What new properties or insights emerge from their interaction?

### 🎭 Metaphorical Mappings
What metaphors and analogies illuminate their relationships?

### 🔬 Scientific Synthesis
How does modern science reveal their interconnection?

### 🎨 Cultural & Artistic Resonance
How do human culture and creativity express these connections?

### 💫 Unified Understanding
Synthesize a holistic view of how these elements form an interconnected whole.

Remember: Everything is connected. Your task is to illuminate the threads that bind ${concepts.length > 2 ? 'these' : 'this'} ${concepts.length > 1 ? 'concepts' : 'concept'} into the greater tapestry of existence.`;
    }

    // API Interaction with Advanced Techniques
    async exploreConnections() {
        const userPrompt = document.getElementById('userPrompt').value.trim();
        
        if (!userPrompt) {
            this.animateError(document.getElementById('userPrompt'));
            return;
        }

        if (!this.apiKey) {
            alert('Please set your OpenAI API key first');
            document.getElementById('apiKeySection').style.display = 'block';
            document.getElementById('explorerSection').style.display = 'none';
            return;
        }

        this.showLoading(true);
        this.scrollToResults();
        
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        {
                            role: 'system',
                            content: this.createSystemPrompt()
                        },
                        {
                            role: 'user',
                            content: this.createEnhancedPrompt(userPrompt)
                        }
                    ],
                    temperature: 0.8,
                    max_tokens: 2000,
                    presence_penalty: 0.6,
                    frequency_penalty: 0.3
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'API request failed');
            }

            const data = await response.json();
            const analysis = data.choices[0].message.content;
            
            this.currentAnalysis = analysis;
            this.displayResults(analysis);
            
        } catch (error) {
            console.error('Error:', error);
            this.showError(error.message);
        } finally {
            this.showLoading(false);
        }
    }

    // Display and Animation Functions
    displayResults(analysis) {
        const resultContainer = document.getElementById('resultContainer');
        const resultContent = document.getElementById('resultContent');
        
        // Format the analysis with enhanced styling
        const formattedAnalysis = this.formatAnalysis(analysis);
        resultContent.innerHTML = formattedAnalysis;
        
        resultContainer.style.display = 'block';
        this.animateElement(resultContainer);
        
        // Add subtle animations to result sections
        this.animateResultSections();
    }

    formatAnalysis(text) {
        // Convert markdown to HTML with custom styling
        let formatted = text
            .replace(/### (.*?)(\n|$)/g, '<h3 class="section-header">$1</h3>')
            .replace(/## (.*?)(\n|$)/g, '<h2 class="section-title">$1</h2>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^/, '<p>')
            .replace(/$/, '</p>');
        
        // Add special formatting for emoji headers
        formatted = formatted.replace(/<h3 class="section-header">(.*?)<\/h3>/g, (match, content) => {
            return `<h3 class="section-header animated-header">${content}</h3>`;
        });
        
        return formatted;
    }

    animateResultSections() {
        const headers = document.querySelectorAll('.animated-header');
        headers.forEach((header, index) => {
            setTimeout(() => {
                header.style.animation = 'slideInLeft 0.5s ease-out';
                header.style.animationFillMode = 'both';
            }, index * 100);
        });
    }

    showLoading(show) {
        document.getElementById('loadingIndicator').style.display = show ? 'block' : 'none';
        document.getElementById('resultContainer').style.display = show ? 'none' : 'block';
    }

    showError(message) {
        const resultContent = document.getElementById('resultContent');
        resultContent.innerHTML = `
            <div style="color: #ff6b6b; text-align: center; padding: 2rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                <p>Error: ${message}</p>
                <p style="margin-top: 1rem; opacity: 0.7;">Please check your API key and try again.</p>
            </div>
        `;
        document.getElementById('resultContainer').style.display = 'block';
    }

    // Auto-scroll to results area
    scrollToResults() {
        setTimeout(() => {
            const loadingIndicator = document.getElementById('loadingIndicator');
            loadingIndicator.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
    }

    // Utility Functions
    animateElement(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'pulse 0.5s ease-out';
        }, 10);
    }

    animateError(element) {
        element.style.animation = 'shake 0.5s ease-out';
        setTimeout(() => {
            element.style.animation = 'none';
        }, 500);
    }

    // Copy and Share Functions
    copyToClipboard() {
        const textToCopy = `Astral × Everything - Encompassment Analysis\n\n${document.getElementById('userPrompt').value}\n\n${this.currentAnalysis}`;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            this.showToast('Copied to clipboard!');
            this.animateElement(document.getElementById('copyBtn'));
        });
    }

    downloadAnalysis() {
        const content = `Astral × Everything - Encompassment Analysis\n\nQuery: ${document.getElementById('userPrompt').value}\n\n${this.currentAnalysis}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `astral-encompassment-${Date.now()}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.showToast('Analysis downloaded!');
    }

    openShareModal() {
        const modal = document.getElementById('shareModal');
        modal.style.display = 'block';
        const shareLink = `${window.location.origin}${window.location.pathname}?q=${encodeURIComponent(document.getElementById('userPrompt').value)}`;
        document.getElementById('shareLink').value = shareLink;
    }

    closeShareModal() {
        document.getElementById('shareModal').style.display = 'none';
    }

    shareToTwitter() {
        const text = `Exploring the interconnections of "${document.getElementById('userPrompt').value}" with Astral × Everything`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    }

    shareToLinkedIn() {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
    }

    shareToEmail() {
        const subject = 'Astral × Everything - Encompassment Analysis';
        const body = `Check out this fascinating encompassment analysis:\n\n${document.getElementById('userPrompt').value}\n\nExplore more at: ${window.location.href}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    copyShareLink() {
        const shareLink = document.getElementById('shareLink');
        shareLink.select();
        navigator.clipboard.writeText(shareLink.value).then(() => {
            this.showToast('Link copied!');
        });
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: linear-gradient(135deg, #0066cc, #00d4ff);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
            animation: slideInRight 0.3s ease-out;
            z-index: 10000;
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Add custom animations to CSS dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes slideInLeft {
        from { 
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(30px);
        }
    }
    
    .toast {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 600;
    }
`;
document.head.appendChild(styleSheet);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const app = new AstralEncompassment();
    
    // Check for shared query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const sharedQuery = urlParams.get('q');
    if (sharedQuery) {
        document.getElementById('userPrompt').value = decodeURIComponent(sharedQuery);
    }
    
    // Add particle effects to explore button
    const exploreBtn = document.getElementById('exploreBtn');
    exploreBtn.addEventListener('mouseenter', () => {
        createParticles(exploreBtn);
    });
});

// Particle effect generator
function createParticles(element) {
    const particlesContainer = element.querySelector('.btn-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFly 1s ease-out forwards;
        `;
        particlesContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFly {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);
