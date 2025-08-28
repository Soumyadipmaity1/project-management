"use client";
import React, { useEffect, useState } from "react";
import { FaUsers, FaPlus, FaTimes, FaEdit, FaTrash, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

type Project = {
  _id?: string;
  title: string;
  domain: string;
  description: string;
  teamlead: string;
  colead?: string;
  membersCount: number;
  github?: string;
  liveDemo?: string;
  badge?: "active" | "completed" | "disabled";
  approved?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type StatusBadgeProps = {
  status: string;
  color: string;
};

function StatusBadge({ status, color }: StatusBadgeProps) {
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
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
  const statusColor = project.badge === "active" ? "bg-[#14A1FF] text-white" :
                      project.badge === "completed" ? "bg-green-500 text-white" :
                      "bg-gray-400 text-white";

  return (
    <div className="bg-[#D8E6FF] border border-gray-300 rounded-lg p-8 flex flex-col gap-4 min-w-[380px] max-w-[420px] shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[24px] text-[#000000] mb-2">{project.title}</h3>
        <StatusBadge status={project.badge || "active"} color={statusColor} />
      </div>
      <span className="text-[#606060] font-bold text-[15px]">{project.domain}</span>
      <p className="text-[#000000] font-light text-[15px] mb-2">{project.description}</p>
      <div className="text-[#000000] font-bold text-[15px]">
        <div>Team Lead: <span className="text-gray-600">{project.teamlead}</span></div>
        <div>Assistant Lead: <span className="text-gray-600">{project.colead || "-"}</span></div>
        <div className="flex items-center gap-1 mt-4">
          <FaUsers /> {project.membersCount || 0} members
        </div>
      </div>
      
      {/* GitHub and Live Demo Links */}
      <div className="flex flex-col gap-2 mt-2">
        {project.github && (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <FaGithub /> GitHub Repository
          </a>
        )}
        {project.liveDemo && (
          <a 
            href={project.liveDemo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <FaExternalLinkAlt /> Live Demo
          </a>
        )}
      </div>
      
      <div className="flex gap-2 mt-2">
        {isOwner && (
          <>
            <button 
              onClick={() => onEdit(project)}
              className="bg-blue-600 text-white font-bold px-3 py-2 rounded text-xs cursor-pointer"
            >
              <FaEdit />
            </button>
            <button 
              onClick={() => project._id && onDelete(project._id)}
              className="bg-red-600 text-white font-bold px-3 py-2 rounded text-xs cursor-pointer"
            >
              <FaTrash />
            </button>
          </>
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
    membersCount: 1,
    github: "",
    liveDemo: "",
    badge: "active" as "active" | "completed" | "disabled",
    approved: false,
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
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const validateField = (name: string, value: string) => {
    const errors: Record<string, string> = {};
    
    if (name === 'title' && value.length > 0 && value.length < 3) {
      errors.title = "Title must be at least 3 characters long";
    }
    
    if (name === 'description' && value.length > 0 && value.length < 10) {
      errors.description = "Description must be at least 10 characters long";
    }
    
    if (name === 'domain' && value.length > 0 && value.length < 2) {
      errors.domain = "Domain must be at least 2 characters long";
    }
    
    if (name === 'teamlead' && value.length === 0) {
      errors.teamlead = "Team lead is required";
    }
    
    // URL validation for GitHub and Live Demo
    if ((name === 'github' || name === 'liveDemo') && value.length > 0) {
      try {
        new URL(value);
      } catch (e) {
        errors[name] = "Please enter a valid URL";
      }
    }
    
    setFieldErrors(prev => ({ ...prev, ...errors }));
    
    // Clear error if validation passes
    if (fieldErrors[name] && value.length >= 
        (name === 'title' ? 3 : name === 'description' ? 10 : name === 'domain' ? 2 : 1)) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'membersCount' ? parseInt(value) || 1 : 
               name === 'approved' ? (value === 'true') : 
               value 
    }));
    
    if (typeof value === 'string') {
      validateField(name, value);
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
      membersCount: 1,
      github: "",
      liveDemo: "",
      badge: "active",
      approved: false,
    });
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
      membersCount: project.membersCount,
      github: project.github || "",
      liveDemo: project.liveDemo || "",
      badge: project.badge || "active",
      approved: project.approved || false,
    });
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

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (formData.title.length < 3) {
      errors.title = "Title must be at least 3 characters long";
    }
    
    if (formData.description.length < 10) {
      errors.description = "Description must be at least 10 characters long";
    }
    
    if (formData.domain.length < 2) {
      errors.domain = "Domain must be at least 2 characters long";
    }
    
    if (!formData.teamlead.trim()) {
      errors.teamlead = "Team lead is required";
    }
    
    // URL validation for GitHub and Live Demo
    if (formData.github && formData.github.length > 0) {
      try {
        new URL(formData.github);
      } catch (e) {
        errors.github = "Please enter a valid GitHub URL";
      }
    }
    
    if (formData.liveDemo && formData.liveDemo.length > 0) {
      try {
        new URL(formData.liveDemo);
      } catch (e) {
        errors.liveDemo = "Please enter a valid Live Demo URL";
      }
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!validateForm()) {
      setSubmitting(false);
      return;
    }

    try {
      const requestBody = {
        title: formData.title.trim(),
        domain: formData.domain.trim(),
        description: formData.description.trim(),
        teamlead: formData.teamlead.trim(),
        colead: formData.colead.trim() || undefined,
        membersCount: formData.membersCount,
        github: formData.github.trim() || undefined,
        liveDemo: formData.liveDemo.trim() || undefined,
        badge: formData.badge,
        approved: formData.approved,
      };

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

      const responseData = await res.json();
      
      if (!res.ok) {
        throw new Error(responseData.details || responseData.error || 
          (isEditMode ? "Failed to update project" : "Failed to create project"));
      }

      // Refresh the projects list
      await fetchProjects();
      resetModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 
        (isEditMode ? "Failed to update project" : "Failed to create project"));
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete project");
      }

      // Refresh the projects list
      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
      console.error(err);
    }
  };

  const filteredProjects = projects.filter(p => {
    if (activeTab === "all") return true;
    if (activeTab === "enrolled") return p.approved;
    if (activeTab === "available") return !p.approved;
    return true;
  });

  // Check if current user is the owner of a project
  const isProjectOwner = (project: Project) => {
    // In a real app, you would check against the current user's ID
    // For now, we'll assume the current user can edit their own projects
    return true; // Replace with actual ownership check
  };

  return (
    <div className="ml-15 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="font-mclaren font-normal text-[38px] leading-[100%] mb-4 pt-5 text-[#2A2A4A]">
            My Projects
          </h2>
          <p className="text-[#2A2A4AB0] font-mclaren font-normal text-[20px] mb-10">
            View and manage projects across your domains
          </p>
        </div>
        <button
          className="bg-[#2A2A4A] hover:bg-[#3c4067] text-white rounded px-5 py-2 mt-6 font-semibold flex items-center gap-2 shadow-xl cursor-pointer"
          onClick={openCreateModal}
        >
          <FaPlus /> Create Project
        </button>
      </div>

      <div className="flex gap-2 mb-6 bg-[#ececec] rounded w-fit border-gray-500">
        {["all", "enrolled", "available"].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === tab ? "bg-white border-b-2 border-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "all" ? "All Projects" : tab === "enrolled" ? "Enrolled" : "Available"}
          </button>
        ))}
      </div>

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4 text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <p className="p-8">Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <p className="p-8 text-gray-500">No projects found.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project._id || Math.random().toString()} 
              project={project} 
              onEdit={openEditModal}
              onDelete={handleDelete}
              isOwner={isProjectOwner(project)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={resetModal} 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" 
              disabled={submitting}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Project" : "Create Project"}
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mb-4 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <input 
                  type="text" 
                  name="title"
                  placeholder="Title *" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  required 
                  disabled={submitting} 
                  className="border p-2 rounded w-full" 
                />
                {fieldErrors.title && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.title}</p>
                )}
              </div>
              
              <div>
                <input 
                  type="text" 
                  name="domain"
                  placeholder="Domain *" 
                  value={formData.domain} 
                  onChange={handleInputChange} 
                  required 
                  disabled={submitting} 
                  className="border p-2 rounded w-full" 
                />
                {fieldErrors.domain && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.domain}</p>
                )}
              </div>
              
              <div>
                <textarea 
                  name="description"
                  placeholder="Description *" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  required 
                  disabled={submitting} 
                  className="border p-2 rounded w-full" 
                  rows={3} 
                />
                {fieldErrors.description && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.description}</p>
                )}
              </div>
              
              <div>
                <input 
                  type="text" 
                  name="teamlead"
                  placeholder="Team Lead *" 
                  value={formData.teamlead} 
                  onChange={handleInputChange} 
                  required 
                  disabled={submitting} 
                  className="border p-2 rounded w-full" 
                />
                {fieldErrors.teamlead && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.teamlead}</p>
                )}
              </div>
              
              <input 
                type="text" 
                name="colead"
                placeholder="Assistant Lead (optional)" 
                value={formData.colead} 
                onChange={handleInputChange} 
                disabled={submitting} 
                className="border p-2 rounded w-full" 
              />
              
              <div>
                <input 
                  type="url" 
                  name="github"
                  placeholder="GitHub Repository URL (optional)" 
                  value={formData.github} 
                  onChange={handleInputChange} 
                  disabled={submitting} 
                  className="border p-2 rounded w-full" 
                />
                {fieldErrors.github && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.github}</p>
                )}
              </div>
              
              <div>
                <input 
                  type="url" 
                  name="liveDemo"
                  placeholder="Live Demo URL (optional)" 
                  value={formData.liveDemo} 
                  onChange={handleInputChange} 
                  disabled={submitting} 
                  className="border p-2 rounded w-full" 
                />
                {fieldErrors.liveDemo && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.liveDemo}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Members Count *</label>
                <input 
                  type="number" 
                  name="membersCount"
                  value={formData.membersCount} 
                  onChange={handleInputChange} 
                  min={1} 
                  required 
                  disabled={submitting} 
                  className="border p-2 rounded w-full" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select 
                  name="badge"
                  value={formData.badge} 
                  onChange={handleInputChange} 
                  disabled={submitting} 
                  className="border p-2 rounded w-full"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              

              <button 
                type="submit" 
                disabled={submitting || Object.keys(fieldErrors).length > 0} 
                className="bg-[#2A2A4A] text-white px-4 py-2 rounded shadow hover:bg-[#21213b] disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting 
                  ? (isEditMode ? "Updating..." : "Creating...") 
                  : (isEditMode ? "Update Project" : "Create Project")
                }
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}