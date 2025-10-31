import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import AnnouncementModel from "@/model/Announcement";
import { can } from "@/lib/permissions";
import dbConnect from "@/lib/db";

export async function GET() {
  await dbConnect();

  try {
    const announcements = await AnnouncementModel.find()
      .populate("createdBy", "name image")
      .lean()
      .sort({ createdAt: -1 });

    const formatted = announcements.map((a: any) => ({
      ...a,
      _id: a._id.toString(),
      senderName: a.createdBy?.name || a.senderName || "",
      senderProfilePic: a.createdBy?.image || a.senderProfilePic || "",
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching announcements", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!can(session.user.role, "create")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    const createdById = session.user._id || session.user._id || null;

    const newAnn = await AnnouncementModel.create({
      title: body.title,
      content: body.content,
      pinned: !!body.pinned,
      createdBy: createdById,
      senderName: body.senderName || session.user.name || "",
      senderProfilePic: body.senderProfilePic || session.user.image || "",
    });

    const populated = await AnnouncementModel.findById(newAnn._id)
      .populate("createdBy", "name image")
      .lean();

    if (!populated) {
      return NextResponse.json(
        { message: "Announcement not found after creation" },
        { status: 500 }
      );
    }

    const creator = populated.createdBy as any;
    const formatted = {
      ...populated,
      _id: populated._id.toString(),
      senderName: creator?.name || populated.senderName || "",
      senderProfilePic: creator?.image || populated.senderProfilePic || "",
    };

    return NextResponse.json(formatted, { status: 201 });
  } catch (error: any) {
    console.error("Error creating announcement:", error);
    return NextResponse.json(
      { message: "Error creating announcement", error: error.message },
      { status: 500 }
    );
  }
}
