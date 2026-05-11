import { Header } from "@/components/header";
import Link from "next/link";

export default function Home() {
  const sections = [
    {
      title: "For Promoters",
      description: "Reach Out, Influence, Spread Faster",
      items: [
        "Find Influencers, Reach Faster",
        "Spread your message, Open Faster",
        "Track every metric, Optimize Faster",
      ],
      bgColor: "bg-green-100",
      borderColor: "border-green-300",
    },
    {
      title: "For Influencers",
      description: "Earn, Monetize, Influence",
      items: [
        "Exclusive Influencer Opportunities",
        "Earn from Campaigns, Bounties & More",
        "Track Earnings, Withdraw Anytime",
      ],
      bgColor: "bg-orange-100",
      borderColor: "border-orange-300",
    },
    {
      title: "For Recruiters",
      description: "Find, Recruit, Grow",
      items: [
        "Find Crypto Talent, Recruit Faster",
        "Build Your Team, Grow Faster",
        "Track Placements, Earn Bonuses",
      ],
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-300",
    },
    {
      title: "Earn",
      description: "Track Earnings, Withdraw Anytime",
      items: [
        "Quick Payout, Withdraw Anytime",
        "Track Earnings, Lifetime Stats",
        "Quick Payout, Withdraw Anytime",
      ],
      bgColor: "bg-blue-100",
      borderColor: "border-blue-300",
    },
  ];

  const stats = [
    { label: "Stat Status", icon: "📊" },
    { label: "Search Narratives", icon: "🔍" },
  ];

  const platforms = [
    { name: "Twitter", icon: "𝕏" },
    { name: "Reddit", icon: "🔴" },
    { name: "Facebook", icon: "f" },
    { name: "LinkedIn", icon: "in" },
    { name: "TikTok", icon: "♪" },
    { name: "YouTube", icon: "▶" },
    { name: "Discord", icon: "💬" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sections.map((section) => (
            <div
              key={section.title}
              className={`${section.bgColor} border-2 ${section.borderColor} rounded-lg p-6`}
            >
              <h3 className="font-bold text-lg mb-2 text-gray-800">{section.title}</h3>
              <p className="text-sm font-semibold text-gray-700 mb-4">{section.description}</p>
              <ul className="space-y-2">
                {section.items.map((item, idx) => (
                  <li key={idx} className="text-xs text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-blue-200 rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Stat Status</h4>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-semibold">
                  Subscribe
                </button>
                <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full text-sm font-semibold">
                  Unsubscribe
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-4">Search Narratives</h4>
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-4">Search by Platform</h4>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.name}
                    className="w-8 h-8 bg-white border border-gray-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 hover:bg-gray-100"
                    title={platform.name}
                  >
                    {platform.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
