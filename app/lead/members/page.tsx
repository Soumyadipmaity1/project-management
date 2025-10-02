"use client";
import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaUser } from "react-icons/fa";

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

  useEffect(() => {
    const sampleProject: Project = {
      _id: "proj123",
      title: "Web Development Project",
      domain: "Web Development",
      leadId: "lead001",
    };
    setProject(sampleProject);

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

    const filteredTeam = sampleTeam.filter(
      (member) => member.domain === sampleProject.domain
    );

    setTeam(filteredTeam);
  }, []);

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center text-emerald-400">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="font-mclaren text-[36px] mb-3 font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent">
            Members
          </h2>
          <p className="text-slate-400 text-lg font-medium font-mclaren">
            View and manage team members in your project
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {team.map((member) => (
          <div
            key={member._id}
            className="bg-gray-800 border border-gray-700 rounded-lg flex flex-col items-center px-6 py-4 w-[240px] shadow-xl hover:shadow-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300"
          >
            {member.profilePhoto ? (
              <img
                src={member.profilePhoto}
                alt={member.name}
                className="w-20 h-20 rounded-full mb-3 ring-2 ring-emerald-500/30"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mb-3 ring-2 ring-emerald-500/30">
                <FaUser size={24} className="text-emerald-400" />
              </div>
            )}

            <div className="text-lg font-semibold text-white">{member.name}</div>
            {member.email && (
              <div className="text-sm text-gray-400 mb-1">{member.email}</div>
            )}
            <div className="text-sm text-emerald-400 font-medium">Project Management Tool</div>
            <div className="text-sm text-gray-300">Web development</div>

            <div className="flex gap-3 mt-2">
              {member.githubId && (
                <a
                  href={`https://github.com/${member.githubId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-emerald-600 hover:scale-110 transition-all duration-200"
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
                  className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-emerald-600 hover:scale-110 transition-all duration-200"
                  title="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
