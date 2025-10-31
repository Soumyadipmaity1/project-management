// import { error } from 'console';
// import { authOptions } from './../auth/[...nextauth]/option';
// import { NextResponse } from 'next/server';
// import { getServerSession, AuthOptions } from 'next-auth';
// import dbConnect from '@/lib/db';
// import UserModel from '@/model/User';
// import { canDomainMember } from '@/lib/permissions';
// import mongoose from 'mongoose';

// export async function GET(req: Request){
//     try{
//         await dbConnect();
//         const session = await getServerSession(authOptions);

//         if(!session?.user){
//             return NextResponse.json({ error: "Unauthorized"}, {status: 401});
//         }

//         const user = await UserModel.findOne({ email: session.user.email});

//         if(!user){
//             return NextResponse.json({ error: "User not found"}, {status: 404});
//         }

//         if(!canDomainMember(user.role, "view")){
//             return NextResponse.json({
//                 error: "Forbidden",
//                 message: "Only leads can view can their domain member"
//             }, {status: 403})
//         }

//         const domainMembers = await UserModel.find({domain: user.projects}, "name email role githubId linkedinId profilePic rollNo").sort({ createdAt: -1});

//         return NextResponse.json(domainMembers, { status: 200});

//     }
//     catch(error){
//         return NextResponse.json({
//             error: "Seerver Error",
//             message: "Failed to  fetch domain members",
//         }, { status: 500});
//     }
// }
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import ProjectModel from "@/model/Projects";
import { canDomainMember } from "@/lib/permissions";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    // Permission check (optional - you can restrict this however you like)
    if (!canDomainMember(user.role, "view")) {
      return NextResponse.json(
        {
          error: "Forbidden",
          message: "You do not have permission to view project members.",
        },
        { status: 403 }
      );
    }

    // ✅ Validate project ID
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    // ✅ Find the project
    const project = await ProjectModel.findById(params.id);
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // ✅ Find all users who are members of this project
    const projectMembers = await UserModel.find(
      { projects: { $in: [project._id] } },
      "name email role githubId linkedinId profilePic rollNo"
    ).sort({ createdAt: -1 });

    return NextResponse.json(projectMembers, { status: 200 });
  } catch (error) {
    console.error("Error fetching project members:", error);
    return NextResponse.json(
      {
        error: "Server Error",
        message: "Failed to fetch project members",
      },
      { status: 500 }
    );
  }
}
