"use client";
import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { LucideTrash, Edit as LucideEdit, Pin, Filter } from "lucide-react";

export default function AnnouncementsPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [showAdminOnly, setShowAdminOnly] = useState(false);
  const [showMyAnnouncements, setShowMyAnnouncements] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProjectForAnnouncement, setSelectedProjectForAnnouncement] = useState<string>("");
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
        const userData = await userRes.json();
        setGroups(announcementsData);
        setProjects(projectsData);
        setCurrentUserId(userData?.user?._id || userData?.user?.id || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-300 font-mclaren text-lg">
                Loading announcements...
              </p>
            </div>
          </div>
        </div>
      </div>
    );

  const openModalForEdit = (ann: any) => {
    setEditingId(ann._id);
    setSenderName(ann.senderName);
    setContent(ann.content);
    setPinned(ann.pinned);
    setIsAdmin(ann.isAdmin || false);
    setSelectedProjectForAnnouncement(ann.projectId || "");
    setFile(null);
    setIsModalOpen(true);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setSenderName("");
    setContent("");
    setPinned(false);
    setIsAdmin(false);
    setSelectedProjectForAnnouncement("");
    setFile(null);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let uploadedUrl = "";
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/uploads", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("File upload failed");
        const uploadData = await uploadRes.json();
        uploadedUrl = uploadData.url;
      }

      const payload = {
        senderName,
        senderProfilePic: uploadedUrl || undefined,
        content,
        pinned,
        isAdmin,
        projectId: selectedProjectForAnnouncement || undefined,
        createdBy: currentUserId,
      };

      let res;
      if (editingId) {
        res = await fetch(`/api/announcement/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/announcement", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Failed to save announcement");
      const savedAnn = await res.json();

      setGroups((prev) => {
        if (editingId)
          return prev.map((a) => (a._id === editingId ? savedAnn : a));
        return [savedAnn, ...prev];
      });

      resetModal();
    } catch (err) {
      console.error(err);
      alert("Failed to save announcement");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      const res = await fetch(`/api/announcement/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete announcement");
      setGroups((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleTogglePin = async (id: string, isPinned: boolean) => {
    try {
      const pinnedCount = groups.filter((g) => g.pinned).length;
      if (!isPinned && pinnedCount >= 3) {
        alert("You can only pin up to 3 announcements.");
        return;
      }

      const res = await fetch("/api/announcement/pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pinned: !isPinned }),
      });
      if (!res.ok) throw new Error("Failed to update pin status");

      const updated = await res.json();
      setGroups((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, pinned: updated.pinned } : a
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update pin status");
    }
  };

  // Filter announcements
  const filteredAnnouncements = groups.filter((ann) => {
    if (showAdminOnly && !ann.isAdmin) return false;
    if (selectedProject !== "all" && ann.projectId !== selectedProject) return false;
    if (showMyAnnouncements && ann.createdBy !== currentUserId) return false;
    return true;
  });

  const pinnedAnnouncements = filteredAnnouncements.filter((a) => a.pinned);
  const otherAnnouncements = filteredAnnouncements.filter((a) => !a.pinned);

  return (
    <div className="min-h-screen  py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mt-5 mb-8">
          <div>
            <h1 className="font-mclaren text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent mb-2">
              Announcements
            </h1>
            <p className="text-slate-400 font-mclaren">
              Manage team announcements and updates
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 font-mclaren font-semibold border border-emerald-500/20 hover:border-emerald-400/30"
          >
            <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
            Create announcement
          </button>
        </div>

        {/* Filter Section */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="text-emerald-400" size={20} />
            <h3 className="font-mclaren font-semibold text-white text-lg">Filters</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-mclaren text-slate-400 mb-2">
                Filter by Project
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white font-mclaren focus:border-emerald-400/50 focus:bg-slate-800/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="all">All Projects</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-3">
              <label className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800/30 border border-slate-700/30 cursor-pointer hover:bg-slate-800/50 transition-all duration-200">
                <input
                  type="checkbox"
                  checked={showAdminOnly}
                  onChange={(e) => setShowAdminOnly(e.target.checked)}
                  className="w-5 h-5 text-emerald-500 bg-slate-800 border-slate-600 rounded focus:ring-emerald-500 focus:ring-2"
                />
                <span className="text-slate-300 font-mclaren font-medium whitespace-nowrap">
                  Admin Only
                </span>
              </label>
              <label className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800/30 border border-slate-700/30 cursor-pointer hover:bg-slate-800/50 transition-all duration-200">
                <input
                  type="checkbox"
                  checked={showMyAnnouncements}
                  onChange={(e) => setShowMyAnnouncements(e.target.checked)}
                  className="w-5 h-5 text-emerald-500 bg-slate-800 border-slate-600 rounded focus:ring-emerald-500 focus:ring-2"
                />
                <span className="text-slate-300 font-mclaren font-medium whitespace-nowrap">
                  My Announcements
                </span>
              </label>
            </div>
          </div>
        </div>

        {pinnedAnnouncements.length > 0 && (
          <div className="mb-12">
            <h2 className="font-mclaren text-2xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30">
                <Pin className="text-emerald-400" size={20} />
              </div>
              Pinned Announcements
            </h2>
            <div className="space-y-6">
              {pinnedAnnouncements.map((ann: any) => (
                <div
                  key={ann._id}
                  className="group relative rounded-2xl bg-gradient-to-br from-emerald-900/30 via-emerald-800/20 to-teal-900/30 backdrop-blur-xl border border-emerald-400/30 p-8 shadow-2xl hover:border-emerald-300/50 transition-all duration-500 hover:shadow-emerald-500/25"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 to-teal-500/3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex gap-6 items-start">
                    <div className="relative flex-shrink-0">
                      <img
                        src={ann.senderProfilePic}
                        alt={ann.senderName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400/40 shadow-lg"
                      />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-1.5 shadow-lg">
                        <Pin size={14} className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-mclaren font-bold text-white text-xl">
                              {ann.senderName}
                            </h3>
                            {ann.isAdmin && (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 text-xs font-mclaren font-semibold">
                                ADMIN
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-slate-400 font-mclaren">
                            <span>
                              {new Date(ann.createdAt).toLocaleDateString()} at{" "}
                              {new Date(ann.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {ann.projectId && (
                              <>
                                <span className="text-slate-600">•</span>
                                <span className="text-emerald-400">
                                  {projects.find((p) => p._id === ann.projectId)?.name || "Unknown Project"}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button
                            onClick={() => openModalForEdit(ann)}
                            className="p-2.5 rounded-lg bg-emerald-600/15 text-emerald-400 hover:bg-emerald-600/25 hover:text-emerald-300 transition-all duration-200 border border-emerald-500/20 hover:border-emerald-400/30"
                            title="Edit announcement"
                          >
                            <LucideEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleTogglePin(ann._id, ann.pinned)}
                            className="p-2.5 rounded-lg bg-emerald-600/15 text-emerald-400 hover:bg-emerald-600/25 hover:text-emerald-300 transition-all duration-200 border border-emerald-500/20 hover:border-emerald-400/30"
                            title="Unpin"
                          >
                            <Pin size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(ann._id)}
                            className="p-2.5 rounded-lg bg-red-600/15 text-red-400 hover:bg-red-600/25 hover:text-red-300 transition-all duration-200 border border-red-500/20 hover:border-red-400/30"
                          >
                            <LucideTrash size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-200 font-mclaren leading-relaxed text-base">
                        {ann.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="font-mclaren text-2xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent">
            Recent Announcements
          </h2>
          {otherAnnouncements.length > 0 ? (
            <div className="space-y-6">
              {otherAnnouncements.map((ann: any) => (
                <div
                  key={ann._id}
                  className="group relative rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-slate-700/50 p-8 shadow-2xl hover:border-emerald-400/50 transition-all duration-500 hover:shadow-emerald-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/2 to-teal-500/2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex gap-6 items-start">
                    <img
                      src={ann.senderProfilePic}
                      alt={ann.senderName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-600/50 shadow-lg group-hover:border-emerald-400/30 transition-colors duration-300 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-mclaren font-bold text-white text-xl">
                              {ann.senderName}
                            </h3>
                            {ann.isAdmin && (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 text-xs font-mclaren font-semibold">
                                ADMIN
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-slate-400 font-mclaren">
                            <span>
                              {new Date(ann.createdAt).toLocaleDateString()} at{" "}
                              {new Date(ann.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {ann.projectId && (
                              <>
                                <span className="text-slate-600">•</span>
                                <span className="text-emerald-400">
                                  {projects.find((p) => p._id === ann.projectId)?.name || "Unknown Project"}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button
                            onClick={() => openModalForEdit(ann)}
                            className="p-2.5 rounded-lg bg-slate-700/30 text-slate-400 hover:bg-emerald-600/15 hover:text-emerald-400 transition-all duration-200 border border-slate-600/30 hover:border-emerald-500/20"
                            title="Edit announcement"
                          >
                            <LucideEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleTogglePin(ann._id, ann.pinned)}
                            className="p-2.5 rounded-lg bg-slate-700/30 text-slate-400 hover:bg-emerald-600/15 hover:text-emerald-400 transition-all duration-200 border border-slate-600/30 hover:border-emerald-500/20"
                            title="Pin"
                          >
                            <Pin size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(ann._id)}
                            className="p-2.5 rounded-lg bg-red-600/15 text-red-400 hover:bg-red-600/25 hover:text-red-300 transition-all duration-200 border border-red-500/20 hover:border-red-400/30"
                          >
                            <LucideTrash size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-200 font-mclaren leading-relaxed text-base">
                        {ann.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="rounded-2xl bg-gradient-to-br from-slate-900/50 via-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/30 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Pin className="text-slate-400" size={24} />
                </div>
                <p className="text-slate-400 font-mclaren text-lg">
                  No announcements yet
                </p>
                <p className="text-slate-500 font-mclaren text-sm mt-2">
                  Create your first announcement to get started
                </p>
              </div>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-xl border border-slate-700/50 p-8 shadow-2xl w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 to-teal-500/3 rounded-2xl" />
              <button
                onClick={resetModal}
                className="absolute top-4 right-4 p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              >
                <FaTimes size={16} />
              </button>
              <div className="relative">
                <h2 className="font-mclaren text-2xl font-bold mb-8 bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent">
                  {editingId ? "Edit Announcement" : "Create Announcement"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter announcement title"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-5 py-4 text-white placeholder-slate-400 focus:border-emerald-400/50 focus:bg-slate-800/70 transition-all duration-200 font-mclaren text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Write your announcement content..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={5}
                      className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-5 py-4 text-white placeholder-slate-400 focus:border-emerald-400/50 focus:bg-slate-800/70 transition-all duration-200 font-mclaren resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
                    <input
                      type="checkbox"
                      id="pinned"
                      checked={pinned}
                      onChange={(e) => setPinned(e.target.checked)}
                      className="w-5 h-5 text-emerald-500 bg-slate-800 border-slate-600 rounded focus:ring-emerald-500 focus:ring-2"
                    />
                    <label
                      htmlFor="pinned"
                      className="text-slate-300 font-mclaren font-medium flex items-center gap-2"
                    >
                      <Pin size={16} className="text-emerald-400" />
                      Pin this announcement
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-mclaren text-slate-400 mb-2">
                      Project (Optional)
                    </label>
                    <select
                      value={selectedProjectForAnnouncement}
                      onChange={(e) => setSelectedProjectForAnnouncement(e.target.value)}
                      className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-5 py-4 text-white font-mclaren focus:border-emerald-400/50 focus:bg-slate-800/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="">All Projects</option>
                      {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
          
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-700 disabled:to-slate-700 text-white px-6 py-4 rounded-xl shadow-lg font-mclaren font-semibold transition-all duration-300 disabled:cursor-not-allowed text-lg"
                  >
                    {submitting
                      ? "Saving..."
                      : editingId
                      ? "Update Announcement"
                      : "Create Announcement"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
