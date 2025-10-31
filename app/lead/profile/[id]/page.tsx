'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Github, Linkedin, Mail, Code, FolderKanban } from 'lucide-react';

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

  if (status === 'loading' || loading) {
    return <p className="text-center text-slate-400 mt-20">Loading user profile...</p>;
  }

  if (!session || !user) {
    return <p className="text-center text-red-400 mt-20">No user found or not logged in.</p>;
  }

  const getGithubUsername = (url?: string) =>
    url ? url.split('github.com/')[1]?.replace('/', '') || 'GitHub' : 'GitHub';

  const getLinkedinUsername = (url?: string) =>
    url ? url.split('linkedin.com/in/')[1]?.replace('/', '') || 'LinkedIn' : 'LinkedIn';

  return (
    <div className="min-h-screen py-10 px-6 md:px-10 text-slate-200">
      <div className="max-w-4xl mx-auto bg-slate-900/90 border border-emerald-500/20 rounded-3xl shadow-xl shadow-emerald-500/10 p-8">
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-emerald-500">
            <Image
              src={user.profilePic || '/placeholder-avatar.jpg'}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-emerald-400">{user.name}</h1>
            {user.domain && (
              <p className="text-lg text-emerald-300 font-semibold">{user.domain}</p>
            )}
            {user.role && (
              <p className="text-sm text-slate-400 mt-1 capitalize">{user.role}</p>
            )}

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              {user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
                >
                  <Mail size={18} /> {user.email}
                </a>
              )}
              {user.githubId && (
                <a
                  href={user.githubId}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
                >
                  <Github size={18} /> @{getGithubUsername(user.githubId)}
                </a>
              )}
              {user.linkedinId && (
                <a
                  href={user.linkedinId}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
                >
                  <Linkedin size={18} /> @{getLinkedinUsername(user.linkedinId)}
                </a>
              )}
            </div>
          </div>
        </div>

        {user.skills && user.skills.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-600 rounded-xl">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-400">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {user.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-slate-200 font-medium hover:bg-emerald-500/30 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {user.projects && user.projects.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-6 mb-6">
              <div className="p-3 bg-emerald-600 rounded-xl">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-400">
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
                  className="p-5 bg-slate-800/60 border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition"
                >
                  <h3 className="text-lg font-semibold text-emerald-400">
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
