"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { ShoppingCart, Star } from "lucide-react";

export default function CryptoHardwarePage() {
  const products = [
    {
      id: 1,
      name: "Hardware Wallet - CryptoVault Pro",
      price: "$149",
      seller: "SecureDevices",
      rating: 4.9,
      reviews: 523,
      features: ["1000+ coins", "Cold storage", "Military-grade security"],
    },
    {
      id: 2,
      name: "Ledger Nano X",
      price: "$119",
      seller: "Ledger",
      rating: 4.8,
      reviews: 1204,
      features: ["Bluetooth", "Mobile support", "Certified secure"],
    },
    {
      id: 3,
      name: "Trezor Model T",
      price: "$159",
      seller: "SatoshiLabs",
      rating: 4.7,
      reviews: 892,
      features: ["Touchscreen", "Open source", "Multi-coin"],
    },
    {
      id: 4,
      name: "SafePal S1",
      price: "$99",
      seller: "SafePal",
      rating: 4.6,
      reviews: 445,
      features: ["Air-gapped", "QR code", "Budget-friendly"],
    },
    {
      id: 5,
      name: "Keystone Pro",
      price: "$199",
      seller: "Keystone",
      rating: 4.8,
      reviews: 267,
      features: ["Large display", "Multi-sig", "Premium build"],
    },
    {
      id: 6,
      name: "ColdCard Mk4",
      price: "$139",
      seller: "Coinkite",
      rating: 4.7,
      reviews: 334,
      features: ["Bitcoin-only", "Airgapped", "Durable"],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Crypto Hardware</h1>
          <p className="text-slate-400">Hardware wallets and security devices for safe crypto storage</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all"
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
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-400">{product.price}</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
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
