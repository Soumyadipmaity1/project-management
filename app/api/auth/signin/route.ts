import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";

await dbConnect();

export async function POST(req: Request){
    try {
        const {email,password} = await req.json();
        if(!email || !password){
            return NextResponse.json({message: "All fields email and password arew required"}, {status: 400});
        }
        const user = await UserModel.findOne({ email});
        if(!user){
            return NextResponse.json({message: "User not exist"}, {status: 400});
        }
       
        const getPassword = user.password;
        const isPassword = await bcrypt.compare(password, getPassword);
        if(!isPassword){
            return NextResponse.json({ message:"Invalid crendentials"}, {status: 400});
        }

        return NextResponse.json({ message: "User signin successfully" , user:{
            name: user.name,
            email: user.email,
            role: user.role,
            id: user._id,
        }}
        , {status: 200});

    } catch (error) {
        return NextResponse.json({ message: "Internal Server error"}, {status: 400})
    }
}