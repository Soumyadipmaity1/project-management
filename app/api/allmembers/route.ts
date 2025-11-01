export const dynamic = "force-dynamic";
import { corsResponse, handleOptions } from "@/lib/cors";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import ProjectModel from "@/model/Projects";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  try {
    await dbConnect();

    const users = await UserModel.find({
         role: { $ne: ["Admin", "admin"]},
    })
      .select("name email rollNo role domain profilePic githubId linkedinId projects")
      .populate("projects.projectId", "title") 
      .sort({ createdAt: -1 });

    return corsResponse(users);
  } catch (error: any) {
    console.error("Error fetching members:", error);
    return corsResponse(
      { message: "Failed to fetch members", error: error.message },
      500 
    );
  }
}
