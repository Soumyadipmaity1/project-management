'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, Briefcase, Trophy, Target, Code, Calendar, BookOpen, Edit, X, Save, FolderKanban } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  designation: string;
  github: string;
  linkedin: string;
  year: string;
  semester: string;
  profilePhoto: string;
  skills: string[];
  projectContribution: number;
  domainLeadContribution: number;
  projectLeadContribution: number;
  completedProjects: number;
  ongoingProjects: number;
  currentProject: string;
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  gradient: string;
}

interface ProjectCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  bgGradient: string;
  borderColor: string;
  iconColor: string;
}

// Sample data - replace with actual data from API/database
const initialProfileData: ProfileData = {
  name: "John Doe",
  email: "john.doe@example.com",
  designation: "Project Lead",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  year: "3rd Year",
  semester: "6th Semester",
  profilePhoto: "/placeholder-avatar.jpg",
  skills: ["React", "Next.js", "TypeScript", "Node.js", "Python", "MongoDB", "AWS", "Docker"],
  projectContribution: 45,
  domainLeadContribution: 12,
  projectLeadContribution: 8,
  completedProjects: 15,
  ongoingProjects: 3,
  currentProject: "AI-Powered Project Management System"
};

// Helper function to extract username from GitHub URL
const getGithubUsername = (url: string): string => {
  try {
    const match = url.match(/github\.com\/([^\/\?]+)/);
    return match ? match[1] : 'GitHub';
  } catch {
    return 'GitHub';
  }
};

// Helper function to extract username from LinkedIn URL
const getLinkedinUsername = (url: string): string => {
  try {
    const match = url.match(/linkedin\.com\/in\/([^\/\?]+)/);
    return match ? match[1] : 'LinkedIn';
  } catch {
    return 'LinkedIn';
  }
};

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<ProfileData>(initialProfileData);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && !editData.skills.includes(newSkill.trim())) {
      setEditData({ ...editData, skills: [...editData.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditData({ ...editData, skills: editData.skills.filter(skill => skill !== skillToRemove) });
  };

  const handleSave = () => {
    // TODO: Add API call to save data to backend
    console.log('Saving data:', editData);
    setProfileData(editData);
    setIsEditModalOpen(false);
  };

  const handleOpenModal = () => {
    setEditData(profileData);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        
        <div className="relative max-w-7xl mx-auto px-2 md:px-4 lg:px-8 lg:pt-8 pt-2">
          {/* Edit Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={handleOpenModal}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
            >
              <Edit size={16} />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Profile Header Card */}
          <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 overflow-hidden">
            <div className="p-4 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Photo */}
                <div className="relative group">
                  <div className="relative w-60 h-60 rounded-full overflow-hidden border-4 border-slate-900 ring-2 ring-emerald-500">
                    <Image
                      src={profileData.profilePhoto}
                      alt={profileData.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                    {profileData.name}
                  </h1>
                  <p className="text-xl text-emerald-300 font-semibold mb-4">{profileData.designation}</p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                    <a href={`mailto:${profileData.email}`} 
                       className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors">
                      <Mail size={18} />
                      <span className="text-sm">{profileData.email}</span>
                    </a>
                    <a href={profileData.github} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors group/link">
                      <Github size={18} className="group-hover/link:scale-110 transition-transform" />
                      <span className="text-sm">@{getGithubUsername(profileData.github)}</span>
                    </a>
                    <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors group/link">
                      <Linkedin size={18} className="group-hover/link:scale-110 transition-transform" />
                      <span className="text-sm">@{getLinkedinUsername(profileData.linkedin)}</span>
                    </a>
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                      <Calendar size={16} className="text-emerald-400" />
                      <span className="text-sm text-slate-200">{profileData.year}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                      <BookOpen size={16} className="text-emerald-400" />
                      <span className="text-sm text-slate-200">{profileData.semester}</span>
                    </div>
                  </div>

                  {/* Current Project */}
                  {profileData.currentProject && (
                    <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <FolderKanban size={18} className="text-emerald-400" />
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Project</span>
                      </div>
                      <p className="text-base font-semibold text-slate-200">{profileData.currentProject}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Contributions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<Briefcase className="w-6 h-6" />}
            title="Project Contribution"
            value={profileData.projectContribution}
            gradient="from-emerald-600 to-emerald-600"
          />
          <StatCard
            icon={<Target className="w-6 h-6" />}
            title="Domain Lead Contribution"
            value={profileData.domainLeadContribution}
            gradient="from-emerald-600 to-emerald-600"
          />
          <StatCard
            icon={<Trophy className="w-6 h-6" />}
            title="Project Lead Contribution"
            value={profileData.projectLeadContribution}
            gradient="from-emerald-600 to-emerald-600"
          />
        </div>

        {/* Projects Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard
            title="Completed Projects"
            count={profileData.completedProjects}
            icon={<Trophy className="w-8 h-8" />}
            bgGradient="from-green-500/10 to-emerald-500/10"
            borderColor="border-green-500/30"
            iconColor="text-green-400"
          />
          <ProjectCard
            title="Ongoing Projects"
            count={profileData.ongoingProjects}
            icon={<Target className="w-8 h-8" />}
            bgGradient="from-blue-500/10 to-cyan-500/10"
            borderColor="border-blue-500/30"
            iconColor="text-blue-400"
          />
        </div>

        {/* Skills Section */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-emerald-500/20 shadow-xl shadow-emerald-500/5 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-600 rounded-xl">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-400">
              Technical Skills
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {profileData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-slate-200 font-medium hover:bg-emerald-500/30 transition-all duration-300 hover:scale-105 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/20 max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-emerald-500/20">
              <h2 className="text-2xl font-bold text-emerald-400">
                Edit Profile
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-emerald-500/10 rounded-lg transition-colors"
              >
                <X size={24} className="text-slate-300" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6">
              {/* Year and Semester */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Year
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      value={editData.year}
                      onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="e.g., 3rd Year"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Semester
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      value={editData.semester}
                      onChange={(e) => setEditData({ ...editData, semester: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="e.g., 6th Semester"
                    />
                  </div>
                </div>
              </div>

              {/* Current Project */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Current Project
                </label>
                <div className="relative">
                  <FolderKanban className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    value={editData.currentProject}
                    onChange={(e) => setEditData({ ...editData, currentProject: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., AI-Powered Project Management System"
                  />
                </div>
              </div>

              {/* GitHub URL */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  GitHub Profile URL
                </label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="url"
                    value={editData.github}
                    onChange={(e) => setEditData({ ...editData, github: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  LinkedIn Profile URL
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="url"
                    value={editData.linkedin}
                    onChange={(e) => setEditData({ ...editData, linkedin: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Skills
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    className="flex-1 px-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Add a new skill..."
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-300"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="group flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-slate-200 font-medium"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
                      >
                        <X size={16} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-4 p-6 border-t border-emerald-500/20">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Components
function StatCard({ icon, title, value, gradient }: StatCardProps) {
  return (
    <div className="group relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-emerald-500/20 shadow-xl shadow-emerald-500/5 p-6 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:scale-105">
      <div className={`absolute inset-0 bg-emerald-600 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
      <div className="relative">
        <div className={`inline-flex p-3 bg-emerald-600 rounded-xl mb-4 shadow-lg`}>
          <div className="text-white">{icon}</div>
        </div>
        <h3 className="text-slate-400 text-sm font-medium mb-2">{title}</h3>
        <p className="text-4xl font-bold text-emerald-400">
          {value}
        </p>
      </div>
    </div>
  );
}

function ProjectCard({ title, count, icon, bgGradient, borderColor, iconColor }: ProjectCardProps) {
  return (
    <div className={`bg-slate-900/90 backdrop-blur-xl rounded-2xl border ${borderColor} shadow-xl p-8 hover:scale-105 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-300 text-lg font-medium mb-2">{title}</h3>
          <p className="text-5xl font-bold text-emerald-400">
            {count}
          </p>
        </div>
        <div className={iconColor}>
          {icon}
        </div>
      </div>
    </div>
  );
}