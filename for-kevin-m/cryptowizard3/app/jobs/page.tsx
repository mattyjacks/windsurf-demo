"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Briefcase, MapPin, DollarSign } from "lucide-react";

export default function JobsPage() {
  const jobs = [
    {
      id: 1,
      title: "Senior Smart Contract Developer",
      company: "DeFi Protocol Labs",
      location: "Remote",
      salary: "$120K - $180K",
      type: "Full-time",
      skills: ["Solidity", "Web3", "Security"],
    },
    {
      id: 2,
      title: "Blockchain Security Auditor",
      company: "CryptoSec Audits",
      location: "Remote",
      salary: "$100K - $150K",
      type: "Full-time",
      skills: ["Security", "Auditing", "Smart Contracts"],
    },
    {
      id: 3,
      title: "Crypto Marketing Manager",
      company: "Web3 Startup",
      location: "San Francisco, CA",
      salary: "$80K - $120K",
      type: "Full-time",
      skills: ["Marketing", "Community", "Growth"],
    },
    {
      id: 4,
      title: "NFT Platform Developer",
      company: "NFT Marketplace Inc",
      location: "Remote",
      salary: "$90K - $140K",
      type: "Full-time",
      skills: ["React", "Web3", "NFTs"],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Job Board</h1>
          <p className="text-slate-400">Find your next opportunity in crypto</p>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{job.title}</h3>
                  <p className="text-slate-400 mb-3">{job.company}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={16} />
                      {job.salary}
                    </div>
                    <span className="bg-cyan-600/20 text-cyan-300 px-2 py-1 rounded text-xs">
                      {job.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {job.skills.map((skill) => (
                  <span key={skill} className="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>

              <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg transition-all">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
