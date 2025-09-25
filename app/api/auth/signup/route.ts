import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import cloudinary from "@/lib/cloudinary";
import nodemailer from "nodemailer";

async function sendOtpEmail(email: string,otp: string){
   const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT)|| 546,
    secure: false,
     auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
   });

   await transporter.sendMail({
    from: `"WorkPilot" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Verify your email (Workpilot)`,
    text: `Your OTP is ${otp}. It expires in 2 minutes.`,
    html: `<p>Your OTP is <b>${otp}</b>. It expires in 2 minutes.</p>`,
   })
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
    const file = form.get("file") as File || null;
    const githubId = form.get("githubId")?.toString();
    const linkedinId =form.get("linkedinId")?.toString();


    function generateOtp(){
        return Math.floor(100000+ Math.random()*900000).toString();
    };


    const otp = generateOtp();
    const otpExpiry = new Date(Date.now()+ 2*60*1000);

    if (!name || !email || !password || !rollNo || !domain || !role || !file || !githubId || !linkedinId)  {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }   
      );
    }

    const emailRegex = /^(2[2-9]|30)[0-9]{5,9}@kiit\.ac\.in$/i;
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

    if(!file.type.startsWith("image/")){
           return NextResponse.json({
            message: "File must be an image",
           }, {
            status: 400
           })
    }
    const MAX_SIZE= 5 *1024*1024;
    const buffer = Buffer.from(await file.arrayBuffer());
    if(buffer.length > MAX_SIZE){
          return NextResponse.json({
            message: "Image should not exceed more than 5MB",
          }, {
            status: 400,
          }
        )
    }
    const dataurl = `data:${file.type};base64,${buffer.toString("base64")}`;
    const uploadResult = await cloudinary.uploader.upload(dataurl,{
      folder: "workpilot/profile_pics",
      transformation: [{ width: 500, height: 500, crop: "thumb", gravity: "face" }],
      resource_type: "image",
      overwrite: true,
      quality: "auto",
      fetch_format: "auto",
    });


  const linkedinIdRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/i;
  if(!linkedinIdRegex.test(linkedinId)){
    return NextResponse.json({
      message: "Invalid LinkedIn Id",
    },{
      status: 400,
    }
  )
  }

  const githubIdRegex = /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/i;
  if(!githubIdRegex.test(githubId)){
    return NextResponse.json({
      message: "Invalid Github Id",
    },{
      status: 400,
    }
  )
  }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      rollNo,
      domain,
      role,
      githubId,
      linkedinId,
      profilePic: uploadResult.secure_url,
      profilePicPublicId: uploadResult.public_id,
      otp,
      otpExpiry,
      emailVerified: false,
    });

    await user.save();
    await sendOtpEmail(email,otp);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
  