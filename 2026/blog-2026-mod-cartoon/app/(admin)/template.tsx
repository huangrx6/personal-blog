"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AdminTemplate({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Using pathname as key to trigger animation on every navigation
    return (
        <AnimatePresence mode="wait">
            <motion.div key={pathname}>
                {/* Loading Overlay */}
                <motion.div
                    className="fixed inset-0 z-[100] bg-white pointer-events-none flex flex-col items-center justify-center gap-6"
                    initial={{ y: 0 }}
                    animate={{ y: "-100%" }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
                >
                    {/* Bouncing Shape */}
                    <motion.div
                        className="w-20 h-20 bg-primary border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        initial={{ borderRadius: "50%", scale: 0.8 }}
                        animate={{
                            y: [-15, 0, -15],
                            rotate: [0, 180, 360],
                            borderRadius: ["50%", "20%", "50%"],
                            scale: [0.8, 1.1, 0.8]
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Loading Text */}
                    <motion.h2
                        className="text-4xl font-cartoon tracking-wider uppercase text-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Loading...
                    </motion.h2>
                </motion.div>

                {/* Page Content */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
