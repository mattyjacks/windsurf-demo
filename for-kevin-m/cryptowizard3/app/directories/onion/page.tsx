"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Globe, Lock, AlertCircle } from "lucide-react";

export default function OnionDirectoryPage() {
  const sites = [
    {
      id: 1,
      name: "Privacy Exchange Hub",
      description: "Anonymous cryptocurrency exchange",
      address: "privacy...onion",
      verified: true,
    },
    {
      id: 2,
      name: "Secure Wallet Service",
      description: "Non-custodial wallet management",
      address: "wallet...onion",
      verified: true,
    },
    {
      id: 3,
      name: "Anonymous Forum",
      description: "Privacy-focused discussion community",
      address: "forum...onion",
      verified: false,
    },
    {
      id: 4,
      name: "Decentralized Marketplace",
      description: "P2P trading platform",
      address: "market...onion",
      verified: true,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Onion Sites Directory</h1>
          <p className="text-slate-400">Discover privacy-focused onion sites and dark web resources</p>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-yellow-300 font-semibold">Security Notice</p>
            <p className="text-yellow-200 text-sm">Use Tor Browser to access onion sites. Exercise caution and verify site legitimacy.</p>
          </div>
        </div>

        <div className="space-y-4">
          {sites.map((site) => (
            <div
              key={site.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{site.name}</h3>
                  <p className="text-sm text-slate-400 mb-3">{site.description}</p>
                </div>
                {site.verified && (
                  <span className="bg-green-600/20 text-green-300 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <Lock size={12} />
                    Verified
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <Globe size={16} className="text-slate-400" />
                <code className="text-sm text-slate-300 font-mono">{site.address}</code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
