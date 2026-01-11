"use client";

import { motion } from "framer-motion";

export function CategoriesHeroDoodle() {
    return (
        <div className="relative w-full h-full flex items-center justify-center md:justify-end md:pr-10 overflow-visible pointer-events-none select-none z-0">
            {/* 
                Responsive Container:
                Fixed size internal container for doodle content.
                Right aligned on desktop.
            */}
            <div className="relative w-[300px] h-[240px] md:scale-110 transform-gpu flex items-center justify-center">

                {/* Background Grid/Pattern */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                />

                {/* Folder 1 (Blue) - Back */}
                <motion.div
                    className="absolute left-[10%] bottom-[20%] z-10"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-24 h-20 bg-blue-400 border-[3px] border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                        {/* Folder Tab */}
                        <div className="absolute -top-3 left-0 w-10 h-4 bg-blue-400 border-[3px] border-black border-b-0 rounded-t-md" />
                        {/* Symbol */}
                        <div className="absolute inset-0 flex items-center justify-center text-white font-black text-2xl opacity-50">#</div>
                    </div>
                </motion.div>

                {/* Folder 2 (Pink) - Front Right */}
                <motion.div
                    className="absolute right-[15%] bottom-[15%] z-20"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <div className="w-28 h-24 bg-pink-400 border-[3px] border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                        {/* Folder Tab */}
                        <div className="absolute -top-3 left-0 w-12 h-4 bg-pink-400 border-[3px] border-black border-b-0 rounded-t-md" />
                        {/* Symbol */}
                        <div className="absolute inset-0 flex items-center justify-center text-white font-black text-3xl opacity-50">A</div>
                    </div>
                </motion.div>

                {/* Falling Shapes (Sorting into folders) */}

                {/* Square falling into Blue folder */}
                <motion.div
                    className="absolute left-[20%] -top-[10%] z-30"
                    animate={{
                        y: [0, 120, 120, 0],
                        opacity: [0, 1, 0, 0],
                        scale: [1, 1, 0.5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-8 h-8 bg-yellow-400 border-[3px] border-black rotate-12" />
                </motion.div>

                {/* Circle falling into Pink folder */}
                <motion.div
                    className="absolute right-[25%] -top-[20%] z-30"
                    animate={{
                        y: [0, 130, 130, 0],
                        opacity: [0, 1, 0, 0],
                        scale: [1, 1, 0.5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                    <div className="w-8 h-8 bg-green-400 border-[3px] border-black rounded-full" />
                </motion.div>

                {/* Floating "Tag" Icon */}
                <motion.div
                    className="absolute top-[20%] left-[45%] z-10"
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-12 h-12 bg-white border-[3px] border-black rounded-full flex items-center justify-center shadow-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                            <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
