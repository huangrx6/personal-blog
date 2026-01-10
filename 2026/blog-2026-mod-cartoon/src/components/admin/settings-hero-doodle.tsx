"use client";

import { motion } from "framer-motion";

export function SettingsHeroDoodle() {
    return (
        <div className="relative w-full h-[200px] md:h-[280px] flex items-center justify-center overflow-visible pointer-events-none select-none z-0">

            {/* 1. The Ringed Planet (Central) */}
            <motion.div
                className="absolute"
                initial={{ scale: 0, rotate: 10 }}
                animate={{
                    scale: 1,
                    rotate: [10, 15, 10],
                    y: [0, -10, 0]
                }}
                transition={{
                    scale: { duration: 0.8, ease: "backOut" },
                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ top: '15%', left: '50%', x: '-50%', zIndex: 20 }}
            >
                <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                    {/* Planet Body */}
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-[#A855F7] rounded-full border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 relative overflow-hidden">
                        {/* Crater */}
                        <div className="absolute top-4 right-6 w-4 h-4 bg-black/10 rounded-full" />
                        <div className="absolute bottom-6 left-6 w-6 h-6 bg-black/10 rounded-full" />
                    </div>

                    {/* Ring (Back) */}
                    <div className="absolute w-40 h-10 md:w-52 md:h-12 border-[3px] border-black rounded-[100%] bg-transparent z-10 transform -rotate-12 top-1/2 -translate-y-1/2" />

                    {/* Ring (Front - Masked/Partial trick or just simple z-index layering?) 
                        To keep it simple, we use one ring. For "behind" effect, we rely on the planet covering the middle.
                        But to truly look like a ring, the front part needs to be ON TOP of the planet.
                        Let's try a split ring approach or just a simple stylistic ring.
                        Actually, Neo-Brutalist style tolerates flat layers. Let's put a "Front Ring" segment on top.
                    */}
                    <div className="absolute w-40 h-10 md:w-52 md:h-12 border-b-[3px] border-l-[3px] border-r-[3px] border-t-0 border-black rounded-[0_0_100%_100%] bg-transparent z-30 transform -rotate-12 top-[60%] left-[-10px] md:left-[-20px] pointer-events-none" style={{ height: '24px' }} />
                </div>
            </motion.div>

            {/* 2. The Rocket (Flying Up) */}
            <motion.div
                className="absolute"
                initial={{ x: -100, y: 100, opacity: 0 }}
                animate={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    rotate: [-45, -40, -45] // Tilted flight
                }}
                transition={{
                    opacity: { duration: 0.5, delay: 0.3 },
                    x: { duration: 1, type: "spring" },
                    y: { duration: 1, type: "spring" },
                    rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ bottom: '20%', left: '15%', zIndex: 30 }}
            >
                <div className="relative transform rotate-45 group">
                    {/* Rocket Body */}
                    <div className="w-12 h-20 bg-white border-[3px] border-black rounded-[50%_50%_10px_10px] relative z-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                        <div className="w-6 h-6 bg-[#3B82F6] rounded-full border-2 border-black" />
                    </div>
                    {/* Fins */}
                    <div className="absolute bottom-2 -left-3 w-4 h-8 bg-[#EF4444] border-[3px] border-black rounded-l-full z-10 origin-bottom-right transform -rotate-12" />
                    <div className="absolute bottom-2 -right-3 w-4 h-8 bg-[#EF4444] border-[3px] border-black rounded-r-full z-10 origin-bottom-left transform rotate-12" />
                    {/* Flame */}
                    <motion.div
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-6 bg-[#FACC15] border-[3px] border-black rounded-b-full z-0"
                        animate={{ height: [15, 25, 15] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                    />
                </div>
            </motion.div>

            {/* 3. The 4-Pointed Star (Sparkle) */}
            <motion.div
                className="absolute"
                initial={{ scale: 0 }}
                animate={{
                    scale: [0.8, 1.1, 0.8],
                    rotate: [0, 90, 180]
                }}
                transition={{
                    scale: { duration: 1.5, repeat: Infinity },
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" }
                }}
                style={{ top: '25%', right: '15%', zIndex: 10 }}
            >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="#FACC15" stroke="black" strokeWidth="2" className="drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" strokeLinejoin="round" />
                </svg>
            </motion.div>

            {/* Decor: Floating Astronaut/Satellite Elements */}
            <motion.div className="absolute top-[10%] left-[20%] text-black/20" animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <div className="w-4 h-4 rounded-full border-2 border-dashed border-black" />
            </motion.div>

            <motion.div
                className="absolute bottom-[25%] right-[25%]"
                animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <div className="w-6 h-6 bg-[#10B981] border-[3px] border-black transform rotate-12" />
            </motion.div>

        </div>
    );
}
