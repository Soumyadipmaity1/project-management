"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Trash, Edit, Pin } from "lucide-react";

const fetchWithCred = (input: RequestInfo, init?: RequestInit) => {
	return fetch(input, { credentials: 'include', ...(init || {}) });
};

export default function AnnouncementsPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [showAdminOnly, setShowAdminOnly] = useState(false);
  const [showMyAnnouncements, setShowMyAnnouncements] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProjectForAnnouncement, setSelectedProjectForAnnouncement] =
    useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [announcementsRes, projectsRes, userRes] = await Promise.all([
          fetchWithCred(`${process.env.NEXT_PUBLIC_API_URL}/api/announcement`, { cache: "no-store" }),
          fetchWithCred(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, { cache: "no-store" }),
          fetchWithCred(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, { cache: "no-store" }),
        ]);

        const announcementsData = await announcementsRes.json();
        const projectsData = await projectsRes.json();
        const userData = await userRes.json().catch(() => ({}));

        setGroups(Array.isArray(announcementsData) ? announcementsData : []);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setCurrentUserId(userData?.user?._id || userData?.user?.id || "");
      } catch (err) {
        console.error("fetchData error:", err);
        alert("Error loading data — check console.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300 bg-black">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="ml-4">Loading announcements...</p>
      </div>
    );

  const openModalForEdit = (ann: any) => {
    setEditingId(ann._id);
    setTitle(ann.title || "");
    setContent(ann.content || "");
    setPinned(!!ann.pinned);
    setIsAdmin(!!ann.isAdmin);
    setSelectedProjectForAnnouncement(ann.projectId || "");
    setIsModalOpen(true);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setContent("");
    setPinned(false);
    setIsAdmin(false);
    setSelectedProjectForAnnouncement("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload: any = {
        title,
        content,
        pinned,
        isAdmin,
        projectId: selectedProjectForAnnouncement || undefined,
      };

      const url = editingId
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/announcement/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/announcement`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetchWithCred(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const saved = await res.json();
      if (!res.ok) throw new Error(saved.message || "Error saving announcement");

      if (editingId) {
        setGroups((prev) =>
          prev.map((a) => (a._id === editingId ? saved : a))
        );
      } else {
        setGroups((prev) => [saved, ...prev]);
      }
      resetModal();
    } catch (err) {
      console.error("handleSubmit error:", err);
      alert("Failed to save announcement — check console.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      const res = await fetchWithCred(`${process.env.NEXT_PUBLIC_API_URL}/api/announcement/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      setGroups((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("handleDelete error:", err);
      alert("Delete failed — see console.");
    }
  };

  const handlePin = async (id: string) => {
    try {
      const res = await fetchWithCred(`${process.env.NEXT_PUBLIC_API_URL}/api/announcement/pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setGroups((prev) =>
        prev.map((a) => (a._id === id ? { ...a, pinned: true } : a))
      );
    } catch (err) {
      console.error("handlePin error:", err);
      alert("Failed to pin announcement");
    }
  };

  const handleUnpin = async (id: string) => {
    try {
      const res = await fetchWithCred(`${process.env.NEXT_PUBLIC_API_URL}/api/announcement/unpin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setGroups((prev) =>
        prev.map((a) => (a._id === id ? { ...a, pinned: false } : a))
      );
    } catch (err) {
      console.error("handleUnpin error:", err);
      alert("Failed to unpin announcement");
    }
  };

  const filteredAnnouncements = groups.filter((ann) => {
    if (showAdminOnly && !ann.isAdmin) return false;
    if (selectedProject !== "all" && ann.projectId !== selectedProject)
      return false;
    if (showMyAnnouncements && ann.createdBy !== currentUserId) return false;
    return true;
  });

  const pinnedAnnouncements = filteredAnnouncements.filter((a) => a.pinned);
  const otherAnnouncements = filteredAnnouncements.filter((a) => !a.pinned);

  return (
    <div className="min-h-screen py-6 px-4 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between mt-5 mb-6 gap-4">
          <h1 className="text-4xl font-bold text-white">Announcements</h1>

          <div className="flex flex-wrap gap-3 items-center">
            {/* <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="bg-white text-black border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-400"
            >
              <option value="all">All Projects</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </select> */}

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-xl shadow-sm"
            >
              <FaPlus /> Create
            </button>
          </div>
        </div>

        {pinnedAnnouncements.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-200">
              📌 Pinned
            </h2>
            <div className="space-y-4 mb-8">
              {pinnedAnnouncements.map((ann) => (
                <AnnouncementCard
                  key={ann._id}
                  ann={ann}
                  onEdit={openModalForEdit}
                  onDelete={handleDelete}
                  onUnpin={handleUnpin}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          {/* <h2 className="text-xl font-semibold mb-3 text-gray-200">
            Other Announcements
          </h2> */}
          {otherAnnouncements.length > 0 ? (
            <div className="space-y-4">
              {otherAnnouncements.map((ann) => (
                <AnnouncementCard
                  key={ann._id}
                  ann={ann}
                  onEdit={openModalForEdit}
                  onDelete={handleDelete}
                  onPin={handlePin}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8">
              No announcements yet.
            </p>
          )}
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white text-black p-6 rounded-xl w-full max-w-lg relative shadow-xl">
            <button
              onClick={resetModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <FaTimes />
            </button>
            <h3 className="text-2xl font-bold mb-4">
              {editingId ? "Edit Announcement" : "Create Announcement"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-3 rounded-xl border border-gray-300 bg-white text-black focus:ring-2 focus:ring-gray-400"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={5}
                className="w-full p-3 rounded-xl border border-gray-300 bg-white text-black focus:ring-2 focus:ring-gray-400"
                placeholder="Description"
              />
              <div className="flex items-center gap-3">
                <input
                  id="pinned"
                  type="checkbox"
                  checked={pinned}
                  onChange={(e) => setPinned(e.target.checked)}
                  className="accent-gray-600"
                />
                <label htmlFor="pinned" className="text-sm text-black">
                  Pin this announcement
                </label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700"
                >
                  {submitting
                    ? "Saving..."
                    : editingId
                    ? "Update"
                    : "Create"}
                </button>
                <button
                  type="button"
                  onClick={resetModal}
                  className="px-4 py-2 rounded-xl border border-gray-400 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const AnnouncementCard = ({ ann, onEdit, onDelete, onPin, onUnpin }: any) => (
  <div className="p-5 bg-gray-900 rounded-xl border border-gray-700 shadow-sm hover:shadow-md transition duration-200">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        {ann.senderProfilePic ? (
          <img
            src={ann.senderProfilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-600"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
            {ann.senderName ? ann.senderName.charAt(0).toUpperCase() : "U"}
          </div>
        )}

        <div>
          <h3 className="text-base font-semibold text-gray-100">
            {ann.senderName || "Unknown"}
          </h3>
          <p className="text-xs text-gray-400">
            {new Date(ann.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex gap-2 text-gray-400">
        <button
          onClick={() => onEdit(ann)}
          title="Edit"
          className="hover:text-gray-100 transition"
        >
          <Edit size={16} />
        </button>

        {onPin && (
          <button
            onClick={() => onPin(ann._id)}
            title="Pin"
            className="hover:text-emerald-400 transition"
          >
            <Pin size={16} />
          </button>
        )}

        {onUnpin && (
          <button
            onClick={() => onUnpin(ann._id)}
            title="Unpin"
            className="text-yellow-400 hover:text-yellow-300 transition"
          >
            <Pin size={16} />
          </button>
        )}

        <button
          onClick={() => onDelete(ann._id)}
          title="Delete"
          className="hover:text-red-500 transition"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>

    <div className="mt-3">
      <h2 className="text-lg font-semibold text-gray-100">{ann.title}</h2>
      <p className="text-gray-300 mt-2 leading-relaxed">{ann.content}</p>
    </div>
  </div>
);
