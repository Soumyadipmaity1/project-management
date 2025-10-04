import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Menu, User } from "lucide-react";
import { ProjectLeadSidebar } from "@/components/Essentials/projectLeadSidebar";

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
                  <div className="h-9 w-9 bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-fuchsia-500/25 transition-all duration-200 cursor-pointer group">
                    <User className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main content - Full width with proper scrolling */}
          <main className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-gray-950 via-gray-900/50 to-gray-950">
            <div className="relative w-full min-h-screen">
              <div className="w-full text-white">
                <div className="w-full lg:p-5 p-3 ">
                  <div className="w-full bg-gray-900/20  rounded-2xl border border-gray-700/30 p-4 px-6 ">
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