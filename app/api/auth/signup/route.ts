import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password, rollNo, domain, role } = await req.json();

    if (!name || !email || !password || !rollNo || !domain || !role) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const existingRollNo = await UserModel.findOne({ rollNo });
    if (existingRollNo) {
      return NextResponse.json(
        { message: "Roll number already registered" },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      rollNo,
      domain,
      role,
    });

    await user.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
  