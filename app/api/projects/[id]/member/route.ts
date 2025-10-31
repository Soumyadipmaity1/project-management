// // import { NextResponse } from "next/server";
// // import { getServerSession } from "next-auth";
// // import ProjectModel from "@/model/Projects";
// // import { canMember } from "@/lib/permissions";
// // import { authOptions } from "../../../auth/[...nextauth]/option"

// // export async function GET(
// //   req: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   const session = await getServerSession(authOptions);
// //   if (!session?.user) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //   }

// //   const { role, _id: userId } = session.user;

// //   if (!canMember(role, "view")) {
// //     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
// //   }

// //   const project = await ProjectModel.findById(params.id).populate(
// //     "members",
// //     "name email profilePhoto githubId linkedinId"
// //   );

// //   if (!project) {
// //     return NextResponse.json({ error: "Project not found" }, { status: 404 });
// //   }

// //   if (role === "Member" && !project.members.some((m: any) => m._id.equals(userId))) {
// //     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
// //   }

// //   return NextResponse.json(project.members);
// // }

// // export async function POST(
// //   req: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   const session = await getServerSession(authOptions);
// //   if (!session?.user) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //   }

// //   const { role } = session.user;
// //   if (!canMember(role, "create")) {
// //     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
// //   }

// //   const { userId } = await req.json();

// //   const project = await ProjectModel.findById(params.id);
// //   if (!project) {
// //     return NextResponse.json({ error: "Project not found" }, { status: 404 });
// //   }

// //   // Check if user is already a member
// //   if (project.members.includes(userId)) {
// //     return NextResponse.json(
// //       { error: "User is already a member of this project" },
// //       { status: 400 }
// //     );
// //   }

// //   // Add user to project members
// //   project.members.push(userId);
// //   await project.save();

// //   // Populate the newly added member details for response
// //   await project.populate("members", "name email profilePhoto githubId linkedinId");
// //   const newMember = project.members[project.members.length - 1];

// //   return NextResponse.json(
// //     { message: "Member added successfully", member: newMember },
// //     { status: 201 }
// //   );
// // }

// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import ProjectModel from "@/model/Project";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await dbConnect();

//     const { id } = params;

//     // ✅ Fetch the project and populate members
//     const project = await ProjectModel.findById(id).populate(
//       "members",
//       "name email profilePic" // select only useful fields
//     );

//     if (!project) {
//       return NextResponse.json(
//         { success: false, message: "Project not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       members: project.members,
//     });
//   } catch (err: any) {
//     console.error("❌ Error fetching members:", err);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;

    const project = await ProjectModel.findById(id)
      .populate("members", "name email profilePic domain")
      .lean(); // ✅ lean() converts Mongoose docs to plain JSON

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      members: project.members || [],
    });
  } catch (error) {
    console.error("❌ Error fetching project members:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
