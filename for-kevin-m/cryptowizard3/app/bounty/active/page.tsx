"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Clock, CheckCircle } from "lucide-react";

export default function ActiveBountiesPage() {
  const activeBounties = [
    {
      id: 1,
      title: "Write DeFi Protocol Review",
      reward: "$500",
      submitted: "May 10, 2026",
      status: "Under Review",
      progress: 75,
    },
    {
      id: 2,
      title: "Create NFT Art Collection",
      reward: "$1,200",
      submitted: "May 8, 2026",
      status: "In Progress",
      progress: 45,
    },
    {
      id: 3,
      title: "Social Media Campaign",
      reward: "$300",
      submitted: "May 12, 2026",
      status: "Pending Approval",
      progress: 90,
    },
    {
      id: 4,
      title: "Translate Whitepaper",
      reward: "$800",
      submitted: "May 5, 2026",
      status: "Under Review",
      progress: 60,
    },
    {
      id: 5,
      title: "Community Moderation",
      reward: "$400",
      submitted: "May 1, 2026",
      status: "In Progress",
      progress: 30,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Active Bounties</h1>
          <p className="text-slate-400">Track your current bounty submissions and progress</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {activeBounties.map((bounty) => (
            <div
              key={bounty.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{bounty.title}</h3>
                  <p className="text-sm text-slate-400">Submitted: {bounty.submitted}</p>
                </div>
                <span className="text-2xl font-bold text-yellow-400">{bounty.reward}</span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Progress</span>
                  <span className="text-sm font-semibold text-slate-300">{bounty.progress}%</span>
                </div>
                <div className="bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${bounty.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  bounty.status === "Under Review" ? "bg-blue-600/20 text-blue-300" :
                  bounty.status === "In Progress" ? "bg-yellow-600/20 text-yellow-300" :
                  "bg-green-600/20 text-green-300"
                }`}>
                  {bounty.status}
                </span>
                <button className="text-yellow-400 hover:text-yellow-300 font-semibold text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
