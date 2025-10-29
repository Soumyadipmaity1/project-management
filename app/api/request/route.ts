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

    let requests;

    try {
      requests = await RequestModel.find(filter)
        .populate("user", "name email role")
        .populate("teamlead", "name email role")
        .populate("colead", "name email role")
        .sort({ createdAt: -1 });
    } catch (populateErr: any) {
      console.warn("Populate error when fetching requests:", populateErr?.message || populateErr);
      // If populate path not in schema (teamlead vs projectlead), try projectlead
      if (
        populateErr &&
        (populateErr.name === "StrictPopulateError" || String(populateErr.message).includes("Cannot populate path"))
      ) {
        try {
          requests = await RequestModel.find(filter)
            .populate("user", "name email role")
            .populate("projectlead", "name email role")
            .populate("colead", "name email role")
            .sort({ createdAt: -1 });
        } catch (secondErr) {
          console.warn("Second populate attempt failed, falling back to manual populate:", (secondErr as any)?.message || secondErr);
          // Fallback: fetch raw docs and manually populate with UserModel
          const docs = await RequestModel.find(filter).sort({ createdAt: -1 }).lean();
          const populated = await Promise.all(
            docs.map(async (doc: any) => {
              const out: any = { ...doc };
              try {
                out.user = doc.user ? await UserModel.findById(doc.user).select("name email role").lean() : null;
              } catch (e) {
                out.user = null;
              }
              try {
                out.teamlead = doc.teamlead ? await UserModel.findById(doc.teamlead).select("name email role").lean() : doc.projectlead ? await UserModel.findById(doc.projectlead).select("name email role").lean() : null;
              } catch (e) {
                out.teamlead = null;
              }
              try {
                out.colead = doc.colead ? await UserModel.findById(doc.colead).select("name email role").lean() : null;
              } catch (e) {
                out.colead = null;
              }
              return out;
            })
          );
          requests = populated;
        }
      } else {
        throw populateErr;
      }
    }

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

    // domain can be sent as a string or an array of strings; coerce to array
    let domainsArray: string[] = [];
    if (Array.isArray(domain)) {
      domainsArray = domain.map((d: any) => String(d).trim()).filter(Boolean);
    } else if (typeof domain === "string") {
      const trimmed = domain.trim();
      if (trimmed.length) domainsArray = [trimmed];
    }

    if (domainsArray.length === 0) {
      return NextResponse.json({ error: "Domain is required" }, { status: 400 });
    }

    // link is optional — validate only if provided
    if (link && String(link).trim().length > 0) {
      if (String(link).trim().length < 7) {
        return NextResponse.json(
          { error: "Link must be at least 7 characters long if provided." },
          { status: 400 }
        );
      }
    }

    const newRequest = await RequestModel.create({
      user: user._id,
      title: title.trim(),
      domain: domainsArray,
      description: description.trim(),
      link: link ? String(link).trim() : undefined,
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

