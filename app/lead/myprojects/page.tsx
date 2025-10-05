"use client";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTimes, FaTrash, FaGithub, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

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
  onView: (projectId: string) => void;
  onDelete: (projectId: string) => void;
  isOwner: boolean;
};

function ProjectCard({ project, onView, onDelete, isOwner }: ProjectCardProps) {
  const statusColor =
    project.badge === "active"
      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
      : project.badge === "completed"
      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30"
      : "bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-lg shadow-slate-500/30";

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
      <div className="relative rounded-xl bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-xl border border-slate-700/50 shadow-2xl hover:border-emerald-400/60 transition-all duration-500 hover:shadow-emerald-500/25 overflow-hidden flex flex-col w-[360px] group-hover:transform group-hover:scale-[1.02]">
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
            <h3 className="font-bold text-xl bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent font-mclaren leading-tight">{project.title}</h3>
            <StatusBadge status={project.badge || "active"} color={statusColor} />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"></div>
            <span className="text-sm font-semibold text-emerald-300 font-mclaren">
              {project.domain}
            </span>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed font-mclaren">
            {project.description}
          </p>

          <div className="space-y-2 bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-300 text-xs font-mclaren">Team Lead:</span>
              <span className="text-slate-300 text-xs font-mclaren">{project.teamlead}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-300 text-xs font-mclaren">Assistant Lead:</span>
              <span className="text-slate-300 text-xs font-mclaren">{project.colead || "-"}</span>
            </div>
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-all duration-200 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg p-3 border border-emerald-500/20 hover:border-emerald-400/40"
            >
              <FaGithub className="group-hover/link:rotate-12 transition-transform duration-200" /> 
              <span className="font-mclaren">GitHub Repository</span>
            </a>
          )}

          {isOwner && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => project._id && onView(project._id)}
                className="flex-1 bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-700 hover:via-emerald-700 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:transform hover:scale-105 border border-emerald-500/20"
              >
                <FaEye className="text-xs" /> 
                <span className="font-mclaren">View Project</span>
              </button>
              <button
                onClick={() => project._id && onDelete(project._id)}
                className="flex-1 bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-700 hover:via-red-700 hover:to-red-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:transform hover:scale-105 border border-red-500/20"
              >
                <FaTrash className="text-xs" /> 
                <span className="font-mclaren">Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MemProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    domain: "",
    description: "",
    teamlead: "",
    colead: "",
    github: "",
    linkedin: "",
    badge: "active" as "active" | "completed" | "disabled",
    approved: false,
    image: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const openCreateModal = () => {
    setFormData({
      _id: "",
      title: "",
      domain: "",
      description: "",
      teamlead: "",
      colead: "",
      github: "",
      linkedin: "",
      badge: "active",
      approved: false,
      image: "",
    });
    setPreviewImage(null);
    setError(null);
    setFieldErrors({});
    setIsModalOpen(true);
  };

  const handleViewProject = (projectId: string) => {
    router.push(`/lead/myprojects/${projectId}`);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setError(null);
    setFieldErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const requestBody = { ...formData };
      const url = "/api/projects";
      const method = "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) throw new Error("Failed to save project");

      await fetchProjects();
      resetModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
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
    <div className="p-4 py-6 min-h-screen">
      {/* header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="font-mclaren text-[36px] mb-3 font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-slate-400 text-lg font-medium font-mclaren">
            View and manage projects across your domains
          </p>
        </div>
        <div className="relative group">
          <button
            className="relative bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-700 hover:via-emerald-700 hover:to-teal-700 text-white rounded-lg px-6 py-3 mt-6 font-semibold flex items-center gap-3 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 border border-emerald-500/20 hover:border-emerald-400/40 hover:transform hover:scale-105 font-mclaren"
            onClick={openCreateModal}
          >
            <FaPlus className="text-sm" /> 
            <span>Create Project</span>
          </button>
        </div>
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
      ) : projects.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-slate-500 font-mclaren text-lg">No projects found.</div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-start">
          {projects.map((project) => (
            <ProjectCard
              key={project._id || Math.random().toString()}
              project={project}
              onView={handleViewProject}
              onDelete={handleDelete}
              isOwner={true}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-xl border border-slate-700/50 p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <button
                onClick={resetModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-all duration-200 bg-slate-800/50 hover:bg-red-500/20 rounded-lg p-2 border border-slate-700/50 hover:border-red-500/50"
                disabled={submitting}
              >
                <FaTimes />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent font-mclaren">
                Create Project
              </h2>

              {error && (
                <div className="bg-red-900/50 text-red-200 border border-red-500/50 rounded-lg p-3 mb-4 text-sm font-mclaren">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={submitting}
                    className="border border-slate-600 bg-slate-800/80 p-3 rounded-lg w-full text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-all duration-200 font-mclaren hover:bg-slate-700/80"
                  />
                </div>

                {previewImage && (
                  <div className="relative rounded-lg overflow-hidden border border-slate-600">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-40 object-cover"
                    />
                  </div>
                )}

                {/* Form inputs with same styling pattern */}
                <input
                  type="text"
                  name="title"
                  placeholder="Title *"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  disabled={submitting}
                  className="border border-slate-600 bg-slate-800/80 p-3 rounded-lg w-full text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-all duration-200 font-mclaren hover:bg-slate-700/80"
                />

                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                  required
                  disabled={submitting}
                  className="border border-slate-600 bg-slate-800/80 p-3 rounded-lg w-full text-white focus:border-emerald-500 focus:outline-none transition-all duration-200 font-mclaren hover:bg-slate-700/80"
                >
                  <option value="" className="text-slate-400 bg-slate-800">Select Domain *</option>
                  {domains.map((d) => (
                    <option key={d} value={d} className="text-white bg-slate-800">
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
                  className="border border-slate-600 bg-slate-800/80 p-3 rounded-lg w-full text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-all duration-200 font-mclaren hover:bg-slate-700/80 resize-none"
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
                  className="border border-slate-600 bg-slate-800/80 p-3 rounded-lg w-full text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-all duration-200 font-mclaren hover:bg-slate-700/80"
                />

                <input
                  type="text"
                  name="colead"
                  placeholder="Assistant Lead (optional)"
                  value={formData.colead}
                  onChange={handleInputChange}
                  disabled={submitting}
                  className="border border-slate-600 bg-slate-800/80 p-3 rounded-lg w-full text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-all duration-200 font-mclaren hover:bg-slate-700/80"
                />

                <input
                  type="url"
                  name="github"
                  placeholder="GitHub Repository URL"
                  value={formData.github}
                  onChange={handleInputChange}
                  disabled={submitting}
                  className="border border-slate-600 bg-slate-800/80 p-3 rounded-lg w-full text-white placeholder-slate-400 focus:border-emerald-500 focus:outline-none transition-all duration-200 font-mclaren hover:bg-slate-700/80"
                  required
                />

                <select
                  name="badge"
                  value={formData.badge}
                  onChange={handleInputChange}
                  disabled={submitting}
                  className="border border-slate-600 bg-slate-800/80 p-3 rounded-lg w-full text-white focus:border-emerald-500 focus:outline-none transition-all duration-200 font-mclaren hover:bg-slate-700/80"
                >
                  <option value="active" className="text-white bg-slate-800">Active</option>
                  <option value="completed" className="text-white bg-slate-800">Completed</option>
                  <option value="disabled" className="text-white bg-slate-800">Disabled</option>
                </select>

                <div className="relative group mt-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg opacity-75 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300"></div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="relative w-full bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-700 hover:via-emerald-700 hover:to-teal-700 disabled:from-slate-600 disabled:to-slate-700 text-white px-6 py-3 rounded-lg shadow-2xl disabled:cursor-not-allowed font-semibold transition-all duration-300 font-mclaren border border-emerald-500/20 hover:border-emerald-400/40 hover:transform hover:scale-105"
                  >
                    {submitting ? "Creating..." : "Create Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}