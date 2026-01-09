"use client";

import { cn } from "@/lib/utils/cn";
import { FileText, LayoutDashboard, LogOut, ChevronLeft, ChevronRight, Settings, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

export function AdminSidebar({ isCollapsed, setIsCollapsed }: AdminSidebarProps) {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "All Posts", href: "/admin/posts", icon: FileText },
        { name: "Media", href: "/admin/media", icon: ImageIcon }, // Placeholder path
        { name: "Settings", href: "/admin/settings", icon: Settings }, // Placeholder path
    ];

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen border-r-2 border-black bg-white transition-all duration-300 flex flex-col",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            {/* Header / Logo */}
            <div className="flex h-16 items-center border-b-2 border-black px-4 justify-between">
                {!isCollapsed && (
                    <Link className="flex items-center gap-2 font-black text-xl truncate" href="/admin">
                        <div className="w-8 h-8 rounded-md bg-secondary border-2 border-black flex items-center justify-center text-secondary-foreground text-sm shrink-0">
                            A
                        </div>
                        <span>Admin</span>
                    </Link>
                )}
                {isCollapsed && (
                    <div className="w-8 h-8 rounded-md bg-secondary border-2 border-black flex items-center justify-center text-secondary-foreground text-sm shrink-0 mx-auto">
                        A
                    </div>
                )}

                {!isCollapsed && (
                    <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(true)} className="h-8 w-8 ml-auto">
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                )}
            </div>

            {/* Collapse Toggle (Centered when collapsed) */}
            {isCollapsed && (
                <div className="flex justify-center py-2 border-b-2 border-black">
                    <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(false)} className="h-8 w-8">
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            )}

            {/* Nav Items */}
            <div className="flex-1 overflow-auto py-4 px-3 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg border-2 px-3 py-2 transition-all group",
                                isActive
                                    ? "bg-primary border-black text-white shadow-neo-sm"
                                    : "border-transparent text-muted-foreground hover:bg-muted hover:text-black hover:border-black",
                                isCollapsed ? "justify-center px-2" : ""
                            )}
                            title={isCollapsed ? item.name : undefined}
                        >
                            <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "text-black/60 group-hover:text-black")} />
                            {!isCollapsed && <span className="font-bold">{item.name}</span>}
                        </Link>
                    )
                })}
            </div>

            {/* Footer / Sign Out */}
            <div className="mt-auto border-t-2 border-black p-4">
                <Button
                    variant="outline"
                    className={cn(
                        "w-full bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none transition-all",
                        isCollapsed ? "px-0 justify-center" : "justify-start gap-2"
                    )}
                // Note: Actual sign out logic needs to be passed or handled via form action context if client component
                // For now, visual only
                >
                    <LogOut className="h-4 w-4" />
                    {!isCollapsed && "Sign Out"}
                </Button>
            </div>
        </aside>
    );
}
