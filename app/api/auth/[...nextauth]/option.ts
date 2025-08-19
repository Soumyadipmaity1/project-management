import { NextAuthOptions} from "next-auth";
import CrendentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
    providers: [
    CrendentialsProvider({
        id: "credentials",
      name: "Credentials",
    credentials: {
       email: { label: "Email", type: "email"},
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials:any): Promise<any>{
        await dbConnect();
        try {
            const user = await UserModel.findOne({
                $or:[
                    {email: credentials.identifier},
                    {username: credentials.identifier}
                ]
            })
            if(!user){
               throw new Error("No user found with this email");
            }
            if(!user.isVerified){
                throw new Error("Please verify your account first before login");
            }
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
            if(isPasswordCorrect){
                return user;
            }
            else{
                throw new Error("Incorrect password");
            }
        } catch (error: any) {
              throw new Error(error);
        }
    }
    })
    ],
    pages: {
    signIn: '/signin',
   },
   callbacks: {
    async session({ session, token }) {
        if(session){
            session.user._id = token._id;
            session.user.isVerified = token.isVerified;
            session.user.isAcceptingMessages = token.isAcceptingMessages;
            session.user.username = token.username;
        }
      return session
    },
    async jwt({ token, user }) {
        if(user){
            token._id =user._id?.toString();
            token.isVerified =  user.isVerified;
            token.isAcceptingMessages = user.isAcceptingMessages;
            token.username = user.username;
        }
      return token;
    }
   },
   session: {
    strategy: "jwt",
   },
   secret: process.env.NEXTAUTH_SECRET,
}