"use client";

import { motion } from "framer-motion";

export function FriendsHeroDoodle() {
    return (
        <div className="relative w-full h-full flex items-center justify-center md:justify-end md:pr-10 overflow-visible pointer-events-none select-none z-0">

            {/* 
                Responsive Container:
                Fixed size internal container for the doodle content.
                Aligned to the right on desktop.
            */}
            <div className="relative w-[360px] h-64 md:scale-110 transform-gpu flex items-center justify-center">

                {/* Anime Speed Lines (Background) */}
                <svg className="absolute inset-0 w-full h-full z-0 opacity-10" viewBox="0 0 360 256">
                    <motion.path
                        d="M0 128 L360 128 M40 40 L320 216 M40 216 L320 40"
                        stroke="black"
                        strokeWidth="2"
                        strokeDasharray="20 20"
                        animate={{ strokeDashoffset: [0, -40] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                </svg>

                {/* Connection Line with Heart */}
                <svg className="absolute inset-0 w-full h-full z-0 overflow-visible" viewBox="0 0 360 256">
                    <motion.path
                        d="M85 140 Q 180 190 275 140"
                        fill="none"
                        stroke="black"
                        strokeWidth="4"
                        strokeDasharray="10 10"
                        animate={{
                            d: [
                                "M85 140 Q 180 90 275 140",
                                "M85 140 Q 180 190 275 140",
                                "M85 140 Q 180 90 275 140"
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                </svg>

                {/* Left Character: "Cool Guy" (Chibi Style) */}
                <motion.div
                    className="absolute left-[5%] top-1/2 -translate-y-1/2 z-10"
                    animate={{ y: ["-50%", "-55%", "-50%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="relative flex flex-col items-center">
                        {/* Spiky Hair (Triangles) */}
                        <div className="absolute -top-6 w-full flex justify-center gap-1 z-0">
                            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-[#FACC15] -rotate-12 translate-y-2" />
                            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-[#FACC15] -translate-y-1" />
                            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-[#FACC15] rotate-12 translate-y-2" />
                        </div>

                        {/* Head */}
                        <div className="w-20 h-18 bg-[#FACC15] rounded-[24px] border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 flex flex-col items-center justify-center overflow-hidden relative">
                            {/* Sunglasses */}
                            <div className="flex gap-1 mt-2">
                                <div className="w-6 h-3 bg-black rounded-b-full" />
                                <div className="w-1 h-1 bg-black mt-1" />
                                <div className="w-6 h-3 bg-black rounded-b-full" />
                            </div>
                            {/* Cool Smirk */}
                            <div className="w-4 h-2 border-b-2 border-black rounded-full mt-1 ml-4" />
                        </div>

                        {/* Body */}
                        <div className="w-10 h-10 bg-black rounded-xl -mt-2 z-0" />

                        {/* Arms (Crossed) */}
                        <div className="absolute top-[65px] w-16 h-4 bg-black rounded-full z-20" />
                    </div>
                </motion.div>

                {/* Right Character: "Cute Girl" (Chibi Style) */}
                <motion.div
                    className="absolute right-[5%] top-1/2 -translate-y-1/2 z-10"
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="relative flex flex-col items-center">
                        {/* Cat Ears */}
                        <div className="absolute -top-4 w-full flex justify-between px-2 z-0">
                            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-[#A855F7] -rotate-12" />
                            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-[#A855F7] rotate-12" />
                        </div>

                        {/* Head */}
                        <div className="w-20 h-18 bg-[#A855F7] rounded-[24px] border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 flex flex-col items-center justify-center relative overflow-hidden">
                            {/* Big Anime Eyes */}
                            <div className="flex gap-3 mt-1">
                                <div className="w-5 h-5 bg-white rounded-full border-2 border-black flex items-center justify-center">
                                    <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full mb-1 mr-1" />
                                    </div>
                                </div>
                                <div className="w-5 h-5 bg-white rounded-full border-2 border-black flex items-center justify-center">
                                    <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full mb-1 mr-1" />
                                    </div>
                                </div>
                            </div>
                            {/* Blush */}
                            <div className="absolute top-8 left-2 w-3 h-1.5 bg-pink-300 rounded-full opacity-60" />
                            <div className="absolute top-8 right-2 w-3 h-1.5 bg-pink-300 rounded-full opacity-60" />
                            {/* Mouth (Cat style :3) */}
                            <div className="text-black font-bold text-xs mt-0">w</div>
                        </div>

                        {/* Body */}
                        <div className="w-10 h-10 bg-white border-[3px] border-black rounded-xl -mt-2 z-0 flex justify-center">
                            {/* Bowtie? */}
                            <div className="w-2 h-2 bg-black rounded-full mt-1" />
                        </div>

                        {/* Waving Arm */}
                        <motion.div
                            className="absolute -right-4 top-[50px] w-8 h-3 bg-black rounded-full origin-left"
                            animate={{ rotate: [0, -20, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
                        />
                        {/* Other Arm */}
                        <div className="absolute -left-2 top-[55px] w-3 h-6 bg-black rounded-full rotate-12" />
                    </div>
                </motion.div>

                {/* Center Heart Icon */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-full border-[3px] border-black text-red-500 p-1 shadow-sm"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                </motion.div>
            </div>

        </div>
    );
}
