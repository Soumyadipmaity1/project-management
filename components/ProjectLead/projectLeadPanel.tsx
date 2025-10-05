// app/admin/page.tsx
"use client";

import { FolderOpen, CheckCircle2, Clock, AlertCircle, Code2, ArrowRight } from "lucide-react";

interface Stat {
  title: string;
  value: number;
  description: string;
}

interface Domain {
  name: string;
  description: string;
}

interface LeadPanelProps {
  role?: "Team Lead";
  stats?: Stat[];
  domains?: Domain[];
}

const StatCard = ({ stat, icon: Icon }: { stat: Stat; icon: any }) => (
  <div className="group relative">
    <div className="relative rounded-xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 p-6 shadow-2xl flex flex-col hover:border-fuchsia-400/50 transition-all duration-500 hover:shadow-fuchsia-500/20">
      <div className="flex items-center justify-between mb-5">
        <div className="relative">
          <div className="absolute inset-0 bg-fuchsia-500 rounded-lg opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300" />
          <div className="relative p-3 rounded-lg bg-fuchsia-500/20 border border-fuchsia-400/30 group-hover:border-fuchsia-300/50 transition-all duration-300">
            <Icon className="w-5 h-5 text-fuchsia-300 group-hover:text-fuchsia-200 transition-colors duration-300" />
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
);

const DomainCard = ({ domain }: { domain: Domain }) => (
  <div className="group">
    <div className="rounded-lg border border-slate-700 bg-slate-900 hover:border-fuchsia-500 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-fuchsia-500/20">
      <div className="bg-fuchsia-600 p-4 flex items-center gap-3">
        <div className="p-2 rounded-md bg-fuchsia-700">
          <Code2 className="w-5 h-5 text-white" />
        </div>
        <span className="font-madimiOne text-lg text-white font-semibold">{domain.name}</span>
      </div>
      <div className="p-4">
        <p className="text-slate-300 font-mclaren text-sm mb-4 leading-relaxed">
          {domain.description}
        </p>
        <button className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2.5 px-4 rounded-md flex items-center gap-2 justify-center font-medium transition-colors duration-200">
          <span>View Domain</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>
    </div>
  </div>
);

export default function ProjectLeadPanel({ role = "Team Lead" }: LeadPanelProps) {
  const stats: Stat[] = [
    { title: "Total Projects", value: 12, description: "Across All Domains" },
    { title: "Team Members", value: 8, description: "Active Contributors" },
    { title: "Completed Projects", value: 5, description: "This Quarter" },
    { title: "Pending Reviews", value: 3, description: "Awaiting Approval" },
  ];

  const statIcons = [FolderOpen, CheckCircle2, Clock, AlertCircle];

  const domains: Domain[] = [
    { name: "Web Development", description: "Access Projects and Resources in Web Development" },
  ];

  return (
    <div className="py-8 w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="font-mclaren text-4xl mb-3 font-bold text-fuchsia-400">
            Welcome back, {role}
          </h2>
          <p className="text-slate-400 font-mclaren text-lg font-medium">
            View and work on your assigned projects
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 w-full">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} icon={statIcons[idx]} />
          ))}
        </div>

        <div className="mb-8">
          <h2 className="font-mclaren text-3xl mb-8 text-fuchsia-300 font-bold">
            Your Domains
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain, idx) => (
            <DomainCard key={idx} domain={domain} />
          ))}
        </div>
      </div>
    </div>
  );
}
