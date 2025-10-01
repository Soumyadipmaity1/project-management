// app/admin/page.tsx

export default function MemberPanel() {
  const stats = [
    {
      title: "Total Projects",
      value: 24,
      description: "Across All Domains",
      color: "from-slate-700 to-slate-900",
      accent: "from-blue-400 to-blue-600"
    },
    {
      title: "Total Domain Leads",
      value: 8,
      description: "Managing Domains",
      color: "from-zinc-700 to-zinc-900",
      accent: "from-purple-400 to-purple-600"
    },
    {
      title: "Total Admins",
      value: 3,
      description: "System Administrators",
      color: "from-gray-700 to-gray-900",
      accent: "from-emerald-400 to-emerald-600"
    },
    {
      title: "Total Project Leads",
      value: 15,
      description: "Leading Projects",
      color: "from-neutral-700 to-neutral-900",
      accent: "from-orange-400 to-orange-600"
    },
    {
      title: "Total Members",
      value: 156,
      description: "Active Members",
      color: "from-stone-700 to-stone-900",
      accent: "from-pink-400 to-pink-600"
    },
    {
      title: "Total Domains",
      value: 6,
      description: "Technology Domains",
      color: "from-slate-700 to-slate-900",
      accent: "from-indigo-400 to-indigo-600"
    },
    {
      title: "Ongoing Projects",
      value: 18,
      description: "Currently Active",
      color: "from-zinc-700 to-zinc-900",
      accent: "from-yellow-400 to-yellow-600"
    },
    {
      title: "Completed Projects",
      value: 6,
      description: "Successfully Finished",
      color: "from-gray-700 to-gray-900",
      accent: "from-teal-400 to-teal-600"
    },
  ];

  return (
    <div className="px-4 py-6 w-full min-h-screen ">
      <h2 className="font-mclaren font-normal text-[38px] leading-[100%] tracking-[0] mb-2 text-white">Welcome back, Admin</h2>
      <p className="text-gray-300 font-mclaren font-normal text-[18px] leading-[100%] tracking-[0] pt-2 mb-15">
        View and manage your platform statistics and projects
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 w-full">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className={`group relative rounded-[20px] bg-gradient-to-br ${stat.color} border border-gray-500/30 p-6 shadow-2xl flex flex-col justify-center items-center hover:scale-105 hover:shadow-3xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden backdrop-blur-sm`}
            style={{ 
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
            }}
          >
            {/* Background gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            
            {/* Title */}
            <div className="text-gray-100 font-mclaren font-medium text-[16px] leading-[120%] tracking-wide mb-4 text-center group-hover:text-white transition-colors duration-300 z-10">
              {stat.title}
            </div>
            
            {/* Value */}
            <div className={`text-white font-mclaren text-[42px] leading-[100%] tracking-tight mb-4 font-bold bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 z-10`}>
              {stat.value}
            </div>
            
            {/* Description */}
            <div className="text-gray-300 font-mclaren font-normal text-[12px] leading-[120%] tracking-wide text-center group-hover:text-gray-200 transition-colors duration-300 z-10">
              {stat.description}
            </div>
            
            {/* Animated border */}
            <div className={`absolute inset-0 rounded-[20px] border-2 border-transparent group-hover:border-gradient-to-r group-hover:${stat.accent} transition-all duration-300 opacity-0 group-hover:opacity-50`}></div>
          </div>
        ))}
      </div>

    </div>
  );
}
