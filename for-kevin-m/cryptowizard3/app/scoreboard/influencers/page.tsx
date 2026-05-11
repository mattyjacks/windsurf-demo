"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Users, Star } from "lucide-react";

export default function TopInfluencersPage() {
  const influencers = [
    {
      rank: 1,
      name: "CryptoKing",
      followers: "245K",
      engagement: "8.5%",
      campaigns: 34,
      rating: 4.9,
      badge: "🥇",
    },
    {
      rank: 2,
      name: "BlockchainBabe",
      followers: "189K",
      engagement: "7.2%",
      campaigns: 28,
      rating: 4.8,
      badge: "🥈",
    },
    {
      rank: 3,
      name: "NFTNinja",
      followers: "156K",
      engagement: "9.1%",
      campaigns: 25,
      rating: 4.7,
      badge: "🥉",
    },
    {
      rank: 4,
      name: "AltcoinAlice",
      followers: "128K",
      engagement: "6.8%",
      campaigns: 21,
      rating: 4.6,
      badge: "4️⃣",
    },
    {
      rank: 5,
      name: "TokenTom",
      followers: "98K",
      engagement: "7.5%",
      campaigns: 18,
      rating: 4.5,
      badge: "5️⃣",
    },
    {
      rank: 6,
      name: "WalletWanda",
      followers: "87K",
      engagement: "8.2%",
      campaigns: 16,
      rating: 4.4,
      badge: "6️⃣",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Top Influencers</h1>
          <p className="text-slate-400">Most engaged influencers on the platform</p>
        </div>

        <div className="space-y-3">
          {influencers.map((influencer) => (
            <div
              key={influencer.rank}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-3xl">{influencer.badge}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{influencer.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {influencer.followers}
                      </span>
                      <span>{influencer.campaigns} campaigns</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(influencer.rating) ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}
                      />
                    ))}
                  </div>
                  <p className="text-lg font-bold text-blue-400">{influencer.engagement} engagement</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
