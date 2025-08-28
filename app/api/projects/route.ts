import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { canProject } from "@/lib/permissions";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import { authOptions } from "../auth/[...nextauth]/option";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const projects = await ProjectModel.find().sort({ createdAt: -1 });
    return NextResponse.json(projects.map(p => ({ ...p.toObject(), _id: p._id.toString() })));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ message: "Error fetching projects", error }, { status: 500 });
  }
}

// In your API route (e.g., /api/projects/route.ts)
export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  if (!canProject(session.user.role, "create")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    
    // Add validation for GitHub and liveDemo URLs if provided
    if (body.github) {
      try {
        new URL(body.github);
      } catch (e) {
        return NextResponse.json({ 
          error: "Validation Error",
          details: "GitHub must be a valid URL" 
        }, { status: 400 });
      }
    }
    
    if (body.liveDemo) {
      try {
        new URL(body.liveDemo);
      } catch (e) {
        return NextResponse.json({ 
          error: "Validation Error",
          details: "Live Demo must be a valid URL" 
        }, { status: 400 });
      }
    }

    const newProject = await ProjectModel.create({
      title: body.title.trim(),
      domain: body.domain.trim(),
      description: body.description.trim(),
      teamlead: body.teamlead.trim(),
      colead: body.colead?.trim() || undefined,
      github: body.github?.trim() || undefined,
      liveDemo: body.liveDemo?.trim() || undefined,
      members: [],
      membersCount: body.membersCount || 1,
      badge: "active",
      approved: false,
      requests: [],
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    // Error handling remains the same
  }
}