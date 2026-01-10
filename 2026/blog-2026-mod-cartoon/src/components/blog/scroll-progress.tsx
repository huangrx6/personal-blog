"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed top-0 left-0 right-0 h-2 z-50 pointer-events-none">
            {/* Progress Bar */}
            <motion.div
                className="absolute top-0 left-0 bottom-0 bg-primary origin-left"
                style={{ scaleX, right: 0, left: 0 }}
            />

            {/* Icon Trigger/Follower */}
            {/* We map scaleX (0-1) to percentage for the left position */}
            {/* Note: using a separate transform might be smoother */}
            <motion.div
                className="absolute top-0 -ml-3 -mt-2"
                style={{
                    left: useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 100, damping: 30 })
                }}
            >
                <div className="relative">
                    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] font-black bg-black text-white px-1 rounded opacity-0">
                        Reading
                    </span>
                    <div className="w-8 h-8 flex items-center justify-center rotate-45 drop-shadow-lg">
                        <span className="text-2xl filter drop-shadow-sm">🚀</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
