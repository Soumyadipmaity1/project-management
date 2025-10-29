// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import dbConnect from "@/lib/db";
// import { authOptions } from "../../auth/[...nextauth]/option";
// import UserModel from "@/model/User";
// import RequestModel from "@/model/ProjectRequest";
// import ProjectModel from "@/model/Projects";
// import { canRequest } from "@/lib/permissions";

// export async function PATCH(req: Request) {
//   try {
//     await dbConnect();
//     const session = await getServerSession(authOptions);

//     if (!session?.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const user = await UserModel.findOne({ email: session.user.email });
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const allowedToApprove = canRequest(user.role, "approverequest");
//     const allowedToReject = canRequest(user.role, "rejectrequest");

//     // Extract request ID from URL
//     const url = new URL(req.url);
//     const parts = url.pathname.split("/").filter(Boolean);
//     const reqId = parts[parts.length - 1];

//     if (!reqId) {
//       return NextResponse.json({ error: "Request id not provided in URL" }, { status: 400 });
//     }

//     // Parse body safely
//     let body: any = {};
//     try {
//       body = await req.json();
//     } catch (e) {
//       body = {};
//     }

//     const request = await RequestModel.findById(reqId);
//     if (!request) {
//       return NextResponse.json({ error: "Request not found" }, { status: 404 });
//     }

//     // Restrict Lead to their domain
//     if (user.role === "Lead") {
//       const reqDomains = Array.isArray(request.domain)
//         ? request.domain
//         : [String(request.domain || "")];
//       if (!reqDomains.includes(user.domain)) {
//         return NextResponse.json(
//           { error: "You can only manage requests in your domain" },
//           { status: 403 }
//         );
//       }
//     }

//     // Extract lead, co-lead, and action
//     const leadId = body.teamlead || body.projectlead || body.projectLeadName || null;
//     const coLeadId = body.colead || body.coLead || body.coLeadName || null;
//     const action = body.action ? String(body.action).toLowerCase() : null;

//     // ✅ APPROVE FLOW
//     if (leadId || action === "approve") {
//       if (!allowedToApprove) {
//         return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//       }

//       if (!leadId || typeof leadId !== "string" || leadId.trim() === "") {
//         return NextResponse.json(
//           { error: "teamlead id is required for approval" },
//           { status: 400 }
//         );
//       }

//       const leadUser = await UserModel.findById(String(leadId).trim());
//       if (!leadUser) {
//         return NextResponse.json(
//           { error: "Assigned project lead user not found" },
//           { status: 400 }
//         );
//       }

//       let coLeadUser = null;
//       if (coLeadId && typeof coLeadId === "string" && coLeadId.trim() !== "") {
//         coLeadUser = await UserModel.findById(String(coLeadId).trim());
//         if (!coLeadUser) {
//           return NextResponse.json(
//             { error: "Assigned co-lead user not found" },
//             { status: 400 }
//           );
//         }
//       }

//       // ✅ Update request instead of deleting
//       request.status = "Approved";
//       request.projectlead = leadUser._id;
//       request.colead = coLeadUser ? coLeadUser._id : undefined;
//       await request.save();

//       // ✅ Create project using request info
//       const projectPayload: any = {
//         title: request.title,
//         description: request.description,
//         domain: Array.isArray(request.domain)
//           ? request.domain
//           : [String(request.domain || "")],
//         projectlead: leadUser._id,
//         colead: coLeadUser ? coLeadUser._id : undefined,
//         members: [leadUser._id].concat(coLeadUser ? [coLeadUser._id] : []),
//         approved: true,
//         requestId: request._id,
//       };

//       const newProject = await ProjectModel.create(projectPayload);

//       // ✅ Update lead user — only if not Admin or Lead
//       try {
//         if (leadUser.role !== "Admin" && leadUser.role !== "Lead") {
//           leadUser.role = "ProjectLead";
//         }
//         leadUser.projects = leadUser.projects || [];
//         const alreadyAdded = leadUser.projects.some(
//           (p: any) => p.projectId?.toString() === newProject._id.toString()
//         );
//         if (!alreadyAdded) {
//           leadUser.projects.push({
//             projectId: newProject._id,
//             projectName: newProject.title,
//           });
//         }
//         await leadUser.save();
//       } catch (e) {
//         console.warn("Failed to update lead user after project creation:", e);
//       }

//       // ✅ Update co-lead user — only if not Admin or Lead
//       if (coLeadUser) {
//         try {
//           if (coLeadUser.role !== "Admin" && coLeadUser.role !== "Lead") {
//             coLeadUser.role = "CoLead";
//           }
//           coLeadUser.projects = coLeadUser.projects || [];
//           const alreadyAdded = coLeadUser.projects.some(
//             (p: any) => p.projectId?.toString() === newProject._id.toString()
//           );
//           if (!alreadyAdded) {
//             coLeadUser.projects.push({
//               projectId: newProject._id,
//               projectName: newProject.title,
//             });
//           }
//           await coLeadUser.save();
//         } catch (e) {
//           console.warn("Failed to update co-lead user:", e);
//         }
//       }

//       return NextResponse.json(
//         {
//           message: "Request approved successfully, project created",
//           project: newProject,
//           request,
//         },
//         { status: 200 }
//       );
//     }

//     // ✅ REJECT FLOW
//     if (action === "reject" || (!leadId && !action)) {
//       if (!allowedToReject) {
//         return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//       }

//       const updatedRequest = await RequestModel.findByIdAndUpdate(
//         reqId,
//         { status: "Rejected" },
//         { new: true }
//       );
//       return NextResponse.json(
//         { message: "Request rejected successfully", updatedRequest },
//         { status: 200 }
//       );
//     }

//     return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
//   } catch (err) {
//     console.error("Error updating request:", err);
//     return NextResponse.json(
//       {
//         message: "Failed to update request",
//         error: err instanceof Error ? err.message : String(err),
//       },
//       { status: 500 }
//     );
//   }
// }

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

    // Extract request ID from URL
    const url = new URL(req.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const reqId = parts[parts.length - 1];

    if (!reqId) {
      return NextResponse.json({ error: "Request id not provided in URL" }, { status: 400 });
    }

    // Parse body safely
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

    // Restrict Lead to their domain
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

    const action = body.action ? String(body.action).toLowerCase() : null;
    const leadId = body.teamlead || body.projectlead || null;
    const coLeadId = body.colead || null;

    // ✅ APPROVE FLOW
    if (action === "approve") {
      if (!allowedToApprove) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      if (!leadId) {
        return NextResponse.json(
          { error: "Lead ID is required for approval" },
          { status: 400 }
        );
      }

      const leadUser = await UserModel.findById(leadId);
      if (!leadUser) {
        return NextResponse.json({ error: "Lead user not found" }, { status: 404 });
      }

      let coLeadUser = null;
      if (coLeadId) {
        coLeadUser = await UserModel.findById(coLeadId);
        if (!coLeadUser) {
          return NextResponse.json({ error: "Co-lead user not found" }, { status: 404 });
        }
      }

      // ✅ Update request status only (no projectlead/colead fields exist)
      request.status = "Approved";
      await request.save();

      // ✅ Create new project
      const projectPayload: any = {
        title: request.title,
        description: request.description,
        domain: Array.isArray(request.domain)
          ? request.domain
          : [String(request.domain || "")],
        projectlead: leadUser._id,
        colead: coLeadUser ? coLeadUser._id : undefined,
        members: [leadUser._id].concat(coLeadUser ? [coLeadUser._id] : []),
        approved: true,
        requestId: request._id,
      };

      const newProject = await ProjectModel.create(projectPayload);

      // ✅ Update Lead’s role and projects
      try {
        if (leadUser.role !== "Admin" && leadUser.role !== "Lead") {
          leadUser.role = "ProjectLead";
        }
        leadUser.projects = leadUser.projects || [];
        if (
          !leadUser.projects.some(
            (p: any) => p.projectId?.toString() === newProject._id.toString()
          )
        ) {
          leadUser.projects.push({
            projectId: newProject._id,
            projectName: newProject.title,
          });
        }
        await leadUser.save();
      } catch (e) {
        console.warn("Failed to update lead:", e);
      }

      // ✅ Update Co-lead if present
      if (coLeadUser) {
        try {
          if (coLeadUser.role !== "Admin" && coLeadUser.role !== "Lead") {
            coLeadUser.role = "CoLead";
          }
          coLeadUser.projects = coLeadUser.projects || [];
          if (
            !coLeadUser.projects.some(
              (p: any) => p.projectId?.toString() === newProject._id.toString()
            )
          ) {
            coLeadUser.projects.push({
              projectId: newProject._id,
              projectName: newProject.title,
            });
          }
          await coLeadUser.save();
        } catch (e) {
          console.warn("Failed to update co-lead:", e);
        }
      }

      return NextResponse.json(
        {
          message: "Request approved successfully, project created",
          project: newProject,
          request,
        },
        { status: 200 }
      );
    }

    // ✅ REJECT FLOW
    if (action === "reject") {
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

    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
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
