"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import Link from "next/link";
import { Zap, Code, Cpu, Brain } from "lucide-react";

export default function ToolsPage() {
  const categories = [
    {
      title: "Free Software",
      description: "Open-source and free crypto tools",
      href: "/tools/free-software",
      icon: Code,
      count: 24,
    },
    {
      title: "Free AI Tools",
      description: "AI-powered tools at no cost",
      href: "/tools/free-ai",
      icon: Brain,
      count: 18,
    },
    {
      title: "Paid Software",
      description: "Premium crypto software solutions",
      href: "/tools/software",
      icon: Cpu,
      count: 32,
    },
    {
      title: "AI Tools",
      description: "Advanced AI-powered solutions",
      href: "/tools/ai-tools",
      icon: Brain,
      count: 28,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Crypto Tools</h1>
          <p className="text-slate-400">Discover tools to enhance your crypto journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.href}
                href={category.href}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/20"
              >
                <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{category.description}</p>
                <p className="text-xs text-slate-500">{category.count} tools</p>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
