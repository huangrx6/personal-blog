"use client";

import { AdminSidebar } from "./admin-sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
    // We need to know collapsed state to adjust margin. 
    // Ideally we lift state up from Sidebar, but Sidebar manages its own state in the previous file.
    // Let's refactor Sidebar to accept props or just duplicate the shell logic here.
    // For simplicity, let's keep Sidebar separate and just use `pl-64` and hope user doesn't toggle much or we accept overlap?
    // No, user specifically requested shrinking.

    // Better Approach: The Sidebar IS part of this Shell state.

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen w-full bg-white">
            <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <main
                className={cn(
                    "flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-6 transition-all duration-300",
                    isCollapsed ? "ml-20" : "ml-64"
                )}
            >
                {children}
            </main>
        </div>
    );
}
