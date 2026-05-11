"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { BookOpen, Calendar, User } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "The Future of DeFi in 2026",
      excerpt: "Exploring emerging trends and opportunities in decentralized finance",
      author: "CryptoWriter",
      date: "May 15, 2026",
      category: "DeFi",
      readTime: "8 min read",
    },
    {
      id: 2,
      title: "Bitcoin Halving: What You Need to Know",
      excerpt: "Complete guide to understanding Bitcoin's halving mechanism",
      author: "BlockchainExpert",
      date: "May 14, 2026",
      category: "Bitcoin",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "NFTs Beyond Art: Real-World Applications",
      excerpt: "Discovering practical use cases for NFT technology",
      author: "NFTAnalyst",
      date: "May 13, 2026",
      category: "NFTs",
      readTime: "7 min read",
    },
    {
      id: 4,
      title: "Smart Contract Security Best Practices",
      excerpt: "Essential security measures for smart contract development",
      author: "SecurityPro",
      date: "May 12, 2026",
      category: "Development",
      readTime: "10 min read",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Crypto Blog</h1>
          <p className="text-slate-400">Latest articles and insights from the crypto community</p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-purple-500 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                  <p className="text-slate-400 mb-4">{post.excerpt}</p>
                </div>
                <span className="bg-purple-600/20 text-purple-300 text-xs px-3 py-1 rounded-full whitespace-nowrap ml-4">
                  {post.category}
                </span>
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-400 pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  {post.readTime}
                </div>
                <button className="ml-auto text-purple-400 hover:text-purple-300 font-semibold">
                  Read Article
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
