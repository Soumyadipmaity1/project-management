export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";
import { corsResponse, handleOptions } from "@/lib/cors";
import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import AnnouncementModel from "@/model/Announcement";
import { can } from "@/lib/permissions";

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

export async function GET() {
  try {
    await dbConnect();
    const announcements = await AnnouncementModel.find()
      .populate("createdBy", "name profilePic")
      .lean()
      .sort({ createdAt: -1 });

    const formatted = announcements.map((a: any) => ({
      ...a,
      _id: a._id.toString(),
      senderName: a.createdBy?.name ?? a.senderName ?? "",
      senderProfilePic: a.createdBy?.profilePic ?? a.senderProfilePic ?? "",
      createdByName: a.createdBy?.name ?? null,
      createdByProfilePic: a.createdBy?.profilePic ?? null,
    }));

    return corsResponse(formatted);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return corsResponse(
      { message: "Error fetching announcements", error: message },
      500
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return corsResponse({ message: "Unauthorized" }, 401);

    if (!can(session.user.role, "create"))
      return corsResponse({ message: "Forbidden" }, 403);

    const body = await req.json();

    if (!body.title || !body.content)
      return corsResponse(
        { message: "Title and content are required" },
        400
      );

    const createdById = session.user._id || null;

    const newAnn = await AnnouncementModel.create({
      title: body.title,
      content: body.content,
      pinned: !!body.pinned,
      createdBy: createdById,
      senderName: body.senderName || session.user.name || "",
      senderProfilePic:
        body.senderProfilePic ||
        ((session.user as any).profilePic ?? (session.user as any).image) ||
        "",
    });

    const populated = await AnnouncementModel.findById(newAnn._id)
      .populate("createdBy", "name profilePic")
      .lean();

    if (!populated)
      return corsResponse(
        { message: "Announcement not found after creation" },
        500
      );

    const creator = (populated as any).createdBy;
    const formatted = {
      ...populated,
      _id: populated._id.toString(),
      senderName: creator?.name ?? populated.senderName ?? "",
      senderProfilePic: creator?.profilePic ?? populated.senderProfilePic ?? "",
      createdByName: creator?.name ?? null,
      createdByProfilePic: creator?.profilePic ?? null,
    };

    return corsResponse(formatted, 201);
  } catch (error: unknown) {
    console.error("Error creating announcement:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return corsResponse(
      { message: "Error creating announcement", error: message },
      500
    );
  }
}
