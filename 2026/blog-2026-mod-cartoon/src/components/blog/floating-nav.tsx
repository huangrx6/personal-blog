"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { BookOpen, Home, List, Menu, User, Users, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
    { name: "首页", href: "/", icon: Home },
    { name: "博客", href: "/blog", icon: BookOpen },
    { name: "关于", href: "/about", icon: User },
    { name: "友链", href: "/friends", icon: Users },
];

interface FloatingNavProps {
    showToc: boolean;
    setShowToc: (show: boolean) => void;
}

export function FloatingNav({ showToc, setShowToc }: FloatingNavProps) {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
            setIsOpen(false);
        }
    });

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-12 right-12 z-50 flex items-end gap-4 pointer-events-none">
                    {/* Toggle TOC Button */}
                    <div className="pointer-events-auto relative group">
                        <motion.button
                            initial={{ scale: 0, x: 20 }}
                            animate={{ scale: 1, x: 0 }}
                            exit={{ scale: 0, x: 20 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowToc(!showToc)}
                            className="hidden lg:flex w-12 h-12 bg-white text-black border-2 border-black rounded-full shadow-neo items-center justify-center hover:bg-gray-50 bg-white"
                        >
                            <List size={20} strokeWidth={2.5} className={!showToc ? "opacity-50" : ""} />
                        </motion.button>
                        {/* Tooltip */}
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {showToc ? "收起目录" : "展开目录"}
                        </span>
                    </div>

                    <div className="flex flex-col items-end gap-4 pointer-events-auto relative">
                        {/* Menu Content (When Open) */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    className="bg-white border-4 border-black rounded-2xl shadow-neo p-4 flex flex-col gap-2 min-w-[160px] mb-2 absolute bottom-20 right-0 origin-bottom-right"
                                >
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black hover:text-white transition-all font-bold group"
                                        >
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.name}</span>
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Floating Toggle Button */}
                        <div className="group relative">
                            <motion.button
                                initial={{ scale: 0, rotate: 180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsOpen(!isOpen)}
                                className="w-16 h-16 bg-[#A855F7] text-white border-4 border-black rounded-full shadow-neo flex items-center justify-center relative overflow-hidden z-20"
                            >
                                <motion.div
                                    animate={{ rotate: isOpen ? 90 : 0 }}
                                    className="relative z-10"
                                >
                                    {isOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
                                </motion.div>
                            </motion.button>
                            {/* Tooltip */}
                            <span className="absolute bottom-full mb-2 end-0 px-2 py-1 bg-black text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                快捷导航
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
