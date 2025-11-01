// export const dynamic = "force-dynamic";


// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import dbConnect from "@/lib/db";
// import UserModel from "@/model/User";

// export async function POST(req: Request){
//     await dbConnect();
//     try {
//         const {email,password} = await req.json();  
//         if(!email || !password){
//             return NextResponse.json({message: "All fields email and password arew required"}, {status: 400});
//         }
//         const user = await UserModel.findOne({ email});
//         if(!user){
//             return NextResponse.json({message: "User not exist"}, {status: 400});
//         }
       
//         const getPassword = user.password;
//         const isPassword = await bcrypt.compare(password, getPassword);
//         if(!isPassword){
//             return NextResponse.json({ message:"Invalid crendentials"}, {status: 400});
//         }

//         return NextResponse.json({ message: "User signin successfully" , user:{
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             id: user._id,
//         }}
//         , {status: 200});

//     } catch (error) {
//         return NextResponse.json({ message: "Internal Server error"}, {status: 400})
//     }
// }



export const dynamic = "force-dynamic";

import { corsResponse, handleOptions } from "@/lib/cors";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";

export async function OPTIONS() {
  return handleOptions();
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return corsResponse({ message: "Email and password are required" }, 400);
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return corsResponse({ message: "User does not exist" }, 400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return corsResponse({ message: "Invalid credentials" }, 400);
    }

    return corsResponse(
      {
        message: "User signed in successfully",
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        },
      },
      200
    );
  } catch (error: any) {
    console.error("Signin error:", error);
    return corsResponse({ message: "Internal Server Error" }, 500);
  }
}


