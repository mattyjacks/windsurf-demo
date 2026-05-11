"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Trophy, TrendingUp } from "lucide-react";

export default function TopPromotersPage() {
  const promoters = [
    {
      rank: 1,
      name: "CryptoMaster",
      earnings: "$45,230",
      campaigns: 28,
      roi: "342%",
      badge: "🥇",
    },
    {
      rank: 2,
      name: "BlockchainPro",
      earnings: "$38,450",
      campaigns: 24,
      roi: "298%",
      badge: "🥈",
    },
    {
      rank: 3,
      name: "DeFiKing",
      earnings: "$32,100",
      campaigns: 21,
      roi: "276%",
      badge: "🥉",
    },
    {
      rank: 4,
      name: "NFTWizard",
      earnings: "$28,750",
      campaigns: 18,
      roi: "245%",
      badge: "4️⃣",
    },
    {
      rank: 5,
      name: "TokenMaster",
      earnings: "$25,600",
      campaigns: 16,
      roi: "234%",
      badge: "5️⃣",
    },
    {
      rank: 6,
      name: "CryptoGuru",
      earnings: "$22,300",
      campaigns: 14,
      roi: "212%",
      badge: "6️⃣",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Top Promoters</h1>
          <p className="text-slate-400">Highest earning promoters this month</p>
        </div>

        <div className="space-y-3">
          {promoters.map((promoter) => (
            <div
              key={promoter.rank}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-purple-500 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-3xl">{promoter.badge}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{promoter.name}</h3>
                    <p className="text-sm text-slate-400">{promoter.campaigns} campaigns</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-400 mb-1">{promoter.earnings}</p>
                  <div className="flex items-center gap-1 justify-end text-green-400">
                    <TrendingUp size={16} />
                    <span className="text-sm font-semibold">{promoter.roi}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
