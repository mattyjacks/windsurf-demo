"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import Link from "next/link";
import { User, CreditCard, Link as LinkIcon, Bell } from "lucide-react";

export default function ProfilePage() {
  const modules = [
    {
      title: "Personal Info",
      description: "Update your profile information and details",
      href: "/profile/info",
      icon: User,
    },
    {
      title: "Payout Methods",
      description: "Manage your payment and payout methods",
      href: "/profile/payout",
      icon: CreditCard,
    },
    {
      title: "Linked Accounts",
      description: "Connect social media and external accounts",
      href: "/profile/accounts",
      icon: LinkIcon,
    },
    {
      title: "Notifications",
      description: "Manage your notification preferences",
      href: "/profile/notifications",
      icon: Bell,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-slate-400">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.href}
                href={module.href}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-600 p-3 rounded-lg">
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{module.title}</h3>
                    <p className="text-sm text-slate-400">{module.description}</p>
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
