"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Briefcase, TrendingUp } from "lucide-react";

export default function TopRecruitersPage() {
  const recruiters = [
    {
      rank: 1,
      name: "TalentHunter",
      placements: 156,
      earnings: "$52,400",
      successRate: "94%",
      badge: "🥇",
    },
    {
      rank: 2,
      name: "CareerBuilder",
      placements: 142,
      earnings: "$48,200",
      successRate: "91%",
      badge: "🥈",
    },
    {
      rank: 3,
      name: "RecruitPro",
      placements: 128,
      earnings: "$43,800",
      successRate: "89%",
      badge: "🥉",
    },
    {
      rank: 4,
      name: "TechRecruiter",
      placements: 115,
      earnings: "$39,100",
      successRate: "87%",
      badge: "4️⃣",
    },
    {
      rank: 5,
      name: "JobMaster",
      placements: 98,
      earnings: "$33,400",
      successRate: "85%",
      badge: "5️⃣",
    },
    {
      rank: 6,
      name: "TalentConnect",
      placements: 87,
      earnings: "$29,600",
      successRate: "83%",
      badge: "6️⃣",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Top Recruiters</h1>
          <p className="text-slate-400">Best performing recruiters on the platform</p>
        </div>

        <div className="space-y-3">
          {recruiters.map((recruiter) => (
            <div
              key={recruiter.rank}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-green-500 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-3xl">{recruiter.badge}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{recruiter.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} />
                        {recruiter.placements} placements
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400 mb-1">{recruiter.earnings}</p>
                  <div className="flex items-center gap-1 justify-end text-blue-400">
                    <TrendingUp size={16} />
                    <span className="text-sm font-semibold">{recruiter.successRate}</span>
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
