"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { TrendingUp } from "lucide-react";

export default function PushNarrativesPage() {
  const narratives = [
    {
      id: 1,
      title: "Bullish Bitcoin Breakout",
      description: "Promoting positive Bitcoin market sentiment",
      author: "BullishBob",
      date: "May 15, 2026",
      reach: "45K",
    },
    {
      id: 2,
      title: "DeFi Innovation Wave",
      description: "Highlighting new DeFi protocol launches",
      author: "DeFiPusher",
      date: "May 14, 2026",
      reach: "32K",
    },
    {
      id: 3,
      title: "Web3 Adoption Growth",
      description: "Promoting Web3 ecosystem expansion",
      author: "Web3Advocate",
      date: "May 13, 2026",
      reach: "28K",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Push Narratives</h1>
          <p className="text-slate-400">Create and promote market narratives</p>
        </div>

        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all">
          Create New Narrative
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {narratives.map((narrative) => (
            <div
              key={narrative.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{narrative.title}</h3>
              <p className="text-sm text-slate-400 mb-4">{narrative.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                <span>{narrative.author}</span>
                <span>{narrative.date}</span>
              </div>
              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <span className="text-sm text-slate-400 flex items-center gap-1">
                  <TrendingUp size={16} className="text-green-400" />
                  {narrative.reach} reach
                </span>
                <button className="text-blue-400 hover:text-blue-300 font-semibold text-sm">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
