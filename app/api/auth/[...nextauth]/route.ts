// export const dynamic = "force-dynamic";

// import NextAuth from 'next-auth/next';
// import { authOptions } from './option';

// const handler = NextAuth(authOptions);

// export {handler as GET, handler as POST};


export const dynamic = "force-dynamic";

import NextAuth from "next-auth/next";
import { authOptions } from "./option";
import { handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
