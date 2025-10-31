import { error } from 'console';
import { authOptions } from './../auth/[...nextauth]/option';
import { NextResponse } from 'next/server';
import { getServerSession, AuthOptions } from 'next-auth';
import dbConnect from '@/lib/db';
import UserModel from '@/model/User';
import { canDomainMember } from '@/lib/permissions';
import mongoose from 'mongoose';

export async function GET(req: Request){
    try{
        await dbConnect();
        const session = await getServerSession(authOptions);

        if(!session?.user){
            return NextResponse.json({ error: "Unauthorized"}, {status: 401});
        }

        const user = await UserModel.findOne({ email: session.user.email});

        if(!user){
            return NextResponse.json({ error: "User not found"}, {status: 404});
        }

        if(!canDomainMember(user.role, "view")){
            return NextResponse.json({
                error: "Forbidden",
                message: "Only leads can view can their domain member"
            }, {status: 403})
        }

        const domainMembers = await UserModel.find({domain: user.domain}, "name email role githubId linkedinId profilePic rollNo").sort({ createdAt: -1});

        return NextResponse.json(domainMembers, { status: 200});

    }
    catch(error){
        return NextResponse.json({
            error: "Seerver Error",
            message: "Failed to  fetch domain members",
        }, { status: 500});
    }
}
