// Discord Clone JavaScript - Valentino Demo

class DiscordClone {
    constructor() {
        this.currentServer = 'home';
        this.currentChannel = 'general';
        this.currentUser = 'valentino';
        this.isEmojiPickerOpen = false;
        this.contextMenuOpen = false;
        
        this.init();
    }

    init() {
        this.loadMembers();
        this.loadMessages();
        this.setupEventListeners();
        this.startTypingAnimation();
        this.updateOnlineCount();
    }

    setupEventListeners() {
        // Server switching
        document.querySelectorAll('.server-item[data-server]').forEach(server => {
            server.addEventListener('click', (e) => {
                this.switchServer(e.target.closest('.server-item').dataset.server);
            });
        });

        // Channel switching
        document.querySelectorAll('.channel-item[data-channel]').forEach(channel => {
            channel.addEventListener('click', (e) => {
                this.switchChannel(e.target.closest('.channel-item').dataset.channel);
            });
        });

        // Message input
        const messageInput = document.getElementById('message-input');
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Emoji picker
        document.querySelector('.fa-smile').addEventListener('click', () => {
            this.toggleEmojiPicker();
        });

        // Emoji categories
        document.querySelectorAll('.emoji-category').forEach(category => {
            category.addEventListener('click', (e) => {
                this.switchEmojiCategory(e.target.dataset.category);
            });
        });

        // Context menu
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.message')) {
                e.preventDefault();
                this.showContextMenu(e);
            }
        });

        // Close context menu and emoji picker on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.emoji-picker') && !e.target.closest('.fa-smile')) {
                this.closeEmojiPicker();
            }
            if (!e.target.closest('.context-menu')) {
                this.closeContextMenu();
            }
        });

        // Message reactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.reaction')) {
                this.toggleReaction(e.target.closest('.reaction'));
            }
        });

        // Image modal
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('message-image')) {
                this.openImageModal(e.target.src);
            }
        });

        // User controls
        document.querySelectorAll('.user-controls i').forEach(control => {
            control.addEventListener('click', (e) => {
                this.handleUserControl(e.target);
            });
        });

        // Header controls
        document.querySelectorAll('.header-controls i').forEach(control => {
            control.addEventListener('click', (e) => {
                this.handleHeaderControl(e.target);
            });
        });

        // Category toggles
        document.querySelectorAll('.category-header').forEach(header => {
            header.addEventListener('click', (e) => {
                this.toggleCategory(e.target.closest('.category'));
            });
        });
    }

    switchServer(serverId) {
        // Update active server
        document.querySelectorAll('.server-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-server="${serverId}"]`).classList.add('active');

        this.currentServer = serverId;
        
        // Update server name
        const serverName = mockData.servers[serverId]?.name || "Server";
        document.getElementById('server-name').textContent = serverName;

        // Switch to first channel of new server
        const firstChannel = Object.keys(mockData.servers[serverId]?.channels || {})[0];
        if (firstChannel) {
            this.switchChannel(firstChannel);
        }
    }

    switchChannel(channelId) {
        // Update active channel
        document.querySelectorAll('.channel-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-channel="${channelId}"]`)?.classList.add('active');

        this.currentChannel = channelId;
        
        // Update channel info
        document.getElementById('current-channel').textContent = channelId;
        
        // Update placeholder
        document.getElementById('message-input').placeholder = `Message #${channelId}`;

        // Load messages for this channel
        this.loadMessages();
    }

    loadMessages() {
        const messagesContainer = document.getElementById('messages-container');
        const messages = mockData.conversations[this.currentChannel] || [];
        
        messagesContainer.innerHTML = '';
        
        messages.forEach(message => {
            const messageElement = this.createMessageElement(message);
            messagesContainer.appendChild(messageElement);
        });

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.dataset.messageId = message.id;

        const user = mockData.users[message.author];
        const timestamp = this.formatTimestamp(message.timestamp);

        messageDiv.innerHTML = `
            <img src="${user.avatar}" alt="${user.username}" class="message-avatar">
            <div class="message-content">
                <div class="message-header">
                    <span class="message-author">${user.username}</span>
                    <span class="message-timestamp">${timestamp}</span>
                </div>
                <div class="message-text">${message.content}</div>
                ${message.image ? `<img src="${message.image}" alt="Message image" class="message-image">` : ''}
                ${this.createReactionsHTML(message.reactions || [])}
            </div>
        `;

        return messageDiv;
    }

    createReactionsHTML(reactions) {
        if (!reactions.length) return '';
        
        return `
            <div class="message-reactions">
                ${reactions.map(reaction => `
                    <div class="reaction ${reaction.users.includes(this.currentUser) ? 'reacted' : ''}" 
                         data-emoji="${reaction.emoji}">
                        <span>${reaction.emoji}</span>
                        <span>${reaction.count}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    sendMessage() {
        const input = document.getElementById('message-input');
        const content = input.value.trim();
        
        if (!content) return;

        const newMessage = {
            id: `msg_${Date.now()}`,
            author: this.currentUser,
            content: content,
            timestamp: new Date(),
            reactions: []
        };

        // Add to mock data
        if (!mockData.conversations[this.currentChannel]) {
            mockData.conversations[this.currentChannel] = [];
        }
        mockData.conversations[this.currentChannel].push(newMessage);

        // Create and add message element
        const messageElement = this.createMessageElement(newMessage);
        document.getElementById('messages-container').appendChild(messageElement);

        // Clear input and scroll to bottom
        input.value = '';
        const container = document.getElementById('messages-container');
        container.scrollTop = container.scrollHeight;

        // Simulate typing indicator and response
        this.simulateTypingResponse();
    }

    simulateTypingResponse() {
        // Randomly select a user to respond
        const users = Object.keys(mockData.users).filter(id => id !== this.currentUser);
        const randomUser = users[Math.floor(Math.random() * users.length)];
        
        // Show typing indicator
        this.showTypingIndicator(randomUser);

        // Send response after delay
        setTimeout(() => {
            this.hideTypingIndicator();
            this.sendAutoResponse(randomUser);
        }, 2000 + Math.random() * 3000);
    }

    sendAutoResponse(userId) {
        const responses = [
            "That's awesome! 🎉",
            "I totally agree with that",
            "Interesting point!",
            "Thanks for sharing!",
            "LOL that's hilarious 😂",
            "Great idea!",
            "I was just thinking the same thing",
            "Nice work!",
            "That looks amazing!",
            "Count me in!"
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];
        
        const newMessage = {
            id: `msg_${Date.now()}`,
            author: userId,
            content: response,
            timestamp: new Date(),
            reactions: []
        };

        mockData.conversations[this.currentChannel].push(newMessage);
        
        const messageElement = this.createMessageElement(newMessage);
        document.getElementById('messages-container').appendChild(messageElement);
        
        const container = document.getElementById('messages-container');
        container.scrollTop = container.scrollHeight;
    }

    showTypingIndicator(userId) {
        const user = mockData.users[userId];
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <img src="${user.avatar}" alt="${user.username}" class="message-avatar">
            <div class="message-content">
                <div class="message-header">
                    <span class="message-author">${user.username}</span>
                </div>
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;

        document.getElementById('messages-container').appendChild(typingDiv);
        
        const container = document.getElementById('messages-container');
        container.scrollTop = container.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    loadMembers() {
        const membersContainer = document.getElementById('members-container');
        const onlineUsers = Object.values(mockData.users).filter(user => user.status !== 'offline');
        
        membersContainer.innerHTML = '';
        
        onlineUsers.forEach(user => {
            const memberDiv = document.createElement('div');
            memberDiv.className = 'member-item';
            
            memberDiv.innerHTML = `
                <div class="member-avatar">
                    <img src="${user.avatar}" alt="${user.username}">
                    <div class="member-status ${user.status}"></div>
                </div>
                <div class="member-info">
                    <div class="member-name">${user.username}</div>
                    <div class="member-activity">${user.activity}</div>
                </div>
            `;
            
            membersContainer.appendChild(memberDiv);
        });
    }

    updateOnlineCount() {
        const onlineCount = Object.values(mockData.users).filter(user => user.status === 'online').length;
        document.getElementById('online-count').textContent = onlineCount;
    }

    toggleEmojiPicker() {
        const picker = document.getElementById('emoji-picker');
        
        if (this.isEmojiPickerOpen) {
            this.closeEmojiPicker();
        } else {
            picker.style.display = 'flex';
            this.isEmojiPickerOpen = true;
            this.loadEmojis('smileys');
        }
    }

    closeEmojiPicker() {
        document.getElementById('emoji-picker').style.display = 'none';
        this.isEmojiPickerOpen = false;
    }

    switchEmojiCategory(category) {
        document.querySelectorAll('.emoji-category').forEach(cat => {
            cat.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        this.loadEmojis(category);
    }

    loadEmojis(category) {
        const grid = document.getElementById('emoji-grid');
        const emojis = mockData.emojis[category] || [];
        
        grid.innerHTML = '';
        
        emojis.forEach(emoji => {
            const emojiDiv = document.createElement('div');
            emojiDiv.className = 'emoji-item';
            emojiDiv.textContent = emoji;
            emojiDiv.addEventListener('click', () => {
                this.insertEmoji(emoji);
            });
            
            grid.appendChild(emojiDiv);
        });
    }

    insertEmoji(emoji) {
        const input = document.getElementById('message-input');
        input.value += emoji;
        input.focus();
        this.closeEmojiPicker();
    }

    showContextMenu(event) {
        const contextMenu = document.getElementById('context-menu');
        contextMenu.style.display = 'block';
        contextMenu.style.left = event.pageX + 'px';
        contextMenu.style.top = event.pageY + 'px';
        this.contextMenuOpen = true;
    }

    closeContextMenu() {
        document.getElementById('context-menu').style.display = 'none';
        this.contextMenuOpen = false;
    }

    toggleReaction(reactionElement) {
        reactionElement.classList.toggle('reacted');
        
        const count = reactionElement.querySelector('span:last-child');
        let currentCount = parseInt(count.textContent);
        
        if (reactionElement.classList.contains('reacted')) {
            count.textContent = currentCount + 1;
        } else {
            count.textContent = Math.max(0, currentCount - 1);
        }
    }

    openImageModal(src) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            cursor: pointer;
        `;
        
        const img = document.createElement('img');
        img.src = src;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        `;
        
        modal.appendChild(img);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }

    handleUserControl(control) {
        const classes = control.className;
        
        if (classes.includes('fa-microphone')) {
            control.classList.toggle('muted');
            control.style.color = control.classList.contains('muted') ? '#ef4444' : '';
        } else if (classes.includes('fa-headphones')) {
            control.classList.toggle('deafened');
            control.style.color = control.classList.contains('deafened') ? '#ef4444' : '';
        } else if (classes.includes('fa-cog')) {
            this.showNotification('Settings panel would open here');
        }
    }

    handleHeaderControl(control) {
        const classes = control.className;
        
        if (classes.includes('fa-bell')) {
            this.showNotification('Notification settings');
        } else if (classes.includes('fa-thumbtack')) {
            this.showNotification('Pinned messages');
        } else if (classes.includes('fa-users')) {
            this.showNotification('Member list toggled');
        } else if (classes.includes('fa-search')) {
            this.showNotification('Search functionality');
        } else if (classes.includes('fa-inbox')) {
            this.showNotification('Inbox opened');
        } else if (classes.includes('fa-question-circle')) {
            this.showNotification('Help center');
        }
    }

    toggleCategory(category) {
        const icon = category.querySelector('.category-header i:first-child');
        const channels = category.querySelectorAll('.channel-item');
        
        icon.style.transform = icon.style.transform === 'rotate(90deg)' ? 'rotate(0deg)' : 'rotate(90deg)';
        
        channels.forEach(channel => {
            channel.style.display = channel.style.display === 'none' ? 'flex' : 'none';
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4c1d95;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    startTypingAnimation() {
        // Add CSS for typing animation
        const style = document.createElement('style');
        style.textContent = `
            .typing-dots {
                display: flex;
                gap: 2px;
                align-items: center;
                height: 20px;
            }
            
            .typing-dots span {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: #8b5cf6;
                animation: typing 1.4s infinite ease-in-out;
            }
            
            .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
            .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
            
            @keyframes typing {
                0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                40% { transform: scale(1); opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    formatTimestamp(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return 'now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        
        return timestamp.toLocaleDateString();
    }
}

// Initialize the Discord clone when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DiscordClone();
});
