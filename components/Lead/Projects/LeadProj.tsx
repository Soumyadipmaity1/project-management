"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaGithub, FaEye, FaCalendarAlt } from "react-icons/fa";
import { useRouter , usePathname} from "next/navigation";

type Project = {
  _id?: string;
  title: string;
  domain: string | string[];
  description: string;
  projectlead: string | { name: string };
  assistantlead?: string | { name: string };
  github?: string;
  liveDemo?: string;
  badge?: "active" | "completed" | "disabled" | "available";
  approved?: boolean;
  members?: string[];
  membersCount?: number;
  image?: string;
  startDate?: string;
  completionDate?: string;
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
  onView: (projectId: string) => void;
  onDelete: (projectId: string) => void;
  isOwner: boolean;
};

// ⚡ Card Section (unchanged)
function ProjectCard({ project, onView, onDelete, isOwner }: ProjectCardProps) {
  const statusColor =
    project.badge === "active"
      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
      : project.badge === "completed"
      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30"
      : project.badge === "available"
      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30"
      : "bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-lg shadow-slate-500/30";

  const projectLeadName =
    typeof project.projectlead === "object"
      ? project.projectlead.name
      : project.projectlead || "Unknown";

  const assistantLeadName =
    typeof project.assistantlead === "object"
      ? project.assistantlead.name
      : project.assistantlead || "-";

  const formattedStart = project.startDate
    ? new Date(project.startDate).toLocaleDateString()
    : "-";
  const formattedEnd = project.completionDate
    ? new Date(project.completionDate).toLocaleDateString()
    : "-";
      const router = useRouter();
    const pathname = usePathname();

      const handleView = () => {
    router.push(`${pathname}/${project._id}`);
  };


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
            <h3 className="font-bold text-xl bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent font-mclaren leading-tight">
              {project.title}
            </h3>
            <StatusBadge status={project.badge || "active"} color={statusColor} />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"></div>
            <span className="text-sm font-semibold text-emerald-300 font-mclaren">
              {Array.isArray(project.domain)
                ? project.domain.join(", ")
                : project.domain}
            </span>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed font-mclaren">
            {project.description}
          </p>

          <div className="space-y-2 bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-300 text-xs font-mclaren">
                Project Lead:
              </span>
              <span className="text-slate-300 text-xs font-mclaren">{projectLeadName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-300 text-xs font-mclaren">
                Assistant Lead:
              </span>
              <span className="text-slate-300 text-xs font-mclaren">{assistantLeadName}</span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-700/40 pt-2 mt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mclaren">
                <FaCalendarAlt className="text-emerald-400" />
                <span>{formattedStart}</span>
              </div>
              <span className="text-slate-500 text-xs">→</span>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mclaren">
                <FaCalendarAlt className="text-teal-400" />
                <span>{formattedEnd}</span>
              </div>
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
                onClick={handleView}
                className="flex-1 bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-700 hover:via-emerald-700 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:transform hover:scale-105 border border-emerald-500/20"
              >
                <FaEye className="text-xs" />
                <span className="font-mclaren">View Project</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ⚡ Main Page
export default function MyProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [filter, setFilter] = useState<"all"  | "available">("all");
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
  const handleViewProject = (projectId: string) => router.push(`/lead/projects/${projectId}`);

  useEffect(() => {
    fetchProjects();
  }, []);

useEffect(() => {
  if (filter === "all") setFiltered(projects);
  else if (filter === "available")
    setFiltered(projects.filter((p) => p.badge === "available" || p.badge === "active"));
}, [filter, projects]);



  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      toast.success("Project deleted successfully!");
      await fetchProjects();
    } catch {
      toast.error("Failed to delete project!");
    }
  };

  return (
    <div className="p-4 py-6 min-h-screen">
      <Toaster position="top-right" />

       <div className="mb-8">
     <h2 className="text-[36px] mb-3 font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent">
          Projects
         </h2>
         <p className="text-slate-400 text-lg font-medium">
          View and manage projects across your domains
         </p>
       </div>

      <div className="flex gap-3 mb-8">
        {["all", "available"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-300 font-mclaren ${
              filter === f
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/30"
                : "bg-slate-800/50 text-slate-300 border-slate-700 hover:border-emerald-400/50 hover:text-emerald-300"
            }`}
          >
            {f === "all"
              ? "All Projects"
              : "Available"}
          </button>
        ))}
      </div>

      {error && <div className="text-red-400 mb-4">{error}</div>}

      {loading ? (
        <div className="text-slate-400 text-center py-10">Loading projects...</div>
      ) : filtered.length === 0 ? (
        <div className="text-slate-400 text-center py-10">No projects found.</div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-start">
          {filtered.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onView={handleViewProject}
              onDelete={handleDelete}
              isOwner={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
