import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  Users,
  Trophy,
  DollarSign,
  Settings,
  Flame,
  Wind,
  FolderOpen,
  BookOpen,
  Briefcase,
  ShoppingBag,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Promoter",
    href: "/promoter",
    icon: Zap,
  },
  {
    label: "Influencer",
    href: "/influencer",
    icon: Users,
  },
  {
    label: "Recruiter",
    href: "/recruiter",
    icon: Briefcase,
  },
  {
    label: "Bounties/Ads",
    href: "/bounty",
    icon: Trophy,
  },
  {
    label: "Scoreboard",
    href: "/scoreboard",
    icon: Trophy,
  },
  {
    label: "Earnings",
    href: "/earnings",
    icon: DollarSign,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: Settings,
  },
];

const secondaryNavItems = [
  {
    label: "Pull Narratives",
    href: "/narratives/pull",
    icon: Flame,
  },
  {
    label: "Push Narratives",
    href: "/narratives/push",
    icon: Wind,
  },
  {
    label: "Tools",
    href: "/tools",
    icon: Zap,
  },
  {
    label: "Directories",
    href: "/directories",
    icon: FolderOpen,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: BookOpen,
  },
  {
    label: "Job Board",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    label: "Store",
    href: "/store",
    icon: ShoppingBag,
  },
  {
    label: "Feedback",
    href: "/feedback",
    icon: MessageSquare,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-purple-500/20 overflow-y-auto transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Crypto Wizard
          </h1>
          <p className="text-xs text-slate-400 mt-1">Ultimate Crypto Marketplace</p>
        </div>

        <nav className="px-4 py-6 space-y-2">
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Main
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Explore
            </p>
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-6 left-6 right-6 pt-6 border-t border-slate-700">
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all"
          >
            <Settings size={20} />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
