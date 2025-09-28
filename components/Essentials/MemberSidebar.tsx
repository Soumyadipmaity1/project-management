"use client";

import { Code2, Paperclip, Bell, ClipboardList, User, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

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
];

const items = [
  {
    title: "Web Development",
    url: "/member/domains",
    icon: Code2,
  },
];

export function MemberSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isActiveLink = (url: string) => {
    if (url === "/member") {
      return pathname === url;
    }
    return pathname?.startsWith(url);
  };

  return (
    <Sidebar 
      collapsible="icon" 
      className="bg-slate-900 border-r border-slate-700/50 shadow-2xl"
    >
      <SidebarContent className="relative">
        {/* Header with Logo */}
        <SidebarHeader className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
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
                          ? 'bg-gradient-to-r from-indigo-600/20 to-indigo-700/20 border border-indigo-500/30 shadow-lg shadow-indigo-500/10' 
                          : !isCollapsed 
                            ? 'hover:bg-slate-800/50 hover:border hover:border-indigo-600/30 '
                            : ''
                      )}
                    >
                      <Link href={ele.url} className="flex items-center gap-3 px-3">
                        {/* Active indicator */}
                        {isActive && !isCollapsed && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-r-full"></div>
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
                                  ? 'text-[#492ff2]'
                                  : 'text-slate-400'
                                : isActive 
                                  ? 'text-indigo-400' 
                                  : 'text-slate-400 group-hover:text-indigo-300'
                            )}
                          />
                        </div>
                        
                        {!isCollapsed && (
                          <span
                            className={cn(
                              "font-mclaren text-[15px] font-medium transition-all duration-300",
                              isActive 
                                ? 'text-white font-semibold ' 
                                : 'text-slate-300 group-hover:text-white'
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
            <SidebarGroupLabel className="font-mclaren text-indigo-400 text-[12px] font-semibold mb-2 px-3 uppercase tracking-wider">
              Domains
            </SidebarGroupLabel>
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
                          ? 'bg-gradient-to-r from-indigo-600/20 to-indigo-700/20 border border-indigo-500/30 shadow-lg shadow-indigo-500/10' 
                          : !isCollapsed 
                            ? 'hover:bg-slate-800/50 hover:border hover:border-indigo-600/30 hover:shadow-md hover:shadow-indigo-500/5'
                            : ''
                      )}
                    >
                      <Link href={item.url} className="flex items-center gap-3 px-3">
                        {/* Active indicator */}
                        {isActive && !isCollapsed && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-r-full"></div>
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
                                  ? 'text-indigo-400'
                                  : 'text-slate-400'
                                : isActive 
                                  ? 'text-indigo-400' 
                                  : 'text-slate-400 group-hover:text-indigo-300'
                            )}
                          />
                        </div>
                        
                        {!isCollapsed && (
                          <span
                            className={cn(
                              "font-mclaren text-[15px] font-medium transition-all duration-300",
                              isActive 
                                ? 'text-white font-semibold' 
                                : 'text-slate-300 group-hover:text-white'
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

        {/* Footer */}
        {/* <SidebarFooter className="mt-auto p-3 border-t border-slate-700/50">
          {!isCollapsed ? (
            <div className="flex items-center gap-2 text-slate-500 text-xs px-3">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full animate-pulse"></div>
              <span className="font-mclaren">v2.0</span>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full animate-pulse"></div>
            </div>
          )}
        </SidebarFooter> */}
      </SidebarContent>
    </Sidebar>
  );
}
