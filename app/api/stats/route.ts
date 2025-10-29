import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Project from "@/model/Projects";
import ProjectRequest from "@/model/ProjectRequest";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "./../auth/[...nextauth]/option";
import { act } from "react";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const domainFilter = { domain: user.domain };

    const totalProjects = await Project.countDocuments(domainFilter);
    const completedProjects = await Project.countDocuments({
      ...domainFilter,
      badge: "completed",
    });
    const activeProjects = await Project.countDocuments({
      ...domainFilter,
      badge: "active",
    });

    const pendingReviews = await ProjectRequest.countDocuments({
      ...domainFilter,
      status: "Pending",
    });

    const requestStats = await ProjectRequest.aggregate([
      { $match: { domain: user.domain } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const domainMembers = await UserModel.countDocuments({ domain: user.domain });

    return NextResponse.json(
      {
        domain: user.domain,
        totalProjects,
        completedProjects,
        pendingReviews,
        domainMembers,
        activeProjects,
        requestStats, 
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Dashboard stats fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
