"use client";

import { motion } from "framer-motion";

export function SettingsHeroDoodle() {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-visible pointer-events-none select-none z-0">
            {/* Main Central Gear */}
            <motion.div
                className="absolute right-[10%] md:right-[15%] top-1/2 -translate-y-1/2"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {/* 
                  FIX: Use scale for responsive sizing instead of changing width/height.
                  The teeth use fixed 'px' transform offsets (-85px), which works for w-40 (radius 80px),
                  but hides them inside w-56 (radius 112px).
                  Scaling the container preserves the relative geometry.
                */}
                <div className="relative w-40 h-40 md:scale-150 transform-gpu flex items-center justify-center">
                    {/* Gear Teeth */}
                    <div className="absolute inset-0 bg-[#A855F7] rounded-full border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" />

                    {/* Gear Teeth Cutouts (Visualized as boxes around the circle) */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-8 h-12 bg-[#A855F7] border-[4px] border-black -z-10"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-85px)`,
                                width: '40px',
                                height: '40px',
                                borderRadius: '4px'
                            }}
                        />
                    ))}

                    {/* Inner Circle */}
                    <div className="absolute inset-0 m-auto w-24 h-24 bg-white rounded-full border-[4px] border-black flex items-center justify-center">
                        <div className="w-8 h-8 bg-black rounded-full/20 bg-[#FACC15] border-[3px] border-black rounded-full" />
                    </div>

                    {/* Shine */}
                    <div className="absolute top-8 right-8 w-6 h-6 bg-white/30 rounded-full blur-[2px]" />
                </div>
            </motion.div>

            {/* Floating Wrench/Tool */}
            <motion.div
                className="absolute right-[5%] top-[20%]"
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-16 h-16 md:w-20 md:h-20 text-[#3B82F6] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] transform rotate-12">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="black" strokeWidth="1.5">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.7-3.7a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0l-3.7 3.7Z" />
                        <path d="M19.2 10.5 21 8.7a2.1 2.1 0 0 0 0-3l-2.3-2.3a2.1 2.1 0 0 0-3 0l-1.8 1.8" />
                        <path d="m16 9 1.7 1.7" />
                        <path d="M14.5 15.6a10.3 10.3 0 0 1-5.7-8.8 5.4 5.4 0 0 0-2.3.8A5.4 5.4 0 0 0 3 12.3a5.4 5.4 0 0 0 4.7-2.3 10.3 10.3 0 0 1 8.8 5.7c-5-3-2 0-2 0Z" fill="#FACC15" stroke="black" strokeWidth="2.5" />
                    </svg>
                </div>
            </motion.div>
        </div>
    );
}
