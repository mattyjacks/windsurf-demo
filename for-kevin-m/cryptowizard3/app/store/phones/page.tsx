"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { ShoppingCart, Star } from "lucide-react";

export default function CryptoPhonesPage() {
  const products = [
    {
      id: 1,
      name: "CryptoPhone Pro Max",
      price: "$1,299",
      seller: "CryptoTech",
      rating: 4.9,
      reviews: 234,
      features: ["Secure enclave", "Hardware wallet", "Encrypted storage"],
    },
    {
      id: 2,
      name: "BlockchainOS Phone",
      price: "$899",
      seller: "BlockTech",
      rating: 4.8,
      reviews: 189,
      features: ["Custom OS", "Decentralized", "Privacy-first"],
    },
    {
      id: 3,
      name: "Quantum Secure Phone",
      price: "$1,499",
      seller: "QuantumSec",
      rating: 4.9,
      reviews: 156,
      features: ["Quantum encryption", "Military-grade", "Premium build"],
    },
    {
      id: 4,
      name: "DeFi Mobile Device",
      price: "$799",
      seller: "DeFiTech",
      rating: 4.7,
      reviews: 267,
      features: ["DeFi optimized", "Fast processor", "Large battery"],
    },
    {
      id: 5,
      name: "Web3 Smartphone",
      price: "$699",
      seller: "Web3Devices",
      rating: 4.6,
      reviews: 334,
      features: ["Web3 native", "Wallet built-in", "Affordable"],
    },
    {
      id: 6,
      name: "NFT Creator Phone",
      price: "$1,199",
      seller: "CreatorTech",
      rating: 4.8,
      reviews: 298,
      features: ["High-res camera", "NFT tools", "Creator suite"],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Crypto Phones</h1>
          <p className="text-slate-400">Secure crypto-focused smartphones with built-in security features</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-pink-500 transition-all"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                <p className="text-sm text-slate-400 mb-3">by {product.seller}</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-slate-600"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-400">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="mb-4 space-y-2">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <span className="text-2xl font-bold text-pink-400">{product.price}</span>
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
                  <ShoppingCart size={18} />
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
