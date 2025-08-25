import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import ProjectModel from "@/model/Projects";
import { canMember } from "@/lib/permissions";

export async function DELETE( req: Request, { params }: { params: { id: string; userId: string } }
) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { role } = session.user;
  if (!canMember(role, "removeMember")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const project = await ProjectModel.findById(params.id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  project.members = project.members.filter(
    (m: any) => m.toString() !== params.userId
  );

  await project.save();

  return NextResponse.json({ message: "Member removed successfully", project });
}



