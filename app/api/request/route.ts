import { SessionProvider } from 'next-auth/react';
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

    switch (user.role) {
      case "Member":
        filter = { user: user._id };
        break;
      case "Lead":
        filter = { domain: user.domain };
        break;
      case "ProjectLead":
      case "CoLead":
        filter = {
          $or: [
            { teamlead: user._id },
            { colead: user._id },
            { user: user._id },
          ],
        };
        break;
      case "Admin":
        filter = {}; 
        break;
      default:
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const requests = await RequestModel.find(filter)
      .populate("user", "name email role")
      .populate("teamlead", "name email role")
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

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userRole = user.role;

    if (!canRequest(userRole, "create")) {
      return NextResponse.json(
        {
          error: "Forbidden",
          details: `Role '${userRole}' cannot create requests.`,
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, domain, description, link } = body;

    if (!title || title.trim().length < 3 || title.trim().length > 100) {
      return NextResponse.json(
        { error: "Title must be between 3 and 100 characters." },
        { status: 400 }
      );
    }

    if (!description || description.trim().length < 10 || description.trim().length > 1000) {
      return NextResponse.json(
        { error: "Description must be between 10 and 1000 characters." },
        { status: 400 }
      );
    }

    if (!link || link.trim().length < 7) {
      return NextResponse.json(
        { error: "Link must be at least 7 characters long." },
        { status: 400 }
      );
    }

    const newRequest = await RequestModel.create({
      user: user._id,
      title: title.trim(),
      domain: domain.map((d: string) => d.trim()),
      description: description.trim(),
      link: link.trim(),
    });

    return NextResponse.json(
      { message: "Request created successfully", request: newRequest },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      {
        message: "Failed to create request",
        error: error instanceof Error ? error.message : "Server error",
      },
      { status: 500 }
    );
  }
}

