import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import AnnouncementModel from "@/model/Announcement";
import { can } from "@/lib/permissions";
import dbConnect from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";


export async function PUT(req: Request, {params}:{ params: {id:string}})
{
    await dbConnect(); 
    const session = await getServerSession(authOptions);
    if(!session?.user) return NextResponse.json({error: "Unauthorzied"}, {status:401});

    if(!can(session.user.role,"update")){
        return NextResponse.json({error: "Forbidden"}, {status: 403})
    }
    const body = await req.json();
    const updated = await AnnouncementModel.findByIdAndUpdate(params.id,body,{ new:true });
    return NextResponse.json(updated);
}

export async function DELETE(req:Request, {params}: {params: {id:string}}){
    await dbConnect(); 
    const session = await getServerSession(authOptions);
    if(!session?.user) return NextResponse.json({error:"Unauthorized"}, {status: 401});

    if(!can(session.user.role, "delete")){
        return NextResponse.json({error: "Forbidden"}, {status: 403});
    }
    await AnnouncementModel.findByIdAndDelete(params.id);
   return NextResponse.json({ success: true });
}