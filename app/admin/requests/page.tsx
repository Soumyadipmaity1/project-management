"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Request {
  _id: string;
  name: string;
  email: string;
  img?: string;
  project?: string;
  domain: string | string[];
  content: string;
  requestType: "new_project";
}

export default function PendingRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/request`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch requests");

      const formatted: Request[] = data.map((req: any) => ({
        _id: req._id,
        name: req.user?.name || req.name,
        email: req.user?.email || req.email,
        img: req.user?.profilePic || "",
        project: req.title || "Untitled Project",
        domain: Array.isArray(req.domain)
          ? req.domain.join(", ")
          : req.domain || "N/A",
        content: req.description || "No description provided",
        requestType: "new_project",
      }));

      setRequests(formatted);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch project requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Handle Approve / Reject
  const handleAction = async (id: string, status: "approved" | "rejected") => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/request/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error(`Failed to ${status} request`);

      // Remove from UI after success
      setRequests((prev) => prev.filter((r) => r._id !== id));

      // Toast notification
      toast.success(`Project request ${status} successfully!`);
    } catch (error) {
      console.error(error);
      toast.error(
        `${status === "approved" ? "Approval" : "Rejection"} failed!`
      );
    }
  };

  return (
    <div className="py-6 lg:px-4 min-h-screen">
      <h2 className="text-4xl font-bold text-white mb-2">Pending Project Requests</h2>
      <p className="text-neutral-300 text-lg mb-8">
        Approve or reject new project creation requests.
      </p>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-64 text-neutral-400">
          Loading requests...
        </div>
      ) : requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {requests.map((r) => (
            <div
              key={r._id}
              className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 flex flex-col shadow-md hover:bg-neutral-800 transition-colors"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                {r.img ? (
                  <img
                    src={r.img}
                    alt={r.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-neutral-700 shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-xl">
                    {r.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="text-lg font-semibold text-white text-center">
                {r.name}
              </h3>
              <p className="text-sm text-neutral-400 text-center mb-3">
                {r.email}
              </p>

              <div className="space-y-1 mb-3 text-sm text-neutral-300">
                <p>
                  <strong>Domain:</strong> {r.domain}
                </p>
                <p>
                  <strong>Project:</strong> {r.project || "N/A"}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {r.content || "No description"}
                </p>
              </div>

              {/* Badge */}
              <div className="flex justify-center mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-900 text-blue-300">
                  NEW PROJECT
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleAction(r._id, "approved")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
                >
                  ✓ APPROVE
                </button>
                <button
                  onClick={() => handleAction(r._id, "rejected")}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
                >
                  ✗ REJECT
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 text-neutral-400">
          No pending new project requests found.
        </div>
      )}
    </div>
  );
}
