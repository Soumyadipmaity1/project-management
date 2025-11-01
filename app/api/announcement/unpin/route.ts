// export const dynamic = "force-dynamic";

// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import AnnouncementModel from "@/model/Announcement";

// export async function POST(req: Request) {
//   try {
//     await dbConnect();
//     const { id } = await req.json();

//     if (!id) {
//       return NextResponse.json(
//         { message: "Announcement ID is required" },
//         { status: 400 }
//       );
//     }

//     const announcement = await AnnouncementModel.findById(id);
//     if (!announcement) {
//       return NextResponse.json(
//         { message: "Announcement not found" },
//         { status: 404 }
//       );
//     }

//     // Unpin it
//     announcement.pinned = false;
//     await announcement.save();

//     return NextResponse.json({
//       message: "Announcement unpinned successfully",
//       announcement,
//     });
//   } catch (err: any) {
//     console.error("Error unpinning announcement:", err);
//     return NextResponse.json(
//       { message: "Error unpinning announcement", error: err.message },
//       { status: 500 }
//     );
//   }
// }



export const dynamic = "force-dynamic";

import { corsResponse, handleOptions } from "@/lib/cors";
import dbConnect from "@/lib/db";
import AnnouncementModel from "@/model/Announcement";

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id)
      return corsResponse({ message: "Announcement ID is required" }, 400);

    const announcement = await AnnouncementModel.findById(id);
    if (!announcement)
      return corsResponse({ message: "Announcement not found" }, 404);

    announcement.pinned = false;
    await announcement.save();

    return corsResponse({
      message: "Announcement unpinned successfully",
      announcement,
    });
  } catch (error: unknown) {
    console.error("Error unpinning announcement:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return corsResponse(
      { message: "Error unpinning announcement", error: message },
      500
    );
  }
}
