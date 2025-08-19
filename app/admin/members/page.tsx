"use client";
import React, { useRef } from "react";
import { FaGithub, FaLinkedin, FaChevronRight } from "react-icons/fa";

const memberGroups = [
  {
    domain: "Web Development",
    members: [
      {
        name: "Karan Vijay",
        img: "/path/to/photo1.jpg",
        domain: "Web Development",
        github: "#",
        linkedin: "#",
      },
      {
        name: "Narine Smith",
        img: "/path/to/photo2.jpg",
        domain: "App Development",
        github: "#",
        linkedin: "#",
      },
      {
        name: "Jason Hunt",
        img: "/path/to/photo3.jpg",
        domain: "Web Development",
        github: "#",
        linkedin: "#",
      },
      {
        name: "David Jones",
        img: "/path/to/photo4.jpg",
        domain: "Machine Learning",
        github: "#",
        linkedin: "#",
      },
      {
        name: "David Jones",
        img: "/path/to/photo4.jpg",
        domain: "Machine Learning",
        github: "#",
        linkedin: "#",
      },
    ],
  },
  {
    domain: "App Development",
    members: [
      {
        name: "Karan Vijay",
        img: "/path/to/photo1.jpg",
        domain: "App Development",
        github: "#",
        linkedin: "#",
      },
      {
        name: "Narine Smith",
        img: "/path/to/photo2.jpg",
        domain: "App Development",
        github: "#",
        linkedin: "#",
      },
      {
        name: "Jason Hunt",
        img: "/path/to/photo3.jpg",
        domain: "App Development",
        github: "#",
        linkedin: "#",
      },
      {
        name: "David Jones",
        img: "/path/to/photo4.jpg",
        domain: "Machine Learning",
        github: "#",
        linkedin: "#",
      },
    ],
  },
];

// ✅ Card component
function MemberCard({ member }: { member: (typeof memberGroups)[0]["members"][0] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg flex flex-col items-center px-6 py-4 w-[160px] min-w-[160px] shadow">
      <img
        src={member.img}
        alt={member.name}
        className="w-16 h-16 rounded-full object-cover mb-2 border-4 border-white shadow"
      />
      <div className="text-[#2A2A4A] font-mclaren text-[16px] font-normal text-center mb-1">
        {member.name}
      </div>
      <div className="text-xs text-gray-500 font-mclaren text-center leading-tight mb-2">
        Domain: {member.domain}
      </div>
      <div className="flex gap-2">
        <a
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          <FaGithub size={14} />
        </a>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0077b5] text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          <FaLinkedin size={14} />
        </a>
      </div>
    </div>
  );
}

// ✅ Main component
export default function AllMembers() {
  const sliders = useRef<(HTMLDivElement | null)[]>([]);

  const scrollSlider = (idx: number) => {
    sliders.current[idx]?.scrollBy({ left: 190, behavior: "smooth" });
  };

  return (
    <div className="py-4 px-6 rounded">
      <h2 className="font-mclaren font-normal text-[28px] text-[#2A2A4A] mt-4 mb-1 pt-10">
        All Members
      </h2>
      <p className="text-[#606060] text-[15px] font-mclaren mb-6 leading-[100%] tracking-[0] font-normal">
        Manage members across all domains
      </p>

      <div className="relative pl-10">
        <div className="absolute left-4 top-3 bottom-4 w-1 border-l-2 border-[#2A2A4A20]"></div>
        <div className="flex flex-col gap-7">
          {memberGroups.map((group, groupIdx) => (
            <div key={group.domain} className="relative mb-3">
              {/* Timeline dot */}
              <div className="absolute -left-6 top-2 w-6 h-6 bg-[#f6f8fd] flex items-center justify-center z-10">
                <div className="w-4 h-4 rounded-full border-2 border-[#2A2A4A] bg-white"></div>
              </div>

              {/* Domain title */}
              <div className="font-mclaren text-[18px] font-bold text-[#23213B] mb-2 pl-4">
                {group.domain}
              </div>

              {/* Members row */}
              <div className="flex items-center">
                <div
                  ref={(el) => (sliders.current[groupIdx] = el)}
                  className="flex gap-5 overflow-x-auto pb-4 pr-1 w-full scrollbar-hide"
                >
                  {group.members.map((member, memberIdx) => (
                    <MemberCard member={member} key={member.name + memberIdx} />
                  ))}
                </div>

                {/* Scroll button */}
                <button
                  className="ml-3 bg-[#232441] w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  onClick={() => scrollSlider(groupIdx)}
                  aria-label="Next"
                  type="button"
                >
                  <FaChevronRight className="text-white text-[22px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}