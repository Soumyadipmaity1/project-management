"use client";
import React, { useEffect, useState } from "react";
import { FolderOpen, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ProjectLeadPanel() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/projectlead-stats");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch stats");

        setStats([
          {
            title: "Total Projects",
            value: data.totalProjects,
            description: `In ${data.domain} domain`,
          },
          {
            title: "Team Members",
            value: data.totalMembers,
            description: "Active contributors in your projects",
          },
          {
            title: "Completed Projects",
            value: data.completedProjects,
            description: "Successfully finished projects",
          },
          {
            title: "Project Requests",
            value: data.totalRequests,
            description: "Pending or reviewed requests",
          },
        ]);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load project lead stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statIcons = [FolderOpen, CheckCircle2, Clock, AlertCircle];

  if (loading) return <p className="text-center text-slate-400">Loading...</p>;

  return (
    <div className="py-8 w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-mclaren text-4xl mb-3 font-bold text-fuchsia-400">
          Welcome back, Project Lead
        </h2>
        <p className="text-slate-400 font-mclaren text-lg font-medium mb-10">
          View and manage your assigned projects
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {stats.map((stat, idx) => (
            <div key={idx} className="group relative">
              <div className="relative rounded-xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 p-6 shadow-2xl flex flex-col hover:border-fuchsia-400/50 transition-all duration-500 hover:shadow-fuchsia-500/20">
                <div className="flex items-center justify-between mb-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-fuchsia-500 rounded-lg opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300" />
                    <div className="relative p-3 rounded-lg bg-fuchsia-500/20 border border-fuchsia-400/30 group-hover:border-fuchsia-300/50 transition-all duration-300">
                      {React.createElement(statIcons[idx], {
                        className:
                          "w-5 h-5 text-fuchsia-300 group-hover:text-fuchsia-200 transition-colors duration-300",
                      })}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-white font-mclaren group-hover:text-fuchsia-200 transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-200 font-mclaren leading-tight group-hover:text-white transition-colors duration-300">
                    {stat.title}
                  </div>
                  <div className="text-xs text-slate-400 font-mclaren group-hover:text-slate-300 transition-colors duration-300">
                    {stat.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
