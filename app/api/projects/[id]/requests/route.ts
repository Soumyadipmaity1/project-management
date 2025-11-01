// export const dynamic = "force-dynamic";

// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import ProjectModel from "@/model/Projects";
// import UserModel from "@/model/User";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/option";
// import mongoose from "mongoose";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect();
//     const session = await getServerSession(authOptions);
//     if (!session?.user?._id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const project = await ProjectModel.findById(params.id)
//       .populate({
//         path: "requests.user",
//         model: UserModel,
//         select: "name email profilePic",
//       })
//       .lean();

//       console.log(project);
//     if (!project) {
//       return NextResponse.json({ message: "Project not found" }, { status: 404 });
//     }

//     if (String(project.projectlead) !== String(session.user._id)) {
//       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
//     }

//     return NextResponse.json({
//       projectId: project._id,
//       projectTitle: project.title,
//       requests: project.requests || [],
//     });
//   } catch (err) {
//     console.error("Error fetching requests:", err);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect();
//     const session = await getServerSession(authOptions);
//     if (!session?.user?._id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { requestId, action } = await req.json();
//     if (!requestId || !["approve", "reject"].includes(action)) {
//       return NextResponse.json({ message: "Invalid request" }, { status: 400 });
//     }

//     const project = await ProjectModel.findById(params.id);
//     if (!project) {
//       return NextResponse.json({ message: "Project not found" }, { status: 404 });
//     }

//     if (String(project.projectlead) !== String(session.user._id)) {
//       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
//     }

//     const reqIndex = project.requests.findIndex(
//       (r: any) => r._id.toString() === requestId
//     );
//     if (reqIndex === -1) {
//       return NextResponse.json({ message: "Request not found" }, { status: 404 });
//     }

//     project.requests[reqIndex].status =
//       action === "approve" ? "Approved" : "Rejected";

//     if (action === "approve") {
//       const userId = project.requests[reqIndex].user;
//       if (!project.members.some((m: mongoose.Types.ObjectId) => m.equals(userId))) {
//         project.members.push(userId);
//       }
//     }

//     await project.save();
//     return NextResponse.json({ message: `Request ${action}d successfully` });
//   } catch (err) {
//     console.error("Error updating request:", err);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }
export const dynamic = "force-dynamic";

import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { corsResponse, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return corsResponse({ message: "Unauthorized" }, 401);
    }

    const project = await ProjectModel.findById(params.id)
      .populate({
        path: "requests.user",
        model: UserModel,
        select: "name email profilePic",
      })
      .lean();

    if (!project) return corsResponse({ message: "Project not found" }, 404);

    if (String(project.projectlead) !== String(session.user._id)) {
      return corsResponse({ message: "Forbidden" }, 403);
    }

    return corsResponse({
      projectId: project._id,
      projectTitle: project.title,
      requests: project.requests || [],
    });
  } catch (err) {
    console.error("Error fetching requests:", err);
    return corsResponse({ message: "Internal server error" }, 500);
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return corsResponse({ message: "Unauthorized" }, 401);
    }

    const { requestId, action } = await req.json();
    if (!requestId || !["approve", "reject"].includes(action)) {
      return corsResponse({ message: "Invalid request" }, 400);
    }

    const project = await ProjectModel.findById(params.id);
    if (!project) return corsResponse({ message: "Project not found" }, 404);

    if (String(project.projectlead) !== String(session.user._id)) {
      return corsResponse({ message: "Forbidden" }, 403);
    }

    const reqIndex = project.requests.findIndex(
      (r: any) => r._id.toString() === requestId
    );
    if (reqIndex === -1) return corsResponse({ message: "Request not found" }, 404);

    project.requests[reqIndex].status =
      action === "approve" ? "Approved" : "Rejected";

    if (action === "approve") {
      const userId = project.requests[reqIndex].user;
      if (!project.members.some((m: mongoose.Types.ObjectId) => m.equals(userId))) {
        project.members.push(userId);
      }
    }

    await project.save();
    return corsResponse({ message: `Request ${action}d successfully` });
  } catch (err) {
    console.error("Error updating request:", err);
    return corsResponse({ message: "Internal server error" }, 500);
  }
}
