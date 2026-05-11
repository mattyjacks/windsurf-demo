"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { TrendingUp, Calendar } from "lucide-react";

export default function LifetimeEarningsPage() {
  const monthlyData = [
    { month: "Jan", earnings: 2400 },
    { month: "Feb", earnings: 2100 },
    { month: "Mar", earnings: 2800 },
    { month: "Apr", earnings: 3100 },
    { month: "May", earnings: 3450 },
    { month: "Jun", earnings: 3200 },
  ];

  const maxEarnings = Math.max(...monthlyData.map(d => d.earnings));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Lifetime Earnings</h1>
          <p className="text-slate-400">Total earnings since account creation</p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-8 border border-purple-500/30">
          <p className="text-slate-300 text-lg mb-2">Total Lifetime Earnings</p>
          <p className="text-5xl font-bold text-purple-400 mb-4">$42,850.00</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-slate-400" />
              <span className="text-slate-300">Account created: Jan 2024</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-6">Monthly Earnings Trend</h3>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 font-medium">{data.month}</span>
                  <span className="text-lg font-bold text-purple-400">${data.earnings}</span>
                </div>
                <div className="bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all"
                    style={{ width: `${(data.earnings / maxEarnings) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Average Monthly</p>
            <p className="text-3xl font-bold text-white">$3,570.83</p>
            <p className="text-xs text-slate-500 mt-2">12 months average</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Highest Month</p>
            <p className="text-3xl font-bold text-green-400">$3,450</p>
            <p className="text-xs text-slate-500 mt-2">May 2026</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Total Payouts</p>
            <p className="text-3xl font-bold text-white">$39,400</p>
            <p className="text-xs text-slate-500 mt-2">Withdrawn</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
