"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Users, Star, TrendingUp } from "lucide-react";

export default function PromoterDirectoryPage() {
  const influencers = [
    {
      id: 1,
      name: "CryptoKing",
      followers: "245K",
      engagement: "8.5%",
      category: "Trading",
      rate: "$5,000",
      rating: 4.9,
    },
    {
      id: 2,
      name: "BlockchainBabe",
      followers: "189K",
      engagement: "7.2%",
      category: "DeFi",
      rate: "$3,500",
      rating: 4.8,
    },
    {
      id: 3,
      name: "NFTNinja",
      followers: "156K",
      engagement: "9.1%",
      category: "NFTs",
      rate: "$4,200",
      rating: 4.7,
    },
    {
      id: 4,
      name: "AltcoinAlice",
      followers: "128K",
      engagement: "6.8%",
      category: "Altcoins",
      rate: "$2,800",
      rating: 4.6,
    },
    {
      id: 5,
      name: "TokenTom",
      followers: "98K",
      engagement: "7.5%",
      category: "Tokens",
      rate: "$2,200",
      rating: 4.5,
    },
    {
      id: 6,
      name: "WalletWanda",
      followers: "87K",
      engagement: "8.2%",
      category: "Security",
      rate: "$1,800",
      rating: 4.4,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Influencer Directory</h1>
          <p className="text-slate-400">Browse and connect with top crypto influencers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {influencers.map((influencer) => (
            <div
              key={influencer.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-purple-500 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{influencer.name}</h3>
                  <p className="text-sm text-slate-400">{influencer.category}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-white">{influencer.rating}</span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-300">{influencer.followers} followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-300">{influencer.engagement} engagement</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <span className="text-lg font-bold text-purple-400">{influencer.rate}</span>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
