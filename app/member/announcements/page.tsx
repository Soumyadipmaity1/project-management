"use client";
import React, { useEffect, useState } from "react";

interface Announcement {
  _id: string;
  senderName: string;
  senderProfilePic?: string;
  content: string;
  pinned: boolean;
  createdAt: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("/api/announcement", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch announcements");
        const data = await res.json();
        setAnnouncements(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) return <p className="p-8">Loading announcements...</p>;

  const pinnedAnnouncements = announcements.filter((a) => a.pinned);
  const otherAnnouncements = announcements.filter((a) => !a.pinned);

  const renderAnnouncement = (ann: Announcement) => {
    const dateObj = new Date(ann.createdAt);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
      <div
        key={ann._id}
        className="bg-white border border-gray-300 rounded-lg px-6 py-4 shadow-sm flex flex-col gap-2 relative"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={ann.senderProfilePic || "/default-avatar.png"}
              alt={ann.senderName}
              className="w-10 h-10 rounded-full object-cover bg-gray-300"
            />
            <div>
              <div className="text-[#2A2A4A] text-[20px] font-mclaren leading-[100%]">
                {ann.senderName}
              </div>
              <div className="text-[#2A2A4AAD] text-[13px] font-mclaren leading-[100%] mt-1">
                {date}&nbsp;&nbsp;•&nbsp;&nbsp;{time}
              </div>
            </div>
          </div>
        </div>
        <div className="text-[#2A2A4A] text-[18px] font-mclaren leading-[100%] line-clamp-3 mb-3 mt-3">
          {ann.content}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <h1 className="font-mclaren font-normal text-[40px] leading-[100%] text-[#2A2A4A] mb-8 mt-5">
        Announcements
      </h1>

      {pinnedAnnouncements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-[#2A2A4A]">📌 Pinned Announcements</h2>
          <div className="flex flex-col gap-4">
            {pinnedAnnouncements.map(renderAnnouncement)}
          </div>
        </div>
      )}

      {otherAnnouncements.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-3 text-[#2A2A4A]">Other Announcements</h2>
          <div className="flex flex-col gap-4">
            {otherAnnouncements.map(renderAnnouncement)}
          </div>
        </div>
      )}
    </div>
  );
}
