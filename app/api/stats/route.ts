import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import ProjectModel from "@/model/Projects";
import RequestModel from "@/model/ProjectRequest";
import AnnouncementModel from "@/model/Announcement";

export async function GET() {
  try {
    await dbConnect();

    const [
      totalProjects,
      completedProjects,
      ongoingProjects,
      totalMembers,
      totalAdmins,
      totalLeads,
      totalProjectLeads,
      totalCoLeads,
      totalRequests,
      pendingRequests,
      contributionRequests,
      totalAnnouncements,
    ] = await Promise.all([
      ProjectModel.countDocuments(),
      ProjectModel.countDocuments({ badge: "completed" }),
      ProjectModel.countDocuments({ badge: "active" }),
      UserModel.countDocuments({ role: /member/i }),
      UserModel.countDocuments({ role: /admin/i }),
      UserModel.countDocuments({ role: /lead/i }),
      UserModel.countDocuments({ role: /projectlead/i }),
      UserModel.countDocuments({ role: /colead/i }),
      RequestModel.countDocuments(),
      RequestModel.countDocuments({ status: "Pending" }),
      ProjectModel.aggregate([
        { $unwind: "$requests" },
        { $match: { "requests.status": "Pending" } },
        { $count: "count" },
      ]).then((res) => (res[0]?.count || 0)),
      AnnouncementModel.countDocuments(),
    ]);

    const stats = [
      {
        title: "Total Projects",
        value: totalProjects,
        description: "Across All Domains",
        color: "from-slate-700 to-slate-900",
        accent: "from-blue-400 to-blue-600",
      },
      {
        title: "Total Admins",
        value: totalAdmins,
        description: "System Administrators",
        color: "from-gray-700 to-gray-900",
        accent: "from-emerald-400 to-emerald-600",
      },
      {
        title: "Total Domain Leads",
        value: totalLeads,
        description: "Managing Domains",
        color: "from-zinc-700 to-zinc-900",
        accent: "from-purple-400 to-purple-600",
      },
      {
        title: "Total Project Leads",
        value: totalProjectLeads,
        description: "Leading Projects",
        color: "from-neutral-700 to-neutral-900",
        accent: "from-orange-400 to-orange-600",
      },
      {
        title: "Total Assistant Leads",
        value: totalCoLeads,
        description: "Supporting Projects",
        color: "from-gray-700 to-gray-900",
        accent: "from-violet-400 to-violet-600",
      },
      {
        title: "Total Members",
        value: totalMembers,
        description: "Active Members",
        color: "from-stone-700 to-stone-900",
        accent: "from-pink-400 to-pink-600",
      },
      {
        title: "Ongoing Projects",
        value: ongoingProjects,
        description: "Currently Active",
        color: "from-zinc-700 to-zinc-900",
        accent: "from-yellow-400 to-yellow-600",
      },
      {
        title: "Completed Projects",
        value: completedProjects,
        description: "Successfully Finished",
        color: "from-gray-700 to-gray-900",
        accent: "from-teal-400 to-teal-600",
      },
      {
        title: "Total Announcements",
        value: totalAnnouncements,
        description: "Active Notifications",
        color: "from-neutral-700 to-neutral-900",
        accent: "from-cyan-400 to-cyan-600",
      },
      {
        title: "New Project Requests",
        value: pendingRequests,
        description: "Pending Approval",
        color: "from-stone-700 to-stone-900",
        accent: "from-red-400 to-red-600",
      },
      {
        title: "Contribution Requests",
        value: contributionRequests,
        description: "Awaiting Review",
        color: "from-slate-700 to-slate-900",
        accent: "from-green-400 to-green-600",
      },
    ];

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Failed to fetch member stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
