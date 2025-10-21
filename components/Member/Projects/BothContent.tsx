import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import mongoose from "mongoose";
import { FaUsers, FaImage, FaEdit, FaCircle } from 'react-icons/fa';

type Project = {
  _id: string;
  title: string;
  description: string;
  technologies?: { id: string; name: string }[];
  domain: string;
  badge: string;
  projectlead?: { name: string } | string;
  colead?: { name: string } | string;
  members?: string[];
  membersCount?: number;
  activities?: { id: string; description: string; time: string }[];
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
      console.warn('Invalid project ID:', projectId);
      return null;
    }

    console.log("Fetching project with ID:", projectId);
    
    const projectDoc = await ProjectModel.findById(projectId).lean();

    if (!projectDoc) {
      console.log('Project not found in database');
      return null;
    }

    console.log('Project found:', projectDoc.title);

    let populatedDoc: any = projectDoc;
    const projectLeadField = (projectDoc as any).projectlead;
    if (projectLeadField) {
      const leadIdString =
        typeof projectLeadField === 'string'
          ? projectLeadField
          : projectLeadField && (projectLeadField as any)._id
          ? String((projectLeadField as any)._id)
          : String(projectLeadField);

      if (leadIdString && mongoose.Types.ObjectId.isValid(leadIdString)) {
        try {
          const populated = await ProjectModel.findById(projectId)
            .populate("projectlead", "name email role")
            .lean();
          if (populated) populatedDoc = populated;
        } catch (populateError) {
          console.warn('Failed to populate projectlead, using unpopulated data');
        }
      }
    }

    const normalize = (doc: any): Project => {
      const out: any = { ...doc };
      out._id = String(doc._id);

      if (Array.isArray(doc.technologies)) {
        out.technologies = doc.technologies.map((t: any) => ({
          id: t?.id ? String(t.id) : t?._id ? String(t._id) : String(t?.name ?? ''),
          name: t?.name ?? '',
        }));
      }

      if (doc.projectlead) {
        if (typeof doc.projectlead === 'string') {
          out.projectlead = doc.projectlead.trim() === '' ? 'Not assigned' : doc.projectlead;
        } else if (doc.projectlead.name) {
          out.projectlead = { name: doc.projectlead.name };
        } else if (doc.projectlead._id) {
          out.projectlead = String(doc.projectlead._id);
        } else {
          out.projectlead = String(doc.projectlead);
        }
      }

      if (doc.colead) {
        if (typeof doc.colead === 'string') {
          out.colead = doc.colead.trim() === '' ? 'Not assigned' : doc.colead;
        } else if (doc.colead.name) {
          out.colead = { name: doc.colead.name };
        } else if (doc.colead._id) {
          out.colead = String(doc.colead._id);
        } else {
          out.colead = String(doc.colead);
        }
      }

      if (Array.isArray(doc.activities)) {
        out.activities = doc.activities.map((a: any) => ({
          id: a?.id ? String(a.id) : a?._id ? String(a._id) : '',
          description: a?.description ?? '',
          time: a?.time ?? '',
        }));
      }

      out.members = doc.members;
      out.membersCount = doc.membersCount;

      out.title = doc.title ?? '';
      out.description = doc.description ?? '';
      out.domain = doc.domain ?? '';
      out.badge = doc.badge ?? '';

      return out as Project;
    };

    return normalize(populatedDoc);
  } catch (error) {
    console.error("Error fetching project from DB:", error);
    
    try {
      const fallbackDoc = await ProjectModel.findById(projectId).lean();
      if (!fallbackDoc) return null;
      const normalizeFallback = (doc: any): Project => {
        const out: any = { ...doc };
        out._id = String(doc._id);
        if (Array.isArray(doc.technologies)) {
          out.technologies = doc.technologies.map((t: any) => ({
            id: t?.id ? String(t.id) : t?._id ? String(t._id) : String(t?.name ?? ''),
            name: t?.name ?? '',
          }));
        }
        if (doc.projectlead) {
          if (typeof doc.projectlead === 'string') {
            out.projectlead = doc.projectlead.trim() === '' ? 'Not assigned' : doc.projectlead;
          } else if (doc.projectlead.name) {
            out.projectlead = { name: doc.projectlead.name };
          } else if (doc.projectlead._id) {
            out.projectlead = String(doc.projectlead._id);
          } else {
            out.projectlead = String(doc.projectlead);
          }
        }
        if (doc.colead) {
          if (typeof doc.colead === 'string') {
            out.colead = doc.colead.trim() === '' ? 'Not assigned' : doc.colead;
          } else if (doc.colead.name) {
            out.colead = { name: doc.colead.name };
          } else if (doc.colead._id) {
            out.colead = String(doc.colead._id);
          } else {
            out.colead = String(doc.colead);
          }
        }
        if (Array.isArray(doc.activities)) {
          out.activities = doc.activities.map((a: any) => ({
            id: a?.id ? String(a.id) : a?._id ? String(a._id) : '',
            description: a?.description ?? '',
            time: a?.time ?? '',
          }));
        }
        out.members = doc.members;
        out.membersCount = doc.membersCount;
        out.title = doc.title ?? '';
        out.description = doc.description ?? '';
        out.domain = doc.domain ?? '';
        out.badge = doc.badge ?? '';
        return out as Project;
      };
      return normalizeFallback(fallbackDoc);
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
      return null;
    }
  }
}

export default async function ProjectPage({ params }: Props) {
  const projectId = params.projectId ?? params.Id;
  
  console.log('🔍 ProjectPage - Resolved projectId:', projectId, 'Raw params:', params);

  if (!projectId) {
    console.error('No projectId found in params');
    return (
      <div className="w-screen min-h-screen bg-gray-900 flex items-center justify-center text-3xl text-red-400">
        Project ID not provided!
      </div>
    );
  }

  const project = await getProjectById(projectId);
  console.log(' Project data received:', project);

  if (!project) {
    return (
      <div className="w-screen min-h-screen bg-gray-900 flex items-center justify-center text-3xl text-red-400">
        Project not found!
      </div>
    );
  }

  const startDate = new Date('2025-09-15');
  const targetDate = new Date('2025-11-30');
  const currentDate = new Date();
  const totalDays = Math.floor((targetDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(0, totalDays - elapsedDays);
  const progressPercentage = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));

  const getTeamLeadName = () => {
    if (!project.projectlead) return 'Not assigned';
    if (typeof project.projectlead === 'string') {
      // Handle empty strings and invalid IDs
      return project.projectlead.trim() === '' ? 'Not assigned' : project.projectlead;
    }
    return project.projectlead?.name || 'Not assigned';
  };

  // Helper function to get co-lead name with safe fallbacks
  const getCoLeadName = () => {
    if (!project.colead) return 'Not assigned';
    if (typeof project.colead === 'string') {
      // Handle empty strings and invalid IDs
      return project.colead.trim() === '' ? 'Not assigned' : project.colead;
    }
    return project.colead?.name || 'Not assigned';
  };

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
              project.badge === 'active' ? 'bg-indigo-700 text-white' : 'bg-gray-700 text-gray-200'
            }`}
          >
            {project.badge.charAt(0).toUpperCase() + project.badge.slice(1)}
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 w-full">
          {/* LEFT SECTION */}
          <div className="xl:flex-[2_1_0%] w-full space-y-8">
            {/* IMAGE */}
            <div className="w-full h-72 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaImage className="text-2xl text-white" />
                </div>
                <span className="text-gray-300 text-lg font-medium">Project Preview</span>
              </div>
            </div>

            {/* DETAILS */}
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-700 rounded-full"></div>
                Project Details
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-gray-200 text-lg">Description</h3>
                  <p className="text-gray-300 leading-relaxed text-sm bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                    {project.description}
                  </p>
                </div>

                {project.technologies?.length ? (
                  <div>
                    <h3 className="font-semibold mb-3 text-gray-200 text-lg">Tech Stack</h3>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech.id || tech.name}
                          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-indigo-900/50 text-indigo-200 border-indigo-800/50"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* TIMELINE */}
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <h2 className="font-semibold text-xl mb-4 text-white flex items-center gap-3">
                <div className="w-1 h-6 bg-indigo-700 rounded-full"></div> Timeline
              </h2>
              <div className="space-y-4 bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3">
                  <FaCircle className="text-indigo-400 text-xs" />
                  <span className="text-gray-300 text-sm">
                    Start Date: <span className="font-medium text-white">2025-09-15</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCircle className="text-indigo-400 text-xs" />
                  <span className="text-gray-300 text-sm">
                    Target Date: <span className="font-medium text-white">2025-11-30</span>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="pt-3 space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs font-semibold text-indigo-300">
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
                      <span className="font-semibold text-indigo-300">{elapsedDays}</span> days elapsed
                    </span>
                    <span>
                      <span className="font-semibold text-indigo-300">{remainingDays}</span> days left
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="xl:flex-[1_1_0%] w-full space-y-8">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 sticky top-8">
              <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-700 rounded-full"></div>
                Project Info
              </h3>

              <div className="space-y-6">
                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                  <span className="font-semibold text-gray-200 block mb-2">Domain</span>
                  <span className="text-gray-300 bg-indigo-900/30 px-3 py-1 rounded-lg text-sm font-medium">
                    {project.domain}
                  </span>
                </div>

                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                  <span className="font-semibold text-gray-200 block mb-3">Leadership</span>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaCircle className="text-indigo-400 text-xs" />
                      <span className="text-gray-400 text-sm">Project Lead:</span>
                      <span className="text-gray-200 font-medium">
                        {getTeamLeadName()}
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
                  <span className="font-semibold text-gray-200 block mb-2">Team Size</span>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-indigo-400" />
                    <span className="text-gray-300 font-medium">
                      {project.membersCount || project.members?.length || 1} members
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                <div className="w-1 h-8 bg-indigo-700 rounded-full"></div>
                Recent Activity
              </h3>
              <div className="space-y-4">
                {project.activities?.length ? (
                  project.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700"
                    >
                      <FaEdit className="text-2xl text-indigo-400 mt-1" />
                      <div className="flex-1">
                        <div className="text-gray-200 font-medium mb-1">{activity.description}</div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-sm text-center py-8 bg-gray-800/20 rounded-xl border border-gray-700">
                    No recent activity.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}