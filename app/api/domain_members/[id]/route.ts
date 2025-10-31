
export const dynamic = "force-dynamic";

import { error } from 'console';
import { authOptions } from './../../auth/[...nextauth]/option';
import { NextResponse } from 'next/server';
import { getServerSession, AuthOptions } from 'next-auth';
import dbConnect from '@/lib/db';
import UserModel from '@/model/User';
import { canDomainMember } from '@/lib/permissions';
import mongoose from 'mongoose';
import ProjectModel from "@/model/Projects";




export async function DELETE(req: Request, {params} : {params: {id: string}}){
    try{
     await dbConnect();
    const session = await getServerSession(authOptions);

    if(!session?.user){
        return NextResponse.json({ message: "Unauthorized"}, {status: 401});
    }

    const user = await UserModel.findOne({ email: session.user.email});

    if(!user){
        return NextResponse.json({ message: "User not found"}, {status: 404});
    }
     if(!canDomainMember(user.role, "delete")){
        return NextResponse.json({
            error: "Forbidden",
            message: "ONly leads are allowed to delete domain members"
        }, {status: 403})
     }

      if (!mongoose.Types.ObjectId.isValid(params.id)) {
           return NextResponse.json({ error: "Invalid member ID" }, { status: 400 });
         }
     
    const deleteMember =  await UserModel.findByIdAndDelete(params.id);

     if (!deleteMember) {
          return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

    return NextResponse.json({
        messgae: "Member deleted succesfully"
    }, {status: 200});
    }
    catch(error){
      return NextResponse.json({
        error: "Server Error"
      }, {status: 500})
    }
}


export async function PUT(req: Request, {params}: {params: {id: string}}){
    try{
       await dbConnect();
       const session = await getServerSession(authOptions);

       if(!session?.user){
        return NextResponse.json({
            message: "Unauthorized",
        }, {status: 401})
       }

       const user = await UserModel.findOne({ email: session.user.email});

       if(!user){
        return NextResponse.json({
            messgae: "User not found",
        }, {status: 404})
       }

       if(!canDomainMember(user.role, "update")){
        return NextResponse.json({
            error: "Forbidden",
        }, {status: 403})
       }

       if(!mongoose.Types.ObjectId.isValid(params.id)){
        return NextResponse.json({
            error: "Couldnot find member with this id"
        }, {status: 400});
       }

       const body = await req.json();
       const {role} = body;

    const updatedMember = await UserModel.findByIdAndUpdate(
        params.id,
        {role: role},
        {new: true}
    )

    if(!updatedMember){
        return NextResponse.json({
            error: "Member not found"
        }, {status: 404})
    }

    return NextResponse.json(
    { message: `Member role updated successfully to '${role}'`, updatedMember }
    , {status: 200});
    }
    catch(error){
        console.error("Error updating member role:", error);
        return NextResponse.json({
            error: "Server Error"
        }, {status: 500})
    }
}