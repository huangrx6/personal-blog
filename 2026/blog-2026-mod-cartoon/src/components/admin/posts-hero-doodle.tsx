"use client";

import { motion } from "framer-motion";

export function PostsHeroDoodle() {
    return (
        <div className="relative w-full h-full flex items-center justify-center md:justify-end md:pr-10 overflow-visible pointer-events-none select-none z-0">

            {/* 
                Responsive Container:
                Right aligned on desktop.
            */}
            <div className="relative w-[340px] h-[260px] md:scale-110 transform-gpu flex items-center justify-center">

                {/* Background Lines (Notebook style) */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(transparent_23px,#000_24px)] bg-[size:100%_24px]" />

                {/* Main Paper Sheet */}
                <motion.div
                    className="absolute left-[15%] top-[20%] w-48 h-56 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 p-4 flex flex-col gap-3"
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Text Lines */}
                    <div className="w-full h-3 bg-gray-200 rounded-full" />
                    <div className="w-3/4 h-3 bg-gray-200 rounded-full" />
                    <div className="w-full h-3 bg-gray-200 rounded-full" />
                    <div className="w-1/2 h-3 bg-gray-200 rounded-full" />

                    {/* Image Placeholder */}
                    <div className="w-full h-20 bg-yellow-100 border-2 border-dashed border-yellow-400 rounded-lg mt-2 flex items-center justify-center">
                        <div className="w-6 h-6 bg-yellow-300 rounded-full opacity-50" />
                    </div>
                </motion.div>

                {/* Floating Pencil */}
                <motion.div
                    className="absolute right-[15%] top-[30%] z-20"
                    animate={{
                        x: [0, -10, 0, -5, 0],
                        y: [0, 5, 0, 10, 0],
                        rotate: [0, -5, 0, -10, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-8 h-32 bg-yellow-400 border-[3px] border-black relative rounded-sm shadow-sm rotate-12">
                        {/* Eraser */}
                        <div className="absolute top-0 w-full h-6 bg-pink-400 border-b-[3px] border-black rounded-t-sm" />
                        {/* Metal Band */}
                        <div className="absolute top-6 w-full h-3 bg-gray-300 border-b-[3px] border-black" />
                        {/* Tip */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[20px] border-t-yellow-100" />
                        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-black" />
                    </div>
                </motion.div>

                {/* Flying Paper Plane */}
                <motion.div
                    className="absolute bottom-[20%] right-[5%] z-30"
                    animate={{
                        x: [0, 100, 200],
                        y: [0, -50, -20],
                        opacity: [1, 1, 0],
                        scale: [1, 0.8, 0.5]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut", repeatDelay: 1 }}
                >
                    <div className="relative w-12 h-8">
                        <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full fill-white">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
