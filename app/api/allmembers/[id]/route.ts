export const dynamic = "force-dynamic";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import { corsResponse, handleOptions } from "@/lib/cors";


export async function OPTIONS() {
  return handleOptions();
}


export async function PUT(req: Request, { params }: any) {
  await dbConnect();
  const { role } = await req.json();
  const updated = await UserModel.findByIdAndUpdate(params.id, { role }, { new: true });
  return corsResponse(updated);
}

export async function DELETE(req: Request, { params }: any) {
  await dbConnect();
  await UserModel.findByIdAndDelete(params.id);
  return corsResponse({ message: "Deleted successfully" });
}
