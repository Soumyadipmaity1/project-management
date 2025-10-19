import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { canRequest } from "@/lib/permissions";
import dbConnect from "@/lib/db";
import { authOptions } from "../auth/[...nextauth]/option";
import RequestModel from "@/model/ProjectRequest";
import UserModel from "@/model/User"; 

export async function GET(req: Request){
    try{
        await dbConnect(); 
        const session = await getServerSession(authOptions);
        console.log("Session:", session); 

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const user = await UserModel.findOne({ email: session.user.email });
        console.log("User from DB:", user);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        let filter = {};

        if(user.role === "Member"){
             filter = {_id: user._id};
        }

        else if (user.role === "Lead"){
             filter = {domain : user.domain}
        }

        else if (user.role === "ProjectLead" || user.role === "CoLead"){
            filter = {
                $or: [
                    { projectLead: user._id },
                    { coLead: user._id },
                    { user: user._id }, 
                ]
            }
        }

        else if (user.role === "Admin"){
            filter = {};
        }

        const request = await RequestModel.find(filter)
                        .populate("user","name email role")
                        .populate("projectlead","name email role")
                        .populate("colead","name email role")
                        .sort({ createdAt: -1});
        return NextResponse.json(request.map(r => ({...r.toObject(), _id: r.user.toString()}))) 
    }
    catch(error){
        console.log("Error fetcing request", error);
        return NextResponse.json({ message: "ERror fetching requests", error}, {status: 500});
    }
}


export async function POST(req: Request) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        console.log("Session:", session); 

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const user = await UserModel.findOne({ email: session.user.email });
        console.log("User from DB:", user);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const userRole = user.role ;
        console.log("User role:", userRole); 

        if (!canRequest(userRole, "create")) {
            return NextResponse.json({ 
                error: "Forbidden",
                details: `Role '${userRole}' cannot create requests`
            }, { status: 403 });
        }

        const body = await req.json();
        console.log("Request body:", body);

        const { title, domain, description, link } = body;

        if (!title || title.trim().length < 3 || title.trim().length > 100) {
            return NextResponse.json({
                error: "Title must be between 3 and 100 characters"
            }, { status: 400 });
        }

        if (!domain) {
            return NextResponse.json({
                error: "Domain is required"
            }, { status: 400 });
        }

        if (!description || description.trim().length < 10 || description.trim().length > 1000) {
            return NextResponse.json({
                error: "Description must be between 10 and 1000 characters"
            }, { status: 400 });
        }

        if (!link || link.trim().length < 7) {
            return NextResponse.json({
                error: "Link must be at least 7 characters long"
            }, { status: 400 });
        }

        const newRequest = await RequestModel.create({
            user: user._id, 
            title: title.trim(),
            domain: domain.trim(),
            description: description.trim(),
            link: link.trim(),  
        });

        console.log("Request created:", newRequest); 

        return NextResponse.json(
            { message: "Request created successfully", request: newRequest }, 
            { status: 201 }
        );
    } catch (error) {
        console.error("Error details:", error);
        return NextResponse.json(
            { 
                message: "Failed to create request", 
                error: error instanceof Error ? error.message : "Server error" 
            }, 
            { status: 500 }
        );
    }
}