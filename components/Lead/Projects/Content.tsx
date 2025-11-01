"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import mongoose from "mongoose";
import { FaUsers, FaImage, FaCircle, FaGithub, FaGlobe } from "react-icons/fa";

type Project = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  domain: string | string[];
  badge: string;
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

async function getProjectById(projectId: string): Promise<Project | null> {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      console.warn("Invalid project ID:", projectId);
      return null;
    }

    const projectDoc = await ProjectModel.findById(projectId)
      .populate("projectlead", "name email role")
      .populate("colead", "name email role")
      .lean();

    if (!projectDoc) return null;

    const normalize = (doc: any): Project => {
      const out: any = { ...doc };
      out._id = String(doc._id);
      out.title = doc.title ?? "";
      out.description = doc.description ?? "";
      out.badge = doc.badge ?? "";
      out.domain = Array.isArray(doc.domain)
        ? doc.domain.join(", ")
        : doc.domain ?? "";
      out.startDate = doc.startDate ? new Date(doc.startDate) : null;
      out.image = doc.image
        ? doc.image.startsWith("http")
          ? doc.image
          // : `${process.env.NEXTAUTH_URL || }${doc.image}`
          : `${process.env.NEXTAUTH_URL || "http://localhost:3000"}${doc.image}`
        : "";
      out.completionDate = doc.completionDate ? new Date(doc.completionDate) : null;
      out.members = doc.members ?? [];
      out.membersCount = doc.membersCount ?? doc.members?.length ?? 0;
      out.githubLink = doc.githubLink ?? "";
      out.liveDemo = doc.liveDemo ?? "";

      if (Array.isArray(doc.technologies)) {
        out.technologies = doc.technologies.map((t: any) => ({
          id: String(t._id || t.id || t.name),
          name: t.name ?? "",
        }));
      }

      if (doc.projectlead) {
        out.projectlead =
          typeof doc.projectlead === "string"
            ? doc.projectlead
            : { name: doc.projectlead?.name ?? "Not assigned" };
      }

      if (doc.colead) {
        out.colead =
          typeof doc.colead === "string"
            ? doc.colead
            : { name: doc.colead?.name ?? "Not assigned" };
      }

      return out as Project;
    };

    return normalize(projectDoc);
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function ProjectPage({ params }: Props) {
  const projectId = params.projectId ?? params.Id;
  if (!projectId) {
    return (
      <div className="w-screen min-h-screen bg-gray-900 flex items-center justify-center text-3xl text-red-400">
        Project ID not provided!
      </div>
    );
  }

  const project = await getProjectById(projectId);
  if (!project) {
    return (
      <div className="w-screen min-h-screen bg-gray-900 flex items-center justify-center text-3xl text-red-400">
        Project not found!
      </div>
    );
  }

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

  return (
    <div className="w-full min-h-screen py-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
          <div className="text-white flex items-center group">
            <span className="font-['Maven_Pro',sans-serif] font-bold text-[32px] tracking-[-0.5px]">
              {project.title}
            </span>
          </div>
          <div
            className={`px-6 py-2 rounded-full text-sm font-semibold shadow-lg ${
              project.badge === "active"
                ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {project.badge.charAt(0).toUpperCase() + project.badge.slice(1)}
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
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                Project Details
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-gray-200 text-lg">
                    Description
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                    {project.description}
                  </p>
                </div>

                {/* 🔹 GitHub & Live Demo Links */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <a
                    href={project.githubLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      project.githubLink
                        ? "bg-gray-800 hover:bg-gray-700 text-emerald-300"
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
                        ? "bg-gray-800 hover:bg-gray-700 text-emerald-300"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <FaGlobe className="text-lg" />
                    {project.liveDemo ? "Live Demo" : "Live Demo Not Available"}
                  </a>
                </div>
              </div>
            </div>

            {/* TIMELINE */}
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <h2 className="font-semibold text-xl mb-4 text-white flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                Timeline
              </h2>
              {/* Progress & timeline kept same */}
              <div className="space-y-4 bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3">
                  <FaCircle className="text-emerald-300 text-xs" />
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
                  <FaCircle className="text-emerald-300 text-xs" />
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
                    <span className="text-xs font-semibold text-emerald-300">
                      {progressPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 border border-gray-700">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs mt-2 text-gray-400">
                    <span>
                      <span className="font-semibold text-emerald-300">{elapsedDays}</span>{" "}
                      days elapsed
                    </span>
                    <span>
                      <span className="font-semibold text-emerald-300">{remainingDays}</span>{" "}
                      days left
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (unchanged) */}
          <div className="xl:flex-[1_1_0%] w-full space-y-8">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 sticky top-8">
              <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                Project Info
              </h3>

              <div className="space-y-6">
                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                  <span className="font-semibold text-gray-200 block mb-2">
                    Domain
                  </span>
                  <span className="text-white bg-gradient-to-r from-emerald-700 to-teal-800 px-3 py-1 rounded-lg text-sm font-medium">
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
                      <FaCircle className="text-emerald-300 text-xs" />
                      <span className="text-gray-400 text-sm">Project Lead:</span>
                      <span className="text-gray-200 font-medium">
                        {getProjectLeadName()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCircle className="text-emerald-300 text-xs" />
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
                    <FaUsers className="text-emerald-300" />
                    <span className="text-gray-300 font-medium">
                      {project.membersCount || project.members?.length || 1} members
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
