"use client";

import { useState, useEffect } from "react";
import { Mail, Lock, Github } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export default function SignInModal({ isOpen, onClose, onSwitchToSignUp }: SignInModalProps) {
  const [form, setForm] = useState({
      email: "",
      password: "",
    });
  const { data: session } = useSession();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string,string>>({});
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const kiitEmailRegex = /^(2[2-9]|30)[0-9]{5,9}@kiit\.ac\.in$/i;


  const resetForm = () => {
    setForm({
      email: "",
      password: "",
    });
    setError({});
    setSuccess("");
  };



  useEffect(() => {
    if (session?.user?.role) {
      if (session.user.role === "Lead") router.push("/lead");
      else router.push("/member");
    }
  }, [session, router]);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    const result = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });

    if (result?.error) setError({...error, result: result.error});
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back 👋</h2>
            <p className="text-center text-gray-500">Sign in with your Kiit email</p>

            {error && <p className="text-red-500 text-center">{error.general}</p>}

            <form onSubmit={handleCredentialsLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Email or Username"
                  className="w-full pl-10 p-3 border rounded-lg"
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
                  className="w-full pl-10 p-3 border rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-transform duration-200 hover:scale-105"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="flex items-center">
              <hr className="flex-grow border-gray-300" />
              <span className="px-3 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="flex items-center gap-2 w-full justify-center px-4 py-3 border-2 rounded-lg hover:bg-gray-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition-transform duration-300 hover:scale-110"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.9-5 6.8-9.3 6.8-5.4 0-9.8-4.4-9.8-9.8S20.6 15.2 26 15.2c2.5 0 4.7.9 6.4 2.5l5.7-5.7C34.5 8.3 30.5 6.5 26 6.5 15.9 6.5 8 14.4 8 24.5S15.9 42.5 26 42.5c9.6 0 17.6-7.1 17.6-17.5 0-1.2-.1-2.2-.4-3.5z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.8 14.5 20 11.5 26 11.5c2.5 0 4.7.9 6.4 2.5l5.7-5.7C34.5 4.3 30.5 2.5 26 2.5c-7.4 0-13.9 3.7-17.7 9.5z"
                />
                <path
                  fill="#4CAF50"
                  d="M26 46.5c4.3 0 8.5-1.4 11.8-4.1l-5.5-4.6c-1.7 1.3-3.9 2-6.3 2-4.3 0-8-2.9-9.3-6.8l-6.6 5.1C13 42.6 19.1 46.5 26 46.5z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-.6 2-1.9 3.7-3.5 4.9l5.5 4.6c-.4.3 6.7-4.9 6.7-13.5 0-1.2-.1-2.2-.4-3.5z"
                />
              </svg>
              <span className="text-md font-medium">Sign in with Google</span>
            </button>

            <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white py-3 rounded-lg transition"
            >
              <Github size={18} />
              Sign in with GitHub
            </button>

            <p className="text-sm text-gray-400 mt-4 text-center">
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  onClose();
                  onSwitchToSignUp();
                }}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

