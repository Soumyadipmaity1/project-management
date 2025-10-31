export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";

export async function GET() {
  try {
    await dbConnect();

    // Fetch only users with role === 'Admin'
    const admins = await UserModel.find({ role: "Admin" })
      .select("name rollNo profilePic githubId linkedinId email role")
      .sort({ createdAt: -1 });

    return NextResponse.json(admins);
  } catch (error: any) {
    console.error("Error fetching admins:", error);
    return NextResponse.json(
      { message: "Failed to fetch admins", error: error.message },
      { status: 500 }
    );
  }
}
