"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function PayoutMethodsPage() {
  const [methods] = useState([
    { id: 1, type: "Bank Account", details: "Wells Fargo ****1234", isDefault: true },
    { id: 2, type: "Crypto Wallet", details: "0x742d...8f2a", isDefault: false },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Payout Methods</h1>
          <p className="text-slate-400">Manage your payment and payout methods</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Saved Methods</h3>
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
              <Plus size={18} />
              Add Method
            </button>
          </div>

          <div className="space-y-3">
            {methods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700"
              >
                <div>
                  <p className="text-white font-semibold">{method.type}</p>
                  <p className="text-sm text-slate-400">{method.details}</p>
                  {method.isDefault && (
                    <span className="inline-block mt-2 bg-green-600/20 text-green-300 text-xs px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
                <button className="text-slate-400 hover:text-red-400 transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 border border-slate-700 max-w-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Add New Payout Method</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Method Type</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none">
                <option>Bank Account</option>
                <option>Crypto Wallet</option>
                <option>PayPal</option>
                <option>Stripe</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Account Holder Name</label>
              <input
                type="text"
                placeholder="John Crypto"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Account Number / Address</label>
              <input
                type="text"
                placeholder="Enter account details"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="default" className="w-4 h-4" />
              <label htmlFor="default" className="text-sm text-slate-300">
                Set as default payout method
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
            >
              Add Payout Method
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
