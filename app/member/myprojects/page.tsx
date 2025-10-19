// "use client";
// import React, { useEffect, useState } from "react";
// import { FaUsers, FaPlus, FaTimes, FaArrowRight, FaCheckCircle } from "react-icons/fa";

// type Project = {
//   _id: string;
//   title: string;
//   domain: string;
//   description: string;
//   teamlead: string;
//   colead?: string;
//   github?: string;
//   image?: string;
//   badge?: "active" | "completed" | "disabled";
//   approved?: boolean;
// };

// function StatusBadge({ status }: { status: Project["badge"] }) {
//   const base =
//     "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold";
//   switch (status) {
//     case "active":
//       return <span className={`${base} bg-blue-900/30 text-blue-300`}>Active</span>;
//     case "completed":
//       return <span className={`${base} bg-green-900/30 text-green-300`}>Completed</span>;
//     case "disabled":
//       return <span className={`${base} bg-gray-700/50 text-gray-400`}>Disabled</span>;
//     default:
//       return null;
//   }
// }

// function ProjectCard({ project }: { project: Project }) {
//   const disabled = project.badge === "disabled";
//   const approved = project.approved;

//   // Get initials with fallback
//   const getInitial = (name: string | undefined): string => {
//     return name && name.length > 0 ? name.charAt(0).toUpperCase() : '?';
//   };

//   return (
//     <article className="group relative bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden w-full ring-1 ring-gray-700/50 hover:ring-indigo-500/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
//       {/* Shine Effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

//       {project.image && (
//         <div className="relative h-40 overflow-hidden">
//           <img
//             src={project.image}
//             alt={project.title} 
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
//         </div>
//       )}

//       <div className="relative p-6 flex flex-col gap-4">
//         {/* Header Section */}
//         <div className="flex items-start justify-between gap-3">
//           <div className="flex-1">
//             <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors line-clamp-2">
//               {project.title}
//             </h3>
//             <div className="flex items-center gap-2 mt-2">
//               <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
//                 {project.domain}
//               </span>
//             </div>
//           </div>
//           <StatusBadge status={project.badge} />
//         </div>

//         {/* Description */}
//         <p className="text-sm text-gray-300/90 leading-relaxed line-clamp-3 min-h-[3.75rem]">
//           {project.description}
//         </p>

//         {/* Divider */}
//         <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

//         {/* Team Info */}
//         <div className="space-y-2.5">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
//               {getInitial(project.teamlead)}
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-xs text-gray-400">Team Lead</p>
//               <p className="text-sm font-medium text-gray-200 truncate">{project.teamlead || 'Not assigned'}</p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold">
//               {getInitial(project.colead)}
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-xs text-gray-400">Assistant Lead</p>
//               <p className="text-sm font-medium text-gray-200 truncate">{project.colead || 'Not assigned'}</p>
//             </div>
//           </div>
//         </div>    

//         {/* Action Buttons */}
//         <div className="flex gap-3 mt-2">
//           {approved ? (
//             <>
//               <a
//                 href={`/projects/${project._id}`}
//                 className={`group/btn relative flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 overflow-hidden text-center ${
//                   disabled
//                     ? "bg-gray-700/50 text-gray-500 cursor-not-allowed pointer-events-none"
//                     : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
//                 }`}
//               >
//                 {!disabled && (
//                   <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
//                 )}
//                 <span className="relative flex items-center justify-center gap-2">
//                   View Project
//                   {!disabled && <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />}
//                 </span>
//               </a>

//               {project.github && (
//                 <a
//                   href={project.github}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="group/git relative px-4 py-3 rounded-xl text-sm font-semibold border-2 border-indigo-500/50 text-indigo-300 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 transition-all duration-300 overflow-hidden"
//                 >
//                   <span className="absolute inset-0 bg-indigo-500/10 scale-0 group-hover/git:scale-100 rounded-xl transition-transform duration-300" />
//                   <span className="relative flex items-center justify-center gap-2">
//                     GitHub
//                     <FaArrowRight className="text-xs group-hover/git:translate-x-1 transition-transform" />
//                   </span>
//                 </a>
//               )}
//             </>
//           ) : (
//             <div className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-center bg-yellow-900/30 text-yellow-300 border border-yellow-500/30 flex items-center justify-center gap-2">
//               <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
//               Pending Approval
//             </div>
//           )}
//         </div>
//       </div>
//     </article>
//   );
// }

// export default function ProjectGrid() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved">(
//     "all"
//   );

//   // modal state
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     domain: "",
//     description: "",
//     link: "",
//   });

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/request", { cache: "no-store" });
//       if (!res.ok) throw new Error("Failed to fetch projects");
//       const data = await res.json();
//       setProjects(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Error fetching projects");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredProjects = projects.filter((p) => {
//     if (activeTab === "approved") return p.approved;
//     if (activeTab === "pending") return !p.approved;
//     return true;
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       const res = await fetch("/api/request", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (!res.ok) throw new Error("Failed to send request");
//       alert("Request sent successfully!");
//       setIsModalOpen(false);
//       setFormData({
//         title: "",
//         domain: "",
//         description: "",
//         link: "",
//       });
//     } catch (err) {
//       alert(err instanceof Error ? err.message : "Error sending request");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const domains = [
//     "Web Development",
//     "Mobile Development",
//     "Competitive Programming",
//     "Design & Branding",
//     "Content Writing",
//     "Administration",
//     "Marketing & PR",
//     "Cloud Computing",
//     "Cybersecurity",
//     "AI / Machine Learning",
//   ];

//   return (
//     <main className="min-h-screen p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex items-start justify-between mb-6">
//           <div>
//             <h1 className="text-4xl font-bold text-white mb-2">My Projects</h1>
//             <p className="text-gray-400 mb-4">Browse and manage projects</p>
//           </div>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-indigo-600 hover:bg-indigo-500 text-white rounded px-5 py-2 font-semibold flex items-center gap-2 shadow-md"
//           >
//             <FaPlus /> Add Project
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-2 mb-6 bg-gray-800 rounded-lg p-1 w-fit">
//           {(["all", "pending", "approved"] as const).map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition ${
//                 activeTab === tab
//                   ? "bg-gray-700 text-indigo-400 shadow"
//                   : "text-gray-400 hover:text-gray-200"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         {loading ? (
//           <p className="text-gray-300">Loading projects...</p>
//         ) : error ? (
//           <p className="text-red-400">{error}</p>
//         ) : filteredProjects.length === 0 ? (
//           <p className="text-gray-500">No projects found.</p>
//         ) : (
//           <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProjects.map((p) => (
//               <ProjectCard key={p._id} project={p} />
//             ))}
//           </section>
//         )}
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md relative border border-gray-700">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
//               disabled={submitting}
//             >
//               <FaTimes />
//             </button>
//             <h2 className="text-2xl font-bold mb-4 text-center text-white">
//               Send Request for Project Creation
//             </h2>

//             <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Project Title *"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 required
//                 disabled={submitting}
//                 className="border border-gray-600 bg-gray-700 text-white placeholder-gray-400 p-2 rounded w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
//               />

//               <select
//                 name="domain"
//                 value={formData.domain}
//                 onChange={handleInputChange}
//                 required
//                 disabled={submitting}
//                 className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
//               >
//                 <option value="" className="text-gray-400">Select Domain *</option>
//                 {domains.map((d) => (
//                   <option key={d} value={d}>
//                     {d}
//                   </option>
//                 ))}
//               </select>

//               <textarea
//                 name="description"
//                 placeholder="Description *"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 required
//                 disabled={submitting}
//                 className="border border-gray-600 bg-gray-700 text-white placeholder-gray-400 p-2 rounded w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
//                 rows={3}
//               />

//               <input
//                 type="url"
//                 name="link"
//                 placeholder="Prototype Link *"
//                 value={formData.link}
//                 onChange={handleInputChange}
//                 required
//                 disabled={submitting}
//                 className="border border-gray-600 bg-gray-700 text-white placeholder-gray-400 p-2 rounded w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
//               />

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed font-semibold"
//               >
//                 {submitting ? "Sending..." : "Send Request"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { FaUsers, FaPlus, FaTimes, FaArrowRight, FaCheckCircle, FaClock } from "react-icons/fa";

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

type ProjectRequest = {
  _id: string;
  title: string;
  domain: string;
  description: string;
  link: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
};

function StatusBadge({ status }: { status: Project["badge"] }) {
  const base = "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold";
  switch (status) {
    case "active":
      return <span className={`${base} bg-blue-900/30 text-blue-300`}>Active</span>;
    case "completed":
      return <span className={`${base} bg-green-900/30 text-green-300`}>Completed</span>;
    case "disabled":
      return <span className={`${base} bg-gray-700/50 text-gray-400`}>Disabled</span>;
    default:
      return null;
  }
}

function RequestStatusBadge({ status }: { status: ProjectRequest["status"] }) {
  const base = "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold";
  switch (status) {
    case "Pending":
      return <span className={`${base} bg-yellow-900/30 text-yellow-300`}><FaClock className="mr-1" />Pending</span>;
    case "Approved":
      return <span className={`${base} bg-green-900/30 text-green-300`}><FaCheckCircle className="mr-1" />Approved</span>;
    case "Rejected":
      return <span className={`${base} bg-red-900/30 text-red-300`}>Rejected</span>;
    default:
      return null;
  }
}


function ProjectCard({ project }: { project: Project }) {
  const disabled = project.badge === "disabled";
  const approved = project.approved;

  const getInitial = (name: string | undefined): string => {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <article className="group relative bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden w-full ring-1 ring-gray-700/50 hover:ring-indigo-500/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {project.image && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={project.image}
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        </div>
      )}

      <div className="relative p-6 flex flex-col gap-4">
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
          <StatusBadge status={project.badge} />
        </div>

        <p className="text-sm text-gray-300/90 leading-relaxed line-clamp-3 min-h-[3.75rem]">
          {project.description}
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              {getInitial(project.teamlead)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">Team Lead</p>
              <p className="text-sm font-medium text-gray-200 truncate">{project.teamlead || 'Not assigned'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold">
              {getInitial(project.colead)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">Assistant Lead</p>
              <p className="text-sm font-medium text-gray-200 truncate">{project.colead || 'Not assigned'}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 border border-gray-700/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-indigo-500/10">
              <FaUsers className="text-indigo-400 text-sm" />
            </div>
            <span className="text-sm font-medium text-gray-300">Members visible in backend</span>
          </div>
          {approved && (
            <div className="flex items-center gap-1.5 text-green-400">
              <FaCheckCircle className="text-xs" />
              <span className="text-xs font-semibold">Approved</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-2">
          {approved ? (
            <>
              <a
                href={`/projects/${project._id}`}
                className={`group/btn relative flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 overflow-hidden text-center ${
                  disabled
                    ? "bg-gray-700/50 text-gray-500 cursor-not-allowed pointer-events-none"
                    : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                }`}
              >
                {!disabled && (
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                )}
                <span className="relative flex items-center justify-center gap-2">
                  View Project
                  {!disabled && <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />}
                </span>
              </a>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/git relative px-4 py-3 rounded-xl text-sm font-semibold border-2 border-indigo-500/50 text-indigo-300 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-indigo-500/10 scale-0 group-hover/git:scale-100 rounded-xl transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    GitHub
                    <FaArrowRight className="text-xs group-hover/git:translate-x-1 transition-transform" />
                  </span>
                </a>
              )}
            </>
          ) : (
            <div className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-center bg-yellow-900/30 text-yellow-300 border border-yellow-500/30 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              Pending Approval
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function RequestCard({ request }: { request: ProjectRequest }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-indigo-500/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white line-clamp-2">{request.title}</h3>
        <RequestStatusBadge status={request.status} />
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          {request.domain}
        </span>
      </div>
      
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">{request.description}</p>
      
      <div className="flex items-center justify-between">
        <a 
          href={request.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1"
        >
          View Prototype <FaArrowRight className="text-xs" />
        </a>
        <span className="text-gray-500 text-xs">
          {new Date(request.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "requests">("projects");

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    domain: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch user's projects
      const projectsRes = await fetch("/api/request", { cache: "no-store" });
      if (!projectsRes.ok) throw new Error("Failed to fetch projects");
      const projectsData = await projectsRes.json();
      setProjects(Array.isArray(projectsData) ? projectsData : []);
      
      // Fetch user's requests
      const requestsRes = await fetch("/api/request", { cache: "no-store" });
      if (requestsRes.ok) {
        const requestsData = await requestsRes.json();
        setRequests(Array.isArray(requestsData) ? requestsData : []);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching data");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.error || result.message || "Failed to send request");
      }
      
      alert("Request sent successfully!");
      setIsModalOpen(false);
      setFormData({
        title: "",
        domain: "",
        description: "",
        link: "",
      });
      
      // Refresh requests after successful submission
      fetchUserData();
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
            <p className="text-gray-400 mb-4">Browse and manage your projects and requests</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded px-5 py-2 font-semibold flex items-center gap-2 shadow-md"
          >
            <FaPlus /> Add Project Request
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-800 rounded-lg p-1 w-fit">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === "projects"
                ? "bg-gray-700 text-indigo-400 shadow"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            My Projects
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === "requests"
                ? "bg-gray-700 text-indigo-400 shadow"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            My Requests ({requests.length})
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : activeTab === "projects" ? (
          projects.length === 0 ? (
            <div className="text-center py-12">
              <FaUsers className="text-gray-600 text-4xl mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No projects found</p>
              <p className="text-gray-400 text-sm mt-2">You are not assigned to any projects yet.</p>
            </div>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </section>
          )
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <FaClock className="text-gray-600 text-4xl mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No project requests found</p>
            <p className="text-gray-400 text-sm mt-2">Create your first project request using the button above.</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map((request) => (
              <RequestCard key={request._id} request={request} />
            ))}
          </section>
        )}
      </div>

      {/* Modal - Same as before */}
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
                type="url"
                name="link"
                placeholder="Prototype Link *"
                value={formData.link}
                onChange={handleInputChange}
                required
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