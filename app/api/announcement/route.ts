import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import AnnouncementModel from "@/model/Announcement";
import { can } from "@/lib/permissions";
import dbConnect from "@/lib/db";

export async function GET() {
  await dbConnect();

  try {
      const announcements = await AnnouncementModel.find().lean().sort({ createdAt: -1 });
      const formatted = announcements.map((a) => ({
      ...a,
      _id: a._id.toString(),
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

    if (!body.senderName || !body.senderProfilePic || !body.content) {
      return NextResponse.json(
        { message: "Sender info and content are required" },
        { status: 400 }
      );
    }

    const newAnn = await AnnouncementModel.create({
      senderName: body.senderName,
      senderProfilePic: body.senderProfilePic,
      content: body.content,
      pinned: body.pinned,
      createdBy: session.user._id,
    });
     const formatted = {
     ...newAnn.toObject(),
     _id: newAnn._id.toString(),
     };
    return NextResponse.json(formatted, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error creating announcement", error: error.message },
      { status: 500 }
    );
  }
}
