"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { TrendingDown } from "lucide-react";

export default function PullNarrativesPage() {
  const narratives = [
    {
      id: 1,
      title: "Bitcoin Consolidation Phase",
      description: "Market analysis showing BTC consolidation patterns",
      author: "CryptoAnalyst",
      date: "May 15, 2026",
      views: "2.4K",
    },
    {
      id: 2,
      title: "DeFi Summer 2026 Outlook",
      description: "Predictions for the upcoming DeFi season",
      author: "DeFiGuru",
      date: "May 14, 2026",
      views: "1.8K",
    },
    {
      id: 3,
      title: "NFT Market Recovery Signals",
      description: "Technical analysis of NFT market trends",
      author: "NFTExpert",
      date: "May 13, 2026",
      views: "1.2K",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Pull Narratives</h1>
          <p className="text-slate-400">Discover market narratives and analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {narratives.map((narrative) => (
            <div
              key={narrative.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-purple-500 transition-all"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{narrative.title}</h3>
              <p className="text-sm text-slate-400 mb-4">{narrative.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{narrative.author}</span>
                <span>{narrative.date}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
                <span className="text-sm text-slate-400">{narrative.views} views</span>
                <button className="text-purple-400 hover:text-purple-300 font-semibold text-sm">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
