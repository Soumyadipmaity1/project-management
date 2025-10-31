import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import dbConnect from "@/lib/db";
import ProjectModel from "@/model/Projects";
import UserModel from "@/model/User";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const leadProjects = await ProjectModel.find({ projectlead: session.user._id })
      .populate({
        path: "requests.user",
        model: UserModel,
        select: "name email profilePic",
      })
      .lean();

    if (!leadProjects.length) {
      return NextResponse.json([], { status: 200 });
    }

    const pendingRequests = leadProjects.flatMap((p) =>
  (p.requests || [])
    .filter((r: any) => r.status === "Pending")
    .map((r: any) => ({
      projectId: p._id,
      projectTitle: p.title,
      user: r.user,
      status: r.status,
      message: r.message || "",
      requestId: (r as any)._id, // 👈 fixes TS error
    }))
);

    return NextResponse.json(pendingRequests, { status: 200 });
  } catch (err) {
    console.error("Error fetching pending requests for lead:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
