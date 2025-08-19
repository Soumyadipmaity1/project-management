"use client";
import React from "react";
import { FaEllipsisV } from "react-icons/fa";

// Sample data
const announcements = [
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
  },
];

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen  py-8 px-4">
      <h1 className="font-mclaren font-normal text-[40px] leading-[100%] tracking-[0] text-[#2A2A4A] mb-8 mt-5">Announcements</h1>
      <div className="text-[#606060] text-[20px] font-mclaren mb-3  leading-[100%] tracking-[0] font-normal ">August 2025</div>
      <div className="flex flex-col gap-0 w-full shadow-xl">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="bg-white border border-gray-300 rounded-lg px-6 py-4 shadow-sm flex flex-col gap-2 relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 object-cover" />
                <div>
                  <div className="text-[#2A2A4A] text-[20px] font-mclaren   leading-[100%] tracking-[0] font-normal ">{ann.author}</div>
                  <div className="text-[#2A2A4AAD] text-[13px] font-mclaren   leading-[100%] tracking-[0] font-normal mt-1">
                    {ann.date}&nbsp;&nbsp;•&nbsp;&nbsp;{ann.time}
                  </div>
                </div>
              </div>
              <FaEllipsisV className="text-gray-400 cursor-pointer" />
            </div>
            <div className="text-[#2A2A4A] text-[18px] font-mclaren   leading-[100%] tracking-[0] font-normal line-height-[100%] mb-3 mt-3">
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
