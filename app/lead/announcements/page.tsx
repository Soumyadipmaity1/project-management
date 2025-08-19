"use client";
import React, { useState } from "react";
import { FaEllipsisV, FaPlus } from "react-icons/fa";

// Sample data
const initialAnnouncements = [
  {
    id: 1,
    author: "Sanskar Singh",
    date: "August 05, 2025",
    time: "09:01 AM",
    content: (
      <>
        We are excited to announce that our society’s Annual Orientation Program will be held on August 12th at 4:00 PM in the Main Auditorium. All new and existing members are requested to join. We will cover introductions, a roadmap for upcoming projects, and fun team-building activities.
        <br />
        <span role="img" aria-label="memo">📝</span> Please confirm your attendance by filling out the forms shared in the group.
      </>
    ),
    pinned: true,
  },
  {
    id: 2,
    author: "Sanskar Singh",
    date: "August 05, 2025",
    time: "09:01 AM",
    content: (
      <>
        We are excited to announce that our society’s Annual Orientation Program will be held on August 12th at 4:00 PM in the Main Auditorium. All new and existing members are requested to join. We will cover introductions, a roadmap for upcoming projects, and fun team-building activities.
        <br />
        <span role="img" aria-label="memo">📝</span> Please confirm your attendance by filling out the forms shared in the group.
      </>
    ),
    pinned: false,
  },
  {
    id: 3,
    author: "Sanskar Singh",
    date: "August 05, 2025",
    time: "09:01 AM",
    content: (
      <>
        We are excited to announce that our society’s Annual Orientation Program will be held on August 12th at 4:00 PM in the Main Auditorium. All new and existing members are requested to join. We will cover introductions, a roadmap for upcoming projects, and fun team-building activities.
        <br />
        <span role="img" aria-label="memo">📝</span> Please confirm your attendance by filling out the forms shared in the group.
      </>
    ),
    pinned: false,
  },
];

export default function AnnouncementsPage() {
  const [announcements] = useState(initialAnnouncements);
  const pinned = announcements.filter(a => a.pinned);
  const unpinned = announcements.filter(a => !a.pinned);

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Heading and Create button */}
      <div className="flex items-center justify-between mt-5 mb-8">
        <h1 className="font-mclaren font-normal text-[40px] leading-[100%] tracking-[0] text-[#2A2A4A]">
          Announcements
        </h1>
        <button
          className="flex items-center gap-2 bg-[#2A2A4A] text-white px-7 py-3 rounded-md text-[15px] font-mclaren font-normal shadow hover:bg-[#21213b] transition"
        >
          <FaPlus /> Create announcement
        </button>
      </div>

      {/* Pinned Section */}
      {pinned.length > 0 && (
        <>
          <div className="text-[#2A2A4A] text-[18px] font-mclaren mb-2 font-bold uppercase tracking-[0] ">Pinned</div>
          <div className="flex flex-col gap-0 w-full mb-10">
            {pinned.map(ann => (
              <div
                key={ann.id}
                className="bg-white border border-gray-300 rounded-lg px-6 py-4 shadow-sm flex flex-col gap-2 relative mb-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 object-cover" />
                    <div>
                      <div className="text-[#2A2A4A] text-[20px] font-mclaren leading-[100%] tracking-[0] font-normal ">
                        {ann.author}
                      </div>
                      <div className="text-[#2A2A4AAD] text-[13px] font-mclaren leading-[100%] tracking- font-normal mt-1">
                        {ann.date}&nbsp;&nbsp;•&nbsp;&nbsp;{ann.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#E0E0E0] text-[#606060] px-4 py-1 rounded-md text-[15px] font-mclaren font-normal">Pinned</span>
                    <FaEllipsisV className="text-gray-400 cursor-pointer" />
                  </div>
                </div>
                <div className="text-[#2A2A4A] text-[18px] font-mclaren leading-[100%] tracking-[0] font-normal mb-3 mt-3">
                  {ann.content}
                </div>
                <button className="text-sm text-blue-500 font-semibold w-fit mt-1 px-0 outline-none bg-transparent hover:underline cursor-pointer">
                  Unpin
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Month/Year Heading */}
      <div className="text-[#606060] text-[20px] font-mclaren mb-3 leading-[100%] tracking-[0] font-normal">
        August 2025
      </div>

      {/* Unpinned announcements */}
      <div className="flex flex-col gap-0 w-full shadow-xl">
        {unpinned.map(ann => (
          <div
            key={ann.id}
            className="bg-white border border-gray-300 rounded-lg px-6 py-4 shadow-sm flex flex-col gap-2 relative mb-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 object-cover" />
                <div>
                  <div className="text-[#2A2A4A] text-[20px] font-mclaren leading-[100%] tracking-[0] font-normal ">
                    {ann.author}
                  </div>
                  <div className="text-[#2A2A4AAD] text-[13px] font-mclaren leading-[100%] tracking- font-normal mt-1">
                    {ann.date}&nbsp;&nbsp;•&nbsp;&nbsp;{ann.time}
                  </div>
                </div>
              </div>
              <FaEllipsisV className="text-gray-400 cursor-pointer" />
            </div>
            <div className="text-[#2A2A4A] text-[18px] font-mclaren leading-[100%] tracking- font-normal mb-3 mt-3">
              {ann.content}
            </div>
            <button className="text-sm text-blue-500 font-semibold w-fit mt-1 px-0 outline-none bg-transparent hover:underline cursor-pointer">
              Show More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
