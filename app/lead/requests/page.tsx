"use client";
import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

interface Request {
  _id: string;
  title: string;
  domain: string;
  description: string;
  link: string;
  status: "Pending" | "Approved" | "Rejected";
  user: {
    name: string;
    email: string;
    image?: string;
  };
}

interface TeamMember {
  _id: string;
  name: string;
  rollNo: string;
  domain: string;
}

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (leadId: string, assistantId?: string) => void;
  requestTitle?: string;
  domainMembers: TeamMember[];
}

function ApproveModal({
  isOpen,
  onClose,
  onConfirm,
  requestTitle,
  domainMembers,
}: ApproveModalProps) {
  const [leadId, setLeadId] = useState("");
  const [assistantId, setAssistantId] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!leadId) {
      toast.error("Project Lead is required!");
      return;
    }
    onConfirm(leadId, assistantId || undefined);
    setLeadId("");
    setAssistantId("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">
            Approve Request
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <p className="text-gray-300 mb-4">
          Assign leads for project: <strong>{requestTitle}</strong>
        </p>

        <div className="space-y-3">
          <div>
            <label className="text-gray-300 text-sm mb-1 block">
              Project Lead (Required)
            </label>
            <select
              value={leadId}
              onChange={(e) => setLeadId(e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none border border-gray-700 focus:border-indigo-500"
            >
              <option value="">Select Project Lead</option>
              {domainMembers.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name} ({m.rollNo})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-1 block">
              Assistant Lead (Optional)
            </label>
            <select
              value={assistantId}
              onChange={(e) => setAssistantId(e.target.value)}
              className="w-full bg-gray-800 text-white px-3 py-2 rounded-md focus:outline-none border border-gray-700 focus:border-indigo-500"
            >
              <option value="">Select Assistant Lead</option>
              {domainMembers.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name} ({m.rollNo})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PendingRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [domainMembers, setDomainMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/request");
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        toast.error("Failed to load requests.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleApproveClick = async (req: Request) => {
    try {
      // Fetch latest request details
      const res = await fetch(`/api/request`);
      const requestDetails: Request = await res.json();
      setSelectedRequest(requestDetails);

      const membersRes = await fetch(`/api/domain_members?domain=${req.domain}`);
      const members: TeamMember[] = await membersRes.json();
      setDomainMembers(members);

      setShowModal(true);
    } catch (err) {
      toast.error("Failed to fetch request details.");
      console.error(err);
    }
  };

  const handleApprove = async (leadId: string, assistantId?: string) => {
    if (!selectedRequest) return;
    try {
      await fetch(`/api/request/${selectedRequest._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamlead: leadId, colead: assistantId }),
      });
      setRequests((prev) =>
        prev.map((r) =>
          r._id === selectedRequest._id ? { ...r, status: "Approved" } : r
        )
      );
      toast.success("Request approved successfully!");
    } catch (err) {
      toast.error("Failed to approve request.");
      console.error(err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await fetch(`/api/request/${id}`, { method: "PATCH" });
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success("Request rejected.");
    } catch (err) {
      toast.error("Failed to reject request.");
      console.error(err);
    }
  };

  const filtered = requests.filter((req) =>
    req.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold text-white mb-2">Pending Requests</h2>
      <p className="text-gray-400 mb-6">Approve or reject new project requests.</p>

      <div className="mb-6 relative w-full md:w-1/2">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {loading ? (
        <div className="text-gray-400">Loading requests...</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-400 text-lg">No pending requests found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((req) => (
            <div
              key={req._id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-md hover:bg-gray-800 transition"
            >
              <div className="flex items-center mb-4">
                <img
                  src={req.user.image || "https://via.placeholder.com/60"}
                  alt={req.user.name}
                  className="w-14 h-14 rounded-full mr-4 border-2 border-gray-700 object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{req.user.name}</h3>
                  <p className="text-gray-400 text-sm">{req.user.email}</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-2">
                <strong>Project:</strong> {req.title}
              </p>

             <p className="text-gray-300 text-sm mb-2">
  <strong>Domains:</strong>{" "}
  {req.domain && req.domain.length > 0 ? (
    req.domain.map((d, i) => (
      <span key={i} className="inline-block bg-gray-800 px-2 py-1 rounded text-xs text-indigo-400 mr-1">
        {d}
      </span>
    ))
  ) : (
    <span className="text-gray-400">No domains</span>
  )}
</p>

              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {req.description}
              </p>

              <div className="flex gap-2">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white w-1/2 px-3 py-2 rounded-md text-sm font-semibold"
                  onClick={() => handleApproveClick(req)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white w-1/2 px-3 py-2 rounded-md text-sm font-semibold"
                  onClick={() => handleReject(req._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ApproveModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleApprove}
        requestTitle={selectedRequest?.title}
        domainMembers={domainMembers}
      />
    </div>
  );
}
