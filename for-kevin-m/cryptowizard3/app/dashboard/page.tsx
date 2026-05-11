"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Earnings",
      value: "$12,450.50",
      change: "+12.5%",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
    },
    {
      label: "Active Campaigns",
      value: "8",
      change: "+2 this week",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-600",
    },
    {
      label: "Total Followers",
      value: "45.2K",
      change: "+5.2K",
      icon: Users,
      color: "from-purple-500 to-pink-600",
    },
    {
      label: "Conversion Rate",
      value: "3.24%",
      change: "+0.5%",
      icon: BarChart3,
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-slate-400">Here's your crypto marketplace dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="text-xs font-semibold text-green-400">{stat.change}</span>
                </div>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: "Campaign completed", time: "2 hours ago", status: "success" },
                { action: "New bounty placed", time: "5 hours ago", status: "info" },
                { action: "Payout processed", time: "1 day ago", status: "success" },
                { action: "Profile updated", time: "3 days ago", status: "info" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                  <span className="text-slate-300">{item.action}</span>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all">
                Start New Campaign
              </button>
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all">
                Place Bounty
              </button>
              <button className="w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold py-3 rounded-lg transition-all">
                View Earnings
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
