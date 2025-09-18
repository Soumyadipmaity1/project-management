"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SignupModal from "@/app/auth/signup/SignupModal";
import SignInModal from "@/app/auth/signin/SignInModal";
import Link from "next/link";

export default function Home() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#031635] text-center px-6 relative overflow-hidden">
      <header className="absolute top-6 left-6 text-white text-3xl font-extrabold tracking-tight">
        WorkPilot
      </header>

      <main className="flex-1 flex flex-col justify-center items-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight text-white max-w-3xl"
        >
          Project Management for <br /> Next-Gen Teams
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-gray-400 text-lg md:text-xl max-w-2xl"
        >
          WorkPilot empowers recruiters, admins, and leaders to track performance,
          streamline collaboration, and keep every project moving — without the chaos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex gap-4 justify-center mt-10"
        >
          <button
            onClick={() => setIsSignupOpen(true)}
            className="px-6 py-3 hover:scale-110 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-2 shadow-lg transition"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </main>

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitchToSignIn={() => setIsSignInOpen(true)}
      />
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSwitchToSignUp={() => setIsSignupOpen(true)}
      />

      <footer className="absolute bottom-6 w-full flex flex-col md:flex-row items-center justify-center gap-2 text-gray-500 text-sm">
        <span>© 2025 WorkPilot · Designed for Modern Teams</span>
        <div className="flex gap-3">
           <Link href="/" className="hover:underline">Privacy</Link>
          <Link href="/" className="hover:underline">Terms</Link>
         </div>
       </footer>
    </div>
  );
}

