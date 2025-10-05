"use client";
import React, { useEffect, useState } from "react";
import { FaEye, FaGithub } from "react-icons/fa";

type Project = {
  _id?: string;
  title: string;
  domain: string;
  description: string;
  teamlead: string;
  colead?: string;
  github?: string;
  linkedin?: string;
  badge?: "active" | "completed" | "disabled";
  approved?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

type StatusBadgeProps = {
  status: string;
  color: string;
};

function StatusBadge({ status, color }: StatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${color}`}
    >
      {status}
    </span>
  );
}

type ProjectCardProps = {
  project: Project;
  isOwner: boolean;
};

function ProjectCard({ project, isOwner }: ProjectCardProps) {
  const statusColor =
    project.badge === "active"
      ? "bg-teal-500 text-white shadow-lg"
      : project.badge === "completed"
      ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
      : "bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-lg shadow-slate-500/30";

  return (
    <div className="group relative">
      <div className="relative rounded-xl bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-xl border border-slate-700/50 shadow-2xl hover:border-fuchsia-400/60 transition-all duration-500 hover:shadow-fuchsia-500/25 overflow-hidden flex flex-col w-[360px] group-hover:transform group-hover:scale-[1.02]">
        {project.image && (
          <div className="relative overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
          </div>
        )}

        <div className="p-6 flex flex-col gap-4 flex-grow">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-xl bg-fuchsia-200 bg-clip-text text-transparent font-mclaren leading-tight">{project.title}</h3>
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
              <span className="text-slate-300 text-xs font-mclaren">{project.teamlead}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-fuchsia-300 text-xs font-mclaren">Assistant Lead:</span>
              <span className="text-slate-300 text-xs font-mclaren">{project.colead || "-"}</span>
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

          {isOwner && (
            <div className="flex gap-3 mt-4">
              <a
                href={project.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:transform hover:scale-105 border border-blue-500/20"
              >
                <FaEye className="text-xs" /> 
                <span className="font-mclaren">View Project</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MemProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchProjects();
  }, []);

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

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "enrolled") return p.approved;
    if (activeTab === "available") return !p.approved;
    return true;
  });

  return (
    <div className="p-4 py-6 min-h-screen">
      {/* header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="font-mclaren text-[36px] mb-3 font-bold bg-gradient-to-r from-white via-fuchsia-200 to-teal-300 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-slate-400 text-lg font-medium font-mclaren">
            View and manage projects across your domains
          </p>
        </div>
      </div>

      {/* tabs */}
      <div className="flex gap-1 mb-8 bg-slate-800/60 rounded-xl w-fit border border-slate-700/50 p-1.5 backdrop-blur-sm">
        {["all", "enrolled", "available"].map((tab) => (
          <button
            key={tab}
            className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 font-mclaren ${
              activeTab === tab
                ? "bg-fuchsia-600  text-white shadow-lg shadow-fuchsia-500/30 transform scale-105"
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

      {/* error */}
      {error && !loading && (
        <div className="bg-red-900/50 border border-red-500/50 rounded-xl p-4 mb-6 text-red-200 font-mclaren shadow-lg">
          {error}
        </div>
      )}

      {/* project list */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-slate-300 font-mclaren text-lg">Loading projects...</div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-slate-500 font-mclaren text-lg">No projects found.</div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-start">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id || Math.random().toString()}
              project={project}
              isOwner={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}