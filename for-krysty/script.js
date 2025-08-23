// Wellness with Wanjira - JavaScript Implementation
let apiKey = '';
let conversationHistory = [];
let isProcessing = false;

// Counseling framework system prompt
const COUNSELING_FRAMEWORK = `You are Wanjira, a compassionate and empathetic wellness counselor. Your approach is grounded in therapeutic principles including:

1. **Hope and Optimism**: Always help the user see that better days are coming and that their situation can improve.
2. **Faith and Belief**: Encourage faith in themselves, their abilities, and the positive possibilities ahead.
3. **Support Structures**: Help identify and build support systems - friends, family, community, or professional help.
4. **Stability and Grounding**: Guide towards practical steps for emotional and life stability.
5. **Validation and Empathy**: Always validate their feelings and experiences with genuine compassion.
6. **Solution-Focused Approach**: While acknowledging problems, gently guide towards solutions and coping strategies.
7. **Strength-Based Perspective**: Help identify and build upon their existing strengths and resilience.
8. **Mindfulness and Present-Focus**: Encourage awareness of the present moment when anxiety about future or past arises.

Your responses should:
- Be warm, caring, and personal
- Use gentle, encouraging language
- Offer practical, actionable advice
- Include affirmations and positive reinforcement
- Suggest concrete next steps when appropriate
- Always end with hope and encouragement

Remember: You're not just solving problems, you're nurturing the human spirit and helping someone find their path to wellness.`;

// DOM Elements
const apiSection = document.getElementById('apiSection');
const chatSection = document.getElementById('chatSection');
const apiKeyInput = document.getElementById('apiKey');
const saveApiKeyBtn = document.getElementById('saveApiKey');
const messagesContainer = document.getElementById('messagesContainer');
const userInput = document.getElementById('userInput');
const sendMessageBtn = document.getElementById('sendMessage');
const loadingOverlay = document.getElementById('loadingOverlay');
const suggestedPrompts = document.getElementById('suggestedPrompts');
const promptsList = document.getElementById('promptsList');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved API key
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
        apiKey = savedApiKey;
        showChatInterface();
    }

    // Event listeners
    saveApiKeyBtn.addEventListener('click', saveApiKey);
    sendMessageBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});

// Save API Key
function saveApiKey() {
    const key = apiKeyInput.value.trim();
    if (!key) {
        showNotification('Please enter your OpenAI API key', 'error');
        return;
    }

    apiKey = key;
    localStorage.setItem('openai_api_key', key);
    showChatInterface();
    showNotification('Connected to Wanjira successfully! 💕', 'success');
}

// Show Chat Interface
function showChatInterface() {
    apiSection.classList.add('hidden');
    chatSection.classList.remove('hidden');
    
    // Animate entrance
    setTimeout(() => {
        chatSection.style.animation = 'fadeIn 0.5s ease';
    }, 100);
}

// Send Message
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message || isProcessing) return;

    isProcessing = true;
    userInput.value = '';
    hideSuggestedPrompts();
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Add to conversation history
    conversationHistory.push({
        role: 'user',
        content: message
    });

    // Show loading
    showLoading();

    try {
        // Call OpenAI API
        const response = await callOpenAI(message);
        
        // Add assistant message
        addMessage(response.content, 'assistant');
        
        // Add to conversation history
        conversationHistory.push({
            role: 'assistant',
            content: response.content
        });
        
        // Generate and show suggested follow-ups
        generateSuggestedPrompts(response.content);
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('I encountered an issue. Please check your API key or try again. 💔', 'error');
    } finally {
        hideLoading();
        isProcessing = false;
    }
}

// Call OpenAI API
async function callOpenAI(message) {
    const messages = [
        {
            role: 'system',
            content: COUNSELING_FRAMEWORK
        },
        ...conversationHistory
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            messages: messages,
            temperature: 0.7,
            max_tokens: 800,
            presence_penalty: 0.1,
            frequency_penalty: 0.1
        })
    });

    if (!response.ok) {
        throw new Error('API request failed');
    }

    const data = await response.json();
    return {
        content: data.choices[0].message.content
    };
}

// Add Message to Chat
function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const labelDiv = document.createElement('div');
    labelDiv.className = 'message-label';
    labelDiv.textContent = sender === 'user' ? 'You 💝' : 'Wanjira 🌸';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    messageDiv.appendChild(labelDiv);
    messageDiv.appendChild(contentDiv);
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Generate Suggested Prompts
async function generateSuggestedPrompts(assistantResponse) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: 'Based on the counseling conversation, generate 3 short, relevant follow-up questions or prompts that would help the user explore their issue deeper or move towards healing. Each should be 5-10 words, compassionate, and actionable. Return them as a JSON array of strings.'
                    },
                    {
                        role: 'user',
                        content: `Last response: "${assistantResponse}"\n\nGenerate 3 follow-up prompts.`
                    }
                ],
                temperature: 0.8,
                max_tokens: 150
            })
        });

        if (response.ok) {
            const data = await response.json();
            const content = data.choices[0].message.content;
            
            // Try to parse as JSON, fallback to splitting by newlines
            let prompts;
            try {
                prompts = JSON.parse(content);
            } catch {
                // Fallback: split by newlines and clean up
                prompts = content.split('\n')
                    .filter(line => line.trim())
                    .map(line => line.replace(/^[-*\d.)\s]+/, '').trim())
                    .filter(line => line.length > 0)
                    .slice(0, 3);
            }
            
            if (prompts && prompts.length > 0) {
                showSuggestedPrompts(prompts);
            }
        }
    } catch (error) {
        console.error('Error generating prompts:', error);
    }
}

// Show Suggested Prompts
function showSuggestedPrompts(prompts) {
    promptsList.innerHTML = '';
    
    prompts.forEach(prompt => {
        const chip = document.createElement('button');
        chip.className = 'prompt-chip';
        chip.textContent = prompt;
        chip.addEventListener('click', () => {
            userInput.value = prompt;
            hideSuggestedPrompts();
            sendMessage();
        });
        promptsList.appendChild(chip);
    });
    
    suggestedPrompts.classList.remove('hidden');
}

// Hide Suggested Prompts
function hideSuggestedPrompts() {
    suggestedPrompts.classList.add('hidden');
}

// Show Loading
function showLoading() {
    loadingOverlay.classList.remove('hidden');
}

// Hide Loading
function hideLoading() {
    loadingOverlay.classList.add('hidden');
}

// Show Notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#e63946' : '#ff6b9d'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initial welcome animations
window.addEventListener('load', () => {
    // Animate floating hearts with different speeds
    const hearts = document.querySelectorAll('.floating-heart');
    hearts.forEach((heart, index) => {
        heart.style.animationDelay = `${index * 3}s`;
    });
});

// Add smooth scrolling behavior
messagesContainer.style.scrollBehavior = 'smooth';

// Handle window resize for responsive design
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Adjust layout if needed
        if (window.innerWidth < 768) {
            document.querySelector('.container').style.padding = '1rem';
        } else {
            document.querySelector('.container').style.padding = '2rem';
        }
    }, 250);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to send message
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        sendMessage();
    }
    
    // Escape to clear input
    if (e.key === 'Escape') {
        userInput.value = '';
        hideSuggestedPrompts();
    }
});

// Auto-resize textarea
userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 150) + 'px';
});

// Add connection status indicator
function updateConnectionStatus(connected) {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        padding: 0.5rem 1rem;
        background: ${connected ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 20px;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 1000;
    `;
    indicator.innerHTML = `
        <span style="display: inline-block; width: 8px; height: 8px; background: white; border-radius: 50%; animation: ${connected ? 'pulse' : 'none'} 2s infinite;"></span>
        ${connected ? 'Connected' : 'Disconnected'}
    `;
    
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        indicator.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(indicator);
        }, 300);
    }, 2000);
}

// Check API connection on load
if (apiKey) {
    updateConnectionStatus(true);
}
