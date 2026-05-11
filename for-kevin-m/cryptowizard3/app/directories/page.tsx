"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import Link from "next/link";
import { MessageCircle, Send, Globe, Users, Zap } from "lucide-react";

export default function DirectoriesPage() {
  const directories = [
    {
      title: "Discord Server Directory",
      description: "Browse active Discord communities for crypto traders and developers",
      icon: MessageCircle,
      href: "/directories/discord",
      count: 245,
    },
    {
      title: "Telegram Groups Directory",
      description: "Find Telegram groups for crypto news, trading, and networking",
      icon: Send,
      href: "/directories/telegram",
      count: 189,
    },
    {
      title: "Onion Sites Directory",
      description: "Discover privacy-focused onion sites and dark web resources",
      icon: Globe,
      href: "/directories/onion",
      count: 67,
    },
    {
      title: "Crypto Websites Directory",
      description: "Explore the best crypto websites and platforms",
      icon: Globe,
      href: "/directories/websites",
      count: 312,
    },
    {
      title: "Influencer Directory",
      description: "Connect with top crypto influencers and content creators",
      icon: Users,
      href: "/directories/influencers",
      count: 456,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Crypto Directories</h1>
          <p className="text-slate-400">Discover the best crypto communities, influencers, and resources</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {directories.map((directory) => {
            const Icon = directory.icon;
            return (
              <Link
                key={directory.href}
                href={directory.href}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-600 p-3 rounded-lg">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{directory.title}</h3>
                    <p className="text-sm text-slate-400 mb-4">{directory.description}</p>
                    <p className="text-xs text-cyan-400 font-semibold">{directory.count} entries</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
