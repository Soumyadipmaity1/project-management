"use client";

import { Code2, Paperclip, Bell, ClipboardList, User, File, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenu,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const elements = [
  {
    title: "Dashboard",
    url: "/project-lead",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    url: "/project-lead/projects",
    icon: Paperclip,
  },
  {
    title: "My Projects",
    url: "/project-lead/myprojects",
    icon: ClipboardList,
  },
  {
    title: "Announcements",
    url: "/project-lead/announcements",
    icon: Bell,
  },
  {
    title: "Members",
    url: "/project-lead/members",
    icon: User,
  },
  {
    title: "Pending Requests",
    url: "/project-lead/requests",
    icon: File,
  },
];

const items = [
  {
    title: "Web Development",
    url: "/project-lead/domains",
    icon: Code2,
  },
];

export function ProjectLeadSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isActiveLink = (url: string) => {
    if (url === "/project-lead") {
      return pathname === url;
    }
    return pathname?.startsWith(url);
  };

  return (
    <Sidebar 
      collapsible="icon" 
      className=" border-r border-gray-700/50 shadow-2xl"
    >
      <SidebarContent className="relative bg-gray-900">
        {/* Header with Logo */}
        <SidebarHeader className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
          <Logo />
        </SidebarHeader>
        
        <SidebarGroup className="px-2 py-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {elements.map((ele) => {
                const isActive = isActiveLink(ele.url);
                return (
                  <SidebarMenuItem key={ele.title}>
                    <SidebarMenuButton 
                      asChild
                      isActive={isActive && !isCollapsed}
                      tooltip={isCollapsed ? ele.title : undefined}
                      className={cn(
                        "relative h-10 rounded-r-3xl",
                        isCollapsed 
                          ? '!bg-transparent !border-0 !shadow-none hover:!bg-transparent hover:!border-0 hover:!shadow-none data-[active=true]:!bg-transparent data-[active=true]:!border-0' 
                          : 'group',
                        !isCollapsed && isActive 
                          ? 'bg-gradient-to-r from-fuchsia-600/20 to-fuchsia-700/20 border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/10' 
                          : !isCollapsed 
                            ? 'hover:bg-gray-800/50 hover:border hover:border-fuchsia-600/30 '
                            : ''
                      )}
                    >
                      <Link href={ele.url} className="flex items-center gap-3 px-3">
                        {/* Active indicator */}
                        {isActive && !isCollapsed && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-fuchsia-400 to-fuchsia-600 rounded-r-full"></div>
                        )}
                        
                        <div className={cn(
                          "flex items-center justify-center",
                          isCollapsed ? "w-6 h-6" : "w-5 h-5"
                        )}>
                          <ele.icon 
                            className={cn(
                              isCollapsed ? "w-6 h-6" : "w-5 h-5 transition-all duration-300",
                              isCollapsed
                                ? isActive 
                                  ? 'text-[#ca08d0]'
                                  : 'text-gray-400'
                                : isActive 
                                  ? 'text-fuchsia-400' 
                                  : 'text-gray-400 group-hover:text-fuchsia-300'
                            )}
                          />
                        </div>
                        
                        {!isCollapsed && (
                          <span
                            className={cn(
                              "font-madimi text-[15px] font-medium transition-all duration-300",
                              isActive 
                                ? 'text-white font-semibold ' 
                                : 'text-gray-300 group-hover:text-white'
                            )}
                          >
                            {ele.title}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Domains Section */}
        <SidebarGroup className="px-2">
          {!isCollapsed && (
            <SidebarGroupLabel className="font-madimi
                          
                          text-bold
                          text-[16px]
                          
                          
                          text-[#2A2A4A] 
                          font-large
                          
                          ">Domains</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = isActiveLink(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      isActive={isActive && !isCollapsed}
                      tooltip={isCollapsed ? item.title : undefined}
                      className={cn(
                        "relative h-11 rounded-xl",
                        isCollapsed 
                          ? '!bg-transparent !border-0 !shadow-none hover:!bg-transparent hover:!border-0 hover:!shadow-none data-[active=true]:!bg-transparent data-[active=true]:!border-0' 
                          : 'group transition-all duration-300 ease-out',
                        !isCollapsed && isActive 
                          ? 'bg-gradient-to-r from-fuchsia-600/20 to-fuchsia-700/20 border border-fuchsia-500/30 shadow-lg shadow-fuchsia-500/10' 
                          : !isCollapsed 
                            ? 'hover:bg-gray-800/50 hover:border hover:border-fuchsia-600/30 hover:shadow-md hover:shadow-fuchsia-500/5'
                            : ''
                      )}
                    >
                      <Link href={item.url} className="flex items-center gap-3 px-3">
                        {/* Active indicator */}
                        {isActive && !isCollapsed && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-fuchsia-400 to-fuchsia-600 rounded-r-full"></div>
                        )}
                        
                        <div className={cn(
                          "flex items-center justify-center",
                          isCollapsed ? "w-6 h-6" : "w-5 h-5"
                        )}>
                          <item.icon 
                            className={cn(
                              isCollapsed ? "w-6 h-6" : "w-5 h-5 transition-all duration-300",
                              isCollapsed
                                ? isActive 
                                  ? 'text-fuchsia-400'
                                  : 'text-gray-400'
                                : isActive 
                                  ? 'text-fuchsia-400' 
                                  : 'text-gray-400 group-hover:text-fuchsia-300'
                            )}
                          />
                        </div>
                        
                        {!isCollapsed && (
                          <span
                            className={cn(
                              "font-mclaren text-[15px] font-medium transition-all duration-300",
                              isActive 
                                ? 'text-white font-semibold' 
                                : 'text-gray-300 group-hover:text-white'
                            )}
                          >
                            {item.title}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
