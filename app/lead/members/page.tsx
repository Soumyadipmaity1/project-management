"use client";
import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaPlus, FaTrash } from "react-icons/fa";

const initialTeam = [
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
  const [team, setTeam] = useState(initialTeam);

  const handleAdd = () => {
    setTeam([
      ...team,
      {
        name: "New Member",
        img: "/path/to/newphoto.jpg",
        github: "#",
        linkedin: "#",
      },
    ]);
  };

  const handleRemove = (index) => {
    setTeam(team.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen py-8 px-6 ">
      {/* Heading and Add button container */}
      <div className="flex justify-between items-center mt-8 mb-3">
        <h2 className="font-mclaren font-normal text-[38px] text-[#2A2A4A] leading-[100%] tracking-[0]">
          Team Members
        </h2>
        <button
          onClick={handleAdd}
          title="Add"
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-[#2A2A4A] hover:text-blue-600 hover:border-blue-600 transition"
        >
          <FaPlus />
          Add
        </button>
      </div>

      <p className="text-[#606060] text-[18px] font-mclaren mb-8 leading-[100%] tracking-[0] font-normal">
        View and edit members in the project
      </p>

      <div className="flex flex-wrap gap-8">
        {team.map((member, idx) => (
          <div
            key={member.name}
            className="bg-white border border-gray-200 rounded-lg flex flex-col items-center px-8 py-6  w-[190px] shadow-xl relative"
          >
            <button
              onClick={() => handleRemove(idx)}
              title="Remove"
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <FaTrash />
            </button>

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
