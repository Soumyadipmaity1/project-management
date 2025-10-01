"use client"
import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaUsers, FaChevronDown } from "react-icons/fa";

// 1. Define the Project type
type Project = {
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

const projects: Project[] = [
  {
    title: "E-commerce Platform",
    domain: "Web",
    description:
      "A full-featured e-commerce platform with product management, cart, and checkout.",
    teamLead: "John Doe",
    assistantLead: "Jane Smith",
    members: 3,
    github: "#",
    live: "#",
    status: "In Progress",
    statusColor: "bg-neutral-800 text-white",
    enrolled: true,
  },
    {
    title: "E-commerce Platform 2",
    domain: "Mobile",
    description:
      "A full-featured e-commerce platform with product management, cart, and checkout.",
    teamLead: "John Doe",
    assistantLead: "Jane Smith",
    members: 3,
    github: "#",
    live: "#",
    status: "In Progress",
    statusColor: "bg-neutral-800 text-white",
    enrolled: true,
  },
    {
    title: "E-commerce Platform 3",
    domain: "AI/ML",
    description:
      "A full-featured e-commerce platform with product management, cart, and checkout.",
    teamLead: "John Doe",
    assistantLead: "Jane Smith",
    members: 3,
    github: "#",
    live: "#",
    status: "In Progress",
    statusColor: "bg-neutral-800 text-white",
    enrolled: true,
  },
];

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
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 flex flex-col gap-6 min-w-[380px] max-w-[420px] shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-['Maven_Pro',sans-serif] font-bold text-xl text-white mb-1">
            {project.title}
          </h3>
          <span className="text-neutral-400 font-['Maven_Pro',sans-serif] font-medium text-sm uppercase tracking-wide">
            {project.domain}
          </span>
        </div>
        <StatusBadge status={project.status} color={project.statusColor} />
      </div>

      {/* Description Section */}
      <div className="border-b border-neutral-700 pb-4">
        <p className="text-neutral-300 font-['Maven_Pro',sans-serif] text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Team Information Section */}
      <div className="space-y-3">
        <h4 className="text-white font-['Maven_Pro',sans-serif] font-semibold text-sm uppercase tracking-wide">
          Team
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Lead:</span>
            <span className="text-white font-medium">{project.teamLead}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Assistant:</span>
            <span className="text-white font-medium">{project.assistantLead}</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-neutral-400">Members:</span>
            <div className="flex items-center gap-1 text-neutral-300">
              <FaUsers className="text-xs" />
              <span className="font-medium">{project.members}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button className="w-full bg-white hover:bg-neutral-200 text-black font-medium px-4 py-3 rounded-lg text-sm transition-colors duration-200">
          Open Project
        </button>
      </div>
    </div>
  );
}

// Main Component with domain dropdown filter
export default function LeadProjects() {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get unique domains from projects
  const domains = ["All", ...Array.from(new Set(projects.map(project => project.domain)))];

  // Filter projects based on selected domain
  const filteredProjects = selectedDomain === "All" 
    ? projects 
    : projects.filter(project => project.domain === selectedDomain);

  return (
    <div className="px-4 py-6 min-h-screen">
      <h2 className="font-mclaren font-normal text-[38px] leading-[100%] tracking-[0] mb-4 text-white">
        Projects
      </h2>
      <p className="text-neutral-400 font-mclaren font-normal text-[20px] leading-[100%] tracking-[0] mb-10">
        View and manage projects across your domains
      </p>

      {/* Domain Filter Dropdown */}
      <div className="relative mb-6 w-fit">
        <button
          className="flex items-center gap-2 bg-neutral-800 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-neutral-700 transition-colors duration-200"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Domain: {selectedDomain}
          <FaChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-10 min-w-[200px]">
            {domains.map((domain) => (
              <button
                key={domain}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-700 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                  selectedDomain === domain ? 'bg-neutral-700 text-white' : 'text-neutral-300'
                }`}
                onClick={() => {
                  setSelectedDomain(domain);
                  setIsDropdownOpen(false);
                }}
              >
                {domain}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Project Count */}
      <p className="text-neutral-400 text-sm mb-4">
        Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
      </p>

      {/* Projects Grid */}
      <div className="flex flex-wrap gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
