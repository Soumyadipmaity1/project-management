"use client";

import { FaUsers, FaImage, FaCircle, FaGithub, FaGlobe } from "react-icons/fa";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import mongoose from "mongoose";

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

    if (!mongoose.Types.ObjectId.isValid(projectId)) return null;

    const projectDoc = await ProjectModel.findById(projectId)
      .populate("projectlead", "name email role")
      .populate("colead", "name email role")
      .lean();

    if (!projectDoc) return null;

    const normalize = (doc: any): Project => ({
      ...doc,
      _id: String(doc._id),
      title: doc.title ?? "",
      description: doc.description ?? "",
      badge: doc.badge ?? "active",
      domain: Array.isArray(doc.domain) ? doc.domain : [doc.domain],
      image: doc.image
        ? doc.image.startsWith("http")
          ? doc.image
          : `${process.env.NEXTAUTH_URL || `${process.env.NEXT_PUBLIC_API_URL}`}${doc.image}`
        : "",
      membersCount: doc.members?.length ?? 0,
      githubLink: doc.githubLink ?? "",
      liveDemo: doc.liveDemo ?? "",
      projectlead:
        typeof doc.projectlead === "string"
          ? doc.projectlead
          : { name: doc.projectlead?.name ?? "Not assigned" },
      colead:
        typeof doc.colead === "string"
          ? doc.colead
          : { name: doc.colead?.name ?? "Not assigned" },
    });

    return normalize(projectDoc);
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function ProjectPage({ params }: Props) {
  const projectId = params.projectId ?? params.Id;
  if (!projectId)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-2xl font-semibold">
        ⚠️ Project ID missing
      </div>
    );

  const project = await getProjectById(projectId);
  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-2xl font-semibold">
        ❌ Project not found
      </div>
    );

  const startDate = new Date(project.startDate || new Date());
  const targetDate = new Date(project.completionDate || new Date());
  const elapsedDays = Math.max(
    0,
    Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  );
  const totalDays = Math.max(
    1,
    Math.floor((targetDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  );
  const remainingDays = Math.max(0, totalDays - elapsedDays);
  const progress = Math.min(100, (elapsedDays / totalDays) * 100);

  return (
    <div className="min-h-screen w-full px-6 py-10 bg-[#0b0b0f] text-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent tracking-tight">
            {project.title}
          </h1>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md ${
              project.badge === "active"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                : project.badge === "completed"
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            {project.badge.charAt(0).toUpperCase() + project.badge.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* LEFT CONTENT */}
          <div className="col-span-2 space-y-8">
            {/* IMAGE SECTION */}
            <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 shadow-lg">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-80 object-cover hover:scale-[1.02] transition-transform duration-300"
                />
              ) : (
                <div className="h-80 flex flex-col items-center justify-center text-gray-500">
                  <FaImage className="text-5xl mb-2 text-gray-600" />
                  No project image available
                </div>
              )}
            </div>

            {/* DETAILS CARD */}
            <div className="bg-gray-900/80 border border-gray-800 p-8 rounded-2xl backdrop-blur-sm shadow-md">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
                Project Details
              </h2>

              <p className="text-gray-300 leading-relaxed bg-gray-800/40 p-4 rounded-lg border border-gray-700 text-sm">
                {project.description}
              </p>

              {/* LINKS */}
              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href={project.githubLink || "#"}
                  target="_blank"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    project.githubLink
                      ? "bg-gray-800 hover:bg-gray-700 text-emerald-300"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FaGithub /> GitHub
                </a>
                <a
                  href={project.liveDemo || "#"}
                  target="_blank"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    project.liveDemo
                      ? "bg-gray-800 hover:bg-gray-700 text-emerald-300"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FaGlobe /> Live Demo
                </a>
              </div>
            </div>

            {/* TIMELINE */}
            <div className="bg-gray-900/80 border border-gray-800 p-8 rounded-2xl backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
                Timeline
              </h2>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Start Date:</span>{" "}
                  <span className="text-gray-200 font-medium">
                    {project.startDate
                      ? new Date(project.startDate).toLocaleDateString()
                      : "Not set"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Target Date:</span>{" "}
                  <span className="text-gray-200 font-medium">
                    {project.completionDate
                      ? new Date(project.completionDate).toLocaleDateString()
                      : "Not set"}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1 text-gray-400">
                  <span>Progress</span>
                  <span className="text-emerald-300 font-semibold">
                    {progress.toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>{elapsedDays} days elapsed</span>
                  <span>{remainingDays} days left</span>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
                Project Info
              </h3>

              <div className="space-y-5 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Domain</p>
                  <p className="font-medium bg-gradient-to-r from-emerald-700 to-teal-800 text-white inline-block px-3 py-1 rounded-lg">
                    {Array.isArray(project.domain)
                      ? project.domain.join(", ")
                      : project.domain}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 mb-2">Leadership</p>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-500">Lead:</span>{" "}
                      <span className="text-gray-200 font-medium">
                        {typeof project.projectlead === "string"
                          ? project.projectlead
                          : project.projectlead?.name}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-500">Co-Lead:</span>{" "}
                      <span className="text-gray-200 font-medium">
                        {typeof project.colead === "string"
                          ? project.colead
                          : project.colead?.name}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 mb-1">Team Size</p>
                  <p className="flex items-center gap-2 text-gray-200 font-medium">
                    <FaUsers className="text-emerald-300" />{" "}
                    {project.membersCount || project.members?.length || 1} members
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
