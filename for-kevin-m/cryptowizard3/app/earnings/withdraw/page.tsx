"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function WithdrawPage() {
  const [payoutMethods] = useState([
    {
      id: 1,
      type: "Bank Account",
      details: "****1234 - Wells Fargo",
      isDefault: true,
    },
    {
      id: 2,
      type: "Crypto Wallet",
      details: "0x742d...8f2a - Ethereum",
      isDefault: false,
    },
    {
      id: 3,
      type: "PayPal",
      details: "user@example.com",
      isDefault: false,
    },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Withdraw / Payout Settings</h1>
          <p className="text-slate-400">Manage your payout methods and withdrawal preferences</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Payout Methods</h3>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
              <Plus size={18} />
              Add Method
            </button>
          </div>

          <div className="space-y-3">
            {payoutMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-all"
              >
                <div className="flex-1">
                  <p className="text-white font-semibold">{method.type}</p>
                  <p className="text-sm text-slate-400">{method.details}</p>
                  {method.isDefault && (
                    <span className="inline-block mt-2 bg-green-600/20 text-green-300 text-xs px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <button className="text-slate-400 hover:text-red-400 transition-all">
                      <Trash2 size={18} />
                    </button>
                  )}
                  {!method.isDefault && (
                    <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm transition-all">
                      Set Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Withdrawal Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Minimum Withdrawal Amount</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
                <option>$50.00</option>
                <option>$100.00</option>
                <option>$250.00</option>
                <option>$500.00</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Auto-Withdrawal Frequency</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
                <option>Manual</option>
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Preferred Currency</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>USDT</option>
                <option>USDC</option>
                <option>ETH</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" id="notifications" defaultChecked className="w-4 h-4" />
              <label htmlFor="notifications" className="text-sm text-slate-300">
                Notify me when withdrawal is processed
              </label>
            </div>
          </div>

          <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all">
            Save Preferences
          </button>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Withdrawal Limits</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-700">
              <span className="text-slate-300">Daily Limit</span>
              <span className="text-slate-400">$10,000.00</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-700">
              <span className="text-slate-300">Monthly Limit</span>
              <span className="text-slate-400">$100,000.00</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-300">This Month Used</span>
              <span className="text-slate-400">$2,100.00 / $100,000.00</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
