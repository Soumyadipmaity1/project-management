export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import AnnouncementModel from "@/model/Announcement";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Announcement ID is required" },
        { status: 400 }
      );
    }

    const announcement = await AnnouncementModel.findById(id);
    if (!announcement) {
      return NextResponse.json(
        { message: "Announcement not found" },
        { status: 404 }
      );
    }

    // Unpin it
    announcement.pinned = false;
    await announcement.save();

    return NextResponse.json({
      message: "Announcement unpinned successfully",
      announcement,
    });
  } catch (err: any) {
    console.error("Error unpinning announcement:", err);
    return NextResponse.json(
      { message: "Error unpinning announcement", error: err.message },
      { status: 500 }
    );
  }
}
