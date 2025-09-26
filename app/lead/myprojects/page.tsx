"use client";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTimes, FaEdit, FaTrash, FaGithub } from "react-icons/fa";

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
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  isOwner: boolean;
};

function ProjectCard({ project, onEdit, onDelete, isOwner }: ProjectCardProps) {
  const statusColor =
    project.badge === "active"
      ? "bg-indigo-500 text-white"
      : project.badge === "completed"
      ? "bg-green-500 text-white"
      : "bg-gray-500 text-white";

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col w-[360px]">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-44 object-cover"
        />
      )}

      <div className="p-5 flex flex-col gap-3 flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-gray-900">{project.title}</h3>
          <StatusBadge status={project.badge || "active"} color={statusColor} />
        </div>

        <span className="text-sm font-semibold text-gray-600">
          {project.domain}
        </span>

        <p className="text-gray-700 text-sm line-clamp-3">
          {project.description}
        </p>

        <div className="text-sm text-gray-800 space-y-1">
          <div>
            <span className="font-semibold">Team Lead:</span>{" "}
            <span className="text-gray-600">{project.teamlead}</span>
          </div>
          <div>
            <span className="font-semibold">Assistant Lead:</span>{" "}
            <span className="text-gray-600">{project.colead || "-"}</span>
          </div>
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-indigo-600 text-sm font-medium hover:underline"
          >
            <FaGithub /> GitHub Repository
          </a>
        )}

        {isOwner && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onEdit(project)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-xs flex items-center gap-1"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={() => project._id && onDelete(project._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-xs flex items-center gap-1"
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MemProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
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
    setIsEditMode(false);
    setError(null);
    setFieldErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setFormData({
      _id: project._id || "",
      title: project.title,
      domain: project.domain,
      description: project.description,
      teamlead: project.teamlead,
      colead: project.colead || "",
      github: project.github || "",
      linkedin: project.linkedin || "",
      badge: project.badge || "active",
      approved: project.approved || false,
      image: project.image || "",
    });
    setPreviewImage(project.image || null);
    setIsEditMode(true);
    setError(null);
    setFieldErrors({});
    setIsModalOpen(true);
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
      let url = "/api/projects";
      let method = "POST";

      if (isEditMode && formData._id) {
        url = `/api/projects/${formData._id}`;
        method = "PUT";
      }

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

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "enrolled") return p.approved;
    if (activeTab === "available") return !p.approved;
    return true;
  });

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
    <div className="ml-15 py-8">
      {/* header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="font-mclaren text-[36px] text-[#2A2A4A] mb-3">
            My Projects
          </h2>
          <p className="text-[#2A2A4AB0] text-lg">
            View and manage projects across your domains
          </p>
        </div>
        <button
          className="bg-[#0e0c2c]  text-white rounded px-5 py-2 mt-6 font-semibold flex items-center gap-2 shadow-md"
          onClick={openCreateModal}
        >
          <FaPlus /> Create Project
        </button>
      </div>

      {/* tabs */}
      <div className="flex gap-2 mb-6 bg-[#f4f4f4] rounded w-fit border">
        {["all", "enrolled", "available"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded font-medium ${
              activeTab === tab
                ? "bg-white border-b-2 border-indigo-600"
                : "text-gray-500"
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
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4 text-red-600">
          {error}
        </div>
      )}

      {/* project list */}
      {loading ? (
        <p className="p-8">Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <p className="p-8 text-gray-500">No projects found.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id || Math.random().toString()}
              project={project}
              onEdit={openEditModal}
              onDelete={handleDelete}
              isOwner={true}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0e0c2c]  text-white p-6 rounded-xl shadow w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={resetModal}
              className="absolute top-3 right-3 text-gray-300 hover:text-white"
              disabled={submitting}
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {isEditMode ? "Edit Project" : "Create Project"}
            </h2>

            {error && (
              <div className="bg-red-200 text-red-900 border border-red-300 rounded p-3 mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={submitting}
                className="border p-2 rounded w-full text-white"
              />

              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded border"
                />
              )}

              <input
                type="text"
                name="title"
                placeholder="Title *"
                value={formData.title}
                onChange={handleInputChange}
                required
                disabled={submitting}
                className="border p-2 rounded w-full text-white"
              />

              <select
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                required
                disabled={submitting}
                className="border p-2 rounded w-full text-white"
              >
                <option value="">Select Domain *</option>
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
                className="border p-2 rounded w-full text-white"
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
                className="border p-2 rounded w-full text-white"
              />

              <input
                type="text"
                name="colead"
                placeholder="Assistant Lead (optional)"
                value={formData.colead}
                onChange={handleInputChange}
                disabled={submitting}
                className="border p-2 rounded w-full text-white"
              />

              <input
                type="url"
                name="github"
                placeholder="GitHub Repository URL"
                value={formData.github}
                onChange={handleInputChange}
                disabled={submitting}
                className="border p-2 rounded w-full text-white"
                required
              />

              <select
                name="badge"
                value={formData.badge}
                onChange={handleInputChange}
                disabled={submitting}
                className="border p-2 rounded w-full text-white"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="disabled">Disabled</option>
              </select>

              <button
                type="submit"
                disabled={submitting}
                className="bg-white text-indigo-800 px-4 py-2 rounded shadow hover:bg-gray-200 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
              >
                {submitting
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                  ? "Update Project"
                  : "Create Project"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
