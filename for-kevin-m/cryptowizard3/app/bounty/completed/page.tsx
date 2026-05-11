"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CheckCircle, DollarSign } from "lucide-react";

export default function CompletedBountiesPage() {
  const completedBounties = [
    {
      id: 1,
      title: "Write Blog Post on Bitcoin",
      reward: "$250",
      completedDate: "May 1, 2026",
      rating: 5,
    },
    {
      id: 2,
      title: "Create Trading Bot Guide",
      reward: "$400",
      completedDate: "Apr 28, 2026",
      rating: 5,
    },
    {
      id: 3,
      title: "Design Crypto Infographic",
      reward: "$300",
      completedDate: "Apr 25, 2026",
      rating: 4,
    },
    {
      id: 4,
      title: "Moderate Discord Channel",
      reward: "$200",
      completedDate: "Apr 20, 2026",
      rating: 5,
    },
    {
      id: 5,
      title: "Translate Documentation",
      reward: "$350",
      completedDate: "Apr 15, 2026",
      rating: 4,
    },
    {
      id: 6,
      title: "Create Tutorial Video",
      reward: "$500",
      completedDate: "Apr 10, 2026",
      rating: 5,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Completed Bounties</h1>
          <p className="text-slate-400">View your completed bounties and earnings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Total Completed</p>
            <p className="text-3xl font-bold text-white">42</p>
            <p className="text-xs text-slate-500 mt-2">Bounties</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Total Earned</p>
            <p className="text-3xl font-bold text-green-400">$8,450</p>
            <p className="text-xs text-slate-500 mt-2">All time</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Average Rating</p>
            <p className="text-3xl font-bold text-yellow-400">4.8</p>
            <p className="text-xs text-slate-500 mt-2">Out of 5</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {completedBounties.map((bounty) => (
            <div
              key={bounty.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{bounty.title}</h3>
                  <p className="text-sm text-slate-400">Completed: {bounty.completedDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400 mb-2">{bounty.reward}</p>
                  <div className="flex items-center gap-1 justify-end">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={i < bounty.rating ? "text-yellow-400" : "text-slate-600"}
                      >
                        ★
                      </span>
                    ))}
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
