// import Link from 'next/link';
// import { FaChevronLeft, FaUsers, FaImage, FaEdit, FaCircle, FaBell } from 'react-icons/fa';


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
 
//  {
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

//    {
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

// function getProjectById(projectId: string) {
//   return mockProject.find((p) => p.id === projectId);
// }

// type Props = {
//   params: {
//     projectId: string;
//   };
// };

// export default async function Project({ params }: Props) {
//   const { projectId } = params;
//   const project = await getProjectById(projectId);

//   if (!project) {
//     return (
//       <div className="w-screen min-h-screen bg-gray-900 flex items-center justify-center text-3xl text-red-400">
//         Project not found!!
//       </div>
//     );
//   }

//   // Calculate progress
//   const startDate = new Date('2025-09-15');
//   const targetDate = new Date('2025-11-30');
//   const currentDate = new Date();
  
//   const totalDays = Math.floor((targetDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
//   const elapsedDays = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
//   const remainingDays = Math.max(0, totalDays - elapsedDays);
//   const progressPercentage = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));

//   return (
//     <div className="w-full min-h-screen  py-6  overflow-x-hidden">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-12">
//           <div className="text-white hover:text-indigo-300 hover:underline flex items-center group transition-colors duration-300">
//             <span className="font-['Maven_Pro',sans-serif] font-bold text-[32px] leading-[100%] tracking-[-0.5px]">{project.name}</span>
//           </div>
//           <div className={`px-6 py-2 rounded-full text-sm font-semibold shadow-lg ${
//             project.status === 'Active' 
//               ? 'bg-indigo-700 text-white' 
//               : 'bg-gray-700 text-gray-200'
//           }`}>
//             {project.status}
//           </div>
//         </div>

//         <div className="flex flex-col xl:flex-row gap-8 w-full">
//           <div className="xl:flex-[2_1_0%] w-full space-y-8">
//             {/* Project Image */}
//             <div className="w-full h-72 bg-gray-900 rounded-2xl flex items-center justify-center shadow-2xl border border-gray-800">
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FaImage className="text-2xl text-white" />
//                 </div>
//                 <span className="text-gray-300 text-lg font-medium">Project Preview</span>
//               </div>
//             </div>

//             {/* Project Details */}
//             <div className="bg-gray-900 p-8 w-full rounded-2xl shadow-2xl border border-gray-800">
//               <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//                 <div className="w-1 h-8 bg-indigo-700 rounded-full"></div>
//                 Project Details
//               </h2>
              
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="font-semibold mb-3 text-gray-200 text-lg">Description</h3>
//                   <p className="text-gray-300 leading-relaxed text-sm bg-gray-800/30 p-4 rounded-xl border border-gray-700">{project.description}</p>
//                 </div>
                
//                 <div>
//                   <h3 className="font-semibold mb-3 text-gray-200 text-lg">Tech Stack</h3>
//                   <div className="flex flex-wrap gap-3">
//                     {project.technologies.map((tech) => (
//                       <span key={tech.id} className="px-4 py-2 rounded-xl text-sm font-semibold shadow-lg border bg-indigo-900/50 text-indigo-200 border-indigo-800/50 hover:bg-indigo-900/50 transition-all duration-300 hover:scale-105">
//                         {tech.name}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Timeline & Actions */}
//             <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800">
//               <div className="flex flex-col lg:flex-row lg:justify-between mb-8 gap-6">
//                 <div className="flex-1">
//                   <h2 className="font-semibold text-xl mb-4 text-white flex items-center gap-3">
//                     <div className="w-1 h-6 bg-indigo-700 rounded-full"></div>
//                     Timeline
//                   </h2>
//                   <div className="space-y-4 bg-gray-800/30 p-4 rounded-xl border border-gray-700">
//                     <div className="flex items-center gap-3">
//                       <FaCircle className="text-indigo-400 text-xs" />
//                       <span className="text-gray-300 text-sm">Start Date: <span className="font-medium text-white">2025-09-15</span></span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <FaCircle className="text-indigo-400 text-xs" />
//                       <span className="text-gray-300 text-sm">Target Date: <span className="font-medium text-white">2025-11-30</span></span>
//                     </div>
                    
//                     {/* Progress Bar */}
//                     <div className="pt-3 space-y-2">
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="text-xs text-gray-400">Progress</span>
//                         <span className="text-xs font-semibold text-indigo-300">{progressPercentage.toFixed(1)}%</span>
//                       </div>
//                       <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700">
//                         <div 
//                           className="h-full bg-indigo-700 rounded-full transition-all duration-500 relative overflow-hidden"
//                           style={{ width: `${progressPercentage}%` }}
//                         >
//                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
//                         </div>
//                       </div>
//                       <div className="flex justify-between items-center text-xs mt-2">
//                         <span className="text-gray-400">
//                           <span className="font-semibold text-indigo-300">{elapsedDays}</span> days elapsed
//                         </span>
//                         <span className="text-gray-400">
//                           <span className="font-semibold text-indigo-300">{remainingDays}</span> days left
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <button className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl transform">
//                   View Live
//                 </button>
//                 <button className="px-6 py-3 border-2 border-gray-700 text-gray-200 hover:bg-gray-800/50 hover:border-gray-500 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm">
//                   View Code
//                 </button>
//               </div>
//             </div>

//             {/* Team Members */}
//             <div className="bg-gray-900 p-8 shadow-2xl rounded-2xl border border-gray-800">
//               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
//                 <div className="w-1 h-8 bg-indigo-700 rounded-full"></div>
//                 Team Members
//               </h3>
              
//               <div className="space-y-4">
//                 {[
//                   { name: 'John Doe', email: 'john@example.com', role: 'Team Lead' },
//                   { name: 'Jane Smith', email: 'jane@example.com', role: 'Assistant Lead' },
//                   { name: 'Alice', email: 'alice@example.com', role: 'Member' },
//                   { name: 'Bob', email: 'bob@example.com', role: 'Member' },
//                   { name: 'Charlie', email: 'charlie@example.com', role: 'Member' },
//                 ].map((member) => (
//                   <div key={member.email} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:bg-gray-800/50 transition-all duration-300 group">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shadow-lg bg-indigo-700 text-white">
//                         {member.name
//                           .split(' ')
//                           .map((n) => n[0])
//                           .join('')
//                           .toUpperCase()}
//                       </div>
//                       <div>
//                         <div className="font-semibold text-gray-100 group-hover:text-white transition-colors duration-300">{member.name}</div>
//                         <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{member.email}</div>
//                       </div>
//                     </div>
//                     <span className={`px-4 py-2 text-xs rounded-full font-semibold shadow-lg ${
//                       member.role === 'Team Lead'
//                         ? 'bg-indigo-700 text-white'
//                         : member.role === 'Assistant Lead'
//                         ? 'bg-indigo-500 text-white'
//                         : 'bg-gray-800 text-gray-300 border border-gray-700'
//                     }`}>
//                       {member.role}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="xl:flex-[1_1_0%] w-full space-y-8">
//             {/* Project Info */}
//             <div className="bg-gray-900 p-8 w-full rounded-2xl shadow-2xl border border-gray-800 sticky top-8">
//               <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
//                 <div className="w-1 h-8 bg-indigo-700 rounded-full"></div>
//                 Project Info
//               </h3>

//               <div className="space-y-6">
//                 <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
//                   <span className="font-semibold text-gray-200 block mb-2">Domain</span>
//                   <span className="text-gray-300 bg-indigo-900/30 px-3 py-1 rounded-lg text-sm font-medium">{project.domain}</span>
//                 </div>

//                 <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
//                   <span className="font-semibold text-gray-200 block mb-3">Leadership</span>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                       <FaCircle className="text-indigo-400 text-xs" />
//                       <span className="text-gray-400 text-sm">Team Lead:</span>
//                       <span className="text-gray-200 font-medium">{project.teamLead}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <FaCircle className="text-indigo-400 text-xs" />
//                       <span className="text-gray-400 text-sm">Assistant Lead:</span>
//                       <span className="text-gray-200 font-medium">{project.assistantLead}</span>
//                     </div>
//                   </div>
//                 </div>
                    
//                 <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
//                   <span className="font-semibold text-gray-200 block mb-2">Team Size</span>
//                   <div className="flex items-center gap-2">
//                     <FaUsers className="text-indigo-400" />
//                     <span className="text-gray-300 font-medium">{project.teamSize} members</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800">
//               <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
//                 <div className="w-1 h-8 bg-indigo-700 rounded-full"></div>
//                 Recent Activity
//               </h3>
//               <div className="space-y-4">
//                 {project.activities.length > 0 ? (
//                   project.activities.map((activity) => (
//                     <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:bg-gray-800/50 transition-all duration-300">
//                       <FaEdit className="text-2xl text-indigo-400 mt-1" />
//                       <div className="flex-1">
//                         <div className="text-gray-200 font-medium mb-1">{activity.description}</div>
//                         <div className="text-xs text-gray-500">{activity.time}</div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-gray-400 text-sm text-center py-8 bg-gray-800/20 rounded-xl border border-gray-700">
//                     No recent activity.
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FaUsers,
  FaImage,
  FaEdit,
  FaCircle,
} from "react-icons/fa";

export default function ProjectPage() {
  const { id } = useParams(); // Get project ID from URL
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch from API
  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/project/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch project");
        const data = await res.json();
        setProject(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="w-screen min-h-screen bg-gray-900 flex items-center justify-center text-3xl text-indigo-400">
        Loading Project...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="w-screen min-h-screen bg-gray-900 flex items-center justify-center text-3xl text-red-400">
        Project not found!
      </div>
    );
  }

  // Progress calculation
  const startDate = new Date(project.startDate || "2025-09-15");
  const targetDate = new Date(project.targetDate || "2025-11-30");
  const now = new Date();

  const totalDays = Math.max(
    1,
    Math.floor((targetDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  );
  const elapsedDays = Math.max(
    0,
    Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  );
  const remainingDays = Math.max(0, totalDays - elapsedDays);
  const progress = Math.min(100, (elapsedDays / totalDays) * 100);

  return (
    <div className="w-full min-h-screen py-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="text-white font-bold text-[32px] leading-[100%] tracking-[-0.5px]">
            {project.name}
          </div>
          <div
            className={`px-6 py-2 rounded-full text-sm font-semibold shadow-lg ${
              project.status === "Active"
                ? "bg-indigo-700 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {project.status}
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 w-full">
          {/* Left Side */}
          <div className="xl:flex-[2_1_0%] w-full space-y-8">
            {/* Project Image */}
            <div className="w-full h-72 bg-gray-900 rounded-2xl flex items-center justify-center shadow-2xl border border-gray-800">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaImage className="text-2xl text-white" />
                </div>
                <span className="text-gray-300 text-lg font-medium">
                  Project Preview
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-900 p-8 w-full rounded-2xl shadow-2xl border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-700 rounded-full"></div>
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            {project.technologies && (
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <h2 className="text-xl font-bold text-white mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-900/50 text-indigo-200 border border-indigo-800/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800">
              <h2 className="font-semibold text-xl mb-4 text-white flex items-center gap-3">
                <div className="w-1 h-6 bg-indigo-700 rounded-full"></div>
                Timeline
              </h2>

              <div className="space-y-3 bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                <div className="text-gray-300 text-sm">
                  <FaCircle className="inline text-indigo-400 text-xs mr-2" />
                  Start:{" "}
                  <span className="font-medium text-white">
                    {startDate.toDateString()}
                  </span>
                </div>
                <div className="text-gray-300 text-sm">
                  <FaCircle className="inline text-indigo-400 text-xs mr-2" />
                  Target:{" "}
                  <span className="font-medium text-white">
                    {targetDate.toDateString()}
                  </span>
                </div>

                <div className="pt-4">
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700">
                    <div
                      className="h-full bg-indigo-700 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>{elapsedDays} days elapsed</span>
                    <span>{remainingDays} days left</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:flex-[1_1_0%] w-full space-y-8">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 sticky top-8">
              <h3 className="text-xl font-bold mb-6 text-white">
                Project Info
              </h3>

              <div className="space-y-6">
                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                  <span className="font-semibold text-gray-200 block mb-2">
                    Domain
                  </span>
                  <span className="text-gray-300 bg-indigo-900/30 px-3 py-1 rounded-lg text-sm font-medium">
                    {project.domain}
                  </span>
                </div>

                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                  <span className="font-semibold text-gray-200 block mb-3">
                    Leadership
                  </span>
                  <div className="text-gray-300 text-sm">
                    Team Lead:{" "}
                    <span className="text-white font-medium">
                      {project.teamLead}
                    </span>
                    <br />
                    Assistant Lead:{" "}
                    <span className="text-white font-medium">
                      {project.assistantLead}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                  <span className="font-semibold text-gray-200 block mb-2">
                    Team Size
                  </span>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-indigo-400" />
                    <span className="text-gray-300 font-medium">
                      {project.teamSize} members
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
