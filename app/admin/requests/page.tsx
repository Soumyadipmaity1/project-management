"use client";
import React, { useState } from "react";

// Define request type
interface Request {
  id: number;
  name: string;
  email: string;
  img: string;
  project: string;
  domain: string;
  content: string;
  requestType: "new_project" | "contribute";
}

// Sample data
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
    requestType: "contribute",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    img: "https://images.unsplash.com/photo-1508003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    project: "AI Chat Bot",
    domain: "Machine Learning",
    content:
      "I want to add a new AI-powered chatbot project for customer service automation.",
    requestType: "new_project",
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
    requestType: "contribute",
  },
  {
    id: 4,
    name: "Mike Chen",
    email: "mike.chen@example.com",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    project: "IoT Dashboard",
    domain: "IoT",
    content:
      "I want to create a new IoT dashboard project for smart home automation and monitoring.",
    requestType: "new_project",
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
    requestType: "contribute",
  },
  {
    id: 6,
    name: "David Kumar",
    email: "david.kumar@example.com",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    project: "Data Analytics Tool",
    domain: "Data Science",
    content:
      "I want to add a new data analytics tool project for business intelligence and reporting.",
    requestType: "new_project",
  },
];

export default function PendingRequests() {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [domainFilter, setDomainFilter] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");

  // Get unique domains and projects for filters
  const uniqueDomains = [...new Set(initialRequests.map((req) => req.domain))];
  const uniqueProjects = [...new Set(initialRequests.map((req) => req.project))];

  // Filter requests based on selected filters
  const filteredRequests = requests.filter((request) => {
    const domainMatch = domainFilter === "all" || request.domain === domainFilter;
    const projectMatch = projectFilter === "all" || request.project === projectFilter;
    return domainMatch && projectMatch;
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
      <p className="text-neutral-300 text-lg mb-8">
        Approve or reject member requests
      </p>

      {/* Filters */}
      <div className="flex gap-4 mb-8">
        <div className="flex flex-col">
          <label className="text-neutral-300 text-sm font-mclaren mb-2">
            Filter by Domain
          </label>
          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 text-neutral-200 px-4 py-2 rounded font-mclaren focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">All Domains</option>
            {uniqueDomains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-neutral-300 text-sm font-mclaren mb-2">
            Filter by Project
          </label>
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 text-neutral-200 px-4 py-2 rounded font-mclaren focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">All Projects</option>
            {uniqueProjects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="bg-neutral-900 border border-neutral-800 rounded-lg flex flex-col px-6 py-6 shadow-2xl hover:bg-neutral-750 transition-colors max-w-sm"
          >
            {/* Profile Photo */}
            <div className="flex justify-center mb-4">
              <img
                src={request.img}
                alt={request.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-neutral-600 shadow-lg"
              />
            </div>

            {/* Name */}
            <div className="text-neutral-100 font-mclaren text-[18px] font-bold mb-3 text-center">
              {request.name}
            </div>

            {/* Email */}
            <div className="text-neutral-200 text-[14px] font-mclaren mb-2">
              <span className="text-neutral-400">Email:</span>{" "}
              <span className="font-semibold text-blue-400 break-all">{request.email}</span>
            </div>

            {/* Domain */}
            <div className="text-neutral-200 text-[14px] font-mclaren mb-2">
              <span className="text-neutral-400">Domain:</span>{" "}
              <span className="font-semibold text-neutral-100">{request.domain}</span>
            </div>

            {/* Project */}
            <div className="text-neutral-200 text-[14px] font-mclaren mb-3">
              <span className="text-neutral-400">Project:</span>{" "}
              <span className="font-semibold text-neutral-100">{request.project}</span>
            </div>

            {/* Request Type Badge */}
            <div className="mb-3 flex justify-center">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  request.requestType === "new_project"
                    ? "bg-blue-900 text-blue-300 border border-blue-800"
                    : "bg-green-900 text-green-300 border border-green-800"
                }`}
              >
                {request.requestType === "new_project"
                  ? "NEW PROJECT"
                  : "CONTRIBUTE"}
              </span>
            </div>

            {/* Content */}
            <div className="text-neutral-200 text-[14px] font-mclaren mb-4 flex-grow">
              <span className="text-neutral-400">Content:</span>{" "}
              <span className="text-neutral-300 leading-relaxed">{request.content}</span>
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
          <p className="text-neutral-400 text-lg font-mclaren">
            No pending requests match your filters
          </p>
        </div>
      )}
    </div>
  );
}
