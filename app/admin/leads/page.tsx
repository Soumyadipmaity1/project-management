"use client";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Sample team members data
const team = [
  {
    name: "Eshita",
    img: "/path/to/photo1.jpg",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Eshita",
    img: "/path/to/photo2.jpg",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Eshita",
    img: "/path/to/photo3.jpg",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Eshita",
    img: "/path/to/photo4.jpg",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Eshita",
    img: "/path/to/photo5.jpg",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Eshita",
    img: "/path/to/photo6.jpg",
    github: "#",
    linkedin: "#",
  },
];

export default function TeamMembers() {
  return (
    <div className="min-h-screen py-8 px-6 ">
      <h2 className="font-mclaren font-normal text-[38px] text-[#2A2A4A] mb-3 leading-[100%] tracking-[0] mt-10">
        All Leads
      </h2>
      <p className="text-[#606060] text-[18px] font-mclaren mb-8 leading-[100%] tracking-[0] font-normal">
        Manage Leads Across All Domains
      </p>
      <div className="flex flex-wrap gap-8">
        {team.map((member) => (
          <div
            key={member.name}
            className="bg-white border border-gray-200 rounded-lg flex flex-col items-center px-8 py-6  w-[240px] shadow-xl"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-white shadow"
            />
            <div className="text-[#2A2A4A] font-mclaren text-[17px] font-normal text-center mb-2">
              {member.name}
            </div>
            <div className="flex gap-3">
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0077b5] text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
