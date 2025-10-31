import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";

export async function PUT(req: Request, { params }: any) {
  await dbConnect();
  const { role } = await req.json();
  const updated = await UserModel.findByIdAndUpdate(params.id, { role }, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: any) {
  await dbConnect();
  await UserModel.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted successfully" });
}
