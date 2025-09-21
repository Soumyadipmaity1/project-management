// import { NextResponse } from "next/server";
// import path from "path";
// import { promises as fs } from "fs";

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File;

//     if (!file) {
//       return NextResponse.json({ error: "No file provided" }, { status: 400 });
//     }
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const uploadDir = path.join(process.cwd(), "public/uploads");
//     await fs.mkdir(uploadDir, { recursive: true });

//     const fileName = `${Date.now()}-${file.name}`;
//     const filePath = path.join(uploadDir, fileName);

//     await fs.writeFile(filePath, buffer);
//     const fileUrl = `/uploads/${fileName}`;

//     return NextResponse.json({ url: fileUrl }, { status: 200 });
//   } catch (err: any) {
//     console.error("Upload error:", err);
//     return NextResponse.json(
//       { error: "File upload failed", details: err.message },
//       { status: 500 }
//     );
//   }
// }
// app/api/upload/route.ts
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import UserModel from "@/model/User"
import dbConnect from "@/lib/db";

export const runtime = "edge" /* or "nodejs" depending on your deployment; if you get issues, remove */;

export async function POST(request: Request) {
  // Connect DB
   await dbConnect();
  // Parse client FormData
  const form = await request.formData();
  const file = form.get("file") as File | null;
  const userId = form.get("userId")?.toString();

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (!userId) return NextResponse.json({ error: "No userId provided" }, { status: 400 });

  // Basic validation
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Uploaded file must be an image" }, { status: 400 });
  }
  // Optional size limit (e.g., 5MB)
  const MAX_SIZE = 5 * 1024 * 1024;
  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.length > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  // Convert image buffer to data URI for cloudinary.uploader.upload
  const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

  try {
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "workpilot/profile_pics",
      transformation: [{ width: 500, height: 500, crop: "thumb", gravity: "face" }],
      resource_type: "image",
      overwrite: true,
      quality: "auto",
      fetch_format: "auto",
    });

    // Save to DB. Store secure_url and public_id
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResult.secure_url,
        profilePicPublicId: uploadResult.public_id,
      },
      { new: true }
    ).select("-password");

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      user: updatedUser,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
