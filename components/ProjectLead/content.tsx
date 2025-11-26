'use client';

import Link from 'next/link';
import {
  FaChevronLeft,
  FaTimes,
  FaPlus,
  FaTrash,
  FaEdit,
  FaExternalLinkAlt,
  FaCode,
  FaChevronDown,
  FaUpload,
  FaImage,
} from 'react-icons/fa';
import { useState, useRef, useMemo } from 'react';

const mockProject = [
  {
    id: '1',
    name: 'E-commerce Platform',
    status: 'Active',
    description:
      'E-commerce content encompasses all materials businesses create to attract and retain customers online, including product descriptions, social media posts, blog posts, and more.',
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
    ],
  },
];

// ========================= Types =========================
type Technology = {
  id: string;
  name: string;
};

type Activity = {
  id: string;
  icon: string;
  description: string;
  time: string;
};

type ProjectType = {
  id: string;
  name: string;
  status: string;
  description: string;
  technologies: Technology[];
  domain: string;
  teamLead: string;
  assistantLead: string;
  teamSize: number;
  activities: Activity[];
};

// ========================= Helpers =========================
const TEAM_MEMBERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Team Lead' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Assistant Lead' },
  { id: '3', name: 'Alice', email: 'alice@example.com', role: 'Member' },
  { id: '4', name: 'Bob', email: 'bob@example.com', role: 'Member' },
];

function getProjectById(projectId: string) {
  return mockProject.find((p) => p.id === projectId) || null;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

const getRoleStyles = (role: string) => {
  switch (role) {
    case 'Team Lead':
      return 'bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white shadow-lg';
    case 'Assistant Lead':
      return 'bg-gradient-to-r from-fuchsia-600/80 to-fuchsia-700/80 text-white shadow-md';
    default:
      return 'bg-gray-700 text-gray-300 border border-gray-600';
  }
};

// ========================= Component =========================
type Props = { params: { projectId: string } };

export default function Project({ params }: Props) {
  const { projectId } = params;
  const project = useMemo(() => getProjectById(projectId), [projectId]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<ProjectType | null>(project);
  const [editTechnologies, setEditTechnologies] = useState<Technology[]>(project?.technologies || []);
  const [newTechName, setNewTechName] = useState('');

  // ========================= Handlers =========================

  const handleSaveProject = () => {
    if (!editForm) return;
    const updatedProject: ProjectType = {
      ...editForm,
      technologies: editTechnologies,
      id: editForm.id || project?.id || '',
    };
    console.log('Saving project:', updatedProject);
    setIsEditModalOpen(false);
  };

  const handleAddTechnology = () => {
    if (newTechName.trim()) {
      const newTech: Technology = { id: `t${Date.now()}`, name: newTechName.trim() };
      setEditTechnologies([...editTechnologies, newTech]);
      setNewTechName('');
    }
  };

  const handleTechKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  if (!project) {
    return (
      <div className="w-screen min-h-screen bg-gray-950 flex items-center justify-center text-3xl text-red-400">
        Project not found!!
      </div>
    );
  }

  // ========================= UI =========================
  return (
    <div className="w-full min-h-screen overflow-x-hidden p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <p className="text-gray-400 mb-6">{project.description}</p>

      <button
        onClick={() => {
          setEditForm(project);
          setEditTechnologies(project.technologies);
          setIsEditModalOpen(true);
        }}
        className="px-6 py-2 bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 text-white rounded-lg"
      >
        Edit Project
      </button>

      {isEditModalOpen && editForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-2xl border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Project</h2>
              <button onClick={() => setIsEditModalOpen(false)}>
                <FaTimes />
              </button>
            </div>

            {/* Name */}
            <label className="block text-gray-300 mb-2">Project Name</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) =>
                setEditForm((prev) => (prev ? { ...prev, name: e.target.value } : null))
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-4"
            />

            {/* Description */}
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              value={editForm.description}
              onChange={(e) =>
                setEditForm((prev) => (prev ? { ...prev, description: e.target.value } : null))
              }
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-4"
            />

            {/* Domain */}
            <label className="block text-gray-300 mb-2">Domain</label>
            <input
              type="text"
              value={editForm.domain}
              onChange={(e) =>
                setEditForm((prev) => (prev ? { ...prev, domain: e.target.value } : null))
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-4"
            />

            {/* Technologies */}
            <label className="block text-gray-300 mb-2">Tech Stack</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTechName}
                onChange={(e) => setNewTechName(e.target.value)}
                onKeyPress={handleTechKeyPress}
                placeholder="Add new tech..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              />
              <button
                onClick={handleAddTechnology}
                className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 px-4 py-2 rounded-lg"
              >
                <FaPlus />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {editTechnologies.map((tech) => (
                <span
                  key={tech.id}
                  className="bg-fuchsia-600/30 border border-fuchsia-500/30 text-fuchsia-300 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {tech.name}
                  <button
                    onClick={() =>
                      setEditTechnologies(editTechnologies.filter((t) => t.id !== tech.id))
                    }
                    className="text-red-400"
                  >
                    <FaTimes />
                  </button>
                </span>
              ))}
            </div>

            {/* Save / Cancel */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProject}
                className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-fuchsia-700 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
