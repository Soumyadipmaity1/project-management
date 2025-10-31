import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import UserModel from "@/model/User";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const lead = await UserModel.findOne({ email: session.user.email });
  if (!lead) return NextResponse.json({ message: "Lead not found" }, { status: 404 });

  const projects = await ProjectModel.find({ lead: lead._id })
    .populate("requests.user", "name email profilePic")
    .lean();

  const pending = projects.flatMap((p: any) =>
    (p.requests || [])
      .filter((r: any) => r.status === "Pending")
      .map((r: any) => ({
        projectId: p._id,
        projectTitle: p.title,
        user: r.user,
        status: r.status,
        requestId: r._id, 
      }))
  );

  return NextResponse.json(pending);
}

export async function POST(req: Request) {
  await dbConnect();
  const { projectId, requestId, action } = await req.json();

  if (!projectId || !requestId || !["approve", "reject"].includes(action))
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });

  const project = await ProjectModel.findById(projectId);
  if (!project)
    return NextResponse.json({ message: "Project not found" }, { status: 404 });

  const request = project.requests.find(
    (r: any) => r._id.toString() === requestId
  );

  if (!request)
    return NextResponse.json({ message: "Request not found" }, { status: 404 });

  if (action === "approve") {
    if (!project.members.includes(request.user)) {
      project.members.push(request.user);
    }
  }

  project.requests = project.requests.filter(
    (r: any) => r._id.toString() !== requestId
  );

  await project.save();

  return NextResponse.json({
    success: true,
    message: `Request ${action}d successfully`,
  });
}
