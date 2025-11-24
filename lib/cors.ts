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
// const allowedOrigins = ["https://workpilot-f.onrender.com"];

// export function corsResponse(data: any, status: number = 200) {
//   const res = NextResponse.json(data, { status });
//   // remove any previously set CORS headers to avoid duplicate values
//   res.headers.delete("Access-Control-Allow-Origin");
//   res.headers.delete("Access-Control-Allow-Methods");
//   res.headers.delete("Access-Control-Allow-Headers");
//   res.headers.delete("Access-Control-Allow-Credentials");

//   // Use the first allowed origin only
//   res.headers.set("Access-Control-Allow-Origin", allowedOrigins[0]);
//   res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.headers.set("Access-Control-Allow-Credentials", "true");

//   return res;
// }

// export function handleOptions() {
//   const res = new NextResponse(null, { status: 204 });
//   // remove any previously set CORS headers to avoid duplicate values
//   res.headers.delete("Access-Control-Allow-Origin");
//   res.headers.delete("Access-Control-Allow-Methods");
//   res.headers.delete("Access-Control-Allow-Headers");
//   res.headers.delete("Access-Control-Allow-Credentials");

//   res.headers.set("Access-Control-Allow-Origin", allowedOrigins[0]);
//   res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.headers.set("Access-Control-Allow-Credentials", "true");
//   return res;
// }
import { NextResponse, NextRequest } from "next/server";

const allowedOrigins = ["https://workpilot-f.onrender.com"];

export function corsResponse(data: any, status: number = 200) {
  const res = NextResponse.json(data, { status });

  // Dynamically set the origin if it matches allowedOrigins
  const origin = allowedOrigins.includes(res.headers.get("origin") || "") 
    ? res.headers.get("origin") 
    : allowedOrigins[0];

  res.headers.set("Access-Control-Allow-Origin", origin!);
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Access-Control-Allow-Credentials", "true");

  return res;
}

// For preflight OPTIONS requests
export function handleOptions(req: NextRequest) {
  const origin = allowedOrigins.includes(req.headers.get("origin") || "")
    ? req.headers.get("origin")
    : allowedOrigins[0];

  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", origin!);
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Access-Control-Allow-Credentials", "true");

  return res;
}

// export function handleOptions() {
//   const res = new NextResponse(null, { status: 204 });
//   // remove any previously set CORS headers to avoid duplicate values
//   res.headers.delete("Access-Control-Allow-Origin");
//   res.headers.delete("Access-Control-Allow-Methods");
//   res.headers.delete("Access-Control-Allow-Headers");
//   res.headers.delete("Access-Control-Allow-Credentials");

//   res.headers.set("Access-Control-Allow-Origin", allowedOrigins[0]);
//   res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.headers.set("Access-Control-Allow-Credentials", "true");
//   return res;
// }