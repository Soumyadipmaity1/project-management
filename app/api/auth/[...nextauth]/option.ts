import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import UserModel, { User } from "@/model/User";


export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Roll No", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { rollNo: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("No user found with this Email/Roll No.");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return user;
        } catch (err: any) {
          throw new Error(err.message || "Authentication failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },


  callbacks: {
  async jwt({ token, user }) {
      const validroles = ["Admin", "Lead", "Member", "ProjectLead" , "CoLead" , "member" , "lead" , "admin" , "projectlead" , "colead"];
    if (user) {
      const u = user as unknown as User;
      token._id = u._id?.toString();
      token.name = u.name;
      token.email = u.email;
      token.rollNo = u.rollNo;
      token.role = validroles.includes(u.role) ? u.role : "Member";
      token.domain = u.domain;
      token.githubId = u.githubId;
      token.linkedinId = u.linkedinId;
    }
    return token;   
  }, 

  async session({ session, token }) {
    if (token && session.user) {
      session.user._id = token._id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.rollNo = token.rollNo as string;
      session.user.role =  token.role as string;
      session.user.domain = token.domain as string;
      session.user.githubId = token.githubId as string;
      session.user.linkedinId = token.linkedinId as string;
    }
    return session;
  },
},

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions) as any;

// CORS helper — mirrors middleware origin handling but usable here
function buildCorsHeadersFromRequest(req: Request) {
  const allowedOrigins = [process.env.NEXT_PUBLIC_BASE_URL || 'https://workpilot-f.onrender.com'];
  const origin = req.headers.get('origin') || allowedOrigins[0];
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  } as Record<string, string>;
}

export async function OPTIONS(req: Request) {
  const headers = buildCorsHeadersFromRequest(req);
  return new Response(null, { status: 204, headers });
}

export async function GET(req: Request) {
  // call NextAuth handler and attach CORS headers
  const resp: Response = await handler(req);
  const headers = buildCorsHeadersFromRequest(req);
  for (const [k, v] of Object.entries(headers)) {
    resp.headers.set(k, v);
  }
  return resp;
}

export async function POST(req: Request) {
  const resp: Response = await handler(req);
  const headers = buildCorsHeadersFromRequest(req);
  for (const [k, v] of Object.entries(headers)) {
    resp.headers.set(k, v);
  }
  return resp;
}
