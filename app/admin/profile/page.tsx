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

  // Fetch user data
  useEffect(() => {
    if (status === 'authenticated' && session?.user?._id) {
      (async () => {
        try {
          const res = await fetch(`/api/users/${session.user._id}`);
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

  // Save profile updates
  const handleSave = async () => {
    if (!user || !session?.user?._id) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/users/${session.user._id}`, {
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
      console.error(err);
      toast.error('Error saving profile.');
    } finally {
      setSaving(false);
    }
  };

  // Image upload
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
        setUser((prev) => (prev ? { ...prev, profilePic: data.secure_url } : prev));
        toast.success('Image uploaded!');
      } else {
        toast.error('Failed to upload image.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  if (status === 'loading' || loading)
    return (
      <p className="text-center text-gray-400 mt-20">Loading user profile...</p>
    );

  if (!session || !user)
    return (
      <p className="text-center text-red-400 mt-20">
        No user found or not logged in.
      </p>
    );

  const getGithubUsername = (url?: string) =>
    url ? url.split('github.com/')[1]?.replace('/', '') || 'GitHub' : 'GitHub';
  const getLinkedinUsername = (url?: string) =>
    url
      ? url.split('linkedin.com/in/')[1]?.replace('/', '') || 'LinkedIn'
      : 'LinkedIn';

  return (
    <div className="min-h-screen py-10 px-6 md:px-10 bg-black text-gray-100">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto bg-neutral-900 border border-gray-700 rounded-3xl shadow-lg p-8">

        {/* --- Profile Header --- */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-gray-600">
            <Image
              src={user.profilePic || '/placeholder-avatar.jpg'}
              alt={user.name}
              fill
              className="object-cover"
            />
            {editing && (
              <label className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer hover:bg-black/70 transition">
                {uploading ? (
                  <span className="text-sm text-gray-300">Uploading...</span>
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

          {/* --- Info --- */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-between">
              <h1 className="text-4xl font-semibold">{user.name}</h1>
              {editing ? (
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-3 py-2 bg-white text-black rounded-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  <Save size={18} /> {saving ? 'Saving...' : 'Save'}
                </button>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
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
                  className="mt-3 w-full p-2 bg-gray-800 border border-gray-600 rounded-lg"
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
                  className="mt-2 w-full p-2 bg-gray-800 border border-gray-600 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="GitHub link"
                  value={user.githubId || ''}
                  onChange={(e) => setUser({ ...user, githubId: e.target.value })}
                  className="mt-2 w-full p-2 bg-gray-800 border border-gray-600 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="LinkedIn link"
                  value={user.linkedinId || ''}
                  onChange={(e) => setUser({ ...user, linkedinId: e.target.value })}
                  className="mt-2 w-full p-2 bg-gray-800 border border-gray-600 rounded-lg"
                />
              </>
            ) : (
              <>
                {user.domain && (
                  <p className="text-lg text-white font-semibold mt-2">{user.domain}</p>
                )}
                {user.role && (
                  <p className="text-sm text-gray-400 mt-1 capitalize">{user.role}</p>
                )}

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-gray-300">
                  {user.email && (
                    <a href={`mailto:${user.email}`} className="flex items-center gap-2">
                      <Mail size={18} /> {user.email}
                    </a>
                  )}
                  {user.githubId && (
                    <a
                      href={user.githubId}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github size={18} /> @{getGithubUsername(user.githubId)}
                    </a>
                  )}
                  {user.linkedinId && (
                    <a
                      href={user.linkedinId}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
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
            <h2 className="text-2xl font-semibold text-white mb-4">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {user.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-200"
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
            <h2 className="text-2xl font-semibold text-white mb-4">
              Projects
              <span className="text-gray-400 text-lg ml-2">
                (Total: {user.ProjectCount ?? user.projects.length})
              </span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {user.projects.map((proj, idx) => (
                <div
                  key={proj.projectId || idx}
                  className="p-5 bg-gray-900 border border-gray-700 rounded-xl hover:border-gray-500 transition"
                >
                  <h3 className="text-lg font-medium text-white">
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
