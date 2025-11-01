// export const dynamic = "force-dynamic";

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import dbConnect from "@/lib/db";
// import ProjectModel from "@/model/Projects";
// import UserModel from "@/model/User";
// import { authOptions } from "../../auth/[...nextauth]/option";

// export async function GET() {
//   try {
//     await dbConnect();

//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const user = await UserModel.findOne({ email: session.user.email });
//     if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

//     const enrolledProjects = await ProjectModel.find({ members: user._id })
//       .populate("projectlead", "name")
//       .populate("colead", "name")
//       .lean();

//     const formatted = enrolledProjects.map((p: any) => ({
//       id: p._id.toString(),
//       title: p.title,
//       domain: p.domain.join(", "),
//       description: p.description,
//       teamLead: p.projectlead?.name || "N/A",
//       assistantLead: p.colead?.name || "N/A",
//       github: p.github || "",
//       live: p.liveDemo || "",
//       badge: p.badge,
//       enrolled: true,
//       image: p.image || "",
//     }));

//     return NextResponse.json(formatted);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to fetch enrolled projects" }, { status: 500 });
//   }
// }



export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import UserModel from "@/model/User";
import { authOptions } from "../../auth/[...nextauth]/option";
import { corsResponse, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return corsResponse({ error: "Unauthorized" }, 401);

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) return corsResponse({ error: "User not found" }, 404);

    const enrolledProjects = await ProjectModel.find({ members: user._id })
      .populate("projectlead", "name")
      .populate("colead", "name")
      .lean();

    const formatted = enrolledProjects.map((p: any) => ({
      id: p._id.toString(),
      title: p.title,
      domain: Array.isArray(p.domain) ? p.domain.join(", ") : p.domain,
      description: p.description,
      teamLead: p.projectlead?.name || "N/A",
      assistantLead: p.colead?.name || "N/A",
      github: p.github || "",
      live: p.liveDemo || "",
      badge: p.badge,
      enrolled: true,
      image: p.image || "",
    }));

    return corsResponse(formatted, 200);
  } catch (err: unknown) {
    console.error("Error fetching enrolled projects:", err);
    return corsResponse({ error: "Failed to fetch enrolled projects" }, 500);
  }
}
