// "use client";
// import React, { useState, useEffect } from "react";
// import { FaGithub, FaLinkedin, FaUser, FaSearch } from "react-icons/fa";

// interface TeamMember {
//   _id: string;
//   name: string;
//   profilePhoto?: string;
//   githubId?: string;
//   linkedinId?: string;
//   domain: string;
//   email?: string;
// }

// interface Project {
//   _id: string;
//   title: string;
//   domain: string;
//   leadId: string;
// }

// export default function TeamMembersSample() {
//   const [team, setTeam] = useState<TeamMember[]>([]);
//   const [project, setProject] = useState<Project | null>(null);
//   const [allProjects, setAllProjects] = useState<Project[]>([]);
//   const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
//   const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [showRemoveDialog, setShowRemoveDialog] = useState<boolean>(false);
//   const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);

//   useEffect(() => {
//     const sampleProjects: Project[] = [
//       {
//         _id: "proj123",
//         title: "Web Development Project",
//         domain: "Web Development",
//         leadId: "lead001",
//       },
//       {
//         _id: "proj124",
//         title: "Mobile App Development",
//         domain: "Mobile Development",
//         leadId: "lead001",
//       },
//       {
//         _id: "proj125",
//         title: "Data Analytics Platform",
//         domain: "Data Science",
//         leadId: "lead001",
//       },
//     ];
//     setAllProjects(sampleProjects);
//     setProject(sampleProjects[0]);

//     const sampleTeam: TeamMember[] = [
//       {
//         _id: "m1",
//         name: "Alice",
//         domain: "Web Development",
//         githubId: "aliceweb",
//         linkedinId: "aliceweb",
//         email: "alice@example.com",
//       },
//       {
//         _id: "m2",
//         name: "Bob",
//         domain: "Mobile Development",
//         githubId: "bobmobile",
//         linkedinId: "bobmobile",
//         email: "bob@example.com",
//       },
//       {
//         _id: "m3",
//         name: "Charlie",
//         domain: "Web Development",
//         githubId: "charlieweb",
//         linkedinId: "charlieweb",
//         email: "charlie@example.com",
//       },
//       {
//         _id: "m4",
//         name: "David",
//         domain: "Data Science",
//         githubId: "davidsci",
//         linkedinId: "davidsci",
//         email: "david@example.com",
//       },
//     ];

//     setAllMembers(sampleTeam);
//     setTeam(sampleTeam);
//   }, []);

//   useEffect(() => {
//     let filteredTeam = [...allMembers];

//     // Filter by project domain
//     if (selectedProjectId !== "all") {
//       const selectedProject = allProjects.find(
//         (p) => p._id === selectedProjectId
//       );
//       if (selectedProject) {
//         filteredTeam = filteredTeam.filter(
//           (member) => member.domain === selectedProject.domain
//         );
//       }
//     }

//     // Filter by search query
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       filteredTeam = filteredTeam.filter(
//         (member) =>
//           member.name.toLowerCase().includes(query) ||
//           member.email?.toLowerCase().includes(query)
//       );
//     }

//     setTeam(filteredTeam);
//   }, [selectedProjectId, searchQuery, allMembers, allProjects]);

//   const handleRemoveClick = (member: TeamMember) => {
//     setMemberToRemove(member);
//     setShowRemoveDialog(true);
//   };

//   const confirmRemove = () => {
//     if (memberToRemove) {
//       setAllMembers((prev) => prev.filter((m) => m._id !== memberToRemove._id));
//       setTeam((prev) => prev.filter((m) => m._id !== memberToRemove._id));
//     }
//     setShowRemoveDialog(false);
//     setMemberToRemove(null);
//   };

//   const cancelRemove = () => {
//     setShowRemoveDialog(false);
//     setMemberToRemove(null);
//   };

//   if (!project)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-fuchsia-400">
//         Loading...
//       </div>
//     );

//   return (
//     <div className="min-h-screen py-6 px-4">
//       <div className="flex items-start justify-between mb-8">
//         <div>
//           <h2 className="font-mclaren text-[36px] mb-3 font-bold bg-gradient-to-r from-white via-fuchsia-200 to-teal-300 bg-clip-text text-transparent">
//             Members
//           </h2>
//           <p className="text-slate-400 text-lg font-medium font-mclaren">
//             View and manage team members in your project
//           </p>
//         </div>
//       </div>

//       {/* Filter and Search Section */}
//       <div className="mb-6 flex flex-col sm:flex-row gap-4">
//         {/* Project Filter Dropdown */}
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Filter by Project
//           </label>
//           <select
//             value={selectedProjectId}
//             onChange={(e) => setSelectedProjectId(e.target.value)}
//             className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
//           >
//             <option value="all">All Projects</option>
//             {allProjects.map((proj) => (
//               <option key={proj._id} value={proj._id}>
//                 {proj.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Search Bar */}
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Search Members
//           </label>
//           <div className="relative">
//             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Members Count */}
//       <div className="mb-4 text-gray-400 text-sm">
//         Showing {team.length} member{team.length !== 1 ? "s" : ""}
//       </div>

//       <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-3 w-full">
//         {team.length === 0 ? (
//           <div className="w-full text-center py-12 text-gray-400">
//             No members found matching your criteria
//           </div>
//         ) : (
//           team.map((member) => (
//             <div
//               key={member._id}
//               className="bg-gray-900 border border-gray-800 rounded-lg flex flex-col items-center px-6 py-4 shadow-xl hover:shadow-fuchsia-500/20 hover:border-fuchsia-500/50 transition-all duration-300"
//             >
//               {member.profilePhoto ? (
//                 <img
//                   src={member.profilePhoto}
//                   alt={member.name}
//                   className="w-20 h-20 rounded-full mb-3 ring-2 ring-fuchsia-500/30"
//                 />
//               ) : (
//                 <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-3 ring-2 ring-fuchsia-500/30">
//                   <FaUser size={24} className="text-fuchsia-400" />
//                 </div>
//               )}

//               <div className="text-lg font-semibold text-white">
//                 {member.name}
//               </div>
//               {member.email && (
//                 <div className="text-sm text-gray-400 mb-1">{member.email}</div>
//               )}
//               {member.githubId && (
//                 <div className="text-sm text-gray-500 mb-1">
//                   @{member.githubId}
//                 </div>
//               )}
//               <div className="text-sm text-fuchsia-400 font-medium">
//                 Project Management Tool
//               </div>
//               <div className="text-sm text-gray-300">Web development</div>

//               <div className="flex gap-3 mt-2">
//                 {member.githubId && (
//                   <a
//                     href={`https://github.com/${member.githubId}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-fuchsia-600 hover:scale-110 transition-all duration-200"
//                     title="GitHub"
//                   >
//                     <FaGithub size={18} />
//                   </a>
//                 )}
//                 {member.linkedinId && (
//                   <a
//                     href={`https://linkedin.com/in/${member.linkedinId}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-fuchsia-600 hover:scale-110 transition-all duration-200"
//                     title="LinkedIn"
//                   >
//                     <FaLinkedin size={18} />
//                   </a>
//                 )}
//               </div>

//               <div className="mt-3 w-full flex flex-col gap-2">
//                 <button className="flex-1 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-gray-900">
//                   View Profile
//                 </button>
//                 <button
//                   onClick={() => handleRemoveClick(member)}
//                   className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Confirmation Dialog */}
//       {showRemoveDialog && memberToRemove && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full shadow-2xl">
//             <h3 className="text-xl font-bold text-white mb-4">
//               Remove Team Member
//             </h3>
//             <p className="text-gray-300 mb-6">
//               Are you sure you want to remove{" "}
//               <span className="font-semibold text-fuchsia-400">
//                 {memberToRemove.name}
//               </span>{" "}
//               from the team? This action cannot be undone.
//             </p>
//             <div className="flex gap-3 justify-end">
//               <button
//                 onClick={cancelRemove}
//                 className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmRemove}
//                 className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";
// import React, { useEffect, useState } from "react";
// import { FaGithub, FaLinkedin, FaUser, FaSearch } from "react-icons/fa";
// import toast from "react-hot-toast";

// interface TeamMember {
//   _id: string;
//   name: string;
//   profilePhoto?: string;
//   githubId?: string;
//   linkedinId?: string;
//   domain: string;
//   email?: string;
// }

// interface Project {
//   _id: string;
//   title: string;
//   domain: string;
// }

// export default function TeamMembers() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [members, setMembers] = useState<TeamMember[]>([]);
//   const [filtered, setFiltered] = useState<TeamMember[]>([]);
//   const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showRemoveDialog, setShowRemoveDialog] = useState(false);
//   const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);

//   // ✅ Fetch projects on mount
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await fetch("/api/projects");
//         const data = await res.json();
//         setProjects(data);
//       } catch {
//         toast.error("Failed to fetch projects");
//       }
//     };
//     fetchProjects();
//   }, []);

//   // ✅ Fetch members when project changes
//   useEffect(() => {
//     const fetchMembers = async () => {
//       setLoading(true);
//       try {
//         let url = "/api/projects";
//         if (selectedProjectId !== "all")
//           url = `/api/projects/${selectedProjectId}/member`;

//         const res = await fetch(url);
//         const data = await res.json();

//         if (selectedProjectId === "all") {
//           // optional: show combined members from all projects
//           setMembers([]);
//         } else {
//           setMembers(data);
//         }
//       } catch {
//         toast.error("Error fetching members");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMembers();
//   }, [selectedProjectId]);

//   // ✅ Filter members by search query
//   useEffect(() => {
//     let result = [...members];
//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (m) =>
//           m.name.toLowerCase().includes(q) ||
//           m.email?.toLowerCase().includes(q)
//       );
//     }
//     setFiltered(result);
//   }, [searchQuery, members]);

//   const handleRemoveClick = (member: TeamMember) => {
//     setMemberToRemove(member);
//     setShowRemoveDialog(true);
//   };

//   const confirmRemove = async () => {
//     if (!memberToRemove || selectedProjectId === "all") return;

//     try {
//       const res = await fetch(
//         `/api/projects/${selectedProjectId}/member/${memberToRemove._id}`,
//         { method: "DELETE" }
//       );
//       if (!res.ok) throw new Error("Failed to remove member");

//       setMembers((prev) => prev.filter((m) => m._id !== memberToRemove._id));
//       toast.success("Member removed");
//     } catch {
//       toast.error("Error removing member");
//     } finally {
//       setShowRemoveDialog(false);
//       setMemberToRemove(null);
//     }
//   };

//   if (loading)
//     return (
//       <div className="text-center text-gray-400 py-12">Loading members...</div>
//     );

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold text-fuchsia-400 mb-4">Team Members</h2>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-4">
//         <select
//           value={selectedProjectId}
//           onChange={(e) => setSelectedProjectId(e.target.value)}
//           className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white"
//         >
//           <option value="all">All Projects</option>
//           {projects.map((p) => (
//             <option key={p._id} value={p._id}>
//               {p.title}
//             </option>
//           ))}
//         </select>

//         <div className="relative flex-1">
//           <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search by name or email..."
//             className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white"
//           />
//         </div>
//       </div>

//       {/* Members */}
//       {filtered.length === 0 ? (
//         <p className="text-gray-400">No members found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//           {filtered.map((m) => (
//             <div
//               key={m._id}
//               className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col items-center"
//             >
//               {m.profilePhoto ? (
//                 <img
//                   src={m.profilePhoto}
//                   alt={m.name}
//                   className="w-20 h-20 rounded-full mb-3"
//                 />
//               ) : (
//                 <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-3">
//                   <FaUser size={24} className="text-fuchsia-400" />
//                 </div>
//               )}

//               <h3 className="text-white font-semibold">{m.name}</h3>
//               <p className="text-gray-400 text-sm">{m.email}</p>

//               <div className="flex gap-3 mt-2">
//                 {m.githubId && (
//                   <a
//                     href={`https://github.com/${m.githubId}`}
//                     target="_blank"
//                     className="hover:text-fuchsia-400"
//                   >
//                     <FaGithub />
//                   </a>
//                 )}
//                 {m.linkedinId && (
//                   <a
//                     href={`https://linkedin.com/in/${m.linkedinId}`}
//                     target="_blank"
//                     className="hover:text-fuchsia-400"
//                   >
//                     <FaLinkedin />
//                   </a>
//                 )}
//               </div>

//               <button
//                 onClick={() => handleRemoveClick(m)}
//                 className="mt-3 w-full bg-gradient-to-r from-red-600 to-red-700 hover:scale-105 text-white rounded-lg py-2 transition-all duration-200"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Remove Confirmation Dialog */}
//       {showRemoveDialog && memberToRemove && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-xl font-bold text-white mb-4">
//               Remove Team Member
//             </h3>
//             <p className="text-gray-300 mb-6">
//               Are you sure you want to remove{" "}
//               <span className="font-semibold text-fuchsia-400">
//                 {memberToRemove.name}
//               </span>
//               ?
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowRemoveDialog(false)}
//                 className="px-4 py-2 bg-gray-800 text-white rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmRemove}
//                 className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaUser, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

interface TeamMember {
  _id: string;
  name: string;
  profilePhoto?: string;
  githubId?: string;
  linkedinId?: string;
  domain?: string;
  email?: string;
}

interface Project {
  _id: string;
  title: string;
  domain: string;
}

export default function TeamMembers() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [filtered, setFiltered] = useState<TeamMember[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);

  // ✅ Fetch all projects once
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load projects");
      }
    };
    fetchProjects();
  }, []);

  // ✅ Fetch members when project changes
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        let url = "/api/projects";
        if (selectedProjectId !== "all") {
          url = `/api/projects/${selectedProjectId}/member`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch members");
        const data = await res.json();

        console.log("Fetched members data:", data);

        // ✅ Ensure data is an array
        const safeMembers = Array.isArray(data)
          ? data
          : Array.isArray(data.members)
          ? data.members
          : [];

        setMembers(safeMembers);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching members");
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [selectedProjectId]);

  // ✅ Filter members based on search query
  useEffect(() => {
    if (!Array.isArray(members)) {
      setFiltered([]);
      return;
    }

    let result = [...members];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.name?.toLowerCase().includes(q) ||
          m.email?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [searchQuery, members]);

  // ✅ Handle remove member
  const handleRemoveClick = (member: TeamMember) => {
    setMemberToRemove(member);
    setShowRemoveDialog(true);
  };

  const confirmRemove = async () => {
    if (!memberToRemove || selectedProjectId === "all") return;

    try {
      const res = await fetch(
        `/api/projects/${selectedProjectId}/member/${memberToRemove._id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to remove member");

      setMembers((prev) =>
        prev.filter((m) => m._id !== memberToRemove._id)
      );
      toast.success("Member removed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error removing member");
    } finally {
      setShowRemoveDialog(false);
      setMemberToRemove(null);
    }
  };

  // ✅ Show loading
  if (loading) {
    return (
      <div className="text-center text-gray-400 py-12">
        Loading members...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-fuchsia-400 mb-4">
        Team Members
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white"
        >
          <option value="all">All Projects</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>

        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white"
          />
        </div>
      </div>

      {/* Members */}
      {filtered.length === 0 ? (
        <p className="text-gray-400">No members found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filtered.map((m) => (
            <div
              key={m._id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col items-center"
            >
              {m.profilePhoto ? (
                <img
                  src={m.profilePhoto}
                  alt={m.name}
                  className="w-20 h-20 rounded-full mb-3"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-3">
                  <FaUser size={24} className="text-fuchsia-400" />
                </div>
              )}

              <h3 className="text-white font-semibold">{m.name}</h3>
              <p className="text-gray-400 text-sm">{m.email}</p>

              <div className="flex gap-3 mt-2">
                {m.githubId && (
                  <a
                    href={`https://github.com/${m.githubId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-fuchsia-400"
                  >
                    <FaGithub />
                  </a>
                )}
                {m.linkedinId && (
                  <a
                    href={`https://linkedin.com/in/${m.linkedinId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-fuchsia-400"
                  >
                    <FaLinkedin />
                  </a>
                )}
              </div>

              <button
                onClick={() => handleRemoveClick(m)}
                className="mt-3 w-full bg-gradient-to-r from-red-600 to-red-700 hover:scale-105 text-white rounded-lg py-2 transition-all duration-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Remove Confirmation Dialog */}
      {showRemoveDialog && memberToRemove && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">
              Remove Team Member
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-fuchsia-400">
                {memberToRemove.name}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRemoveDialog(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
