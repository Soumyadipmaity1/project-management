import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/Essentials/AdminSidebar";
import { Menu, User } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-neutral-950 text-white overflow-hidden">
        <AdminSidebar />

        <SidebarInset className="flex flex-col w-full min-w-0 bg-neutral-950">
          {/* Professional Dark Header */}
          <header className="sticky top-0 z-40 w-full bg-neutral-950 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl flex-shrink-0">
            <div className="flex items-center gap-4 px-6 py-4 w-full">
              <SidebarTrigger className="h-9 w-9 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md group text-slate-300 hover:text-white flex-shrink-0">
                <Menu className="h-4 w-4 transition-colors duration-200" />
                <span className="sr-only">Toggle Sidebar</span>
              </SidebarTrigger>

              {/* Header content area - Full width */}
              <div className="flex-1 flex items-center justify-between min-w-0 w-full">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-6 w-px bg-slate-600 flex-shrink-0"></div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-white tracking-tight truncate">
                      Admin Dashboard
                    </h2>
                    <p className="text-xs text-slate-400 truncate">
                      Manage the entire organization
                    </p>
                  </div>
                </div>

                {/* User info and actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="h-9 w-9 bg-gradient-to-r from-white to-gray-300 rounded-full flex items-center justify-center shadow-lg hover:shadow-white/25 transition-all duration-200 cursor-pointer group">
                    <User className="w-4 h-4 text-black group-hover:scale-110 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main content - Full width with proper scrolling */}
          <main className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden bg-neutral-950">
            {/* Stylish background overlay */}
            <div className="absolute inset-0 bg-neutral-950 pointer-events-none"></div>

            {/* Scrollable content container */}
            <div className="relative w-full min-h-screen">
              <div className="w-full text-white">
                <div className="w-full lg:p-5 p-2">
                  <div className="w-full bg-neutral-950/50 rounded-2xl border border-slate-700/30 lg:p-4 lg:px-6 p-2">
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