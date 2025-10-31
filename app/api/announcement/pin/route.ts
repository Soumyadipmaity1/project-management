export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import AnnouncementModel from "@/model/Announcement";
import { can } from "@/lib/permissions";
import dbConnect from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (!can(session.user.role, "pin"))
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const { id, pinned } = await req.json();
    const announcement = await AnnouncementModel.findById(id);

    if (!announcement)
      return NextResponse.json(
        { message: "Announcement not found" },
        { status: 404 }
      );

    if (pinned && !announcement.pinned) {
      const pinnedCount = await AnnouncementModel.countDocuments({ pinned: true });
      if (pinnedCount >= 3)
        return NextResponse.json(
          { message: "Maximum 3 announcements can be pinned" },
          { status: 400 }
        );
    }

    announcement.pinned = !!pinned;
    const updated = await announcement.save();

    const formatted = { ...updated.toObject(), _id: updated._id.toString() };
    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating pin", error: error.message },
      { status: 500 }
    );
  }
}

