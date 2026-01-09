"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    // Cartoon "Bouncing & Morphing" Loader
    // We remove the initial delay so the loader appears immediately on mount (page navigation)
    // Then it slides out to reveal content.
    return (
        <>
            <motion.div
                className="fixed inset-0 z-[100] bg-white pointer-events-none flex flex-col items-center justify-center gap-8"
                initial={{ y: 0 }}
                animate={{ y: "-100%" }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.5 }} // Reduced delay: 1.2 -> 0.5s sufficient for effect but not annoying
            >
                {/* Bouncing Shape */}
                <motion.div
                    className="w-24 h-24 bg-primary border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    initial={{ borderRadius: "50%", scale: 0.8 }}
                    animate={{
                        y: [-20, 0, -20],
                        rotate: [0, 180, 360],
                        borderRadius: ["50%", "0%", "50%"],
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        duration: 1.0,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Loading Text */}
                <motion.h2
                    className="text-6xl font-cartoon tracking-wider uppercase text-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Loading...
                </motion.h2>
            </motion.div>

            <motion.main
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }} // Content appears as loader lifts
            >
                {children}
            </motion.main>
        </>
    );
}
