import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Menu, User, LogOut, UserCircle } from "lucide-react";
import { ProjectLeadSidebar } from "@/components/Essentials/projectLeadSidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function LeadLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-gray-950 text-white overflow-hidden">
        <ProjectLeadSidebar />

        <SidebarInset className="flex flex-col w-full min-w-0 bg-gray-950">
          {/* Professional Dark Header */}
          <header className="sticky top-0 z-40 w-full bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl flex-shrink-0">
            <div className="flex items-center gap-4 px-6 py-4 w-full">
              <SidebarTrigger className="h-9 w-9 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md group text-gray-300 hover:text-white flex-shrink-0">
                <Menu className="h-4 w-4 transition-colors duration-200" />
                <span className="sr-only">Toggle Sidebar</span>
              </SidebarTrigger>

              {/* Header content area - Full width */}
              <div className="flex-1 flex items-center justify-between min-w-0 w-full">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-6 w-px bg-gray-600 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-white tracking-tight truncate">
                     Project Lead Dashboard
                    </h2>
                    <p className="text-xs text-gray-400 truncate">
                      Manage your domain and team
                    </p>
                  </div>
                </div>

                {/* User info and actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="h-9 w-9 bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-fuchsia-500/25 transition-all duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                        <User className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="w-48 bg-gray-800 border-gray-700 text-white"
                    >
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700" asChild>
                        <Link href="/projectlead/profile" className="flex items-center">
                          <UserCircle className="mr-2 h-4 w-4" />
                          <span>View Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700 text-red-400 focus:text-red-400">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>

          {/* Main content - Full width with proper scrolling */}
          <main className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-gray-950 via-gray-900/50 to-gray-950">
            <div className="relative w-full min-h-screen">
              <div className="w-full text-white">
                <div className="w-full lg:p-5 p-3 ">
                  <div className="w-full bg-gray-900/20  rounded-2xl border border-gray-700/30 lg:p-4 p-3 lg:px-6 ">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}