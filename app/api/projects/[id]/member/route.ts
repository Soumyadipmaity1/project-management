// export const dynamic = "force-dynamic";

// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import ProjectModel from "@/model/Projects";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await dbConnect();
//     const { id } = params;

//     const project = await ProjectModel.findById(id)
//       .populate("members", "name email profilePic domain")
//       .lean(); 

//     if (!project) {
//       return NextResponse.json(
//         { success: false, message: "Project not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       members: project.members || [],
//     });
//   } catch (error) {
//     console.error("❌ Error fetching project members:", error);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }
export const dynamic = "force-dynamic";

import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import { corsResponse, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = params;

    const project = await ProjectModel.findById(id)
      .populate("members", "name email profilePic domain")
      .lean();

    if (!project) {
      return corsResponse({ success: false, message: "Project not found" }, 404);
    }

    return corsResponse({ success: true, members: project.members || [] });
  } catch (error) {
    console.error("❌ Error fetching project members:", error);
    return corsResponse({ success: false, message: "Server error" }, 500);
  }
}


