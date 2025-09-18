"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignInModal from "@/app/auth/signin/SignInModal";
import { Upload , Trash } from "lucide-react";

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
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "profilePic" && files) {
      setForm({ ...form, profilePic: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.profilePic) {
      setError("Profile picture is required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("rollNo", form.rollNo);
    formData.append("domain", form.domain);
    formData.append("role", form.role);
    formData.append("profilePic", form.profilePic);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess("Account created successfully! Please sign in.");
      setForm({
        name: "",
        email: "",
        password: "",
        rollNo: "",
        domain: "",
        role: "Member",
        profilePic: null,
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
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
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>

              {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
              {success && <p className="text-green-600 text-sm text-center mb-2">{success}</p>}

              <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center mb-4 relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-2 border-blue-500 overflow-hidden relative flex items-center justify-center bg-gray-100">
            {form.profilePic ? (
             <img
        src={URL.createObjectURL(form.profilePic)}
        alt="Profile"
        className="w-full h-full object-cover"
             />
           ) : (
         <Upload className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-blue-500" />
       )}
    <input
      type="file"
      name="profilePic"
      accept="image/*"
      onChange={handleChange}
      required
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
  </div>
</div>

                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="rollNo"
                  placeholder="Roll Number"
                  value={form.rollNo}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="domain"
                  placeholder="Domain"
                  value={form.domain}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />

                <input
                  type="text"
                  name="code"
                  placeholder="Code (Optional)"
                  value={form.domain}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
    
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-transform duration-200 hover:scale-105"
                >
                  {loading ? "Creating..." : "Sign Up"}
                </button>
              </form>

              <p className="text-sm text-gray-500 text-center mt-4">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    onClose();
                    setIsSignInOpen(true);
                  }}
                  className="text-blue-500 hover:underline"
                >
                  Sign In
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} onSwitchToSignUp={() => {}} />
    </>
  );
}
