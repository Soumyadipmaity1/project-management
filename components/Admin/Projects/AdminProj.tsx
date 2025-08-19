"use client"
import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaUsers } from "react-icons/fa";

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
    statusColor: "bg-[#14A1FF] text-white",
    enrolled: true,
  },
    {
    title: "E-commerce Platform 2",
    domain: "Web",
    description:
      "A full-featured e-commerce platform with product management, cart, and checkout.",
    teamLead: "John Doe",
    assistantLead: "Jane Smith",
    members: 3,
    github: "#",
    live: "#",
    status: "In Progress",
    statusColor: "bg-[#14A1FF] text-white",
    enrolled: true,
  },
    {
    title: "E-commerce Platform 3",
    domain: "Web",
    description:
      "A full-featured e-commerce platform with product management, cart, and checkout.",
    teamLead: "John Doe",
    assistantLead: "Jane Smith",
    members: 3,
    github: "#",
    live: "#",
    status: "In Progress",
    statusColor: "bg-[#14A1FF] text-white",
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
    <div className="bg-[#D8E6FF] border border-gray-300 rounded-lg p-8 flex flex-col gap-4 min-w-[380px] max-w-[420px] shadow-xl ">
      <div className="flex items-center justify-between">
        <h3 className="font-['Maven_Pro',sans-serif] font-bold text-[24px] leading-[100%] tracking-[0] text-[#000000] mb-2 ">{project.title}</h3>
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
      {/* <div className="flex gap-2 mt-2">
        <a
          href={project.github}
          className="btn btn-sm bg-[#23272f] text-white px-3 py-1 rounded flex items-center gap-1"
        >
          <FaGithub /> GitHub
        </a>
        <a
          href={project.live}
          className="btn btn-sm bg-[#23272f] text-white px-3 py-1 rounded flex items-center gap-1"
        >
          <FaExternalLinkAlt /> Live
        </a>
      </div> */}
      <div className="flex gap-2 mt-2">
        {/* {project.enrolled ? (
          <span className="bg-green-800 text-green-200 px-2 py-1 rounded text-xs">
            Enrolled
          </span>
        ) : (
          <button className="bg-gray-700 text-white px-2 py-1 rounded text-xs">
            Enroll
          </button>
        )} */}
        <button className="bg-[#2A2A4A] text-white text-bold px-3 py-2 rounded text-xs cursor-pointer">
          Open Project
        </button>
        {/* <button className="bg-red-700 text-white px-2 py-1 rounded text-xs">
          Delete
        </button> */}
      </div>
    </div>
  );
}

// Main Component with toggle tabs visual only (no logic disturbed)
export default function LeadProjects() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="ml-15 py-8">
      <h2 className="font-mclaren font-normal text-[38px] leading-[100%] tracking-[0] mb-4 pt-10 text-[#2A2A4A] ">
        Projects
      </h2>
      <p className="text-[#2A2A4AB0] font-mclaren font-normal text-[20px] leading-[100%] tracking-[0] mb-10">
        View and manage projects across your domains
      </p>

      {/* Tabs with minimal visual toggle */}
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
      <div className="flex flex-wrap gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
