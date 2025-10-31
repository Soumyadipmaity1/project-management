"use client";

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/Essentials/AdminSidebar";
import { Menu, User, LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-neutral-950 text-white overflow-hidden font-inter">
        <AdminSidebar />

        <SidebarInset className="flex flex-col w-full min-w-0 bg-neutral-950">
          <header className="sticky top-0 z-40 w-full bg-neutral-950/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl flex-shrink-0">
            <div className="flex items-center gap-4 px-6 py-4 w-full">
              <SidebarTrigger className="h-9 w-9 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md group text-slate-300 hover:text-white flex-shrink-0">
                <Menu className="h-4 w-4 transition-colors duration-200" />
                <span className="sr-only">Toggle Sidebar</span>
              </SidebarTrigger>

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

                {/* User Actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="h-9 w-9 bg-gradient-to-r from-gray-300 to-white rounded-full flex items-center justify-center shadow-lg hover:shadow-white/30 transition-all duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-neutral-950">
                        <User className="w-4 h-4 text-black group-hover:scale-110 transition-transform duration-200" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className="w-56 bg-neutral-900 border border-slate-700 text-white shadow-xl"
                      align="end"
                    >
                      <DropdownMenuLabel className="text-slate-300">
                        My Account
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      <DropdownMenuItem asChild className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800 focus:text-white">
                        <Link href="/admin/profile" className="flex items-center">
                          <UserCircle className="mr-2 h-4 w-4" />
                          <span>View Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-slate-800 focus:bg-slate-800 text-red-400 focus:text-red-400"
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-neutral-950 via-neutral-900/50 to-neutral-950">
            <div className="relative w-full min-h-screen">
              <div className="w-full text-white">
                <div className="w-full lg:p-5 p-3">
                  <div className="w-full bg-neutral-950/60 rounded-2xl border border-slate-700/30 lg:p-4 p-2 lg:px-6 shadow-lg">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
