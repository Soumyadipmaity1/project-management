"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus, FaTimes, FaTrash, FaGithub, FaEye, FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Project = {
  _id?: string;
  title: string;
  domain: string | string[];
  description: string;
  projectlead: string | { name: string };
  colead?: string | { name: string };
  github?: string;
  liveDemo?: string;
  badge?: "active" | "completed" | "disabled" | "available";
  approved?: boolean;
  members?: string[];
  membersCount?: number;
  enrolled?: boolean;
  requests?: {
    user: string;
    status: "Pending" | "Approved" | "Rejected";
    createdAt?: string;
  }[];
  startDate?: string | Date;
  completionDate?: string | Date;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
};

type StatusBadgeProps = { status: string; color: string };

function StatusBadge({ status, color }: StatusBadgeProps) {
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color}`}>
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
      : project.badge === "available"
      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30"
      : "bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-lg shadow-slate-500/30";

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
      <div className="relative rounded-xl bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-xl border border-slate-700/50 shadow-2xl hover:border-emerald-400/60 transition-all duration-500 hover:shadow-emerald-500/25 overflow-hidden flex flex-col w-[360px] group-hover:transform group-hover:scale-[1.02]">
        {project.image && (
          <div className="relative overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
          </div>
        )}

        <div className="p-6 flex flex-col gap-4 flex-grow">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-xl bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent font-mclaren leading-tight">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              <StatusBadge status={project.badge || "active"} color={statusColor} />
              {isOwner && (
                <button
                  aria-label="Edit project"
                  className="p-2 rounded-md bg-slate-800/60 hover:bg-slate-700/60 text-slate-200"
                  onClick={() => window.dispatchEvent(new CustomEvent("openEditProject", { detail: project }))}
                >
                  <FaEdit />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
            <span className="text-sm font-semibold text-emerald-300 font-mclaren">
              {Array.isArray(project.domain) ? project.domain.join(", ") : project.domain}
            </span>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed font-mclaren">{project.description}</p>

          <div className="space-y-2 bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-300 text-xs font-mclaren">Project Lead:</span>
              <span className="text-slate-300 text-xs font-mclaren">{typeof project.projectlead === "object" ? project.projectlead.name : project.projectlead}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-300 text-xs font-mclaren">Assistant Lead:</span>
              <span className="text-slate-300 text-xs font-mclaren">{typeof project.colead === "object" ? project.colead.name : project.colead || "-"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-300 text-xs font-mclaren">Members:</span>
              <span className="text-slate-300 text-xs font-mclaren">{project.membersCount ?? 1}</span>
            </div>
          </div>

          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-2 text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-all duration-200 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg p-3 border border-emerald-500/20 hover:border-emerald-400/40">
              <FaGithub className="group-hover/link:rotate-12 transition-transform duration-200" />
              <span className="font-mclaren">GitHub Repository</span>
            </a>
          )}

          {project.liveDemo && (
            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-2 text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-all duration-200 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg p-3 border border-indigo-500/20 hover:border-indigo-400/40">
              <FaEye className="group-hover/link:rotate-12 transition-transform duration-200" />
              <span className="font-mclaren">Live Demo</span>
            </a>
          )}

          {isOwner && (
            <div className="flex gap-3 mt-4">
              <button onClick={() => project._id && onView(project._id)} className="flex-1 bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                <FaEye className="text-xs" /> <span className="font-mclaren">View Project</span>
              </button>
              <button onClick={() => project._id && onDelete(project._id)} className="flex-1 bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                <FaTrash className="text-xs" /> <span className="font-mclaren">Delete</span>
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

  type FormDataType = {
    _id: string;
    title: string;
    domain1: string;
    domain2: string;
    domain3: string;
    description: string;
    projectlead: string;
    colead: string;
    github: string;
    liveDemo: string;
    badge: "active" | "completed" | "disabled" | "available";
    approved: boolean;
    image: string;
    startDate: string;
    completionDate: string;
  };

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    _id: "",
    title: "",
    domain1: "",
    domain2: "",
    domain3: "",
    description: "",
    projectlead: "",
    colead: "",
    github: "",
    liveDemo: "",
    badge: "active",
    approved: false,
    image: "",
    startDate: "",
    completionDate: "",
  });

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<FormDataType>({ ...formData });

  useEffect(() => {
    fetchProjects();
    const handler = (e: Event) => {
      const custom = e as CustomEvent;
      const proj: Project = custom.detail;
      openEditModal(proj);
    };
    window.addEventListener("openEditProject", handler as EventListener);
    return () => window.removeEventListener("openEditProject", handler as EventListener);
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/myproject`, { cache: "no-store" });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const openCreateModal = () => {
    setFormData({ ...formData, _id: "", title: "", domain1: "", domain2: "", domain3: "", description: "", projectlead: "", colead: "", github: "", liveDemo: "", badge: "active", approved: false, image: "", startDate: "", completionDate: "" });
    setPreviewImage(null);
    setImageFile(null);
    setError(null);
    setIsModalOpen(true);
  };

  function resetModal() {
    setIsModalOpen(false);
    setSubmitting(false);
    setPreviewImage(null);
    setImageFile(null);
    setFormData({ _id: "", title: "", domain1: "", domain2: "", domain3: "", description: "", projectlead: "", colead: "", github: "", liveDemo: "", badge: "active", approved: false, image: "", startDate: "", completionDate: "" });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const selectedDomains = [formData.domain1, formData.domain2, formData.domain3].filter(Boolean);
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("projectlead", formData.projectlead);
      form.append("colead", formData.colead);
      form.append("github", formData.github);
      form.append("liveDemo", formData.liveDemo);
      form.append("badge", formData.badge);
      form.append("approved", String(formData.approved));
      form.append("startDate", formData.startDate);
      form.append("completionDate", formData.completionDate);
      form.append("domain", JSON.stringify(selectedDomains));
      if (imageFile) form.append("image", imageFile);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        const errorMessage = data?.error || data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
        setError(errorMessage);
        return;
      }

      toast.success("Project created successfully!");
      await fetchProjects();
      resetModal();
    } catch (err: any) {
      const errorMessage = err?.message || "Something went wrong while saving the project.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewProject = (projectId: string) => router.push(`${process.env.NEXT_PUBLIC_API_URL}/lead/myprojects/${projectId}`);

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      toast.success("Project deleted successfully!");
      await fetchProjects();
    } catch (err) {
      toast.error("Failed to delete project!");
      setError(err instanceof Error ? err.message : "Failed to delete project");
    }
  };

  function openEditModal(proj: Project) {
    setEditingProjectId(proj._id || null);
    setEditFormData({
      _id: proj._id || "",
      title: proj.title || "",
      domain1: Array.isArray(proj.domain) ? (proj.domain[0] || "") : String(proj.domain || ""),
      domain2: Array.isArray(proj.domain) ? (proj.domain[1] || "") : "",
      domain3: Array.isArray(proj.domain) ? (proj.domain[2] || "") : "",
      description: proj.description || "",
      projectlead: typeof proj.projectlead === "object" ? (proj.projectlead as any).name || "" : String(proj.projectlead || ""),
      colead: typeof proj.colead === "object" ? (proj.colead as any).name || "" : String(proj.colead || ""),
      github: proj.github || "",
      liveDemo: proj.liveDemo || "",
      badge: proj.badge || "active",
      approved: !!proj.approved,
      image: proj.image || "",
      startDate: proj.startDate ? String(proj.startDate).slice(0, 10) : "",
      completionDate: proj.completionDate ? String(proj.completionDate).slice(0, 10) : "",
    });
    setPreviewImage(proj.image || null);
    setIsEditOpen(true);
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };


//   const handleEditSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (!editingProjectId) return;
//   setSubmitting(true);

//   try {
//     const selectedDomains = [
//       editFormData.domain1,
//       editFormData.domain2,
//       editFormData.domain3,
//     ].filter(Boolean);

//     // use FormData instead of JSON
//     const form = new FormData();
//     form.append("title", editFormData.title);
//     form.append("description", editFormData.description);
//     form.append("domain", JSON.stringify(selectedDomains));
//     form.append("projectlead", editFormData.projectlead);
//     form.append("colead", editFormData.colead);
//     form.append("github", editFormData.github);
//     form.append("liveDemo", editFormData.liveDemo);
//     form.append("badge", editFormData.badge);
//     form.append("approved", String(editFormData.approved));
//     form.append("startDate", editFormData.startDate);
//     form.append("completionDate", editFormData.completionDate);

//     if (imageFile) form.append("image", imageFile); // 👈 only append if changed

//     const res = await fetch(`/api/projects/${editingProjectId}`, {
//       method: "PATCH",
//       body: form, 
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       const errorMessage = data?.error || data?.message || "Failed to update project";
//       toast.error(errorMessage);
//     } else {
//       toast.success("Project updated successfully");
//       await fetchProjects();
//       setIsEditOpen(false);
//     }
//   } catch (err: any) {
//     toast.error(err?.message || "Failed to update project");
//   } finally {
//     setSubmitting(false);
//   }
// };
const handleEditSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!editingProjectId) return;
  setSubmitting(true);

  try {
    const selectedDomains = [
      editFormData.domain1,
      editFormData.domain2,
      editFormData.domain3,
    ].filter(Boolean);

    const payload = {
      title: editFormData.title,
      description: editFormData.description,
      domain: selectedDomains,
      projectlead: editFormData.projectlead,
      colead: editFormData.colead,
      github: editFormData.github,
      liveDemo: editFormData.liveDemo,
      badge: editFormData.badge,
      approved: editFormData.approved,
      startDate: editFormData.startDate,
      completionDate: editFormData.completionDate,
      image: previewImage || editFormData.image, // optional
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${editingProjectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data?.error || "Failed to update project");
    } else {
      toast.success("Project updated successfully");
      await fetchProjects();
      setIsEditOpen(false);
    }
  } catch (err: any) {
    toast.error(err?.message || "Failed to update project");
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
    <div className="p-4 py-6 min-h-screen">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="font-mclaren text-[36px] mb-3 font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent">My Projects</h2>
          <p className="text-slate-400 text-lg font-medium font-mclaren">View and manage projects across your domains</p>
        </div>
        <button className="relative bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 text-white rounded-lg px-6 py-3 mt-6 font-semibold flex items-center gap-3" onClick={openCreateModal}>
          <FaPlus className="text-sm" />
          <span>Create Project</span>
        </button>
      </div>

      {error && !loading && (
        <div className="bg-red-900/50 border border-red-500/50 rounded-xl p-4 mb-6 text-red-200 font-mclaren shadow-lg">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-300 font-mclaren text-lg">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-slate-500 font-mclaren text-lg">No projects found.</div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-start">
          {projects.map((project) => (
            <ProjectCard key={project._id || Math.random().toString()} project={project} onView={handleViewProject} onDelete={handleDelete} isOwner={true} />
          ))}
        </div>
      )}

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <button onClick={resetModal} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                <FaTimes />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center">Create Project</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="file" accept="image/*" onChange={handleFileChange} disabled={submitting} />
                {previewImage && <img src={previewImage} alt="Preview" className="w-full h-40 object-cover" />}
                <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title *" required />
                <select name="domain1"   className="bg-blue-950 text-white  px-3 py-2 "
              value={formData.domain1} onChange={handleInputChange} required>
                  <option value="">Select Primary Domain *</option>
                  {domains.map((d) => (<option key={d} value={d}>{d}</option>))}
                </select>
                <select name="domain2"  className="bg-blue-950 text-white  px-3 py-2 " value={formData.domain2} onChange={handleInputChange}><option value="">Select Secondary Domain</option>{domains.map((d) => (<option key={d} value={d}>{d}</option>))}</select>
                <select name="domain3"  className="bg-blue-950 text-white  px-3 py-2 "  value={formData.domain3} onChange={handleInputChange}><option value="">Select Additional Domain</option>{domains.map((d) => (<option key={d} value={d}>{d}</option>))}</select>
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description *" required />
                <input name="projectlead" value={formData.projectlead} onChange={handleInputChange} placeholder="Project Lead Name *" required />
                <input name="colead" value={formData.colead} onChange={handleInputChange} placeholder="Assistant Lead (optional)" />
                <input name="github" value={formData.github} onChange={handleInputChange} placeholder="GitHub Repository URL" />
                <input name="liveDemo" value={formData.liveDemo} onChange={handleInputChange} placeholder="Live Demo URL" />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
                <input type="date" name="completionDate" value={formData.completionDate} onChange={handleInputChange} />
                <select name="badge" value={formData.badge} onChange={handleInputChange}><option value="active">Active</option><option value="completed">Completed</option><option value="available">Available</option><option value="disabled">Disabled</option></select>
                <button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Create Project"}</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <button onClick={() => setIsEditOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><FaTimes /></button>
              <h2 className="text-2xl font-bold mb-6 text-center">Edit Project</h2>

              <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                <input name="title" value={editFormData.title} onChange={handleEditInputChange} placeholder="Title *" required />
                <select name="domain1" value={editFormData.domain1} onChange={handleEditInputChange} required><option value="">Select Primary Domain *</option>{domains.map((d) => (<option key={d} value={d}>{d}</option>))}</select>
                <select name="domain2" value={editFormData.domain2} onChange={handleEditInputChange}><option value="">Select Secondary Domain</option>{domains.map((d) => (<option key={d} value={d}>{d}</option>))}</select>
                <select name="domain3" value={editFormData.domain3} onChange={handleEditInputChange}><option value="">Select Additional Domain</option>{domains.map((d) => (<option key={d} value={d}>{d}</option>))}</select>
                <textarea name="description" value={editFormData.description} onChange={handleEditInputChange} placeholder="Description *" required />
                <input name="projectlead" value={editFormData.projectlead} onChange={handleEditInputChange} placeholder="Project Lead Name *" required />
                <input name="colead" value={editFormData.colead} onChange={handleEditInputChange} placeholder="Assistant Lead (optional)" />
                <input name="github" value={editFormData.github} onChange={handleEditInputChange} placeholder="GitHub Repository URL" />
                <input name="liveDemo" value={editFormData.liveDemo} onChange={handleEditInputChange} placeholder="Live Demo URL" />
                <input type="date" name="startDate" value={editFormData.startDate} onChange={handleEditInputChange} required />
                <input type="date" name="completionDate" value={editFormData.completionDate} onChange={handleEditInputChange} />
                <select name="badge" value={editFormData.badge} onChange={handleEditInputChange} ><option value="active" >Active</option><option value="completed">Completed</option><option value="available">Available</option><option value="disabled">Disabled</option></select>
                <div className="flex gap-3 mt-2">
                  <button type="button" onClick={() => setIsEditOpen(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg text-sm font-semibold" disabled={submitting}>Cancel</button>
                  <button type="submit" disabled={submitting} className="flex-1 bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 text-white px-4 py-3 rounded-lg text-sm font-semibold">{submitting ? "Saving..." : "Save Changes"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

