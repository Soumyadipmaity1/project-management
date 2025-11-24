// import { NextResponse } from "next/server";

// // const allowedOrigins = [
// //   // "https://workpilot-f.onrender.com", 
// //   "",
// // ];

// // export function corsResponse(data: any, status: number = 200) {
// //   const res = NextResponse.json(data, { status });

// //   res.headers.set("Access-Control-Allow-Origin", allowedOrigins.join(","));
// //   res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
// //   res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
// //   res.headers.set("Access-Control-Allow-Credentials", "true");

// //   return res;
// // }

// // // For preflight OPTIONS requests
// // export function handleOptions() {
// //   const res = new NextResponse(null, { status: 204 });
// //   res.headers.set("Access-Control-Allow-Origin", allowedOrigins.join(","));
// //   res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
// //   res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
// //   res.headers.set("Access-Control-Allow-Credentials", "true");
// //   return res;
// // }
import { NextResponse, NextRequest } from "next/server";

const allowedOrigins = [process.env.NEXT_PUBLIC_BASE_URL || "https://workpilot-f.onrender.com", 
    "http://localhost:3000",
];

export function corsResponse(data: any, status: number = 200) {
  const res = NextResponse.json(data, { status });

  // Use configured allowed origin (don't try to read from response headers)
  const origin = allowedOrigins[0];

  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Access-Control-Allow-Credentials", "true");

  return res;
}

// For preflight OPTIONS requests; req is optional so callers may pass nothing
export function handleOptions(req?: NextRequest) {
  const originHeader = req?.headers.get("origin") || "";
  const origin = allowedOrigins.includes(originHeader) ? originHeader : allowedOrigins[0];

  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Access-Control-Allow-Credentials", "true");

  return res;
}