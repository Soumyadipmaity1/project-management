import mongoose from "mongoose";

let MONGODB_URL: string | undefined = undefined;
if (typeof window === "undefined") {
  MONGODB_URL = process.env.MONGODB_URL as string | undefined;
  if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in environment variables");
  }
}

let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (typeof window !== "undefined") {
    return undefined;
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL!, {
      bufferCommands: false,
      dbName: "kiitverse",
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
