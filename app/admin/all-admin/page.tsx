// "use client";
// import React from "react";
// import { FaGithub, FaLinkedin } from "react-icons/fa";

// // Optimized team members data with realistic names and roll numbers
// const team = [
// 	{
// 		name: "Arjun Sharma",
// 		rollNumber: "21051001",
// 		img: "/path/to/photo1.jpg",
// 		github: "https://github.com/arjunsharma",
// 		linkedin: "https://linkedin.com/in/arjunsharma",
// 	},
// 	{
// 		name: "Priya Patel",
// 		rollNumber: "21051045",
// 		img: "/path/to/photo2.jpg",
// 		github: "https://github.com/priyapatel",
// 		linkedin: "https://linkedin.com/in/priyapatel",
// 	},
// 	{
// 		name: "Rahul Kumar",
// 		rollNumber: "21051078",
// 		img: "/path/to/photo3.jpg",
// 		github: "https://github.com/rahulkumar",
// 		linkedin: "https://linkedin.com/in/rahulkumar",
// 	},
// 	{
// 		name: "Sneha Singh",
// 		rollNumber: "21051092",
// 		img: "/path/to/photo4.jpg",
// 		github: "https://github.com/snehasingh",
// 		linkedin: "https://linkedin.com/in/snehasingh",
// 	},
// 	{
// 		name: "Vikram Gupta",
// 		rollNumber: "21051156",
// 		img: "/path/to/photo5.jpg",
// 		github: "https://github.com/vikramgupta",
// 		linkedin: "https://linkedin.com/in/vikramgupta",
// 	},
// 	{
// 		name: "Anisha Reddy",
// 		rollNumber: "21051203",
// 		img: "/path/to/photo6.jpg",
// 		github: "https://github.com/anishareddy",
// 		linkedin: "https://linkedin.com/in/anishareddy",
// 	},
// ];

// export default function TeamMembers() {
// 	return (
// 		<div className="min-h-screen py-6 px-4 ">
// 			<h2 className="text-4xl font-bold text-white">All Admins</h2>
// 			<p className="text-neutral-300 text-lg mb-8">
// 				Manage Admins Across Entire Platform
// 			</p>
// 			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// 				{team.map((member) => (
// 					<div
// 						key={`${member.rollNumber}-${member.name}`}
// 						className="bg-neutral-900 border border-neutral-800 rounded-lg flex flex-col items-center px-5 py-7 shadow-lg hover:shadow-xl hover:bg-neutral-750 transition-all duration-300"
// 					>
// 						<img
// 							src={member.img}
// 							alt={member.name}
// 							className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-neutral-800 shadow-md"
// 						/>
// 						<div className="text-neutral-100 font-mclaren text-[17px] font-semibold text-center mb-1">
// 							{member.name}
// 						</div>
// 						<div className="text-neutral-400 font-mclaren text-[14px] font-normal text-center mb-4">
// 							Roll: {member.rollNumber}
// 						</div>
// 						<div className="flex gap-3">
// 							<a
// 								href={member.github}
// 								target="_blank"
// 								rel="noopener noreferrer"
// 								className="bg-neutral-800 hover:bg-neutral-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
// 							>
// 								<FaGithub size={16} />
// 							</a>
// 							<a
// 								href={member.linkedin}
// 								target="_blank"
// 								rel="noopener noreferrer"
// 								className="bg-[#0077b5] hover:bg-[#005582] text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
// 							>
// 								<FaLinkedin size={16} />
// 							</a>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// }


"use client";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function TeamMembers() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch("/api/alladmin", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch admins");
        const data = await res.json();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        Loading admins...
      </div>
    );

  return (
    <div className="min-h-screen py-6 px-4">
      <h2 className="text-4xl font-bold text-white mb-2">All Admins</h2>
      <p className="text-neutral-300 text-lg mb-8">
        Manage Admins Across Entire Platform
      </p>

      {admins.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          No admins found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {admins.map((member) => (
            <div
              key={member._id}
              className="bg-neutral-900 border border-neutral-800 rounded-lg flex flex-col items-center px-5 py-7 shadow-lg hover:shadow-xl hover:bg-neutral-800 transition-all duration-300"
            >
              <img
                src={member.profilePic || "/default-avatar.png"}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-neutral-800 shadow-md"
              />
              <div className="text-neutral-100 font-semibold text-center mb-1">
                {member.name}
              </div>
              <div className="text-neutral-400 text-sm text-center mb-4">
                Roll: {member.rollNo}
              </div>
              <div className="flex gap-3">
                {member.githubId && (
                  <a
                    href={member.githubId}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-neutral-800 hover:bg-neutral-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                  >
                    <FaGithub size={16} />
                  </a>
                )}
                {member.linkedinId && (
                  <a
                    href={member.linkedinId}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0077b5] hover:bg-[#005582] text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                  >
                    <FaLinkedin size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
