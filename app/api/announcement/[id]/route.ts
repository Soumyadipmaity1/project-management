import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import AnnouncementModel, { Announcement } from "@/model/Announcement";
import { can } from "@/lib/permissions";
import dbConnect from "@/lib/db";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!can(session.user.role, "update")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const allowed: Partial<Announcement> = {};
  if (typeof body.title === "string") allowed.title = body.title;
  if (typeof body.content === "string") allowed.content = body.content;
  if (typeof body.pinned === "boolean") allowed.pinned = body.pinned;

  const updated = await AnnouncementModel.findByIdAndUpdate(params.id, allowed, {
    new: true,
  });

  if (!updated) {
    return NextResponse.json(
      { error: "Announcement not found" },
      { status: 404 }
    );
  }

  const populated = await AnnouncementModel.findById(updated._id)
    .populate("createdBy", "name image")
    .lean();

  if (!populated) {
    return NextResponse.json(
      { error: "Announcement not found" },
      { status: 404 }
    );
  }

  const creator = (populated as any).createdBy;
  const formatted = {
    ...populated,
    _id: populated._id.toString(),
    senderName: creator?.name || "",
    senderProfilePic: creator?.image || "",
  };

  return NextResponse.json(formatted);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!can(session.user.role, "delete")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const deleted = await AnnouncementModel.findByIdAndDelete(params.id);

  if (!deleted) {
    return NextResponse.json(
      { error: "Announcement not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}

