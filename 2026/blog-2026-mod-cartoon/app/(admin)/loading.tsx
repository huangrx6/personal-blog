"use client";

import { motion } from "framer-motion";

export default function AdminLoading() {
    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
            {/* Bouncing Shape */}
            <motion.div
                className="w-20 h-20 bg-primary border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                animate={{
                    y: [-15, 0, -15],
                    rotate: [0, 180, 360],
                    borderRadius: ["50%", "20%", "50%"],
                    scale: [0.9, 1.1, 0.9]
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
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                Loading...
            </motion.h2>
        </motion.div>
    );
}
