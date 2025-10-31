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
      const role = String(session.user.role);
      if (role === "Lead" || role === "lead") router.push("/lead");
      else if (role === "ProjectLead" || role === "CoLead" || role === "projectlead" || role === "colead") router.push("/projectlead");
      else if (role === "Admin" || role === "admin") router.push("/admin");
      else if (role === "Member" || role === "member") router.push("/member");
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
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6 relative border border-gray-700"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-center text-white">Welcome Back</h2>
            <p className="text-center text-gray-400">Sign in with your KIIT email</p>

            <form onSubmit={handleCredentialsLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                <input
                  type="email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="KIIT Email"
                  className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-500 text-white py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="flex items-center">
              <hr className="flex-grow border-gray-600" />
              <span className="px-3 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="flex items-center gap-2 w-full justify-center px-4 py-3 border-2 border-gray-600 rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-colors text-white"
            >
              <span className="text-md font-medium">Sign in with Google</span>
            </button>

            {/* <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white py-3 rounded-lg transition-colors"
            >
              <Github size={18} />
              Sign in with GitHub
            </button> */}

            {/* <p className="text-sm text-gray-500 mt-4 text-center">
              Don't have an account?{" "}
              <button
                onClick={() => {
                  onClose();
                  onSwitchToSignUp();
                }}
                className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
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