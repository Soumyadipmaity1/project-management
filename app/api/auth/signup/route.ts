export const dynamic = "force-dynamic";

import { corsResponse, handleOptions } from "@/lib/cors";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import cloudinary from "@/lib/cloudinary";

// Remove SDK import — use fetch to call Brevo REST API at runtime to avoid bundler issues

import { NextRequest } from "next/server";

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}

// Send OTP via Brevo REST API using fetch (runtime-only, avoids bundler issues)
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

export async function POST(req: Request) {
  try {
    await dbConnect();

    const form = await req.formData();
    const name = form.get("name")?.toString();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    const rollNo = form.get("rollNo")?.toString();
    const domain = form.get("domain")?.toString();
    const role = form.get("role")?.toString();
    const file = form.get("file") as File | null;
    const githubId = form.get("githubId")?.toString();
    const linkedinId = form.get("linkedinId")?.toString();

    if (!name || !email || !password || !rollNo || !domain || !role || !file || !githubId || !linkedinId) {
      return corsResponse({ message: "Please fill all required fields" }, 400);
    }

    const emailRegex = /^(2[2-9]|30)[0-9]{5,9}@kiit\.ac\.in$/i;
    if (!emailRegex.test(email)) return corsResponse({ message: "Invalid KIIT email format" }, 400);

    if (password.length < 6) return corsResponse({ message: "Password too short" }, 400);

    const existingUser = await UserModel.findOne({ $or: [{ email }, { rollNo }] });
    if (existingUser) return corsResponse({ message: "User already exists" }, 400);

    if (!file.type.startsWith("image/")) return corsResponse({ message: "File must be an image" }, 400);

    const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.length > 5 * 1024 * 1024) return corsResponse({ message: "Image size exceeds 5MB" }, 400);

    const dataurl = `data:${file.type};base64,${buffer.toString("base64")}`;
    let uploadResult: any = null;
    try {
      uploadResult = await cloudinary.uploader.upload(dataurl, {
        folder: "workpilot/profile_pics",
        transformation: [{ width: 500, height: 500, crop: "thumb", gravity: "face" }],
      });
    } catch (uploadErr: any) {
      console.error("DEBUG signup: Cloudinary upload failed", uploadErr);
      return corsResponse({ message: "Cloudinary upload failed", error: String(uploadErr) }, 500);
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      rollNo,
      domain,
      role,
      githubId,
      linkedinId,
      profilePic: uploadResult.secure_url,
      otp,
      otpExpiry,
    });

    await newUser.save();

    let emailError: string | null = null;
    try {
      await sendOtpEmail(email, otp);
    } catch (err: any) {
      emailError = String(err);
    }

    const responseBody: any = { message: "User created successfully" };
    if (emailError) {
      responseBody.warning = "Failed to send OTP email. Please use 'Resend OTP' option.";
      responseBody.emailError = emailError;
    }

    return corsResponse(responseBody, 201);
  } catch (error: any) {
    console.error("Signup error:", error);
    return corsResponse({ message: "Internal Server Error" }, 500);
  }
}
