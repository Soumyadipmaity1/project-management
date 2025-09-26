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
    <div className="min-h-screen py-8 px-10">
      <h2 className="font-mclaren text-[38px] text-[#2A2A4A] mb-3 mt-8">
        Pending Requests
      </h2>
      <p className="text-[#606060] text-[18px] font-mclaren mb-8">
        Approve or reject member requests
      </p>

      {loading && <p>Loading requests...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="flex flex-col items-start">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white border border-gray-200 rounded-lg flex flex-col items-start px-10 py-8 w-[320px] shadow-xl mb-6"
          >
            <img
              src={request.img || "/default-user.png"}
              alt={request.name}
              className="w-20 h-20 rounded-full object-cover mb-5 border-4 border-white shadow"
            />
            <div className="text-[#2A2A4A] font-mclaren text-[20px] font-bold text-center mb-5">
              {request.name}
            </div>
            <div className="text-[#181818] text-[16px] mb-1">
              Applied for: <span className="font-semibold">{request.appliedFor}</span>
            </div>
            <div className="text-[#181818] text-[16px] mb-1">
              Domain: <span className="font-semibold">{request.domain}</span>
            </div>
            <div className="text-[#181818] text-[16px] mb-4">
              Description: {request.description}
            </div>
            <div className="flex gap-3 mt-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-bold text-[15px]"
                onClick={() => handleApprove(request.id)}
              >
                ✓ APPROVE
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-bold text-[15px]"
                onClick={() => handleReject(request.id)}
              >
                ✗ REJECT
              </button>
            </div>
          </div>
        ))}
        {!loading && requests.length === 0 && (
          <p className="text-[#555] mt-6 text-lg font-mclaren">No pending requests</p>
        )}
      </div>
    </div>
  );
}
