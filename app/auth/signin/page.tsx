"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Github, Mail, Lock, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";


export default function SignInPage() {
  const { data: session } = useSession();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


 useEffect(() => {
  if(session?.user.role){
    if(session.user.role === "lead") router.push("/lead");
    else { router.push("/member")};
  }
 }, [session,router]);

  async function handleCredentialsLogin(e: React.FormEvent) {
    e.preventDefault();
   const result =  await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });

  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500">
          Sign in with your email
        </p>

        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Email or Username"
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
          >
            Sign in with Email
          </button>
        </form>

        <div className="flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg transition"
        >
          <Github size={18} />
          Sign in with GitHub
        </button>


        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.6 29.4 4 24 4 13.5 4 5 12.5 5 23s8.5 19 19 19c11 0 19-8 19-19 0-1.3-.1-2.2-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 16.1 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.6 29.4 4 24 4c-7.5 0-13.9 4.3-17.7 10.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 43c5.4 0 10.3-2.1 13.9-5.5l-6.4-5.3C29.4 34.9 26.8 36 24 36c-5.3 0-9.7-3.4-11.5-8.1l-6.5 5C10.2 39.4 16.7 43 24 43z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.4 5.5l.1.1 6.4 5.3c-.5.5 7.5-5.5 7.5-16.4 0-1.3-.1-2.2-.4-3.5z"
            />
          </svg>
          Sign in with Google
        </button>
        <p className="text-sm text-gray-400 mt-4 text-center">
  Don’t have an account? <a href="/auth/signup" className="text-blue-500 hover:underline">Sign up</a>
</p>
      </div>
    </div>
  );
}
