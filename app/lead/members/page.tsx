"use client";
import React, { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaUser,
  FaSearch,
  FaEye,
  FaTrash,
  FaArrowUp,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

interface TeamMember {
  _id: string;
  name: string;
  profilePhoto?: string;
  githubId?: string;
  linkedinId?: string;
  domain: string;
  email?: string;
}

export default function TeamMembers() {
  const router = useRouter();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);
  const [showPromoteDialog, setShowPromoteDialog] = useState(false);
  const [memberToPromote, setMemberToPromote] = useState<TeamMember | null>(null);
  const [promoteRole, setPromoteRole] = useState<"ProjectLead" | "CoLead" | "Member">("Member");

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/domain_members");
      if (!res.ok) throw new Error("Failed to fetch members");
      const data = await res.json();
      setAllMembers(data);
      setTeam(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    let filtered = [...allMembers];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email?.toLowerCase().includes(q)
      );
    }
    setTeam(filtered);
  }, [searchQuery, allMembers]);

  const handleViewProfile = (memberId: string) => {
    router.push(`/lead/members/${memberId}`);
  };

  const handleRemoveClick = (member: TeamMember) => {
    setMemberToRemove(member);
    setShowRemoveDialog(true);
  };

  const confirmRemove = async () => {
    if (!memberToRemove) return;
    try {
      const res = await fetch(`/api/domain_members/${memberToRemove._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove member");
      setAllMembers((prev) =>
        prev.filter((m) => m._id !== memberToRemove._id)
      );
      toast.success(`${memberToRemove.name} removed successfully`);
      setShowRemoveDialog(false);
      setMemberToRemove(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove member");
    }
  };

  const handlePromoteClick = (member: TeamMember) => {
    setMemberToPromote(member);
    setPromoteRole("Member");
    setShowPromoteDialog(true);
  };

  const confirmPromote = async () => {
    if (!memberToPromote) return;
    try {
      const res = await fetch(`/api/domain_members/${memberToPromote._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: promoteRole }),
      });
      if (!res.ok) throw new Error("Failed to promote member");
      toast.success(
        `${memberToPromote.name} ${
          promoteRole === "ProjectLead"
            ? "promoted to Project Lead"
            : promoteRole === "CoLead"
            ? "promoted to Co-Lead"
            : "assigned as Member"
        }`
      );
      setShowPromoteDialog(false);
      setMemberToPromote(null);
      fetchMembers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update role");
    }
  };

  const cancelRemove = () => {
    setShowRemoveDialog(false);
    setMemberToRemove(null);
  };

  const cancelPromote = () => {
    setShowPromoteDialog(false);
    setMemberToPromote(null);
  };

  return (
    <div className="min-h-screen py-6 px-4">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="font-mclaren text-[36px] mb-3 font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent">
            Members
          </h2>
          <p className="text-slate-400 text-lg font-medium font-mclaren">
            View and manage team members in your domain
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Search Members
        </label>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {team.length === 0 ? (
          <div className="w-full text-center py-12 text-gray-400">
            No members found matching your criteria
          </div>
        ) : (
          team.map((member) => (
            <div
              key={member._id}
              className="bg-gray-900 border border-gray-800 rounded-lg flex flex-col items-center px-6 py-4 shadow-xl hover:shadow-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300"
            >
              {member.profilePhoto ? (
                <img
                  src={member.profilePhoto}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mb-3 ring-2 ring-emerald-500/30"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-3 ring-2 ring-emerald-500/30">
                  <FaUser size={24} className="text-emerald-400" />
                </div>
              )}

              <div className="text-lg font-semibold text-white">{member.name}</div>
              {member.email && (
                <div className="text-sm text-gray-400 mb-1">{member.email}</div>
              )}
              {member.githubId && (
                <div className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                  <FaGithub size={12} />
                  <span>@{member.githubId}</span>
                </div>
              )}

              <div className="flex flex-col gap-2 w-full mt-3">
                <button
                  onClick={() => handleViewProfile(member._id)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:transform hover:scale-105"
                >
                  <FaEye className="text-xs" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={() => handlePromoteClick(member)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:transform hover:scale-105"
                >
                  <FaArrowUp className="text-xs" />
                  <span>Change Role</span>
                </button>

                <button
                  onClick={() => handleRemoveClick(member)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:transform hover:scale-105"
                >
                  <FaTrash className="text-xs" />
                  <span>Remove</span>
                </button>

                <div className="flex gap-2 justify-center mt-2">
                  {member.githubId && (
                    <a
                      href={`https://github.com/${member.githubId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-emerald-600 hover:scale-110 transition-all duration-200"
                      title="GitHub"
                    >
                      <FaGithub size={18} />
                    </a>
                  )}
                  {member.linkedinId && (
                    <a
                      href={`https://linkedin.com/in/${member.linkedinId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-emerald-600 hover:scale-110 transition-all duration-200"
                      title="LinkedIn"
                    >
                      <FaLinkedin size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Remove Dialog */}
      {showRemoveDialog && memberToRemove && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Remove Member</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-emerald-400">
                {memberToRemove.name}
              </span>{" "}
              from the domain? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelRemove}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemove}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-red-500/25"
              >
                Remove Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Promote Dialog */}
      {showPromoteDialog && memberToPromote && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Change Member Role</h3>
            <p className="text-gray-300 mb-4">
              Select new role for{" "}
              <span className="font-semibold text-emerald-400">
                {memberToPromote.name}
              </span>
            </p>

            <div className="mb-6 space-y-3">
              {["projectlead", "colead", "member"].map((role) => (
                <label key={role} className="flex items-center gap-2 text-gray-200">
                  <input
                    type="radio"
                    name="promoteRole"
                    value={role}
                    checked={promoteRole === role}
                    onChange={() =>
                      setPromoteRole(role as "ProjectLead" | "CoLead" | "Member")
                    }
                  />
                  {role === "projectlead"
                    ? "Project Lead"
                    : role === "colead"
                    ? "Co-Lead"
                    : "Member"}
                </label>
              ))}
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelPromote}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmPromote}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-500/25"
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
