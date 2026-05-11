"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import Link from "next/link";
import { TrendingUp, Users, DollarSign, BarChart3 } from "lucide-react";

export default function InfluencerPage() {
  const stats = [
    { label: "Total Followers", value: "45.2K", icon: Users },
    { label: "Engagement Rate", value: "6.8%", icon: TrendingUp },
    { label: "Earnings", value: "$5,230", icon: DollarSign },
  ];

  const modules = [
    { title: "Stats Dashboard", href: "/influencer/stats", icon: BarChart3 },
    { title: "Main Channels", href: "/influencer/channels", icon: Users },
    { title: "Campaign History", href: "/influencer/campaigns", icon: TrendingUp },
    { title: "Rate & Terms", href: "/influencer/terms", icon: DollarSign },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Influencer Dashboard</h1>
          <p className="text-slate-400">Manage your influence and campaigns</p>
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
                  <div className="bg-blue-600 p-3 rounded-lg">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.href}
                href={module.href}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
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
