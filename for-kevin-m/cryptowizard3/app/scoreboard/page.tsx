"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import Link from "next/link";
import { Trophy, Users, Briefcase } from "lucide-react";

export default function ScoreboardPage() {
  const leaderboards = [
    {
      title: "Top Promoters",
      description: "Highest earning promoters this month",
      href: "/scoreboard/promoters",
      icon: Trophy,
    },
    {
      title: "Top Influencers",
      description: "Most engaged influencers",
      href: "/scoreboard/influencers",
      icon: Users,
    },
    {
      title: "Top Recruiters",
      description: "Best performing recruiters",
      href: "/scoreboard/recruiters",
      icon: Briefcase,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Scoreboard</h1>
          <p className="text-slate-400">View top performers across all roles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaderboards.map((board) => {
            const Icon = board.icon;
            return (
              <Link
                key={board.href}
                href={board.href}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 p-3 rounded-lg">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{board.title}</h3>
                    <p className="text-sm text-slate-400">{board.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
