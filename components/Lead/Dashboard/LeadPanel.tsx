// app/admin/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { FolderOpen, CheckCircle2, Clock, AlertCircle, Code2, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface Stat {
  title: string;
  value: number;
  description: string;
}

interface Domain {
  _id?: string;
  name: string;
  description: string;
}

interface LeadPanelProps {
  role?: string;
}

const StatCard = ({ stat, icon: Icon }: { stat: Stat; icon: any }) => (
  <div className="group relative">
    <div className="relative rounded-xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-slate-700/50 p-6 shadow-2xl flex flex-col hover:border-emerald-400/50 transition-all duration-500 hover:shadow-emerald-500/20">
      <div className="flex items-center justify-between mb-5">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300" />
          <div className="relative p-3 rounded-lg bg-gradient-to-br from-emerald-500/20 via-emerald-400/15 to-teal-500/20 border border-emerald-400/30 group-hover:border-emerald-300/50 transition-all duration-300">
            <Icon className="w-5 h-5 text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="text-3xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent font-mclaren group-hover:from-emerald-200 group-hover:via-teal-200 group-hover:to-green-200 transition-all duration-300">
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
);

const DomainCard = ({ domain }: { domain: Domain }) => (
  <div className="group">
    <div className="rounded-lg border border-slate-700 bg-slate-900 hover:border-emerald-500 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-emerald-500/20">
      <div className="bg-emerald-600 p-4 flex items-center gap-3">
        <div className="p-2 rounded-md bg-emerald-700">
          <Code2 className="w-5 h-5 text-white" />
        </div>
        <span className="font-madimiOne text-lg text-white font-semibold">{domain.name}</span>
      </div>
      <div className="p-4">
        <p className="text-slate-300 font-mclaren text-sm mb-4 leading-relaxed">
          {domain.description}
        </p>
        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-md flex items-center gap-2 justify-center font-medium transition-colors duration-200">
          <span>View Domain</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>
    </div>
  </div>
);

export default function LeadPanel({ role = "Team Lead" }: LeadPanelProps) {
  const [stats, setStats] = useState<Stat[] | null>(null);
  const [domains, setDomains] = useState<Domain[] | null>(null);
  const [loading, setLoading] = useState(true);

  const statIcons = [FolderOpen, CheckCircle2, Clock, AlertCircle];

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsRes] = await Promise.all([
          fetch("/api/stats"),
          // fetch("/api/admin/domains"),
        ]);

        if (!statsRes.ok) throw new Error("Failed to load stats");
        // if (!domainsRes.ok) throw new Error("Failed to load domains");

        const statsJson = await statsRes.json();
        // const domainsJson = await domainsRes.json();

        if (!mounted) return;

        // Normalize stats into our Stat[] shape if API returns a different structure
        const normalizedStats: Stat[] = [
          { title: "Total Projects", value: statsJson.totalProjects ?? 0, description: "Across All Domains" },
          { title: "Domain Members", value: statsJson.domainMembers ?? 0, description: "Active Contributors" },
          { title: "Completed Projects", value: statsJson.completedProjects ?? 0, description: "This Quarter" },
          { title: "Pending Reviews", value: statsJson.pendingReviews ?? 0, description: "Awaiting Approval" },
        ];

        setStats(normalizedStats);
        // setDomains(Array.isArray(domainsJson) ? domainsJson : []);
      } catch (err: any) {
        console.error("Dashboard fetch error:", err);
        toast.error(err?.message || "Failed to load dashboard data");
        // Fallback: show zeros and empty domains
        setStats([
          { title: "Total Projects", value: 0, description: "Across All Domains" },
          { title: "Domain Members", value: 0, description: "Active Contributors" },
          { title: "Completed Projects", value: 0, description: "This Quarter" },
          { title: "Pending Reviews", value: 0, description: "Awaiting Approval" },
        ]);
        setDomains([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="py-8 w-full min-h-screen">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="font-mclaren text-4xl mb-3 font-bold bg-gradient-to-r from-white via-emerald-200 via-teal-200 to-green-200 bg-clip-text text-transparent">
            Welcome back, {role}
          </h2>
          <p className="text-slate-400 font-mclaren text-lg font-medium">
            View and work on your assigned projects
          </p>
        </div>

        {loading ? (
          <p className="text-slate-400 text-center py-10">Loading dashboard...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 w-full">
              {(stats || []).map((stat, idx) => (
                <StatCard key={idx} stat={stat} icon={statIcons[idx]} />
              ))}
            </div>

            {/* <div className="mb-8">
              <h2 className="font-mclaren text-3xl mb-8 bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent font-bold">
                Your Domains
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(domains || []).length === 0 ? (
                <div className="col-span-full text-slate-400">No domains available</div>
              ) : (
                (domains || []).map((domain, idx) => (
                  <DomainCard key={domain._id || idx} domain={domain} />
                ))
              )}
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}
