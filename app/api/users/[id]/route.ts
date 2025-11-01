// export const dynamic = "force-dynamic";

// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import UserModel from "@/model/User";
// import ProjectModel from "@/model/Projects"; 
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/option";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   await dbConnect();

//   try {
//     ProjectModel; 

//     const user = await UserModel.findById(params.id)
//       .select("-password -otp -otpExpiry")
//       .populate("projects.projectId", "title badge")
//       .lean();

//     if (!user)
//       return NextResponse.json({ error: "User not found" }, { status: 404 });

//     return NextResponse.json(user, { status: 200 });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// export async function PATCH(req: Request, { params }: { params: { id: string } }) {
//   await dbConnect();

//   const session = await getServerSession(authOptions);
//   if (!session)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const userId = params.id;
//   const loggedInUserId = session.user._id;

//   if (userId !== loggedInUserId)
//     return NextResponse.json(
//       { error: "You can only update your own profile" },
//       { status: 403 }
//     );

//   try {
//     const body = await req.json();
//     const allowedFields = [
//       "name",
//       "domain",
//       "skills",
//       "profilePic",
//       "githubId",
//       "linkedinId",
//     ];

//     const updates: any = {};
//     for (const field of allowedFields) {
//       if (body[field] !== undefined) updates[field] = body[field];
//     }

//     const updatedUser = await UserModel.findByIdAndUpdate(
//       userId,
//       { $set: updates },
//       { new: true }
//     ).select("-password -otp -otpExpiry");

//     return NextResponse.json(updatedUser, { status: 200 });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }


export const dynamic = "force-dynamic";

import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import ProjectModel from "@/model/Projects";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import { corsResponse, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const user = await UserModel.findById(params.id)
      .select("-password -otp -otpExpiry")
      .populate("projects.projectId", "title badge")
      .lean();

    if (!user) return corsResponse({ error: "User not found" }, 404);
    return corsResponse(user, 200);
  } catch (err: any) {
    return corsResponse({ error: err.message }, 500);
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session) return corsResponse({ error: "Unauthorized" }, 401);

  const userId = params.id;
  const loggedInUserId = session.user._id;

  if (userId !== loggedInUserId)
    return corsResponse({ error: "You can only update your own profile" }, 403);

  try {
    const body = await req.json();
    const allowedFields = ["name", "domain", "skills", "profilePic", "githubId", "linkedinId"];
    const updates: any = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) updates[field] = body[field];
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    ).select("-password -otp -otpExpiry");

    return corsResponse(updatedUser, 200);
  } catch (err: any) {
    return corsResponse({ error: err.message }, 500);
  }
}
