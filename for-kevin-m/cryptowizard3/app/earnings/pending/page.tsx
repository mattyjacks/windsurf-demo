"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Clock, CheckCircle } from "lucide-react";

export default function PendingPayoutsPage() {
  const pendingPayouts = [
    {
      id: 1,
      source: "Promoter Campaign - Bitcoin Bull Run",
      amount: "$500.00",
      date: "May 10, 2026",
      status: "Processing",
      eta: "2-3 business days",
    },
    {
      id: 2,
      source: "Bounty Completion - DeFi Review",
      amount: "$350.00",
      date: "May 12, 2026",
      status: "Pending Approval",
      eta: "1-2 business days",
    },
    {
      id: 3,
      source: "Influencer Earnings - May Campaign",
      amount: "$350.00",
      date: "May 15, 2026",
      status: "Pending",
      eta: "3-5 business days",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Pending Payouts</h1>
          <p className="text-slate-400">Earnings awaiting processing</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg p-8 border border-blue-500/30">
          <p className="text-slate-300 text-lg mb-2">Total Pending</p>
          <p className="text-5xl font-bold text-blue-400 mb-4">$1,200.00</p>
          <p className="text-slate-400">3 pending transactions</p>
        </div>

        <div className="space-y-4">
          {pendingPayouts.map((payout) => (
            <div
              key={payout.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{payout.source}</h3>
                  <p className="text-sm text-slate-400">Submitted: {payout.date}</p>
                </div>
                <span className="text-2xl font-bold text-blue-400">{payout.amount}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-yellow-400" />
                  <div>
                    <p className="text-sm font-semibold text-slate-300">{payout.status}</p>
                    <p className="text-xs text-slate-500">ETA: {payout.eta}</p>
                  </div>
                </div>
                <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Payout Information</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-700">
              <span className="text-slate-300">Processing Time</span>
              <span className="text-slate-400">1-5 business days</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-700">
              <span className="text-slate-300">Minimum Payout</span>
              <span className="text-slate-400">$50.00</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-300">Payout Methods</span>
              <span className="text-slate-400">Bank, Crypto, PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
