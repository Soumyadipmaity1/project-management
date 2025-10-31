export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import { authOptions } from "../../auth/[...nextauth]/option";
import UserModel from "@/model/User";
import RequestModel from "@/model/ProjectRequest";
import ProjectModel from "@/model/Projects";
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

    const allowedToApprove = canRequest(user.role, "approverequest");
    const allowedToReject = canRequest(user.role, "rejectrequest");

    const url = new URL(req.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const reqId = parts[parts.length - 1];

    if (!reqId) {
      return NextResponse.json(
        { error: "Request id not provided in URL" },
        { status: 400 }
      );
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const request = await RequestModel.findById(reqId);
    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (user.role === "Lead") {
      const reqDomains = Array.isArray(request.domain)
        ? request.domain
        : [String(request.domain || "")];
      if (!reqDomains.includes(user.domain)) {
        return NextResponse.json(
          { error: "You can only manage requests in your domain" },
          { status: 403 }
        );
      }
    }

    const leadId = body.teamlead || body.projectlead || body.projectLeadName || null;
    const coLeadId = body.colead || body.coLead || body.coLeadName || null;
    const action = body.action ? String(body.action).toLowerCase() : null;

    if (leadId || action === "approve") {
      if (!allowedToApprove) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      if (!leadId || typeof leadId !== "string" || leadId.trim() === "") {
        return NextResponse.json(
          { error: "teamlead id is required for approval" },
          { status: 400 }
        );
      }

      const leadUser = await UserModel.findById(String(leadId).trim());
      if (!leadUser) {
        return NextResponse.json(
          { error: "Assigned project lead user not found" },
          { status: 400 }
        );
      }

      let coLeadUser = null;
      if (coLeadId && typeof coLeadId === "string" && coLeadId.trim() !== "") {
        coLeadUser = await UserModel.findById(String(coLeadId).trim());
        if (!coLeadUser) {
          return NextResponse.json(
            { error: "Assigned co-lead user not found" },
            { status: 400 }
          );
        }
      }

      request.status = "Approved";
      request.projectlead = leadUser._id;
      request.colead = coLeadUser ? coLeadUser._id : undefined;
      await request.save();

      const populatedRequest = await RequestModel.findById(request._id)
        .populate("user", "name email _id")
        .populate("projectlead", "name email _id")
        .populate("colead", "name email _id")
        .lean();

      const projectPayload: any = {
        title: request.title,
        description: request.description,
        domain: Array.isArray(request.domain)
          ? request.domain
          : [String(request.domain || "")],
        projectlead: leadUser._id,
        colead: coLeadUser ? coLeadUser._id : "",
        members: [leadUser._id].concat(coLeadUser ? [coLeadUser._id] : []),
        approved: true,
        requestId: request._id,
        image: request.image,
        startDate:request.startDate,
        completionDate: request.endDate,
      };

      const newProject = await ProjectModel.create(projectPayload);

      try {
        if (leadUser.role !== "Admin" && leadUser.role !== "Lead") {
          leadUser.role = "ProjectLead";
        }
        leadUser.projects = leadUser.projects || [];
        const alreadyAdded = leadUser.projects.some(
          (p: any) => p.projectId?.toString() === newProject._id.toString()
        );
        if (!alreadyAdded) {
          leadUser.projects.push({
            projectId: newProject._id,
            projectName: newProject.title,
          });
        }
        await leadUser.save();
      } catch (e) {
        console.warn("Failed to update lead user after project creation:", e);
      }

      // ✅ Update Co-Lead user
      if (coLeadUser) {
        try {
          if (coLeadUser.role !== "Admin" && coLeadUser.role !== "Lead") {
            coLeadUser.role = "CoLead";
          }
          coLeadUser.projects = coLeadUser.projects || [];
          const alreadyAdded = coLeadUser.projects.some(
            (p: any) => p.projectId?.toString() === newProject._id.toString()
          );
          if (!alreadyAdded) {
            coLeadUser.projects.push({
              projectId: newProject._id,
              projectName: newProject.title,
            });
          }
          await coLeadUser.save();
        } catch (e) {
          console.warn("Failed to update co-lead user:", e);
        }
      }

      return NextResponse.json(
        {
          message: "Request approved successfully, project created",
          project: newProject,
          request: populatedRequest,
        },
        { status: 200 }
      );
    }

    if (action === "reject" || (!leadId && !action)) {
      if (!allowedToReject) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      const updatedRequest = await RequestModel.findByIdAndUpdate(
        reqId,
        { status: "Rejected" },
        { new: true }
      );

      return NextResponse.json(
        { message: "Request rejected successfully", updatedRequest },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Error updating request:", err);
    return NextResponse.json(
      {
        message: "Failed to update request",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
