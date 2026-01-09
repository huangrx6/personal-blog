"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface BlobCursorProps {
    color?: string;
}

export default function BlobCursor({ color = "#84CC16" }: BlobCursorProps) {
    // Mouse position motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for the cursor follower
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16); // Center the 32px cursor
            mouseY.set(e.clientY - 16);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border-2 border-black mix-blend-difference"
            style={{
                backgroundColor: color,
                x: cursorX,
                y: cursorY,
            }}
        />
    );
}
