// export const dynamic = "force-dynamic";

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/option";
// import dbConnect from "@/lib/db";
// import ProjectModel from "@/model/Projects";
// import mongoose from "mongoose";

// export async function POST(req: Request, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect();

//     const session = await getServerSession(authOptions);
//     if (!session?.user?._id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const userId = new mongoose.Types.ObjectId(session.user._id);
//     const project = await ProjectModel.findById(params.id);

//     if (!project) {
//       return NextResponse.json({ error: "Project not found" }, { status: 404 });
//     }

//     if (project.members.some((m: mongoose.Types.ObjectId) => m.equals(userId))) {
//       return NextResponse.json({ error: "Already a member" }, { status: 400 });
//     }

//     const existing = project.requests.find((r: any) => r.user.equals(userId));
//     if (existing) {
//       return NextResponse.json({ error: "Already applied" }, { status: 400 });
//     }

//     project.requests.push({ user: userId, status: "Pending" });
//     await project.save();

//     return NextResponse.json({
//       message: "Request submitted successfully",
//       projectId: project._id,
//     });
//   } catch (err) {
//     console.error("Error submitting request:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


export const dynamic = "force-dynamic";
import { corsResponse, handleOptions } from "@/lib/cors";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import mongoose from "mongoose";

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?._id)
      return corsResponse({ error: "Unauthorized" }, 401);

    const userId = new mongoose.Types.ObjectId(session.user._id);
    const project = await ProjectModel.findById(params.id);

    if (!project) return corsResponse({ error: "Project not found" }, 404);
    if (project.members.some((m: mongoose.Types.ObjectId) => m.equals(userId)))
      return corsResponse({ error: "Already a member" }, 400);

    const existing = project.requests.find((r: any) => r.user.equals(userId));
    if (existing) return corsResponse({ error: "Already applied" }, 400);

    project.requests.push({ user: userId, status: "Pending" });
    await project.save();

    return corsResponse({
      message: "Request submitted successfully",
      projectId: project._id,
    });
  } catch (err: any) {
    console.error("Error submitting request:", err);
    return corsResponse({ error: "Internal Server Error" }, 500);
  }
}


