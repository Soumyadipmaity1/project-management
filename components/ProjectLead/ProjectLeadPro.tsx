"use client";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

type Project = {
  id: string;
  title: string;
  domain: string;
  description: string;
  teamLead: string;
  assistantLead: string;
  github?: string;
  live?: string;
  badge?: "active" | "completed" | "disabled";
  enrolled: boolean;
  image?: string;
};

type StatusBadgeProps = {
  status: string;
  color: string;
};

function StatusBadge({ status, color }: StatusBadgeProps) {
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color}`}>
      {status}
    </span>
  );
}

type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
  const statusColor =
    project.badge === "active"
      ? "bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30"
      : project.badge === "completed"
      ? "bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30"
      : "bg-slate-500 text-white shadow-lg shadow-slate-500/30";

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-fuchsia-500/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
      <div className="relative rounded-xl bg-slate-900 backdrop-blur-xl border border-slate-700/50 shadow-2xl hover:border-fuchsia-400/60 transition-all duration-500 hover:shadow-fuchsia-500/25 overflow-hidden flex flex-col w-[360px] group-hover:transform group-hover:scale-[1.02]">
        {project.image && (
          <div className="relative overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-900/20" />
          </div>
        )}

        <div className="p-6 flex flex-col gap-4 flex-grow">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-xl text-white font-mclaren leading-tight">{project.title}</h3>
            <StatusBadge status={project.badge || "active"} color={statusColor} />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-fuchsia-400"></div>
            <span className="text-sm font-semibold text-fuchsia-300 font-mclaren">
              {project.domain}
            </span>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed font-mclaren">
            {project.description}
          </p>

          <div className="space-y-2 bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-fuchsia-300 text-xs font-mclaren">Team Lead:</span>
              <span className="text-slate-300 text-xs font-mclaren">{project.teamLead}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-fuchsia-300 text-xs font-mclaren">Assistant Lead:</span>
              <span className="text-slate-300 text-xs font-mclaren">{project.assistantLead}</span>
            </div>
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-fuchsia-400 text-sm font-medium hover:text-fuchsia-300 transition-all duration-200 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 rounded-lg p-3 border border-fuchsia-500/20 hover:border-fuchsia-400/40"
            >
              <FaGithub className="group-hover/link:rotate-12 transition-transform duration-200" /> 
              <span className="font-mclaren">GitHub Repository</span>
            </a>
          )}

          <div className="flex gap-3 mt-4">
            <button className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 hover:transform hover:scale-105 border border-fuchsia-500/20 font-mclaren">
              View Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectLeadProjects() {
  const [activeTab, setActiveTab] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true;
    if (activeTab === "enrolled") return project.enrolled;
    if (activeTab === "available") return !project.enrolled;
    return true;
  });

  return (
    <div className="p-4 py-6 min-h-screen">
      <div className="mb-8">
        <h2 className="font-mclaren text-[36px] mb-3 font-bold text-white">
          Projects
        </h2>
        <p className="text-slate-400 text-lg font-medium font-mclaren">
          View and manage projects across your domains
        </p>
      </div>

      <div className="flex gap-1 mb-8 bg-slate-800/60 rounded-xl w-fit border border-slate-700/50 p-1.5 backdrop-blur-sm">
        {["all", "enrolled", "available"].map((tab) => (
          <button
            key={tab}
            className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 font-mclaren ${
              activeTab === tab
                ? "bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/30 transform scale-105"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "all"
              ? "All Projects"
              : tab === "enrolled"
              ? "Enrolled"
              : "Available"}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500/50 rounded-xl p-4 mb-6 text-red-200 font-mclaren shadow-lg">
          <p className="mb-2">{error}</p>
          <button
            onClick={fetchProjects}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-400 mx-auto mb-4"></div>
            <p className="text-slate-300 text-lg font-mclaren">Loading projects...</p>
          </div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-center bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <div className="text-6xl mb-4 text-slate-600">📋</div>
            <p className="text-slate-300 text-lg font-mclaren">
              {activeTab === "all"
                ? "No projects found"
                : `No ${activeTab} projects found`}
            </p>
            <p className="text-slate-500 text-sm mt-2 font-mclaren">Projects will appear here once they're available</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-start">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

