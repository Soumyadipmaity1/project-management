// export const dynamic = "force-dynamic";


// import { error } from 'console';
// import { authOptions } from './../auth/[...nextauth]/option';
// import { NextResponse } from 'next/server';
// import { getServerSession, AuthOptions } from 'next-auth';
// import dbConnect from '@/lib/db';
// import UserModel from '@/model/User';
// import { canDomainMember } from '@/lib/permissions';
// import mongoose from 'mongoose';
// import ProjectModel from "@/model/Projects";


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

//         const domainMembers = await UserModel.find({domain: user.domain}, "name email role githubId linkedinId profilePic rollNo").sort({ createdAt: -1});

//         return NextResponse.json(domainMembers, { status: 200});

//     }
//     catch(error){
//         return NextResponse.json({
//             error: "Seerver Error",
//             message: "Failed to  fetch domain members",
//         }, { status: 500});
//     }
// }
export const dynamic = "force-dynamic";

import { corsResponse, handleOptions } from "@/lib/cors";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import { canDomainMember } from "@/lib/permissions";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user) return corsResponse({ message: "Unauthorized" }, 401);

    const user = await UserModel.findOne({ email: session.user.email });
    if (!user) return corsResponse({ message: "User not found" }, 404);

    if (!canDomainMember(user.role, "view"))
      return corsResponse({ message: "Forbidden" }, 403);

    const domainMembers = await UserModel.find(
      { domain: user.domain },
      "name email role githubId linkedinId profilePic rollNo"
    ).sort({ createdAt: -1 });

    return corsResponse(domainMembers, 200);
  } catch (error: any) {
    console.error("Fetch domain members error:", error);
    return corsResponse({ message: "Server Error" }, 500);
  }
}
