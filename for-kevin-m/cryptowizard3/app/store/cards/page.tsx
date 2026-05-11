"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { ShoppingCart, Star } from "lucide-react";

export default function CryptoCardsPage() {
  const products = [
    {
      id: 1,
      name: "Crypto Visa Card - Premium",
      price: "$99",
      seller: "CardPro",
      rating: 4.8,
      reviews: 234,
      features: ["No KYC", "Instant issuance", "Cashback rewards"],
    },
    {
      id: 2,
      name: "DeFi Mastercard",
      price: "$149",
      seller: "DeFiCards",
      rating: 4.7,
      reviews: 189,
      features: ["DeFi integration", "Staking rewards", "Premium support"],
    },
    {
      id: 3,
      name: "Bitcoin Debit Card",
      price: "$79",
      seller: "BitCard",
      rating: 4.6,
      reviews: 412,
      features: ["BTC direct", "Low fees", "Global acceptance"],
    },
    {
      id: 4,
      name: "Ethereum Card - Gold",
      price: "$199",
      seller: "EthCards",
      rating: 4.9,
      reviews: 156,
      features: ["ETH staking", "Premium lounge", "Concierge service"],
    },
    {
      id: 5,
      name: "Stablecoin Card",
      price: "$49",
      seller: "StableCard",
      rating: 4.5,
      reviews: 298,
      features: ["USDC/USDT", "No volatility", "Instant settlement"],
    },
    {
      id: 6,
      name: "Altcoin Card - Flex",
      price: "$129",
      seller: "AltCards",
      rating: 4.7,
      reviews: 167,
      features: ["Multi-token", "Flexible limits", "API access"],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Crypto Cards</h1>
          <p className="text-slate-400">Premium crypto debit and credit cards for seamless spending</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-purple-500 transition-all"
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
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-400">{product.price}</span>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
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
