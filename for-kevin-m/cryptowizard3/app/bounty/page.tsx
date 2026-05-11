"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import Link from "next/link";
import { Trophy, CheckCircle, Clock, Plus } from "lucide-react";

export default function BountyPage() {
  const modules = [
    {
      title: "Bounty Board",
      description: "Browse all available bounties and opportunities",
      href: "/bounty/board",
      icon: Trophy,
      count: "234 active",
    },
    {
      title: "My Active Bounties",
      description: "Track your current bounty submissions",
      href: "/bounty/active",
      icon: Clock,
      count: "5 in progress",
    },
    {
      title: "Completed Bounties",
      description: "View your completed bounties and earnings",
      href: "/bounty/completed",
      icon: CheckCircle,
      count: "42 completed",
    },
    {
      title: "Place Bounty",
      description: "Create a new bounty for others to complete",
      href: "/bounty/place",
      icon: Plus,
      count: "Create new",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Bounties & Ads</h1>
          <p className="text-slate-400">Earn rewards by completing bounties or place your own</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.href}
                href={module.href}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-yellow-500 transition-all hover:shadow-lg hover:shadow-yellow-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-600 p-3 rounded-lg">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{module.title}</h3>
                    <p className="text-sm text-slate-400 mb-4">{module.description}</p>
                    <p className="text-xs text-yellow-400 font-semibold">{module.count}</p>
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
