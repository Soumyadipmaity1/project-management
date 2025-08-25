import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import AnnouncementModel from "@/model/Announcement";
import { can } from "@/lib/permissions";
import dbConnect from "@/lib/db";

export async function GET(){
    await dbConnect(); 
    const announcements = await AnnouncementModel.find().sort({ createdAt:-1});
    return NextResponse.json(announcements);
};

export async function POST(req:Request){
    await dbConnect(); 
    const session = await getServerSession();
    if(!session?.user){
        return NextResponse.json({ message: "Unauthorized"}, {status:401});
    }
    if (!can(session.user.role, "create")) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await req.json();
        if (!body.title || !body.content) {
            return NextResponse.json({ message: "Title and content are required" }, { status: 400 });
        }
        const newAnn = await AnnouncementModel.create({
            ...body
        });
        return NextResponse.json(newAnn, {status: 201});
    } catch (error: any) {
        return NextResponse.json({ message: "Error creating announcement", error: error?.message || String(error) }, { status: 500 });
    }
}