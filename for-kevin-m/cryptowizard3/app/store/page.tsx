"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import Link from "next/link";
import { ShoppingBag, Cpu, Code, Smartphone } from "lucide-react";

export default function StorePage() {
  const categories = [
    {
      title: "Crypto Cards",
      description: "Premium crypto debit and credit cards",
      icon: ShoppingBag,
      href: "/store/cards",
      count: 12,
    },
    {
      title: "Crypto Hardware",
      description: "Hardware wallets and security devices",
      icon: Cpu,
      href: "/store/hardware",
      count: 8,
    },
    {
      title: "Crypto Software / Tools",
      description: "Trading bots, analytics, and tools",
      icon: Code,
      href: "/store/software",
      count: 24,
    },
    {
      title: "Crypto Phones",
      description: "Secure crypto-focused smartphones",
      icon: Smartphone,
      href: "/store/phones",
      count: 6,
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Crypto Trading Bot License",
      price: "299 USDT",
      seller: "TradingPro",
      category: "Software",
      image: "🤖",
    },
    {
      id: 2,
      name: "Hardware Wallet - CryptoVault Pro",
      price: "149 USD",
      seller: "SecureDevices",
      category: "Hardware",
      image: "🔐",
    },
    {
      id: 3,
      name: "NFT Collection Template Pack",
      price: "199 ETH",
      seller: "ArtStudio",
      category: "Software",
      image: "🎨",
    },
    {
      id: 4,
      name: "DeFi Analytics Dashboard",
      price: "99 USDT",
      seller: "DataInsights",
      category: "Software",
      image: "📊",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">WizardHat Tech Store</h1>
          <p className="text-slate-400">Discover premium crypto tools, hardware, and digital products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.href}
                href={category.href}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{category.description}</p>
                <p className="text-xs text-slate-500">{category.count} products</p>
              </Link>
            );
          })}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-slate-700 overflow-hidden hover:border-purple-500 transition-all"
              >
                <div className="bg-slate-700 h-40 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-slate-400 mb-3">{product.seller}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-400">{product.price}</span>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs font-semibold transition-all">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
