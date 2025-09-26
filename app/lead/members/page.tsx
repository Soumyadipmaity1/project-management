"use client";
import MemberLayout from "@/app/member/layout";
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

  if (!project) return <div>Loading...</div>;

  return (
    <div className="min-h-screen py-8 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">
        Web devlopment
      </h2>

      <div className="flex flex-wrap gap-6">
        {team.map((member) => (
          <div
            key={member._id}
            className="bg-white border border-gray-200 rounded-lg flex flex-col items-center px-6 py-4 w-[240px] shadow-md"
          >
            {member.profilePhoto ? (
              <img
                src={member.profilePhoto}
                alt={member.name}
                className="w-20 h-20 rounded-full mb-3"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                <FaUser size={24} className="text-gray-500" />
              </div>
            )}

            <div className="text-lg font-semibold">{member.name}</div>
            {member.email && <div className="text-sm text-gray-600">{member.email}</div>}

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
        ))}
      </div>
    </div>
  );
}
