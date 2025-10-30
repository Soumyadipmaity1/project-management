// // // // import { NextResponse } from "next/server";
// // // // import dbConnect from "@/lib/db";
// // // // import ProjectModel from "@/model/Projects";
// // // // import UserModel from "@/model/User";
// // // // import { getServerSession } from "next-auth";
// // // // import { authOptions } from "@/app/api/auth/[...nextauth]/option";

// // // // export async function GET(req: Request, { params }: { params: { id: string } }) {
// // // //   try {
// // // //     await dbConnect();

// // // //     const session = await getServerSession(authOptions);
// // // //     if (!session || !session.user?._id) {
// // // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // // //     }

// // // //     const project = await ProjectModel.findById(params.id)
// // // //       .populate({
// // // //         path: "requests.user",
// // // //         model: UserModel,
// // // //         select: "name email image",
// // // //       })
// // // //       .populate("projectlead", "name email")
// // // //       .lean();

// // // //       console.log("Session user:", session?.user?._id);
// // // // console.log("Requested project ID:", params.id);
// // // // console.log("Found project:", project?._id);



// // // //     if (!project) {
// // // //       return NextResponse.json({ message: "Project not found" }, { status: 404 });
// // // //     }

// // // //     // only project lead can access
// // // //     if (String(project.projectlead?._id) !== String(session.user._id)) {
// // // //       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
// // // //     }

// // // //     return NextResponse.json({ project }, { status: 200 });
// // // //   } catch (err: any) {
// // // //     console.error("Error fetching project requests:", err);
// // // //     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
// // // //   }
// // // // }

// // // // export async function PUT(req: Request, { params }: { params: { id: string } }) {
// // // //   try {
// // // //     await dbConnect();

// // // //     const session = await getServerSession(authOptions);
// // // //     if (!session || !session.user?._id) {
// // // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // // //     }

// // // //     const { requestId, action } = await req.json();
// // // //     if (!requestId || !["approve", "reject"].includes(action)) {
// // // //       return NextResponse.json({ message: "Invalid request" }, { status: 400 });
// // // //     }

// // // //     const project = await ProjectModel.findById(params.id);
// // // //     if (!project) {
// // // //       return NextResponse.json({ message: "Project not found" }, { status: 404 });
// // // //     }

// // // //     // Only project lead can act
// // // //     if (String(project.projectlead) !== String(session.user._id)) {
// // // //       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
// // // //     }

// // // //     const reqIndex = project.requests.findIndex(
// // // //       (r: any) => r._id.toString() === requestId
// // // //     );
// // // //     if (reqIndex === -1) {
// // // //       return NextResponse.json({ message: "Request not found" }, { status: 404 });
// // // //     }

// // // //     project.requests[reqIndex].status =
// // // //       action === "approve" ? "Approved" : "Rejected";

// // // //     await project.save();

// // // //     return NextResponse.json({ message: `Request ${action}d successfully` });
// // // //   } catch (err: any) {
// // // //     console.error("Error updating request:", err);
// // // //     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
// // // //   }
// // // // }
// // // import { NextResponse } from "next/server";
// // // import dbConnect from "@/lib/db";
// // // import ProjectModel from "@/model/Projects";
// // // import UserModel from "@/model/User";
// // // import { getServerSession } from "next-auth";
// // // import { authOptions } from "@/app/api/auth/[...nextauth]/option";

// // // export async function GET(req: Request, { params }: { params: { id: string } }) {
// // //   try {
// // //     await dbConnect();

// // //     const session = await getServerSession(authOptions);
// // //     if (!session || !session.user?._id) {
// // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // //     }

// // //     const project = await ProjectModel.findById(params.id)
// // //       .populate("projectlead", "name email")
// // //       .populate("requests.userId", "name email image") // Fix: use userId instead of user
// // //       .lean();

// // //     console.log("🔍 Debug Info:");
// // //     console.log("Session user ID:", session.user._id);
// // //     console.log("Project ID:", params.id);
// // //     console.log("Project found:", !!project);
// // //     if (project) {
// // //       console.log("Project lead ID:", project.projectlead?._id);
// // //       console.log("Requests count:", project.requests?.length);
// // //       console.log("Requests:", project.requests);
// // //     }

// // //     if (!project) {
// // //       return NextResponse.json({ message: "Project not found" }, { status: 404 });
// // //     }

// // //     // Check if user is project lead
// // //     if (String(project.projectlead?._id) !== String(session.user._id)) {
// // //       console.log("❌ Access denied - User is not project lead");
// // //       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
// // //     }

// // //     return NextResponse.json({ project }, { status: 200 });
// // //   } catch (err: any) {
// // //     console.error("Error fetching project requests:", err);
// // //     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
// // //   }
// // // }
// // // export async function PUT(req: Request, { params }: { params: { id: string } }) {
// // //   try {
// // //     await dbConnect();

// // //     const session = await getServerSession(authOptions);
// // //     if (!session || !session.user?._id) {
// // //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// // //     }

// // //     const { requestId, action } = await req.json();
// // //     if (!requestId || !["approve", "reject"].includes(action)) {
// // //       return NextResponse.json({ message: "Invalid request" }, { status: 400 });
// // //     }

// // //     const project = await ProjectModel.findById(params.id);
// // //     if (!project) {
// // //       return NextResponse.json({ message: "Project not found" }, { status: 404 });
// // //     }

// // //     // Only project lead can act
// // //     if (String(project.projectlead) !== String(session.user._id)) {
// // //       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
// // //     }

// // //     const reqIndex = project.requests.findIndex(
// // //       (r: any) => r._id.toString() === requestId
// // //     );
    
// // //     if (reqIndex === -1) {
// // //       return NextResponse.json({ message: "Request not found" }, { status: 404 });
// // //     }

// // //     // ✅ FIX: Use the correct status values from your schema
// // //     project.requests[reqIndex].status = action === "approve" ? "Approved" : "Rejected";

// // //     const userId = session.user._id;
// // //     // If approving, add user to members
// // //     if (action === "approve") {
// // //       const userId = project.requests[reqIndex].userId;
// // //       if (!project.members.includes(userId)) {
// // //         project.members.push(userId);
// // //         project.membersCount = project.members.length;
// // //       }
// // //     }

// // //     await project.save();

// // //     return NextResponse.json({ 
// // //       message: `Request ${action}ed successfully`,
// // //       project: await ProjectModel.findById(params.id)
// // //         .populate("projectlead", "name email")
// // //         .populate("requests.userId", "name email image")
// // //     });
// // //   } catch (err: any) {
// // //     console.error("Error updating request:", err);
// // //     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
// // //   }
// // // }


// // import { NextResponse } from "next/server";
// // import dbConnect from "@/lib/db";
// // import ProjectModel from "@/model/Projects";
// // import UserModel from "@/model/User";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "@/app/api/auth/[...nextauth]/option";

// // export async function GET(req: Request, { params }: { params: { id: string } }) {
// //   try {
// //     await dbConnect();

// //     const session = await getServerSession(authOptions);
// //     if (!session || !session.user?._id) {
// //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// //     }

// //     const project = await ProjectModel.findById(params.id)
// //       .populate("projectlead", "name email")
// //       .populate("requests.user", "name email image") // ✅ Fix: use 'user' not 'userId'
// //       .lean();

// //     console.log("🔍 Debug Info:");
// //     console.log("Session user ID:", session.user._id);
// //     console.log("Project ID:", params.id);
// //     console.log("Project found:", !!project);
// //     if (project) {
// //       console.log("Project lead ID:", project.projectlead?._id);
// //       console.log("Requests count:", project.requests?.length);
// //       console.log("Requests:", project.requests);
// //     }

// //     if (!project) {
// //       return NextResponse.json({ message: "Project not found" }, { status: 404 });
// //     }

// //     // Check if user is project lead
// //     if (String(project.projectlead?._id) !== String(session.user._id)) {
// //       console.log("❌ Access denied - User is not project lead");
// //       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
// //     }

// //     return NextResponse.json({ project }, { status: 200 });
// //   } catch (err: any) {
// //     console.error("Error fetching project requests:", err);
// //     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
// //   }
// // }

// // export async function PUT(req: Request, { params }: { params: { id: string } }) {
// //   try {
// //     await dbConnect();

// //     const session = await getServerSession(authOptions);
// //     if (!session || !session.user?._id) {
// //       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
// //     }

// //     const { requestId, action } = await req.json();
// //     if (!requestId || !["approve", "reject"].includes(action)) {
// //       return NextResponse.json({ message: "Invalid request" }, { status: 400 });
// //     }

// //     const project = await ProjectModel.findById(params.id);
// //     if (!project) {
// //       return NextResponse.json({ message: "Project not found" }, { status: 404 });
// //     }

// //     // Only project lead can act
// //     if (String(project.projectlead) !== String(session.user._id)) {
// //       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
// //     }

// //     const reqIndex = project.requests.findIndex(
// //       (r: any) => r._id.toString() === requestId
// //     );
    
// //     if (reqIndex === -1) {
// //       return NextResponse.json({ message: "Request not found" }, { status: 404 });
// //     }

// //     // ✅ Use correct status values
// //     project.requests[reqIndex].status = action === "approve" ? "Approved" : "Rejected";

// //     // If approving, add user to members
// //     if (action === "approve") {
// //       const userId = project.requests[reqIndex].user; // ✅ Fix: use 'user' not 'userId'
// //       if (!project.members.includes(userId)) {
// //         project.members.push(userId);
// //         project.membersCount = project.members.length;
// //       }
// //     }

// //     await project.save();

// //     return NextResponse.json({ 
// //       message: `Request ${action}ed successfully`,
// //       project: await ProjectModel.findById(params.id)
// //         .populate("projectlead", "name email")
// //         .populate("requests.user", "name email image") // ✅ Fix: use 'user' not 'userId'
// //     });
// //   } catch (err: any) {
// //     console.error("Error updating request:", err);
// //     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
// //   }
// // }


// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import ProjectModel from "@/model/Projects";
// import UserModel from "@/model/User";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/option";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   console.log("🚀 GET /api/projects/[id]/requests - START");
//   console.log("📝 Request params:", params);
//   console.log("🔗 Request URL:", req.url);
  
//   try {
//     console.log("🔄 Step 1: Connecting to database...");
//     await dbConnect();
//     console.log("✅ Database connected successfully");

//     console.log("🔄 Step 2: Getting server session...");
//     const session = await getServerSession(authOptions);
//     console.log("📋 Session data:", session);
//     console.log("👤 Session user ID:", session?.user?._id);
    
//     if (!session || !session.user?._id) {
//       console.log("❌ Unauthorized: No session or user ID found");
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }
//     console.log("✅ Session validation passed");

//     console.log("🔄 Step 3: Finding project by ID:", params.id);
//     const project = await ProjectModel.findById(params.id)
//       .populate("projectlead", "name email")
//       .populate("requests.user", "name email image")
//       .lean();
    
//     console.log("🔍 Project query result:", project);
//     console.log("📊 Project found:", !!project);
    
//     if (project) {
//       console.log("👑 Project lead ID:", project.projectlead?._id);
//       console.log("📋 Project lead data:", project.projectlead);
//       console.log("📨 Requests count:", project.requests?.length);
//       console.log("📝 Requests details:", project.requests);
//       console.log("🔍 Session user ID type:", typeof session.user._id);
//       console.log("🔍 Project lead ID type:", typeof project.projectlead?._id);
//       console.log("🔍 ID comparison:", String(project.projectlead?._id) === String(session.user._id));
//     }

//     if (!project) {
//       console.log("❌ Project not found with ID:", params.id);
//       return NextResponse.json({ message: "Project not found" }, { status: 404 });
//     }
//     console.log("✅ Project found successfully");

//     console.log("🔄 Step 4: Checking if user is project lead...");
//     console.log("🔍 Comparing IDs:");
//     console.log("   Session user ID:", session.user._id);
//     console.log("   Project lead ID:", project.projectlead?._id);
//     console.log("   String comparison:", String(project.projectlead?._id) === String(session.user._id));
    
//     if (String(project.projectlead?._id) !== String(session.user._id)) {
//       console.log("❌ Access denied - User is not project lead");
//       console.log("👤 Current user ID:", session.user._id);
//       console.log("👑 Required project lead ID:", project.projectlead?._id);
//       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
//     }
//     console.log("✅ User is project lead - access granted");

//     console.log("🔄 Step 5: Returning project data...");
//     console.log("✅ GET /api/projects/[id]/requests - SUCCESS");
//     return NextResponse.json({ project }, { status: 200 });
    
//   } catch (err: any) {
//     console.error("💥 GET /api/projects/[id]/requests - ERROR:", err);
//     console.error("📌 Error name:", err.name);
//     console.error("📌 Error message:", err.message);
//     console.error("📌 Error stack:", err.stack);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   console.log("🚀 PUT /api/projects/[id]/requests - START");
//   console.log("📝 Request params:", params);
//   console.log("🔗 Request URL:", req.url);
  
//   try {
//     console.log("🔄 Step 1: Connecting to database...");
//     await dbConnect();
//     console.log("✅ Database connected successfully");

//     console.log("🔄 Step 2: Getting server session...");
//     const session = await getServerSession(authOptions);
//     console.log("📋 Session data:", session);
//     console.log("👤 Session user ID:", session?.user?._id);
    
//     if (!session || !session.user?._id) {
//       console.log("❌ Unauthorized: No session or user ID found");
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }
//     console.log("✅ Session validation passed");

//     console.log("🔄 Step 3: Parsing request body...");
//     const body = await req.json();
//     console.log("📦 Request body:", body);
    
//     const { requestId, action } = body;
//     console.log("📨 Extracted requestId:", requestId);
//     console.log("🎯 Extracted action:", action);
    
//     if (!requestId || !["approve", "reject"].includes(action)) {
//       console.log("❌ Invalid request parameters:");
//       console.log("   requestId provided:", !!requestId);
//       console.log("   action valid:", ["approve", "reject"].includes(action));
//       console.log("   action received:", action);
//       return NextResponse.json({ message: "Invalid request" }, { status: 400 });
//     }
//     console.log("✅ Request parameters validation passed");

//     console.log("🔄 Step 4: Finding project by ID:", params.id);
//     const project = await ProjectModel.findById(params.id);
//     console.log("🔍 Project found:", !!project);
//     console.log("📋 Project data:", project);
    
//     if (!project) {
//       console.log("❌ Project not found with ID:", params.id);
//       return NextResponse.json({ message: "Project not found" }, { status: 404 });
//     }
//     console.log("✅ Project found successfully");

//     console.log("🔄 Step 5: Checking if user is project lead...");
//     console.log("🔍 Comparing IDs:");
//     console.log("   Session user ID:", session.user._id);
//     console.log("   Project lead ID:", project.projectlead);
//     console.log("   String comparison:", String(project.projectlead) === String(session.user._id));
    
//     if (String(project.projectlead) !== String(session.user._id)) {
//       console.log("❌ Access denied - User is not project lead");
//       console.log("👤 Current user ID:", session.user._id);
//       console.log("👑 Required project lead ID:", project.projectlead);
//       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
//     }
//     console.log("✅ User is project lead - access granted");

//     console.log("🔄 Step 6: Finding request in project...");
//     console.log("📨 Looking for requestId:", requestId);
//     console.log("📋 All requests:", project.requests);
    
//     const reqIndex = project.requests.findIndex(
//       (r: any) => {
//         const match = r._id.toString() === requestId;
//         console.log(`🔍 Checking request ${r._id}: ${match ? "MATCH" : "no match"}`);
//         return match;
//       }
//     );
    
//     console.log("📌 Found request index:", reqIndex);
    
//     if (reqIndex === -1) {
//       console.log("❌ Request not found with ID:", requestId);
//       console.log("📋 Available request IDs:", project.requests.map((r: any) => r._id.toString()));
//       return NextResponse.json({ message: "Request not found" }, { status: 404 });
//     }
//     console.log("✅ Request found at index:", reqIndex);

//     console.log("🔄 Step 7: Updating request status...");
//     console.log("📝 Current request status:", project.requests[reqIndex].status);
//     console.log("🎯 New action:", action);
    
//     const newStatus = action === "approve" ? "Approved" : "Rejected";
//     project.requests[reqIndex].status = newStatus;
//     console.log("✅ Request status updated to:", newStatus);

//     console.log("🔄 Step 8: Handling approval logic...");
//     if (action === "approve") {
//       console.log("✅ Approval action detected");
//       const userId = project.requests[reqIndex].user;
//       console.log("👤 User ID to add:", userId);
//       console.log("📋 Current members:", project.members);
//       console.log("🔍 User already in members:", project.members.includes(userId));
      
//       if (!project.members.includes(userId)) {
//         console.log("👥 Adding user to members array");
//         project.members.push(userId);
//         project.membersCount = project.members.length;
//         console.log("✅ User added to members");
//         console.log("📊 New members count:", project.membersCount);
//         console.log("📋 Updated members:", project.members);
//       } else {
//         console.log("ℹ️ User already in members, skipping addition");
//       }
//     } else {
//       console.log("❌ Rejection action - no member addition needed");
//     }

//     console.log("🔄 Step 9: Saving project...");
//     await project.save();
//     console.log("✅ Project saved successfully");

//     console.log("🔄 Step 10: Fetching updated project with populated data...");
//     const updatedProject = await ProjectModel.findById(params.id)
//       .populate("projectlead", "name email")
//       .populate("requests.user", "name email image");
//     console.log("📋 Updated project data:", updatedProject);

//     console.log("✅ PUT /api/projects/[id]/requests - SUCCESS");
//     return NextResponse.json({ 
//       message: `Request ${action}ed successfully`,
//       project: updatedProject
//     });
    
//   } catch (err: any) {
//     console.error("💥 PUT /api/projects/[id]/requests - ERROR:", err);
//     console.error("📌 Error name:", err.name);
//     console.error("📌 Error message:", err.message);
//     console.error("📌 Error stack:", err.stack);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import mongoose from "mongoose";

// 🟢 GET all join requests
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const project = await ProjectModel.findById(params.id)
      .populate({
        path: "requests.user",
        model: UserModel,
        select: "name email profilePic",
      })
      .lean();

      console.log(project);
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    // ✅ Only project lead can view requests
    if (String(project.projectlead) !== String(session.user._id)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({
      projectId: project._id,
      projectTitle: project.title,
      requests: project.requests || [],
    });
  } catch (err) {
    console.error("Error fetching requests:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// 🟠 PUT approve/reject
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { requestId, action } = await req.json();
    if (!requestId || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const project = await ProjectModel.findById(params.id);
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    // ✅ Only project lead can approve/reject
    if (String(project.projectlead) !== String(session.user._id)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const reqIndex = project.requests.findIndex(
      (r: any) => r._id.toString() === requestId
    );
    if (reqIndex === -1) {
      return NextResponse.json({ message: "Request not found" }, { status: 404 });
    }

    // Update request status
    project.requests[reqIndex].status =
      action === "approve" ? "Approved" : "Rejected";

    // ✅ If approved, add member to project
    if (action === "approve") {
      const userId = project.requests[reqIndex].user;
      if (!project.members.some((m: mongoose.Types.ObjectId) => m.equals(userId))) {
        project.members.push(userId);
      }
    }

    await project.save();
    return NextResponse.json({ message: `Request ${action}d successfully` });
  } catch (err) {
    console.error("Error updating request:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
