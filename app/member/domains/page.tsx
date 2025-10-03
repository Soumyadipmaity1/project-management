"use client";

import React, { useState, useEffect } from "react";
import { FaUsers, FaArrowLeft } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export type Project = {
  id: string;
  title: string;
  domain: string;
  description: string;
  teamLead: string;
  assistantLead: string;
  members: number;
  status: "active" | "in-progress" | "completed" | "disabled" | "available";
  enrolled: boolean;
};

export default function DomainProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const domainName = searchParams.get('domain') || 'All Domains';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        
        // Filter projects by domain if domain parameter is provided
        const filteredData = domainName !== 'All Domains' 
          ? data.filter((project: Project) => project.domain.toLowerCase() === domainName.toLowerCase())
          : data;
        
        setProjects(filteredData);
      } catch (err) {
        console.error("Error fetching projects:", err);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [domainName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-300">Loading projects...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 ">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6">
         
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {domainName} Projects
            </h1>
            <p className="text-gray-400">
              Explore projects in the {domainName} domain
            </p>
          </div>
        </div>

        {/* Domain Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-indigo-900 text-indigo-300">
            Domain: {domainName}
          </span>
        </div>

        {/* Projects Count */}
        <div className="mb-6">
          <p className="text-gray-300">
            Found <span className="font-semibold text-indigo-400">{projects.length}</span> projects
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </section>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found in this domain</p>
            <p className="text-gray-500 mt-2">Check back later or explore other domains</p>
          </div>
        )}
      </div>
    </main>
  );
}

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

function ProjectCard({ project }: { project: Project }) {
  const disabled = project.status === "disabled";
  const available = project.status === "available";

  const handleSendRequest = () => {
    toast.success(`Request sent successfully for "${project.title}"`, {
      style: {
        background: '#1f2937',
        color: '#fff',
        border: '1px solid #4f46e5',
      },
      iconTheme: {
        primary: '#6366f1',
        secondary: '#fff',
      },
    });
  };

  const handleOpenProject = () => {
    toast.success(`Opening project: "${project.title}"`);
  };

  // Get initials with fallback
  const getInitial = (name: string | undefined | null): string => {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <article className="group relative bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden w-full ring-1 ring-gray-700/50 hover:ring-indigo-500/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      <div className="relative p-6 flex flex-col gap-4">
        {/* Header Section */}
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

        {/* Description */}
        <p className="text-sm text-gray-300/90 leading-relaxed line-clamp-3 min-h-[3.75rem]">
          {project.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        {/* Team Info */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              {getInitial(project.teamLead)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">Team Lead</p>
              <p className="text-sm font-medium text-gray-200 truncate">{project.teamLead || 'Not assigned'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold">
              {getInitial(project.assistantLead)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">Assistant Lead</p>
              <p className="text-sm font-medium text-gray-200 truncate">{project.assistantLead || 'Not assigned'}</p>
            </div>
          </div>
        </div>

        {/* Members Count */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 border border-gray-700/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-indigo-500/10">
              <FaUsers className="text-indigo-400 text-sm" />
            </div>
            <span className="text-sm font-medium text-gray-300">{project.members} Members</span>
          </div>
          {project.enrolled && (
            <div className="flex items-center gap-1.5 text-green-400">
              <span className="text-xs font-semibold">Enrolled</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
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
            {!disabled && (
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
            )}
            <span className="relative">Open Project</span>
          </button>

          {available && (
            <button
              onClick={handleSendRequest}
              className="group/req relative px-4 py-3 rounded-xl text-sm font-semibold border-2 border-indigo-500/50 text-indigo-300 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-indigo-500/10 scale-0 group-hover/req:scale-100 rounded-xl transition-transform duration-300" />
              <span className="relative">Send Request</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
