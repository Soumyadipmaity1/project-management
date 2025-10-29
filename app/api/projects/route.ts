import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import UserModel from "@/model/User";
import { authOptions } from "../auth/[...nextauth]/option";
import { canProject } from "@/lib/permissions";
import fs from "fs";
import path from "path";

async function resolveUserIdentifier(val: any) {
  if (!val && val !== 0) return null;

  if (typeof val === "string") {
    const trimmed = val.trim();

    if (mongoose.Types.ObjectId.isValid(trimmed)) {
      const user = await UserModel.findById(trimmed);
      if (user) return user._id;
    }

    const user = await UserModel.findOne({
      $or: [{ name: trimmed }, { email: trimmed }, { rollNo: trimmed }],
    });
    if (user) return user._id;
  }

  if (typeof val === "object" && val?._id && mongoose.Types.ObjectId.isValid(String(val._id))) {
    return val._id;
  }

  return null;
}

// ----------------- GET -----------------
export async function GET() {
  try {
    await dbConnect();

    const projects = await ProjectModel.find()
      .sort({ createdAt: -1 })
      .populate("projectlead", "name email role")
      .populate("colead", "name email role")
      .populate("members", "name email role")
      .lean();

    const formatted = projects.map((p: any) => {
      const out: any = { ...p };
      out._id = String(p._id);
      out.startDate = p.startDate || null;
      out.completionDate = p.completionDate || null;

      if (p.projectlead) {
        out.projectlead = {
          _id: String(p.projectlead._id || p.projectlead),
          name: p.projectlead.name || String(p.projectlead),
          email: p.projectlead.email || undefined,
          role: p.projectlead.role || undefined,
        };
      }

      if (p.colead) {
        out.colead = {
          _id: String(p.colead._id || p.colead),
          name: p.colead.name || String(p.colead),
          email: p.colead.email || undefined,
          role: p.colead.role || undefined,
        };
      }

      if (Array.isArray(p.members)) {
        out.members = p.members.map((m: any) => ({
          _id: String(m._id || m),
          name: m.name || String(m),
          email: m.email || undefined,
          role: m.role || undefined,
        }));
      }

      return out;
    });

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Error fetching projects", error },
      { status: 500 }
    );
  }
}

// ----------------- POST -----------------
export async function POST(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!canProject(session.user.role, "create")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ Parse multipart/form-data
    const formData = await req.formData();

    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const projectleadVal = formData.get("projectlead");
    const coleadVal = formData.get("colead");
    const github = (formData.get("github") as string) || "";
    const liveDemo = (formData.get("liveDemo") as string) || "";
    const badge = (formData.get("badge") as string) || "active";
    const approved = formData.get("approved") === "true";
    const domainRaw = formData.get("domain") as string;
    const startDateRaw = formData.get("startDate") as string;
    const completionDateRaw = formData.get("completionDate") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title || !description || !domainRaw) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const domain = JSON.parse(domainRaw);
    if (!Array.isArray(domain) || !domain.length) {
      return NextResponse.json({ error: "Invalid domain data" }, { status: 400 });
    }

    if (title.length < 3) {
      return NextResponse.json({ error: "Title must be at least 3 characters" }, { status: 400 });
    }

    if (description.length < 10) {
      return NextResponse.json({ error: "Description must be at least 10 characters" }, { status: 400 });
    }

    const projectleadId = await resolveUserIdentifier(projectleadVal || session.user._id);
    if (!projectleadId) {
      return NextResponse.json({ error: "Team lead not found" }, { status: 400 });
    }

    let coleadId: mongoose.Types.ObjectId | undefined = undefined;
    if (coleadVal) {
      coleadId = await resolveUserIdentifier(coleadVal);
      if (!coleadId) {
        return NextResponse.json({ error: "Assistant lead not found" }, { status: 400 });
      }
    }

    let imageUrl: string | undefined = undefined;

    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${imageFile.name}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, fileName);
      await fs.promises.writeFile(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    }

    const startDate = startDateRaw ? new Date(startDateRaw) : new Date();
    const completionDate = completionDateRaw
      ? new Date(completionDateRaw)
      : new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    if (completionDate < startDate) {
      return NextResponse.json(
        { error: "Completion date cannot be before start date" },
        { status: 400 }
      );
    }

    const project = await ProjectModel.create({
      title,
      description,
      domain,
      image: imageUrl,
      projectlead: projectleadId,
      colead: coleadId,
      members: [],
      membersCount: 1,
      github: github || undefined,
      liveDemo: liveDemo || undefined,
      badge,
      approved,
      enrolled: false,
      startDate,
      completionDate,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project", details: String(error) },
      { status: 500 }
    );
  }
}
