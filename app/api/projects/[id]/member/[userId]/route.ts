import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import ProjectModel from "@/model/Projects";
import { canMember } from "@/lib/permissions";
import { authOptions } from "../../../../auth/[...nextauth]/option"


export async function DELETE(
  req: Request,
  { params }: { params: { id: string; userId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Use _id instead of id
  const { role, _id: currentUserId } = session.user as any;
  
  // Check if user has permission to delete members
  if (!canMember(role, "delete")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const project = await ProjectModel.findById(params.id);
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // Check if the member exists in the project
  const memberIndex = project.members.findIndex(
    (memberId) => memberId.toString() === params.userId
  );
  
  if (memberIndex === -1) {
    return NextResponse.json(
      { error: "Member not found in this project" },
      { status: 404 }
    );
  }

  // For Members, they can only remove themselves
  if (role === "Member" && params.userId !== currentUserId?.toString()) {
    return NextResponse.json(
      { error: "You can only remove yourself from the project" },
      { status: 403 }
    );
  }

  // Remove the member from the project
  project.members.splice(memberIndex, 1);
  await project.save();

  return NextResponse.json(
    { message: "Member removed successfully" },
    { status: 200 }
  );
}