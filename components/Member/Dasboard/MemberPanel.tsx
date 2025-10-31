// "use client";

// import { FolderOpen, CheckCircle2, Clock, AlertCircle, Code2, ArrowRight } from "lucide-react";

// interface Stat {
//   title: string;
//   value: number;
//   description: string;
// }

// // interface Domain {
// //   name: string;
// //   description: string;
// // }

// interface MemberPanelProps {
//   role: "Member User" | "Admin" | "Team Lead";
//   stats: Stat[];
//   // domains: Domain[];
// }

// const StatCard = ({ stat, icon: Icon }: { stat: Stat; icon: any }) => (
//   <div className="group relative">
//     <div className="relative rounded-xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-slate-700/50 p-6 shadow-2xl flex flex-col hover:border-indigo-400/50 transition-all duration-500 hover:shadow-indigo-500/20">
//       <div className="flex items-center justify-between mb-5">
//         <div className="relative">
//           <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300" />
//           <div className="relative p-3 rounded-lg bg-gradient-to-br from-indigo-500/20 via-indigo-400/15 to-purple-500/20 border border-indigo-400/30 group-hover:border-indigo-300/50 transition-all duration-300">
//             <Icon className="w-5 h-5 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300" />
//           </div>
//         </div>
//       </div>
//       <div className="space-y-3">
//         <div className="text-3xl font-bold bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent font-mclaren group-hover:from-indigo-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-300">
//           {stat.value}
//         </div>
//         <div className="text-sm font-semibold text-slate-200 font-mclaren leading-tight group-hover:text-white transition-colors duration-300">
//           {stat.title}
//         </div>
//         <div className="text-xs text-slate-400 font-mclaren group-hover:text-slate-300 transition-colors duration-300">
//           {stat.description}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // const DomainCard = ({ domain }: { domain: Domain }) => (
// //   <div className="group">
// //     <div className="rounded-lg border border-slate-700 bg-slate-900 hover:border-indigo-500 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-indigo-500/20">
// //       <div className="bg-indigo-600 p-4 flex items-center gap-3">
// //         <div className="p-2 rounded-md bg-indigo-700">
// //           <Code2 className="w-5 h-5 text-white" />
// //         </div>
// //         <span className="font-madimiOne text-lg text-white font-semibold">{domain.name}</span>
// //       </div>
// //       <div className="p-4">
// //         <p className="text-slate-300 font-mclaren text-sm mb-4 leading-relaxed">
// //           {domain.description}
// //         </p>
// //         <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-md flex items-center gap-2 justify-center font-medium transition-colors duration-200">
// //           <span>View Domain</span>
// //           <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // );

// export default function MemberPanel({ role = "Member User" }: MemberPanelProps) {
//   const stats: Stat[] = [
//     { title: "Total Projects", value: 12, description: "Across All Domains" },
//     { title: "Completed Projects", value: 5, description: "Across All Domains" },
//     { title: "Ongoing Projects", value: 7, description: "Across All Domains" },
//   ];

//   const statIcons = [FolderOpen, CheckCircle2, Clock, AlertCircle];

//   // const domains: Domain[] = [
//   //   { name: "Web Development", description: "Access Projects and Resources in Web" },
//   // ];

//   return (
//     <div className="py-8 w-full min-h-screen ">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="mb-10">
//           <h2 className="font-mclaren text-4xl mb-3 font-bold bg-gradient-to-r from-white via-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
//             Welcome back, {role}
//           </h2>
//           <p className="text-slate-400 font-mclaren text-lg font-medium">
//             View and work on your assigned projects
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 w-full">
//           {stats.map((stat, idx) => (
//             <StatCard key={idx} stat={stat} icon={statIcons[idx]} />
//           ))}
//         </div>

//         {/* <div className="mb-8">
//           <h2 className="font-mclaren text-3xl mb-8 bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent font-bold">
//             Your Domains
//           </h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {domains.map((domain, idx) => (
//             <DomainCard key={idx} domain={domain} />
//           ))}
//         </div> */}
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import {
  FolderOpen,
  CheckCircle2,
  Clock,
  AlertCircle,
  Code2,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

interface Stat {
  title: string;
  value: number;
  description: string;
}

interface Domain {
  name: string;
  description: string;
}

interface MemberPanelProps {
  role: "Member" | "Admin" | "Lead";
}

const StatCard = ({ stat, icon: Icon }: { stat: Stat; icon: any }) => (
  <div className="group relative">
    <div className="relative rounded-xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-slate-700/50 p-6 shadow-2xl flex flex-col hover:border-indigo-400/50 transition-all duration-500 hover:shadow-indigo-500/20">
      <div className="flex items-center justify-between mb-5">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300" />
          <div className="relative p-3 rounded-lg bg-gradient-to-br from-indigo-500/20 via-indigo-400/15 to-purple-500/20 border border-indigo-400/30 group-hover:border-indigo-300/50 transition-all duration-300">
            <Icon className="w-5 h-5 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="text-3xl font-bold bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent font-mclaren group-hover:from-indigo-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-300">
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
    <div className="rounded-lg border border-slate-700 bg-slate-900 hover:border-indigo-500 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-indigo-500/20">
      <div className="bg-indigo-600 p-4 flex items-center gap-3">
        <div className="p-2 rounded-md bg-indigo-700">
          <Code2 className="w-5 h-5 text-white" />
        </div>
        <span className="font-madimiOne text-lg text-white font-semibold">
          {domain.name}
        </span>
      </div>
      <div className="p-4">
        <p className="text-slate-300 font-mclaren text-sm mb-4 leading-relaxed">
          {domain.description}
        </p>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-md flex items-center gap-2 justify-center font-medium transition-colors duration-200">
          <span>View Domain</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>
    </div>
  </div>
);

export default function MemberPanel({ role = "Member" }: MemberPanelProps) {
  const [stats, setStats] = useState<Stat[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  const statIcons = [FolderOpen, CheckCircle2, Clock, AlertCircle];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();

        setStats([
          {
            title: "Total Projects",
            value: data.totalProjects || 0,
            description: `In ${data.domain} domain`,
          },
          {
            title: "Ongoing Project",
            value: data.activeProjects || 0,
            description: "Across all domains",
          },
          {
            title: "Completed Projects",
            value: data.completedProjects || 0,
            description: "Successfully finished projects",
          },
        ]);
  
        setDomains([
          {
            name: data.domain,
            description: `Access projects, requests, and team details in ${data.domain}`,
          },
        ]);
      } catch (err) {
        console.error("Error fetching stats:", err);
        toast.error("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen text-slate-400 font-mclaren text-lg">
        Loading dashboard stats...
      </div>
    );
  }

  return (
    <div className="py-8 w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="font-mclaren text-4xl mb-3 font-bold bg-gradient-to-r from-white via-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Welcome back, {role}
          </h2>
          <p className="text-slate-400 font-mclaren text-lg font-medium">
            View and work on your assigned projects
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 w-full">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} icon={statIcons[idx]} />
          ))}
        </div>
      </div>
    </div>
  );
}
