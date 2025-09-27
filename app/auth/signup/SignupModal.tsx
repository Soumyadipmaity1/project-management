"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignInModal from "@/app/auth/signin/SignInModal";
import { Upload, Trash, User } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rollNo: "",
    domain: "",
    role: "Member",
    adminCode: "",
    leadCode: "",
    profilePic: null as File | null,
    githubId: "",
    linkedinId: "",
  });

  const [verified, setVerified] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const allowedDomains = [
    "Web Development", "Mobile Development", "Competitive Programming",
    "Design & Branding", "Content Writing",
    "Administration", "Marketing & PR", "Cloud Computing", "Cybersecurity",
    "AI / Machine Learning"
  ];

  const kiitEmailRegex = /^(2[2-9]|30)[0-9]{5,9}@kiit\.ac\.in$/i;
  const linkedinIdRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/i;
  const githubIdRegex = /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/i;

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      rollNo: "",
      domain: "",
      role: "Member",
      adminCode: "",
      leadCode: "",
      profilePic: null,
      githubId: "",
      linkedinId: "",
    });
    setOtpInput("");
    setVerified(false);
    setResendAvailable(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "profilePic" && files) {
      setForm(prev => ({ ...prev, profilePic: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }

    if (name === "adminCode" && value === "ADMIN_25") {
      setForm(prev => ({ ...prev, role: "Admin" }));
    }
     if (name === "leadCode" && value === "LEAD_25") {
      setForm(prev => ({ ...prev, role: "Lead" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.profilePic) return toast.error("Upload profile picture");
    if (!kiitEmailRegex.test(form.email)) return toast.error("Provide a valid KIIT email");
    if (!linkedinIdRegex.test(form.linkedinId)) return toast.error("Provide a valid LinkedIn URL");
    if (!githubIdRegex.test(form.githubId)) return toast.error("Provide a valid GitHub URL");

    const rollFromEmail = form.email.match(/^(\d+)@/)?.[1] || "";
    if (!rollFromEmail || rollFromEmail !== form.rollNo) return toast.error("Roll number mismatch");

    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value && key !== "profilePic") formData.append(key, value as string);
    });
    if (form.profilePic) formData.append("file", form.profilePic);

    try {
      const res = await fetch("/api/auth/signup", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Account created! Check your email for OTP.");
      setVerified(true);

      setResendAvailable(false);
      setTimeout(() => setResendAvailable(true), 120000);
    } catch (err: any) {
      toast.error(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpInput.trim()) return toast.error("Enter OTP");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp: otpInput }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Email verified! Please sign in to continue.");
      
      resetForm();
      onClose();            
      setIsSignInOpen(true); 
    } catch (err: any) {
      toast.error(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      if (!res.ok) throw new Error("Failed to resend OTP");
      toast.success("OTP resent successfully!");
      setResendAvailable(false);
      setTimeout(() => setResendAvailable(true), 120000);
    } catch (err: any) {
      toast.error(err.message || "Resend failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 relative overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => { resetForm(); onClose(); }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>

              {!verified ? (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-white">Create an Account</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-center mb-4 relative">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-indigo-500 overflow-hidden flex items-center justify-center bg-gray-800">
                        {form.profilePic ? (
                          <img src={URL.createObjectURL(form.profilePic)} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User onClick={() => fileInputRef.current?.click()} className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-indigo-400" />
                        )}
                      </div>
                      {!form.profilePic && (
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute left-[14rem] top-[4rem] sm:left-[15rem] sm:top-[4.5rem] md:left-[18rem] md:top-[6rem] transform -translate-y-1/2 h-8 w-8 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 shadow-md">
                          <Upload className="h-4 w-4" />
                        </button>
                      )}
                      {form.profilePic && (
                        <button type="button" onClick={() => setForm({ ...form, profilePic: null })} className="absolute right-[-1rem] top-[4rem] sm:right-[-1.5rem] sm:top-[4.5rem] md:right-[-2rem] md:top-[5rem] transform -translate-y-1/2 h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-md">
                          <Trash className="h-4 w-4" />
                        </button>
                      )}
                      <input type="file" name="profilePic" accept="image/*" ref={fileInputRef} onChange={handleChange} className="hidden" />
                    </div>

                    <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 sm:p-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-lg text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500" required />

                    <select name="domain" value={form.domain} onChange={handleChange} className="w-full p-2 sm:p-3 border border-gray-700 bg-gray-800 text-white rounded-lg text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500" required>
                      <option value="" disabled className="text-gray-400">Select Domain</option>
                      {allowedDomains.map(domain => <option key={domain} value={domain} className="text-white bg-gray-800">{domain}</option>)}
                    </select>

                    <input type="text" name="rollNo" placeholder="Roll Number" value={form.rollNo} onChange={handleChange} className="w-full p-2 sm:p-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-lg text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500" required />

                    <input
                      type="email"
                      name="email"
                      placeholder="KIIT Email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={() => {
                        if (form.email && !kiitEmailRegex.test(form.email)) {
                          toast.error("Enter a valid KIIT email");
                        }
                      }}
                      className="w-full p-2 sm:p-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-lg text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />

                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 sm:p-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-lg text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500" required />

                    <input type="text" name="adminCode" placeholder="Code (optional)" value={form.adminCode} onChange={handleChange} className="w-full p-2 sm:p-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-lg text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500" />
                    <input type="text" name="leadCode" placeholder="Code (optional)" value={form.leadCode} onChange={handleChange} className="w-full p-2 sm:p-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-lg text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500" />

                    <input
                      type="text"
                      name="linkedinId"
                      placeholder="LinkedIn URL"
                      value={form.linkedinId}
                      onChange={handleChange}
                      onBlur={() => {
                        if (form.linkedinId && !linkedinIdRegex.test(form.linkedinId)) {
                          toast.error("Enter a valid LinkedIn URL");
                        }
                      }}
                      className="w-full p-2 sm:p-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-lg text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />

                    <input
                      type="text"
                      name="githubId"
                      placeholder="GitHub URL"
                      value={form.githubId}
                      onChange={handleChange}
                      onBlur={() => {
                        if (form.githubId && !githubIdRegex.test(form.githubId)) {
                          toast.error("Enter a valid GitHub URL");
                        }
                      }}
                      className="w-full p-2 sm:p-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-lg text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />

                    <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-colors">
                      {loading ? "Creating..." : "Sign Up"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Verify Your Email</h2>
                  <p className="text-gray-300 text-sm sm:text-base">We've sent an OTP to <b className="text-white">{form.email}</b>. Enter it below:</p>
                  <input type="text" placeholder="Enter OTP" value={otpInput} onChange={e => setOtpInput(e.target.value)} className="w-full p-2 sm:p-3 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-lg text-sm sm:text-base focus:border-indigo-500 focus:ring-indigo-500" />
                  <button onClick={handleVerifyOtp} disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-colors">
                    {loading ? "Verifying..." : "Verify Email"}
                  </button>

                  {resendAvailable ? (
                    <button onClick={handleResendOtp} className="text-indigo-400 hover:text-indigo-300 hover:underline mt-2 text-sm sm:text-base transition-colors">Resend OTP</button>
                  ) : (
                    <p className="text-gray-500 mt-2 text-sm sm:text-base">Resend OTP available in 2 min</p>
                  )}
                </div>
              )}

              {!verified && (
                <p className="text-sm sm:text-base text-gray-400 text-center mt-4">
                  Already have an account?{" "}
                  <button onClick={() => { resetForm(); onClose(); setIsSignInOpen(true); }} className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">Sign In</button>
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} onSwitchToSignUp={() => {}} />
    </>
  );
}
