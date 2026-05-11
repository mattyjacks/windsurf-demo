"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import Link from "next/link";
import { TrendingUp, DollarSign, Share2 } from "lucide-react";

export default function RecruiterPage() {
  const stats = [
    { label: "Total Placements", value: "156", icon: TrendingUp },
    { label: "Earnings", value: "$52,400", icon: DollarSign },
    { label: "Success Rate", value: "94%", icon: Share2 },
  ];

  const modules = [
    { title: "Stats Dashboard", href: "/recruiter/stats", icon: TrendingUp },
    { title: "Earnings", href: "/recruiter/earnings", icon: DollarSign },
    { title: "Referral Link & QR", href: "/recruiter/referral", icon: Share2 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Recruiter Dashboard</h1>
          <p className="text-slate-400">Manage your recruitment and referrals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.href}
                href={module.href}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-green-500 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
