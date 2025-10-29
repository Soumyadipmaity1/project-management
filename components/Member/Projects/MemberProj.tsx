"use client";

import React, { useState, useEffect } from "react";
import { FaUsers, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export type Project = {
  _id: string;
  title: string;
  domain: string;
  description: string;
  projectlead?: string;
  colead?: string;
  members: number;
  status: "active" | "in-progress" | "completed" | "disabled" | "available";
  enrolled: boolean;
};

export default function ProjectGrid() {
  const [activeTab, setActiveTab] = useState<"all" | "enrolled" | "available">("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState<string>("all");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects", { method: "GET" });
        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();

        // const mapped = (data || []).map((proj: any): Project => ({
        //   _id: proj._id,
        //   title: proj.title || "Untitled Project",
        //   domain: proj.domain || "Unknown",
        //   description: proj.description || "No description provided.",
        //   projectlead: proj.projectlead || proj.projectlead || "Not assigned",
        //   colead: proj.colead || proj.assistantLead || "Not assigned",
        //   members: proj.members?.length || proj.memberCount || 0,
        //   status:
        //     proj.status ||
        //     (proj.badge === "completed"
        //       ? "completed"
        //       : proj.available
        //       ? "available"
        //       : "active"),
        //   enrolled: proj.enrolled ?? false,
        // }));
        const mapped = (data || []).map((proj: any): Project => ({
  _id: proj._id,
  title: proj.title || "Untitled Project",
  domain: proj.domain || "Unknown",
  description: proj.description || "No description provided.",
  projectlead:
    typeof proj.projectlead === "object"
      ? proj.projectlead.name
      : proj.projectlead || "Not assigned",
  colead:
    typeof proj.colead === "object"
      ? proj.colead.name
      : proj.colead || "Not assigned",
  members: proj.members?.length || proj.memberCount || 0,
  status:
    proj.status ||
    (proj.badge === "completed"
      ? "completed"
      : proj.available
      ? "available"
      : "active"),
  enrolled: proj.enrolled ?? false,
}));


        setProjects(mapped);
      } catch (err) {
        console.error("Error fetching projects:", err);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // ✅ Filter out invalid domains and ensure uniqueness
  const uniqueDomains = [
    "all",
    ...Array.from(
      new Set(
        projects
          .map((p) => (typeof p.domain === "string" ? p.domain : "Unknown"))
          .filter(Boolean)
      )
    ),
  ];

  const filteredProjects = projects.filter((p) => {
    let tabMatch = true;
    if (activeTab === "enrolled") tabMatch = p.enrolled;
    if (activeTab === "available") tabMatch = p.status === "available";
    const domainMatch =
      selectedDomain === "all" || p.domain === selectedDomain;
    return tabMatch && domainMatch;
  });

  if (loading)
    return (
      <p className="text-center text-gray-300 font-mclaren">
        Loading projects...
      </p>
    );

  return (
    <main className="min-h-screen p-4">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
        <p className="text-gray-400 mb-6">
          View and manage projects across your domains
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Tabs */}
          <div className="flex gap-2 bg-gray-800 rounded-lg p-1 w-fit">
            {(["all", "enrolled", "available"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-gray-700 text-indigo-400 shadow-lg"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Domain Filter */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="domain-filter"
              className="text-sm text-gray-400 font-medium"
            >
              Domain:
            </label>
            <select
              id="domain-filter"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="bg-gray-800 text-gray-200 border border-gray-700 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-gray-600 transition cursor-pointer"
            >
              {uniqueDomains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain === "all"
                    ? "All Domains"
                    : typeof domain === "string"
                    ? domain.charAt(0).toUpperCase() + domain.slice(1)
                    : "Unknown"}
                </option>
              ))}
            </select>
          </div>

          {/* Count */}
          <div className="ml-auto text-sm text-gray-400">
            <span className="font-semibold text-indigo-400">
              {filteredProjects.length}
            </span>{" "}
            project{filteredProjects.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Project Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </section>
      </div>
    </main>
  );
}

// ✅ Status badge
function StatusBadge({ status }: { status: Project["status"] }) {
  const base = "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold";
  switch (status) {
    case "active":
      return <span className={`${base} bg-blue-900 text-blue-300`}>Active</span>;
    case "in-progress":
      return <span className={`${base} bg-indigo-900 text-indigo-300`}>In Progress</span>;
    case "completed":
      return <span className={`${base} bg-green-900 text-green-300`}>Completed</span>;
    case "disabled":
      return <span className={`${base} bg-gray-700 text-gray-400`}>Disabled</span>;
    case "available":
      return <span className={`${base} bg-yellow-900 text-yellow-300`}>Available</span>;
    default:
      return null;
  }
}

// ✅ Individual project card
function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const disabled = project.status === "disabled";
  const available = project.status === "available";
  const enrolled = project.enrolled;

  const handleOpenProject = () => {
    if (!disabled) router.push(`/member/projects/${project._id}`);
  };

  const handleSendRequest = async () => {
    try {
      const res = await fetch(`/api/project-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project._id }),
      });

      if (!res.ok) throw new Error("Request failed");

      toast.success(`Request sent for "${project.title}"`, {
        style: { background: "#1f2937", color: "#fff", border: "1px solid #4f46e5" },
        iconTheme: { primary: "#6366f1", secondary: "#fff" },
      });
    } catch (err) {
      console.error("Failed to send request:", err);
      toast.error("Failed to send request");
    }
  };

  return (
    <article className="group relative bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden w-full ring-1 ring-gray-700/50 hover:ring-indigo-500/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors line-clamp-2">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {project.domain}
              </span>
            </div>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <p className="text-sm text-gray-300/90 leading-relaxed line-clamp-3 min-h-[3.75rem]">
          {project.description}
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        <div className="space-y-2.5">
          <TeamInfo label="Project Lead" name={project.projectlead} color="indigo" />
          <TeamInfo label="Co Lead" name={project.colead} color="blue" />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 border border-gray-700/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-indigo-500/10">
              <FaUsers className="text-indigo-400 text-sm" />
            </div>
            <span className="text-sm font-medium text-gray-300">
              {project.members} Members
            </span>
          </div>
          {enrolled && (
            <div className="flex items-center gap-1.5 text-green-400">
              <FaCheckCircle className="text-xs" />
              <span className="text-xs font-semibold">Enrolled</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-2">
          <button
            disabled={disabled}
            onClick={handleOpenProject}
            className={`group/btn relative flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 overflow-hidden ${
              disabled
                ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
            }`}
          >
            <span className="relative flex items-center justify-center gap-2">
              Open Project
              {!disabled && (
                <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
              )}
            </span>
          </button>

          {available && (
            <button
              onClick={handleSendRequest}
              className="group/req relative px-4 py-3 rounded-xl text-sm font-semibold border-2 border-indigo-500/50 text-indigo-300 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-400 transition-all duration-300 overflow-hidden"
            >
              <span className="relative flex items-center justify-center gap-2">
                Send Request
                <FaArrowRight className="text-xs group-hover/req:translate-x-1 transition-transform" />
              </span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function TeamInfo({
  label,
  name,
  color,
}: {
  label: string;
  name?: string;
  color: string;
}) {
  const getInitial = (n?: string) => (n && n.length > 0 ? n[0].toUpperCase() : "?");
  const colorClass =
    color === "blue"
      ? "from-blue-500 to-cyan-600"
      : "from-indigo-500 to-purple-600";

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white text-xs font-bold`}
      >
        {getInitial(name)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-200 truncate">
          {name || "Not assigned"}
        </p>
      </div>
    </div>
  );
}
