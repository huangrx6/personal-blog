"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function AnimatedMascots() {
    const [isMounted, setIsMounted] = useState(false);
    const { scrollY } = useScroll();

    // Left mascot - Waving on ground
    // Moves up slightly with scroll (parallax)
    const leftY = useTransform(scrollY, [0, 500], [0, -40]);
    const leftScale = useTransform(scrollY, [0, 300], [1, 1.05]);

    // Right mascot - Flying in air
    // Starts mid-screen and moves down with scroll
    const rightY = useTransform(scrollY, [0, 500], [0, 150]);
    const rightRotate = useTransform(scrollY, [0, 500], [-5, 5]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            {/* Left mascot - Waving on ground (bottom left) */}
            <motion.div
                className="fixed left-4 xl:left-12 bottom-12 z-10 pointer-events-none hidden lg:block"
                style={{ y: leftY, scale: leftScale }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div
                    animate={{
                        y: [0, -8, 0],
                        rotate: [0, 2, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Image
                        src="/mascot-waving.png"
                        alt="Waving mascot"
                        width={200}
                        height={200}
                        className="drop-shadow-xl"
                        priority
                    />
                </motion.div>
            </motion.div>

            {/* Right mascot - Flying (mid right) */}
            <motion.div
                className="fixed right-4 xl:right-12 top-1/3 z-10 pointer-events-none hidden lg:block"
                style={{ y: rightY, rotate: rightRotate }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
                <motion.div
                    animate={{
                        y: [0, -15, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Image
                        src="/mascot-flying.png"
                        alt="Flying mascot"
                        width={220}
                        height={220}
                        className="drop-shadow-xl"
                        priority
                    />
                </motion.div>
            </motion.div>
        </>
    );
}
