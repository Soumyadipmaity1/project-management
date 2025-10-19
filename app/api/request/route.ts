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

    if (!domain || domain.trim().length < 2 || domain.trim().length > 50) {
      return NextResponse.json(
        { error: "Domain must be between 2 and 50 characters." },
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
      domain: domain.trim(),
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



// export async function PATCH(req: Request){
//    try{
//     await dbConnect();
//     const session = await getServerSession(authOptions);

//     if(!session?.user){
//         return NextResponse.json({ error: "Unauthorized"}, {status: 401});
//     }

//     const user = await UserModel.findOne({ email: session.user.email });

//     if(!user){
//         return NextResponse.json({ error: "User not found"}, {status: 404})
//     }
//     const userRole = user.role;

//     const allowedToApprove = canRequest(userRole, "approverequest");
//     const allowedToReject = canRequest(userRole, "rejectrequest");
//     if (!allowedToApprove && !allowedToReject) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const body = await req.json();
//     const {requestId, action} = req.body;




//    }
//    catch(err){
//     console.log("Error updating request:", err);
//     return NextResponse.json({
//         message: "Failed to update request",
//         error: err instanceof Error ? err.message : "Server error",
//     },{ status: 500})
//    }
// }
export async function PATCH(req: Request) {
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
    const allowedToApprove = canRequest(userRole, "approverequest");
    const allowedToReject = canRequest(userRole, "rejectrequest");

    if (!allowedToApprove && !allowedToReject) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { requestId, action, projectLeadName, coLeadName } = await req.json();

    if (!requestId || !action) {
      return NextResponse.json(
        { error: "Both requestId and action are required" },
        { status: 400 }
      );
    }

    const request = await RequestModel.findById(requestId);
    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    // Optional: domain restriction for leads
    if (user.role === "Lead" && request.domain !== user.domain) {
      return NextResponse.json(
        { error: "You can only manage requests in your domain" },
        { status: 403 }
      );
    }

    // ✅ APPROVE
    if (action === "approve") {
      if (!projectLeadName || !coLeadName) {
        return NextResponse.json(
          { error: "Project Lead and Co-Lead names are required for approval" },
          { status: 400 }
        );
      }

      const updatedRequest = await RequestModel.findByIdAndUpdate(
        requestId,
        {
          status: "Approved",
          projectLead: { name: projectLeadName },
          coLead: { name: coLeadName },
        },
        { new: true }
      );

      return NextResponse.json({
        message: "Request approved successfully",
        updatedRequest,
      });
    }

    // ❌ REJECT
    if (action === "reject") {
      const updatedRequest = await RequestModel.findByIdAndUpdate(
        requestId,
        { status: "Rejected" },
        { new: true }
      );

      return NextResponse.json({
        message: "Request rejected successfully",
        updatedRequest,
      });
    }

    // ⚠️ Invalid action
    return NextResponse.json(
      { error: "Invalid action. Use 'approve' or 'reject'." },
      { status: 400 }
    );
  } catch (err) {
    console.error("Error updating request:", err);
    return NextResponse.json(
      {
        message: "Failed to update request",
        error: err instanceof Error ? err.message : "Server error",
      },
      { status: 500 }
    );
  }
}
