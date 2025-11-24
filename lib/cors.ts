import { NextResponse } from "next/server";

// const allowedOrigins = [
//   // "https://workpilot-f.onrender.com", 
//   "",
// ];

// export function corsResponse(data: any, status: number = 200) {
//   const res = NextResponse.json(data, { status });

//   res.headers.set("Access-Control-Allow-Origin", allowedOrigins.join(","));
//   res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.headers.set("Access-Control-Allow-Credentials", "true");

//   return res;
// }

// // For preflight OPTIONS requests
// export function handleOptions() {
//   const res = new NextResponse(null, { status: 204 });
//   res.headers.set("Access-Control-Allow-Origin", allowedOrigins.join(","));
//   res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.headers.set("Access-Control-Allow-Credentials", "true");
//   return res;
// }
const allowedOrigins = ["https://workpilot-f.onrender.com"];

export function corsResponse(data: any, status: number = 200) {
  const res = NextResponse.json(data, { status });
  
  // Use the first allowed origin only
  res.headers.set("Access-Control-Allow-Origin", allowedOrigins[0]);
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Access-Control-Allow-Credentials", "true");

  return res;
}

export function handleOptions() {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", allowedOrigins[0]);
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Access-Control-Allow-Credentials", "true");
  return res;
}
