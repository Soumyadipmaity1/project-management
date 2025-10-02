"use client";
import React, { useState, useMemo } from "react";
import { FaEllipsisV, FaPlus, FaChevronDown, FaTimes, FaEdit, FaTrash, FaThumbtack } from "react-icons/fa";

// Sample data with domain and project fields
const initialAnnouncements = [
	{
		id: 1,
		author: "Sanskar Singh",
		date: "August 05, 2025",
		time: "09:01 AM",
		domain: "Development",
		project: "Web Portal",
		month: "August",
		year: "2025",
		content: (
			<>
				We are excited to announce that our society's Annual Orientation Program
				will be held on August 12th at 4:00 PM in the Main Auditorium. All new and
				existing members are requested to join. We will cover introductions, a
				roadmap for upcoming projects, and fun team-building activities.
				<br />
				<span role="img" aria-label="memo">
					📝
				</span>{" "}
				Please confirm your attendance by filling out the forms shared in the
				group.
			</>
		),
		pinned: true,
	},
	{
		id: 2,
		author: "Sanskar Singh",
		date: "July 25, 2025",
		time: "09:01 AM",
		domain: "Design",
		project: "Mobile App",
		month: "July",
		year: "2025",
		content: (
			<>
				We are excited to announce that our society's Annual Orientation Program
				will be held on August 12th at 4:00 PM in the Main Auditorium. All new and
				existing members are requested to join. We will cover introductions, a
				roadmap for upcoming projects, and fun team-building activities.
				<br />
				<span role="img" aria-label="memo">
					📝
				</span>{" "}
				Please confirm your attendance by filling out the forms shared in the
				group.
			</>
		),
		pinned: false,
	},
	{
		id: 3,
		author: "Sanskar Singh",
		date: "June 15, 2024",
		time: "09:01 AM",
		domain: "Marketing",
		project: "Campaign 2024",
		month: "June",
		year: "2024",
		content: (
			<>
				We are excited to announce that our society's Annual Orientation Program
				will be held on August 12th at 4:00 PM in the Main Auditorium. All new and
				existing members are requested to join. We will cover introductions, a
				roadmap for upcoming projects, and fun team-building activities.
				<br />
				<span role="img" aria-label="memo">
					📝
				</span>{" "}
				Please confirm your attendance by filling out the forms shared in the
				group.
			</>
		),
		pinned: false,
	},
];

export default function AnnouncementsPage() {
	const [announcements, setAnnouncements] = useState(initialAnnouncements);
	const [selectedDomain, setSelectedDomain] = useState("All Domains");
	const [selectedProject, setSelectedProject] = useState("All Projects");
	const [selectedYear, setSelectedYear] = useState("All Years");
	const [selectedMonth, setSelectedMonth] = useState("All Months");
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [openDropdown, setOpenDropdown] = useState<number | null>(null);
	const [formData, setFormData] = useState({
		author: "",
		domain: "",
		project: "",
		month: "",
		year: "",
		content: ""
	});

	// Get unique domains, projects, years, and months
	const domains = [
		"All Domains",
		...Array.from(new Set(announcements.map((a) => a.domain))),
	];
	const projects = [
		"All Projects",
		...Array.from(new Set(announcements.map((a) => a.project))),
	];
	const years = ["All Years", ...Array.from(new Set(announcements.map((a) => a.year)))];
	const months = ["All Months", ...Array.from(new Set(announcements.map((a) => a.month)))];

	// Filter announcements based on selected filters
	const filteredAnnouncements = useMemo(() => {
		return announcements.filter((ann) => {
			const domainMatch =
				selectedDomain === "All Domains" || ann.domain === selectedDomain;
			const projectMatch =
				selectedProject === "All Projects" || ann.project === selectedProject;
			const yearMatch = selectedYear === "All Years" || ann.year === selectedYear;
			const monthMatch = selectedMonth === "All Months" || ann.month === selectedMonth;
			return domainMatch && projectMatch && yearMatch && monthMatch;
		});
	}, [announcements, selectedDomain, selectedProject, selectedYear, selectedMonth]);

	const pinned = filteredAnnouncements.filter((a) => a.pinned);
	const unpinned = filteredAnnouncements.filter((a) => !a.pinned);

	const handleCreateAnnouncement = () => {
		if (!formData.author || !formData.domain || !formData.project || !formData.content) {
			alert("Please fill in all required fields");
			return;
		}

		const newAnnouncement = {
			id: announcements.length + 1,
			author: formData.author,
			date: new Date().toLocaleDateString("en-US", { 
				year: "numeric", 
				month: "long", 
				day: "2-digit" 
			}),
			time: new Date().toLocaleTimeString("en-US", { 
				hour: "2-digit", 
				minute: "2-digit", 
				hour12: true 
			}),
			domain: formData.domain,
			project: formData.project,
			month: formData.month || new Date().toLocaleDateString("en-US", { month: "long" }),
			year: formData.year || new Date().getFullYear().toString(),
			content: <>{formData.content}</>,
			pinned: false,
		};

		setAnnouncements([newAnnouncement, ...announcements]);
		setFormData({ author: "", domain: "", project: "", month: "", year: "", content: "" });
		setShowCreateModal(false);
	};

	const handleDeleteAnnouncement = (id) => {
		setAnnouncements(announcements.filter(ann => ann.id !== id));
		setOpenDropdown(null);
	};

	const handlePinToggle = (id) => {
		setAnnouncements(announcements.map(ann => 
			ann.id === id ? { ...ann, pinned: !ann.pinned } : ann
		));
		setOpenDropdown(null);
	};

	const handleEditAnnouncement = (id) => {
		// For now, just close dropdown - you can implement edit functionality later
		console.log("Edit announcement:", id);
		setOpenDropdown(null);
	};

	return (
		<div className="min-h-screen py-6 px-4 text-white">
			{/* Heading and Create button */}
			<div className="flex items-center justify-between  mb-8">
				<h1 className="text-4xl font-bold text-white">
					Announcements
				</h1>
				<button 
					onClick={() => setShowCreateModal(true)}
					className="flex items-center gap-2 bg-white text-black px-7 py-3 rounded-md text-[15px] font-mclaren font-normal shadow hover:bg-neutral-200 transition"
				>
					<FaPlus /> Create announcement
				</button>
			</div>

			{/* Filter Dropdowns */}
			<div className="flex gap-4 mb-8 flex-wrap">
				{/* Domain Dropdown */}
				<div className="relative">
					<select
						value={selectedDomain}
						onChange={(e) => setSelectedDomain(e.target.value)}
						className="appearance-none bg-neutral-900 border border-neutral-700 text-white px-4 py-2 pr-8 rounded-md text-[14px] font-mclaren focus:outline-none focus:border-neutral-500 cursor-pointer"
					>
						{domains.map((domain) => (
							<option
								key={domain}
								value={domain}
								className="bg-neutral-900 text-white"
							>
								{domain}
							</option>
						))}
					</select>
					<FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none text-xs" />
				</div>

				{/* Project Dropdown */}
				<div className="relative">
					<select
						value={selectedProject}
						onChange={(e) => setSelectedProject(e.target.value)}
						className="appearance-none bg-neutral-900 border border-neutral-700 text-white px-4 py-2 pr-8 rounded-md text-[14px] font-mclaren focus:outline-none focus:border-neutral-500 cursor-pointer"
					>
						{projects.map((project) => (
							<option
								key={project}
								value={project}
								className="bg-neutral-900 text-white"
							>
								{project}
							</option>
						))}
					</select>
					<FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none text-xs" />
				</div>

				{/* Year Dropdown */}
				<div className="relative">
					<select
						value={selectedYear}
						onChange={(e) => setSelectedYear(e.target.value)}
						className="appearance-none bg-neutral-900 border border-neutral-700 text-white px-4 py-2 pr-8 rounded-md text-[14px] font-mclaren focus:outline-none focus:border-neutral-500 cursor-pointer"
					>
						{years.map((year) => (
							<option
								key={year}
								value={year}
								className="bg-neutral-900 text-white"
							>
								{year}
							</option>
						))}
					</select>
					<FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none text-xs" />
				</div>

				{/* Month Dropdown */}
				<div className="relative">
					<select
						value={selectedMonth}
						onChange={(e) => setSelectedMonth(e.target.value)}
						className="appearance-none bg-neutral-900 border border-neutral-700 text-white px-4 py-2 pr-8 rounded-md text-[14px] font-mclaren focus:outline-none focus:border-neutral-500 cursor-pointer"
					>
						{months.map((month) => (
							<option
								key={month}
								value={month}
								className="bg-neutral-900 text-white"
							>
								{month}
							</option>
						))}
					</select>
					<FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none text-xs" />
				</div>
			</div>

			{/* Pinned Section */}
			{pinned.length > 0 && (
				<>
					<div className="text-white text-[18px] font-mclaren mb-2 font-bold uppercase tracking-[0]">
						Pinned
					</div>
					<div className="flex flex-col gap-0 w-full mb-10">
						{pinned.map((ann) => (
							<div
								key={ann.id}
								className="bg-neutral-900 border border-neutral-700 rounded-lg px-6 py-4 shadow-sm flex flex-col gap-2 relative mb-4"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-neutral-600 object-cover" />
										<div>
											<div className="text-white text-[20px] font-mclaren leading-[100%] tracking-[0] font-normal">
												{ann.author}
											</div>
											<div className="text-neutral-400 text-[13px] font-mclaren leading-[100%] tracking- font-normal mt-1">
												{ann.date}&nbsp;&nbsp;•&nbsp;&nbsp;{ann.time}
												&nbsp;&nbsp;•&nbsp;&nbsp;{ann.domain}
												&nbsp;&nbsp;•&nbsp;&nbsp;{ann.project}
											</div>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<span className="bg-neutral-700 text-neutral-300 px-4 py-1 rounded-md text-[15px] font-mclaren font-normal">
											Pinned
										</span>
										<div className="relative">
											<FaEllipsisV 
												className="text-neutral-400 cursor-pointer hover:text-white" 
												onClick={() => setOpenDropdown(openDropdown === ann.id ? null : ann.id)}
											/>
											{openDropdown === ann.id && (
												<div className="absolute right-0 top-6 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg z-10 min-w-[120px]">
													<button
														onClick={() => handleEditAnnouncement(ann.id)}
														className="flex items-center gap-2 w-full px-3 py-2 text-left text-neutral-300 hover:bg-neutral-700 hover:text-white text-sm"
													>
														<FaEdit /> Edit
													</button>
													<button
														onClick={() => handlePinToggle(ann.id)}
														className="flex items-center gap-2 w-full px-3 py-2 text-left text-neutral-300 hover:bg-neutral-700 hover:text-white text-sm"
													>
														<FaThumbtack /> Unpin
													</button>
													<button
														onClick={() => handleDeleteAnnouncement(ann.id)}
														className="flex items-center gap-2 w-full px-3 py-2 text-left text-red-400 hover:bg-neutral-700 hover:text-red-300 text-sm"
													>
														<FaTrash /> Delete
													</button>
												</div>
											)}
										</div>
									</div>
								</div>
								<div className="text-neutral-200 text-[18px] font-mclaren leading-[100%] tracking-[0] font-normal mb-3 mt-3">
									{ann.content}
								</div>
							</div>
						))}
					</div>
				</>
			)}

			{/* Month/Year Heading */}
			<div className="text-neutral-400 text-[20px] font-mclaren mb-3 leading-[100%] tracking-[0] font-normal">
				{selectedMonth !== "All Months" && selectedYear !== "All Years"
					? `${selectedMonth} ${selectedYear}`
					: selectedMonth !== "All Months"
					? selectedMonth
					: selectedYear !== "All Years"
					? selectedYear
					: "All Announcements"}
			</div>

			{/* Unpinned announcements */}
			<div className="flex flex-col gap-0 w-full">
				{unpinned.map((ann) => (
					<div
						key={ann.id}
						className="bg-neutral-900 border border-neutral-700 rounded-lg px-6 py-4 shadow-sm flex flex-col gap-2 relative mb-4"
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-full bg-neutral-600 object-cover" />
								<div>
									<div className="text-white text-[20px] font-mclaren leading-[100%] tracking-[0] font-normal">
										{ann.author}
									</div>
									<div className="text-neutral-400 text-[13px] font-mclaren leading-[100%] tracking- font-normal mt-1">
										{ann.date}&nbsp;&nbsp;•&nbsp;&nbsp;{ann.time}
										&nbsp;&nbsp;•&nbsp;&nbsp;{ann.domain}
										&nbsp;&nbsp;•&nbsp;&nbsp;{ann.project}
									</div>
								</div>
							</div>
							<div className="relative">
								<FaEllipsisV 
									className="text-neutral-400 cursor-pointer hover:text-white" 
									onClick={() => setOpenDropdown(openDropdown === ann.id ? null : ann.id)}
								/>
								{openDropdown === ann.id && (
									<div className="absolute right-0 top-6 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg z-10 min-w-[120px]">
										<button
											onClick={() => handleEditAnnouncement(ann.id)}
											className="flex items-center gap-2 w-full px-3 py-2 text-left text-neutral-300 hover:bg-neutral-700 hover:text-white text-sm"
										>
											<FaEdit /> Edit
										</button>
										<button
											onClick={() => handlePinToggle(ann.id)}
											className="flex items-center gap-2 w-full px-3 py-2 text-left text-neutral-300 hover:bg-neutral-700 hover:text-white text-sm"
										>
											<FaThumbtack /> Pin
										</button>
										<button
											onClick={() => handleDeleteAnnouncement(ann.id)}
											className="flex items-center gap-2 w-full px-3 py-2 text-left text-red-400 hover:bg-neutral-700 hover:text-red-300 text-sm"
										>
											<FaTrash /> Delete
										</button>
									</div>
								)}
							</div>
						</div>
						<div className="text-neutral-200 text-[18px] font-mclaren leading-[100%] tracking- font-normal mb-3 mt-3">
							{ann.content}
						</div>
						<button className="text-sm text-neutral-400 font-semibold w-fit mt-1 px-0 outline-none bg-transparent hover:text-white cursor-pointer">
							Show More
						</button>
					</div>
				))}
			</div>

			{/* No results message */}
			{filteredAnnouncements.length === 0 && (
				<div className="text-center text-neutral-400 py-8">
					<p className="text-[18px] font-mclaren">
						No announcements found for the selected filters.
					</p>
				</div>
			)}

			{/* Create Announcement Modal */}
			{showCreateModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-white text-[24px] font-mclaren font-normal">Create Announcement</h2>
							<button
								onClick={() => setShowCreateModal(false)}
								className="text-neutral-400 hover:text-white"
							>
								<FaTimes />
							</button>
						</div>

						<div className="space-y-4">
							<div>
								<label className="block text-neutral-300 text-sm font-mclaren mb-2">Author *</label>
								<input
									type="text"
									value={formData.author}
									onChange={(e) => setFormData({ ...formData, author: e.target.value })}
									className="w-full bg-neutral-800 border border-neutral-700 text-white px-3 py-2 rounded-md text-sm font-mclaren focus:outline-none focus:border-neutral-500"
									placeholder="Enter author name"
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-neutral-300 text-sm font-mclaren mb-2">Domain *</label>
									<input
										type="text"
										value={formData.domain}
										onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
										className="w-full bg-neutral-800 border border-neutral-700 text-white px-3 py-2 rounded-md text-sm font-mclaren focus:outline-none focus:border-neutral-500"
										placeholder="e.g., Development"
									/>
								</div>
								<div>
									<label className="block text-neutral-300 text-sm font-mclaren mb-2">Project *</label>
									<input
										type="text"
										value={formData.project}
										onChange={(e) => setFormData({ ...formData, project: e.target.value })}
										className="w-full bg-neutral-800 border border-neutral-700 text-white px-3 py-2 rounded-md text-sm font-mclaren focus:outline-none focus:border-neutral-500"
										placeholder="e.g., Web Portal"
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-neutral-300 text-sm font-mclaren mb-2">Month</label>
									<input
										type="text"
										value={formData.month}
										onChange={(e) => setFormData({ ...formData, month: e.target.value })}
										className="w-full bg-neutral-800 border border-neutral-700 text-white px-3 py-2 rounded-md text-sm font-mclaren focus:outline-none focus:border-neutral-500"
										placeholder="e.g., January (optional)"
									/>
								</div>
								<div>
									<label className="block text-neutral-300 text-sm font-mclaren mb-2">Year</label>
									<input
										type="text"
										value={formData.year}
										onChange={(e) => setFormData({ ...formData, year: e.target.value })}
										className="w-full bg-neutral-800 border border-neutral-700 text-white px-3 py-2 rounded-md text-sm font-mclaren focus:outline-none focus:border-neutral-500"
										placeholder="e.g., 2025 (optional)"
									/>
								</div>
							</div>

							<div>
								<label className="block text-neutral-300 text-sm font-mclaren mb-2">Content *</label>
								<textarea
									value={formData.content}
									onChange={(e) => setFormData({ ...formData, content: e.target.value })}
									rows={6}
									className="w-full bg-neutral-800 border border-neutral-700 text-white px-3 py-2 rounded-md text-sm font-mclaren focus:outline-none focus:border-neutral-500 resize-vertical"
									placeholder="Enter announcement content..."
								/>
							</div>
						</div>

						<div className="flex gap-3 mt-6 justify-end">
							<button
								onClick={() => setShowCreateModal(false)}
								className="px-4 py-2 text-neutral-300 hover:text-white font-mclaren text-sm border border-neutral-700 rounded-md hover:bg-neutral-800 transition"
							>
								Cancel
							</button>
							<button
								onClick={handleCreateAnnouncement}
								className="px-4 py-2 bg-white text-black font-mclaren text-sm rounded-md hover:bg-neutral-200 transition"
							>
								Create Announcement
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Click outside to close dropdown */}
			{openDropdown && (
				<div 
					className="fixed inset-0 z-5" 
					onClick={() => setOpenDropdown(null)}
				/>
			)}
		</div>
	);
}
