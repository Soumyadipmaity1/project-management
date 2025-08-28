// // // // // //           Add
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       <p className="text-[#606060] text-[18px] font-mclaren mb-8 leading-[100%] tracking-[0] font-normal">
// // // // // //         View and edit members in the project
// // // // // //       </p>

// // // // // //       <div className="flex flex-wrap gap-8">
// // // // // //         {team.map((member, idx) => (
// // // // // //           <div
// // // // // //             key={member.name}
// // // // // //             className="bg-white border border-gray-200 rounded-lg flex flex-col items-center px-8 py-6  w-[190px] shadow-xl relative"
// // // // // //           >
// // // // // //             <button
// // // // // //               onClick={() => handleRemove(idx)}
// // // // // //               title="Remove"
// // // // // //               className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
// // // // // //             >
// // // // // //               <FaTrash />
// // // // // //             </button>

// // // // // //             <img
// // // // // //               src={member.img}
// // // // // //               alt={member.name}
// // // // // //               className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-white shadow"
// // // // // //             />
// // // // // //             <div className="text-[#2A2A4A] font-mclaren text-[17px] font-normal text-center mb-2">
// // // // // //               {member.name}
// // // // // //             </div>
// // // // // //             <div className="flex gap-3">
// // // // // //               <a
// // // // // //                 href={member.github}
// // // // // //                 target="_blank"
// // // // // //                 rel="noopener noreferrer"
// // // // // //                 className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center"
// // // // // //               >
// // // // // //                 <FaGithub size={18} />
// // // // // //               </a>
// // // // // //               <a
// // // // // //                 href={member.linkedin}
// // // // // //                 target="_blank"
// // // // // //                 rel="noopener noreferrer"
// // // // // //                 className="bg-[#0077b5] text-white rounded-full w-8 h-8 flex items-center justify-center"
// // // // // //               >
// // // // // //                 <FaLinkedin size={18} />
// // // // // //               </a>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // "use client";
// // // // // import React, { useState } from "react";
// // // // // import { FaGithub, FaLinkedin, FaPlus, FaTrash } from "react-icons/fa";

// // // // // // Define a type for team members
// // // // // interface TeamMember {
// // // // //   name: string;
// // // // //   img: string;
// // // // //   github: string;
// // // // //   linkedin: string;
// // // // // }

// // // // // // Initial data
// // // // // const initialTeam: TeamMember[] = [
// // // // //   {
// // // // //     name: "Eshita",
// // // // //     img: "/path/to/photo1.jpg",
// // // // //     github: "#",
// // // // //     linkedin: "#",
// // // // //   },
// // // // //   {
// // // // //     name: "Eshita",
// // // // //     img: "/path/to/photo2.jpg",
// // // // //     github: "#",
// // // // //     linkedin: "#",
// // // // //   },
// // // // //   {
// // // // //     name: "Eshita",
// // // // //     img: "/path/to/photo3.jpg",
// // // // //     github: "#",
// // // // //     linkedin: "#",
// // // // //   },
// // // // //   {
// // // // //     name: "Eshita",
// // // // //     img: "/path/to/photo4.jpg",
// // // // //     github: "#",
// // // // //     linkedin: "#",
// // // // //   },
// // // // //   {
// // // // //     name: "Eshita",
// // // // //     img: "/path/to/photo5.jpg",
// // // // //     github: "#",
// // // // //     linkedin: "#",
// // // // //   },
// // // // //   {
// // // // //     name: "Eshita",
// // // // //     img: "/path/to/photo6.jpg",
// // // // //     github: "#",
// // // // //     linkedin: "#",
// // // // //   },
// // // // // ];

// // // // // export default function TeamMembers() {
// // // // //   const [team, setTeam] = useState<TeamMember[]>(initialTeam);

// // // // //   // Add new member
// // // // //   const handleAdd = (): void => {
// // // // //     setTeam([
// // // // //       ...team,
// // // // //       {
// // // // //         name: "New Member",
// // // // //         img: "/path/to/newphoto.jpg",
// // // // //         github: "#",
// // // // //         linkedin: "#",
// // // // //       },
// // // // //     ]);
// // // // //   };

// // // // //   // Remove member by index
// // // // //   const handleRemove = (index: number): void => {
// // // // //     setTeam(team.filter((_, i) => i !== index));
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen py-8 px-6">
// // // // //       {/* Header */}
// // // // //       <div className="flex justify-between items-center mt-8 mb-3">
// // // // //         <h2 className="font-mclaren font-normal text-[38px] text-[#2A2A4A] leading-[100%]">
// // // // //           Team Members
// // // // //         </h2>
// // // // //         <button
// // // // //           onClick={handleAdd}
// // // // //           title="Add"
// // // // //           className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-[#2A2A4A] hover:text-blue-600 hover:border-blue-600 transition"
// // // // //         >
// // // // //           <FaPlus />
// // // // //           Add
// // // // //         </button>
// // // // //       </div>

// // // // //       <p className="text-[#606060] text-[18px] font-mclaren mb-8 leading-[100%] font-normal">
// // // // //         View and edit members in the project
// // // // //       </p>

// // // // //       {/* Members Grid */}
// // // // //       <div className="flex flex-wrap gap-8">
// // // // //         {team.map((member, idx) => (
// // // // //           <div
// // // // //             key={`${member.name}-${idx}`}
// // // // //             className="bg-white border border-gray-200 rounded-lg flex flex-col items-center px-8 py-6 w-[190px] shadow-xl relative"
// // // // //           >
// // // // //             {/* Remove button */}
// // // // //             <button
// // // // //               onClick={() => handleRemove(idx)}
// // // // //               title="Remove"
// // // // //               className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
// // // // //             >
// // // // //               <FaTrash />
// // // // //             </button>

// // // // //             {/* Avatar */}
// // // // //             <img
// // // // //               src={member.img}
// // // // //               alt={member.name}
// // // // //               className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-white shadow"
// // // // //             />

// // // // //             {/* Name */}
// // // // //             <div className="text-[#2A2A4A] font-mclaren text-[17px] text-center mb-2">
// // // // //               {member.name}
// // // // //             </div>

// // // // //             {/* Social Links */}
// // // // //             <div className="flex gap-3">
// // // // //               <a
// // // // //                 href={member.github}
// // // // //                 target="_blank"
// // // // //                 rel="noopener noreferrer"
// // // // //                 className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center"
// // // // //               >
// // // // //                 <FaGithub size={18} />
// // // // //               </a>
// // // // //               <a
// // // // //                 href={member.linkedin}
// // // // //                 target="_blank"
// // // // //                 rel="noopener noreferrer"
// // // // //                 className="bg-[#0077b5] text-white rounded-full w-8 h-8 flex items-center justify-center"
// // // // //               >
// // // // //                 <FaLinkedin size={18} />
// // // // //               </a>
// // // // //             </div>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // "use client";
// // // // import React, { useState, useEffect } from "react";
// // // // import { FaGithub, FaLinkedin, FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

// // // // interface TeamMember {
// // // //   id: string;
// // // //   name: string;
// // // //   img: string;
// // // //   github: string;
// // // //   linkedin: string;
// // // //   role?: string;
// // // // }

// // // // export default function TeamMembers({ projectId }: { projectId: string }) {
// // // //   const [team, setTeam] = useState<TeamMember[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState<string | null>(null);
// // // //   const [editingMember, setEditingMember] = useState<string | null>(null);
// // // //   const [newMember, setNewMember] = useState<Partial<TeamMember>>({
// // // //     name: "",
// // // //     img: "",
// // // //     github: "",
// // // //     linkedin: "",
// // // //     role: ""
// // // //   });
// // // //   const [isAdding, setIsAdding] = useState(false);

// // // //   // Fetch team members from API
// // // //   const fetchTeamMembers = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const response = await fetch(`/api/projects/${projectId}/member`);
      
// // // //       if (!response.ok) {
// // // //         throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
// // // //       }
      
// // // //       const data = await response.json();
// // // //       setTeam(data);
// // // //       setError(null);
// // // //     } catch (err) {
// // // //       setError(err instanceof Error ? err.message : "An error occurred");
// // // //       console.error("Error fetching team members:", err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchTeamMembers();
// // // //   }, [projectId]);

// // // //   // Add new member
// // // //   const handleAdd = async () => {
// // // //     try {
// // // //       const response = await fetch(`/api/projects/${projectId}/member`, {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //         body: JSON.stringify(newMember),
// // // //       });

// // // //       if (!response.ok) {
// // // //         throw new Error("Failed to add member");
// // // //       }

// // // //       const addedMember = await response.json();
// // // //       setTeam([...team, addedMember]);
// // // //       setIsAdding(false);
// // // //       setNewMember({
// // // //         name: "",
// // // //         img: "",
// // // //         github: "",
// // // //         linkedin: "",
// // // //         role: ""
// // // //       });
// // // //     } catch (err) {
// // // //       setError(err instanceof Error ? err.message : "Failed to add member");
// // // //     }
// // // //   };

// // // //   // Update member
// // // //   const handleUpdate = async (id: string, updates: Partial<TeamMember>) => {
// // // //     try {
// // // //       const response = await fetch(`/api/projects/${projectId}/member/${id}`, {
// // // //         method: "PUT",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //         body: JSON.stringify(updates),
// // // //       });

// // // //       if (!response.ok) {
// // // //         throw new Error("Failed to update member");
// // // //       }

// // // //       const updatedMember = await response.json();
// // // //       setTeam(team.map(member => member.id === id ? updatedMember : member));
// // // //       setEditingMember(null);
// // // //     } catch (err) {
// // // //       setError(err instanceof Error ? err.message : "Failed to update member");
// // // //     }
// // // //   };

// // // //   // Remove member
// // // //   const handleRemove = async (id: string) => {
// // // //     try {
// // // //       const response = await fetch(`/api/projects/${id}/member/${id}`, {
// // // //         method: "DELETE",
// // // //       });

// // // //       if (!response.ok) {
// // // //         throw new Error("Failed to delete member");
// // // //       }

// // // //       setTeam(team.filter(member => member.id !== id));
// // // //     } catch (err) {
// // // //       setError(err instanceof Error ? err.message : "Failed to delete member");
// // // //     }
// // // //   };

// // // //   // Start editing a member
// // // //   const startEditing = (member: TeamMember) => {
// // // //     setEditingMember(member.id);
// // // //     setNewMember(member);
// // // //   };

// // // //   // Cancel editing
// // // //   const cancelEditing = () => {
// // // //     setEditingMember(null);
// // // //     setNewMember({
// // // //       name: "",
// // // //       img: "",
// // // //       github: "",
// // // //       linkedin: "",
// // // //       role: ""
// // // //     });
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="text-red-500 text-center">
// // // //           <p>Error: {error}</p>
// // // //           <button 
// // // //             onClick={fetchTeamMembers}
// // // //             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// // // //           >
// // // //             Retry
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen py-8 px-6 bg-gray-50">
// // // //       {/* Header */}
// // // //       <div className="flex justify-between items-center mt-8 mb-3">
// // // //         <h2 className="font-mclaren font-normal text-[38px] text-[#2A2A4A] leading-[100%]">
// // // //           Team Members
// // // //         </h2>
// // // //         <button
// // // //           onClick={() => setIsAdding(true)}
// // // //           title="Add"
// // // //           className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-[#2A2A4A] hover:text-blue-600 hover:border-blue-600 transition"
// // // //         >
// // // //           <FaPlus />
// // // //           Add
// // // //         </button>
// // // //       </div>

// // // //       <p className="text-[#606060] text-[18px] font-mclaren mb-8 leading-[100%] font-normal">
// // // //         View and edit members in the project
// // // //       </p>

// // // //       {/* Add Member Form */}
// // // //       {isAdding && (
// // // //         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
// // // //           <h3 className="text-xl font-semibold mb-4">Add New Member</h3>
// // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Name"
// // // //               value={newMember.name || ""}
// // // //               onChange={(e) => setNewMember({...newMember, name: e.target.value})}
// // // //               className="px-4 py-2 border rounded-md"
// // // //             />
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Image URL"
// // // //               value={newMember.img || ""}
// // // //               onChange={(e) => setNewMember({...newMember, img: e.target.value})}
// // // //               className="px-4 py-2 border rounded-md"
// // // //             />
// // // //             <input
// // // //               type="text"
// // // //               placeholder="GitHub URL"
// // // //               value={newMember.github || ""}
// // // //               onChange={(e) => setNewMember({...newMember, github: e.target.value})}
// // // //               className="px-4 py-2 border rounded-md"
// // // //             />
// // // //             <input
// // // //               type="text"
// // // //               placeholder="LinkedIn URL"
// // // //               value={newMember.linkedin || ""}
// // // //               onChange={(e) => setNewMember({...newMember, linkedin: e.target.value})}
// // // //               className="px-4 py-2 border rounded-md"
// // // //             />
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Role"
// // // //               value={newMember.role || ""}
// // // //               onChange={(e) => setNewMember({...newMember, role: e.target.value})}
// // // //               className="px-4 py-2 border rounded-md"
// // // //             />
// // // //           </div>
// // // //           <div className="flex justify-end gap-2 mt-4">
// // // //             <button
// // // //               onClick={() => setIsAdding(false)}
// // // //               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
// // // //             >
// // // //               Cancel
// // // //             </button>
// // // //             <button
// // // //               onClick={handleAdd}
// // // //               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
// // // //               disabled={!newMember.name}
// // // //             >
// // // //               Save
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Members Grid */}
// // // //       <div className="flex flex-wrap gap-8">
// // // //         {team.length === 0 ? (
// // // //           <div className="w-full text-center py-12 text-gray-500">
// // // //             No team members found. Add your first team member!
// // // //           </div>
// // // //         ) : (
// // // //           team.map((member) => (
// // // //             <div
// // // //               key={member.id}
// // // //               className="bg-white border border-gray-200 rounded-lg flex flex-col items-center px-8 py-6 w-[220px] shadow-xl relative transition-all hover:shadow-2xl"
// // // //             >
// // // //               {/* Action buttons */}
// // // //               <div className="absolute top-2 right-2 flex gap-2">
// // // //                 {editingMember === member.id ? (
// // // //                   <>
// // // //                     <button
// // // //                       onClick={() => handleUpdate(member.id, newMember)}
// // // //                       title="Save"
// // // //                       className="text-green-500 hover:text-green-700"
// // // //                     >
// // // //                       <FaSave />
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={cancelEditing}
// // // //                       title="Cancel"
// // // //                       className="text-gray-500 hover:text-gray-700"
// // // //                     >
// // // //                       <FaTimes />
// // // //                     </button>
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <button
// // // //                       onClick={() => startEditing(member)}
// // // //                       title="Edit"
// // // //                       className="text-blue-400 hover:text-blue-600"
// // // //                     >
// // // //                       <FaEdit />
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={() => handleRemove(member.id)}
// // // //                       title="Remove"
// // // //                       className="text-gray-400 hover:text-red-500"
// // // //                     >
// // // //                       <FaTrash />
// // // //                     </button>
// // // //                   </>
// // // //                 )}
// // // //               </div>

// // // //               {/* Avatar */}
// // // //               <img
// // // //                 src={member.img || "/api/placeholder/80/80"}
// // // //                 alt={member.name}
// // // //                 className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-white shadow"
// // // //                 onError={(e) => {
// // // //                   (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
// // // //                 }}
// // // //               />

// // // //               {/* Name and Role */}
// // // //               {editingMember === member.id ? (
// // // //                 <>
// // // //                   <input
// // // //                     type="text"
// // // //                     value={newMember.name || ""}
// // // //                     onChange={(e) => setNewMember({...newMember, name: e.target.value})}
// // // //                     className="text-center font-semibold mb-1 border rounded px-2 py-1"
// // // //                   />
// // // //                   <input
// // // //                     type="text"
// // // //                     value={newMember.role || ""}
// // // //                     onChange={(e) => setNewMember({...newMember, role: e.target.value})}
// // // //                     className="text-center text-sm text-gray-600 mb-3 border rounded px-2 py-1 w-full"
// // // //                     placeholder="Role"
// // // //                   />
// // // //                 </>
// // // //               ) : (
// // // //                 <>
// // // //                   <div className="text-[#2A2A4A] font-mclaren text-[17px] text-center font-semibold mb-1">
// // // //                     {member.name}
// // // //                   </div>
// // // //                   {member.role && (
// // // //                     <div className="text-sm text-gray-600 mb-3">{member.role}</div>
// // // //                   )}
// // // //                 </>
// // // //               )}

// // // //               {/* Social Links */}
// // // //               <div className="flex gap-3">
// // // //                 {editingMember === member.id ? (
// // // //                   <>
// // // //                     <input
// // // //                       type="text"
// // // //                       placeholder="GitHub URL"
// // // //                       value={newMember.github || ""}
// // // //                       onChange={(e) => setNewMember({...newMember, github: e.target.value})}
// // // //                       className="w-8 h-8 rounded-full text-center text-xs border"
// // // //                     />
// // // //                     <input
// // // //                       type="text"
// // // //                       placeholder="LinkedIn URL"
// // // //                       value={newMember.linkedin || ""}
// // // //                       onChange={(e) => setNewMember({...newMember, linkedin: e.target.value})}
// // // //                       className="w-8 h-8 rounded-full text-center text-xs border"
// // // //                     />
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <a
// // // //                       href={member.github || "#"}
// // // //                       target="_blank"
// // // //                       rel="noopener noreferrer"
// // // //                       className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800 transition"
// // // //                     >
// // // //                       <FaGithub size={18} />
// // // //                     </a>
// // // //                     <a
// // // //                       href={member.linkedin || "#"}
// // // //                       target="_blank"
// // // //                       rel="noopener noreferrer"
// // // //                       className="bg-[#0077b5] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#006097] transition"
// // // //                     >
// // // //                       <FaLinkedin size={18} />
// // // //                     </a>
// // // //                   </>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           ))
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";
// // // import React, { useState, useEffect } from "react";
// // // import { FaGithub, FaLinkedin, FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaUser } from "react-icons/fa";

// // // interface TeamMember {
// // //   id: string;
// // //   name: string;
// // //   img: string;
// // //   github: string;
// // //   linkedin: string;
// // //   role?: string;
// // //   projectRole?: "Admin" | "Lead" | "Member";
// // // }

// // // import { canMember } from "@/lib/permissions";


// // // export default function TeamMembers({ projectId, userRole }: { projectId: string; userRole: string }) {
// // //   const [team, setTeam] = useState<TeamMember[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [editingMember, setEditingMember] = useState<string | null>(null);
// // //   const [newMember, setNewMember] = useState<Partial<TeamMember>>({
// // //     name: "",
// // //     img: "",
// // //     github: "",
// // //     linkedin: "",
// // //     role: "",
// // //     projectRole: "Member"
// // //   });
// // //   const [isAdding, setIsAdding] = useState(false);

// // //   // Fetch team members from API
// // //   const fetchTeamMembers = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await fetch(`/api/projects/${id}/member`);
      
// // //       if (!response.ok) {
// // //         throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
// // //       }
      
// // //       const data = await response.json();
// // //       setTeam(data);
// // //       setError(null);
// // //     } catch (err) {
// // //       setError(err instanceof Error ? err.message : "An error occurred");
// // //       console.error("Error fetching team members:", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchTeamMembers();
// // //   }, [projectId]);

// // //   // Add new member
// // //   const handleAdd = async () => {
// // //     if (!canMember(userRole, "create")) {
// // //       setError("You don't have permission to add members");
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch(`/api/projects/${id}/member`, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify(newMember),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error("Failed to add member");
// // //       }

// // //       const addedMember = await response.json();
// // //       setTeam([...team, addedMember]);
// // //       setIsAdding(false);
// // //       setNewMember({
// // //         name: "",
// // //         img: "",
// // //         github: "",
// // //         linkedin: "",
// // //         role: "",
// // //         projectRole: "Member"
// // //       });
// // //     } catch (err) {
// // //       setError(err instanceof Error ? err.message : "Failed to add member");
// // //     }
// // //   };

// // //   // Update member
// // //   const handleUpdate = async (id: string, updates: Partial<TeamMember>) => {
// // //     if (!canMember(userRole, "update")) {
// // //       setError("You don't have permission to update members");
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch(`/api/projects/${id}/member/${id}`, {
// // //         method: "PUT",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify(updates),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error("Failed to update member");
// // //       }

// // //       const updatedMember = await response.json();
// // //       setTeam(team.map(member => member.id === id ? updatedMember : member));
// // //       setEditingMember(null);
// // //     } catch (err) {
// // //       setError(err instanceof Error ? err.message : "Failed to update member");
// // //     }
// // //   };

// // //   // Remove member
// // //   const handleRemove = async (id: string) => {
// // //     if (!canMember(userRole, "delete")) {
// // //       setError("You don't have permission to delete members");
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch(`/api/projects/${id}/member/${id}`, {
// // //         method: "DELETE",
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error("Failed to delete member");
// // //       }

// // //       setTeam(team.filter(member => member.id !== id));
// // //     } catch (err) {
// // //       setError(err instanceof Error ? err.message : "Failed to delete member");
// // //     }
// // //   };

// // //   // Start editing a member
// // //   const startEditing = (member: TeamMember) => {
// // //     if (!canMember(userRole, "update")) {
// // //       setError("You don't have permission to edit members");
// // //       return;
// // //     }
    
// // //     setEditingMember(member.id);
// // //     setNewMember(member);
// // //   };

// // //   // Cancel editing
// // //   const cancelEditing = () => {
// // //     setEditingMember(null);
// // //     setNewMember({
// // //       name: "",
// // //       img: "",
// // //       github: "",
// // //       linkedin: "",
// // //       role: "",
// // //       projectRole: "Member"
// // //     });
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen py-8 px-6 bg-gray-50">
// // //       {/* Error Message */}
// // //       {error && (
// // //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
// // //           <span className="block sm:inline">{error}</span>
// // //           <button
// // //             className="absolute top-0 bottom-0 right-0 px-4 py-3"
// // //             onClick={() => setError(null)}
// // //           >
// // //             <FaTimes />
// // //           </button>
// // //         </div>
// // //       )}

// // //       {/* Header */}
// // //       <div className="flex justify-between items-center mt-8 mb-3">
// // //         <h2 className="font-mclaren font-normal text-[38px] text-[#2A2A4A] leading-[100%]">
// // //           Team Members
// // //         </h2>
// // //         {canMember(userRole, "create") && (
// // //           <button
// // //             onClick={() => setIsAdding(true)}
// // //             title="Add"
// // //             className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-[#2A2A4A] hover:text-blue-600 hover:border-blue-600 transition"
// // //           >
// // //             <FaPlus />
// // //             Add
// // //           </button>
// // //         )}
// // //       </div>

// // //       <p className="text-[#606060] text-[18px] font-mclaren mb-8 leading-[100%] font-normal">
// // //         View and edit members in the project
// // //       </p>

// // //       {/* Add Member Form */}
// // //       {isAdding && (
// // //         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
// // //           <h3 className="text-xl font-semibold mb-4">Add New Member</h3>
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //             <input
// // //               type="text"
// // //               placeholder="Name *"
// // //               value={newMember.name || ""}
// // //               onChange={(e) => setNewMember({...newMember, name: e.target.value})}
// // //               className="px-4 py-2 border rounded-md"
// // //               required
// // //             />
// // //             <input
// // //               type="text"
// // //               placeholder="Image URL"
// // //               value={newMember.img || ""}
// // //               onChange={(e) => setNewMember({...newMember, img: e.target.value})}
// // //               className="px-4 py-2 border rounded-md"
// // //             />
// // //             <input
// // //               type="text"
// // //               placeholder="GitHub URL"
// // //               value={newMember.github || ""}
// // //               onChange={(e) => setNewMember({...newMember, github: e.target.value})}
// // //               className="px-4 py-2 border rounded-md"
// // //             />
// // //             <input
// // //               type="text"
// // //               placeholder="LinkedIn URL"
// // //               value={newMember.linkedin || ""}
// // //               onChange={(e) => setNewMember({...newMember, linkedin: e.target.value})}
// // //               className="px-4 py-2 border rounded-md"
// // //             />
// // //             <input
// // //               type="text"
// // //               placeholder="Role/Position"
// // //               value={newMember.role || ""}
// // //               onChange={(e) => setNewMember({...newMember, role: e.target.value})}
// // //               className="px-4 py-2 border rounded-md"
// // //             />
// // //             <select
// // //               value={newMember.projectRole || "Member"}
// // //               onChange={(e) => setNewMember({...newMember, projectRole: e.target.value as "Admin" | "Lead" | "Member"})}
// // //               className="px-4 py-2 border rounded-md"
// // //             >
// // //               <option value="Member">Member</option>
// // //               <option value="Lead">Lead</option>
// // //               <option value="Admin">Admin</option>
// // //             </select>
// // //           </div>
// // //           <div className="flex justify-end gap-2 mt-4">
// // //             <button
// // //               onClick={() => setIsAdding(false)}
// // //               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
// // //             >
// // //               Cancel
// // //             </button>
// // //             <button
// // //               onClick={handleAdd}
// // //               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
// // //               disabled={!newMember.name}
// // //             >
// // //               Save
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Members Grid */}
// // //       <div className="flex flex-wrap gap-8">
// // //         {team.length === 0 ? (
// // //           <div className="w-full text-center py-12 text-gray-500">
// // //             No team members found. {canMember(userRole, "create") ? "Add your first team member!" : "Ask an admin to add team members."}
// // //           </div>
// // //         ) : (
// // //           team.map((member) => (
// // //             <div
// // //               key={member.id}
// // //               className="bg-white border border-gray-200 rounded-lg flex flex-col items-center px-8 py-6 w-[240px] shadow-xl relative transition-all hover:shadow-2xl"
// // //             >
// // //               {/* Role badge */}
// // //               <div className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full 
// // //                 ${member.projectRole === 'Admin' ? 'bg-red-100 text-red-800' : 
// // //                   member.projectRole === 'Lead' ? 'bg-blue-100 text-blue-800' : 
// // //                   'bg-gray-100 text-gray-800'}`}>
// // //                 {member.projectRole}
// // //               </div>
              
// // //               {/* Action buttons */}
// // //               <div className="absolute top-2 right-2 flex gap-2">
// // //                 {editingMember === member.id ? (
// // //                   <>
// // //                     <button
// // //                       onClick={() => handleUpdate(member.id, newMember)}
// // //                       title="Save"
// // //                       className="text-green-500 hover:text-green-700"
// // //                     >
// // //                       <FaSave />
// // //                     </button>
// // //                     <button
// // //                       onClick={cancelEditing}
// // //                       title="Cancel"
// // //                       className="text-gray-500 hover:text-gray-700"
// // //                     >
// // //                       <FaTimes />
// // //                     </button>
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     {canMember(userRole, "update") && (
// // //                       <button
// // //                         onClick={() => startEditing(member)}
// // //                         title="Edit"
// // //                         className="text-blue-400 hover:text-blue-600"
// // //                       >
// // //                         <FaEdit />
// // //                       </button>
// // //                     )}
// // //                     {canMember(userRole, "delete") && (
// // //                       <button
// // //                         onClick={() => handleRemove(member.id)}
// // //                         title="Remove"
// // //                         className="text-gray-400 hover:text-red-500"
// // //                       >
// // //                         <FaTrash />
// // //                       </button>
// // //                     )}
// // //                   </>
// // //                 )}
// // //               </div>

// // //               {/* Avatar */}
// // //               {member.img ? (
// // //                 <img
// // //                   src={member.img}
// // //                   alt={member.name}
// // //                   className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-white shadow"
// // //                   onError={(e) => {
// // //                     (e.target as HTMLImageElement).style.display = 'none';
// // //                     (e.target as HTMLImageElement).nextElementSlement?.classList.remove('hidden');
// // //                   }}
// // //                 />
// // //               ) : null}
// // //               {!member.img && (
// // //                 <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3 border-4 border-white shadow">
// // //                   <FaUser size={24} className="text-gray-500" />
// // //                 </div>
// // //               )}

// // //               {/* Name and Role */}
// // //               {editingMember === member.id ? (
// // //                 <>
// // //                   <input
// // //                     type="text"
// // //                     value={newMember.name || ""}
// // //                     onChange={(e) => setNewMember({...newMember, name: e.target.value})}
// // //                     className="text-center font-semibold mb-1 border rounded px-2 py-1 w-full"
// // //                   />
// // //                   <input
// // //                     type="text"
// // //                     value={newMember.role || ""}
// // //                     onChange={(e) => setNewMember({...newMember, role: e.target.value})}
// // //                     className="text-center text-sm text-gray-600 mb-3 border rounded px-2 py-1 w-full"
// // //                     placeholder="Role"
// // //                   />
// // //                   <select
// // //                     value={newMember.projectRole || "Member"}
// // //                     onChange={(e) => setNewMember({...newMember, projectRole: e.target.value as "Admin" | "Lead" | "Member"})}
// // //                     className="text-center text-sm mb-3 border rounded px-2 py-1 w-full"
// // //                   >
// // //                     <option value="Member">Member</option>
// // //                     <option value="Lead">Lead</option>
// // //                     <option value="Admin">Admin</option>
// // //                   </select>
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <div className="text-[#2A2A4A] font-mclaren text-[17px] text-center font-semibold mb-1">
// // //                     {member.name}
// // //                   </div>
// // //                   {member.role && (
// // //                     <div className="text-sm text-gray-600 mb-1">{member.role}</div>
// // //                   )}
// // //                 </>
// // //               )}

// // //               {/* Social Links */}
// // //               <div className="flex gap-3 mt-2">
// // //                 {editingMember === member.id ? (
// // //                   <>
// // //                     <div className="flex flex-col gap-1">
// // //                       <label className="text-xs text-gray-500">GitHub</label>
// // //                       <input
// // //                         type="text"
// // //                         placeholder="GitHub URL"
// // //                         value={newMember.github || ""}
// // //                         onChange={(e) => setNewMember({...newMember, github: e.target.value})}
// // //                         className="w-24 h-8 rounded text-center text-xs border"
// // //                       />
// // //                     </div>
// // //                     <div className="flex flex-col gap-1">
// // //                       <label className="text-xs text-gray-500">LinkedIn</label>
// // //                       <input
// // //                         type="text"
// // //                         placeholder="LinkedIn URL"
// // //                         value={newMember.linkedin || ""}
// // //                         onChange={(e) => setNewMember({...newMember, linkedin: e.target.value})}
// // //                         className="w-24 h-8 rounded text-center text-xs border"
// // //                       />
// // //                     </div>
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     {member.github && (
// // //                       <a
// // //                         href={member.github}
// // //                         target="_blank"
// // //                         rel="noopener noreferrer"
// // //                         className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800 transition"
// // //                         title="GitHub"
// // //                       >
// // //                         <FaGithub size={18} />
// // //                       </a>
// // //                     )}
// // //                     {member.linkedin && (
// // //                       <a
// // //                         href={member.linkedin}
// // //                         target="_blank"
// // //                         rel="noopener noreferrer"
// // //                         className="bg-[#0077b5] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#006097] transition"
// // //                         title="LinkedIn"
// // //                       >
// // //                         <FaLinkedin size={18} />
// // //                       </a>
// // //                     )}
// // //                   </>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           ))
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { FaGithub, FaLinkedin, FaPlus, FaTrash, FaUser, FaTimes } from "react-icons/fa";
// // import { canMember } from "@/lib/permissions";

// // interface TeamMember {
// //   id: string;
// //   name: string;
// //   img?: string;
// //   github?: string;
// //   linkedin?: string;
// //   role?: string;
// //   projectRole?: "Admin" | "Lead" | "Member";
// // }

// // export default function TeamMembers({ projectId, userRole }: { projectId: string; userRole: string }) {
// //   const [team, setTeam] = useState<TeamMember[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [isAdding, setIsAdding] = useState(false);
// //   const [newMember, setNewMember] = useState<Partial<TeamMember>>({
// //     name: "",
// //     img: "",
// //     github: "",
// //     linkedin: "",
// //     role: "",
// //     projectRole: "Member",
// //   });

// //   // Fetch members
// //   const fetchTeamMembers = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await fetch(`/api/projects/${projectId}/member`);
// //       if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
// //       const data = await res.json();
// //       setTeam(data);
// //       setError(null);
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Error fetching team members");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchTeamMembers();
// //   }, [projectId]);

// //   // Add new member
// //   const handleAdd = async () => {
// //     if (!canMember(userRole, "create")) {
// //       setError("You don't have permission to add members");
// //       return;
// //     }

// //     try {
// //       const res = await fetch(`/api/projects/${projectId}/member`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ userId: newMember.id }),
// //       });

// //       if (!res.ok) throw new Error("Failed to add member");

// //       await fetchTeamMembers();
// //       setIsAdding(false);
// //       setNewMember({ name: "", img: "", github: "", linkedin: "", role: "", projectRole: "Member" });
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Failed to add member");
// //     }
// //   };

// //   // Delete member
// //   const handleRemove = async (memberId: string) => {
// //     if (!canMember(userRole, "delete")) {
// //       setError("You don't have permission to delete members");
// //       return;
// //     }

// //     try {
// //       const res = await fetch(`/api/projects/${projectId}/member/${memberId}`, { method: "DELETE" });
// //       if (!res.ok) throw new Error("Failed to delete member");
// //       setTeam(team.filter(m => m.id !== memberId));
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Failed to delete member");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen py-8 px-6 bg-gray-50">
// //       {error && (
// //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
// //           {error}
// //           <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
// //             <FaTimes />
// //           </button>
// //         </div>
// //       )}

// //       <div className="flex justify-between items-center mt-8 mb-3">
// //         <h2 className="font-mclaren font-normal text-[38px] text-[#2A2A4A] leading-[100%]">Team Members</h2>
// //         {canMember(userRole, "create") && (
// //           <button
// //             onClick={() => setIsAdding(true)}
// //             className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-[#2A2A4A] hover:text-blue-600 hover:border-blue-600 transition"
// //           >
// //             <FaPlus /> Add
// //           </button>
// //         )}
// //       </div>

// //       {isAdding && (
// //         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
// //           <h3 className="text-xl font-semibold mb-4">Add New Member</h3>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <input
// //               type="text"
// //               placeholder="User ID *"
// //               value={newMember.id || ""}
// //               onChange={e => setNewMember({ ...newMember, id: e.target.value })}
// //               className="px-4 py-2 border rounded-md"
// //             />
// //           </div>
// //           <div className="flex justify-end gap-2 mt-4">
// //             <button onClick={() => setIsAdding(false)} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">Cancel</button>
// //             <button
// //               onClick={handleAdd}
// //               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
// //               disabled={!newMember.id}
// //             >
// //               Save
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <div className="flex flex-wrap gap-8">
// //         {team.length === 0 ? (
// //           <div className="w-full text-center py-12 text-gray-500">
// //             No team members found. {canMember(userRole, "create") ? "Add your first member!" : "Ask an admin to add members."}
// //           </div>
// //         ) : (
// //           team.map(member => (
// //             <div key={member.id} className="bg-white border border-gray-200 rounded-lg flex flex-col items-center px-8 py-6 w-[240px] shadow-xl relative">
// //               <div className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full 
// //                 ${member.projectRole === "Admin" ? "bg-red-100 text-red-800" : member.projectRole === "Lead" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>
// //                 {member.projectRole || "Member"}
// //               </div>

// //               {canMember(userRole, "delete") && (
// //                 <button
// //                   onClick={() => handleRemove(member.id)}
// //                   title="Remove"
// //                   className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
// //                 >
// //                   <FaTrash />
// //                 </button>
// //               )}

// //               {member.img ? (
// //                 <img src={member.img} alt={member.name} className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-white shadow" />
// //               ) : (
// //                 <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3 border-4 border-white shadow">
// //                   <FaUser size={24} className="text-gray-500" />
// //                 </div>
// //               )}

// //               <div className="text-center font-semibold mb-1">{member.name}</div>
// //               {member.role && <div className="text-sm text-gray-600 mb-1">{member.role}</div>}

// //               <div className="flex gap-3 mt-2">
// //                 {member.github && (
// //                   <a href={member.github} target="_blank" rel="noopener noreferrer" className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800">
// //                     <FaGithub size={18} />
// //                   </a>
// //                 )}
// //                 {member.linkedin && (
// //                   <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="bg-[#0077b5] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#006097]">
// //                     <FaLinkedin size={18} />
// //                   </a>
// //                 )}
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// "use client";
// import React, { useState, useEffect } from "react";
// import { FaGithub, FaLinkedin, FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaUser, FaSearch, FaSpinner } from "react-icons/fa";

// interface TeamMember {
//   _id: string;
//   name: string;
//   profilePhoto: string;
//   githubId: string;
//   linkedinId: string;
//   email?: string;
// }

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   profilePhoto?: string;
// }

// export default function TeamMembers({ projectId, userRole }: { projectId: string; userRole: string }) {
//   const [team, setTeam] = useState<TeamMember[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<User[]>([]);
//   const [searchLoading, setSearchLoading] = useState(false);

//   // Fetch team members from API
//   const fetchTeamMembers = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`/api/projects/${projectId}/member`);
      
//       if (!response.ok) {
//         if (response.status === 403) {
//           throw new Error("You don't have permission to view team members");
//         }
//         throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       setTeam(data);
//       setError(null);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//       console.error("Error fetching team members:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTeamMembers();
//   }, [projectId]);

//   // Search for users to add
//   const handleSearch = async (query: string) => {
//     if (query.length < 2) {
//       setSearchResults([]);
//       return;
//     }
    
//     try {
//       setSearchLoading(true);
//       const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
      
//       if (!response.ok) {
//         throw new Error("Failed to search users");
//       }
      
//       const data = await response.json();
//       setSearchResults(data);
//     } catch (err) {
//       console.error("Error searching users:", err);
//       setSearchResults([]);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   // Add new member
//   const handleAddMember = async (userId: string) => {
//     try {
//       const response = await fetch(`/api/projects/${projectId}/member`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (!response.ok) {
//         if (response.status === 403) {
//           throw new Error("You don't have permission to add members");
//         }
//         throw new Error("Failed to add member");
//       }

//       // Refresh the team list
//       await fetchTeamMembers();
//       setIsAdding(false);
//       setSearchQuery("");
//       setSearchResults([]);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to add member");
//     }
//   };

//   // Remove member - CORRECTED ENDPOINT
//   const handleRemoveMember = async (memberId: string) => {
//     if (!confirm("Are you sure you want to remove this member from the project?")) {
//       return;
//     }

//     try {
//       // Correct endpoint: /api/projects/${projectId}/member/${userId}
//       const response = await fetch(`/api/projects/${projectId}/member/${memberId}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         if (response.status === 403) {
//           throw new Error("You don't have permission to remove members");
//         }
//         throw new Error("Failed to remove member");
//       }

//       // Refresh the team list
//       await fetchTeamMembers();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to remove member");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-8 px-6 bg-gray-50">
//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
//           <span className="block sm:inline">{error}</span>
//           <button
//             className="absolute top-0 bottom-0 right-0 px-4 py-3"
//             onClick={() => setError(null)}
//           >
//             <FaTimes />
//           </button>
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex justify-between items-center mt-8 mb-3">
//         <h2 className="font-mclaren font-normal text-[38px] text-[#2A2A4A] leading-[100%]">
//           Team Members
//         </h2>
//         {userRole !== "Member" && (
//           <button
//             onClick={() => setIsAdding(true)}
//             title="Add"
//             className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-[#2A2A4A] hover:text-blue-600 hover:border-blue-600 transition"
//           >
//             <FaPlus />
//             Add Member
//           </button>
//         )}
//       </div>

//       <p className="text-[#606060] text-[18px] font-mclaren mb-8 leading-[100%] font-normal">
//         View and manage members in the project
//       </p>

//       {/* Add Member Section */}
//       {isAdding && (
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <h3 className="text-xl font-semibold mb-4">Add New Member</h3>
//           <div className="relative">
//             <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
//               <FaSearch className="text-gray-400 mr-2" />
//               <input
//                 type="text"
//                 placeholder="Search users by name or email..."
//                 value={searchQuery}
//                 onChange={(e) => {
//                   setSearchQuery(e.target.value);
//                   handleSearch(e.target.value);
//                 }}
//                 className="flex-1 outline-none"
//               />
//               {searchLoading && (
//                 <FaSpinner className="animate-spin text-gray-400 ml-2" />
//               )}
//             </div>
            
//             {searchResults.length > 0 && (
//               <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
//                 {searchResults.map((user) => (
//                   <div
//                     key={user._id}
//                     className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleAddMember(user._id)}
//                   >
//                     {user.profilePhoto ? (
//                       <img
//                         src={user.profilePhoto}
//                         alt={user.name}
//                         className="w-8 h-8 rounded-full mr-3"
//                       />
//                     ) : (
//                       <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//                         <FaUser className="text-gray-500" />
//                       </div>
//                     )}
//                     <div>
//                       <div className="font-medium">{user.name}</div>
//                       <div className="text-sm text-gray-600">{user.email}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="flex justify-end gap-2 mt-4">
//             <button
//               onClick={() => {
//                 setIsAdding(false);
//                 setSearchQuery("");
//                 setSearchResults([]);
//               }}
//               className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Members Grid */}
//       <div className="flex flex-wrap gap-8">
//         {team.length === 0 ? (
//           <div className="w-full text-center py-12 text-gray-500">
//             No team members found. {userRole !== "Member" ? "Add your first team member!" : "Ask an admin to add team members."}
//           </div>
//         ) : (
//           team.map((member) => (
//             <div
//               key={member._id}
//               className="bg-white border border-gray-200 rounded-lg flex flex-col items-center px-8 py-6 w-[240px] shadow-xl relative transition-all hover:shadow-2xl"
//             >
//               {/* Action buttons */}
//               {userRole !== "Member" && (
//                 <div className="absolute top-2 right-2">
//                   <button
//                     onClick={() => handleRemoveMember(member._id)}
//                     title="Remove"
//                     className="text-gray-400 hover:text-red-500"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               )}

//               {/* Avatar */}
//               {member.profilePhoto ? (
//                 <img
//                   src={member.profilePhoto}
//                   alt={member.name}
//                   className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-white shadow"
//                 />
//               ) : (
//                 <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3 border-4 border-white shadow">
//                   <FaUser size={24} className="text-gray-500" />
//                 </div>
//               )}

//               {/* Name */}
//               <div className="text-[#2A2A4A] font-mclaren text-[17px] text-center font-semibold mb-1">
//                 {member.name}
//               </div>

//               {/* Email */}
//               {member.email && (
//                 <div className="text-sm text-gray-600 mb-3">{member.email}</div>
//               )}

//               {/* Social Links */}
//               <div className="flex gap-3 mt-2">
//                 {member.githubId && (
//                   <a
//                     href={`https://github.com/${member.githubId}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800 transition"
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
//                     className="bg-[#0077b5] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#006097] transition"
//                     title="LinkedIn"
//                   >
//                     <FaLinkedin size={18} />
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaUser, FaSearch, FaSpinner } from "react-icons/fa";

interface TeamMember {
  _id: string;
  name: string;
  profilePhoto: string;
  githubId: string;
  linkedinId: string;
  email?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  profilePhoto?: string;
}

export default function TeamMembers({ projectId, userRole }: { projectId: string; userRole: string }) {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Fetch team members from API
  const fetchTeamMembers = async () => {
    // Check if projectId is defined
    if (!projectId) {
      setError("Project ID is missing");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${projectId}/member`);
      
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to view team members");
        }
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setTeam(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching team members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchTeamMembers();
    } else {
      setLoading(false);
      setError("Project ID is required");
    }
  }, [projectId]);

  // Search for users to add
  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    try {
      setSearchLoading(true);
      const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error("Failed to search users");
      }
      
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error("Error searching users:", err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Add new member
  const handleAddMember = async (userId: string) => {
    if (!projectId) {
      setError("Project ID is missing");
      return;
    }

    try {
      const response = await fetch(`/api/projects/${projectId}/member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to add members");
        }
        throw new Error("Failed to add member");
      }

      // Refresh the team list
      await fetchTeamMembers();
      setIsAdding(false);
      setSearchQuery("");
      setSearchResults([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add member");
    }
  };

  // Remove member
  const handleRemoveMember = async (memberId: string) => {
    if (!projectId) {
      setError("Project ID is missing");
      return;
    }

    if (!confirm("Are you sure you want to remove this member from the project?")) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${projectId}/member/${memberId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("You don't have permission to remove members");
        }
        throw new Error("Failed to remove member");
      }

      // Refresh the team list
      await fetchTeamMembers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove member");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!projectId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p>Error: Project ID is required</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6 bg-gray-50">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{error}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mt-8 mb-3">
        <h2 className="font-mclaren font-normal text-[38px] text-[#2A2A4A] leading-[100%]">
          Team Members
        </h2>
        {userRole !== "Member" && (
          <button
            onClick={() => setIsAdding(true)}
            title="Add"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-[#2A2A4A] hover:text-blue-600 hover:border-blue-600 transition"
          >
            <FaPlus />
            Add Member
          </button>
        )}
      </div>

      <p className="text-[#606060] text-[18px] font-mclaren mb-8 leading-[100%] font-normal">
        View and manage members in the project
      </p>

      {/* Add Member Section */}
      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Add New Member</h3>
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                className="flex-1 outline-none"
              />
              {searchLoading && (
                <FaSpinner className="animate-spin text-gray-400 ml-2" />
              )}
            </div>
            
            {searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {searchResults.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleAddMember(user._id)}
                  >
                    {user.profilePhoto ? (
                      <img
                        src={user.profilePhoto}
                        alt={user.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <FaUser className="text-gray-500" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => {
                setIsAdding(false);
                setSearchQuery("");
                setSearchResults([]);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Members Grid */}
      <div className="flex flex-wrap gap-8">
        {team.length === 0 ? (
          <div className="w-full text-center py-12 text-gray-500">
            No team members found. {userRole !== "Member" ? "Add your first team member!" : "Ask an admin to add team members."}
          </div>
        ) : (
          team.map((member) => (
            <div
              key={member._id}
              className="bg-white border border-gray-200 rounded-lg flex flex-col items-center px-8 py-6 w-[240px] shadow-xl relative transition-all hover:shadow-2xl"
            >
              {/* Action buttons */}
              {userRole !== "Member" && (
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => handleRemoveMember(member._id)}
                    title="Remove"
                    className="text-gray-400 hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}

              {/* Avatar */}
              {member.profilePhoto ? (
                <img
                  src={member.profilePhoto}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-white shadow"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3 border-4 border-white shadow">
                  <FaUser size={24} className="text-gray-500" />
                </div>
              )}

              {/* Name */}
              <div className="text-[#2A2A4A] font-mclaren text-[17px] text-center font-semibold mb-1">
                {member.name}
              </div>

              {/* Email */}
              {member.email && (
                <div className="text-sm text-gray-600 mb-3">{member.email}</div>
              )}

              {/* Social Links */}
              <div className="flex gap-3 mt-2">
                {member.githubId && (
                  <a
                    href={`https://github.com/${member.githubId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800 transition"
                    title="GitHub"
                  >
                    <FaGithub size={18} />
                  </a>
                )}
                {member.linkedinId && (
                  <a
                    href={`https://linkedin.com/in/${member.linkedinId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0077b5] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#006097] transition"
                    title="LinkedIn"
                  >
                    <FaLinkedin size={18} />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}