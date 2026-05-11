"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { BarChart3, TrendingUp, Users } from "lucide-react";

export default function PromoterStatsPage() {
  const chartData = [
    { month: "Jan", reach: 4000, conversions: 240 },
    { month: "Feb", reach: 3000, conversions: 221 },
    { month: "Mar", reach: 2000, conversions: 229 },
    { month: "Apr", reach: 2780, conversions: 200 },
    { month: "May", reach: 1890, conversions: 229 },
    { month: "Jun", reach: 2390, conversions: 200 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Promoter Statistics</h1>
          <p className="text-slate-400">Track your performance metrics over time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Reach</p>
                <p className="text-2xl font-bold text-white">125.4K</p>
                <p className="text-xs text-green-400">+12% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-4">
              <div className="bg-green-600 p-3 rounded-lg">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold text-white">4.2%</p>
                <p className="text-xs text-green-400">+0.3% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-4">
              <div className="bg-purple-600 p-3 rounded-lg">
                <BarChart3 className="text-white" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Avg. Campaign Value</p>
                <p className="text-2xl font-bold text-white">$1,250</p>
                <p className="text-xs text-green-400">+5% from last month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-6">Monthly Performance</h3>
          <div className="space-y-4">
            {chartData.map((data) => (
              <div key={data.month} className="flex items-center gap-4">
                <div className="w-12 text-slate-400 text-sm font-medium">{data.month}</div>
                <div className="flex-1">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="bg-slate-700 rounded h-2 mb-1">
                        <div
                          className="bg-blue-500 h-2 rounded"
                          style={{ width: `${(data.reach / 5000) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-500">{data.reach} reach</p>
                    </div>
                    <div className="flex-1">
                      <div className="bg-slate-700 rounded h-2 mb-1">
                        <div
                          className="bg-green-500 h-2 rounded"
                          style={{ width: `${(data.conversions / 250) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-500">{data.conversions} conversions</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
