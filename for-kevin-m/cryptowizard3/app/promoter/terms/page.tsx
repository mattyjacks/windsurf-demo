"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { DollarSign, Clock, CheckCircle } from "lucide-react";

export default function PromoterTermsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Rate & Terms</h1>
          <p className="text-slate-400">Manage your campaign rates and terms</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-600 p-3 rounded-lg">
                <DollarSign className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white">Base Rate</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-2">$2,500</p>
            <p className="text-sm text-slate-400">Per campaign</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Clock className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white">Campaign Duration</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-2">30 days</p>
            <p className="text-sm text-slate-400">Standard length</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-600 p-3 rounded-lg">
                <CheckCircle className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white">Acceptance Rate</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-2">92%</p>
            <p className="text-sm text-slate-400">Campaign acceptance</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Your Terms</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <span className="text-slate-300">Minimum follower count</span>
              <input
                type="text"
                defaultValue="10,000"
                className="bg-slate-800 text-white px-3 py-2 rounded border border-slate-600 w-32 text-right"
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <span className="text-slate-300">Minimum engagement rate</span>
              <input
                type="text"
                defaultValue="3%"
                className="bg-slate-800 text-white px-3 py-2 rounded border border-slate-600 w-32 text-right"
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <span className="text-slate-300">Content approval required</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <span className="text-slate-300">Payment upfront required</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          </div>
          <button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
