// Mock data for the real estate dashboard

const mockData = {
    properties: [
        {
            id: 1,
            title: "Oceanfront Villa",
            location: "Portsmouth, NH",
            price: "$1,250,000",
            image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
            bedrooms: 4,
            bathrooms: 3,
            sqft: 3200,
            type: "Villa",
            status: "For Sale",
            daysOnMarket: 12,
            description: "Stunning oceanfront villa with panoramic views of the Atlantic Ocean."
        },
        {
            id: 2,
            title: "Coastal Cottage",
            location: "Hampton Beach, NH",
            price: "$675,000",
            image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
            bedrooms: 3,
            bathrooms: 2,
            sqft: 1800,
            type: "Cottage",
            status: "For Sale",
            daysOnMarket: 8,
            description: "Charming coastal cottage just steps from the beach."
        },
        {
            id: 3,
            title: "Modern Beachhouse",
            location: "Rye, NH",
            price: "$950,000",
            image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
            bedrooms: 3,
            bathrooms: 2.5,
            sqft: 2400,
            type: "House",
            status: "Under Contract",
            daysOnMarket: 5,
            description: "Contemporary design meets coastal living in this stunning beachhouse."
        },
        {
            id: 4,
            title: "Seaside Condo",
            location: "Portsmouth, NH",
            price: "$425,000",
            image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
            bedrooms: 2,
            bathrooms: 2,
            sqft: 1200,
            type: "Condo",
            status: "For Sale",
            daysOnMarket: 18,
            description: "Luxury condo with harbor views and modern amenities."
        },
        {
            id: 5,
            title: "Historic Harbor Home",
            location: "Portsmouth, NH",
            price: "$1,100,000",
            image: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
            bedrooms: 4,
            bathrooms: 3.5,
            sqft: 2800,
            type: "Historic",
            status: "Sold",
            daysOnMarket: 3,
            description: "Beautifully restored historic home in the heart of Portsmouth's harbor district."
        },
        {
            id: 6,
            title: "Waterfront Townhouse",
            location: "Hampton Beach, NH",
            price: "$780,000",
            image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
            bedrooms: 3,
            bathrooms: 2.5,
            sqft: 2000,
            type: "Townhouse",
            status: "For Sale",
            daysOnMarket: 25,
            description: "Elegant townhouse with private dock and water access."
        }
    ],

    appointments: [
        {
            id: 1,
            time: "9:00 AM",
            title: "Property Showing",
            client: "John & Sarah Miller",
            property: "Oceanfront Villa",
            type: "showing",
            duration: "1 hour"
        },
        {
            id: 2,
            time: "11:30 AM",
            title: "Client Consultation",
            client: "Michael Rodriguez",
            property: "New Listing Discussion",
            type: "consultation",
            duration: "45 minutes"
        },
        {
            id: 3,
            time: "2:00 PM",
            title: "Home Inspection",
            client: "Emma Thompson",
            property: "Coastal Cottage",
            type: "inspection",
            duration: "2 hours"
        },
        {
            id: 4,
            time: "4:30 PM",
            title: "Closing Meeting",
            client: "David & Lisa Chen",
            property: "Historic Harbor Home",
            type: "closing",
            duration: "1.5 hours"
        },
        {
            id: 5,
            time: "6:00 PM",
            title: "Market Analysis",
            client: "Robert Johnson",
            property: "Investment Portfolio Review",
            type: "analysis",
            duration: "1 hour"
        }
    ],

    activities: [
        {
            id: 1,
            type: "new-listing",
            icon: "fas fa-plus",
            text: "New listing added: Oceanfront Villa in Portsmouth",
            time: "2 hours ago",
            user: "Sarah Johnson"
        },
        {
            id: 2,
            type: "showing",
            icon: "fas fa-eye",
            text: "Property showing scheduled for Coastal Cottage",
            time: "3 hours ago",
            user: "Mike Davis"
        },
        {
            id: 3,
            type: "offer",
            icon: "fas fa-handshake",
            text: "Offer received on Modern Beachhouse ($920,000)",
            time: "5 hours ago",
            user: "Emma Wilson"
        },
        {
            id: 4,
            type: "new-listing",
            icon: "fas fa-plus",
            text: "Client consultation completed with Rodriguez family",
            time: "1 day ago",
            user: "Sarah Johnson"
        },
        {
            id: 5,
            type: "showing",
            icon: "fas fa-eye",
            text: "Virtual tour created for Seaside Condo",
            time: "1 day ago",
            user: "Alex Thompson"
        },
        {
            id: 6,
            type: "offer",
            icon: "fas fa-handshake",
            text: "Historic Harbor Home sold for $1,100,000",
            time: "2 days ago",
            user: "Sarah Johnson"
        }
    ],

    marketData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Average Price ($K)',
                data: [720, 750, 780, 820, 840, 847],
                borderColor: '#1e40af',
                backgroundColor: 'rgba(30, 64, 175, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Properties Sold',
                data: [12, 15, 18, 22, 25, 28],
                borderColor: '#0ea5e9',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    },

    clients: [
        {
            id: 1,
            name: "John & Sarah Miller",
            email: "john.miller@email.com",
            phone: "(603) 555-0123",
            status: "Active Buyer",
            budget: "$800K - $1.2M",
            preferences: "Oceanfront, 3+ bedrooms",
            lastContact: "2024-07-28",
            avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
        },
        {
            id: 2,
            name: "Michael Rodriguez",
            email: "m.rodriguez@email.com",
            phone: "(603) 555-0456",
            status: "Potential Seller",
            budget: "N/A",
            preferences: "Market analysis needed",
            lastContact: "2024-07-27",
            avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
        },
        {
            id: 3,
            name: "Emma Thompson",
            email: "emma.t@email.com",
            phone: "(603) 555-0789",
            status: "Under Contract",
            budget: "$600K - $750K",
            preferences: "Cottage style, near beach",
            lastContact: "2024-07-29",
            avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
        },
        {
            id: 4,
            name: "David & Lisa Chen",
            email: "chen.family@email.com",
            phone: "(603) 555-0321",
            status: "Closing Soon",
            budget: "$1M - $1.3M",
            preferences: "Historic properties",
            lastContact: "2024-07-29",
            avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
        }
    ],

    performanceMetrics: {
        clientSatisfaction: 94,
        avgDaysToClose: 18,
        averageRating: 4.9,
        totalSales: 15.2,
        activeListings: 127,
        propertiesSold: 89
    },

    locations: [
        {
            name: "Portsmouth",
            properties: 12,
            avgPrice: "$890K",
            coordinates: { lat: 43.0717, lng: -70.7626 }
        },
        {
            name: "Hampton Beach",
            properties: 8,
            avgPrice: "$720K",
            coordinates: { lat: 42.9097, lng: -70.8119 }
        },
        {
            name: "Rye",
            properties: 15,
            avgPrice: "$950K",
            coordinates: { lat: 43.0148, lng: -70.7648 }
        },
        {
            name: "New Castle",
            properties: 6,
            avgPrice: "$1.2M",
            coordinates: { lat: 43.0626, lng: -70.7176 }
        },
        {
            name: "Seabrook",
            properties: 9,
            avgPrice: "$650K",
            coordinates: { lat: 42.8942, lng: -70.8717 }
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = mockData;
}
