"use client";

import { useEffect, useState } from "react";

export default function MemberPanel() {
  const [stats, setStats] = useState<
    {
      title: string;
      value: number;
      description: string;
      color: string;
      accent: string;
    }[]
  >([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/allstats`);
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="px-4 py-6 w-full min-h-screen ">
      <h2 className="text-4xl font-bold text-white">Welcome back, Admin</h2>
      <p className="text-neutral-300 text-lg mb-8">
        View and manage your platform statistics and projects
      </p>

      {/* Skeleton loader when fetching */}
      {stats.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 w-full animate-pulse">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-[20px] bg-slate-800/60 border border-gray-600/30 p-6 shadow-2xl h-[160px]"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 w-full">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`group relative rounded-[20px] bg-gradient-to-br ${stat.color} border border-gray-500/30 p-6 shadow-2xl flex flex-col justify-center items-center hover:scale-105 hover:shadow-3xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden backdrop-blur-sm`}
              style={{
                boxShadow:
                  "0 8px 25px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)",
              }}
            >
              {/* Background gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              ></div>

              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

              {/* Title */}
              <div className="text-gray-100 font-mclaren font-medium text-[16px] leading-[120%] tracking-wide mb-4 text-center group-hover:text-white transition-colors duration-300 z-10">
                {stat.title}
              </div>

              {/* Value */}
              <div
                className={`text-white font-mclaren text-[42px] leading-[100%] tracking-tight mb-4 font-bold bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 z-10`}
              >
                {stat.value}
              </div>

              {/* Description */}
              <div className="text-gray-300 font-mclaren font-normal text-[12px] leading-[120%] tracking-wide text-center group-hover:text-gray-200 transition-colors duration-300 z-10">
                {stat.description}
              </div>

              {/* Animated border */}
              <div
                className={`absolute inset-0 rounded-[20px] border-2 border-transparent group-hover:border-gradient-to-r group-hover:${stat.accent} transition-all duration-300 opacity-0 group-hover:opacity-50`}
              ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
