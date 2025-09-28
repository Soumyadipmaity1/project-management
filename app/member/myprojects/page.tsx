"use client";
import React, { useEffect, useState } from "react";
import { FaUsers, FaPlus, FaTimes } from "react-icons/fa";

type Project = {
  _id: string;
  title: string;
  domain: string;
  description: string;
  teamlead: string;
  colead?: string;
  github?: string;
  image?: string;
  badge?: "active" | "completed" | "disabled";
  approved?: boolean;
};

function StatusBadge({ status }: { status: Project["badge"] }) {
  const base =
    "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold";
  switch (status) {
    case "active":
      return <span className={`${base} bg-indigo-900/30 text-indigo-300`}>Active</span>;
    case "completed":
      return <span className={`${base} bg-green-900/30 text-green-300`}>Completed</span>;
    case "disabled":
      return <span className={`${base} bg-gray-700 text-gray-300`}>Disabled</span>;
    default:
      return null;
  }
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-gray-800 rounded-xl shadow-md overflow-hidden max-w-md w-full ring-1 ring-gray-700 hover:shadow-xl hover:shadow-gray-900/20 transition">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">
            {project.title}
          </h3>
          <StatusBadge status={project.badge} />
        </div>

        <p className="text-sm text-gray-400">{project.domain}</p>
        <p className="text-sm text-gray-300">{project.description}</p>

        <div className="mt-2 text-sm text-gray-200">
          <div>
            Team Lead: <span className="text-gray-400">{project.teamlead}</span>
          </div>
          <div>
            Assistant Lead:{" "}
            <span className="text-gray-400">{project.colead || "-"}</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-gray-300">
            <FaUsers className="text-gray-400" /> Members visible in backend
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <a
            href={`/projects/${project._id}`}
            className="px-3 py-2 rounded-md text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-500"
          >
            View Project
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "enrolled" | "available">(
    "all"
  );

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    domain: "",
    description: "",
    teamlead: "",
    colead: "",
    github: "",
  });

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
      setError(err instanceof Error ? err.message : "Error fetching projects");
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "enrolled") return p.approved;
    if (activeTab === "available") return !p.approved;
    return true;
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send request");
      alert("Request sent successfully!");
      setIsModalOpen(false);
      setFormData({
        title: "",
        domain: "",
        description: "",
        teamlead: "",
        colead: "",
        github: "",
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error sending request");
    } finally {
      setSubmitting(false);
    }
  };

  const domains = [
    "Web Development",
    "Mobile Development",
    "Competitive Programming",
    "Design & Branding",
    "Content Writing",
    "Administration",
    "Marketing & PR",
    "Cloud Computing",
    "Cybersecurity",
    "AI / Machine Learning",
  ];

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Projects</h1>
            <p className="text-gray-400 mb-4">Browse and manage projects</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded px-5 py-2 font-semibold flex items-center gap-2 shadow-md"
          >
            <FaPlus /> Add Project
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-800 rounded-lg p-1 w-fit">
          {(["all", "enrolled", "available"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-gray-700 text-indigo-400 shadow"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-gray-300">Loading projects...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : filteredProjects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </section>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md relative border border-gray-700">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
              disabled={submitting}
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-white">
              Send Request for Project Creation
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                placeholder="Project Title *"
                value={formData.title}
                onChange={handleInputChange}
                required
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white placeholder-gray-400 p-2 rounded w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />

              <select
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                required
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="" className="text-gray-400">Select Domain *</option>
                {domains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <textarea
                name="description"
                placeholder="Description *"
                value={formData.description}
                onChange={handleInputChange}
                required
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white placeholder-gray-400 p-2 rounded w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                rows={3}
              />

              <input
                type="text"
                name="teamlead"
                placeholder="Team Lead *"
                value={formData.teamlead}
                onChange={handleInputChange}
                required
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white placeholder-gray-400 p-2 rounded w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />

              <input
                type="text"
                name="colead"
                placeholder="Assistant Lead (optional)"
                value={formData.colead}
                onChange={handleInputChange}
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white placeholder-gray-400 p-2 rounded w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />

              <input
                type="url"
                name="github"
                placeholder="GitHub Repository (optional)"
                value={formData.github}
                onChange={handleInputChange}
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white placeholder-gray-400 p-2 rounded w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />

              <button
                type="submit"
                disabled={submitting}
                className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed font-semibold"
              >
                {submitting ? "Sending..." : "Send Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
