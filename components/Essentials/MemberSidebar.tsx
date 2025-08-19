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
  {
    title: "Members",
    url: "/member/members",
    icon: User,
  },
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
    <Sidebar className="pt-10 [&>div]:bg-[#DCE7F8] shadow-xl">
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
                          text-[#2A2A4A]
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
  );
}
