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
  switch (status) {
    case "Pending":
      return (
        <span className={`${base} bg-yellow-900/30 text-yellow-300`}>
          <FaClock className="mr-1" /> Pending
        </span>
      );
    case "Approved":
      return (
        <span className={`${base} bg-green-900/30 text-green-300`}>
          <FaCheckCircle className="mr-1" /> Approved
        </span>
      );
    case "Rejected":
      return (
        <span className={`${base} bg-red-900/30 text-red-300`}>
          Rejected
        </span>
      );
    default:
      return null;
  }
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

      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
        {request.description}
      </p>

      <div className="flex items-center justify-between">
        <a
          href={request.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1"
        >
          View Prototype <FaArrowRight className="text-xs" />
        </a>
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
  const [requestFilter, setRequestFilter] = useState<
    "All" | "Pending" | "Approved"
  >("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    domain: "",
    domain2: "",
    domain3: "",
    description: "",
    link: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/request", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error fetching data";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const selectedDomains = [
        formData.domain,
        formData.domain2,
        formData.domain3,
      ].filter(Boolean);

      if (selectedDomains.length === 0) {
        toast.error("Please select at least one domain");
        setSubmitting(false);
        return;
      }

      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          domain: selectedDomains, 
        }),
      });

      const result = await res.json();
      if (!res.ok)
        throw new Error(result.error || result.message || "Failed to send request");

      toast.success("Request sent successfully!");
      setIsModalOpen(false);
      setFormData({
        title: "",
        domain: "",
        domain2: "",
        domain3: "",
        description: "",
        link: "",
      });
      fetchUserData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error sending request");
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

  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const approvedCount = requests.filter((r) => r.status === "Approved").length;

  const filteredRequests =
    requestFilter === "All"
      ? requests
      : requests.filter((r) => r.status === requestFilter);

  return (
    <main className="min-h-screen p-4">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Project Requests
            </h1>
            <p className="text-gray-400 mb-4">
              Browse and manage your project requests
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded px-5 py-2 font-semibold flex items-center gap-2 shadow-md"
          >
            <FaPlus /> Add Project Request
          </button>
        </div>

        <div className="flex gap-2 mb-6 bg-gray-800 rounded-lg p-1 w-fit">
          {[
            { label: "All", count: requests.length },
            { label: "Pending", count: pendingCount },
            { label: "Approved", count: approvedCount },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() =>
                setRequestFilter(tab.label as "All" | "Pending" | "Approved")
              }
              className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${
                requestFilter === tab.label
                  ? "bg-gray-700 text-indigo-400 shadow"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <span>{tab.label}</span>
              {tab.label !== "All" && (
                <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <FaClock className="text-gray-600 text-4xl mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No project requests found</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRequests.map((r) => (
              <RequestCard key={r._id} request={r} />
            ))}
          </section>
        )}
      </div>

      {/* Modal for New Request */}
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
                onChange={handleInputChange}
                required
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white placeholder-gray-400 p-2 rounded w-full focus:border-indigo-500"
              />

              {[1, 2, 3].map((n) => (
                <select
                  key={n}
                  name={`domain${n === 1 ? "" : n}`}
                  value={(formData as any)[`domain${n === 1 ? "" : n}`]}
                  onChange={handleInputChange}
                  required={n === 1}
                  disabled={submitting}
                  className="border border-gray-600 bg-gray-700 text-white p-2 rounded w-full focus:border-indigo-500"
                >
                  <option value="">
                    {n === 1
                      ? "Select Primary Domain *"
                      : `Select Optional Domain ${n}`}
                  </option>
                  {domains.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              ))}

              <textarea
                name="description"
                placeholder="Description *"
                value={formData.description}
                onChange={handleInputChange}
                required
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white placeholder-gray-400 p-2 rounded w-full focus:border-indigo-500"
                rows={3}
              />

              <input
                type="url"
                name="link"
                placeholder="Prototype Link *"
                value={formData.link}
                onChange={handleInputChange}
                required
                disabled={submitting}
                className="border border-gray-600 bg-gray-700 text-white placeholder-gray-400 p-2 rounded w-full focus:border-indigo-500"
              />

              <button
                type="submit"
                disabled={submitting}
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
