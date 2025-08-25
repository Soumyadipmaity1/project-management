import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import ProjectModel from "@/model/Projects";
import {canProject} from "@/lib/permissions";
import dbConnect from "@/lib/db";


export async function PUT(req:Request, {params}: { params: { id: string }}){
    await dbConnect();
    const session = await getServerSession();
    if(!session?.user){
        return NextResponse.json({ message: "Unauthorized"}, {status:401});
    }

    const {role} = session.user;
    if(!canProject(role,"editproject")){
        return NextResponse.json({ message: "Forbidden"}, {status:403});
    }

    try {
    const data = await req.json();
    const newProject = await ProjectModel.findByIdAndUpdate(params.id,data,{
        new:true,   
    }); 
    return NextResponse.json(newProject, {status: 201});
    } catch (error) {
    return NextResponse.json({ message: "Error creating project", error }, { status: 500 });
    }
  }