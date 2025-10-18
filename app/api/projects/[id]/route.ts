import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { canProject } from "@/lib/permissions";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import { authOptions } from "../../auth/[...nextauth]/option";
import mongoose from "mongoose";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  if (!canProject(session.user.role, "delete")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    const deletedProject = await ProjectModel.findByIdAndDelete(params.id);
    
    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Server Error", details: "Failed to delete project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  if (!canProject(session.user.role, "update")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    const body = await req.json();
    
    // Validate required fields
    if (!body.title || !body.domain || !body.description || !body.teamlead) {
      return NextResponse.json({ 
        error: "Missing required fields",
        details: "Title, domain, description, and team lead are required"
      }, { status: 400 });
    }

    // Trim and validate field lengths
    const title = body.title.trim();
    const domain = body.domain.trim();
    const description = body.description.trim();
    const teamlead = body.teamlead.trim();
    const colead = body.colead?.trim() || undefined;

    if (title.length < 3) {
      return NextResponse.json({ 
        error: "Validation Error",
        details: "Title must be at least 3 characters long" 
      }, { status: 400 });
    }

    if (description.length < 10) {
      return NextResponse.json({ 
        error: "Validation Error",
        details: "Description must be at least 10 characters long" 
      }, { status: 400 });
    }

    if (domain.length < 2) {
      return NextResponse.json({ 
        error: "Validation Error",
        details: "Domain must be at least 2 characters long" 
      }, { status: 400 });
    }

    // Check if project exists
    const existingProject = await ProjectModel.findById(params.id);
    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Update the project
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      params.id,
      {
        title,
        domain,
        description,
        teamlead,
        colead,
        membersCount: body.membersCount || existingProject.membersCount,
        badge: body.badge || existingProject.badge,
        approved: body.approved !== undefined ? body.approved : existingProject.approved,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error: any) {
    console.error("Error updating project:", error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { 
          error: "Validation Error",
          details: errors.join(", ")
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Server Error", details: "Failed to update project" },
      { status: 500 }
    );
  }
}