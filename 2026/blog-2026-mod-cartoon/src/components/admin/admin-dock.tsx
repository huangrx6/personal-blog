"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, FileText, Image, Settings, LogOut, CheckCircle2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils/cn";

const navItems = [
    { name: "仪表盘", href: "/admin", icon: LayoutDashboard },
    { name: "文章", href: "/admin/posts", icon: FileText },
    { name: "分类", href: "/admin/categories", icon: CheckCircle2 },
    { name: "媒体", href: "/admin/media", icon: Image },
    { name: "设置", href: "/admin/settings", icon: Settings },
];

export function AdminDock() {
    const pathname = usePathname();

    return (
        <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-lg border-4 border-black rounded-full px-4 py-3 shadow-neo-lg">
                {navItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== "/admin" && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            prefetch={false}
                            className={cn(
                                "group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200",
                                isActive
                                    ? "bg-primary text-white scale-110 shadow-neo border-2 border-black"
                                    : "hover:bg-secondary/20 text-black/70 hover:text-black"
                            )}
                        >
                            <Icon className="w-5 h-5" />

                            {/* Tooltip */}
                            <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {item.name}
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></span>
                            </span>
                        </Link>
                    );
                })}

                {/* Divider */}
                <div className="w-px h-8 bg-black/20 mx-1"></div>

                {/* Logout Button */}
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="group relative flex items-center justify-center w-12 h-12 rounded-full text-black/50 hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" />

                    <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        退出登录
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rotate-45"></span>
                    </span>
                </button>
            </div>
        </motion.nav>
    );
}
