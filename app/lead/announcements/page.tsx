"use client";
import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { LucideTrash, Edit as LucideEdit } from "lucide-react";

export default function AnnouncementsPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("/api/announcement", { cache: "no-store" });
        const data = await res.json();
        setGroups(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) return <p className="p-8">Loading announcements...</p>;

  const openModalForEdit = (ann: any) => {
    setEditingId(ann._id);
    setSenderName(ann.senderName);
    setContent(ann.content);
    setPinned(ann.pinned);
    setFile(null);
    setIsModalOpen(true);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setSenderName("");
    setContent("");
    setPinned(false);
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

        const uploadRes = await fetch("/api/uploads", { method: "POST", body: formData });
        if (!uploadRes.ok) throw new Error("File upload failed");
        const uploadData = await uploadRes.json();
        uploadedUrl = uploadData.url;
      }

      const payload = {
        senderName,
        senderProfilePic: uploadedUrl || undefined,
        content,
        pinned,
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
        if (editingId) return prev.map((a) => (a._id === editingId ? savedAnn : a));
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
      setGroups((prev) => prev.map((a) => (a._id === id ? { ...a, pinned: updated.pinned } : a)));
    } catch (err) {
      console.error(err);
      alert("Failed to update pin status");
    }
  };

  const pinnedAnnouncements = groups.filter((a) => a.pinned);
  const otherAnnouncements = groups.filter((a) => !a.pinned);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="flex items-center justify-between mt-5 mb-8">
        <h1 className="font-mclaren text-[40px] text-[#2A2A4A]">Announcements</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#2A2A4A] text-white px-7 py-3 rounded-md shadow hover:bg-[#21213b] transition"
        >
          <FaPlus /> Create announcement
        </button>
      </div>

      {pinnedAnnouncements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-[#2A2A4A]">📌 Pinned Announcements</h2>
          {pinnedAnnouncements.map((ann: any) => (
            <div
              key={ann._id}
              className="bg-yellow-50 border border-yellow-200 p-4 mb-3 rounded shadow flex gap-4 items-start justify-between"
            >
              <div className="flex gap-4">
                <img src={ann.senderProfilePic} alt={ann.senderName} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-[#2A2A4A] flex items-center gap-2">
                    {ann.senderName}
                    <button
                      onClick={() => openModalForEdit(ann)}
                      className="text-blue-500 hover:text-blue-700 transition"
                      title="Edit announcement"
                    >
                      <LucideEdit size={16} />
                    </button>
                  </h3>
                  <p className="text-sm text-gray-500">{new Date(ann.createdAt).toLocaleString()}</p>
                  <p className="mt-2">{ann.content}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => handleTogglePin(ann._id, ann.pinned)}
                  className="text-yellow-600 hover:text-yellow-800 transition"
                  title={ann.pinned ? "Unpin" : "Pin"}
                >
                  📌
                </button>
                <button
                  onClick={() => handleDelete(ann._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <LucideTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold mb-3 text-[#2A2A4A]">Other Announcements</h2>
        {otherAnnouncements.map((ann: any) => (
          <div
            key={ann._id}
            className="bg-white border p-4 mb-3 rounded shadow flex gap-4 items-start justify-between"
          >
            <div className="flex gap-4">
              <img src={ann.senderProfilePic} alt={ann.senderName} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h3 className="font-bold text-[#2A2A4A] flex items-center gap-2">
                  {ann.senderName}
                  <button
                    onClick={() => openModalForEdit(ann)}
                    className="text-blue-500 hover:text-blue-700 transition"
                    title="Edit announcement"
                  >
                    <LucideEdit size={16} />
                  </button>
                </h3>
                <p className="text-sm text-gray-500">{new Date(ann.createdAt).toLocaleString()}</p>
                <p className="mt-2">{ann.content}</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <button
                onClick={() => handleTogglePin(ann._id, ann.pinned)}
                className="text-gray-500 hover:text-yellow-600 transition"
                title={ann.pinned ? "Unpin" : "Pin"}
              >
                📌
              </button>
              <button
                onClick={() => handleDelete(ann._id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <LucideTrash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
            <button
              onClick={resetModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Announcement" : "Create Announcement"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="border p-2 rounded"
                required
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border p-2 rounded"
                required
              />
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} />
                Pin announcement
              </label>
              <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#2A2A4A] text-white px-4 py-2 rounded shadow hover:bg-[#21213b] transition"
              >
                {submitting ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
