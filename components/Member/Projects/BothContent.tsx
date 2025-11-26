"use client";

import React, { useEffect, useState } from "react";
import { FaUsers, FaImage, FaCircle, FaGithub, FaGlobe } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

type Project = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  domain: string | string[];
  badge?: string; // optional because API may wrap or omit
  startDate?: Date;
  completionDate?: Date;
  projectlead?: { name: string } | string;
  colead?: { name: string } | string;
  members?: string[];
  membersCount?: number;
  technologies?: { id: string; name: string }[];
  githubLink?: string;
  liveDemo?: string;
};

type Props = {
  params: {
    projectId: string;
    Id: string;
  };
};

export default function ProjectPage({ params }: Props) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  const projectId = params.projectId ?? params.Id;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch project");
        const data = await res.json();
        // API returns { success: true, project } — normalize to the actual project object
        const actual = data?.project ?? data;
        setProject(actual);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="w-screen min-h-screen bg-gray-900 flex items-center justify-center text-xl text-gray-400">
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-screen min-h-screen bg-gray-900 flex items-center justify-center text-2xl text-red-400">
        Project not found!
      </div>
    );
  }

  // ✅ Safe destructuring after project is loaded
  const startDate = project.startDate ? new Date(project.startDate) : new Date();
  const targetDate = project.completionDate
    ? new Date(project.completionDate)
    : new Date();
  const currentDate = new Date();
  const totalDays = Math.max(
    1,
    Math.floor((targetDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  );
  const elapsedDays = Math.max(
    0,
    Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  );
  const remainingDays = Math.max(0, totalDays - elapsedDays);
  const progressPercentage = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));

  const getProjectLeadName = () =>
    typeof project.projectlead === "string"
      ? project.projectlead
      : project.projectlead?.name || "Not assigned";

  const getCoLeadName = () =>
    typeof project.colead === "string"
      ? project.colead
      : project.colead?.name || "Not assigned";

  // ✅ Handle Apply
  const handleApply = async () => {
    if (!project?._id) return toast.error("Project not loaded");
    try {
      const res = await fetch(`/api/projects/${project._id}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ projectId: project._id }),
      });

      if (res.ok) {
        setApplied(true);
        toast.success("Application sent successfully!");
      } else {
        const text = await res.text();
        console.error("Apply failed", res.status, text);
        toast.error(text || "Failed to send application!");
      }
    } catch (err: any) {
      console.error("Error applying:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-full min-h-screen py-6 overflow-x-hidden bg-gray-900 text-white">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center group">
            <span className="font-['Maven_Pro',sans-serif] font-bold text-[32px] tracking-[-0.5px]">
              {project.title}
            </span>
          </div>
          <div
            className={`px-6 py-2 rounded-full text-sm font-semibold shadow-lg ${
              project.badge === "active"
                ? "bg-indigo-700 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {(() => {
              const b = project.badge && typeof project.badge === 'string' ? project.badge : 'active';
              return b.charAt(0).toUpperCase() + b.slice(1);
            })()}
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 w-full">
          {/* LEFT SECTION */}
          <div className="xl:flex-[2_1_0%] w-full space-y-8">
            {/* IMAGE */}
            <div className="w-full h-72 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden flex items-center justify-center">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaImage className="text-2xl text-white" />
                  </div>
                  <span className="text-gray-300 text-lg font-medium">
                    No Image Available
                  </span>
                </div>
              )}
            </div>

            {/* DETAILS */}
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-700 rounded-full"></div>
                Project Details
              </h2>

              <p className="text-gray-300 leading-relaxed text-sm bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href={project.githubLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    project.githubLink
                      ? "bg-gray-800 hover:bg-gray-700 text-indigo-400"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FaGithub className="text-lg" />
                  {project.githubLink ? "GitHub Repository" : "GitHub Not Available"}
                </a>

                <a
                  href={project.liveDemo || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    project.liveDemo
                      ? "bg-gray-800 hover:bg-gray-700 text-indigo-400"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FaGlobe className="text-lg" />
                  {project.liveDemo ? "Live Demo" : "Live Demo Not Available"}
                </a>
              </div>
            </div>

            {/* TIMELINE */}
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <h2 className="font-semibold text-xl mb-4 flex items-center gap-3">
                <div className="w-1 h-6 bg-indigo-700 rounded-full"></div>
                Timeline
              </h2>

              <div className="space-y-4 bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3">
                  <FaCircle className="text-indigo-400 text-xs" />
                  <span className="text-gray-300 text-sm">
                    Start Date:{" "}
                    <span className="font-medium text-white">
                      {project.startDate
                        ? new Date(project.startDate).toLocaleDateString()
                        : "Not set"}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FaCircle className="text-indigo-400 text-xs" />
                  <span className="text-gray-300 text-sm">
                    Target Date:{" "}
                    <span className="font-medium text-white">
                      {project.completionDate
                        ? new Date(project.completionDate).toLocaleDateString()
                        : "Not set"}
                    </span>
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="pt-3 space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs font-semibold text-indigo-400">
                      {progressPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 border border-gray-700">
                    <div
                      className="h-full bg-indigo-700 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs mt-2 text-gray-400">
                    <span>
                      <span className="font-semibold text-indigo-400">{elapsedDays}</span>{" "}
                      days elapsed
                    </span>
                    <span>
                      <span className="font-semibold text-indigo-400">{remainingDays}</span>{" "}
                      days left
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="xl:flex-[1_1_0%] w-full space-y-8">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 sticky top-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-700 rounded-full"></div>
                Project Info
              </h3>

              <div className="space-y-6">
                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                  <span className="font-semibold text-gray-200 block mb-2">
                    Domain
                  </span>
                  <span className="text-white bg-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">
                    {Array.isArray(project.domain)
                      ? project.domain.join(", ")
                      : project.domain}
                  </span>
                </div>

                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                  <span className="font-semibold text-gray-200 block mb-3">
                    Leadership
                  </span>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaCircle className="text-indigo-400 text-xs" />
                      <span className="text-gray-400 text-sm">Project Lead:</span>
                      <span className="text-gray-200 font-medium">
                        {getProjectLeadName()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCircle className="text-indigo-400 text-xs" />
                      <span className="text-gray-400 text-sm">Co-Lead:</span>
                      <span className="text-gray-200 font-medium">
                        {getCoLeadName()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                  <span className="font-semibold text-gray-200 block mb-2">
                    Team Size
                  </span>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-indigo-400" />
                    <span className="text-gray-400 font-medium">
                      {project.membersCount || project.members?.length || 1} members
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleApply}
                    disabled={applied}
                    className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 shadow-md ${
                      applied
                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                        : "bg-indigo-700 hover:bg-indigo-600 text-white hover:shadow-indigo-500/25"
                    }`}
                  >
                    {applied ? "Application Sent" : "Apply to Join"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
