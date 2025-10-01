"use client";
import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaFilter, FaTimes, FaSearch } from "react-icons/fa";

const memberData = [
	{
		name: "Karan Vijay",
		email: "karan@example.com",
		project: "E-commerce App",
		domain: "Web Development",
		designation: "Member",
		github: "#",
		linkedin: "#",
	},
	{
		name: "Narine Smith",
		email: "narine@example.com",
		project: "Mobile Banking",
		domain: "App Development",
		designation: "Project Lead",
		github: "#",
		linkedin: "#",
	},
	{
		name: "Jason Hunt",
		email: "jason@example.com",
		project: "Portfolio Website",
		domain: "Web Development",
		designation: "Domain Lead",
		github: "#",
		linkedin: "#",
	},
	{
		name: "David Jones",
		email: "david@example.com",
		project: "AI Chatbot",
		domain: "Machine Learning",
		designation: "Member",
		github: "#",
		linkedin: "#",
	},
	{
		name: "Sarah Wilson",
		email: "sarah@example.com",
		project: "Data Analytics",
		domain: "Data Science",
		designation: "Admin",
		github: "#",
		linkedin: "#",
	},
];

const domains = [
	"All",
	"Web Development",
	"App Development",
	"Machine Learning",
	"Data Science",
];
const projects = [
	"All",
	"E-commerce App",
	"Mobile Banking",
	"Portfolio Website",
	"AI Chatbot",
	"Data Analytics",
];
const designations = [
	"All",
	"Member",
	"Project Lead",
	"Domain Lead",
];

function MemberCard({
	member,
	onPromote,
	onDelete,
}: {
	member: typeof memberData[0];
	onPromote: (member: typeof memberData[0]) => void;
	onDelete: (member: typeof memberData[0]) => void;
}) {
	return (
		<div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
			<div className="space-y-3">
				<div>
					<h3 className="text-lg font-semibold text-neutral-100">
						{member.name}
					</h3>
					<p className="text-sm text-neutral-300">{member.email}</p>
				</div>

				<div className="space-y-2">
					<div>
						<span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
							Designation
						</span>
						<p className="text-sm text-neutral-100">{member.designation}</p>
					</div>
					<div>
						<span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
							Project
						</span>
						<p className="text-sm text-neutral-100">{member.project}</p>
					</div>
					<div>
						<span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
							Domain
						</span>
						<p className="text-sm text-neutral-100">{member.domain}</p>
					</div>
				</div>

				<div className="flex items-center space-x-3">
					<a
						href={member.github}
						target="_blank"
						rel="noopener noreferrer"
						className="bg-neutral-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-neutral-600 transition-colors"
					>
						<FaGithub size={16} />
					</a>
					<a
						href={member.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-700 transition-colors"
					>
						<FaLinkedin size={16} />
					</a>
				</div>

				<div className="flex space-x-2 pt-3 border-t border-neutral-800">
					<button
						onClick={() => onPromote(member)}
						className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
					>
						Promote
					</button>
					<button
						onClick={() => onDelete(member)}
						className="flex-1 bg-rose-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-rose-700 transition-colors"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

function PromoteModal({
	member,
	isOpen,
	onClose,
	onConfirm,
}: {
	member: typeof memberData[0] | null;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (role: string) => void;
}) {
	const [selectedRole, setSelectedRole] = useState("");

	if (!isOpen || !member) return null;

	const handleConfirm = () => {
		if (selectedRole) {
			onConfirm(selectedRole);
			setSelectedRole("");
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-neutral-800 rounded-lg p-6 w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold text-neutral-100">
						Promote Member
					</h3>
					<button
						onClick={onClose}
						className="text-neutral-400 hover:text-neutral-300"
					>
						<FaTimes size={20} />
					</button>
				</div>

				<p className="text-neutral-300 mb-4">
					Promote <strong>{member.name}</strong> to:
				</p>

				<div className="space-y-3 mb-6">
					{["Domain Lead", "Project Lead"].map((role) => (
						<label key={role} className="flex items-center">
							<input
								type="radio"
								name="role"
								value={role}
								checked={selectedRole === role}
								onChange={(e) => setSelectedRole(e.target.value)}
								className="mr-3"
							/>
							<span className="text-neutral-200">{role}</span>
						</label>
					))}
				</div>

				<div className="flex space-x-3">
					<button
						onClick={onClose}
						className="flex-1 bg-neutral-600 text-neutral-200 px-4 py-2 rounded-md hover:bg-neutral-500 transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={handleConfirm}
						disabled={!selectedRole}
						className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 disabled:bg-neutral-600 disabled:cursor-not-allowed transition-colors"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
}

function DeleteModal({
	member,
	isOpen,
	onClose,
	onConfirm,
}: {
	member: typeof memberData[0] | null;
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}) {
	if (!isOpen || !member) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-neutral-800 rounded-lg p-6 w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold text-neutral-100">Delete Member</h3>
					<button
						onClick={onClose}
						className="text-neutral-400 hover:text-neutral-300"
					>
						<FaTimes size={20} />
					</button>
				</div>

				<p className="text-neutral-300 mb-6">
					Are you sure you want to remove{" "}
					<strong>{member.name}</strong> from the team?
				</p>

				<div className="flex space-x-3">
					<button
						onClick={onClose}
						className="flex-1 bg-neutral-600 text-neutral-200 px-4 py-2 rounded-md hover:bg-neutral-500 transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="flex-1 bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition-colors"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default function AllMembers() {
	const [members, setMembers] = useState(memberData);
	const [searchQuery, setSearchQuery] = useState("");
	const [domainFilter, setDomainFilter] = useState("All");
	const [projectFilter, setProjectFilter] = useState("All");
	const [designationFilter, setDesignationFilter] = useState("All");
	const [promoteModal, setPromoteModal] = useState<{
		isOpen: boolean;
		member: typeof memberData[0] | null;
	}>({
		isOpen: false,
		member: null,
	});
	const [deleteModal, setDeleteModal] = useState<{
		isOpen: boolean;
		member: typeof memberData[0] | null;
	}>({
		isOpen: false,
		member: null,
	});

	const filteredMembers = members.filter((member) => {
		const searchMatch = searchQuery === "" || 
			member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			member.email.toLowerCase().includes(searchQuery.toLowerCase());
		const domainMatch = domainFilter === "All" || member.domain === domainFilter;
		const projectMatch = projectFilter === "All" || member.project === projectFilter;
		const designationMatch = designationFilter === "All" || member.designation === designationFilter;
		return searchMatch && domainMatch && projectMatch && designationMatch;
	});

	const handlePromote = (member: typeof memberData[0]) => {
		setPromoteModal({ isOpen: true, member });
	};

	const handleDelete = (member: typeof memberData[0]) => {
		setDeleteModal({ isOpen: true, member });
	};

	const handlePromoteConfirm = (role: string) => {
		if (promoteModal.member) {
			setMembers(prev => 
				prev.map(member => 
					member.name === promoteModal.member?.name 
						? { ...member, designation: role }
						: member
				)
			);
			console.log(`Promoting ${promoteModal.member?.name} to ${role}`);
			setPromoteModal({ isOpen: false, member: null });
		}
	};

	const handleDeleteConfirm = () => {
		if (deleteModal.member) {
			setMembers(prev => 
				prev.filter(member => member.name !== deleteModal.member?.name)
			);
			console.log(`Deleting ${deleteModal.member?.name}`);
		}
		setDeleteModal({ isOpen: false, member: null });
	};

	return (
		<div className="min-h-screen md:px-4 py-6">
			{/* Header */}
			<div className=" ">
				<div className="">
					<h1 className="text-4xl font-bold text-neutral-100">Members</h1>
					<p className="text-neutral-300 mt-2">
						Manage team members across all domains and projects
					</p>
				</div>
			</div>

			{/* Search Bar */}
			<div className="px-0 py-4">
				<div className="max-w-md">
					<div className="relative">
						<FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={16} />
						<input
							type="text"
							placeholder="Search members by name or email..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-600 rounded-md text-neutral-100 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
				</div>
			</div>

			{/* Filters */}
			<div className="px-0 py-4">
				<div className="flex items-center space-x-4 mb-6">
					<div className="flex items-center space-x-4">
						<div>
							<label className="block text-sm font-medium text-neutral-300 mb-1">
								Domain
							</label>
							<select
								value={domainFilter}
								onChange={(e) => setDomainFilter(e.target.value)}
								className="border border-neutral-600 rounded-md px-3 py-2 bg-neutral-900 text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								{domains.map((domain) => (
									<option key={domain} value={domain}>
										{domain}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-neutral-300 mb-1">
								Project
							</label>
							<select
								value={projectFilter}
								onChange={(e) => setProjectFilter(e.target.value)}
								className="border border-neutral-600 rounded-md px-3 py-2 bg-neutral-900 text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								{projects.map((project) => (
									<option key={project} value={project}>
										{project}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-neutral-300 mb-1">
								Designation
							</label>
							<select
								value={designationFilter}
								onChange={(e) => setDesignationFilter(e.target.value)}
								className="border border-neutral-600 rounded-md px-3 py-2 bg-neutral-900 text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								{designations.map((designation) => (
									<option key={designation} value={designation}>
										{designation}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* Members Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
					{filteredMembers.map((member, index) => (
						<MemberCard
							key={`${member.name}-${index}`}
							member={member}
							onPromote={handlePromote}
							onDelete={handleDelete}
						/>
					))}
				</div>

				{filteredMembers.length === 0 && (
					<div className="text-center py-12">
						<p className="text-neutral-400">
							No members found matching the selected filters.
						</p>
					</div>
				)}
			</div>

			{/* Modals */}
			<PromoteModal
				member={promoteModal.member}
				isOpen={promoteModal.isOpen}
				onClose={() => setPromoteModal({ isOpen: false, member: null })}
				onConfirm={handlePromoteConfirm}
			/>

			<DeleteModal
				member={deleteModal.member}
				isOpen={deleteModal.isOpen}
				onClose={() => setDeleteModal({ isOpen: false, member: null })}
				onConfirm={handleDeleteConfirm}
			/>
		</div>
	);
}