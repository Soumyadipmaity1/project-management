import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { canProject } from "@/lib/permissions";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";

export async function GET(req: Request){
    try {
    const projects = await ProjectModel.find().sort({ createdAt:-1 });
    return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching project", error }, { status: 500 });
    }
}


export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { role } = session.user;
  if (!canProject(role, "createproject")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
     const body = await req.json();
     const newProject = await ProjectModel.create({
         ...body,   
     })    
         return NextResponse.json(newProject, {status: 201})
     } catch (error) {
     return NextResponse.json({ message: "Error creating project", error }, { status: 500 });
     }
}




