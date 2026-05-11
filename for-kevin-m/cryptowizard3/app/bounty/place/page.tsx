"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Plus } from "lucide-react";

export default function PlaceBountyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Place a Bounty</h1>
          <p className="text-slate-400">Create a new bounty for the community to complete</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 border border-slate-700 max-w-2xl">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Bounty Title</label>
              <input
                type="text"
                placeholder="e.g., Write a DeFi Protocol Review"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Description</label>
              <textarea
                placeholder="Describe what needs to be done..."
                rows={5}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Reward Amount</label>
                <input
                  type="text"
                  placeholder="e.g., 500"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Currency</label>
                <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
                  <option>USDT</option>
                  <option>USDC</option>
                  <option>ETH</option>
                  <option>BTC</option>
                  <option>USD</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Difficulty Level</label>
                <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Deadline</label>
                <input
                  type="date"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Category</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none">
                <option>Content Writing</option>
                <option>Design</option>
                <option>Development</option>
                <option>Research</option>
                <option>Marketing</option>
                <option>Moderation</option>
                <option>Translation</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="w-4 h-4" />
              <label htmlFor="terms" className="text-sm text-slate-300">
                I agree to the bounty terms and conditions
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Create Bounty
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
