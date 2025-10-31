'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
import {
  Github,
  Linkedin,
  Mail,
  Code,
  FolderKanban,
  Edit2,
  Save,
  Upload,
} from 'lucide-react';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  rollNo?: string;
  role?: string;
  githubId?: string;
  linkedinId?: string;
  domain?: string;
  profilePic?: string;
  ProjectCount?: number;
  skills?: string[];
  projects?: {
    projectId: string;
    projectName: string;
  }[];
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // 🔹 Fetch user profile on mount
  useEffect(() => {
    if (status === 'authenticated' && session?.user?._id) {
      (async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.user._id}`);
          const data = await res.json();
          setUser(data);
        } catch (err) {
          console.error('Error fetching user:', err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [session, status]);

  // 🔹 Save updated profile info
  const handleSave = async () => {
    if (!user || !session?.user?._id) return;
    setSaving(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${session.user._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: user.domain,
          skills: user.skills,
          githubId: user.githubId,
          linkedinId: user.linkedinId,
          profilePic: user.profilePic,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setEditing(false);
        toast.success('Profile updated successfully!');
      } else {
        toast.error(data.error || 'Update failed');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      toast.error('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Handle Cloudinary image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'workpilot'
      );

      const cloudName =
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dm9j97lv3';

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setUser((prev) =>
          prev ? { ...prev, profilePic: data.secure_url } : prev
        );
        toast.success('Image uploaded!');
      } else {
        toast.error('Failed to upload image.');
      }
    } catch (err) {
      console.error('Image upload failed:', err);
      toast.error('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  if (status === 'loading' || loading)
    return <p className="text-center text-slate-400 mt-20">Loading user profile...</p>;

  if (!session || !user)
    return <p className="text-center text-red-400 mt-20">No user found or not logged in.</p>;

  const getGithubUsername = (url?: string) =>
    url ? url.split('github.com/')[1]?.replace('/', '') || 'GitHub' : 'GitHub';
  const getLinkedinUsername = (url?: string) =>
    url ? url.split('linkedin.com/in/')[1]?.replace('/', '') || 'LinkedIn' : 'LinkedIn';

  return (
    <div className="min-h-screen py-10 px-6 md:px-10 text-slate-200">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto bg-slate-900/90 border border-fuchsia-500/20 rounded-3xl shadow-xl shadow-fuchsia-500/10 p-8">

        {/* --- Profile Header --- */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-fuchsia-500 group">
            <Image
              src={user.profilePic || '/placeholder-avatar.jpg'}
              alt={user.name}
              fill
              className="object-cover"
              unoptimized={false}
            />
            {editing && (
              <label className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/60 transition">
                {uploading ? (
                  <span className="text-sm text-slate-200">Uploading...</span>
                ) : (
                  <Upload className="w-6 h-6 text-white" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* --- User Info --- */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-between">
              <h1 className="text-4xl font-bold text-fuchsia-400">{user.name}</h1>
              {editing ? (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-3 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 rounded-lg text-white disabled:opacity-50"
                >
                  <Save size={18} /> {saving ? 'Saving...' : 'Save'}
                </button>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200"
                >
                  <Edit2 size={18} /> Edit
                </button>
              )}
            </div>

            {editing ? (
              <>
                <input
                  type="text"
                  placeholder="Enter domain"
                  value={user.domain || ''}
                  onChange={(e) => setUser({ ...user, domain: e.target.value })}
                  className="mt-3 w-full p-2 bg-slate-800 border border-slate-600 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Comma-separated skills"
                  value={user.skills?.join(', ') || ''}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      skills: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="mt-2 w-full p-2 bg-slate-800 border border-slate-600 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="GitHub link"
                  value={user.githubId || ''}
                  onChange={(e) => setUser({ ...user, githubId: e.target.value })}
                  className="mt-2 w-full p-2 bg-slate-800 border border-slate-600 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="LinkedIn link"
                  value={user.linkedinId || ''}
                  onChange={(e) => setUser({ ...user, linkedinId: e.target.value })}
                  className="mt-2 w-full p-2 bg-slate-800 border border-slate-600 rounded-lg"
                />
              </>
            ) : (
              <>
                {user.domain && <p className="text-lg text-fuchsia-300 font-semibold">{user.domain}</p>}
                {user.role && <p className="text-sm text-slate-400 mt-1 capitalize">{user.role}</p>}

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                  {user.email && (
                    <a
                      href={`mailto:${user.email}`}
                      className="flex items-center gap-2 text-slate-300 hover:text-fuchsia-400 transition"
                    >
                      <Mail size={18} /> {user.email}
                    </a>
                  )}
                  {user.githubId && (
                    <a
                      href={user.githubId}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-300 hover:text-fuchsia-400 transition"
                    >
                      <Github size={18} /> @{getGithubUsername(user.githubId)}
                    </a>
                  )}
                  {user.linkedinId && (
                    <a
                      href={user.linkedinId}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-300 hover:text-fuchsia-400 transition"
                    >
                      <Linkedin size={18} /> @{getLinkedinUsername(user.linkedinId)}
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* --- Skills Section --- */}
        {user.skills && user.skills.length > 0 && !editing && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-fuchsia-600 rounded-xl">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-fuchsia-400">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {user.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-fuchsia-500/20 border border-fuchsia-500/30 rounded-lg text-slate-200 font-medium hover:bg-fuchsia-500/30 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* --- Projects Section --- */}
        {user.projects && user.projects.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-6 mb-6">
              <div className="p-3 bg-fuchsia-600 rounded-xl">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-fuchsia-400">
                Projects
                <span className="text-slate-400 text-lg font-medium ml-3">
                  (Total: {user.ProjectCount ?? user.projects.length})
                </span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {user.projects.map((proj, idx) => (
                <div
                  key={proj.projectId || idx}
                  className="p-5 bg-slate-800/60 border border-fuchsia-500/20 rounded-xl hover:border-fuchsia-500/40 transition"
                >
                  <h3 className="text-lg font-semibold text-fuchsia-400">
                    {proj.projectName || 'Untitled Project'}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
