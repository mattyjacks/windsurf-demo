"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState({
    campaigns: true,
    bounties: true,
    earnings: true,
    messages: true,
    promotions: false,
    newsletter: true,
    email: true,
    push: true,
    sms: false,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Notification Preferences</h1>
          <p className="text-slate-400">Manage how you receive notifications</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-6">Notification Types</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-white font-semibold">Campaign Updates</p>
                <p className="text-sm text-slate-400">Get notified about campaign status changes</p>
              </div>
              <button
                onClick={() => handleToggle('campaigns')}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  notifications.campaigns ? 'bg-cyan-600' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    notifications.campaigns ? 'right-1' : 'left-1'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-white font-semibold">Bounty Notifications</p>
                <p className="text-sm text-slate-400">Get notified about new bounties and submissions</p>
              </div>
              <button
                onClick={() => handleToggle('bounties')}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  notifications.bounties ? 'bg-cyan-600' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    notifications.bounties ? 'right-1' : 'left-1'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-white font-semibold">Earnings & Payouts</p>
                <p className="text-sm text-slate-400">Get notified about earnings and payout status</p>
              </div>
              <button
                onClick={() => handleToggle('earnings')}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  notifications.earnings ? 'bg-cyan-600' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    notifications.earnings ? 'right-1' : 'left-1'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-white font-semibold">Messages</p>
                <p className="text-sm text-slate-400">Get notified about new messages from users</p>
              </div>
              <button
                onClick={() => handleToggle('messages')}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  notifications.messages ? 'bg-cyan-600' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    notifications.messages ? 'right-1' : 'left-1'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-white font-semibold">Promotions & Offers</p>
                <p className="text-sm text-slate-400">Get notified about special offers and promotions</p>
              </div>
              <button
                onClick={() => handleToggle('promotions')}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  notifications.promotions ? 'bg-cyan-600' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    notifications.promotions ? 'right-1' : 'left-1'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-white font-semibold">Newsletter</p>
                <p className="text-sm text-slate-400">Subscribe to our weekly newsletter</p>
              </div>
              <button
                onClick={() => handleToggle('newsletter')}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  notifications.newsletter ? 'bg-cyan-600' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    notifications.newsletter ? 'right-1' : 'left-1'
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-6">Notification Channels</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-white font-semibold">Email Notifications</p>
                <p className="text-sm text-slate-400">Receive notifications via email</p>
              </div>
              <button
                onClick={() => handleToggle('email')}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  notifications.email ? 'bg-cyan-600' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    notifications.email ? 'right-1' : 'left-1'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-white font-semibold">Push Notifications</p>
                <p className="text-sm text-slate-400">Receive browser push notifications</p>
              </div>
              <button
                onClick={() => handleToggle('push')}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  notifications.push ? 'bg-cyan-600' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    notifications.push ? 'right-1' : 'left-1'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <div>
                <p className="text-white font-semibold">SMS Notifications</p>
                <p className="text-sm text-slate-400">Receive text message notifications</p>
              </div>
              <button
                onClick={() => handleToggle('sms')}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  notifications.sms ? 'bg-cyan-600' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    notifications.sms ? 'right-1' : 'left-1'
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all">
          Save Preferences
        </button>
      </div>
    </DashboardLayout>
  );
}
