import { NextResponse } from "next/server";

const allowedOrigins = [
  "http://localhost:3000",
  "https://workpilot-f.onrender.com", 
];

export function corsResponse(data: any, status: number = 200) {
  const res = NextResponse.json(data, { status });

  res.headers.set("Access-Control-Allow-Origin", allowedOrigins.join(","));
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Access-Control-Allow-Credentials", "true");

  return res;
}

// For preflight OPTIONS requests
export function handleOptions() {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", allowedOrigins.join(","));
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Access-Control-Allow-Credentials", "true");
  return res;
}
