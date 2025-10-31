"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProjectLeadPendingRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projectlead/requests`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch requests");

        setRequests(data);
        toast.success("Requests loaded successfully!");
      } catch (err: any) {
        console.error("Fetch error:", err);
        toast.error(err.message || "Error fetching requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAction = async (
    projectId: string,
    requestId: string,
    action: "approve" | "reject"
  ) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projectlead/requests/${requestId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, requestId, action }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Action failed");

      toast.success(
        action === "approve"
          ? "✅ Request approved successfully!"
          : "❌ Request rejected successfully!"
      );

      // Remove the processed request from UI
      setRequests((prev) => prev.filter((r) => r.requestId !== requestId));
    } catch (err: any) {
      console.error("Action error:", err);
      toast.error(err.message || "Action failed");
    }
  };

  if (loading)
    return <p className="p-4 text-gray-400">Loading pending requests...</p>;

  if (requests.length === 0)
    return <p className="p-4 text-gray-400">No pending requests found.</p>;

  return (
    <div className="p-6">
      {/* 🔔 Toast container */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937", // dark slate
            color: "#fff",
          },
          success: {
            iconTheme: { primary: "#10B981", secondary: "#1f2937" },
          },
          error: {
            iconTheme: { primary: "#EF4444", secondary: "#1f2937" },
          },
        }}
      />

      <h2 className="text-xl font-bold text-fuchsia-400 mb-4">
        Pending Requests (All Projects)
      </h2>

      <ul className="space-y-3">
        {requests.map((req) => (
          <li
            key={req.requestId}
            className="p-3 bg-slate-800/60 rounded-md flex justify-between items-center"
          >
            <div>
              <p className="text-white font-medium">{req.user?.name}</p>
              <p className="text-gray-400 text-sm">{req.user?.email}</p>
              <p className="text-sm text-gray-300 mt-1">
                Project: {req.projectTitle}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleAction(req.projectId, req.requestId, "approve")
                }
                className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm"
              >
                Approve
              </button>
              <button
                onClick={() =>
                  handleAction(req.projectId, req.requestId, "reject")
                }
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
