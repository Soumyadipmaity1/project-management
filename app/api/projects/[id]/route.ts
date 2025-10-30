import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { canProject } from "@/lib/permissions";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import { authOptions } from "../../auth/[...nextauth]/option";
import mongoose from "mongoose";
import UserModel from "@/model/User";

async function resolveUserIdentifier(val: any): Promise<string | null> {
  if (!val) return null;
  const s = String(val).trim();
  if (mongoose.Types.ObjectId.isValid(s)) return s;
  // try by email
  let u = await UserModel.findOne({ email: s }).select("_id").lean();
  if (u) return String(u._id);
  // try by rollNo
  u = await UserModel.findOne({ rollNo: s }).select("_id").lean();
  if (u) return String(u._id);
  // try by name (exact match)
  u = await UserModel.findOne({ name: s }).select("_id").lean();
  if (u) return String(u._id);
  return null;
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    console.log("Fetching project with ID:", params.id);
    const project = await ProjectModel.findById(params.id)
      .populate("projectlead", "name email role")
      .populate("colead", "name email role")
      .populate("members", "name email role")
      .lean();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Server Error", details: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// async function handleUpdate(req: Request, id: string) {
//   await dbConnect();
//   const session = await getServerSession(authOptions);

//   if (!session?.user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   if (!canProject(session.user.role, "update")) {
//     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//   }

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
//   }

//   let body: any = {};
//   try {
//     body = await req.json();
//   } catch (e) {
//     return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
//   }

//   const existingProject = await ProjectModel.findById(id);
//   if (!existingProject) {
//     return NextResponse.json({ error: "Project not found" }, { status: 404 });
//   }

//   // Validate title and description if provided
//   if (body.title && String(body.title).trim().length < 3) {
//     return NextResponse.json({ error: "Validation Error", details: "Title must be at least 3 characters long" }, { status: 400 });
//   }
//   if (body.description && String(body.description).trim().length < 10) {
//     return NextResponse.json({ error: "Validation Error", details: "Description must be at least 10 characters long" }, { status: 400 });
//   }

//   // Coerce domain to array
//   let domainsArray: string[] | undefined;
//   if (body.domain !== undefined) {
//     if (Array.isArray(body.domain)) {
//       domainsArray = body.domain.map((d: any) => String(d).trim()).filter(Boolean);
//     } else if (typeof body.domain === "string") {
//       try {
//         // maybe JSON string
//         const parsed = JSON.parse(body.domain);
//         if (Array.isArray(parsed)) domainsArray = parsed.map((d: any) => String(d).trim()).filter(Boolean);
//         else domainsArray = [String(body.domain).trim()];
//       } catch (e) {
//         domainsArray = [String(body.domain).trim()];
//       }
//     }

//     if (domainsArray && domainsArray.length === 0) {
//       return NextResponse.json({ error: "Validation Error", details: "At least one domain is required" }, { status: 400 });
//     }
//   }

//   // Resolve projectlead and colead to ObjectId strings if provided
//   let projectleadId: string | undefined;
//   if (body.projectlead !== undefined) {
//     const id = await resolveUserIdentifier(body.projectlead);
//     if (!id) {
//       return NextResponse.json({ error: "Validation Error", details: "projectlead not found or invalid" }, { status: 400 });
//     }
//     projectleadId = id;
//   }

//   let coleadId: string | undefined;
//   if (body.colead !== undefined && body.colead !== null && String(body.colead).trim() !== "") {
//     const id2 = await resolveUserIdentifier(body.colead);
//     if (!id2) {
//       return NextResponse.json({ error: "Validation Error", details: "colead not found or invalid" }, { status: 400 });
//     }
//     coleadId = id2;
//   }

//   // Build update payload only with provided fields
//   const updatePayload: any = {};
//   if (body.title !== undefined) updatePayload.title = String(body.title).trim();
//   if (domainsArray !== undefined) updatePayload.domain = domainsArray;
//   if (body.description !== undefined) updatePayload.description = String(body.description).trim();
//   if (projectleadId !== undefined) updatePayload.projectlead = projectleadId;
//   if (coleadId !== undefined) updatePayload.colead = coleadId;
//   if (body.membersCount !== undefined) updatePayload.membersCount = Number(body.membersCount);
//   if (body.badge !== undefined) updatePayload.badge = body.badge;
//   if (body.approved !== undefined) updatePayload.approved = Boolean(body.approved);
//   if (body.startDate !== undefined) updatePayload.startDate = new Date(body.startDate);
//   if (body.completionDate !== undefined) updatePayload.completionDate = new Date(body.completionDate);
//   if (body.github !== undefined) updatePayload.github = body.github;
//   if (body.liveDemo !== undefined) updatePayload.liveDemo = body.liveDemo;

//   try {
//     const updated = await ProjectModel.findByIdAndUpdate(id, updatePayload, { new: true, runValidators: true }).lean();
//     return NextResponse.json(updated, { status: 200 });
//   } catch (error: any) {
//     console.error("Error updating project:", error);
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map((err: any) => err.message);
//       return NextResponse.json({ error: "Validation Error", details: errors.join(", ") }, { status: 400 });
//     }
//     return NextResponse.json({ error: "Server Error", details: "Failed to update project" }, { status: 500 });
//   }
// }

async function handleUpdate(req: Request, id: string) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!canProject(session.user.role, "update")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const existingProject = await ProjectModel.findById(id);
  if (!existingProject) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // 🧩 Validate inputs
  if (body.title && String(body.title).trim().length < 3) {
    return NextResponse.json(
      { error: "Validation Error", details: "Title must be at least 3 characters long" },
      { status: 400 }
    );
  }
  if (body.description && String(body.description).trim().length < 10) {
    return NextResponse.json(
      { error: "Validation Error", details: "Description must be at least 10 characters long" },
      { status: 400 }
    );
  }

  // ✅ Convert domain to array if needed
  let domainsArray: string[] | undefined;
  if (body.domain !== undefined) {
    if (Array.isArray(body.domain)) {
      domainsArray = body.domain.map((d: any) => String(d).trim()).filter(Boolean);
    } else if (typeof body.domain === "string") {
      try {
        const parsed = JSON.parse(body.domain);
        if (Array.isArray(parsed))
          domainsArray = parsed.map((d: any) => String(d).trim()).filter(Boolean);
        else domainsArray = [String(body.domain).trim()];
      } catch {
        domainsArray = [String(body.domain).trim()];
      }
    }

    if (domainsArray && domainsArray.length === 0) {
      return NextResponse.json(
        { error: "Validation Error", details: "At least one domain is required" },
        { status: 400 }
      );
    }
  }

  // ✅ Resolve user references
  let projectleadId: string | undefined;
  if (body.projectlead !== undefined) {
    const id1 = await resolveUserIdentifier(body.projectlead);
    if (!id1) {
      return NextResponse.json(
        { error: "Validation Error", details: "projectlead not found or invalid" },
        { status: 400 }
      );
    }
    projectleadId = id1;
  }

  let coleadId: string | undefined;
  if (body.colead !== undefined && body.colead !== null && String(body.colead).trim() !== "") {
    const id2 = await resolveUserIdentifier(body.colead);
    if (!id2) {
      return NextResponse.json(
        { error: "Validation Error", details: "colead not found or invalid" },
        { status: 400 }
      );
    }
    coleadId = id2;
  }

  // ✅ Build update payload safely
  const updatePayload: any = {};

  if (body.title !== undefined) updatePayload.title = String(body.title).trim();
  if (domainsArray !== undefined) updatePayload.domain = domainsArray;
  if (body.description !== undefined) updatePayload.description = String(body.description).trim();
  if (projectleadId !== undefined) updatePayload.projectlead = projectleadId;
  if (coleadId !== undefined) updatePayload.colead = coleadId;
  if (body.membersCount !== undefined) updatePayload.membersCount = Number(body.membersCount);
  if (body.badge !== undefined) updatePayload.badge = body.badge;
  if (body.approved !== undefined) updatePayload.approved = Boolean(body.approved);
  if (body.startDate !== undefined) updatePayload.startDate = new Date(body.startDate);
  if (body.completionDate !== undefined) updatePayload.completionDate = new Date(body.completionDate);
  if (body.github !== undefined) updatePayload.github = body.github;
  if (body.liveDemo !== undefined) updatePayload.liveDemo = body.liveDemo;

  // 🖼️ ✅ New: Handle image update
  if (body.image !== undefined) {
    const imageUrl = String(body.image).trim();
    if (
      imageUrl &&
      (imageUrl.startsWith("https://res.cloudinary.com/") ||
        imageUrl.startsWith("https://") ||
        imageUrl.startsWith("/uploads/"))
    ) {
      updatePayload.image = imageUrl;
    } else if (imageUrl) {
      return NextResponse.json(
        { error: "Validation Error", details: "Invalid image URL format" },
        { status: 400 }
      );
    }
  }

  try {
    const updated = await ProjectModel.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    }).lean();

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error("Error updating project:", error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: "Validation Error", details: errors.join(", ") },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Server Error", details: "Failed to update project" },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  return handleUpdate(req, params.id);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  return handleUpdate(req, params.id);
}

/* =========================
   DELETE PROJECT HANDLER
========================= */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!canProject(session.user.role, "delete")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  try {
    const deleted = await ProjectModel.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Project deleted successfully", project: deleted },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Server Error", details: "Failed to delete project" },
      { status: 500 }
    );
  }
}
