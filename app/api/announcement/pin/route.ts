import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import AnnouncementModel from "@/model/Announcement";
import {can} from"@/lib/permissions"
import dbConnect from "@/lib/db";

export async function POST(req: Request){
    await dbConnect(); 
    const session = await getServerSession();
    if(!session?.user){
        return NextResponse.json({message:"Unauthorized"}, {status: 401});
    }

    if(!can(session.user.role,"pin")){
        return NextResponse.json({message:"Forbidden"}, {status: 403});
    }

    const { id } = await req.json();
    const updated = await AnnouncementModel.findByIdAndUpdate(id, {pinned:true}, {new:true});
    return NextResponse.json(updated);
}