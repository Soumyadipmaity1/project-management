import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import ProjectModel from "@/model/Projects";
import { canMember } from "@/lib/permissions";

export async function GET( req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { role, id: userId } = session.user;

  if (!canMember(role, "viewMember")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const project = await ProjectModel.findById(params.id).populate(
    "members",
    "name profilePhoto githubId linkedinId"
  );

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  if (role === "Member" && !project.members.some((m: any) => m._id.equals(userId))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(project.members);
}


export async function POST( req: Request, { params }: { params: { id: string } } ) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { role } = session.user;
  if (!canMember(role, "addMember")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = await req.json();

  const project = await ProjectModel.findById(params.id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  if (!project.members.includes(userId)) {
    project.members.push(userId);
    await project.save();
  }

  return NextResponse.json({ message: "Member added successfully", project });
}
