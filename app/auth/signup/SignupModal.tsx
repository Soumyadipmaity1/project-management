"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignInModal from "@/app/auth/signin/SignInModal";
import { Upload, Trash } from "lucide-react";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rollNo: "",
    domain: "",
    role: "Member",
    profilePic: null as File | null,
    githubId: "",
    linkedinId: "",
  });

  const [error, setError] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const allowedDomains = [
    "Web Development", "Mobile Development", "Competitive Programming",
    "Design & Branding", "President", "Vice President", "Content Writing",
    "Administration", "Marketing & PR","Cloud Computing", "Cybersecurity",
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
      profilePic: null,
      githubId: "",
      linkedinId: "",
    });
    setError({});
    setSuccess("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "profilePic" && files) {
      setForm({ ...form, profilePic: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }

    // Validations
    if (name === "email") {
      if (!value.trim()) setError({ ...error, email: "" });
      else if (!kiitEmailRegex.test(value)) setError({ ...error, email: "Please enter a valid KIIT email" });
      else setError({ ...error, email: "" });
    }

    if (name === "domain") {
      if (!value.trim()) setError({ ...error, domain: "" });
      else if (!allowedDomains.includes(value)) setError({ ...error, domain: "Enter a valid domain" });
      else setError({ ...error, domain: "" });
      if (value === "President" || value === "Vice President") setForm({ ...form, role: "Admin" });
    }

    if (name === "rollNo") {
      const year = parseInt(value.slice(0, 2), 10);
      if (!value.trim()) setError({ ...error, rollNo: "" });
      else if (year >= 22 && year < 28) setError({ ...error, rollNo: "" });
      else setError({ ...error, rollNo: "Enter a valid roll number" });
    }

    if (name === "linkedinId") {
      if (!value.trim()) setError({ ...error, linkedinId: "" });
      else if (!linkedinIdRegex.test(value)) setError({ ...error, linkedinId: "Enter a valid LinkedIn URL" });
      else setError({ ...error, linkedinId: "" });
    }

    if (name === "githubId") {
      if (!value.trim()) setError({ ...error, githubId: "" });
      else if (!githubIdRegex.test(value)) setError({ ...error, githubId: "Enter a valid GitHub URL" });
      else setError({ ...error, githubId: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.profilePic) {
      setError({ ...error, profilePic: "Please upload a profile picture" });
      return;
    }

    if (!kiitEmailRegex.test(form.email)) {
      setError({ ...error, email: "Please provide a KIIT email ID" });
      return;
    }

    const rollFromEmail = form.email.match(/^(\d+)@/)?.[1] || "";
    if (!rollFromEmail) {
      setError({ ...error, email: "Invalid email format" });
      return;
    }

    if (rollFromEmail !== form.rollNo) {
      setError({ ...error, rollNo: "Roll number does not match email" });
      return;
    }

    setLoading(true);
    setError({});
    setSuccess("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => { if (value) formData.append(key, value as any); });

    try {
      const res = await fetch("/api/auth/signup", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess("Account created successfully! Please sign in.");
      resetForm();
    } catch (err: any) {
      setError({ general: err.message || "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button onClick={() => { resetForm(); onClose(); }} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">✕</button>

              <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
              {error.general && <p className="text-red-500 text-sm text-center mb-2">{error.general}</p>}
              {success && <p className="text-green-600 text-sm text-center mb-2">{success}</p>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-center mb-4 relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-2 border-blue-500 overflow-hidden relative flex items-center justify-center bg-gray-100">
                    {form.profilePic ? (
                      <>
                        <img src={URL.createObjectURL(form.profilePic)} alt="Profile" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, profilePic: null })}
                          className="absolute bottom-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <Upload className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-blue-500" />
                    )}
                    <input type="file" name="profilePic" accept="image/*" onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                </div>

                {/* Inputs */}
                {["name","domain","rollNo","email","password","linkedinId","githubId"].map(field => (
                  <div key={field}>
                    <input
                      type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                      name={field}
                      placeholder={field === "rollNo" ? "Roll Number" : field === "linkedinId" ? "LinkedIn URL" : field === "githubId" ? "GitHub URL" : field.charAt(0).toUpperCase() + field.slice(1)}
                      value={form[field as keyof typeof form] as string}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                    {error[field] && <p className="text-red-500 text-sm">{error[field]}</p>}
                  </div>
                ))}

                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-transform duration-200 hover:scale-105">
                  {loading ? "Creating..." : "Sign Up"}
                </button>
              </form>

              <p className="text-sm text-gray-500 text-center mt-4">
                Already have an account?{" "}
                <button onClick={() => { resetForm(); onClose(); setIsSignInOpen(true); }} className="text-blue-500 hover:underline">Sign In</button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} onSwitchToSignUp={() => {}} />
    </>
  );
}


