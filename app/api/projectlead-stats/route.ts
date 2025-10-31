export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import { authOptions } from "../auth/[...nextauth]/option";
import UserModel from "@/model/User";
import ProjectModel from "@/model/Projects";
import RequestModel from "@/model/ProjectRequest";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const projects = await ProjectModel.find({
      $or: [{ projectlead: user._id }, { colead: user._id }],
    })
      .populate("members", "name email") 
      .lean();

    const totalProjects = projects.length;
    const completedProjects = projects.filter(
      (p) => p.badge === "completed"
    ).length;

    const allMembers = new Set(
      projects.flatMap((p) =>
        Array.isArray(p.members)
          ? p.members.map((m: any) => m._id?.toString() ?? m.toString())
          : []
      )
    );
    const totalMembers = allMembers.size;

    const projectIds = projects.map((p) => p._id);
    const totalRequests = await RequestModel.countDocuments({
      project: { $in: projectIds },
    });

    return NextResponse.json({
      totalProjects,
      completedProjects,
      totalMembers,
      totalRequests,
      domain: user.domain || "General",
    });
  } catch (error) {
    console.error("Error fetching project lead stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch project lead stats" },
      { status: 500 }
    );
  }
}
