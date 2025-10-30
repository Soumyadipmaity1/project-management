// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import dbConnect from "@/lib/db";
// import UserModel from "@/model/User";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await dbConnect();
//     const { id } = params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
//     }

//     const user = await UserModel.findById(id)
//       .select("-password -__v") 
//       .lean();

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const ProjectCount = user.projects?.length || 0;

//     return NextResponse.json(
//       { ...user, ProjectCount },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error fetching user:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch user data" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const user = await UserModel.findById(params.id)
      .select("-password -otp -otpExpiry") // hide sensitive fields
      .populate("projects.projectId", "title badge") // optional if you store refs
      .lean();

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = params.id;
  const loggedInUserId = session.user._id;

  if (userId !== loggedInUserId)
    return NextResponse.json({ error: "You can only update your own profile" }, { status: 403 });

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

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

