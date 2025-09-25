"use client";

interface Stat {
  title: string;
  value: number;
  description: string;
}

interface Domain {
  name: string;
  description: string;
}

interface MemberPanelProps {
  role: "Member User" | "Admin" | "Team Lead";
  stats: Stat[];
  domains: Domain[];
}

const StatCard = ({ stat }: { stat: Stat }) => (
  <div
    className="rounded-[15px] bg-blue-100 bg-opacity-70 border border-gray-300 p-6 font-bold shadow-lg flex flex-col "
    style={{ boxShadow: "0 4px 12px rgba(77, 77, 83, 0.25)" }}
  >
    <div className="text-[#2A2A4A] font-mclaren font-medium text-[20px] mb-2">
      {stat.title}
    </div>
    <div className="text-[#2A2A4A] font-mclaren text-[38px] mb-2 font-bold">
      {stat.value}
    </div>
    <div className="text-[#2A2A4A] font-mclaren font-normal text-[15px]">
      {stat.description}
    </div>
  </div>
);

const DomainCard = ({ domain }: { domain: Domain }) => (
  <div className="rounded-lg border border-gray-300 shadow-lg">
    <div className="bg-blue-100 rounded-t-lg p-4 flex items-center gap-2">
      <span className="font-madimiOne text-[20px] text-black font-medium">{"</>"}</span>
      <span className="font-madimiOne text-[20px] text-black font-medium">{domain.name}</span>
    </div>
    <div className="p-6 bg-[#EAF2FFB0] rounded-b-lg">
      <div className="text-[#2A2A4A] font-mclaren text-[18px] mb-4 flex justify-center">
        {domain.description}
      </div>
      <button className="bg-blue-600 hover:to-blue-500 cursor-pointer text-[#FFF6EB] py-2 px-4 rounded flex items-center gap-2 w-full justify-center">
        View Domain <span>→</span>
      </button>
    </div>
  </div>
);

export default function MemberPanel({ role = "Member User" }: MemberPanelProps) {
  const stats: Stat[] = [
    { title: "Total Projects", value: 12, description: "Across All Domains" },
    { title: "Completed Projects", value: 5, description: "Across All Domains" },
    { title: "Ongoing Projects", value: 7, description: "Across All Domains" },
    { title: "Pending Approval", value: 3, description: "Across All Domains" },
  ];

  const domains: Domain[] = [
    { name: "Web Development", description: "Access Projects and Resources in Web" },
  ];

  return (
    <div className="pl-2 py-8 w-full">
      <h2 className="font-mclaren text-[38px] mb-1 font-medium text-[#2A2A4A]">
        Welcome back, {role}
      </h2>
      <p className="text-[#181824b0] font-mclaren text-[18px] mb-6">
        View and work on your assigned projects
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 w-full">
        {stats.map((stat, idx) => (
          <StatCard key={idx} stat={stat} />
        ))}
      </div>

      <h2 className="font-mclaren text-[30px] mb-4 text-black font-medium">Your Domains</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {domains.map((domain, idx) => (
          <DomainCard key={idx} domain={domain} />
        ))}
      </div>
    </div>
  );
}
