import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { canProject, canRequest } from "@/lib/permissions";
import ProjectModel from "@/model/Projects";
import mongoose from "mongoose";


export async function PATCH(req: Request, { params }: { params: { id: string; userId: string } } ) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { role } = session.user;
  const { action } = await req.json();

  if (
    (action === "approve" && !canRequest(role, "approverequest")) ||
    (action === "reject" && !canRequest(role, "rejectrequest"))
  ) { 
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

 const projectId = new mongoose.Types.ObjectId(params.id);
 const userId = new mongoose.Types.ObjectId(params.userId);

   const project = await ProjectModel.findById(projectId);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const request = project.requests.find(
    (r) => r.user.toString() === params.userId
  );

  if (!request) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  request.status = action === "approve" ? "Approved" : "Rejected";

  if (action === "approve") {
    const useridStr = userId.toString();
    if (!project.members.includes(useridStr)) {
      project.members.push(useridStr);
      project.membersCount = project.members.length; 
    }
  }

  await project.save();
  return NextResponse.json({ message: `Request ${action}d`, project });
}
