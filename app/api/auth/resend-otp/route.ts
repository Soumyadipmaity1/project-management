import { corsResponse, handleOptions } from "@/lib/cors";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
// import SibApiV3Sdk from "sib-api-v3-sdk";
import { NextResponse, NextRequest } from "next/server";
const SibApiV3Sdk = require("sib-api-v3-sdk");

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

function getBrevoClient() {
  const client = SibApiV3Sdk.ApiClient.instance;
  if (process.env.BREVO_API_KEY) {
    client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY as string;
  }
  return new SibApiV3Sdk.TransactionalEmailsApi();
}

async function sendOtpEmail(email: string, otp: string) {
  const tranEmailApi = getBrevoClient();
  const sendSmtpEmail: any = {
    sender: { name: "WorkPilot", email: process.env.FROM_EMAIL || process.env.SMTP_USER },
    to: [{ email }],
    subject: "Your WorkPilot OTP",
    htmlContent: `<p>Your OTP is <b>${otp}</b>. It expires in 2 minutes.</p>`,
  };

  await tranEmailApi.sendTransacEmail(sendSmtpEmail);
}

function withCorsJson(body: any, status = 200) {
  const res = NextResponse.json(body, { status });
  res.headers.set("Access-Control-Allow-Origin", "https://workpilot-f.onrender.com");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Access-Control-Allow-Credentials", "true");
  return res;
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const email = body?.email?.toString?.();
    if (!email) return withCorsJson({ message: "Email is required" }, 400);

    const user = await UserModel.findOne({ email });
    if (!user) return withCorsJson({ message: "User not found" }, 404);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    let emailError: string | null = null;
    try {
      await sendOtpEmail(email, otp);
    } catch (e: any) {
      console.error("DEBUG resend-otp: sendOtpEmail failed", e);
      emailError = String(e);
    }

    const responseBody: any = { message: "OTP generated and stored" };
    if (emailError) {
      responseBody.warning = "Failed to send OTP email. Please try 'Resend OTP' again later.";
      responseBody.error = emailError;
      return withCorsJson(responseBody, 200);
    }

    return withCorsJson(responseBody, 200);
  } catch (error: any) {
    console.error("Resend OTP error:", error);
    return withCorsJson({ message: "Internal Server Error" }, 500);
  }
}
