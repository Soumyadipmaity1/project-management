import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

// DELETE /api/projects/[id]/member/[memberId]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string; memberId: string } }
) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user)
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );

    const { id, memberId } = params;

    // ✅ Find project
    const project = await ProjectModel.findById(id);
    if (!project)
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );

    // ✅ Check permissions — only project lead can remove members
    if (project.projectlead.toString() !== session.user._id) {
      return NextResponse.json(
        { message: "Not authorized to remove members" },
        { status: 403 }
      );
    }

    // ✅ Remove member
    const beforeCount = project.members.length;
    project.members = project.members.filter(
      (m: any) => m.toString() !== memberId
    );

    // ✅ Update membersCount
    project.membersCount = project.members.length;

    if (project.members.length === beforeCount) {
      return NextResponse.json(
        { message: "Member not found in project" },
        { status: 404 }
      );
    }

    await project.save();

    return NextResponse.json(
      { message: "Member removed successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(" Error removing member:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
