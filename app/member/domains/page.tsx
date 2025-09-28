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
    toast.success(`Request sent successfully for "${project.title}"`);
  };

  const handleOpenProject = () => {
    toast.success(`Opening project: "${project.title}"`);
  };

  return (
    <article className="bg-gray-800 rounded-xl shadow-lg overflow-hidden max-w-md w-full ring-1 ring-gray-700 hover:shadow-xl hover:ring-gray-600 transition">
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white truncate">
            {project.title}
          </h3>
          <StatusBadge status={project.status} />
        </div>

        <p className="text-sm text-gray-400 font-medium">{project.domain}</p>
        <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>

        <div className="mt-2 text-sm text-gray-200 space-y-1">
          <div>
            Team Lead: <span className="text-gray-400">{project.teamLead}</span>
          </div>
          <div>
            Assistant Lead: <span className="text-gray-400">{project.assistantLead}</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-gray-300">
            <FaUsers className="text-gray-400" /> {project.members} members
          </div>
        </div>

        {project.enrolled && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-300">
              Enrolled
            </span>
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <button
            disabled={disabled}
            onClick={handleOpenProject}
            className={`px-3 py-2 rounded-md text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 focus:ring-offset-gray-800 ${
              disabled
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Open Project
          </button>

          {available && (
            <button
              onClick={handleSendRequest}
              className="px-3 py-2 rounded-md text-xs font-medium border border-indigo-500 text-indigo-400 bg-gray-800 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 focus:ring-offset-gray-800"
            >
              Send Request
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
