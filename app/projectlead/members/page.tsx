
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
//   domain?: string;
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

//   // ✅ Fetch all projects once
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const res = await fetch("/api/projects");
//         if (!res.ok) throw new Error("Failed to fetch projects");
//         const data = await res.json();
//         setProjects(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to load projects");
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
//         if (selectedProjectId !== "all") {
//           url = `/api/projects/${selectedProjectId}/member`;
//         }

//         const res = await fetch(url);
//         if (!res.ok) throw new Error("Failed to fetch members");
//         const data = await res.json();

//         console.log("Fetched members data:", data);

//         // ✅ Ensure data is an array
//         const safeMembers = Array.isArray(data)
//           ? data
//           : Array.isArray(data.members)
//           ? data.members
//           : [];

//         setMembers(safeMembers);
//       } catch (error) {
//         console.error(error);
//         toast.error("Error fetching members");
//         setMembers([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMembers();
//   }, [selectedProjectId]);

//   // ✅ Filter members based on search query
//   useEffect(() => {
//     if (!Array.isArray(members)) {
//       setFiltered([]);
//       return;
//     }

//     let result = [...members];
//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (m) =>
//           m.name?.toLowerCase().includes(q) ||
//           m.email?.toLowerCase().includes(q)
//       );
//     }
//     setFiltered(result);
//   }, [searchQuery, members]);

//   // ✅ Handle remove member
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

//       setMembers((prev) =>
//         prev.filter((m) => m._id !== memberToRemove._id)
//       );
//       toast.success("Member removed successfully");
//     } catch (error) {
//       console.error(error);
//       toast.error("Error removing member");
//     } finally {
//       setShowRemoveDialog(false);
//       setMemberToRemove(null);
//     }
//   };

//   // ✅ Show loading
//   if (loading) {
//     return (
//       <div className="text-center text-gray-400 py-12">
//         Loading members...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold text-fuchsia-400 mb-4">
//         Team Members
//       </h2>

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
//                     rel="noreferrer"
//                     className="hover:text-fuchsia-400"
//                   >
//                     <FaGithub />
//                   </a>
//                 )}
//                 {m.linkedinId && (
//                   <a
//                     href={`https://linkedin.com/in/${m.linkedinId}`}
//                     target="_blank"
//                     rel="noreferrer"
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
        const res = await fetch("/api/myproject");
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

  useEffect(() => {
    const fetchMembers = async () => {
      // 👉 If “All” selected, don’t fetch anything
      if (selectedProjectId === "all") {
        setMembers([]);
        setFiltered([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/projects/${selectedProjectId}/member`);
        if (!res.ok) throw new Error("Failed to fetch members");
        const data = await res.json();

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

  // ✅ Filter members based on search
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

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to remove member");
      return;
    }

    setMembers((prev) => prev.filter((m) => m._id !== memberToRemove._id));
    toast.success(data.message || "Member removed successfully");
  } catch (error: any) {
    console.error("Error removing member:", error);
    toast.error(error.message || "Something went wrong");
  } finally {
    setShowRemoveDialog(false);
    setMemberToRemove(null);
  }
};


  // ✅ Loading state
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
          <option value="all">Select a project</option>
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
            disabled={selectedProjectId === "all"}
          />
        </div>
      </div>

      {/* No project selected */}
      {selectedProjectId === "all" ? (
        <p className="text-gray-400 text-center py-10">
          Please select a project to view its members.
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-400">No members found for this project.</p>
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
