// // "use client"
// // import React, { useState } from "react";
// // import { FaGithub, FaExternalLinkAlt, FaUsers } from "react-icons/fa";

// // // 1. Define the Project type
// // type Project = {
// //   title: string;
// //   domain: string;
// //   description: string;
// //   teamLead: string;
// //   assistantLead: string;
// //   members: number;
// //   github: string;
// //   live: string;
// //   status: string;
// //   statusColor: string;
// //   enrolled: boolean;
// // };

// // const projects: Project[] = [
// //   {
// //     title: "E-commerce Platform",
// //     domain: "Web",
// //     description:
// //       "A full-featured e-commerce platform with product management, cart, and checkout.",
// //     teamLead: "John Doe",
// //     assistantLead: "Jane Smith",
// //     members: 3,
// //     github: "#",
// //     live: "#",
// //     status: "In Progress",
// //     statusColor: "bg-[#14A1FF] text-white",
// //     enrolled: true,
// //   },
// //     {
// //     title: "E-commerce Platform 2",
// //     domain: "Web",
// //     description:
// //       "A full-featured e-commerce platform with product management, cart, and checkout.",
// //     teamLead: "John Doe",
// //     assistantLead: "Jane Smith",
// //     members: 3,
// //     github: "#",
// //     live: "#",
// //     status: "In Progress",
// //     statusColor: "bg-[#14A1FF] text-white",
// //     enrolled: true,
// //   },
// //     {
// //     title: "E-commerce Platform 3",
// //     domain: "Web",
// //     description:
// //       "A full-featured e-commerce platform with product management, cart, and checkout.",
// //     teamLead: "John Doe",
// //     assistantLead: "Jane Smith",
// //     members: 3,
// //     github: "#",
// //     live: "#",
// //     status: "In Progress",
// //     statusColor: "bg-[#14A1FF] text-white",
// //     enrolled: true,
// //   },
    
// // ];

// // // StatusBadge component
// // type StatusBadgeProps = {
// //   status: string;
// //   color: string;
// // };

// // function StatusBadge({ status, color }: StatusBadgeProps) {
// //   return (
// //     <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
// //       {status}
// //     </span>
// //   );
// // }

// // // ProjectCard component
// // type ProjectCardProps = {
// //   project: Project;
// // };

// // function ProjectCard({ project }: ProjectCardProps) {
// //   return (
// //     <div className="bg-[#D8E6FF] border border-gray-300 rounded-lg p-8 flex flex-col gap-4 min-w-[380px] max-w-[420px] shadow-xl">
// //       <div className="flex items-center justify-between">
// //         <h3 className="font-['Maven_Pro',sans-serif] font-bold text-[24px] leading-[100%] tracking-[0] text-[#000000] mb-2">{project.title}</h3>
// //         <StatusBadge status={project.status} color={project.statusColor} />
// //       </div>
// //       <span className="text-[#606060] font-['Maven_Pro',sans-serif] font-bold text-[15px] leading-[100%] tracking-[0]">{project.domain}</span>
// //       <p className="text-[#000000] font-['Maven_Pro',sans-serif] font-light text-[15px] leading-[100%] tracking-[0] mb-2">{project.description}</p>
// //       <div className="text-[#000000] font-['Maven_Pro',sans-serif] font-bold text-[15px] leading-[100%] tracking-[0]">
// //         <div >
// //           Team Lead: <span className="text-gray-600">{project.teamLead}</span>
// //         </div>
// //         <div>
// //           Assistant Lead:{" "}
// //           <span className="text-gray-600">{project.assistantLead}</span>
// //         </div>
// //         <div className="flex items-center gap-1 mt-4">
// //           <FaUsers /> {project.members} members
// //         </div>
// //       </div>
// //       {/* <div className="flex gap-2 mt-2">
// //         <a
// //           href={project.github}
// //           className="btn btn-sm bg-[#23272f] text-white px-3 py-1 rounded flex items-center gap-1"
// //         >
// //           <FaGithub /> GitHub
// //         </a>
// //         <a
// //           href={project.live}
// //           className="btn btn-sm bg-[#23272f] text-white px-3 py-1 rounded flex items-center gap-1"
// //         >
// //           <FaExternalLinkAlt /> Live
// //         </a>
// //       </div> */}
// //       <div className="flex gap-2 mt-2">
// //         {/* {project.enrolled ? (
// //           <span className="bg-green-800 text-green-200 px-2 py-1 rounded text-xs">
// //             Enrolled
// //           </span>
// //         ) : (
// //           <button className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
// //             Enroll
// //           </button>
// //         )} */}
// //         <button className="bg-[#2A2A4A] text-white text-bold px-3 py-2 rounded text-xs cursor-pointer">
// //           Open Project
// //         </button>
// //         {/* <button className="bg-red-700 text-white px-2 py-1 rounded text-xs">
// //           Delete
// //         </button> */}
// //       </div>
// //     </div>
// //   );
// // }

// // // Main Component with toggle tabs visual only (no logic disturbed)
// // export default function LeadProjects() {
// //   const [activeTab, setActiveTab] = useState("all");

// //   return (
// //     <div className="ml-15 py-8">
// //       <h2 className="font-mclaren font-normal text-[38px] leading-[100%] tracking-[0] mb-4 pt-5 text-[#2A2A4A]">
// //         Projects
// //       </h2>
// //       <p className="text-[#2A2A4AB0] font-mclaren font-normal text-[20px] leading-[100%] tracking-[0] mb-10">
// //         View and manage projects across your domains
// //       </p>

// //       {/* Tabs with minimal visual toggle */}
// //       <div className="flex gap-2 mb-6 bg-[#ececec] rounded max-auto w-fit border-gray-500">
// //         <button
// //           className={`px-4 py-2 rounded font-semibold ${
// //             activeTab === "all"
// //               ? "bg-white border-b-2 border-blue-600"
// //               : "text-gray-500"
// //           }`}
// //           onClick={() => setActiveTab("all")}
// //         >
// //           All Projects
// //         </button>
// //         <button
// //           className={`px-4 py-2 rounded font-semibold ${
// //             activeTab === "enrolled"
// //               ? "bg-white border-b-2 border-blue-600"
// //               : "text-gray-500"
// //           }`}
// //           onClick={() => setActiveTab("enrolled")}
// //         >
// //           Enrolled
// //         </button>
// //         <button
// //           className={`px-4 py-2 rounded font-semibold ${
// //             activeTab === "available"
// //               ? "bg-white border-b-2 border-blue-600"
// //               : "text-gray-500"
// //           }`}
// //           onClick={() => setActiveTab("available")}
// //         >
// //           Available
// //         </button>
// //       </div>

// //       {/* Projects Grid */}
// //       <div className="flex flex-wrap gap-6">
// //         {projects.map((project) => (
// //           <ProjectCard key={project.title} project={project} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// "use client"
// import React, { useState, useEffect } from "react";
// import { FaGithub, FaExternalLinkAlt, FaUsers } from "react-icons/fa";

// // 1. Define the Project type
// type Project = {
//   id: string;
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
//         <h3 className="font-['Maven_Pro',sans-serif] font-bold text-[24px] leading-[100%] tracking-[0] text-[#000000] mb-2">{project.title}</h3>
//         <StatusBadge status={project.status} color={project.statusColor} />
//       </div>
//       <span className="text-[#606060] font-['Maven_Pro',sans-serif] font-bold text-[15px] leading-[100%] tracking-[0]">{project.domain}</span>
//       <p className="text-[#000000] font-['Maven_Pro',sans-serif] font-light text-[15px] leading-[100%] tracking-[0] mb-2">{project.description}</p>
//       <div className="text-[#000000] font-['Maven_Pro',sans-serif] font-bold text-[15px] leading-[100%] tracking-[0]">
//         <div >
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

// // Main Component
// export default function LeadProjects() {
//   const [activeTab, setActiveTab] = useState("all");
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch projects from API
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setLoading(true);
//         // Replace with your actual API endpoint
//       const response = await fetch("/api/projects", { cache: "no-store" });
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
        
//         // Transform API data to match our Project type
//         const formattedProjects: Project[] = data.map((item: any) => ({
//           id: item.id,
//           title: item.title,
//           domain: item.domain || "Web",
//           description: item.description,
//           teamLead: item.teamLead || "Unknown",
//           assistantLead: item.assistantLead || "None",
//           members: item.members || 0,
//           github: item.github || "#",
//           live: item.live || "#",
//           status: item.status || "Unknown",
//           statusColor: getStatusColor(item.status),
//           enrolled: item.enrolled || false
//         }));
        
//         setProjects(formattedProjects);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An unknown error occurred');
//         console.error("Failed to fetch projects:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   // Helper function to determine status color
//   const getStatusColor = (status: string): string => {
//     switch (status?.toLowerCase()) {
//       case 'in progress':
//         return 'bg-[#14A1FF] text-white';
//       case 'completed':
//         return 'bg-green-500 text-white';
//       case 'pending':
//         return 'bg-yellow-500 text-white';
//       case 'cancelled':
//         return 'bg-red-500 text-white';
//       default:
//         return 'bg-gray-500 text-white';
//     }
//   };

//   // Filter projects based on active tab
//   const filteredProjects = projects.filter(project => {
//     if (activeTab === 'all') return true;
//     if (activeTab === 'enrolled') return project.enrolled;
//     if (activeTab === 'available') return !project.enrolled;
//     return true;
//   });

//   if (loading) {
//     return (
//       <div className="ml-15 py-8">
//         <h2 className="font-mclaren font-normal text-[38px] leading-[100%] tracking-[0] mb-4 pt-5 text-[#2A2A4A]">
//           Projects
//         </h2>
//         <div className="flex justify-center items-center h-64">
//           <p className="text-[#2A2A4A]">Loading projects...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="ml-15 py-8">
//         <h2 className="font-mclaren font-normal text-[38px] leading-[100%] tracking-[0] mb-4 pt-5 text-[#2A2A4A]">
//           Projects
//         </h2>
//         <div className="flex justify-center items-center h-64">
//           <p className="text-red-500">Error: {error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="ml-15 py-8">
//       <h2 className="font-mclaren font-normal text-[38px] leading-[100%] tracking-[0] mb-4 pt-5 text-[#2A2A4A]">
//         Projects
//       </h2>
//       <p className="text-[#2A2A4AB0] font-mclaren font-normal text-[20px] leading-[100%] tracking-[0] mb-10">
//         View and manage projects across your domains
//       </p>

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
//       {filteredProjects.length === 0 ? (
//         <div className="flex justify-center items-center h-64">
//           <p className="text-[#2A2A4A]">
//             {activeTab === "all" 
//               ? "No projects found" 
//               : `No ${activeTab} projects found`}
//           </p>
//         </div>
//       ) : (
//         <div className="flex flex-wrap gap-6">
//           {filteredProjects.map((project) => (
//             <ProjectCard key={project.id} project={project} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client"
import React, { useState, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt, FaUsers } from "react-icons/fa";

// 1. Define the Project type
type Project = {
  id: string;
  title: string;
  domain: string;
  description: string;
  teamLead: string;
  assistantLead: string;
  members: number;
  github: string;
  live: string;
  status: string;
  statusColor: string;
  enrolled: boolean;
};

// StatusBadge component
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

// ProjectCard component
type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-[#D8E6FF] border border-gray-300 rounded-lg p-8 flex flex-col gap-4 min-w-[380px] max-w-[420px] shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="font-['Maven_Pro',sans-serif] font-bold text-[24px] leading-[100%] tracking-[0] text-[#000000] mb-2">{project.title}</h3>
        <StatusBadge status={project.status} color={project.statusColor} />
      </div>
      <span className="text-[#606060] font-['Maven_Pro',sans-serif] font-bold text-[15px] leading-[100%] tracking-[0]">{project.domain}</span>
      <p className="text-[#000000] font-['Maven_Pro',sans-serif] font-light text-[15px] leading-[100%] tracking-[0] mb-2">{project.description}</p>
      <div className="text-[#000000] font-['Maven_Pro',sans-serif] font-bold text-[15px] leading-[100%] tracking-[0]">
        <div >
          Team Lead: <span className="text-gray-600">{project.teamLead}</span>
        </div>
        <div>
          Assistant Lead:{" "}
          <span className="text-gray-600">{project.assistantLead}</span>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <FaUsers /> {project.members} members
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button className="bg-[#2A2A4A] text-white text-bold px-3 py-2 rounded text-xs cursor-pointer">
          Open Project
        </button>
      </div>
    </div>
  );
}

// Main Component
export default function LeadProjects() {
  const [activeTab, setActiveTab] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from API using your preferred approach
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

  // Helper function to determine status color
  const getStatusColor = (status: string): string => {
    switch (status?.toLowerCase()) {
      case 'in progress':
        return 'bg-[#14A1FF] text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Filter projects based on active tab
  const filteredProjects = projects.filter(project => {
    if (activeTab === 'all') return true;
    if (activeTab === 'enrolled') return project.enrolled;
    if (activeTab === 'available') return !project.enrolled;
    return true;
  });

  if (loading) {
    return (
      <div className="ml-15 py-8">
        <h2 className="font-mclaren font-normal text-[38px] leading-[100%] tracking-[0] mb-4 pt-5 text-[#2A2A4A]">
          Projects
        </h2>
        <div className="flex justify-center items-center h-64">
          <p className="text-[#2A2A4A]">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-15 py-8">
        <h2 className="font-mclaren font-normal text-[38px] leading-[100%] tracking-[0] mb-4 pt-5 text-[#2A2A4A]">
          Projects
        </h2>
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Error: {error}</p>
          <button 
            onClick={fetchProjects}
            className="ml-4 bg-[#2A2A4A] text-white px-3 py-1 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-15 py-8">
      <h2 className="font-mclaren font-normal text-[38px] leading-[100%] tracking-[0] mb-4 pt-5 text-[#2A2A4A]">
        Projects
      </h2>
      <p className="text-[#2A2A4AB0] font-mclaren font-normal text-[20px] leading-[100%] tracking-[0] mb-10">
        View and manage projects across your domains
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-[#ececec] rounded max-auto w-fit border-gray-500">
        <button
          className={`px-4 py-2 rounded font-semibold ${
            activeTab === "all"
              ? "bg-white border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Projects
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${
            activeTab === "enrolled"
              ? "bg-white border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("enrolled")}
        >
          Enrolled
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${
            activeTab === "available"
              ? "bg-white border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("available")}
        >
          Available
        </button>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
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