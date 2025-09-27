"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Zap } from "lucide-react";

// Import all landing components
import Features from "@/components/Landing/Features";
import Footer from "@/components/Landing/footer";

// Import modals (uncomment when available)
import SignupModal from "@/app/auth/signup/SignupModal";
import SignInModal from "@/app/auth/signin/SignInModal";

export default function Home() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
             
              <span className="text-2xl font-extrabold tracking-tight">
                WorkPilot
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSignInOpen(true)}
                className="relative group text-gray-300 hover:text-white transition-all duration-300 px-6 py-3 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-indigo-500/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <span className="relative z-10 font-medium">Sign In</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSignupOpen(true)}
                className="relative group bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-indigo-300 to-blue-400 opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-indigo-600 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition-all duration-300"></div>
                <span className="relative z-10">Get Started</span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
            Smart Project Management Platform
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6 mb-12"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Navigate Projects
              <span className="block bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Like a Pro
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Transform your project management with WorkPilot's role-specific optimization. 
              Whether you're a team member, project lead, domain lead, or admin - experience 
              tailored workflows, permissions, and insights designed for your specific responsibilities.
            </p>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              {
                icon: CheckCircle,
                text: "Smart Tasks",
              },
              {
                icon: Users,
                text: "Team Collaboration",
              },
              {
                icon: Zap,
                text: "Workflow Management",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-300 hover:bg-gray-700/50 hover:border-indigo-500/30 transition-all duration-300"
              >
                <feature.icon className="w-4 h-4 text-indigo-400" />
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSignupOpen(true)}
              className="relative group bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-indigo-500/40"
            >
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-indigo-600 to-blue-600 rounded-2xl blur-sm opacity-40 group-hover:opacity-80 transition-all duration-500"></div>
              
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <span className="relative z-10 flex items-center justify-center">
                Start Your Journey
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="ml-3"
                >
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
              </span>
              
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-2xl border-2 border-indigo-400/30 animate-ping opacity-0 group-hover:opacity-100"></div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Features />

      <Footer />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSwitchToSignUp={() => setIsSignupOpen(true)}
      />
    </div>
  );
}

