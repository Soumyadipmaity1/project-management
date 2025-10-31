// import mongoose, { Connection } from 'mongoose';

// type ConnectionObject = {
//     isConnected?: number;
// }

// const connection: ConnectionObject = {};

// async function dbConnect() : Promise<void> {
//     if(connection.isConnected){
//         console.log("Database is connected");
//         return;
//     }
//     try {
//         const db = await mongoose.connect(process.env.MONGODB_URL || '', {});
//         connection.isConnected = db.connections[0].readyState;
//         console.log("Database connected succesfully")
//     } catch (error) {
//         console.log("Database connection failed", error);
//         process.exit(1);
//     }
// }


// export default dbConnect;


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: "kiitverse",
    }).then((mongoose) => {
      console.log("MongoDB connected");
      return mongoose;
    }).catch((err) => {
      console.error("MongoDB connection failed:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
