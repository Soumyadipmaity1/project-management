'use client';

import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';
import { useMemo } from 'react';

const mockProject = [
  {
    id: '1',
    name: 'E-commerce Platform',
    status: 'Active',
    description: 'E-commerce content encompasses all materials businesses create to attract and retain customers online, including product descriptions, social media posts, blog posts, and more. It plays a crucial role in supporting the customer journey, providing brand messaging and product details to aid in informed purchasing decisions.',
    technologies: [
      { id: 't1', name: 'React' },
      { id: 't2', name: 'Next.js' },
      { id: 't3', name: 'Tailwind CSS' },
    ],
    domain: 'E-commerce',
    teamLead: 'Alice',
    assistantLead: 'Bob',
    teamSize: 5,
    activities: [
      { id: 'a1', icon: '📝', description: 'Updated Resume', time: '2 hours ago' },
      { id: 'a2', icon: '📝', description: 'Updated Resume', time: '2 hours ago' },
    ],
  },
  {
    id: '2',
    name: 'E-commerce Platform',
    status: 'Active',
    description: 'E-commerce content encompasses all materials businesses create to attract and retain customers online, including product descriptions, social media posts, blog posts, and more. It plays a crucial role in supporting the customer journey, providing brand messaging and product details to aid in informed purchasing decisions.',
    technologies: [
      { id: 't1', name: 'React' },
      { id: 't2', name: 'Next.js' },
      { id: 't3', name: 'Tailwind CSS' },
    ],
    domain: 'E-commerce',
    teamLead: 'Alice',
    assistantLead: 'Bob',
    teamSize: 5,
    activities: [
      { id: 'a1', icon: '📝', description: 'Updated Resume', time: '2 hours ago' },
      { id: 'a2', icon: '📝', description: 'Updated Resume', time: '2 hours ago' },
    ],
  },
  {
    id: '3',
    name: 'E-commerce Platform',
    status: 'Active',
    description: 'E-commerce content encompasses all materials businesses create to attract and retain customers online, including product descriptions, social media posts, blog posts, and more. It plays a crucial role in supporting the customer journey, providing brand messaging and product details to aid in informed purchasing decisions.',
    technologies: [
      { id: 't1', name: 'React' },
      { id: 't2', name: 'Next.js' },
      { id: 't3', name: 'Tailwind CSS' },
    ],
    domain: 'E-commerce',
    teamLead: 'Alice',
    assistantLead: 'Bob',
    teamSize: 5,
    activities: [
      { id: 'a1', icon: '📝', description: 'Updated Resume', time: '2 hours ago' },
      { id: 'a2', icon: '📝', description: 'Updated Resume', time: '2 hours ago' },
    ],
  },
];

const TEAM_MEMBERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Team Lead' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Assistant Lead' },
  { id: '3', name: 'Alice', email: 'alice@example.com', role: 'Member' },
  { id: '4', name: 'Bob', email: 'bob@example.com', role: 'Member' },
  { id: '5', name: 'Charlie', email: 'charlie@example.com', role: 'Member' },
];

function getProjectById(projectId: string) {
  return mockProject.find((p) => p.id === projectId);
}

type Props = {
  params: {
    projectId: string;
  };
};

const getRoleStyles = (role: string) => {
  switch (role) {
    case 'Team Lead':
      return 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg';
    case 'Assistant Lead':
      return 'bg-gradient-to-r from-emerald-600/80 to-emerald-700/80 text-white shadow-md';
    default:
      return 'bg-gray-700 text-gray-300 border border-gray-600';
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export default function Project({ params }: Props) {
  const { projectId } = params;
  const project = useMemo(() => getProjectById(projectId), [projectId]);

  if (!project) {
    return (
      <div className="w-screen min-h-screen bg-gray-950 flex items-center justify-center text-3xl text-red-400">
        Project not found!!
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <div className="flex items-center justify-between mb-8 px-4">
        <div className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center group">
          <span className="font-['Maven_Pro',sans-serif] font-bold text-2xl lg:text-3xl text-white">
            {project.name}
          </span>
        </div>
        <span className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold shadow-lg min-w-[110px] text-center">
          {project.status}
        </span>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 w-full px-4">
        {/* Main Content */}
        <div className="xl:flex-[2_1_0%] w-full space-y-6">
          {/* Project Image */}
          <div className="w-full h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-6 flex items-center justify-center border border-gray-700/50 shadow-2xl">
            <span className="text-gray-400 text-lg font-medium">Project Image</span>
          </div>

          {/* Project Details */}
          <div className="bg-gray-900/70 backdrop-blur-lg p-8 w-full rounded-xl shadow-2xl border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">Project Details</h2>
            
            <h3 className="font-semibold text-lg text-gray-200 mb-3">Description</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
            
            <h3 className="font-semibold text-lg text-gray-200 mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span 
                  key={tech.id} 
                  className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/30 backdrop-blur-sm hover:from-emerald-500/30 hover:to-green-500/30 transition-all duration-300"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-gray-700/50">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 gap-6">
              <div className="flex-1">
                <h2 className="font-semibold text-xl text-white mb-4">Timeline</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-400 w-28">Start Date:</span>
                    <span className="text-gray-200 font-medium">2023-09-15</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400 w-28">Target Date:</span>
                    <span className="text-gray-200 font-medium">2024-06-30</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg font-medium">
                View Live
              </button>
              <button className="border border-gray-600 text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium">
                View Code
              </button>
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-6">Team Members</h3>
            
            <div className="space-y-4">
              {TEAM_MEMBERS.map((member) => (
                <div 
                  key={member.id} 
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700/30 hover:bg-gray-800/70 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center font-semibold text-white shadow-lg">
                      {getInitials(member.name)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-100">{member.name}</div>
                      <div className="text-sm text-gray-400">{member.email}</div>
                    </div>
                  </div>
                  <span className={`px-4 py-2 text-xs rounded-full font-semibold ${getRoleStyles(member.role)}`}>
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:flex-[1_1_0%] w-full space-y-6">
          {/* Project Info */}
          <div className="bg-gray-900/70 backdrop-blur-lg p-8 w-full rounded-xl shadow-2xl border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-6">Project Info</h3>

            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-gray-800/40 border border-gray-700/30">
                <span className="font-semibold text-gray-200 block mb-2">Domain</span>
                <span className="text-gray-300">{project.domain}</span>
              </div>

              <div className="p-4 rounded-lg bg-gray-800/40 border border-gray-700/30">
                <span className="font-semibold text-gray-200 block mb-3">Leadership</span>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Team Lead:</span>
                    <span className="text-gray-200 font-medium">{project.teamLead}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Assistant Lead:</span>
                    <span className="text-gray-200 font-medium">{project.assistantLead}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-800/40 border border-gray-700/30">
                <span className="font-semibold text-gray-200 block mb-2">Team Size</span>
                <span className="text-gray-300">{project.teamSize} members</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {project.activities.length > 0 ? (
                project.activities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/40 border border-gray-700/30 hover:bg-gray-800/60 transition-all duration-300"
                  >
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="text-gray-200 font-medium">{activity.description}</div>
                      <div className="text-sm text-gray-400 mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center py-8 text-sm">No recent activity.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}