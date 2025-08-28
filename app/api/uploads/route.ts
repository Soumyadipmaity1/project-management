import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);
    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({ url: fileUrl }, { status: 200 });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "File upload failed", details: err.message },
      { status: 500 }
    );
  }
}
