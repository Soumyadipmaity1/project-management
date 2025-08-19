import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';
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

export default async function ProjectDetailPage({ params }: Props) {
  const { projectId } = params;
  const project = await getProjectById(projectId);

  if (!project) {
    return (
      <div className="w-screen min-h-screen flex items-center justify-center text-3xl text-red-500">
        Project not found!!
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen  py-8 mt-10 overflow-x-hidden">
      <div className="flex items-center justify-between mb-8">
        <Link href="/projects" className="text-blue-600 hover:underline flex items-center">
         <FaChevronLeft className="mr-2 text-xl text-[#4A4080B8]" />
        <span className="font-['Maven_Pro',sans-serif] font-bold text-[30px] leading-[100%] tracking-[0] ">{project.name}</span>
        </Link>
            <span className={`px-4 py-1 rounded-full bg-[#14A1FF] text-white text-sm font-semibold ml-4" style={{minWidth: "110px", textAlign: "center"}}${project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>{project.status}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        <div className="md:flex-[2_1_0%] w-full">
          <div className="w-full h-56 bg-gray-300 rounded-lg mb-6 flex items-center justify-center ">
            <span className="text-black ">Project Image</span>
          </div>

          <div className="bg-white p-6 w-full rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Project Details</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Edit</button>
            </div>
            <h3 className="font-semibold mt-4 mb-1">Description</h3>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <h3 className="font-semibold mb-1">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                 <span  key={tech.id} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {tech.name}
                 </span>
              ))}
              
            </div>
          </div>

           <div className="bg-white p-6 mt-2 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row md:justify-between mb-8">
              <div>
                <h2 className="font-semibold text-lg mb-2">Timeline</h2>
                <ul>
                  <li>
                    Start Date: 2023-09-15
                  </li>
                  <li>
                    Target Date: 2024-06-30
                  </li>
                </ul>
              </div>

              {/* <div>
                <h2 className="font-semibold text-lg mb-2">Progress</h2>
                <div className="w-full bg-gray-400 rounded-lg h-2"></div>
                 <span className="text-sm text-gray-600 mt-1 block">65% Complete</span>
              </div> */}

              

            </div>

            <div className="mb-8 flex gap-4">
            <button className="bg-black text-white px-4 py-2 rounded">View Live</button>
            <button className="border px-4 py-2">View Code</button>
            </div>
           </div>

          <div className="bg-white p-6 mt-2 shadow-lg rounded">
           <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Team Members</h3>
            <button className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 transition">Edit</button>
           </div>
          
              <div className="space-y-4">
              {[
                { name: 'John Doe', email: 'john@example.com', role: 'Team Lead' },
                { name: 'Jane Smith', email: 'jane@example.com', role: 'Assistant Lead' },
                { name: 'Alice', email: 'alice@example.com', role: 'Member' },
                { name: 'Bob', email: 'bob@example.com', role: 'Member' },
                { name: 'Charlie', email: 'charlie@example.com', role: 'Member' },
              ].map((member) => (
                <div key={member.email} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      member.role === 'Team Lead'
                        ? 'bg-black text-white'
                        : member.role === 'Assistant Lead'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {member.role}
                  </span>
                </div>
              ))}
            </div>

          </div>

           

        </div>

        <div className="md:flex-[1_1_0%] w-full space-y-6">
          <div className="bg-white p-6 w-full shadow-lg  rounded-lg">
          <h3 className="text-lg font-bold mb-4 ">Project Info</h3>

          <div className="mb-4">
          <span className="font-semibold">Domain:</span>&nbsp;
          <span>{project.domain}</span>
          </div>

         <div className="mb-4">
          <span className="font-semibold">Leadership</span>
          <div className="mt-2 space-y-1">
            <div>
              <span className="text-gray-600">
               Team Lead: 
              </span>&nbsp;
              <span>
                {project.teamLead}
              </span>
              
            </div>

            <div>
              <span className="text-gray-600">
                Assistant Lead: 
              </span>&nbsp;
              <span>
                {project.assistantLead}
              </span>
              
            </div>
          </div>
         </div>
              
          <div className="mb-4">
            <span className="font-semibold">Team Size:</span>&nbsp;
            <span>{project.teamSize} members</span>
           
          </div>

          <button className="w-full bg-red-100 mt-2 px-4 py-2 text-red-700 hover:bg-red-200 transition">
            Delete Project
          </button>


          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            <div className="space-y-4">
               {project.activities.length > 0 ? (
                project.activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="text-blue-600">{activity.icon}</div>
                    <div>
                      <div>{activity.description}</div>
                      <div className="text-xs text-gray-400">{activity.time}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm">No recent activity.</div>
              )}
            </div>
          </div>

          

        </div>

      </div>
       
    </div>
  );
}