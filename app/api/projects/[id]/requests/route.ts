import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/option";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import UserModel from "@/model/User";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?._id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find all projects where this user is the lead
    const projects = await ProjectModel.find({
      projectlead: session.user._id,
    })
      .populate({
        path: "requests",
        populate: {
          path: "user", // assuming each request has user field
          model: UserModel,
          select: "name email image",
        },
      })
      .populate("projectlead", "name email")
      .lean();

    return NextResponse.json({ projects });
  } catch (err: any) {
    console.error("Error fetching lead requests:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err.message },
      { status: 500 }
    );
  }
}
