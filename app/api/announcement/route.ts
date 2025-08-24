import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import AnnouncementModel from "@/model/Announcement";
import { can } from "@/lib/permissions";

export async function GET(){
    const announcements = await AnnouncementModel.find().sort({ createdAt:-1});
    return NextResponse.json(announcements);
};

export async function POST(req:Request){
    const session = await getServerSession();
    if(!session?.user){
        return NextResponse.json({ message: "Unauthorized"}, {status:401});
    }
    if (!can(session.user.role, "create")) {
  return NextResponse.json({ message: "Forbidden" }, { status: 403 });
}

}