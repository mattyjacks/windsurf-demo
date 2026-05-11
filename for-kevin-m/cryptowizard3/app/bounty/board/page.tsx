"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Trophy, Users, DollarSign } from "lucide-react";

export default function BountyBoardPage() {
  const bounties = [
    {
      id: 1,
      title: "Write DeFi Protocol Review",
      description: "Comprehensive review of new DeFi protocol",
      reward: "$500",
      submissions: 12,
      deadline: "May 25, 2026",
      difficulty: "Medium",
    },
    {
      id: 2,
      title: "Create NFT Art Collection",
      description: "Design 10 unique NFT artworks",
      reward: "$1,200",
      submissions: 8,
      deadline: "Jun 1, 2026",
      difficulty: "Hard",
    },
    {
      id: 3,
      title: "Bug Bounty - Smart Contract",
      description: "Find vulnerabilities in smart contract",
      reward: "$2,000",
      submissions: 3,
      deadline: "May 30, 2026",
      difficulty: "Hard",
    },
    {
      id: 4,
      title: "Social Media Campaign",
      description: "Create viral crypto content",
      reward: "$300",
      submissions: 24,
      deadline: "May 20, 2026",
      difficulty: "Easy",
    },
    {
      id: 5,
      title: "Translate Whitepaper",
      description: "Translate whitepaper to 5 languages",
      reward: "$800",
      submissions: 6,
      deadline: "Jun 5, 2026",
      difficulty: "Medium",
    },
    {
      id: 6,
      title: "Community Moderation",
      description: "Moderate Discord server for 1 month",
      reward: "$400",
      submissions: 15,
      deadline: "Jun 30, 2026",
      difficulty: "Easy",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-600/20 text-green-300";
      case "Medium":
        return "bg-yellow-600/20 text-yellow-300";
      case "Hard":
        return "bg-red-600/20 text-red-300";
      default:
        return "bg-slate-600/20 text-slate-300";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Bounty Board</h1>
          <p className="text-slate-400">Browse all available bounties and opportunities</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {bounties.map((bounty) => (
            <div
              key={bounty.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-yellow-500 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{bounty.title}</h3>
                  <p className="text-sm text-slate-400">{bounty.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(bounty.difficulty)}`}>
                  {bounty.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-6 py-4 border-y border-slate-700 mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-yellow-400" />
                  <span className="text-lg font-bold text-yellow-400">{bounty.reward}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-slate-400" />
                  <span className="text-sm text-slate-300">{bounty.submissions} submissions</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <Trophy size={18} className="text-slate-400" />
                  <span className="text-sm text-slate-400">Deadline: {bounty.deadline}</span>
                </div>
              </div>

              <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-lg transition-all">
                View Details & Submit
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
