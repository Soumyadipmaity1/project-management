"use client";
import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Trash, Edit, Pin } from "lucide-react";

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
          fetch("/api/announcement", { cache: "no-store" }),
          fetch("/api/projects", { cache: "no-store" }),
          fetch("/api/auth/session", { cache: "no-store" }),
        ]);

        const announcementsData = await announcementsRes.json();
        const projectsData = await projectsRes.json();
        const userData = await userRes.json().catch(() => ({}));

        setGroups(Array.isArray(announcementsData) ? announcementsData : []);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setCurrentUserId(
          userData?.user?._id || userData?.user?.id || ""
        );
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
      <div className="min-h-screen flex items-center justify-center text-slate-300">
        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
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
        ? `/api/announcement/${editingId}`
        : "/api/announcement";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
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
      const res = await fetch(`/api/announcement/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      setGroups((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("handleDelete error:", err);
      alert("Delete failed — see console.");
    }
  };

  // ---------- Separate PIN & UNPIN ------------
  const handlePin = async (id: string) => {
    try {
      const res = await fetch("/api/announcement/pin", {
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
      const res = await fetch("/api/announcement/unpin", {
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
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mt-5 mb-6 gap-4">
          <h1 className="font-mclaren text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent">
            Announcements
          </h1>

          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2 rounded-xl"
            >
              <FaPlus /> Create
            </button>
          </div>
        </div>

        {/* ---------------- PINNED ---------------- */}
        {pinnedAnnouncements.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3 text-yellow-400">
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

        {/* ---------------- OTHERS ---------------- */}
        <div>
          {/* <h2 className="text-xl font-semibold mb-3 text-emerald-300">
            Announcements
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
            <p className="text-center text-slate-400 mt-8">
              No announcements yet.
            </p>
          )}
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 p-6 rounded-xl w-full max-w-lg relative">
            <button onClick={resetModal} className="absolute top-4 right-4">
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
                className="w-full p-3 rounded-xl bg-slate-800/60 border"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={5}
                className="w-full p-3 rounded-xl bg-slate-800/60 border"
                placeholder="Description"
              />
              <div className="flex items-center gap-3">
                <input
                  id="pinned"
                  type="checkbox"
                  checked={pinned}
                  onChange={(e) => setPinned(e.target.checked)}
                />
                <label htmlFor="pinned">Pin this announcement</label>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-emerald-600 px-4 py-2 rounded-xl text-white"
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
                  className="px-4 py-2 rounded-xl border"
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

// ---------------- Announcement Card ----------------
const AnnouncementCard = ({
  ann,
  onEdit,
  onDelete,
  onPin,
  onUnpin,
}: any) => (
  <div className="p-5 bg-slate-800/70 rounded-xl border border-slate-700/40">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        {ann.senderProfilePic ? (
          <img
            src={ann.senderProfilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
            {ann.senderName ? ann.senderName.charAt(0).toUpperCase() : "U"}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold">{ann.senderName || "Unknown"}</h3>
          <p className="text-xs text-gray-400">
            {new Date(ann.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => onEdit(ann)} title="Edit">
          <Edit size={16} />
        </button>
        {onPin && (
          <button onClick={() => onPin(ann._id)} title="Pin">
            <Pin size={16} />
          </button>
        )}
        {onUnpin && (
          <button onClick={() => onUnpin(ann._id)} title="Unpin">
            <Pin size={16} className="text-yellow-400" />
          </button>
        )}
        <button onClick={() => onDelete(ann._id)} title="Delete">
          <Trash size={16} />
        </button>
      </div>
    </div>

    <div className="mt-3">
      <h2 className="text-xl font-bold">{ann.title}</h2>
      <p className="text-slate-300 mt-2">{ann.content}</p>
    </div>
  </div>
);
