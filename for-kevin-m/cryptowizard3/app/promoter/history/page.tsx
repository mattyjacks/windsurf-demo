"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { CheckCircle, Clock, XCircle } from "lucide-react";

export default function PromoterHistoryPage() {
  const campaigns = [
    {
      id: 1,
      name: "Bitcoin Bull Run Campaign",
      influencer: "CryptoKing",
      amount: "$5,000",
      date: "May 1, 2026",
      status: "completed",
      roi: "245%",
    },
    {
      id: 2,
      name: "DeFi Summer Push",
      influencer: "BlockchainBabe",
      amount: "$3,500",
      date: "Apr 15, 2026",
      status: "completed",
      roi: "189%",
    },
    {
      id: 3,
      name: "NFT Collection Launch",
      influencer: "NFTNinja",
      amount: "$4,200",
      date: "Apr 1, 2026",
      status: "completed",
      roi: "312%",
    },
    {
      id: 4,
      name: "Altcoin Discovery",
      influencer: "AltcoinAlice",
      amount: "$2,800",
      date: "Mar 20, 2026",
      status: "completed",
      roi: "156%",
    },
    {
      id: 5,
      name: "Token Launch Promo",
      influencer: "TokenTom",
      amount: "$2,200",
      date: "Mar 5, 2026",
      status: "completed",
      roi: "198%",
    },
    {
      id: 6,
      name: "Security Awareness Week",
      influencer: "WalletWanda",
      amount: "$1,800",
      date: "Feb 15, 2026",
      status: "completed",
      roi: "134%",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={20} className="text-green-400" />;
      case "pending":
        return <Clock size={20} className="text-yellow-400" />;
      case "failed":
        return <XCircle size={20} className="text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Purchase History</h1>
          <p className="text-slate-400">View all your past campaigns and purchases</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Campaign</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Influencer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">ROI</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-slate-700 hover:bg-slate-800/50 transition-all">
                    <td className="px-6 py-4 text-sm text-white font-medium">{campaign.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">{campaign.influencer}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-purple-400">{campaign.amount}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{campaign.date}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-400">{campaign.roi}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(campaign.status)}
                        <span className="text-sm capitalize text-slate-300">{campaign.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Total Spent</p>
            <p className="text-3xl font-bold text-white">$19,500</p>
            <p className="text-xs text-slate-500 mt-2">6 campaigns</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Average ROI</p>
            <p className="text-3xl font-bold text-green-400">204%</p>
            <p className="text-xs text-slate-500 mt-2">Across all campaigns</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Total Return</p>
            <p className="text-3xl font-bold text-white">$39,780</p>
            <p className="text-xs text-slate-500 mt-2">Net profit: $20,280</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
