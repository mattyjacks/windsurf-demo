"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { MessageSquare } from "lucide-react";

export default function FeedbackPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Send Feedback</h1>
          <p className="text-slate-400">Help us improve Crypto Wizard with your feedback</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 border border-slate-700 max-w-2xl">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Feedback Type</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>General Feedback</option>
                <option>Performance Issue</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Subject</label>
              <input
                type="text"
                placeholder="Brief description of your feedback"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Message</label>
              <textarea
                placeholder="Provide detailed feedback..."
                rows={6}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Email (Optional)</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="follow-up" className="w-4 h-4" />
              <label htmlFor="follow-up" className="text-sm text-slate-300">
                I would like a response to my feedback
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare size={20} />
              Submit Feedback
            </button>
          </form>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Feedback</h3>
          <div className="space-y-4">
            {[
              { user: "User123", feedback: "Great platform! Would love more analytics features", date: "May 15" },
              { user: "CryptoFan", feedback: "Bug: Dashboard not loading on mobile", date: "May 14" },
              { user: "TraderPro", feedback: "Feature request: API access for automated trading", date: "May 13" },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-semibold">{item.user}</p>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
                <p className="text-slate-400 text-sm">{item.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
