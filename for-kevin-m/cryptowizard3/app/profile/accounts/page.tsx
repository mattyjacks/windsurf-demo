"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Unlink } from "lucide-react";
import { useState } from "react";

export default function LinkedAccountsPage() {
  const [linkedAccounts] = useState([
    { id: 1, platform: "Twitter", handle: "@cryptojohn", connected: true },
    { id: 2, platform: "Discord", handle: "CryptoJohn#1234", connected: true },
    { id: 3, platform: "Telegram", handle: "@cryptojohn", connected: false },
    { id: 4, platform: "YouTube", handle: "CryptoJohn Channel", connected: false },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Linked Accounts</h1>
          <p className="text-slate-400">Connect your social media and external accounts</p>
        </div>

        <div className="space-y-4">
          {linkedAccounts.map((account) => (
            <div
              key={account.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{account.platform}</h3>
                  <p className="text-sm text-slate-400">{account.handle}</p>
                  <div className="mt-3">
                    {account.connected ? (
                      <span className="inline-block bg-green-600/20 text-green-300 text-xs px-3 py-1 rounded-full">
                        Connected
                      </span>
                    ) : (
                      <span className="inline-block bg-slate-600/20 text-slate-300 text-xs px-3 py-1 rounded-full">
                        Not Connected
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  {account.connected ? (
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
                      <Unlink size={18} />
                      Disconnect
                    </button>
                  ) : (
                    <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-all">
                      Connect
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Why Link Accounts?</h3>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">✓</span>
              <span>Verify your identity and build trust</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">✓</span>
              <span>Showcase your social media presence to clients</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">✓</span>
              <span>Receive notifications from connected platforms</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">✓</span>
              <span>Easier campaign management and collaboration</span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
