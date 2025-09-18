import { Code2, Paperclip, Bell, ClipboardList , User  } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarFooter,
  SidebarMenu,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

const elements = [
  {
    title: "Projects",
    url: "/member/projects",
    icon: Paperclip,
  },
  {
    title: "My Projects",
    url: "/member/myprojects",
    icon: ClipboardList,
  },
  {
    title: "Announcements",
    url: "/member/announcements",
    icon: Bell,
  },
  // {
  //   title: "Members",
  //   url: "/member/members",
  //   icon: User,
  // },
];

const items = [
  {
    title: "Web development",
    url: "#",
    icon: Code2,
  },
];

export function MemberSidebar() {
  return (
    <>
    <div className="bg-[#DCE7F8] text-[#3D3436] py-1.5 flex items-center justify-between border-b border-gray-400 w-full h-16 flex-shrink-0 fixed top-0 right-0 z-50 shadow-lg">
    <h1 className="font-madimi
          font-normal
          text-[32px]
          leading-[100%]
          tracking-[0%]
          ml-6">WorkPilot</h1>
    <div className="flex items-center gap-4 mr-6">
      

      
      <div className="w-10 h-9 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold">
        AU
      </div>
    </div>
  </div>
    <Sidebar className="pt-10 [&>div]:bg-[#031635] shadow-xl">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {elements.map((ele) => (
                <SidebarMenuItem key={ele.title}>
                  <SidebarMenuButton asChild>
                    <a href={ele.url}>
                      <ele.icon />
                      <span
                        className="
                          font-madimi
                          text-white
                          text-[16px]
                         
                        "
                      >
                        {ele.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="font-madimi
                          
                          text-bold
                          text-[16px]
                          
                          
                          text-[#2A2A4A] 
                          font-large
                          
                          ">Domains</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span
                        className="
                          font-madimi
                          font-normal
                          text-bold
                          text-[16px]
                          
                          
                          text-[#2A2A4A]
                          
                        "
                      >
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </>
  );
}
