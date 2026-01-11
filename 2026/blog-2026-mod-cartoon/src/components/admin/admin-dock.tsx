"use client";

import { cn } from "@/lib/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, CheckCircle2, FileText, Image, LayoutDashboard, LogOut, Menu, Settings, Users, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useAdminActions } from "./admin-action-context";

const navItems = [
    { name: "仪表盘", href: "/admin", icon: LayoutDashboard },
    { name: "文章", href: "/admin/posts", icon: FileText },
    { name: "分类", href: "/admin/categories", icon: CheckCircle2 },
    { name: "媒体", href: "/admin/media", icon: Image },
    { name: "友链", href: "/admin/friends", icon: Users },
    { name: "设置", href: "/admin/settings", icon: Settings },
];

export function AdminDock() {
    const pathname = usePathname();
    const { actions } = useAdminActions();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Helper to check active state
    const isActive = (href: string) => pathname === href || (href !== "/admin" && pathname.startsWith(href));

    return (
        <>
            {/* Desktop Dock (Hidden on mobile) */}
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
            >
                <div className="flex items-center gap-2 bg-white/95 backdrop-blur-lg border-4 border-black rounded-full px-4 py-3 shadow-neo-lg">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                prefetch={false}
                                className={cn(
                                    "group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200",
                                    active
                                        ? "bg-primary text-white scale-110 shadow-neo border-2 border-black"
                                        : "hover:bg-secondary/20 text-black/70 hover:text-black"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    {item.name}
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></span>
                                </span>
                            </Link>
                        );
                    })}

                    <div className="w-px h-8 bg-black/20 mx-1"></div>

                    <button
                        onClick={() => toast.info("暂无新通知")}
                        className="group relative flex items-center justify-center w-12 h-12 rounded-full text-black/70 hover:bg-yellow-100 hover:text-yellow-600 transition-all duration-200"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            通知
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></span>
                        </span>
                    </button>

                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="group relative flex items-center justify-center w-12 h-12 rounded-full text-black/50 hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            退出
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rotate-45"></span>
                        </span>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu (FAB) */}
            <div className="md:hidden fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="flex flex-col gap-3 items-end mb-2"
                        >
                            {/* Page Actions (e.g. Settings Save) */}
                            {actions && (
                                <div className="bg-white border-4 border-black rounded-2xl p-3 shadow-neo flex flex-col gap-2 min-w-[120px]">
                                    {actions}
                                </div>
                            )}

                            {/* Navigation Grid */}
                            <div className="bg-white border-4 border-black rounded-2xl p-4 shadow-neo grid grid-cols-4 gap-3">
                                {navItems.map((item) => {
                                    const active = isActive(item.href);
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-xl transition-all",
                                                active
                                                    ? "bg-black text-white shadow-neo-sm"
                                                    : "bg-gray-50 text-black/60 hover:bg-gray-100"
                                            )}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </Link>
                                    );
                                })}
                                {/* Extra Items */}
                                <button
                                    onClick={() => {
                                        toast.info("暂无新通知");
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-all"
                                >
                                    <Bell className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/login" })}
                                    className="flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-14 h-14 bg-black text-white rounded-2xl border-2 border-white shadow-neo-lg flex items-center justify-center active:scale-90 transition-transform relative z-[101]"
                >
                    {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    {/* Indicator dot if actions actions are available and menu is closed? */}
                    {!isMobileMenuOpen && actions && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-[#FACC15] border-2 border-black rounded-full" />
                    )}
                </button>
            </div>
        </>
    );
}
