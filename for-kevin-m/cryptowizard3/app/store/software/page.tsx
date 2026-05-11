"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { ShoppingCart, Star } from "lucide-react";

export default function CryptoSoftwarePage() {
  const products = [
    {
      id: 1,
      name: "Crypto Trading Bot License",
      price: "$299",
      seller: "TradingPro",
      rating: 4.8,
      reviews: 456,
      features: ["AI strategies", "Backtesting", "1-year support"],
    },
    {
      id: 2,
      name: "DeFi Analytics Dashboard",
      price: "$99",
      seller: "DataInsights",
      rating: 4.7,
      reviews: 234,
      features: ["Real-time data", "Portfolio tracking", "Lifetime access"],
    },
    {
      id: 3,
      name: "NFT Collection Template Pack",
      price: "$199",
      seller: "ArtStudio",
      rating: 4.6,
      reviews: 189,
      features: ["Smart contracts", "Artwork templates", "Deploy ready"],
    },
    {
      id: 4,
      name: "Blockchain Security Suite",
      price: "$149",
      seller: "SecureCode",
      rating: 4.9,
      reviews: 312,
      features: ["Audit tools", "Vulnerability scanner", "24/7 support"],
    },
    {
      id: 5,
      name: "Crypto Tax Calculator",
      price: "$79",
      seller: "TaxWiz",
      rating: 4.5,
      reviews: 567,
      features: ["Auto import", "Tax reports", "Multi-exchange"],
    },
    {
      id: 6,
      name: "Smart Contract IDE",
      price: "$249",
      seller: "DevTools",
      rating: 4.8,
      reviews: 278,
      features: ["Full IDE", "Testing framework", "Deployment tools"],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Crypto Software & Tools</h1>
          <p className="text-slate-400">Trading bots, analytics platforms, and development tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-green-500 transition-all"
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
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <span className="text-2xl font-bold text-green-400">{product.price}</span>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
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
