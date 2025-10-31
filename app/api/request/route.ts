import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import { authOptions } from "../auth/[...nextauth]/option";
import UserModel from "@/model/User";
import RequestModel from "@/model/ProjectRequest";
import { canRequest } from "@/lib/permissions";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User from DB:", user);

    let filter: Record<string, any> = {};

    switch (user.role?.toLowerCase()) {
      case "member":
        filter = { user: user._id };
        break;

      case "lead":
        filter = { domain: user.domain };
        break;

      case "projectlead":
      case "colead":
        filter = {
          $or: [
            { projectlead: user._id },
            { colead: user._id },
            { user: user._id },
          ],
        };
        break;

      case "admin":
        filter = {}; 
        break;

      default:
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    filter.status = "Pending";

    const requests = await RequestModel.find(filter)
      .populate("user", "name email role")
      .populate("projectlead", "name email role")
      .populate("colead", "name email role")
      .sort({ createdAt: -1 });

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { message: "Error fetching requests", error },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Safely parse JSON body once
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON received" }, { status: 400 });
    }

    const { title, domain, description, link, startDate, endDate, image } = body;

    // ✅ Validate input
    if (!title || !description || !domain?.length || !startDate || !endDate || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Create new request
    const newRequest = await RequestModel.create({
      user: session.user._id,
      title,
      domain,
      description,
      link,
      startDate,
      endDate,
      image,
      status: "Pending",
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/request error:", error);
    return NextResponse.json(
      { error: "Error creating request", details: error.message },
      { status: 500 }
    );
  }
}