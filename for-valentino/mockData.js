// Mock Data for Discord Clone - Valentino Demo

const mockData = {
    servers: {
        home: {
            name: "Valentino's Server",
            channels: {
                general: {
                    name: "general",
                    type: "text",
                    description: "General discussion for everyone"
                },
                random: {
                    name: "random",
                    type: "text",
                    description: "Random conversations and off-topic discussions"
                },
                memes: {
                    name: "memes",
                    type: "text",
                    description: "Share your favorite memes here"
                },
                lounge: {
                    name: "General Lounge",
                    type: "voice",
                    description: "Voice chat for casual conversations"
                },
                gaming: {
                    name: "Gaming Room",
                    type: "voice",
                    description: "Voice chat for gaming sessions"
                }
            }
        },
        gaming: {
            name: "Gaming Central",
            channels: {
                announcements: { name: "announcements", type: "text", description: "Important gaming announcements" },
                general: { name: "general-gaming", type: "text", description: "General gaming discussions" },
                lfg: { name: "looking-for-group", type: "text", description: "Find teammates and groups" }
            }
        },
        music: {
            name: "Music Lovers",
            channels: {
                general: { name: "music-chat", type: "text", description: "Discuss your favorite music" },
                recommendations: { name: "recommendations", type: "text", description: "Share music recommendations" }
            }
        },
        tech: {
            name: "Tech Hub",
            channels: {
                general: { name: "tech-talk", type: "text", description: "Technology discussions" },
                help: { name: "tech-support", type: "text", description: "Get help with technical issues" }
            }
        },
        art: {
            name: "Art Gallery",
            channels: {
                showcase: { name: "art-showcase", type: "text", description: "Show off your artwork" },
                feedback: { name: "feedback", type: "text", description: "Get feedback on your art" }
            }
        }
    },

    users: {
        valentino: {
            id: "valentino",
            username: "Valentino",
            avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
            status: "online",
            activity: "Creating Discord Clone"
        },
        alex: {
            id: "alex",
            username: "AlexGamer",
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
            status: "online",
            activity: "Playing Valorant"
        },
        sarah: {
            id: "sarah",
            username: "SarahDesign",
            avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
            status: "idle",
            activity: "Working on UI/UX"
        },
        mike: {
            id: "mike",
            username: "MikeCode",
            avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
            status: "dnd",
            activity: "Coding React App"
        },
        emma: {
            id: "emma",
            username: "EmmaArt",
            avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
            status: "online",
            activity: "Digital Painting"
        },
        david: {
            id: "david",
            username: "DavidMusic",
            avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
            status: "online",
            activity: "Listening to Spotify"
        },
        lisa: {
            id: "lisa",
            username: "LisaTech",
            avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
            status: "offline",
            activity: "Last seen 2 hours ago"
        },
        james: {
            id: "james",
            username: "JamesStream",
            avatar: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
            status: "online",
            activity: "Streaming on Twitch"
        }
    },

    conversations: {
        general: [
            {
                id: "msg1",
                author: "alex",
                content: "Hey everyone! Just finished an amazing game of Valorant. Anyone else playing?",
                timestamp: new Date(Date.now() - 300000), // 5 minutes ago
                reactions: [
                    { emoji: "🎮", count: 3, users: ["sarah", "mike", "emma"] },
                    { emoji: "🔥", count: 2, users: ["david", "james"] }
                ]
            },
            {
                id: "msg2",
                author: "sarah",
                content: "Nice! I've been working on some new UI designs. Check this out:",
                timestamp: new Date(Date.now() - 240000), // 4 minutes ago
                image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                reactions: [
                    { emoji: "😍", count: 4, users: ["valentino", "emma", "david", "alex"] },
                    { emoji: "👏", count: 2, users: ["mike", "james"] }
                ]
            },
            {
                id: "msg3",
                author: "mike",
                content: "That looks incredible Sarah! The color scheme is perfect. What tools are you using?",
                timestamp: new Date(Date.now() - 180000), // 3 minutes ago
                reactions: [
                    { emoji: "👍", count: 1, users: ["sarah"] }
                ]
            },
            {
                id: "msg4",
                author: "emma",
                content: "I love the gradient effects! Been working on some digital art myself. Here's my latest piece:",
                timestamp: new Date(Date.now() - 120000), // 2 minutes ago
                image: "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                reactions: [
                    { emoji: "🎨", count: 5, users: ["valentino", "sarah", "david", "alex", "james"] }
                ]
            },
            {
                id: "msg5",
                author: "david",
                content: "Amazing artwork Emma! Speaking of creativity, I just discovered this incredible new album. The production quality is insane! 🎵",
                timestamp: new Date(Date.now() - 60000), // 1 minute ago
                reactions: [
                    { emoji: "🎵", count: 2, users: ["emma", "james"] }
                ]
            },
            {
                id: "msg6",
                author: "james",
                content: "You all are so talented! I'm about to start my stream in a few minutes. Come hang out if you want to see some epic gaming fails 😂",
                timestamp: new Date(Date.now() - 30000), // 30 seconds ago
                reactions: [
                    { emoji: "😂", count: 3, users: ["alex", "mike", "david"] }
                ]
            }
        ],

        random: [
            {
                id: "rmsg1",
                author: "mike",
                content: "Random thought: Why do we call it 'rush hour' when nobody's moving? 🤔",
                timestamp: new Date(Date.now() - 3600000), // 1 hour ago
                reactions: [
                    { emoji: "🤔", count: 4, users: ["alex", "sarah", "emma", "david"] },
                    { emoji: "😂", count: 2, users: ["james", "valentino"] }
                ]
            },
            {
                id: "rmsg2",
                author: "emma",
                content: "Just saw the most beautiful sunset! Had to capture it:",
                timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
                image: "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                reactions: [
                    { emoji: "🌅", count: 6, users: ["valentino", "sarah", "mike", "david", "alex", "james"] }
                ]
            },
            {
                id: "rmsg3",
                author: "david",
                content: "Coffee or tea? I'm team coffee all the way ☕",
                timestamp: new Date(Date.now() - 2400000), // 40 minutes ago
                reactions: [
                    { emoji: "☕", count: 4, users: ["mike", "alex", "james", "valentino"] },
                    { emoji: "🍵", count: 2, users: ["sarah", "emma"] }
                ]
            }
        ],

        memes: [
            {
                id: "mmsg1",
                author: "alex",
                content: "When you finally fix a bug that's been bothering you for hours:",
                timestamp: new Date(Date.now() - 7200000), // 2 hours ago
                image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                reactions: [
                    { emoji: "😂", count: 8, users: ["valentino", "mike", "sarah", "emma", "david", "james", "lisa"] },
                    { emoji: "💯", count: 3, users: ["mike", "david", "james"] }
                ]
            },
            {
                id: "mmsg2",
                author: "james",
                content: "Me trying to explain my code to someone else:",
                timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
                image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
                reactions: [
                    { emoji: "🤣", count: 7, users: ["valentino", "alex", "mike", "sarah", "emma", "david"] }
                ]
            },
            {
                id: "mmsg3",
                author: "sarah",
                content: "Designer problems: When the client says 'make it pop' 🎨",
                timestamp: new Date(Date.now() - 3600000), // 1 hour ago
                reactions: [
                    { emoji: "😅", count: 5, users: ["emma", "mike", "david", "alex", "james"] },
                    { emoji: "🎨", count: 2, users: ["emma", "valentino"] }
                ]
            }
        ]
    },

    emojis: {
        smileys: ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥"],
        people: ["👋", "🤚", "🖐", "✋", "🖖", "👌", "🤏", "✌", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝", "👍", "👎", "👊", "✊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻"],
        nature: ["🌱", "🌿", "🍀", "🍃", "🍂", "🍁", "🌾", "🌴", "🌲", "🌳", "🌰", "🌸", "🌺", "🌻", "🌹", "🥀", "🌷", "🌼", "🌵", "🎋", "🎍", "🍄", "🌰", "🐚", "🌊", "💧", "💦", "☔", "⛈", "🌤", "⛅", "☁", "🌫", "🌪", "🌈", "☀", "🌞", "🌝", "🌛"],
        food: ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶", "🫑", "🌽", "🥕", "🫒", "🧄", "🧅", "🥔", "🍠", "🥐", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳", "🧈"],
        activities: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🪃", "🥅", "⛳", "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛷", "⛸", "🥌", "🎿", "⛷", "🏂", "🪂", "🏋", "🤼", "🤸", "⛹", "🤺"],
        travel: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎", "🚓", "🚑", "🚒", "🚐", "🛻", "🚚", "🚛", "🚜", "🏍", "🛵", "🚲", "🛴", "🛹", "🛼", "🚁", "🛸", "✈", "🛩", "🛫", "🛬", "🪂", "💺", "🚀", "🛰", "🚢", "⛵", "🚤", "🛥", "🛳", "⛴", "🚂", "🚃", "🚄", "🚅"],
        objects: ["💡", "🔦", "🕯", "🪔", "🧯", "🛢", "💸", "💵", "💴", "💶", "💷", "🪙", "💰", "💳", "💎", "⚖", "🪜", "🧰", "🔧", "🔨", "⚒", "🛠", "⛏", "🪓", "🪚", "🔩", "⚙", "🪤", "🧱", "⛓", "🧲", "🔫", "💣", "🧨", "🪓", "🔪", "🗡", "⚔", "🛡", "🚬"],
        symbols: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐"]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = mockData;
}
