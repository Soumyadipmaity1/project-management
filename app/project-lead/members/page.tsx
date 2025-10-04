"use client";
import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaUser, FaSearch } from "react-icons/fa";

interface TeamMember {
  _id: string;
  name: string;
  profilePhoto?: string;
  githubId?: string;
  linkedinId?: string;
  domain: string;
  email?: string;
}

interface Project {
  _id: string;
  title: string;
  domain: string;
  leadId: string;
}

export default function TeamMembersSample() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const sampleProjects: Project[] = [
      {
        _id: "proj123",
        title: "Web Development Project",
        domain: "Web Development",
        leadId: "lead001",
      },
      {
        _id: "proj124",
        title: "Mobile App Development",
        domain: "Mobile Development",
        leadId: "lead001",
      },
      {
        _id: "proj125",
        title: "Data Analytics Platform",
        domain: "Data Science",
        leadId: "lead001",
      },
    ];
    setAllProjects(sampleProjects);
    setProject(sampleProjects[0]);

    const sampleTeam: TeamMember[] = [
      {
        _id: "m1",
        name: "Alice",
        domain: "Web Development",
        githubId: "aliceweb",
        linkedinId: "aliceweb",
        email: "alice@example.com",
      },
      {
        _id: "m2",
        name: "Bob",
        domain: "Mobile Development",
        githubId: "bobmobile",
        linkedinId: "bobmobile",
        email: "bob@example.com",
      },
      {
        _id: "m3",
        name: "Charlie",
        domain: "Web Development",
        githubId: "charlieweb",
        linkedinId: "charlieweb",
        email: "charlie@example.com",
      },
      {
        _id: "m4",
        name: "David",
        domain: "Data Science",
        githubId: "davidsci",
        linkedinId: "davidsci",
        email: "david@example.com",
      },
    ];

    setAllMembers(sampleTeam);
    setTeam(sampleTeam);
  }, []);

  useEffect(() => {
    let filteredTeam = [...allMembers];

    // Filter by project domain
    if (selectedProjectId !== "all") {
      const selectedProject = allProjects.find(
        (p) => p._id === selectedProjectId
      );
      if (selectedProject) {
        filteredTeam = filteredTeam.filter(
          (member) => member.domain === selectedProject.domain
        );
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredTeam = filteredTeam.filter(
        (member) =>
          member.name.toLowerCase().includes(query) ||
          member.email?.toLowerCase().includes(query)
      );
    }

    setTeam(filteredTeam);
  }, [selectedProjectId, searchQuery, allMembers, allProjects]);

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center text-fuchsia-400">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="font-mclaren text-[36px] mb-3 font-bold bg-gradient-to-r from-white via-fuchsia-200 to-teal-300 bg-clip-text text-transparent">
            Members
          </h2>
          <p className="text-slate-400 text-lg font-medium font-mclaren">
            View and manage team members in your project
          </p>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Project Filter Dropdown */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Filter by Project
          </label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
          >
            <option value="all">All Projects</option>
            {allProjects.map((proj) => (
              <option key={proj._id} value={proj._id}>
                {proj.title}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Search Members
          </label>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Members Count */}
      <div className="mb-4 text-gray-400 text-sm">
        Showing {team.length} member{team.length !== 1 ? "s" : ""}
      </div>

      <div className="flex flex-wrap gap-6">
        {team.length === 0 ? (
          <div className="w-full text-center py-12 text-gray-400">
            No members found matching your criteria
          </div>
        ) : (
          team.map((member) => (
            <div
              key={member._id}
              className="bg-gray-900 border border-gray-800 rounded-lg flex flex-col items-center px-6 py-4 w-[240px] shadow-xl hover:shadow-fuchsia-500/20 hover:border-fuchsia-500/50 transition-all duration-300"
            >
              {member.profilePhoto ? (
                <img
                  src={member.profilePhoto}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mb-3 ring-2 ring-fuchsia-500/30"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-3 ring-2 ring-fuchsia-500/30">
                  <FaUser size={24} className="text-fuchsia-400" />
                </div>
              )}

              <div className="text-lg font-semibold text-white">
                {member.name}
              </div>
              {member.email && (
                <div className="text-sm text-gray-400 mb-1">{member.email}</div>
              )}
              <div className="text-sm text-fuchsia-400 font-medium">
                Project Management Tool
              </div>
              <div className="text-sm text-gray-300">Web development</div>

              <div className="flex gap-3 mt-2">
                {member.githubId && (
                  <a
                    href={`https://github.com/${member.githubId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-fuchsia-600 hover:scale-110 transition-all duration-200"
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
                    className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-fuchsia-600 hover:scale-110 transition-all duration-200"
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
