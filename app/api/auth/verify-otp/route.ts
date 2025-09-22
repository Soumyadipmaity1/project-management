import UserModel from "@/model/User";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json({ message: "Email already verified" }, { status: 400 });
    }

    const now = new Date();

    if (user.otp?.trim() !== otp.trim()) {
      return NextResponse.json({ message: "Incorrect OTP" }, { status: 400 });
    }

    if (!user.otpExpiry || user.otpExpiry < now) {
      return NextResponse.json({ message: "OTP expired" }, { status: 400 });
    }

    user.emailVerified = true;
    user.otp = "";
    user.otpExpiry = new Date(0);

    await user.save();

    return NextResponse.json({
      message: "Successfully verified! Redirecting to dashboard",
    }, { status: 200 });

  } catch (error: any) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
