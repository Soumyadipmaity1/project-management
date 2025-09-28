import Link from 'next/link';
import { FaChevronLeft, FaUsers } from 'react-icons/fa';


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

export default async function Project({ params }: Props) {
  const { projectId } = params;
  const project = await getProjectById(projectId);

  if (!project) {
    return (
      <div className="w-screen min-h-screen bg-gray-900 flex items-center justify-center text-3xl text-red-400">
        Project not found!!
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 py-8 mt-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/projects" className="text-white hover:text-indigo-300 hover:underline flex items-center group transition-colors duration-300">
            <FaChevronLeft className="mr-3 text-xl text-gray-400 group-hover:text-indigo-400 transition-colors duration-300" />
            <span className="font-['Maven_Pro',sans-serif] font-bold text-[32px] leading-[100%] tracking-[-0.5px]">{project.name}</span>
          </Link>
          <div className={`px-6 py-2 rounded-full text-sm font-semibold shadow-lg ${
            project.status === 'Active' 
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
              : 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-200'
          }`}>
            {project.status}
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 w-full">
          <div className="xl:flex-[2_1_0%] w-full space-y-8">
            {/* Project Image */}
            <div className="w-full h-72 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center shadow-2xl border border-gray-600">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🖼️</span>
                </div>
                <span className="text-gray-300 text-lg font-medium">Project Preview</span>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 w-full rounded-2xl shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                Project Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-gray-200 text-lg">Description</h3>
                  <p className="text-gray-300 leading-relaxed text-sm bg-gray-700/30 p-4 rounded-xl border border-gray-600">{project.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-200 text-lg">Tech Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, index) => (
                      <span key={tech.id} className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-lg border transition-all duration-300 hover:scale-105 ${
                        index % 3 === 0 
                          ? 'bg-blue-900/50 text-blue-200 border-blue-700/50 hover:bg-blue-800/50' 
                          : index % 3 === 1 
                          ? 'bg-purple-900/50 text-purple-200 border-purple-700/50 hover:bg-purple-800/50'
                          : 'bg-indigo-900/50 text-indigo-200 border-indigo-700/50 hover:bg-indigo-800/50'
                      }`}>
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline & Actions */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 rounded-2xl shadow-2xl border border-gray-700">
              <div className="flex flex-col lg:flex-row lg:justify-between mb-8 gap-6">
                <div className="flex-1">
                  <h2 className="font-semibold text-xl mb-4 text-white flex items-center gap-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                    Timeline
                  </h2>
                  <div className="space-y-3 bg-gray-700/30 p-4 rounded-xl border border-gray-600">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Start Date: <span className="font-medium text-white">2023-09-15</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Target Date: <span className="font-medium text-white">2024-06-30</span></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl transform">
                  View Live
                </button>
                <button className="px-6 py-3 border-2 border-gray-600 text-gray-200 hover:bg-gray-700/50 hover:border-gray-500 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  View Code
                </button>
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 shadow-2xl rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
                Team Members
              </h3>
              
              <div className="space-y-4">
                {{
                  { name: 'John Doe', email: 'john@example.com', role: 'Team Lead' },
                  { name: 'Jane Smith', email: 'jane@example.com', role: 'Assistant Lead' },
                  { name: 'Alice', email: 'alice@example.com', role: 'Member' },
                  { name: 'Bob', email: 'bob@example.com', role: 'Member' },
                  { name: 'Charlie', email: 'charlie@example.com', role: 'Member' },
                }.map((member, index) => (
                  <div key={member.email} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600 hover:bg-gray-700/50 transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shadow-lg ${
                        index % 4 === 0 
                          ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                          : index % 4 === 1 
                          ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white'
                          : index % 4 === 2
                          ? 'bg-gradient-to-br from-green-600 to-green-700 text-white'
                          : 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white'
                      }`}>
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-100 group-hover:text-white transition-colors duration-300">{member.name}</div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{member.email}</div>
                      </div>
                    </div>
                    <span className={`px-4 py-2 text-xs rounded-full font-semibold shadow-lg ${
                      member.role === 'Team Lead'
                        ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white'
                        : member.role === 'Assistant Lead'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-300 border border-gray-600'
                    }`}>
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:flex-[1_1_0%] w-full space-y-8">
            {/* Project Info */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 w-full rounded-2xl shadow-2xl border border-gray-700 sticky top-8">
              <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                Project Info
              </h3>

              <div className="space-y-6">
                <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                  <span className="font-semibold text-gray-200 block mb-2">Domain</span>
                  <span className="text-gray-300 bg-indigo-900/30 px-3 py-1 rounded-lg text-sm font-medium">{project.domain}</span>
                </div>

                <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                  <span className="font-semibold text-gray-200 block mb-3">Leadership</span>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-400 text-sm">Team Lead:</span>
                      <span className="text-gray-200 font-medium">{project.teamLead}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-400 text-sm">Assistant Lead:</span>
                      <span className="text-gray-200 font-medium">{project.assistantLead}</span>
                    </div>
                  </div>
                </div>
                    
                <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                  <span className="font-semibold text-gray-200 block mb-2">Team Size</span>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-indigo-400" />
                    <span className="text-gray-300 font-medium">{project.teamSize} members</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-850 p-8 rounded-2xl shadow-2xl border border-gray-700">
              <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-red-500 rounded-full"></div>
                Recent Activity
              </h3>
              <div className="space-y-4">
                {project.activities.length > 0 ? (
                  project.activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-700/30 rounded-xl border border-gray-600 hover:bg-gray-700/50 transition-all duration-300">
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="text-gray-200 font-medium mb-1">{activity.description}</div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-sm text-center py-8 bg-gray-700/20 rounded-xl border border-gray-600">
                    No recent activity.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

