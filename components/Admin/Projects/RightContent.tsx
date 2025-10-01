'use client';

import { Divide } from 'lucide-react';
import Link from 'next/link';
import { FaChevronLeft, FaTimes, FaPlus, FaTrash, FaEdit, FaExternalLinkAlt, FaCode, FaChevronDown, FaUpload, FaImage } from 'react-icons/fa';
import { useState, useRef } from 'react';

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

function getProjectById(projectId: string) {
  return mockProject.find((p) => p.id === projectId);
}

type Props = {
  params: {
    projectId: string;
  };
};

export default function ProjectDetailPage({ params }: Props) {
  const { projectId } = params;
  const project = mockProject.find((p) => p.id === projectId);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTeamEditModalOpen, setIsTeamEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(project || {});
  const [editTechnologies, setEditTechnologies] = useState(project?.technologies || []);
  const [newTechName, setNewTechName] = useState('');
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Team Lead' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Assistant Lead' },
    { id: '3', name: 'Alice', email: 'alice@example.com', role: 'Member' },
    { id: '4', name: 'Bob', email: 'bob@example.com', role: 'Member' },
    { id: '5', name: 'Charlie', email: 'charlie@example.com', role: 'Member' },
  ]);
  const [isTimelineEditMode, setIsTimelineEditMode] = useState(false);
  const [timelineData, setTimelineData] = useState({
    startDate: '2023-09-15',
    targetDate: '2024-06-30',
    liveUrl: 'https://example-project.com',
    codeUrl: 'https://github.com/example/project'
  });

  const handleSaveProject = () => {
    // Save project logic here including updated technologies
    const updatedProject = {
      ...editForm,
      technologies: editTechnologies
    };
    console.log('Saving project:', updatedProject);
    setIsEditModalOpen(false);
  };

  const handleAddTechnology = () => {
    if (newTechName.trim()) {
      const newTech = {
        id: `t${Date.now()}`,
        name: newTechName.trim()
      };
      setEditTechnologies([...editTechnologies, newTech]);
      setNewTechName('');
    }
  };

  const handleRemoveTechnology = (techId: string) => {
    setEditTechnologies(editTechnologies.filter(tech => tech.id !== techId));
  };

  const handleTechKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  const handleDeleteProject = () => {
    // Delete project logic here
    console.log('Project deleted');
    setIsDeleteModalOpen(false);
  };

  const handleAddTeamMember = () => {
    const newMember = {
      id: Date.now().toString(),
      name: 'New Member',
      email: 'new@example.com',
      role: 'Member'
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const handleRemoveTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const handleSaveTimeline = () => {
    // Save timeline logic here
    console.log('Saving timeline:', timelineData);
    setIsTimelineEditMode(false);
  };

  const handleCancelTimelineEdit = () => {
    // Reset to original values
    setTimelineData({
      startDate: '2023-09-15',
      targetDate: '2024-06-30',
      liveUrl: 'https://example-project.com',
      codeUrl: 'https://github.com/example/project'
    });
    setIsTimelineEditMode(false);
  };

  const handleViewLive = () => {
    window.open(timelineData.liveUrl, '_blank');
  };

  const handleViewCode = () => {
    window.open(timelineData.codeUrl, '_blank');
  };

  const handlePromoteMember = (memberId: string, newRole: string) => {
    setTeamMembers(prevMembers => {
      let updatedMembers = [...prevMembers];
      
      // If promoting to Team Lead, demote current Team Lead to Member
      if (newRole === 'Team Lead') {
        updatedMembers = updatedMembers.map(member => 
          member.role === 'Team Lead' ? { ...member, role: 'Member' } : member
        );
      }
      
      // If promoting to Assistant Lead, demote current Assistant Lead to Member
      if (newRole === 'Assistant Lead') {
        updatedMembers = updatedMembers.map(member => 
          member.role === 'Assistant Lead' ? { ...member, role: 'Member' } : member
        );
      }
      
      // Update the selected member's role
      return updatedMembers.map(member => 
        member.id === memberId ? { ...member, role: newRole } : member
      );
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Team Lead':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg';
      case 'Assistant Lead':
        return 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg';
      default:
        return 'bg-neutral-700 text-neutral-200 border border-neutral-600';
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setIsImageUploading(true);
      
      // Create file reader to preview image
      const reader = new FileReader();
      reader.onload = (e) => {
        setProjectImage(e.target?.result as string);
        setIsImageUploading(false);
        setIsImageModalOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProjectImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  if (!project) {
    return (
      <div className="w-screen min-h-screen bg-neutral-950 flex items-center justify-center text-3xl text-red-400">
        Project not found!!
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-neutral-950 py-8 mt-10 overflow-x-hidden">
      <div className="flex items-center justify-between mb-8 px-4">
        <Link href="/projects" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center group">
          <FaChevronLeft className="mr-3 text-xl text-neutral-400 group-hover:text-blue-300 transition-colors" />
          <span className="font-['Inter',sans-serif] font-bold text-2xl lg:text-3xl text-white">{project.name}</span>
        </Link>
        <span className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold shadow-lg">
          {project.status}
        </span>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 w-full px-4">
        <div className="xl:flex-[2_1_0%] w-full space-y-6">
          <div className="relative w-full h-64 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl mb-6 flex items-center justify-center border border-neutral-700 shadow-2xl overflow-hidden group cursor-pointer" onClick={handleImageClick}>
            {projectImage ? (
              <>
                <img 
                  src={projectImage} 
                  alt="Project Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <FaEdit className="text-2xl mx-auto mb-2" />
                    <span className="text-sm font-medium">Change Image</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center group-hover:scale-105 transition-transform duration-300">
                <FaImage className="text-4xl text-neutral-400 mx-auto mb-3" />
                <span className="text-neutral-300 text-lg font-medium block mb-1">Add Project Image</span>
                <span className="text-neutral-500 text-sm">Click to upload project preview</span>
              </div>
            )}
            
            {isImageUploading && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <span className="text-sm">Uploading...</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-neutral-900/60 backdrop-blur-lg p-8 w-full rounded-xl shadow-2xl border border-neutral-700/40">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Project Details</h2>
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg font-medium flex items-center gap-2"
              >
                <FaEdit className="text-sm" />
                Edit
              </button>
            </div>
            <h3 className="font-semibold mt-6 mb-3 text-neutral-200 text-lg">Description</h3>
            <p className="text-neutral-300 mb-6 leading-relaxed">{project.description}</p>
            <h3 className="font-semibold mb-4 text-neutral-200 text-lg">Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span key={tech.id} className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30 backdrop-blur-sm">
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-neutral-900/60 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-neutral-700/40">
            <div className="flex flex-col md:flex-row md:justify-between mb-8">
              <div>
                <h2 className="font-semibold text-xl mb-4 text-white">Timeline</h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-neutral-400 w-24">Start:</span>
                    <span className="text-neutral-200 font-medium">2023-09-15</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-neutral-400 w-24">Target:</span>
                    <span className="text-neutral-200 font-medium">2024-06-30</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleViewLive}
                className="bg-gradient-to-r from-neutral-800 to-neutral-900 text-white px-6 py-3 rounded-lg hover:from-neutral-700 hover:to-neutral-800 transition-all duration-300 shadow-lg font-medium border border-neutral-600 flex items-center gap-2"
              >
                <FaExternalLinkAlt className="text-sm" />
                View Live
              </button>
              <button 
                onClick={handleViewCode}
                className="border border-neutral-600 text-neutral-200 px-6 py-3 rounded-lg hover:bg-neutral-800 transition-all duration-300 font-medium flex items-center gap-2"
              >
                <FaCode className="text-sm" />
                View Code
              </button>
            </div>
          </div>

          <div className="bg-neutral-900/60 backdrop-blur-lg p-8 shadow-2xl rounded-xl border border-neutral-700/40">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Team Members</h3>
              <button 
                onClick={() => setIsTeamEditModalOpen(true)}
                className="text-sm bg-gradient-to-r from-neutral-700 to-neutral-800 text-white px-4 py-2 rounded-lg hover:from-neutral-600 hover:to-neutral-700 transition-all duration-300 font-medium border border-neutral-600 flex items-center gap-2"
              >
                <FaEdit className="text-xs" />
                Edit Team
              </button>
            </div>
          
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/40 border border-neutral-700/30 hover:bg-neutral-800/60 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold text-white shadow-lg">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-neutral-100">{member.name}</div>
                      <div className="text-sm text-neutral-400">{member.email}</div>
                    </div>
                  </div>
                  <span className={`px-4 py-2 text-xs rounded-full font-semibold ${getRoleColor(member.role)}`}>
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="xl:flex-[1_1_0%] w-full space-y-6">
          <div className="bg-neutral-900/60 backdrop-blur-lg p-8 w-full shadow-2xl rounded-xl border border-neutral-700/40">
            <h3 className="text-xl font-bold mb-6 text-white">Project Info</h3>

            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-neutral-800/40 border border-neutral-700/30">
                <span className="font-semibold text-neutral-200 block mb-2">Domain</span>
                <span className="text-neutral-300">{project.domain}</span>
              </div>

              <div className="p-4 rounded-lg bg-neutral-800/40 border border-neutral-700/30">
                <span className="font-semibold text-neutral-200 block mb-3">Leadership</span>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Team Lead:</span>
                    <span className="text-neutral-200 font-medium">{project.teamLead}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Assistant Lead:</span>
                    <span className="text-neutral-200 font-medium">{project.assistantLead}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-neutral-800/40 border border-neutral-700/30">
                <span className="font-semibold text-neutral-200 block mb-2">Team Size</span>
                <span className="text-neutral-300">{project.teamSize} members</span>
              </div>
            </div>

            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 mt-6 px-6 py-3 text-white hover:from-red-700 hover:to-red-800 transition-all duration-300 rounded-lg font-medium shadow-lg flex items-center justify-center gap-2"
            >
              <FaTrash className="text-sm" />
              Delete Project
            </button>
          </div>

          <div className="bg-neutral-900/60 backdrop-blur-lg p-8 shadow-2xl rounded-xl border border-neutral-700/40">
            <h3 className="text-xl font-bold mb-6 text-white">Recent Activity</h3>
            <div className="space-y-4">
              {project.activities.length > 0 ? (
                project.activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-neutral-800/40 border border-neutral-700/30 hover:bg-neutral-800/60 transition-all duration-300">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="text-neutral-200 font-medium">{activity.description}</div>
                      <div className="text-sm text-neutral-400 mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-neutral-400 text-center py-8 text-sm">No recent activity.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Project Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 rounded-xl shadow-2xl border border-neutral-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Edit Project</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-neutral-200 font-medium mb-2">Project Name</label>
                <input 
                  type="text" 
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-neutral-200 font-medium mb-2">Description</label>
                <textarea 
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  rows={4}
                  className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-neutral-200 font-medium mb-2">Domain</label>
                <input 
                  type="text" 
                  value={editForm.domain || ''}
                  onChange={(e) => setEditForm({...editForm, domain: e.target.value})}
                  className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-neutral-200 font-medium mb-3">Tech Stack</label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTechName}
                      onChange={(e) => setNewTechName(e.target.value)}
                      onKeyPress={handleTechKeyPress}
                      placeholder="Add new technology..."
                      className="flex-1 bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={handleAddTechnology}
                      disabled={!newTechName.trim()}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <FaPlus className="text-xs" />
                      Add
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {editTechnologies.map((tech) => (
                      <div
                        key={tech.id}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-2 rounded-full text-sm font-medium border border-blue-500/30 backdrop-blur-sm"
                      >
                        <span>{tech.name}</span>
                        <button
                          onClick={() => handleRemoveTechnology(tech.id)}
                          className="text-red-400 hover:text-red-300 transition-colors ml-1"
                          title="Remove technology"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {editTechnologies.length === 0 && (
                    <div className="text-neutral-500 text-sm italic py-2">
                      No technologies added yet. Add some technologies above.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={handleSaveProject}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditTechnologies(project?.technologies || []);
                    setNewTechName('');
                  }}
                  className="px-6 py-3 border border-neutral-600 text-neutral-200 rounded-lg hover:bg-neutral-800 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Edit Modal */}
      {isTeamEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 rounded-xl shadow-2xl border border-neutral-700 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Manage Team Members</h2>
              <button 
                onClick={() => setIsTeamEditModalOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">Team Members</h3>
                <button 
                  onClick={handleAddTeamMember}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium flex items-center gap-2"
                >
                  <FaPlus className="text-xs" />
                  Add Member
                </button>
              </div>
              <div className="space-y-3 mb-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg border border-neutral-700/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold text-white text-sm">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-neutral-100 font-medium">{member.name}</div>
                        <div className="text-neutral-400 text-sm">{member.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <select
                          value={member.role}
                          onChange={(e) => handlePromoteMember(member.id, e.target.value)}
                          className="appearance-none bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2 pr-8 text-white text-sm focus:border-blue-500 focus:outline-none cursor-pointer"
                        >
                          <option value="Member">Member</option>
                          <option value="Assistant Lead">Assistant Lead</option>
                          <option value="Team Lead">Team Lead</option>
                        </select>
                        <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 text-xs pointer-events-none" />
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getRoleColor(member.role)}`}>
                        {member.role}
                      </span>
                      <button 
                        onClick={() => handleRemoveTeamMember(member.id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-400/10 rounded-lg"
                        title="Remove member"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-neutral-800/30 rounded-lg p-4 mb-6">
                <h4 className="text-neutral-200 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Role Management Rules
                </h4>
                <ul className="text-neutral-400 text-sm space-y-2">
                  <li>• Only one Team Lead is allowed per project</li>
                  <li>• Only one Assistant Lead is allowed per project</li>
                  <li>• Promoting someone will automatically demote the current role holder</li>
                  <li>• Team Leads and Assistant Leads cannot be removed from the project</li>
                </ul>
              </div>

              <div className="flex justify-end gap-4">
                <button 
                  onClick={() => setIsTeamEditModalOpen(false)}
                  className="px-6 py-3 border border-neutral-600 text-neutral-200 rounded-lg hover:bg-neutral-800 transition-all duration-300"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 rounded-xl shadow-2xl border border-neutral-700 w-full max-w-md">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrash className="text-red-600 text-xl" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Delete Project</h2>
              <p className="text-neutral-300 mb-6">
                Are you sure you want to delete "{project.name}"? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-neutral-600 text-neutral-200 rounded-lg hover:bg-neutral-800 transition-all duration-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteProject}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Upload Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 rounded-xl shadow-2xl border border-neutral-700 w-full max-w-md">
            <div className="p-6 border-b border-neutral-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Project Image</h2>
              <button 
                onClick={() => setIsImageModalOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-6">
              {projectImage ? (
                <div className="space-y-4">
                  <div className="w-full h-48 rounded-lg overflow-hidden border border-neutral-700">
                    <img 
                      src={projectImage} 
                      alt="Current project image" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                    >
                      <FaUpload className="text-sm" />
                      Replace Image
                    </button>
                    <button
                      onClick={handleRemoveImage}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-medium flex items-center gap-2"
                    >
                      <FaTrash className="text-sm" />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-full h-48 border-2 border-dashed border-neutral-600 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <FaUpload className="text-3xl text-neutral-400 mx-auto mb-2" />
                      <p className="text-neutral-300 font-medium">Upload Project Image</p>
                      <p className="text-neutral-500 text-sm mt-1">PNG, JPG, JPEG up to 5MB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                  >
                    <FaUpload className="text-sm" />
                    Choose Image
                  </button>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <div className="mt-4 text-neutral-400 text-xs">
                <p className="mb-1">• Supported formats: PNG, JPG, JPEG</p>
                <p className="mb-1">• Maximum file size: 5MB</p>
                <p>• Recommended resolution: 1200x600px</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}