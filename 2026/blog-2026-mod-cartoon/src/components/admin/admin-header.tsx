"use client";

import { SiteSettings } from "@prisma/client";
import { motion } from "framer-motion";
import { Bell, User } from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
    settings?: SiteSettings | null;
}

export function AdminHeader({ settings }: AdminHeaderProps) {
    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-40 px-4 py-2"
        >
            {/* Wrapper for setting-content-width alignment */}
            <div className="mx-auto px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 max-w-[560px] sm:max-w-[640px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1200px] 2xl:max-w-[1400px] w-full">

                {/* Glass Nav - Full width of wrapper, with internal padding */}
                <div className="glass-nav rounded-2xl w-full flex items-center justify-between shadow-neo border-2 border-black px-4 py-3">

                    {/* Logo */}
                    <Link href="/admin" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-black bg-white group-hover:scale-105 transition-transform">
                            <div className="w-full h-full bg-primary flex items-center justify-center font-bold text-white">B</div>
                        </div>
                        <span className="font-black text-lg tracking-tight hidden sm:block uppercase">
                            {settings?.siteName || "Blog Admin"}
                        </span>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <button className="w-10 h-10 rounded-full bg-white hover:bg-black/5 flex items-center justify-center text-black/60 transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <button className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-black text-white font-bold hover:scale-105 transition-transform">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                <User className="w-3 h-3" />
                            </div>
                            <span className="text-sm">Admin</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
