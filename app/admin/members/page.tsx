"use client";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaSearch, FaTimes } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";


const fetchWithCred = (input: RequestInfo, init?: RequestInit) => {
	return fetch(input, { credentials: 'include', ...(init || {}) });
};

function MemberCard({ member, onPromote, onDelete }: any) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-neutral-100">{member.name}</h3>
          <p className="text-sm text-neutral-300">{member.email}</p>
        </div>

        <div className="space-y-2">
          <div>
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
              Role
            </span>
            <p className="text-sm text-neutral-100">{member.role || "Member"}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
              Domain
            </span>
            <p className="text-sm text-neutral-100">{member.domain || "N/A"}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
              Projects
            </span>
            <p className="text-sm text-neutral-100">
              {member.projects?.length
                ? member.projects.map((p: any) => p.projectName || p.title).join(", ")
                : "None"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {member.githubId && (
            <a
              href={member.githubId}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-neutral-600 transition-colors"
            >
              <FaGithub size={16} />
            </a>
          )}
          {member.linkedinId && (
            <a
              href={member.linkedinId}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <FaLinkedin size={16} />
            </a>
          )}
        </div>

        <div className="flex space-x-2 pt-3 border-t border-neutral-800">
          <button
            onClick={() => onPromote(member)}
            className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            Promote
          </button>
          <button
            onClick={() => onDelete(member)}
            className="flex-1 bg-rose-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-rose-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function PromoteDialog({ member, onClose, onConfirm }: any) {
  const [selectedRole, setSelectedRole] = useState("");

  if (!member) return null;

  const handleConfirm = () => {
    if (!selectedRole) return toast.error("Please select a role");
    onConfirm(selectedRole);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-neutral-800 p-6 rounded-lg w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Promote Member</h2>
          <button onClick={onClose}>
            <FaTimes className="text-neutral-400 hover:text-white" />
          </button>
        </div>

        <p className="text-neutral-300 mb-4">
          Promote <span className="font-semibold">{member.name}</span> to:
        </p>

        <div className="space-y-3 mb-6">
          {["Lead", "projectlead"].map((role) => (
            <label key={role} className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value={role}
                onChange={(e) => setSelectedRole(e.target.value)}
                checked={selectedRole === role}
              />
              <span className="text-neutral-200">{role}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-neutral-600 text-white py-2 rounded-md hover:bg-neutral-500"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteDialog({ member, onClose, onConfirm }: any) {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-neutral-800 p-6 rounded-lg w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Delete Member</h2>
          <button onClick={onClose}>
            <FaTimes className="text-neutral-400 hover:text-white" />
          </button>
        </div>

        <p className="text-neutral-300 mb-6">
          Are you sure you want to remove{" "}
          <span className="font-semibold">{member.name}</span>?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-neutral-600 text-white py-2 rounded-md hover:bg-neutral-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AllMembers() {
  const [members, setMembers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [promoteMember, setPromoteMember] = useState<any>(null);
  const [deleteMember, setDeleteMember] = useState<any>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetchWithCred(`${process.env.NEXT_PUBLIC_API_URL}/api/allmembers`, { cache: "no-store" });
        const data = await res.json();
        setMembers(data);
      } catch {
        toast.error("Failed to fetch members");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handlePromote = async (role: string) => {
    if (!promoteMember) return;
    try {
      const res = await fetchWithCred(`${process.env.NEXT_PUBLIC_API_URL}/api/allmembers/${promoteMember._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) throw new Error();
      toast.success(`${promoteMember.name} promoted to ${role}`);
      setMembers((prev) =>
        prev.map((m) =>
          m._id === promoteMember._id ? { ...m, role } : m
        )
      );
      setPromoteMember(null);
    } catch {
      toast.error("Failed to promote member");
    }
  };

  const handleDelete = async () => {
    if (!deleteMember) return;
    try {
      const res = await fetchWithCred(`${process.env.NEXT_PUBLIC_API_URL}/api/allmembers/${deleteMember._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast.success(`${deleteMember.name} deleted`);
      setMembers((prev) => prev.filter((m) => m._id !== deleteMember._id));
      setDeleteMember(null);
    } catch {
      toast.error("Failed to delete member");
    }
  };

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        Loading members...
      </div>
    );

  return (
    <div className="min-h-screen py-6 px-4">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-bold text-white">Members</h1>
      <p className="text-neutral-300 text-lg mb-8">
        Manage all users except admins
      </p>

      {/* Search */}
      <div className="max-w-md mb-8">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-700 rounded-md text-neutral-100 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Members */}
      {filteredMembers.length === 0 ? (
        <p className="text-neutral-500 text-center mt-20">
          No members found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard
              key={member._id}
              member={member}
              onPromote={() => setPromoteMember(member)}
              onDelete={() => setDeleteMember(member)}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      {promoteMember && (
        <PromoteDialog
          member={promoteMember}
          onClose={() => setPromoteMember(null)}
          onConfirm={handlePromote}
        />
      )}
      {deleteMember && (
        <DeleteDialog
          member={deleteMember}
          onClose={() => setDeleteMember(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
