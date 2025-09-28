"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className={cn("flex items-center gap-3 mx-auto px-1 py-4 w-full", className)}>
      {/* Logo Icon - Always visible */}
      <div className="relative flex-shrink-0">
            <Image
              src="/image.png"
              alt="WorkPilot Logo"
              width={100}
              height={100}
              className="w-10 h-auto mt-0.5"
            />
            </div>

      {/* Logo Text - Hidden when collapsed */}
      <div
        className={cn(
          "transition-all duration-300 overflow-hidden min-w-0",
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100 flex-1"
        )}
      >
        <h1 className="text-xl font-bold bg-gradient-to-r from-white via-indigo-100 to-indigo-200 bg-clip-text text-transparent tracking-tight truncate">
          WorkPilot
        </h1>
      </div>
    </div>
  );
}
