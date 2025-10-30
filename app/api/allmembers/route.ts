import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";

export async function GET() {
  try {
    await dbConnect();

    // Fetch all users except Admins
    const users = await UserModel.find({
      role: { $ne: "Admin" },
    })
      .select("name email rollNo role domain profilePic githubId linkedinId projects")
      .populate("projects.projectId", "title") // if you want project titles
      .sort({ createdAt: -1 });

    return NextResponse.json(users);
  } catch (error: any) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { message: "Failed to fetch members", error: error.message },
      { status: 500 }
    );
  }
}
