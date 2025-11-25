"use client";
import React, { useEffect, useState } from "react";

interface Announcement {
  _id: string; 
  senderName: string;
  senderProfilePic?: string;
  content: string;
  pinned: boolean;
  createdAt: string;
  type?: "project" | "other";
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"project" | "other">("project");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(`/api/announcement`, { cache: "no-store" }); 
        if (!res.ok) throw new Error("Failed to fetch announcements");
        const data = await res.json();
        console.log("Fetched announcements:", data);
        setAnnouncements(data);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-lg text-gray-300">Loading announcements...</p>
        </div>
      </div>
    );
  }


// const projectAnnouncements = announcements; // show all under "Project"
// const otherAnnouncements = []; // optional, keep empty for now

const projectAnnouncements: Announcement[] = [];
const otherAnnouncements: Announcement[] =  announcements;

  const renderAnnouncement = (ann: Announcement) => {
    const dateObj = new Date(ann.createdAt);
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
      <div
        key={ann._id}
        className={`bg-gray-900 border rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-gray-500 relative ${
          ann.pinned ? "border-indigo-500 bg-gray-900/80" : "border-gray-700"
        }`}
      >
        {ann.pinned && (
          <div className="absolute top-4 right-4 flex items-center text-indigo-400">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 5a2 2 0 012-2h6a2 2 0 012 2v6.59l1.3 1.3a1 1 0 01-1.4 1.42L14 13.41V16a2 2 0 01-2 2H8a2 2 0 01-2-2v-2.59l-.9.9a1 1 0 01-1.4-1.42L5 11.59V5z" />
            </svg>
            <span className="text-sm font-medium">Pinned</span>
          </div>
        )}

        <div className="flex items-start space-x-4">
          <img
            src={ann.senderProfilePic || "/default-avatar.png"}
            alt={ann.senderName}
            className="w-12 h-12 rounded-full object-cover bg-gray-700 flex-shrink-0"
          />
          <div className="flex-1">
            <div className="flex flex-col space-y-1">
              <h3 className="text-gray-100 text-lg font-semibold">{ann.senderName}</h3>
              <p className="text-gray-400 text-sm">
                {date} • {time}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-gray-200 text-base leading-relaxed whitespace-pre-wrap">
                {ann.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const displayedAnnouncements =
    activeTab === "project" ? projectAnnouncements : otherAnnouncements;

  const pinnedInTab = displayedAnnouncements.filter((a) => a.pinned);
  const unpinnedInTab = displayedAnnouncements.filter((a) => !a.pinned);

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto">
        <h1 className="text-4xl font-bold text-gray-100 mb-8">Announcements</h1>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-700">
          <div className="flex space-x-8">
            {/* <button
              onClick={() => setActiveTab("project")}
              className={`pb-4 px-2 font-medium transition-colors relative ${
                activeTab === "project"
                  ? "text-indigo-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Project Announcements
              {projectAnnouncements.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-indigo-500/20 text-indigo-400">
                  {projectAnnouncements.length}
                </span>
              )}
              {activeTab === "project" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400"></div>
              )}
            </button> */}
            <button
              onClick={() => setActiveTab("other")}
              className={`pb-4 px-2 font-medium transition-colors relative ${
                activeTab === "other"
                  ? "text-indigo-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              Other Announcements
              {otherAnnouncements.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-700 text-gray-300">
                  {otherAnnouncements.length}
                </span>
              )}
              {activeTab === "other" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400"></div>
              )}
            </button>
          </div>
        </div>

        {/* Announcements List */}
        {displayedAnnouncements.length > 0 ? (
          <>
            {pinnedInTab.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <svg
                    className="w-6 h-6 text-indigo-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 5a2 2 0 012-2h6a2 2 0 012 2v6.59l1.3 1.3a1 1 0 01-1.4 1.42L14 13.41V16a2 2 0 01-2 2H8a2 2 0 01-2-2v-2.59l-.9.9a1 1 0 01-1.4-1.42L5 11.59V5z" />
                  </svg>
                  <h2 className="text-2xl font-semibold text-gray-100">Pinned</h2>
                </div>
                <div className="space-y-6">{pinnedInTab.map(renderAnnouncement)}</div>
              </div>
            )}

            {unpinnedInTab.length > 0 && (
              <div>
                {pinnedInTab.length > 0 && (
                  <h2 className="text-2xl font-semibold text-gray-100 mb-6">Recent</h2>
                )}
                <div className="space-y-6">{unpinnedInTab.map(renderAnnouncement)}</div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              No {activeTab === "project" ? "project" : "other"} announcements
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
