"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import Link from "next/link";
import { TrendingUp, Users, DollarSign, History } from "lucide-react";

export default function PromoterPage() {
  const stats = [
    { label: "Total Reach", value: "125.4K", icon: Users },
    { label: "Conversion Rate", value: "4.2%", icon: TrendingUp },
    { label: "Earnings", value: "$8,450", icon: DollarSign },
  ];

  const modules = [
    {
      title: "Stats Dashboard",
      description: "View your promoter statistics and performance metrics",
      href: "/promoter/stats",
      icon: TrendingUp,
    },
    {
      title: "Influencer Directory",
      description: "Browse and connect with top influencers",
      href: "/promoter/directory",
      icon: Users,
    },
    {
      title: "Rate & Terms",
      description: "Manage your rates and campaign terms",
      href: "/promoter/terms",
      icon: DollarSign,
    },
    {
      title: "Purchase History",
      description: "View your past campaigns and purchases",
      href: "/promoter/history",
      icon: History,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Promoter Dashboard</h1>
          <p className="text-slate-400">Manage your promotional campaigns and reach</p>
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
                  <div className="bg-purple-600 p-3 rounded-lg">
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
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 p-3 rounded-lg">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{module.title}</h3>
                    <p className="text-slate-400 text-sm">{module.description}</p>
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
