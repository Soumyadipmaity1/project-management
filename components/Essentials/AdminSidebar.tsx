import { Code2, Paperclip, Bell, ClipboardList , User , File } from "lucide-react";
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
    url: "/admin/projects",
    icon: Paperclip,
  },
  {
    title: "Announcements",
    url: "/admin/announcements",
    icon: Bell,
  },
  {
    title: "All Leads",
    url: "/admin/leads",
    icon: User,
  },
  {
    title: "All Members",
    url: "/admin/members",
    icon: User,
  },
  {
    title: "Pending Requests",
    url: "/admin/requests",
    icon: File,
  },
];

// const items = [
//   {
//     title: "Web development",
//     url: "#",
//     icon: Code2,
//   },
// ];

export function AdminSidebar() {
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
          {/* <SidebarGroupLabel className="font-madimi
                          
                          text-bold
                          text-[16px]
                          
                          
                          text-[#2A2A4A] 
                          font-large
                          
                          ">Domains</SidebarGroupLabel> */}
          <SidebarGroupContent>
            {/* <SidebarMenu>
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
            </SidebarMenu> */}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
