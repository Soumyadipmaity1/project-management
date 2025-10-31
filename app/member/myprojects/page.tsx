"use client";
import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaTimes,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

type ProjectRequest = {
  _id: string;
  title: string;
  domain: string[];
  description: string;
  link: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
};

function RequestStatusBadge({ status }: { status: ProjectRequest["status"] }) {
  const base =
    "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold";
  const variants = {
    Pending: `${base} bg-yellow-900/30 text-yellow-300`,
    Approved: `${base} bg-green-900/30 text-green-300`,
    Rejected: `${base} bg-red-900/30 text-red-300`,
  };
  const icons = {
    Pending: <FaClock className="mr-1" />,
    Approved: <FaCheckCircle className="mr-1" />,
    Rejected: null,
  };
  return <span className={variants[status]}>{icons[status]} {status}</span>;
}

function RequestCard({ request }: { request: ProjectRequest }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-indigo-500/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white line-clamp-2">
          {request.title}
        </h3>
        <RequestStatusBadge status={request.status} />
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {request.domain?.slice(0, 3).map((d, i) => (
          <span
            key={i}
            className="px-2 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
          >
            {d}
          </span>
        ))}
      </div>
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">{request.description}</p>
      <div className="flex items-center justify-between">
        {request.link && (
          <a
            href={request.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1"
          >
            View Prototype <FaArrowRight className="text-xs" />
          </a>
        )}
        <span className="text-gray-500 text-xs">
          {new Date(request.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default function ProjectGrid() {
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | "Pending" | "Approved">("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    domain: "",
    domain2: "",
    domain3: "",
    description: "",
    link: "",
    startDate: "",
    completionDate: "",
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      setLoading(true);
      const res = await fetch("/api/request", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch project requests.");
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);

    const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudinaryUrl || !preset) {
      toast.error("Cloudinary configuration missing.");
      setUploading(false);
      return;
    }

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", preset);

    try {
      const res = await fetch(cloudinaryUrl, {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "Image upload failed.");
      setImageUrl(data.secure_url);
      toast.success("Image uploaded successfully!");
    } catch (err: any) {
      toast.error(err.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!imageUrl) {
        toast.error("Please upload a project image first.");
        setSubmitting(false);
        return;
      }

      const selectedDomains = [formData.domain, formData.domain2, formData.domain3].filter(Boolean);
      if (selectedDomains.length === 0) {
        toast.error("Please select at least one domain.");
        setSubmitting(false);
        return;
      }

      const payload = {
        title: formData.title.trim(),
        domain: selectedDomains,
        description: formData.description.trim(),
        link: formData.link.trim(),
        startDate: formData.startDate,
        endDate: formData.completionDate,
        image: imageUrl,
      };

      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to send request.");

      toast.success("Project request submitted successfully!");
      setIsModalOpen(false);
      setFormData({
        title: "",
        domain: "",
        domain2: "",
        domain3: "",
        description: "",
        link: "",
        startDate: "",
        completionDate: "",
      });
      setImageUrl("");
      setPreviewImage(null);
      fetchRequests();
    } catch (err: any) {
      toast.error(err.message || "Error submitting request.");
    } finally {
      setSubmitting(false);
    }
  };

  const domains = [
    "Web Development",
    "Mobile Development",
    "Competitive Programming",
    "Design & Branding",
    "Content Writing",
    "Administration",
    "Marketing & PR",
    "Cloud Computing",
    "Cybersecurity",
    "AI / Machine Learning",
  ];

  const filtered =
    filter === "All" ? requests : requests.filter((r) => r.status === filter);

  return (
    <main className="min-h-screen p-4">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <header className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Project Requests</h1>
            <p className="text-gray-400 mb-4">Browse and manage your project requests.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded px-5 py-2 font-semibold flex items-center gap-2 shadow-md"
          >
            <FaPlus /> Add Project Request
          </button>
        </header>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-800 rounded-lg p-1 w-fit">
          {["All", "Pending", "Approved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                filter === tab
                  ? "bg-gray-700 text-indigo-400 shadow"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <FaClock className="text-gray-600 text-4xl mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No project requests found</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((r) => (
              <RequestCard key={r._id} request={r} />
            ))}
          </section>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md relative border border-gray-700">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
              disabled={submitting}
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-white">
              Send Request for Project Creation
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                placeholder="Project Title *"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:border-indigo-500"
              />
              <select
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                required
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:border-indigo-500"
              >
                <option value="">Select Primary Domain *</option>
                {domains.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <select
                name="domain2"
                value={formData.domain2}
                onChange={handleChange}
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:border-indigo-500"
              >
                <option value="">Select Secondary Domain</option>
                {domains.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <select
                name="domain3"
                value={formData.domain3}
                onChange={handleChange}
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:border-indigo-500"
              >
                <option value="">Select Additional Domain</option>
                {domains.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>

              <textarea
                name="description"
                placeholder="Description *"
                value={formData.description}
                onChange={handleChange}
                required
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:border-indigo-500"
                rows={3}
              />
              <input
                type="url"
                name="link"
                placeholder="Prototype Link *"
                value={formData.link}
                onChange={handleChange}
                required
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:border-indigo-500"
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:border-indigo-500"
                />
                <input
                  type="date"
                  name="completionDate"
                  value={formData.completionDate}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Project Image * (required)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                  disabled={submitting || uploading}
                  className="text-sm text-gray-400"
                />
                {uploading && (
                  <p className="text-yellow-400 text-sm mt-1">
                    Uploading image…
                  </p>
                )}
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-40 object-cover mt-2 rounded"
                  />
                )}
              </div>
              <button
                type="submit"
                disabled={submitting || uploading}
                className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed font-semibold"
              >
                {submitting ? "Sending..." : "Send Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
