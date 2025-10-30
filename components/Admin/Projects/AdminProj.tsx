"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaUsers,
  FaChevronDown,
  FaEye,
} from "react-icons/fa";

type Project = {
  _id: string;
  title: string;
  description: string;
  domain: string | string[];
  projectlead?: { name?: string };
  colead?: { name?: string };
  members?: any[];
  github?: string;
  liveDemo?: string;
  badge?: string;
};

// Optional status colors
const statusColors: Record<string, string> = {
  active: "bg-green-600 text-white",
  completed: "bg-blue-600 text-white",
  disabled: "bg-red-600 text-white",
  available: "bg-gray-600 text-white",
};

function StatusBadge({ status }: { status: string }) {
  const color = statusColors[status] || "bg-neutral-800 text-white";
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
      {status}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();

  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 flex flex-col gap-6 min-w-[380px] max-w-[420px] shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-xl text-white mb-1">{project.title}</h3>
          <span className="text-neutral-400 font-medium text-sm uppercase tracking-wide">
            {Array.isArray(project.domain)
              ? project.domain.join(", ")
              : project.domain}
          </span>
        </div>
        <StatusBadge status={project.badge || "active"} />
      </div>

      {/* Description */}
      <div className="border-b border-neutral-700 pb-4">
        <p className="text-neutral-300 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Team Info */}
      <div className="space-y-3">
        <h4 className="text-white font-semibold text-sm uppercase tracking-wide">
          Team
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Lead:</span>
            <span className="text-white font-medium">
              {project.projectlead?.name || "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Co-Lead:</span>
            <span className="text-white font-medium">
              {project.colead?.name || "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-neutral-400">Members:</span>
            <div className="flex items-center gap-1 text-neutral-300">
              <FaUsers className="text-xs" />
              <span className="font-medium">{project.members?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-3 flex flex-wrap gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium px-4 py-3 rounded-lg text-sm text-center"
          >
            <FaGithub className="inline mr-2" /> GitHub
          </a>
        )}

        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white hover:bg-neutral-200 text-black font-medium px-4 py-3 rounded-lg text-sm text-center"
          >
            <FaExternalLinkAlt className="inline mr-2" /> Live
          </a>
        )}

        {/* New View Project Button */}
        <button
          onClick={() => router.push(`/admin/projects/${project._id}`)}
          className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white font-medium px-4 py-3 rounded-lg text-sm text-center"
        >
          <FaEye className="inline mr-2" /> View Project
        </button>
      </div>
    </div>
  );
}

export default function LeadProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data.projects || data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Domain filter
  const domains = ["All", ...Array.from(new Set(projects.flatMap((p) => p.domain)))];

  const filteredProjects =
    selectedDomain === "All"
      ? projects
      : projects.filter((p) =>
          Array.isArray(p.domain)
            ? p.domain.includes(selectedDomain)
            : p.domain === selectedDomain
        );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-neutral-300 text-lg">
        Loading projects...
      </div>
    );

  return (
    <div className="px-4 py-6 min-h-screen bg-black text-white">
      <h2 className="text-4xl font-bold mb-2">Projects</h2>
      <p className="text-neutral-300 text-lg mb-8">
        View and manage projects across your domains
      </p>

      {/* Domain Filter */}
      <div className="relative mb-6 w-fit">
        <button
          className="flex items-center gap-2 bg-neutral-800 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-neutral-700 transition"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Domain: {selectedDomain}
          <FaChevronDown
            className={`transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-10 min-w-[200px]">
            {domains.map((domain) => (
              <button
                key={domain}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-700 transition-colors duration-200 ${
                  selectedDomain === domain
                    ? "bg-neutral-700 text-white"
                    : "text-neutral-300"
                }`}
                onClick={() => {
                  setSelectedDomain(domain);
                  setIsDropdownOpen(false);
                }}
              >
                {domain}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-neutral-400 text-sm mb-4">
        Showing {filteredProjects.length} project
        {filteredProjects.length !== 1 ? "s" : ""}
      </p>

      <div className="flex flex-wrap gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}
