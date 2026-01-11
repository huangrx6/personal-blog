"use client";

import { motion } from "framer-motion";

export function SettingsGearDoodle() {
    return (
        <div className="relative w-full h-full min-h-[200px] flex items-center justify-center pointer-events-none select-none">

            {/* Main Gear Container */}
            <div className="relative">
                {/* Cogwheel */}
                <motion.div
                    className="relative w-40 h-40 md:w-56 md:h-56 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {/* Gear Teeth - using absolute divs */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-8 h-10 md:w-12 md:h-12 bg-black -z-10"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-85%)`,
                                borderRadius: '4px'
                            }}
                        />
                    ))}

                    {/* Inner Circle (Hollow) */}
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-[#FACC15] border-4 border-black rounded-full relative overflow-hidden flex items-center justify-center">
                        {/* Shine effect */}
                        <div className="absolute top-0 right-0 w-full h-full bg-white opacity-20 transform rotate-45 translate-x-1/2" />
                    </div>
                </motion.div>

                {/* Floating Nut/Bolt Decor */}
                <motion.div
                    className="absolute -top-4 -right-8 w-10 h-10 bg-[#A855F7] border-4 border-black flex items-center justify-center z-20"
                    style={{ borderRadius: '12px' }} // Hexagon-ish or just square
                    animate={{ y: [0, -10, 0], rotate: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-4 h-4 bg-black rounded-full/50 opacity-20" />
                </motion.div>

                {/* Background Decor Element (Circle) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-80 md:h-80 border-2 border-dashed border-black/20 rounded-full -z-20 animate-spin-slow-reverse" />
            </div>
        </div>
    );
}
