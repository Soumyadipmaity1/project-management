import { SessionProvider } from 'next-auth/react';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/option";
import UserModel from "@/model/User";
import RequestModel from "@/model/ProjectRequest";
import { canRequest } from "@/lib/permissions";


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

    if (user.role === "Lead" && request.domain !== user.domain) {
      return NextResponse.json(
        { error: "You can only manage requests in your domain" },
        { status: 403 }
      );
    }

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