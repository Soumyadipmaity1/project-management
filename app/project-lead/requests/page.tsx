// "use client";
// import React, { useState, useEffect } from "react";

// type Request = {
//   id: string;
//   name: string;
//   img?: string;
//   appliedFor: string;
//   domain: string;
//   description: string;
// };

// export default function PendingRequests() {
//   const [requests, setRequests] = useState<Request[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch all requests from backend
//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/lead/requests", { cache: "no-store" });
//       if (!res.ok) throw new Error("Failed to fetch requests");
//       const data = await res.json();
//       setRequests(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Error loading requests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   // Approve
//   const handleApprove = async (id: string) => {
//     try {
//       const res = await fetch(`/api/lead/requests/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: "approved" }),
//       });
//       if (!res.ok) throw new Error("Failed to approve request");
//       setRequests((prev) => prev.filter((r) => r.id !== id));
//     } catch (err) {
//       alert("Error approving request");
//     }
//   };

//   // Reject
//   const handleReject = async (id: string) => {
//     try {
//       const res = await fetch(`/api/lead/requests/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: "rejected" }),
//       });
//       if (!res.ok) throw new Error("Failed to reject request");
//       setRequests((prev) => prev.filter((r) => r.id !== id));
//     } catch (err) {
//       alert("Error rejecting request");
//     }
//   };

//   return (
//     <div className="min-h-screen py-6 px-4">
//       <h2 className="font-mclaren text-[36px] mb-3 font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent">
//         Pending Requests
//       </h2>
//       <p className="text-slate-400 text-lg font-medium font-mclaren mb-8">
//         Approve or reject member requests
//       </p>

//       {loading && (
//         <p className="text-emerald-300 font-mclaren">Loading requests...</p>
//       )}
//       {error && <p className="text-red-400 font-mclaren">{error}</p>}

//       <div className="flex flex-col items-start">
//         {requests.map((request) => (
//           <div key={request.id} className="group relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
//             <div className="relative bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-xl border border-slate-700/50 rounded-xl flex flex-col items-start px-10 py-8 w-[360px] shadow-2xl mb-6 hover:shadow-emerald-500/25 transition-all duration-500 hover:border-emerald-400/60 overflow-hidden group-hover:transform group-hover:scale-[1.02]">
//               <img
//                 src={request.img || "/default-user.png"}
//                 alt={request.name}
//                 className="w-20 h-20 rounded-full object-cover mb-5 border-4 border-emerald-500 shadow-lg shadow-emerald-500/30"
//               />
//               <div className="font-bold text-xl bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent font-mclaren leading-tight mb-5 text-center">
//                 {request.name}
//               </div>

//               <div className="space-y-2 bg-slate-800/30 rounded-lg p-4 border border-slate-700/30 w-full mb-4">
//                 <div className="flex items-center justify-between">
//                   <span className="font-semibold text-emerald-300 text-sm font-mclaren">
//                     Applied for:
//                   </span>
//                   <span className="text-slate-300 text-sm font-mclaren font-medium">
//                     {request.appliedFor}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="font-semibold text-emerald-300 text-sm font-mclaren">
//                     Domain:
//                   </span>
//                   <span className="text-slate-300 text-sm font-mclaren font-medium">
//                     {request.domain}
//                   </span>
//                 </div>
//               </div>

//               <div className="text-slate-300 text-sm leading-relaxed font-mclaren mb-6">
//                 <span className="font-semibold text-emerald-300">
//                   Description:{" "}
//                 </span>
//                 {request.description}
//               </div>

//               <div className="flex gap-3 mt-auto w-full">
//                 <button
//                   className="flex-1 bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-700 hover:via-emerald-700 hover:to-teal-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:transform hover:scale-105 border border-emerald-500/20 font-mclaren"
//                   onClick={() => handleApprove(request.id)}
//                 >
//                   ✓ APPROVE
//                 </button>
//                 <button
//                   className="flex-1 bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-700 hover:via-red-700 hover:to-red-800 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:transform hover:scale-105 border border-red-500/20 font-mclaren"
//                   onClick={() => handleReject(request.id)}
//                 >
//                   ✗ REJECT
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//         {!loading && requests.length === 0 && (
//           <div className="flex items-center justify-center py-16 w-full">
//             <div className="text-slate-500 font-mclaren text-lg">
//               No pending requests found.
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

// Define request type
interface Request {
  id: number;
  name: string;
  email: string;
  img: string;
  project: string;
  domain: string;
  content: string;
}

// Sample data - only contribution requests
const initialRequests: Request[] = [
  {
    id: 1,
    name: "Eshita Kapat",
    email: "eshita.kapat@example.com",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    project: "E-Commerce Platform",
    domain: "Cloud",
    content:
      "I want to contribute to this existing project and help with the backend development.",
  },
  {
    id: 3,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    project: "Mobile Banking App",
    domain: "Fintech",
    content:
      "I would like to contribute to the mobile banking app project, specifically on the UI/UX design.",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    img: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    project: "Blockchain Wallet",
    domain: "Blockchain",
    content:
      "I would like to contribute to the blockchain wallet development, focusing on security features.",
  },
];

export default function PendingRequests() {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Get unique domains and projects for filters
  const uniqueProjects = [...new Set(initialRequests.map((req) => req.project))];

  // Filter requests based on selected filters and search query
  const filteredRequests = requests.filter((request) => {
    const projectMatch = projectFilter === "all" || request.project === projectFilter;
    const searchMatch =
      searchQuery.trim() === "" ||
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase());
    return projectMatch && searchMatch;
  });

  // Approve handler
  const handleApprove = (id: number): void => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
    // Add further approval logic here (API call etc.)
  };

  // Reject handler
  const handleReject = (id: number): void => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
    // Add further rejection logic here (API call etc.)
  };

  return (
    <div className="py-6 lg:px-4 min-h-screen">
      {/* Header */}
      <h2 className="text-4xl font-bold text-white">
        Pending Requests
      </h2>
      <p className="text-gray-300 text-lg mb-8">
        Approve or reject member contribution requests
      </p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex flex-col flex-1">
          <label className="text-gray-300 text-sm font-mclaren mb-2">
            Filter by Project
          </label>
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="bg-gray-900 border border-gray-800 text-gray-200 px-4 py-2 rounded font-mclaren focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">All Projects</option>
            {uniqueProjects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col flex-1">
          <label className="text-gray-300 text-sm font-mclaren mb-2">
            Search Members
          </label>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 text-gray-200 pl-10 pr-4 py-2 rounded font-mclaren focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-400 text-sm font-mclaren">
        Showing {filteredRequests.length} request{filteredRequests.length !== 1 ? "s" : ""}
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="bg-gray-900 border border-gray-800 rounded-lg flex flex-col px-6 py-6 shadow-2xl hover:bg-gray-750 transition-colors max-w-sm"
          >
            {/* Profile Photo */}
            <div className="flex justify-center mb-4">
              <img
                src={request.img}
                alt={request.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-gray-600 shadow-lg"
              />
            </div>

            {/* Name */}
            <div className="text-gray-100 font-mclaren text-[18px] font-bold mb-3 text-center">
              {request.name}
            </div>

            {/* Email */}
            <div className="text-gray-200 text-[14px] font-mclaren mb-2">
              <span className="text-gray-400">Email:</span>{" "}
              <span className="font-semibold text-blue-400 break-all">{request.email}</span>
            </div>

            {/* Domain */}
            <div className="text-gray-200 text-[14px] font-mclaren mb-2">
              <span className="text-gray-400">Domain:</span>{" "}
              <span className="font-semibold text-gray-100">{request.domain}</span>
            </div>

            {/* Project */}
            <div className="text-gray-200 text-[14px] font-mclaren mb-4">
              <span className="text-gray-400">Project:</span>{" "}
              <span className="font-semibold text-gray-100">{request.project}</span>
            </div>

            {/* Content */}
            <div className="text-gray-200 text-[14px] font-mclaren mb-4 flex-grow">
              <span className="text-gray-400">Content:</span>{" "}
              <span className="text-gray-300 leading-relaxed">{request.content}</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-auto">
              <button
                className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded font-bold text-[13px] transition-all duration-200 shadow-md hover:shadow-lg flex-1"
                onClick={() => handleApprove(request.id)}
              >
                ✓ APPROVE
              </button>
              <button
                className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded font-bold text-[13px] transition-all duration-200 shadow-md hover:shadow-lg flex-1"
                onClick={() => handleReject(request.id)}
              >
                ✗ DELETE
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredRequests.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-400 text-lg font-mclaren">
            No pending requests match your filters
          </p>
        </div>
      )}
    </div>
  );
}
