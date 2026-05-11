"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { DollarSign, TrendingUp } from "lucide-react";

export default function BalancePage() {
  const balanceBreakdown = [
    { source: "Promoter Campaigns", amount: "$1,850.00", percentage: 54 },
    { source: "Influencer Earnings", amount: "$950.50", percentage: 28 },
    { source: "Bounties Completed", amount: "$450.00", percentage: 13 },
    { source: "Referral Bonuses", amount: "$200.00", percentage: 5 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Current Balance</h1>
          <p className="text-slate-400">Your available balance ready to withdraw</p>
        </div>

        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg p-8 border border-green-500/30">
          <p className="text-slate-300 text-lg mb-2">Total Available Balance</p>
          <p className="text-5xl font-bold text-green-400 mb-4">$3,450.50</p>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-all">
            Withdraw Now
          </button>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-6">Balance Breakdown</h3>
          <div className="space-y-4">
            {balanceBreakdown.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">{item.source}</span>
                  <span className="text-lg font-bold text-green-400">{item.amount}</span>
                </div>
                <div className="bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">{item.percentage}% of total</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">This Month</p>
                <p className="text-2xl font-bold text-white">$1,250.00</p>
              </div>
            </div>
            <p className="text-xs text-green-400">+15% from last month</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-600 p-3 rounded-lg">
                <DollarSign className="text-white" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Last Payout</p>
                <p className="text-2xl font-bold text-white">$2,100.00</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">5 days ago</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
