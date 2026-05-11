"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Globe, ExternalLink, Star } from "lucide-react";

export default function WebsitesDirectoryPage() {
  const websites = [
    {
      id: 1,
      name: "CoinMarketCap",
      description: "Cryptocurrency market data and rankings",
      url: "coinmarketcap.com",
      category: "Data",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Uniswap",
      description: "Decentralized exchange protocol",
      url: "uniswap.org",
      category: "DeFi",
      rating: 4.8,
    },
    {
      id: 3,
      name: "OpenSea",
      description: "NFT marketplace and trading platform",
      url: "opensea.io",
      category: "NFTs",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Ethereum.org",
      description: "Official Ethereum documentation and resources",
      url: "ethereum.org",
      category: "Education",
      rating: 4.9,
    },
    {
      id: 5,
      name: "Aave",
      description: "Lending and borrowing protocol",
      url: "aave.com",
      category: "DeFi",
      rating: 4.8,
    },
    {
      id: 6,
      name: "Curve Finance",
      description: "Stablecoin DEX and liquidity provider",
      url: "curve.fi",
      category: "DeFi",
      rating: 4.7,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Crypto Websites Directory</h1>
          <p className="text-slate-400">Explore the best crypto websites and platforms</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {websites.map((website) => (
            <div
              key={website.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{website.name}</h3>
                  <p className="text-sm text-slate-400 mb-3">{website.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-white">{website.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="bg-cyan-600/20 text-cyan-300 text-xs px-2 py-1 rounded">
                    {website.category}
                  </span>
                  <span className="text-xs text-slate-500">{website.url}</span>
                </div>
                <a
                  href={`https://${website.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-all"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
