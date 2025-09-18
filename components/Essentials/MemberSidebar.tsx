import { Code2, Paperclip, Bell, ClipboardList , User, LayoutDashboard  } from "lucide-react";
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
    title: "Dashboard",
    url: "/member",
    icon: LayoutDashboard,
  },
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
    <Sidebar className="[&>div]:bg-[#031635] shadow-xl">
      <SidebarContent>
        <header className="absolute top-6 left-6 text-white text-3xl font-bold tracking-tight">
        WorkPilot
      </header>
        <SidebarGroup className="pt-12">
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {elements.map((ele) => (
                <SidebarMenuItem key={ele.title}>
                  <SidebarMenuButton asChild>
                    <a href={ele.url}>
                      <ele.icon className="text-white"/>
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
                          
                          
                          text-white
                          font-large
                          
                          ">Domains</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="text-white"/>
                      <span
                        className="
                          font-madimi
                          font-normal
                          text-bold
                          text-[16px]
                          
                          
                          text-white
                          
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
