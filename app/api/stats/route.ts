// export const dynamic = "force-dynamic";

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import dbConnect from "@/lib/db";
// import UserModel from "@/model/User";
// import ProjectModel from "@/model/Projects";
// import RequestModel from "@/model/ProjectRequest";
// import AnnouncementModel from "@/model/Announcement";
// import { authOptions } from "../auth/[...nextauth]/option";

// export async function GET() {
//   try {
//     await dbConnect();

//     const session = await getServerSession(authOptions);
//     if (!session || !session.user?.email) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const user = await UserModel.findOne({ email: session.user.email });
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }
//     const totalProjects = await ProjectModel.countDocuments();
//     const completedProjects = await ProjectModel.countDocuments({ badge: "completed" });
//     const activeProjects = await ProjectModel.countDocuments({ badge: "active" });
//     const totalMembers = await UserModel.countDocuments({ role: /member/i });
//     const totalLeads = await UserModel.countDocuments({ role: /lead/i });
//     const totalProjectLeads = await UserModel.countDocuments({ role: /projectlead/i });

//     let data: any = {};
//     const role = user.role?.toLowerCase();

//     if (role === "admin") {
//       data = {
//         role: "Admin",
//         totalProjects,
//         completedProjects,
//         activeProjects,
//         totalMembers,
//         totalLeads,
//         totalProjectLeads,
//         totalAnnouncements: await AnnouncementModel.countDocuments(),
//         pendingRequests: await RequestModel.countDocuments({ status: "Pending" }),
//       };
//     }

//     else if (role === "lead") {
//       const projects = await ProjectModel.find({ domain: { $in: user.domain } });
//       data = {
//         role: "Lead",
//         domain: user.domain,
//         totalProjects: projects.length,
//         activeProjects: projects.filter((p) => p.badge === "active").length,
//         completedProjects: projects.filter((p) => p.badge === "completed").length,
//         domainMembers: await UserModel.countDocuments({ domain: { $in: user.domain }, role: /member/i }),
//         pendingReviews: await RequestModel.countDocuments({ domain: { $in: user.domain }, status: "Pending" }),
//       };
//     }

//     else if (role === "projectlead" || role === "colead") {
//       const projects = await ProjectModel.find({
//         $or: [{ projectlead: user._id }, { colead: user._id }],
//       });
//       data = {
//         role: "Project Lead",
//         totalProjects: projects.length,
//         activeProjects: projects.filter((p) => p.badge === "active").length,
//         completedProjects: projects.filter((p) => p.badge === "completed").length,
//         teamMembers: projects.reduce((sum, p) => sum + (p.members?.length || 0), 0),
//         pendingRequests: await RequestModel.countDocuments({
//           project: { $in: projects.map((p) => p._id) },
//           status: "Pending",
//         }),
//       };
//     }

//     else {
//       const projects = await ProjectModel.find({ members: user._id });
//       data = {
//         role: "Member",
//         totalProjects: projects.length,
//         activeProjects: projects.filter((p) => p.badge === "active").length,
//         completedProjects: projects.filter((p) => p.badge === "completed").length,
//         domain: user.domain || "General",
//       };
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Failed to fetch stats:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch stats" },
//       { status: 500 }
//     );
//   }
// }


export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import ProjectModel from "@/model/Projects";
import RequestModel from "@/model/ProjectRequest";
import AnnouncementModel from "@/model/Announcement";
import { authOptions } from "../auth/[...nextauth]/option";
import { corsResponse, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email)
      return corsResponse({ error: "Unauthorized" }, 401);

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) return corsResponse({ error: "User not found" }, 404);

    const totalProjects = await ProjectModel.countDocuments();
    const completedProjects = await ProjectModel.countDocuments({ badge: "completed" });
    const activeProjects = await ProjectModel.countDocuments({ badge: "active" });
    const totalMembers = await UserModel.countDocuments({ role: /member/i });
    const totalLeads = await UserModel.countDocuments({ role: /lead/i });
    const totalProjectLeads = await UserModel.countDocuments({ role: /projectlead/i });

    let data: any = {};
    const role = user.role?.toLowerCase();

    if (role === "admin") {
      data = {
        role: "Admin",
        totalProjects,
        completedProjects,
        activeProjects,
        totalMembers,
        totalLeads,
        totalProjectLeads,
        totalAnnouncements: await AnnouncementModel.countDocuments(),
        pendingRequests: await RequestModel.countDocuments({ status: "Pending" }),
      };
    } else if (role === "lead") {
      const projects = await ProjectModel.find({ domain: { $in: user.domain } });
      data = {
        role: "Lead",
        domain: user.domain,
        totalProjects: projects.length,
        activeProjects: projects.filter((p) => p.badge === "active").length,
        completedProjects: projects.filter((p) => p.badge === "completed").length,
        domainMembers: await UserModel.countDocuments({ domain: { $in: user.domain }, role: /member/i }),
        pendingReviews: await RequestModel.countDocuments({ domain: { $in: user.domain }, status: "Pending" }),
      };
    } else if (role === "projectlead" || role === "colead") {
      const projects = await ProjectModel.find({
        $or: [{ projectlead: user._id }, { colead: user._id }],
      });
      data = {
        role: "Project Lead",
        totalProjects: projects.length,
        activeProjects: projects.filter((p) => p.badge === "active").length,
        completedProjects: projects.filter((p) => p.badge === "completed").length,
        teamMembers: projects.reduce((sum, p) => sum + (p.members?.length || 0), 0),
        pendingRequests: await RequestModel.countDocuments({
          project: { $in: projects.map((p) => p._id) },
          status: "Pending",
        }),
      };
    } else {
      const projects = await ProjectModel.find({ members: user._id });
      data = {
        role: "Member",
        totalProjects: projects.length,
        activeProjects: projects.filter((p) => p.badge === "active").length,
        completedProjects: projects.filter((p) => p.badge === "completed").length,
        domain: user.domain || "General",
      };
    }

    return corsResponse(data, 200);
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return corsResponse({ error: "Failed to fetch stats" }, 500);
  }
}
