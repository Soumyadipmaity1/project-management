import { DefaultSession } from "next-auth";
import { IUser } from "../../models/User";

declare module "next-auth" {
  interface User {
    _id?: string;
    name?: string;
    email?: string;
    rollNo?: string;
    role?: "Admin" | "Lead" | "Member";
    domain?: string;
    githubId?: string;
    linkedinId?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }

  interface Session {
    user: {
      _id?: string;
      name?: string;
      email?: string;
      rollNo?: string;
      role?: "Admin" | "Lead" | "Member";
      domain?: string;
      githubId?: string;
      linkedinId?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    name?: string;
    email?: string;
    rollNo?: string;
    role?: "Admin" | "Lead" | "Member";
    domain?: string;
    githubId?: string;
    linkedinId?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
