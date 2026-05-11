"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { LogoutButton } from "./logout-button";

export function Header() {
  const { user } = useAuth();

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Promoter", href: "/promoter", icon: "📈" },
    { label: "Influencer", href: "/influencer", icon: "👤" },
    { label: "Recruiter", href: "/recruiter", icon: "💼" },
    { label: "BountiesAds", href: "/bounty", icon: "🎯" },
    { label: "Scoreboard", href: "/scoreboard", icon: "🏆" },
    { label: "Earnings", href: "/earnings", icon: "💰" },
    { label: "Profile", href: "/profile", icon: "⚙️" },
  ];

  const secondaryNavItems = [
    { label: "Pull Narratives", href: "/narratives/pull", icon: "📖" },
    { label: "Push Narratives", href: "/narratives/push", icon: "📢" },
    { label: "Tools", href: "/tools" },
    { label: "Directories", href: "/directories" },
  ];

  const footerNavItems = [
    { label: "Blog", href: "/blog" },
    { label: "Job Board", href: "/jobs" },
    { label: "Store", href: "/store" },
    { label: "Feedback", href: "/feedback" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20 px-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">🧙</span>
            </div>
            <h1 className="text-2xl font-bold text-blue-600">Crypto Wizard</h1>
          </div>

          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{user.name}</span>
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Login
              </Link>
            )}
          </nav>
        </div>

        <div className="bg-blue-600 text-white px-6 py-2 flex items-center gap-4">
          {secondaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-1"
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </Link>
          ))}
          <div className="ml-auto flex items-center gap-4">
            {footerNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:opacity-80 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
