"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import Link from "next/link";
import { DollarSign, TrendingUp, Clock, Settings } from "lucide-react";

export default function EarningsPage() {
  const modules = [
    {
      title: "Current Balance",
      description: "Your available balance ready to withdraw",
      href: "/earnings/balance",
      icon: DollarSign,
      value: "$3,450.50",
    },
    {
      title: "Lifetime Earnings",
      description: "Total earnings since account creation",
      href: "/earnings/lifetime",
      icon: TrendingUp,
      value: "$42,850.00",
    },
    {
      title: "Pending Payouts",
      description: "Earnings awaiting processing",
      href: "/earnings/pending",
      icon: Clock,
      value: "$1,200.00",
    },
    {
      title: "Withdraw / Payout Settings",
      description: "Manage your payout methods and settings",
      href: "/earnings/withdraw",
      icon: Settings,
      value: "Configure",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Earnings</h1>
          <p className="text-slate-400">Track your earnings and manage payouts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.href}
                href={module.href}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <Icon className="text-white" size={24} />
                  </div>
                  <p className="text-2xl font-bold text-green-400">{module.value}</p>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{module.title}</h3>
                <p className="text-sm text-slate-400">{module.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
