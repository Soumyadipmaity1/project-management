import { corsResponse, handleOptions } from "@/lib/cors";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import { NextResponse, NextRequest } from "next/server";

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

// Send OTP via Brevo REST API using fetch (runtime-only)
async function sendOtpEmail(email: string, otp: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.FROM_EMAIL || process.env.SMTP_USER || `no-reply@workpilot.com`;
  if (!apiKey) throw new Error("Brevo API key missing");

  const payload = {
    sender: { name: "WorkPilot", email: senderEmail },
    to: [{ email }],
    subject: "Your WorkPilot OTP",
    htmlContent: `<p>Your OTP is <b>${otp}</b>. It expires in 2 minutes.</p>`,
  };

  const resp = await fetch("https://api.brevo.com/v3/smtp/email", ({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  } as any));

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Brevo send failed: ${resp.status} ${text}`);
  }

  return resp.json();
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
