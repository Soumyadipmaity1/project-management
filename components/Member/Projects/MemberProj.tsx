"use client";

import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

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

export default function ProjectGrid() {
  const [activeTab, setActiveTab] = useState<"all" | "enrolled" | "available">(
    "all"
  );
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "enrolled") return p.enrolled;
    if (activeTab === "available") return p.status === "available";
    return true;
  });

  if (loading) return <p className="text-center text-gray-300">Loading projects...</p>;

  return (
    <main className="min-h-screen p-4">
      <Toaster position="top-right" /> 
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
        <p className="text-gray-400 mb-6">
          View and manage projects across your domains
        </p>

        <div className="flex gap-2 mb-6 bg-gray-800 rounded-lg p-1 w-fit">
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

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </section>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const base =
    "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold";
  switch (status) {
    case "active":
      return <span className={`${base} bg-blue-900 text-blue-300`}>Active</span>;
    case "in-progress":
      return (
        <span className={`${base} bg-indigo-900 text-indigo-300`}>
          In Progress
        </span>
      );
    case "completed":
      return (
        <span className={`${base} bg-green-900 text-green-300`}>Completed</span>
      );
    case "disabled":
      return (
        <span className={`${base} bg-gray-700 text-gray-400`}>Disabled</span>
      );
    case "available":
      return (
        <span className={`${base} bg-yellow-900 text-yellow-300`}>
          Available
        </span>
      );
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

  return (
    <article className="bg-gray-800 rounded-xl shadow-lg overflow-hidden max-w-md w-full ring-1 ring-gray-700 hover:shadow-xl hover:ring-gray-600 transition">
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {project.title}
          </h3>
          <StatusBadge status={project.status} />
        </div>

        <p className="text-sm text-gray-400">{project.domain}</p>
        <p className="text-sm text-gray-300">{project.description}</p>

        <div className="mt-2 text-sm text-gray-200">
          <div>
            Team Lead: <span className="text-gray-400">{project.teamLead}</span>
          </div>
          <div>
            Assistant Lead:{" "}
            <span className="text-gray-400">{project.assistantLead}</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-gray-300">
            <FaUsers className="text-gray-400" /> {project.members} members
          </div>
        </div>

        <div className="mt-3 text-xs font-medium text-indigo-400">
          Domain: {project.domain}
        </div>

        <div className="flex gap-3 mt-4">
          <button
            disabled={disabled}
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
