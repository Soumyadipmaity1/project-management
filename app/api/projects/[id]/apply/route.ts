import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { canProject } from "@/lib/permissions";
import ProjectModel from "@/model/Projects";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { role, id } = session.user;
  if (!canProject(role, "applyproject")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const project = await ProjectModel.findById(params.id);
  if (!project) {
    return NextResponse.json(
      { error: "Project not available for applications" },
      { status: 400 }
    );
  }

  if (project.members.includes(id)) {
    return NextResponse.json({ error: "Already a member" }, { status: 400 });
  }

  const existingRequest = project.requests.find(
    (r) => r.user.toString() === id
  );
  if (existingRequest) {
    return NextResponse.json({ error: "Already applied" }, { status: 400 });
  }

  project.requests.push({ user: id, status: "Pending" });
  await project.save();

  return NextResponse.json({ message: "Request submitted", project });
}
