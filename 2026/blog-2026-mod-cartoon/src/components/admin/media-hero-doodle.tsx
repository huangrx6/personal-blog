"use client";

import { motion } from "framer-motion";
import { Aperture, Image as ImageIcon, Sparkles } from "lucide-react";

export function MediaHeroDoodle() {
    return (
        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center select-none overflow-hidden">
            {/* Background Abstract Shapes */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute w-[500px] h-[500px] border-[3px] border-black/5 rounded-full border-dashed"
            />

            <motion.div
                animate={{
                    rotate: [360, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute w-[300px] h-[300px] border-[40px] border-[#FFDE00]/10 rounded-full"
            />

            {/* Main Camera Composition */}
            <div className="relative z-10">
                {/* Floating Photos Behind */}
                <motion.div
                    animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-20 -top-20 bg-white p-3 pb-8 border-4 border-black rounded-lg shadow-neo -rotate-12 z-0"
                >
                    <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-black/20 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-black/20" />
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -right-16 -bottom-10 bg-white p-3 pb-8 border-4 border-black rounded-lg shadow-neo rotate-6 z-0"
                >
                    <div className="w-20 h-20 bg-gray-100 border-2 border-dashed border-black/20 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-black/20" />
                    </div>
                </motion.div>

                {/* Central Camera Character */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative bg-white border-4 border-black rounded-3xl p-6 shadow-neo-lg z-10 w-48 mx-auto"
                >
                    {/* Camera Top */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-8 bg-black rounded-t-xl border-t-2 border-x-2 border-black flex items-center justify-between px-3">
                        <div className="w-8 h-2 bg-white/20 rounded-full"></div> {/* Flash */}
                        <div className="w-4 h-4 bg-[#FF4D4D] rounded-full border-2 border-white cursor-pointer hover:bg-red-400 transition-colors"></div> {/* Shutter */}
                    </div>

                    {/* Lens (Face) */}
                    <div className="relative w-32 h-32 mx-auto bg-black rounded-full border-4 border-black p-2 flex items-center justify-center overflow-hidden">
                        {/* Reflection */}
                        <div className="absolute top-2 right-4 w-6 h-6 bg-white/20 rounded-full blur-sm"></div>

                        {/* Inner Lens / Aperture */}
                        <motion.div
                            animate={{ rotate: [0, 45, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="w-full h-full rounded-full border-2 border-white/20 flex items-center justify-center bg-[#1a1a1a]"
                        >
                            <Aperture className="w-16 h-16 text-white/50" />
                        </motion.div>

                        {/* Cute Eyes (Overlay on Lens) */}
                        <div className="absolute inset-0 flex items-center justify-center gap-6 mt-1">
                            <motion.div
                                animate={{ scaleY: [1, 0.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                className="w-3 h-4 bg-white rounded-full"
                            />
                            <motion.div
                                animate={{ scaleY: [1, 0.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                className="w-3 h-4 bg-white rounded-full"
                            />
                        </div>
                    </div>

                    {/* Checkers Pattern Decor */}
                    <div className="absolute bottom-4 left-4 right-4 h-3 flex gap-1 justify-center opacity-20">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-black rounded-full" />
                        ))}
                    </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-10 right-0 text-[#FACC15]"
                >
                    <Sparkles className="w-8 h-8" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 -left-16 bg-black text-white px-3 py-1 rounded-full text-xs font-black border-2 border-white shadow-lg -rotate-12"
                >
                    SNAP!
                </motion.div>

                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }}
                    className="absolute bottom-0 -right-20 bg-[#FACC15] text-black px-3 py-1 rounded-full text-xs font-black border-2 border-black shadow-lg rotate-12"
                >
                    GALLERY
                </motion.div>
            </div>
        </div>
    );
}
