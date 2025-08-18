// app/admin/page.tsx

export default function MemberPanel() {
  const stats = [
     {
      title: "Total Projects",
      value: 12,
      description: "Across All Domain",
    },
    {
      title: "Total Projects",
      value: 12,
      description: "Across All Domain",
    },
    {
      title: "Total Projects",
      value: 12,
      description: "Across All Domain",
    },
    {
      title: "Total Projects",
      value: 12,
      description: "Across All Domain",
    },
  ];
  return (
    <div className="pl-2 py-8">
      <h2 className="font-mclaren font-normal text-[38px] leading-[100%] tracking-[0] mb-2 pt-10 text-[#2A2A4A]">Welcome back, Member User</h2>
      <p className="text-[#2A2A4AB0] mb-6 font-mclaren font-normal text-[18px] leading-[100%] tracking-[0] pt-2 ">
        View and work on your assigned projects
      </p>
      {/* Your dashboard stats and other content go here */}

      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="rounded-[15px] bg-[#eaf2ff] bg-opacity-70 border border-gray-300 p-6 font-bold shadow-lg"
          style={{ boxShadow: '0 4px 12px rgba(77, 77, 83, 0.25)' }}
          >
          <div className="text-[#2A2A4A] font-mclaren font-normal text-[20px] leading-[100%] tracking- mb-2 ">{stat.title}</div>
          <div className="text-[#2A2A4A] font-mclaren  text-[38px] leading-[100%] tracking- mb-2 font-bold">{stat.value}</div>
          <div className="text-[#2A2A4A] font-mclaren font-normal text-[15px] leading-[100%] tracking-">{stat.description}</div>
        </div>
        ))}
        

        

        

        

        
        
      </div>
      <div>
          <h2 className="text-2xl font-bold mb-2 pt-10">Your Domains </h2>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-lg border border-gray-600">
            <div className="bg-blue-700 rounded-t-lg p-4 flex items-center gap-2">
              <span className="text-2xl mr-2">{"</>"}</span>
              <span className="text-white text-lg font-bold">Web Development</span>

            </div>
            <div className="p-6 bg-[#4d4d53] rounded-b-lg">
              <div className="text-white mb-4 flex justify-center">Acess Projects and Resources in Web</div>
              <button className="bg-white text-gray-900 font-semibold py-2 px-4 rounded flex items-center gap-2 w-full justify-center">View Domain
                <span>→</span>
              </button>
            </div>

          </div>

          

          

        </div>

    </div>
  );
}
