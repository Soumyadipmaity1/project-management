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
      ? "bg-indigo-500 text-white"
      : project.badge === "completed"
      ? "bg-green-500 text-white"
      : "bg-gray-500 text-white";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between shadow-md hover:shadow-lg transition min-w-[320px] max-w-[360px]">
      {/* Project Image */}
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-44 object-cover rounded-md mb-4"
        />
      )}

      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-lg text-[#031635]">{project.title}</h3>
        <StatusBadge status={project.badge || "active"} color={statusColor} />
      </div>

      <span className="text-sm text-gray-500 mb-2">{project.domain}</span>

      <p className="text-sm text-gray-700 flex-1 mb-4">{project.description}</p>

      <div className="text-sm text-[#031635] mb-3">
        <div>
          <span className="font-semibold">Team Lead: </span>
          <span className="text-gray-600">{project.teamLead}</span>
        </div>
        <div>
          <span className="font-semibold">Assistant Lead: </span>
          <span className="text-gray-600">{project.assistantLead}</span>
        </div>
      </div>

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-indigo-600 text-sm font-medium hover:underline mb-3"
        >
          <FaGithub /> GitHub Repository
        </a>
      )}

      <div className="flex gap-2">
        <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700">
          View Project
        </button>
      </div>
    </div>
  );
}

export default function LeadProjects() {
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
    <div className="ml-15 py-8">
      <h2 className="font-mclaren text-[38px] mb-4 pt-5 text-[#2A2A4A]">
        Projects
      </h2>
      <p className="text-[#2A2A4AB0] font-mclaren text-[20px] mb-10">
        View and manage projects across your domains
      </p>

      <div className="flex gap-2 mb-6 bg-[#ececec] rounded w-fit border-gray-500">
        <button
          className={`px-4 py-2 rounded font-semibold ${
            activeTab === "all"
              ? "bg-white border-b-2 border-indigo-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Projects
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${
            activeTab === "enrolled"
              ? "bg-white border-b-2 border-indigo-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("enrolled")}
        >
          Enrolled
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${
            activeTab === "available"
              ? "bg-white border-b-2 border-indigo-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("available")}
        >
          Available
        </button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">
          Error: {error}{" "}
          <button
            onClick={fetchProjects}
            className="ml-2 bg-indigo-600 text-white px-3 py-1 rounded"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-[#2A2A4A]">Loading projects...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-[#2A2A4A]">
            {activeTab === "all"
              ? "No projects found"
              : `No ${activeTab} projects found`}
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
