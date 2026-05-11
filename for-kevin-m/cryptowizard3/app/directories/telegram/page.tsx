"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Send, Users, TrendingUp } from "lucide-react";

export default function TelegramDirectoryPage() {
  const groups = [
    {
      id: 1,
      name: "Crypto Trading Signals",
      description: "Real-time trading signals and market analysis",
      members: "32.5K",
      growth: "+8%",
      link: "https://t.me/cryptotradingsignals",
    },
    {
      id: 2,
      name: "DeFi Community Hub",
      description: "Discussion about DeFi protocols and opportunities",
      members: "28.3K",
      growth: "+12%",
      link: "https://t.me/deficommunity",
    },
    {
      id: 3,
      name: "NFT Collectors",
      description: "NFT news, drops, and collector discussions",
      members: "19.8K",
      growth: "+15%",
      link: "https://t.me/nftcollectors",
    },
    {
      id: 4,
      name: "Altcoin Gems",
      description: "Discovery of emerging altcoins and projects",
      members: "24.1K",
      growth: "+10%",
      link: "https://t.me/altcoingems",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Telegram Groups Directory</h1>
          <p className="text-slate-400">Find Telegram groups for crypto news, trading, and networking</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{group.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{group.description}</p>

              <div className="flex items-center gap-6 mb-4 py-4 border-y border-slate-700">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-slate-400" />
                  <span className="text-sm text-slate-300">{group.members} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-green-400" />
                  <span className="text-sm text-green-400 font-semibold">{group.growth}</span>
                </div>
              </div>

              <a
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Send size={18} />
                Join Group
              </a>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
