"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AdminHeader() {
    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-black/10"
        >
            {/* Inner container with same max-width as content */}
            <div className="px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 py-4 max-w-[560px] sm:max-w-[640px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1200px] 2xl:max-w-[1400px] mx-auto w-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl border-2 border-black shadow-neo-sm flex items-center justify-center text-white font-black text-lg">
                        B
                    </div>
                    <span className="font-black text-lg tracking-tight hidden sm:block">Blog 2026</span>
                </Link>

                {/* Search Bar */}
                <div className="flex-1 max-w-md mx-4 hidden md:block">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                        <Input
                            type="search"
                            placeholder="搜索文章、设置..."
                            className="w-full h-11 pl-11 pr-4 bg-white/80 border-2 border-black/20 rounded-full shadow-sm focus-visible:border-black focus-visible:shadow-neo-sm transition-all"
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-white border-2 border-black/20 flex items-center justify-center text-black/60 hover:border-black hover:shadow-neo-sm transition-all">
                        <Bell className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-secondary border-2 border-black shadow-neo-sm flex items-center justify-center text-white font-bold hover:scale-105 transition-transform">
                        <User className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.header>
    );
}
