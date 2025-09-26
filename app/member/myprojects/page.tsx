// "use client";
// import React, { useState } from "react";
// import { FaGithub, FaExternalLinkAlt, FaUsers, FaPlus } from "react-icons/fa";

// // 1. Define the Project type
// type Project = {
//   title: string;
//   domain: string;
//   description: string;
//   teamLead: string;
//   assistantLead: string;
//   members: number;
//   github: string;
//   live: string;
//   status: string;
//   statusColor: string;
//   enrolled: boolean;
// };

// const projects: Project[] = [
//   {
//     title: "E-commerce Platform",
//     domain: "Web",
//     description:
//       "A full-featured e-commerce platform with product management, cart, and checkout.",
//     teamLead: "John Doe",
//     assistantLead: "Jane Smith",
//     members: 3,
//     github: "#",
//     live: "#",
//     status: "In Progress",
//     statusColor: "bg-[#14A1FF] text-white",
//     enrolled: true,
//   },
//   {
//     title: "E-commerce Platform 2",
//     domain: "Web",
//     description:
//       "A full-featured e-commerce platform with product management, cart, and checkout.",
//     teamLead: "John Doe",
//     assistantLead: "Jane Smith",
//     members: 3,
//     github: "#",
//     live: "#",
//     status: "In Progress",
//     statusColor: "bg-[#14A1FF] text-white",
//     enrolled: true,
//   },
//   {
//     title: "E-commerce Platform 3",
//     domain: "Web",
//     description:
//       "A full-featured e-commerce platform with product management, cart, and checkout.",
//     teamLead: "John Doe",
//     assistantLead: "Jane Smith",
//     members: 3,
//     github: "#",
//     live: "#",
//     status: "In Progress",
//     statusColor: "bg-[#14A1FF] text-white",
//     enrolled: true,
//   },
// ];

// // StatusBadge component
// type StatusBadgeProps = {
//   status: string;
//   color: string;
// };

// function StatusBadge({ status, color }: StatusBadgeProps) {
//   return (
//     <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
//       {status}
//     </span>
//   );
// }

// // ProjectCard component
// type ProjectCardProps = {
//   project: Project;
// };

// function ProjectCard({ project }: ProjectCardProps) {
//   return (
//     <div className="bg-[#D8E6FF] border border-gray-300 rounded-lg p-8 flex flex-col gap-4 min-w-[380px] max-w-[420px] shadow-xl">
//       <div className="flex items-center justify-between">
//         <h3 className="font-['Maven_Pro',sans-serif] font-bold text-[24px] leading-[100%] tracking-[0] text-[#000000] mb-2">
//           {project.title}
//         </h3>
//         <StatusBadge status={project.status} color={project.statusColor} />
//       </div>
//       <span className="text-[#606060] font-['Maven_Pro',sans-serif] font-bold text-[15px] leading-[100%] tracking-">
//         {project.domain}
//       </span>
//       <p className="text-[#000000] font-['Maven_Pro',sans-serif] font-light text-[15px] leading-[100%] tracking- mb-2">
//         {project.description}
//       </p>
//       <div className="text-[#000000] font-['Maven_Pro',sans-serif] font-bold text-[15px] leading-[100%] tracking-">
//         <div>
//           Team Lead: <span className="text-gray-600">{project.teamLead}</span>
//         </div>
//         <div>
//           Assistant Lead:{" "}
//           <span className="text-gray-600">{project.assistantLead}</span>
//         </div>
//         <div className="flex items-center gap-1 mt-4">
//           <FaUsers /> {project.members} members
//         </div>
//       </div>

//       <div className="flex gap-2 mt-2">
//         <button className="bg-[#2A2A4A] text-white text-bold px-3 py-2 rounded text-xs cursor-pointer">
//           Open Project
//         </button>
//       </div>
//     </div>
//   );
// }

// // Main Component (tabs + create button added, logic untouched)
// export default function MemProjects() {
//   const [activeTab, setActiveTab] = useState("all");

//   return (
//     <div className="ml-15 py-8">
//       {/* Header with button on right */}
//       <div className="flex items-start justify-between mb-6">
//         <div>
//           <h2 className="font-mclaren font-normal text-[38px] leading-[100%] tracking-[0] mb-4 pt-5 text-[#2A2A4A]">
//            My Projects
//           </h2>
//           <p className="text-[#2A2A4AB0] font-mclaren font-normal text-[20px] leading-[100%] tracking- mb-10">
//             View and manage projects across your domains
//           </p>
//         </div>
//         <button className="bg-[#2A2A4A] hover:bg-[#3c4067] text-white rounded px-5 py-2 mt-6 font-semibold flex items-center gap-2 shadow-xl cursor-pointer">
//           <FaPlus /> Create Project
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 mb-6 bg-[#ececec] rounded max-auto w-fit border-gray-500">
//         <button
//           className={`px-4 py-2 rounded font-semibold ${
//             activeTab === "all"
//               ? "bg-white border-b-2 border-blue-600"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("all")}
//         >
//           All Projects
//         </button>
//         <button
//           className={`px-4 py-2 rounded font-semibold ${
//             activeTab === "enrolled"
//               ? "bg-white border-b-2 border-blue-600"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("enrolled")}
//         >
//           Enrolled
//         </button>
//         <button
//           className={`px-4 py-2 rounded font-semibold ${
//             activeTab === "available"
//               ? "bg-white border-b-2 border-blue-600"
//               : "text-gray-500"
//           }`}
//           onClick={() => setActiveTab("available")}
//         >
//           Available
//         </button>
//       </div>

//       {/* Projects Grid */}
//       <div className="flex flex-wrap gap-6">
//         {projects.map((project) => (
//           <ProjectCard key={project.title} project={project} />
//         ))}
//       </div>
//     </div>
//   );
// }
// "use client";
// import React, { useState } from "react";
// import { FaUsers, FaPlus } from "react-icons/fa";

// // Types
// export type Project = {
//   id: string;
//   title: string;
//   domain: string;
//   description: string;
//   teamLead: string;
//   assistantLead: string;
//   members: number;
//   status: "active" | "in-progress" | "completed" | "disabled" | "available";
//   enrolled: boolean;
// };

// // Sample projects
// const projects: Project[] = [
//   {
//     id: "1",
//     title: "E-commerce Platform",
//     domain: "Web",
//     description:
//       "A full-featured e-commerce platform with product management, cart, and checkout.",
//     teamLead: "John Doe",
//     assistantLead: "Jane Smith",
//     members: 3,
//     status: "in-progress",
//     enrolled: true,
//   },
//   {
//     id: "2",
//     title: "Learning Management System",
//     domain: "EdTech",
//     description:
//       "An LMS with courses, progress tracking, and interactive learning.",
//     teamLead: "Alice Brown",
//     assistantLead: "Mark White",
//     members: 5,
//     status: "available",
//     enrolled: false,
//   },
//   {
//     id: "3",
//     title: "Healthcare Portal",
//     domain: "Healthcare",
//     description:
//       "Portal for booking appointments, managing records, and tele-consultations.",
//     teamLead: "Sophia Lee",
//     assistantLead: "James Clark",
//     members: 4,
//     status: "disabled",
//     enrolled: false,
//   },
// ];

// // Status Badge Component
// function StatusBadge({ status }: { status: Project["status"] }) {
//   const base =
//     "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold";
//   switch (status) {
//     case "active":
//       return <span className={`${base} bg-blue-100 text-blue-700`}>Active</span>;
//     case "in-progress":
//       return (
//         <span className={`${base} bg-indigo-100 text-indigo-700`}>In Progress</span>
//       );
//     case "completed":
//       return (
//         <span className={`${base} bg-green-100 text-green-700`}>Completed</span>
//       );
//     case "disabled":
//       return (
//         <span className={`${base} bg-gray-200 text-gray-600`}>Disabled</span>
//       );
//     case "available":
//       return (
//         <span className={`${base} bg-yellow-100 text-yellow-700`}>Available</span>
//       );
//     default:
//       return null;
//   }
// }

// // Project Card
// function ProjectCard({ project }: { project: Project }) {
//   const disabled = project.status === "disabled";
//   const available = project.status === "available";

//   return (
//     <article className="bg-white rounded-xl shadow-md overflow-hidden max-w-md w-full ring-1 ring-gray-200 hover:shadow-lg transition">
//       <div className="p-6 flex flex-col gap-3">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-gray-900">
//             {project.title}
//           </h3>
//           <StatusBadge status={project.status} />
//         </div>

//         <p className="text-sm text-gray-500">{project.domain}</p>
//         <p className="text-sm text-gray-700">{project.description}</p>

//         <div className="mt-2 text-sm text-gray-800">
//           <div>
//             Team Lead: <span className="text-gray-600">{project.teamLead}</span>
//           </div>
//           <div>
//             Assistant Lead: <span className="text-gray-600">{project.assistantLead}</span>
//           </div>
//           <div className="flex items-center gap-1 mt-2 text-gray-700">
//             <FaUsers className="text-gray-500" /> {project.members} members
//           </div>
//         </div>

//         <div className="flex gap-3 mt-4">
//           <button
//             disabled={disabled}
//             className={`px-3 py-2 rounded-md text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300 ${
//               disabled
//                 ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                 : "bg-indigo-600 text-white hover:bg-indigo-700"
//             }`}
//           >
//             Open Project
//           </button>

//           {available && (
//             <button className="px-3 py-2 rounded-md text-xs font-medium border border-indigo-200 text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300">
//               Send Request
//             </button>
//           )}
//         </div>
//       </div>
//     </article>
//   );
// }

// // Create Project Button Component
// function CreateProjectButton() {
//   return (
//     <button className="bg-indigo-700 hover:bg-indigo-800 text-white rounded px-5 py-2 font-semibold flex items-center gap-2 shadow-md cursor-pointer">
//       <FaPlus /> Create Project
//     </button>
//   );
// }

// // Main Page
// export default function ProjectGrid() {
//   const [activeTab, setActiveTab] = useState<"all" | "enrolled" | "available">(
//     "all"
//   );

//   const filteredProjects = projects.filter((p) => {
//     if (activeTab === "enrolled") return p.enrolled;
//     if (activeTab === "available") return p.status === "available";
//     return true;
//   });

//   return (
//     <main className="min-h-screen  p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header with create button */}
//         <div className="flex items-start justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">My Projects</h1>
//             <p className="text-gray-600 mb-4">
//               View and manage projects across your domains
//             </p>
//           </div>
//           <CreateProjectButton />
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-2 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
//           {(["all", "enrolled", "available"] as const).map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition ${
//                 activeTab === tab
//                   ? "bg-white text-indigo-700 shadow"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Grid */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProjects.map((p) => (
//             <ProjectCard key={p.id} project={p} />
//           ))}
//         </section>
//       </div>
//     </main>
//   );
// }

// "use client";
// import React, { useEffect, useState } from "react";
// import { FaUsers } from "react-icons/fa";

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
//       return <span className={`${base} bg-indigo-100 text-indigo-700`}>Active</span>;
//     case "completed":
//       return <span className={`${base} bg-green-100 text-green-700`}>Completed</span>;
//     case "disabled":
//       return <span className={`${base} bg-gray-200 text-gray-600`}>Disabled</span>;
//     default:
//       return null;
//   }
// }

// function ProjectCard({ project }: { project: Project }) {
//   const handleSendRequest = async () => {
//     try {
//       const res = await fetch(`/api/lead/requests/${project._id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ projectId: project._id }),
//       });
//       if (!res.ok) throw new Error("Failed to send request");
//       alert("Request sent successfully!");
//     } catch (err) {
//       alert("Error sending request");
//     }
//   };

//   return (
//     <article className="bg-white rounded-xl shadow-md overflow-hidden max-w-md w-full ring-1 ring-gray-200 hover:shadow-lg transition">
//       {project.image && (
//         <img
//           src={project.image}
//           alt={project.title}
//           className="w-full h-40 object-cover"
//         />
//       )}
//       <div className="p-6 flex flex-col gap-3">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-gray-900">
//             {project.title}
//           </h3>
//           <StatusBadge status={project.badge} />
//         </div>

//         <p className="text-sm text-gray-500">{project.domain}</p>
//         <p className="text-sm text-gray-700">{project.description}</p>

//         <div className="mt-2 text-sm text-gray-800">
//           <div>
//             Team Lead: <span className="text-gray-600">{project.teamlead}</span>
//           </div>
//           <div>
//             Assistant Lead: <span className="text-gray-600">{project.colead || "-"}</span>
//           </div>
//           <div className="flex items-center gap-1 mt-2 text-gray-700">
//             <FaUsers className="text-gray-500" /> Members visible in backend
//           </div>
//         </div>

//         <div className="flex gap-3 mt-4">
//           <a
//             href={`/projects/${project._id}`}
//             className="px-3 py-2 rounded-md text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700"
//           >
//             View Project
//           </a>

//           {project.badge !== "disabled" && (
//             <button
//               onClick={handleSendRequest}
//               className="px-3 py-2 rounded-md text-xs font-medium border border-indigo-200 text-indigo-600 bg-white hover:bg-indigo-50"
//             >
//               Send Request
//             </button>
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
//   const [activeTab, setActiveTab] = useState<"all" | "enrolled" | "available">("all");

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/projects", { cache: "no-store" });
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
//     if (activeTab === "enrolled") return p.approved;
//     if (activeTab === "available") return !p.approved;
//     return true;
//   });

//   return (
//     <main className="min-h-screen p-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-start justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
//             <p className="text-gray-600 mb-4">Browse and join available projects</p>
//           </div>
//         </div>

//         <div className="flex gap-2 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
//           {(["all", "enrolled", "available"] as const).map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition ${
//                 activeTab === tab
//                   ? "bg-white text-indigo-700 shadow"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <p>Loading projects...</p>
//         ) : error ? (
//           <p className="text-red-600">{error}</p>
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
//     </main>
//   );
// }
// "use client";
// import React, { useEffect, useState } from "react";
// import { FaUsers, FaPlus } from "react-icons/fa";

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
//       return <span className={`${base} bg-indigo-100 text-indigo-700`}>Active</span>;
//     case "completed":
//       return <span className={`${base} bg-green-100 text-green-700`}>Completed</span>;
//     case "disabled":
//       return <span className={`${base} bg-gray-200 text-gray-600`}>Disabled</span>;
//     default:
//       return null;
//   }
// }

// function ProjectCard({ project }: { project: Project }) {
//   return (
//     <article className="bg-white rounded-xl shadow-md overflow-hidden max-w-md w-full ring-1 ring-gray-200 hover:shadow-lg transition">
//       {project.image && (
//         <img
//           src={project.image}
//           alt={project.title}
//           className="w-full h-40 object-cover"
//         />
//       )}
//       <div className="p-6 flex flex-col gap-3">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-gray-900">
//             {project.title}
//           </h3>
//           <StatusBadge status={project.badge} />
//         </div>

//         <p className="text-sm text-gray-500">{project.domain}</p>
//         <p className="text-sm text-gray-700">{project.description}</p>

//         <div className="mt-2 text-sm text-gray-800">
//           <div>
//             Team Lead: <span className="text-gray-600">{project.teamlead}</span>
//           </div>
//           <div>
//             Assistant Lead: <span className="text-gray-600">{project.colead || "-"}</span>
//           </div>
//           <div className="flex items-center gap-1 mt-2 text-gray-700">
//             <FaUsers className="text-gray-500" /> Members visible in backend
//           </div>
//         </div>

//         <div className="flex gap-3 mt-4">
//           <a
//             href={`/projects/${project._id}`}
//             className="px-3 py-2 rounded-md text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700"
//           >
//             View Project
//           </a>
//         </div>
//       </div>
//     </article>
//   );
// }

// export default function ProjectGrid() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<"all" | "enrolled" | "available">("all");

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/projects", { cache: "no-store" });
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
//     if (activeTab === "enrolled") return p.approved;
//     if (activeTab === "available") return !p.approved;
//     return true;
//   });

//   return (
//     <main className="min-h-screen p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex items-start justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
//             <p className="text-gray-600 mb-4">Browse and manage projects</p>
//           </div>
//           <button className="bg-indigo-700 hover:bg-indigo-800 text-white rounded px-5 py-2 font-semibold flex items-center gap-2 shadow-md">
//             <FaPlus /> Add Project
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-2 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
//           {(["all", "enrolled", "available"] as const).map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition ${
//                 activeTab === tab
//                   ? "bg-white text-indigo-700 shadow"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         {loading ? (
//           <p>Loading projects...</p>
//         ) : error ? (
//           <p className="text-red-600">{error}</p>
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
//     </main>
//   );
// }
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
      return <span className={`${base} bg-indigo-100 text-indigo-700`}>Active</span>;
    case "completed":
      return <span className={`${base} bg-green-100 text-green-700`}>Completed</span>;
    case "disabled":
      return <span className={`${base} bg-gray-200 text-gray-600`}>Disabled</span>;
    default:
      return null;
  }
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden max-w-md w-full ring-1 ring-gray-200 hover:shadow-lg transition">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {project.title}
          </h3>
          <StatusBadge status={project.badge} />
        </div>

        <p className="text-sm text-gray-500">{project.domain}</p>
        <p className="text-sm text-gray-700">{project.description}</p>

        <div className="mt-2 text-sm text-gray-800">
          <div>
            Team Lead: <span className="text-gray-600">{project.teamlead}</span>
          </div>
          <div>
            Assistant Lead:{" "}
            <span className="text-gray-600">{project.colead || "-"}</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-gray-700">
            <FaUsers className="text-gray-500" /> Members visible in backend
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <a
            href={`/projects/${project._id}`}
            className="px-3 py-2 rounded-md text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700"
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
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
            <p className="text-gray-600 mb-4">Browse and manage projects</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-700 hover:bg-indigo-800 text-white rounded px-5 py-2 font-semibold flex items-center gap-2 shadow-md"
          >
            <FaPlus /> Add Project
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
          {(["all", "enrolled", "available"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-white text-indigo-700 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <p>Loading projects...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              disabled={submitting}
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
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
                className="border p-2 rounded w-full"
              />

              <select
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                required
                disabled={submitting}
                className="border p-2 rounded w-full"
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
                className="border p-2 rounded w-full"
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
                className="border p-2 rounded w-full"
              />

              <input
                type="text"
                name="colead"
                placeholder="Assistant Lead (optional)"
                value={formData.colead}
                onChange={handleInputChange}
                disabled={submitting}
                className="border p-2 rounded w-full"
              />

              <input
                type="url"
                name="github"
                placeholder="GitHub Repository (optional)"
                value={formData.github}
                onChange={handleInputChange}
                disabled={submitting}
                className="border p-2 rounded w-full"
              />

              <button
                type="submit"
                disabled={submitting}
                className="bg-indigo-700 text-white px-4 py-2 rounded shadow hover:bg-indigo-800 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
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
