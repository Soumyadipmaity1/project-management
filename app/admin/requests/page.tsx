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
  requestId?: string;
  content: string;
  role?: string;
  requestType: "new_project" | "contribute";
}

export default function PendingRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch requests
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const [projectRes, contributeRes] = await Promise.all([
        fetch("/api/request"),
        fetch("/api/projectlead/requests"),
      ]);

      const projectData = await projectRes.json();
      const contributeData = await contributeRes.json();

      const formatted: Request[] = [
        // 🟦 New Project Requests
        ...projectData.map((req: any) => ({
          _id: req._id,
          name: req.senderName || req.name,
          email: req.senderEmail || req.email,
          img: req.senderProfilePic || "",
          project: req.title || req.project,
          domain: Array.isArray(req.domain)
            ? req.domain.join(", ")
            : req.domain || "N/A",
          content: req.description || req.content,
          requestType: "new_project",
        })),
       ...contributeData.map((req: any) => ({
      _id: req._id || req.requestId, // ✅ ensure we store the correct ID
       requestId: req._id || req.requestId, // ✅ keep both for clarity
      projectId: req.project?._id || req.projectId, // ✅ add project reference
     name: req.user?.name || req.name,
     email: req.user?.email || req.email,
     img: req.user?.profilePic || "",
      project: req.project?.title || "Unknown Project",
     role: req.user?.role || "Member",
     domain:
    Array.isArray(req.domain) && req.domain.length > 0
      ? req.domain.join(", ")
      : req.domain || "N/A",
  content:
    req.message ||
    `Wants to contribute to ${req.project?.title || "a project"}`,
  requestType: "contribute",
}))

      ];

      setRequests(formatted);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Handle Approval or Rejection (Unified logic)
  const handleAction = async (
    id: string,
    type: string,
    requestId: string,
    status: "approved" | "rejected",
    request?: Request
  ) => {
    try {
      const endpoint =
        type === "new_project"
          ? `/api/request/${id}`
          : `/api/projectlead/requests/${requestId}`;

      const payload =
        type === "contribute"
          ? {
              status,
              userEmail: request?.email,
              project: request?.project,
              domain: request?.domain,
            }
          : { status };

      const method = type === "new_project" ? (status === "approved" ? "PATCH" : "PATCH") : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: type === "contribute" ? JSON.stringify(payload) : undefined,
      });

      if (!res.ok) throw new Error(`Failed to ${status} request`);

      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success(`Request ${status} successfully!`);
    } catch (error) {
      console.error(error);
      toast.error(`${status === "approved" ? "Approval" : "Rejection"} failed!`);
    }
  };

  return (
    <div className="py-6 lg:px-4 min-h-screen">
      <h2 className="text-4xl font-bold text-white mb-2">Pending Requests</h2>
      <p className="text-neutral-300 text-lg mb-8">
        Approve or reject project and contribution requests
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
              {/* Image */}
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

              {/* Common Info */}
              <h3 className="text-lg font-semibold text-white text-center">
                {r.name}
              </h3>
              <p className="text-sm text-neutral-400 text-center mb-3">
                {r.email}
              </p>

              {/* Conditional Display */}
              <div className="space-y-1 mb-3 text-sm text-neutral-300">
                {r.requestType === "new_project" ? (
                  <>
                    <p>
                      <strong>Domain:</strong> {r.domain}
                    </p>
                    <p>
                      <strong>New Project:</strong> {r.project || "N/A"}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {r.content || "No description"}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Role:</strong> {r.role}
                    </p>
                    <p>
                      <strong>Domain:</strong> {r.domain}
                    </p>
                    <p>
                      <strong>Project:</strong> {r.project}
                    </p>
                    <p>
                      <strong>Details:</strong> {r.content}
                    </p>
                  </>
                )}
              </div>

              {/* Badge */}
              <div className="flex justify-center mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    r.requestType === "new_project"
                      ? "bg-blue-900 text-blue-300"
                      : "bg-green-900 text-green-300"
                  }`}
                >
                  {r.requestType === "new_project"
                    ? "NEW PROJECT"
                    : "CONTRIBUTE"}
                </span>
              </div>

              {/* Actions */}
             <div className="flex gap-2 mt-auto">
  <button
    onClick={() =>
      handleAction(
        r._id,
        r.requestType,
        r.requestId || r._id, // ✅ FIXED — ensure proper requestId is sent
        "approved",
        r
      )
    }
    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
  >
    ✓ APPROVE
  </button>
  <button
    onClick={() =>
      handleAction(
        r._id,
        r.requestType,
        r.requestId || r._id, // ✅ FIXED
        "rejected",
        r
      )
    }
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
          No pending requests found.
        </div>
      )}
    </div>
  );
}

