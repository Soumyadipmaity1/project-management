// export const dynamic = "force-dynamic";

// import NextAuth from 'next-auth/next';
// import { authOptions } from './option';

// const handler = NextAuth(authOptions);

// export {handler as GET, handler as POST};


export const dynamic = "force-dynamic";

import NextAuth from "next-auth/next";
import { authOptions } from "./option";
import { handleOptions } from "@/lib/cors";

import { NextRequest } from "next/server";
export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
