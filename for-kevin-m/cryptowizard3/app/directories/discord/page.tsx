"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { MessageCircle, Users, TrendingUp } from "lucide-react";

export default function DiscordDirectoryPage() {
  const servers = [
    {
      id: 1,
      name: "Crypto Traders Hub",
      description: "Active community of crypto traders sharing strategies and market insights",
      members: "45.2K",
      growth: "+12%",
      category: "Trading",
      link: "https://discord.gg/cryptotraders",
    },
    {
      id: 2,
      name: "DeFi Developers",
      description: "Technical discussions about DeFi protocols and smart contract development",
      members: "28.5K",
      growth: "+8%",
      category: "Development",
      link: "https://discord.gg/defidevs",
    },
    {
      id: 3,
      name: "NFT Artists Collective",
      description: "Community for NFT creators, artists, and collectors",
      members: "32.1K",
      growth: "+15%",
      category: "NFTs",
      link: "https://discord.gg/nftartists",
    },
    {
      id: 4,
      name: "Altcoin Research Lab",
      description: "Deep research and analysis of emerging altcoins",
      members: "19.8K",
      growth: "+6%",
      category: "Research",
      link: "https://discord.gg/altcoinlab",
    },
    {
      id: 5,
      name: "Bitcoin Maximalists",
      description: "Bitcoin-focused community and discussions",
      members: "56.3K",
      growth: "+5%",
      category: "Bitcoin",
      link: "https://discord.gg/bitcoinmax",
    },
    {
      id: 6,
      name: "Web3 Builders",
      description: "Building the future of Web3 and decentralized applications",
      members: "41.7K",
      growth: "+18%",
      category: "Web3",
      link: "https://discord.gg/web3builders",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Discord Server Directory</h1>
          <p className="text-slate-400">Browse active Discord communities for crypto traders and developers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servers.map((server) => (
            <div
              key={server.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-indigo-500 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{server.name}</h3>
                  <span className="inline-block bg-indigo-600/20 text-indigo-300 text-xs px-3 py-1 rounded-full">
                    {server.category}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-4">{server.description}</p>

              <div className="flex items-center gap-6 mb-4 py-4 border-y border-slate-700">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-slate-400" />
                  <span className="text-sm text-slate-300">{server.members} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-green-400" />
                  <span className="text-sm text-green-400 font-semibold">{server.growth}</span>
                </div>
              </div>

              <a
                href={server.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle size={18} />
                Join Server
              </a>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
