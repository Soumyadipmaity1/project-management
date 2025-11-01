// export const dynamic = "force-dynamic";

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { canProject } from "@/lib/permissions";
// import dbConnect from "@/lib/db";
// import ProjectModel from "@/model/Projects";
// import { authOptions } from "../../auth/[...nextauth]/option";
// import mongoose from "mongoose";
// import UserModel from "@/model/User";
// import { corsResponse, handleOptions } from "@/lib/cors";


// function errorResponse(error: string, status = 400, details?: string) {
//   return NextResponse.json({ success: false, error, details: details || null }, { status });
// }

// async function resolveUserIdentifier(val: any): Promise<string | undefined> {
//   if (!val) return undefined;
//   const s = String(val).trim();
//   if (mongoose.Types.ObjectId.isValid(s)) return s;
//   let u = await UserModel.findOne({ email: s }).select("_id").lean();
//   if (u) return String(u._id);
//   u = await UserModel.findOne({ rollNo: s }).select("_id").lean();
//   if (u) return String(u._id);
//   u = await UserModel.findOne({ name: s }).select("_id").lean();
//   if (u) return String(u._id);
//   return undefined; 
// }


// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   await dbConnect();
//   const session = await getServerSession(authOptions);

//   if (!session?.user) return errorResponse("Unauthorized", 401);

//   const { id } = params;
//   if (!mongoose.Types.ObjectId.isValid(id))
//     return errorResponse("Invalid project ID", 400);

//   try {
//     console.log("Fetching project with ID:", id);

//     const project = await ProjectModel.findById(id)
//       .populate("projectlead", "name email role image")
//       .populate("colead", "name email role image")
//       .populate("members", "name email role image")
//       .lean();

//     if (!project) return errorResponse("Project not found", 404);

//     return NextResponse.json({ success: true, project }, { status: 200 });
//   } catch (err: any) {
//     console.error("Error fetching project:", err);
//     return errorResponse("Server Error", 500, "Failed to fetch project");
//   }
// }


// async function handleUpdate(req: Request, id: string) {
//   await dbConnect();
//   const session = await getServerSession(authOptions);

//   if (!session?.user) return errorResponse("Unauthorized", 401);
//   if (!canProject(session.user.role, "update")) return errorResponse("Forbidden", 403);

//   let body: any;
//   try {
//     body = await req.json();
//   } catch {
//     return errorResponse("Invalid JSON body", 400);
//   }

//   const existingProject = await ProjectModel.findById(id);
//   if (!existingProject) return errorResponse("Project not found", 404);

//   if (body.title && String(body.title).trim().length < 3)
//     return errorResponse("Title must be at least 3 characters long", 400);

//   if (body.description && String(body.description).trim().length < 10)
//     return errorResponse("Description must be at least 10 characters long", 400);

// let domainsArray: string[] = [];
//   if (body.domain !== undefined) {
//     try {
//       domainsArray = Array.isArray(body.domain)
//         ? body.domain
//         : JSON.parse(body.domain);
//       domainsArray = domainsArray.map((d: any) => String(d).trim()).filter(Boolean);
//     } catch {
//       domainsArray = [String(body.domain).trim()];
//     }
//     if (!domainsArray.length)
//       return errorResponse("At least one domain is required", 400);
//   }

//   let projectleadId: string | undefined;
//   if (body.projectlead !== undefined) {
//     projectleadId = await resolveUserIdentifier(body.projectlead);
//     if (!projectleadId)
//       return errorResponse("Project lead not found or invalid", 400);
//   }

//   let coleadId: string | undefined;
//   if (body.colead !== undefined && String(body.colead).trim() !== "") {
//     coleadId = await resolveUserIdentifier(body.colead);
//     if (!coleadId)
//       return errorResponse("Co-lead not found or invalid", 400);
//   }

//   // ✅ Construct update object
//   const updatePayload: any = {
//     ...(body.title && { title: String(body.title).trim() }),
//     ...(domainsArray && { domain: domainsArray }),
//     ...(body.description && { description: String(body.description).trim() }),
//     ...(projectleadId && { projectlead: projectleadId }),
//     ...(coleadId && { colead: coleadId }),
//   };

//   const url = String(body.image || "").trim();
//   if (url && !url.match(/^https:\/\/|^\/uploads\//))
//     return errorResponse("Invalid image URL format", 400);
//   if (url) updatePayload.image = url;

//   try {
//     const updated = await ProjectModel.findByIdAndUpdate(id, updatePayload, {
//       new: true,
//       runValidators: true,
//     }).lean();

//     return NextResponse.json({ success: true, project: updated }, { status: 200 });
//   } catch (error: any) {
//     console.error("Error updating project:", error);
//     if (error.name === "ValidationError") {
//       const details = Object.values(error.errors).map((e: any) => e.message).join(", ");
//       return errorResponse("Validation Error", 400, details);
//     }
//     return errorResponse("Server Error", 500, "Failed to update project");
//   }
// }

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   return handleUpdate(req, params.id);
// }

// export async function PATCH(req: Request, { params }: { params: { id: string } }) {
//   return handleUpdate(req, params.id);
// }


// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   await dbConnect();
//   const session = await getServerSession(authOptions);

//   if (!session?.user) return errorResponse("Unauthorized", 401);
//   if (!canProject(session.user.role, "delete")) return errorResponse("Forbidden", 403);

//   const { id } = params;
//   if (!mongoose.Types.ObjectId.isValid(id))
//     return errorResponse("Invalid project ID", 400);

//   try {
//     const deleted = await ProjectModel.findByIdAndDelete(id).lean();
//     if (!deleted) return errorResponse("Project not found", 404);

//     return NextResponse.json({ success: true, message: "Project deleted", project: deleted });
//   } catch (error: any) {
//     console.error("Error deleting project:", error);
//     return errorResponse("Server Error", 500, "Failed to delete project");
//   }
// }



export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { canProject } from "@/lib/permissions";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import { authOptions } from "../../auth/[...nextauth]/option";
import mongoose from "mongoose";
import UserModel from "@/model/User";
import { corsResponse, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

function errorResponse(error: string, status = 400, details?: string) {
  return corsResponse({ success: false, error, details: details || null }, status);
}

async function resolveUserIdentifier(val: any): Promise<string | undefined> {
  if (!val) return undefined;
  const s = String(val).trim();
  if (mongoose.Types.ObjectId.isValid(s)) return s;
  let u = await UserModel.findOne({ email: s }).select("_id").lean();
  if (u) return String(u._id);
  u = await UserModel.findOne({ rollNo: s }).select("_id").lean();
  if (u) return String(u._id);
  u = await UserModel.findOne({ name: s }).select("_id").lean();
  if (u) return String(u._id);
  return undefined;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user) return errorResponse("Unauthorized", 401);

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse("Invalid project ID", 400);

  try {
    const project = await ProjectModel.findById(id)
      .populate("projectlead", "name email role image")
      .populate("colead", "name email role image")
      .populate("members", "name email role image")
      .lean();

    if (!project) return errorResponse("Project not found", 404);

    return corsResponse({ success: true, project }, 200);
  } catch (err: unknown) {
    console.error("Error fetching project:", err);
    return errorResponse("Server Error", 500, "Failed to fetch project");
  }
}

async function handleUpdate(req: Request, id: string) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user) return errorResponse("Unauthorized", 401);
  if (!canProject(session.user.role, "update")) return errorResponse("Forbidden", 403);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }

  const existingProject = await ProjectModel.findById(id);
  if (!existingProject) return errorResponse("Project not found", 404);

  if (body.title && String(body.title).trim().length < 3)
    return errorResponse("Title must be at least 3 characters long", 400);

  if (body.description && String(body.description).trim().length < 10)
    return errorResponse("Description must be at least 10 characters long", 400);

  let domainsArray: string[] = [];
  if (body.domain !== undefined) {
    try {
      domainsArray = Array.isArray(body.domain) ? body.domain : JSON.parse(body.domain);
      domainsArray = domainsArray.map((d: any) => String(d).trim()).filter(Boolean);
    } catch {
      domainsArray = [String(body.domain).trim()];
    }
    if (!domainsArray.length) return errorResponse("At least one domain is required", 400);
  }

  let projectleadId: string | undefined;
  if (body.projectlead !== undefined) {
    projectleadId = await resolveUserIdentifier(body.projectlead);
    if (!projectleadId) return errorResponse("Project lead not found or invalid", 400);
  }

  let coleadId: string | undefined;
  if (body.colead !== undefined && String(body.colead).trim() !== "") {
    coleadId = await resolveUserIdentifier(body.colead);
    if (!coleadId) return errorResponse("Co-lead not found or invalid", 400);
  }

  const updatePayload: any = {
    ...(body.title && { title: String(body.title).trim() }),
    ...(domainsArray && { domain: domainsArray }),
    ...(body.description && { description: String(body.description).trim() }),
    ...(projectleadId && { projectlead: projectleadId }),
    ...(coleadId && { colead: coleadId }),
  };

  const url = String(body.image || "").trim();
  if (url && !url.match(/^https:\/\/|^\/uploads\//)) return errorResponse("Invalid image URL format", 400);
  if (url) updatePayload.image = url;

  try {
    const updated = await ProjectModel.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    }).lean();

    return corsResponse({ success: true, project: updated }, 200);
  } catch (error: any) {
    console.error("Error updating project:", error);
    if (error.name === "ValidationError") {
      const details = Object.values(error.errors).map((e: any) => e.message).join(", ");
      return errorResponse("Validation Error", 400, details);
    }
    return errorResponse("Server Error", 500, "Failed to update project");
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return handleUpdate(req, params.id);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  return handleUpdate(req, params.id);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user) return errorResponse("Unauthorized", 401);
  if (!canProject(session.user.role, "delete")) return errorResponse("Forbidden", 403);

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) return errorResponse("Invalid project ID", 400);

  try {
    const deleted = await ProjectModel.findByIdAndDelete(id).lean();
    if (!deleted) return errorResponse("Project not found", 404);

    return corsResponse({ success: true, message: "Project deleted", project: deleted }, 200);
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return errorResponse("Server Error", 500, "Failed to delete project");
  }
}
