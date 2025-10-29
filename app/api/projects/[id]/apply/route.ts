// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/option";
// import dbConnect from "@/lib/db";
// import { canProject } from "@/lib/permissions";
// import ProjectModel from "@/model/Projects";
// import mongoose from "mongoose";

// export async function POST(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await dbConnect();

//     const session = await getServerSession(authOptions);
//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { role, _id } = session.user;

//     // ✅ Permission check
//     if (!canProject(role, "view")) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const project = await ProjectModel.findById(params.id);
//     if (!project) {
//       return NextResponse.json(
//         { error: "Project not available for applications" },
//         { status: 404 }
//       );
//     }

//     // ✅ Convert to ObjectId safely
//     if (!_id) {
//       return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
//     }

//     const userObjectId = new mongoose.Types.ObjectId(_id);

//     // ✅ Ensure requests array exists
//     if (!project.requests) project.requests = [];

//     // ✅ Check if already a member (compare as strings)
//     if (project.members.some((member: mongoose.Types.ObjectId) => member.toString() === _id)) {
//       return NextResponse.json({ error: "Already a member" }, { status: 400 });
//     }

//     // ✅ Prevent duplicate request
//     const existingRequest = project.requests.find(
//       (r: { user: mongoose.Types.ObjectId }) => r.user.toString() === _id
//     );
//     if (existingRequest) {
//       return NextResponse.json({ error: "Already applied" }, { status: 400 });
//     }

//     // ✅ Add new request
//     project.requests.push({ user: userObjectId, status: "Pending" });
//     await project.save();

//     return NextResponse.json({
//       message: "Request submitted successfully",
//       projectId: project._id,
//     });
//   } catch (error) {
//     console.error("Error applying to project:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import dbConnect from "@/lib/db";
import { canProject } from "@/lib/permissions";
import ProjectModel from "@/model/Projects";
import mongoose from "mongoose";

// 🟢 GET — fetch all join requests for a specific project
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = session.user;

    // ✅ Only users who can "view" projects can see requests
    if (!canProject(role, "view")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 🧩 Fetch project with populated request user details
    const project = await ProjectModel.findById(params.id)
      .populate("requests.user", "name email profilePic")
      .select("requests title");

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({
      projectId: project._id,
      projectTitle: project.title,
      requests: project.requests || [],
    });
  } catch (error) {
    console.error("Error fetching project requests:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 🟠 POST — submit a join request
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role, _id } = session.user;

    // ✅ Permission check
    if (!canProject(role, "view")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const project = await ProjectModel.findById(params.id);
    if (!project) {
      return NextResponse.json(
        { error: "Project not available for applications" },
        { status: 404 }
      );
    }

    if (!_id) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const userObjectId = new mongoose.Types.ObjectId(_id);

    if (!project.requests) project.requests = [];

    if (project.members.some((m: mongoose.Types.ObjectId) => m.toString() === _id)) {
      return NextResponse.json({ error: "Already a member" }, { status: 400 });
    }

    const existingRequest = project.requests.find(
      (r: { user: mongoose.Types.ObjectId }) => r.user.toString() === _id
    );
    if (existingRequest) {
      return NextResponse.json({ error: "Already applied" }, { status: 400 });
    }

    project.requests.push({ user: userObjectId, status: "Pending" });
    await project.save();

    return NextResponse.json({
      message: "Request submitted successfully",
      projectId: project._id,
    });
  } catch (error) {
    console.error("Error applying to project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
