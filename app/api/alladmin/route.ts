import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import { corsResponse, handleOptions } from "@/lib/cors";
export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

export async function GET() {
  try {
    await dbConnect();
 
   const admins = await UserModel.find({ role: { $in: ["Admin", "admin"] } })
      .select("name rollNo profilePic githubId linkedinId email role")
      .sort({ createdAt: -1 });

    return corsResponse(admins);
  } catch (error: any) {
    console.error("Error fetching admins:", error);
    return corsResponse(
      { message: "Failed to fetch admins", error: error.message }, 500 
    );
  }
}
