// 'use client';

// import Link from 'next/link';
// import { FaChevronLeft, FaTimes, FaPlus, FaTrash, FaEdit, FaExternalLinkAlt, FaCode, FaChevronDown, FaUpload, FaImage } from 'react-icons/fa';
// import { useState, useRef, useMemo } from 'react';

// const mockProject = [
//   {
//     id: '1',
//     name: 'E-commerce Platform',
//     status: 'Active',
//     description: 'E-commerce content encompasses all materials businesses create to attract and retain customers online, including product descriptions, social media posts, blog posts, and more. It plays a crucial role in supporting the customer journey, providing brand messaging and product details to aid in informed purchasing decisions.',
//     technologies: [
//       { id: 't1', name: 'React' },
//       { id: 't2', name: 'Next.js' },
//       { id: 't3', name: 'Tailwind CSS' },
//     ],
//     domain: 'E-commerce',
//     teamLead: 'Alice',
//     assistantLead: 'Bob',
//     teamSize: 5,
//     activities: [
//       { id: 'a1', icon: '📝', description: 'Updated Resume', time: '2 hours ago' },
//       { id: 'a2', icon: '📝', description: 'Updated Resume', time: '2 hours ago' },
//     ],
//   },
//   {
//     id: '2',
//     name: 'E-commerce Platform',
//     status: 'Active',
//     description: 'E-commerce content encompasses all materials businesses create to attract and retain customers online, including product descriptions, social media posts, blog posts, and more. It plays a crucial role in supporting the customer journey, providing brand messaging and product details to aid in informed purchasing decisions.',
//     technologies: [
//       { id: 't1', name: 'React' },
//       { id: 't2', name: 'Next.js' },
//       { id: 't3', name: 'Tailwind CSS' },
//     ],
//     domain: 'E-commerce',
//     teamLead: 'Alice',
//     assistantLead: 'Bob',
//     teamSize: 5,
//     activities: [
//       { id: 'a1', icon: '📝', description: 'Updated Resume', time: '2 hours ago' },
//       { id: 'a2', icon: '📝', description: 'Updated Resume', time: '2 hours ago' },
//     ],
//   },
//   {
//     id: '3',
//     name: 'E-commerce Platform',
//     status: 'Active',
//     description: 'E-commerce content encompasses all materials businesses create to attract and retain customers online, including product descriptions, social media posts, blog posts, and more. It plays a crucial role in supporting the customer journey, providing brand messaging and product details to aid in informed purchasing decisions.',
//     technologies: [
//       { id: 't1', name: 'React' },
//       { id: 't2', name: 'Next.js' },
//       { id: 't3', name: 'Tailwind CSS' },
//     ],
//     domain: 'E-commerce',
//     teamLead: 'Alice',
//     assistantLead: 'Bob',
//     teamSize: 5,
//     activities: [
//       { id: 'a1', icon: '📝', description: 'Updated Resume', time: '2 hours ago' },
//       { id: 'a2', icon: '📝', description: 'Updated Resume', time: '2 hours ago' },
//     ],
//   },
// ];

// type Technology = {
//   id: string;
//   name: string;
// };

// type Activity = {
//   id: string;
//   icon: string;
//   description: string;
//   time: string;
// };

// type ProjectType = {
//   id: string;
//   name: string;
//   status: string;
//   description: string;
//   technologies: Technology[];
//   domain: string;
//   teamLead: string;
//   assistantLead: string;
//   teamSize: number;
//   activities: Activity[];
// };

// const TEAM_MEMBERS = [
//   { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Team Lead' },
//   { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Assistant Lead' },
//   { id: '3', name: 'Alice', email: 'alice@example.com', role: 'Member' },
//   { id: '4', name: 'Bob', email: 'bob@example.com', role: 'Member' },
//   { id: '5', name: 'Charlie', email: 'charlie@example.com', role: 'Member' },
// ];

// function getProjectById(projectId: string) {
//   return mockProject.find((p) => p.id === projectId);
// }

// type Props = {
//   params: {
//     projectId: string;
//   };
// };

// const getRoleStyles = (role: string) => {
//   switch (role) {
//     case 'Team Lead':
//       return 'bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white shadow-lg';
//     case 'Assistant Lead':
//       return 'bg-gradient-to-r from-fuchsia-600/80 to-fuchsia-700/80 text-white shadow-md';
//     default:
//       return 'bg-gray-700 text-gray-300 border border-gray-600';
//   }
// };

// const getInitials = (name: string) => {
//   return name
//     .split(' ')
//     .map((n) => n[0])
//     .join('')
//     .toUpperCase();
// };

// export default function Project({ params }: Props) {
//   const { projectId } = params;
//   const project = useMemo(() => getProjectById(projectId), [projectId]);
  
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isTeamEditModalOpen, setIsTeamEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [editForm, setEditForm] = useState<ProjectType | null>(project);
//   const [editTechnologies, setEditTechnologies] = useState(project?.technologies || []);
//   const [newTechName, setNewTechName] = useState('');
//   const [projectImage, setProjectImage] = useState<string | null>(null);
//   const [isImageUploading, setIsImageUploading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [teamMembers, setTeamMembers] = useState(TEAM_MEMBERS);
//   const [isTimelineEditMode, setIsTimelineEditMode] = useState(false);
//   const [timelineData, setTimelineData] = useState({
//     startDate: '2023-09-15',
//     targetDate: '2024-06-30',
//     liveUrl: 'https://example-project.com',
//     codeUrl: 'https://github.com/example/project'
//   });

//   const handleSaveProject = () => {
//     const updatedProject = {
//       ...editForm,
//       technologies: editTechnologies
//     };
//     console.log('Saving project:', updatedProject);
//     setIsEditModalOpen(false);
//   };

//   const handleAddTechnology = () => {
//     if (newTechName.trim()) {
//       const newTech = {
//         id: `t${Date.now()}`,
//         name: newTechName.trim()
//       };
//       setEditTechnologies([...editTechnologies, newTech]);
//       setNewTechName('');
//     }
//   };

//   const handleRemoveTechnology = (techId: string) => {
//     setEditTechnologies(editTechnologies.filter(tech => tech.id !== techId));
//   };

//   const handleTechKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleAddTechnology();
//     }
//   };

//   const handleDeleteProject = () => {
//     console.log('Project deleted');
//     setIsDeleteModalOpen(false);
//   };

//   const handleAddTeamMember = () => {
//     const newMember = {
//       id: Date.now().toString(),
//       name: 'New Member',
//       email: 'new@example.com',
//       role: 'Member'
//     };
//     setTeamMembers([...teamMembers, newMember]);
//   };

//   const handleRemoveTeamMember = (id: string) => {
//     setTeamMembers(teamMembers.filter(member => member.id !== id));
//   };

//   const handlePromoteMember = (memberId: string, newRole: string) => {
//     setTeamMembers(prevMembers => {
//       let updatedMembers = [...prevMembers];
      
//       if (newRole === 'Team Lead') {
//         updatedMembers = updatedMembers.map(member => 
//           member.role === 'Team Lead' ? { ...member, role: 'Member' } : member
//         );
//       }
      
//       if (newRole === 'Assistant Lead') {
//         updatedMembers = updatedMembers.map(member => 
//           member.role === 'Assistant Lead' ? { ...member, role: 'Member' } : member
//         );
//       }
      
//       return updatedMembers.map(member => 
//         member.id === memberId ? { ...member, role: newRole } : member
//       );
//     });
//   };

//   const handleSaveTimeline = () => {
//     console.log('Saving timeline:', timelineData);
//     setIsTimelineEditMode(false);
//   };

//   const handleCancelTimelineEdit = () => {
//     setTimelineData({
//       startDate: '2023-09-15',
//       targetDate: '2024-06-30',
//       liveUrl: 'https://example-project.com',
//       codeUrl: 'https://github.com/example/project'
//     });
//     setIsTimelineEditMode(false);
//   };

//   const handleViewLive = () => {
//     window.open(timelineData.liveUrl, '_blank');
//   };

//   const handleViewCode = () => {
//     window.open(timelineData.codeUrl, '_blank');
//   };

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         alert('Please select a valid image file');
//         return;
//       }
      
//       if (file.size > 5 * 1024 * 1024) {
//         alert('Image size should be less than 5MB');
//         return;
//       }

//       setIsImageUploading(true);
      
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setProjectImage(e.target?.result as string);
//         setIsImageUploading(false);
//         setIsImageModalOpen(false);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveImage = () => {
//     setProjectImage(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleImageClick = () => {
//     setIsImageModalOpen(true);
//   };

//   if (!project) {
//     return (
//       <div className="w-screen min-h-screen bg-gray-950 flex items-center justify-center text-3xl text-red-400">
//         Project not found!!
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen overflow-x-hidden">
//       <div className="flex items-center justify-between mb-8 px-4">
//         <div className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors flex items-center group">
//           <span className="font-['Maven_Pro',sans-serif] font-bold text-2xl lg:text-3xl text-white">
//             {project.name}
//           </span>
//         </div>
//         <span className="px-6 py-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white text-sm font-semibold shadow-lg min-w-[110px] text-center">
//           {project.status}
//         </span>
//       </div>

//       <div className="flex flex-col xl:flex-row gap-8 w-full px-4">
//         {/* Main Content */}
//         <div className="xl:flex-[2_1_0%] w-full space-y-6">
//           {/* Project Image */}
//           <div className="relative w-full h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-6 flex items-center justify-center border border-gray-700/50 shadow-2xl overflow-hidden group cursor-pointer" onClick={handleImageClick}>
//             {projectImage ? (
//               <>
//                 <img 
//                   src={projectImage} 
//                   alt="Project Preview" 
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
//                   <div className="text-white text-center">
//                     <FaEdit className="text-2xl mx-auto mb-2" />
//                     <span className="text-sm font-medium">Change Image</span>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="text-center group-hover:scale-105 transition-transform duration-300">
//                 <FaImage className="text-4xl text-gray-400 mx-auto mb-3" />
//                 <span className="text-gray-300 text-lg font-medium block mb-1">Add Project Image</span>
//                 <span className="text-gray-500 text-sm">Click to upload project preview</span>
//               </div>
//             )}
            
//             {isImageUploading && (
//               <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
//                 <div className="text-white text-center">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
//                   <span className="text-sm">Uploading...</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Project Details */}
//           <div className="bg-gray-900/70 backdrop-blur-lg p-8 w-full rounded-xl shadow-2xl border border-gray-700/50">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-white">Project Details</h2>
//               <button 
//                 onClick={() => {
//                   setEditForm(project);
//                   setEditTechnologies(project.technologies);
//                   setIsEditModalOpen(true);
//                 }}
//                 className="px-6 py-2 bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white rounded-lg hover:from-fuchsia-700 hover:to-fuchsia-800 transition-all duration-300 shadow-lg font-medium flex items-center gap-2"
//               >
//                 <FaEdit className="text-sm" />
//                 Edit
//               </button>
//             </div>
            
//             <h3 className="font-semibold text-lg text-gray-200 mb-3">Description</h3>
//             <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
            
//             <h3 className="font-semibold text-lg text-gray-200 mb-4">Tech Stack</h3>
//             <div className="flex flex-wrap gap-3">
//               {project.technologies.map((tech) => (
//                 <span 
//                   key={tech.id} 
//                   className="bg-gradient-to-r from-fuchsia-500/20 to-green-500/20 text-fuchsia-300 px-4 py-2 rounded-full text-sm font-medium border border-fuchsia-500/30 backdrop-blur-sm hover:from-fuchsia-500/30 hover:to-green-500/30 transition-all duration-300"
//                 >
//                   {tech.name}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Timeline */}
//           <div className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-gray-700/50">
//             <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
//               <div className="flex-1">
//                 <h2 className="font-semibold text-xl text-white mb-4">Timeline</h2>
//                 {!isTimelineEditMode ? (
//                   <div className="space-y-3">
//                     <div className="flex items-center">
//                       <span className="text-gray-400 w-28">Start Date:</span>
//                       <span className="text-gray-200 font-medium">{timelineData.startDate}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <span className="text-gray-400 w-28">Target Date:</span>
//                       <span className="text-gray-200 font-medium">{timelineData.targetDate}</span>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-gray-300 text-sm font-medium mb-2">Start Date</label>
//                       <input
//                         type="date"
//                         value={timelineData.startDate}
//                         onChange={(e) => setTimelineData({...timelineData, startDate: e.target.value})}
//                         className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-fuchsia-500 focus:outline-none"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-300 text-sm font-medium mb-2">Target Date</label>
//                       <input
//                         type="date"
//                         value={timelineData.targetDate}
//                         onChange={(e) => setTimelineData({...timelineData, targetDate: e.target.value})}
//                         className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-fuchsia-500 focus:outline-none"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-300 text-sm font-medium mb-2">Live URL</label>
//                       <input
//                         type="url"
//                         value={timelineData.liveUrl}
//                         onChange={(e) => setTimelineData({...timelineData, liveUrl: e.target.value})}
//                         placeholder="https://example.com"
//                         className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-fuchsia-500 focus:outline-none"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-300 text-sm font-medium mb-2">Code Repository URL</label>
//                       <input
//                         type="url"
//                         value={timelineData.codeUrl}
//                         onChange={(e) => setTimelineData({...timelineData, codeUrl: e.target.value})}
//                         placeholder="https://github.com/username/repo"
//                         className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-fuchsia-500 focus:outline-none"
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="mt-4 md:mt-0 md:ml-4">
//                 {!isTimelineEditMode ? (
//                   <button 
//                     onClick={() => setIsTimelineEditMode(true)}
//                     className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white rounded-lg hover:from-fuchsia-700 hover:to-fuchsia-800 transition-all duration-300 shadow-lg font-medium flex items-center gap-2"
//                   >
//                     <FaEdit className="text-sm" />
//                     Edit
//                   </button>
//                 ) : (
//                   <div className="flex gap-2">
//                     <button 
//                       onClick={handleSaveTimeline}
//                       className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white rounded-lg hover:from-fuchsia-700 hover:to-fuchsia-800 transition-all duration-300 font-medium text-sm"
//                     >
//                       Save
//                     </button>
//                     <button 
//                       onClick={handleCancelTimelineEdit}
//                       className="px-4 py-2 border border-gray-600 text-gray-200 rounded-lg hover:bg-gray-800 transition-all duration-300 text-sm"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-4">
//               <button 
//                 onClick={handleViewLive}
//                 disabled={!timelineData.liveUrl}
//                 className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white px-6 py-3 rounded-lg hover:from-fuchsia-700 hover:to-fuchsia-800 transition-all duration-300 shadow-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <FaExternalLinkAlt className="text-sm" />
//                 View Live
//               </button>
//               <button 
//                 onClick={handleViewCode}
//                 disabled={!timelineData.codeUrl}
//                 className="border border-gray-600 text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <FaCode className="text-sm" />
//                 View Code
//               </button>
//             </div>
//           </div>

//           {/* Team Members */}
//           <div className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-gray-700/50">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold text-white">Team Members</h3>
//               <button 
//                 onClick={() => setIsTeamEditModalOpen(true)}
//                 className="text-sm bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-medium border border-gray-600 flex items-center gap-2"
//               >
//                 <FaEdit className="text-xs" />
//                 Edit Team
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               {TEAM_MEMBERS.map((member) => (
//                 <div 
//                   key={member.id} 
//                   className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/30 hover:bg-gray-800/70 transition-all duration-300"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 to-green-600 flex items-center justify-center font-semibold text-white shadow-lg">
//                       {getInitials(member.name)}
//                     </div>
//                     <div>
//                       <div className="font-medium text-gray-100">{member.name}</div>
//                       <div className="text-sm text-gray-400">{member.email}</div>
//                     </div>
//                   </div>
//                   <span className={`px-4 py-2 text-xs rounded-full font-semibold ${getRoleStyles(member.role)}`}>
//                     {member.role}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="xl:flex-[1_1_0%] w-full space-y-6">
//           {/* Project Info */}
//           <div className="bg-gray-900/70 backdrop-blur-lg p-8 w-full rounded-xl shadow-2xl border border-gray-700/50">
//             <h3 className="text-xl font-bold text-white mb-6">Project Info</h3>

//             <div className="space-y-6">
//               <div className="p-4 rounded-lg bg-gray-800/40 border border-gray-700/30">
//                 <span className="font-semibold text-gray-200 block mb-2">Domain</span>
//                 <span className="text-gray-300">{project.domain}</span>
//               </div>

//               <div className="p-4 rounded-lg bg-gray-800/40 border border-gray-700/30">
//                 <span className="font-semibold text-gray-200 block mb-3">Leadership</span>
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-400">Team Lead:</span>
//                     <span className="text-gray-200 font-medium">{project.teamLead}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-400">Assistant Lead:</span>
//                     <span className="text-gray-200 font-medium">{project.assistantLead}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="p-4 rounded-lg bg-gray-800/40 border border-gray-700/30">
//                 <span className="font-semibold text-gray-200 block mb-2">Team Size</span>
//                 <span className="text-gray-300">{project.teamSize} members</span>
//               </div>
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-gray-700/50">
//             <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
//             <div className="space-y-4">
//               {project.activities.length > 0 ? (
//                 project.activities.map((activity) => (
//                   <div 
//                     key={activity.id} 
//                     className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/40 border border-gray-700/30 hover:bg-gray-800/60 transition-all duration-300"
//                   >
//                     <div className="text-2xl">{activity.icon}</div>
//                     <div className="flex-1">
//                       <div className="text-gray-200 font-medium">{activity.description}</div>
//                       <div className="text-sm text-gray-400 mt-1">{activity.time}</div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-gray-400 text-center py-8 text-sm">No recent activity.</div>
//               )}
//             </div>
//           </div>

     
//         </div>
//       </div>

//       {/* Edit Project Modal */}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-700 flex items-center justify-between">
//               <h2 className="text-xl font-bold text-white">Edit Project</h2>
//               <button 
//                 onClick={() => setIsEditModalOpen(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <FaTimes className="text-xl" />
//               </button>
//             </div>
//             <div className="p-6 space-y-6">
//               <div>
//                 <label className="block text-gray-200 font-medium mb-2">Project Name</label>
//                 <input 
//                   type="text" 
//                   value={editForm.name || ''}
//                   onChange={(e) => setEditForm({...editForm, name: e.target.value})}
//                   className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-fuchsia-500 focus:outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-200 font-medium mb-2">Description</label>
//                 <textarea 
//                   value={editForm.description || ''}
//                   onChange={(e) => setEditForm({...editForm, description: e.target.value})}
//                   rows={4}
//                   className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-fuchsia-500 focus:outline-none resize-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-200 font-medium mb-2">Domain</label>
//                 <input 
//                   type="text" 
//                   value={editForm.domain || ''}
//                   onChange={(e) => setEditForm({...editForm, domain: e.target.value})}
//                   className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-fuchsia-500 focus:outline-none"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-gray-200 font-medium mb-3">Tech Stack</label>
//                 <div className="space-y-3">
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={newTechName}
//                       onChange={(e) => setNewTechName(e.target.value)}
//                       onKeyPress={handleTechKeyPress}
//                       placeholder="Add new technology..."
//                       className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-fuchsia-500 focus:outline-none"
//                     />
//                     <button
//                       onClick={handleAddTechnology}
//                       disabled={!newTechName.trim()}
//                       className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white rounded-lg hover:from-fuchsia-700 hover:to-fuchsia-800 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                     >
//                       <FaPlus className="text-xs" />
//                       Add
//                     </button>
//                   </div>
                  
//                   <div className="flex flex-wrap gap-2">
//                     {editTechnologies.map((tech) => (
//                       <div
//                         key={tech.id}
//                         className="flex items-center gap-2 bg-gradient-to-r from-fuchsia-500/20 to-green-500/20 text-fuchsia-300 px-3 py-2 rounded-full text-sm font-medium border border-fuchsia-500/30 backdrop-blur-sm"
//                       >
//                         <span>{tech.name}</span>
//                         <button
//                           onClick={() => handleRemoveTechnology(tech.id)}
//                           className="text-red-400 hover:text-red-300 transition-colors ml-1"
//                           title="Remove technology"
//                         >
//                           <FaTimes className="text-xs" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
                  
//                   {editTechnologies.length === 0 && (
//                     <div className="text-gray-500 text-sm italic py-2">
//                       No technologies added yet. Add some technologies above.
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex gap-4 pt-4">
//                 <button 
//                   onClick={handleSaveProject}
//                   className="flex-1 bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white px-6 py-3 rounded-lg hover:from-fuchsia-700 hover:to-fuchsia-800 transition-all duration-300 font-medium"
//                 >
//                   Save Changes
//                 </button>
//                 <button 
//                   onClick={() => {
//                     setIsEditModalOpen(false);
//                     setEditTechnologies(project?.technologies || []);
//                     setNewTechName('');
//                   }}
//                   className="px-6 py-3 border border-gray-600 text-gray-200 rounded-lg hover:bg-gray-800 transition-all duration-300"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Team Edit Modal */}
//       {isTeamEditModalOpen && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             <div className="p-6 border-b border-gray-700 flex items-center justify-between">
//               <h2 className="text-xl font-bold text-white">Manage Team Members</h2>
//               <button 
//                 onClick={() => setIsTeamEditModalOpen(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <FaTimes className="text-xl" />
//               </button>
//             </div>
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-lg font-semibold text-white">Team Members</h3>
//                 <button 
//                   onClick={handleAddTeamMember}
//                   className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white px-4 py-2 rounded-lg hover:from-fuchsia-700 hover:to-fuchsia-800 transition-all duration-300 font-medium flex items-center gap-2"
//                 >
//                   <FaPlus className="text-xs" />
//                   Add Member
//                 </button>
//               </div>
//               <div className="space-y-3 mb-6">
//                 {teamMembers.map((member) => (
//                   <div key={member.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-green-600 flex items-center justify-center font-semibold text-white text-sm">
//                         {getInitials(member.name)}
//                       </div>
//                       <div>
//                         <div className="text-gray-100 font-medium">{member.name}</div>
//                         <div className="text-gray-400 text-sm">{member.email}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="relative">
//                         <select
//                           value={member.role}
//                           onChange={(e) => handlePromoteMember(member.id, e.target.value)}
//                           className="appearance-none bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 pr-8 text-white text-sm focus:border-fuchsia-500 focus:outline-none cursor-pointer"
//                         >
//                           <option value="Member">Member</option>
//                           <option value="Assistant Lead">Assistant Lead</option>
//                           <option value="Team Lead">Team Lead</option>
//                         </select>
//                         <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
//                       </div>
//                       <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getRoleStyles(member.role)}`}>
//                         {member.role}
//                       </span>
//                       <button 
//                         onClick={() => handleRemoveTeamMember(member.id)}
//                         className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-400/10 rounded-lg"
//                         title="Remove member"
//                       >
//                         <FaTrash className="text-sm" />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="bg-gray-800/30 rounded-lg p-4 mb-6">
//                 <h4 className="text-gray-200 font-semibold mb-3 flex items-center gap-2">
//                   <span className="w-2 h-2 bg-fuchsia-400 rounded-full"></span>
//                   Role Management Rules
//                 </h4>
//                 <ul className="text-gray-400 text-sm space-y-2">
//                   <li>• Only one Team Lead is allowed per project</li>
//                   <li>• Only one Assistant Lead is allowed per project</li>
//                   <li>• Promoting someone will automatically demote the current role holder</li>
//                   <li>• Team Leads and Assistant Leads cannot be removed from the project</li>
//                 </ul>
//               </div>

//               <div className="flex justify-end gap-4">
//                 <button 
//                   onClick={() => setIsTeamEditModalOpen(false)}
//                   className="px-6 py-3 border border-gray-600 text-gray-200 rounded-lg hover:bg-gray-800 transition-all duration-300"
//                 >
//                   Done
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {isDeleteModalOpen && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md">
//             <div className="p-6 text-center">
//               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FaTrash className="text-red-600 text-xl" />
//               </div>
//               <h2 className="text-xl font-bold text-white mb-2">Delete Project</h2>
//               <p className="text-gray-300 mb-6">
//                 Are you sure you want to delete "{project.name}"? This action cannot be undone.
//               </p>
//               <div className="flex gap-4">
//                 <button 
//                   onClick={() => setIsDeleteModalOpen(false)}
//                   className="flex-1 px-6 py-3 border border-gray-600 text-gray-200 rounded-lg hover:bg-gray-800 transition-all duration-300"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   onClick={handleDeleteProject}
//                   className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Image Upload Modal */}
//       {isImageModalOpen && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md">
//             <div className="p-6 border-b border-gray-700 flex items-center justify-between">
//               <h2 className="text-xl font-bold text-white">Project Image</h2>
//               <button 
//                 onClick={() => setIsImageModalOpen(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <FaTimes className="text-xl" />
//               </button>
//             </div>
//             <div className="p-6">
//               {projectImage ? (
//                 <div className="space-y-4">
//                   <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-700">
//                     <img 
//                       src={projectImage} 
//                       alt="Current project image" 
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => fileInputRef.current?.click()}
//                       className="flex-1 bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white px-4 py-2 rounded-lg hover:from-fuchsia-700 hover:to-fuchsia-800 transition-all duration-300 font-medium flex items-center justify-center gap-2"
//                     >
//                       <FaUpload className="text-sm" />
//                       Replace Image
//                     </button>
//                     <button
//                       onClick={handleRemoveImage}
//                       className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-medium flex items-center gap-2"
//                     >
//                       <FaTrash className="text-sm" />
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center space-y-4">
//                   <div className="w-full h-48 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
//                     <div className="text-center">
//                       <FaUpload className="text-3xl text-gray-400 mx-auto mb-2" />
//                       <p className="text-gray-300 font-medium">Upload Project Image</p>
//                       <p className="text-gray-500 text-sm mt-1">PNG, JPG, JPEG up to 5MB</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => fileInputRef.current?.click()}
//                     className="w-full bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white px-4 py-3 rounded-lg hover:from-fuchsia-700 hover:to-fuchsia-800 transition-all duration-300 font-medium flex items-center justify-center gap-2"
//                   >
//                     <FaUpload className="text-sm" />
//                     Choose Image
//                   </button>
//                 </div>
//               )}
              
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
              
//               <div className="mt-4 text-gray-400 text-xs">
//                 <p className="mb-1">• Supported formats: PNG, JPG, JPEG</p>
//                 <p className="mb-1">• Maximum file size: 5MB</p>
//                 <p>• Recommended resolution: 1200x600px</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import Link from 'next/link';
import {
  FaChevronLeft,
  FaTimes,
  FaPlus,
  FaTrash,
  FaEdit,
  FaExternalLinkAlt,
  FaCode,
  FaChevronDown,
  FaUpload,
  FaImage,
} from 'react-icons/fa';
import { useState, useRef, useMemo } from 'react';

// ========================= Mock Data =========================
const mockProject = [
  {
    id: '1',
    name: 'E-commerce Platform',
    status: 'Active',
    description:
      'E-commerce content encompasses all materials businesses create to attract and retain customers online, including product descriptions, social media posts, blog posts, and more.',
    technologies: [
      { id: 't1', name: 'React' },
      { id: 't2', name: 'Next.js' },
      { id: 't3', name: 'Tailwind CSS' },
    ],
    domain: 'E-commerce',
    teamLead: 'Alice',
    assistantLead: 'Bob',
    teamSize: 5,
    activities: [
      { id: 'a1', icon: '📝', description: 'Updated Resume', time: '2 hours ago' },
    ],
  },
];

// ========================= Types =========================
type Technology = {
  id: string;
  name: string;
};

type Activity = {
  id: string;
  icon: string;
  description: string;
  time: string;
};

type ProjectType = {
  id: string;
  name: string;
  status: string;
  description: string;
  technologies: Technology[];
  domain: string;
  teamLead: string;
  assistantLead: string;
  teamSize: number;
  activities: Activity[];
};

// ========================= Helpers =========================
const TEAM_MEMBERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Team Lead' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Assistant Lead' },
  { id: '3', name: 'Alice', email: 'alice@example.com', role: 'Member' },
  { id: '4', name: 'Bob', email: 'bob@example.com', role: 'Member' },
];

function getProjectById(projectId: string) {
  return mockProject.find((p) => p.id === projectId) || null;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

const getRoleStyles = (role: string) => {
  switch (role) {
    case 'Team Lead':
      return 'bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white shadow-lg';
    case 'Assistant Lead':
      return 'bg-gradient-to-r from-fuchsia-600/80 to-fuchsia-700/80 text-white shadow-md';
    default:
      return 'bg-gray-700 text-gray-300 border border-gray-600';
  }
};

// ========================= Component =========================
type Props = { params: { projectId: string } };

export default function Project({ params }: Props) {
  const { projectId } = params;
  const project = useMemo(() => getProjectById(projectId), [projectId]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<ProjectType | null>(project);
  const [editTechnologies, setEditTechnologies] = useState<Technology[]>(project?.technologies || []);
  const [newTechName, setNewTechName] = useState('');

  // ========================= Handlers =========================

  const handleSaveProject = () => {
    if (!editForm) return;
    const updatedProject: ProjectType = {
      ...editForm,
      technologies: editTechnologies,
      id: editForm.id || project?.id || '',
    };
    console.log('Saving project:', updatedProject);
    setIsEditModalOpen(false);
  };

  const handleAddTechnology = () => {
    if (newTechName.trim()) {
      const newTech: Technology = { id: `t${Date.now()}`, name: newTechName.trim() };
      setEditTechnologies([...editTechnologies, newTech]);
      setNewTechName('');
    }
  };

  const handleTechKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  if (!project) {
    return (
      <div className="w-screen min-h-screen bg-gray-950 flex items-center justify-center text-3xl text-red-400">
        Project not found!!
      </div>
    );
  }

  // ========================= UI =========================
  return (
    <div className="w-full min-h-screen overflow-x-hidden p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <p className="text-gray-400 mb-6">{project.description}</p>

      <button
        onClick={() => {
          setEditForm(project);
          setEditTechnologies(project.technologies);
          setIsEditModalOpen(true);
        }}
        className="px-6 py-2 bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white rounded-lg"
      >
        Edit Project
      </button>

      {isEditModalOpen && editForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-2xl border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Project</h2>
              <button onClick={() => setIsEditModalOpen(false)}>
                <FaTimes />
              </button>
            </div>

            {/* Name */}
            <label className="block text-gray-300 mb-2">Project Name</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) =>
                setEditForm((prev) => (prev ? { ...prev, name: e.target.value } : null))
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-4"
            />

            {/* Description */}
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              value={editForm.description}
              onChange={(e) =>
                setEditForm((prev) => (prev ? { ...prev, description: e.target.value } : null))
              }
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-4"
            />

            {/* Domain */}
            <label className="block text-gray-300 mb-2">Domain</label>
            <input
              type="text"
              value={editForm.domain}
              onChange={(e) =>
                setEditForm((prev) => (prev ? { ...prev, domain: e.target.value } : null))
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-4"
            />

            {/* Technologies */}
            <label className="block text-gray-300 mb-2">Tech Stack</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTechName}
                onChange={(e) => setNewTechName(e.target.value)}
                onKeyPress={handleTechKeyPress}
                placeholder="Add new tech..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              />
              <button
                onClick={handleAddTechnology}
                className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 px-4 py-2 rounded-lg"
              >
                <FaPlus />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {editTechnologies.map((tech) => (
                <span
                  key={tech.id}
                  className="bg-fuchsia-600/30 border border-fuchsia-500/30 text-fuchsia-300 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {tech.name}
                  <button
                    onClick={() =>
                      setEditTechnologies(editTechnologies.filter((t) => t.id !== tech.id))
                    }
                    className="text-red-400"
                  >
                    <FaTimes />
                  </button>
                </span>
              ))}
            </div>

            {/* Save / Cancel */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProject}
                className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
