"use client";

import { useState, useEffect } from "react";
import { Mail, Lock, Github } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export default function SignInModal({ isOpen, onClose, onSwitchToSignUp }: SignInModalProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const kiitEmailRegex = /^(2[2-9]|30)[0-9]{5,9}@kiit\.ac\.in$/i;

  useEffect(() => {
    if (session?.user?.role) {
      if (session.user.role === "Lead") router.push("/lead");
      else if (session.user.role === "Admin") router.push("/admin");
      else if (session.user.role === "Member") router.push("/member");
    }
  }, [session, router]);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!kiitEmailRegex.test(identifier)) {
      toast.error("Only KIIT emails are allowed!");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Signed in successfully ");
      onClose();
    }

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
            <p className="text-center text-gray-500">Sign in with your KIIT email</p>

            <form onSubmit={handleCredentialsLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="KIIT Email"
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
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-transform duration-200 hover:scale-105"
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
              <span className="text-md font-medium">Sign in with Google</span>
            </button>

            <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white py-3 rounded-lg transition"
            >
              <Github size={18} />
              Sign in with GitHub
            </button>

            {/* <p className="text-sm text-gray-400 mt-4 text-center">
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  onClose();
                  onSwitchToSignUp();
                }}
                className="text-indigo-600 hover:underline"
              >
                Sign Up
              </button>
            </p> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}