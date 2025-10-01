"use client";
import React, { useState, useEffect } from "react";

type Request = {
  id: string;
  name: string;
  img?: string;
  appliedFor: string;
  domain: string;
  description: string;
};

export default function PendingRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all requests from backend
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/lead/requests", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch requests");
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve
  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/lead/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });
      if (!res.ok) throw new Error("Failed to approve request");
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert("Error approving request");
    }
  };

  // Reject
  const handleReject = async (id: string) => {
    try {
      const res = await fetch(`/api/lead/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      if (!res.ok) throw new Error("Failed to reject request");
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert("Error rejecting request");
    }
  };

  return (
    <div className="min-h-screen py-6 px-4">
      <h2 className="font-mclaren text-[36px] mb-3 font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent">
        Pending Requests
      </h2>
      <p className="text-slate-400 text-lg font-medium font-mclaren mb-8">
        Approve or reject member requests
      </p>

      {loading && (
        <p className="text-emerald-300 font-mclaren">Loading requests...</p>
      )}
      {error && <p className="text-red-400 font-mclaren">{error}</p>}

      <div className="flex flex-col items-start">
        {requests.map((request) => (
          <div key={request.id} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
            <div className="relative bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-xl border border-slate-700/50 rounded-xl flex flex-col items-start px-10 py-8 w-[360px] shadow-2xl mb-6 hover:shadow-emerald-500/25 transition-all duration-500 hover:border-emerald-400/60 overflow-hidden group-hover:transform group-hover:scale-[1.02]">
              <img
                src={request.img || "/default-user.png"}
                alt={request.name}
                className="w-20 h-20 rounded-full object-cover mb-5 border-4 border-emerald-500 shadow-lg shadow-emerald-500/30"
              />
              <div className="font-bold text-xl bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent font-mclaren leading-tight mb-5 text-center">
                {request.name}
              </div>

              <div className="space-y-2 bg-slate-800/30 rounded-lg p-4 border border-slate-700/30 w-full mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-emerald-300 text-sm font-mclaren">
                    Applied for:
                  </span>
                  <span className="text-slate-300 text-sm font-mclaren font-medium">
                    {request.appliedFor}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-emerald-300 text-sm font-mclaren">
                    Domain:
                  </span>
                  <span className="text-slate-300 text-sm font-mclaren font-medium">
                    {request.domain}
                  </span>
                </div>
              </div>

              <div className="text-slate-300 text-sm leading-relaxed font-mclaren mb-6">
                <span className="font-semibold text-emerald-300">
                  Description:{" "}
                </span>
                {request.description}
              </div>

              <div className="flex gap-3 mt-auto w-full">
                <button
                  className="flex-1 bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-700 hover:via-emerald-700 hover:to-teal-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:transform hover:scale-105 border border-emerald-500/20 font-mclaren"
                  onClick={() => handleApprove(request.id)}
                >
                  ✓ APPROVE
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-700 hover:via-red-700 hover:to-red-800 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:transform hover:scale-105 border border-red-500/20 font-mclaren"
                  onClick={() => handleReject(request.id)}
                >
                  ✗ REJECT
                </button>
              </div>
            </div>
          </div>
        ))}
        {!loading && requests.length === 0 && (
          <div className="flex items-center justify-center py-16 w-full">
            <div className="text-slate-500 font-mclaren text-lg">
              No pending requests found.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
