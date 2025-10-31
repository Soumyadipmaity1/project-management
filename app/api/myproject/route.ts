export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import UserModel from "@/model/User";
import { authOptions } from "../auth/[...nextauth]/option";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const myProjects = await ProjectModel.find({
      $or: [{ projectlead: user._id }, { colead: user._id }],
    })
      .populate("projectlead", "name email")
      .populate("colead", "name email")
      .populate("members", "name email")
      .lean();

    const formatted = myProjects.map((p: any) => ({
      _id: p._id.toString(),
      title: p.title,
      description: p.description,
      domain: p.domain,
      projectlead: p.projectlead ? p.projectlead.name : "N/A",
      colead: p.colead ? p.colead.name : "N/A",
      github: p.github || "",
      liveDemo: p.liveDemo || "",
      badge: p.badge || "active",
      image: p.image || "",
      membersCount: Array.isArray(p.members) ? p.members.length : 0,
      startDate: p.startDate,
      completionDate: p.completionDate,
      createdAt: p.createdAt,
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error("Error fetching my projects:", err);
    return NextResponse.json(
      { error: "Failed to fetch your projects" },
      { status: 500 }
    );
  }
}
