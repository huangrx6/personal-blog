"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export type CursorStyle = "blob" | "sparkle" | "rainbow" | "trail";

interface CursorEffectProps {
    style?: CursorStyle;
    color?: string;
}

// Sparkle cursor - creates sparkle particles on movement
function SparkleCursor({ color = "#FFD700" }: { color?: string }) {
    const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

    useEffect(() => {
        let id = 0;
        const handleMove = (e: MouseEvent) => {
            if (Math.random() > 0.7) { // Only spawn occasionally
                const newSparkle = { id: id++, x: e.clientX, y: e.clientY };
                setSparkles(prev => [...prev.slice(-15), newSparkle]);
            }
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999]">
            {sparkles.map((sparkle) => (
                <motion.div
                    key={sparkle.id}
                    className="absolute"
                    initial={{ opacity: 1, scale: 1, x: sparkle.x - 8, y: sparkle.y - 8 }}
                    animate={{ opacity: 0, scale: 0, y: sparkle.y - 50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    onAnimationComplete={() => {
                        setSparkles(prev => prev.filter(s => s.id !== sparkle.id));
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
                        <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}

// Rainbow cursor - leaves a rainbow trail
function RainbowCursor() {
    const [trails, setTrails] = useState<{ id: number; x: number; y: number; hue: number }[]>([]);
    const hueRef = { current: 0 };

    useEffect(() => {
        let id = 0;
        const handleMove = (e: MouseEvent) => {
            hueRef.current = (hueRef.current + 5) % 360;
            const newTrail = { id: id++, x: e.clientX, y: e.clientY, hue: hueRef.current };
            setTrails(prev => [...prev.slice(-20), newTrail]);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999]">
            {trails.map((trail, index) => (
                <motion.div
                    key={trail.id}
                    className="absolute w-4 h-4 rounded-full"
                    style={{
                        backgroundColor: `hsl(${trail.hue}, 80%, 60%)`,
                        left: trail.x - 8,
                        top: trail.y - 8,
                    }}
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{ opacity: 0, scale: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.02 }}
                    onAnimationComplete={() => {
                        setTrails(prev => prev.filter(t => t.id !== trail.id));
                    }}
                />
            ))}
        </div>
    );
}

// Trail cursor - simple dot trail
function TrailCursor({ color = "#84CC16" }: { color?: string }) {
    const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);

    useEffect(() => {
        let id = 0;
        const handleMove = (e: MouseEvent) => {
            const newTrail = { id: id++, x: e.clientX, y: e.clientY };
            setTrails(prev => [...prev.slice(-12), newTrail]);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999]">
            {trails.map((trail, index) => (
                <motion.div
                    key={trail.id}
                    className="absolute rounded-full border-2 border-black"
                    style={{
                        backgroundColor: color,
                        width: 8 + index * 1.5,
                        height: 8 + index * 1.5,
                        left: trail.x - (4 + index * 0.75),
                        top: trail.y - (4 + index * 0.75),
                        opacity: 0.3 + (index / 12) * 0.7,
                    }}
                    initial={{ scale: 1 }}
                    animate={{ scale: 0 }}
                    transition={{ duration: 0.4 }}
                    onAnimationComplete={() => {
                        setTrails(prev => prev.filter(t => t.id !== trail.id));
                    }}
                />
            ))}
        </div>
    );
}

// Blob cursor - the original smooth following blob
function BlobCursor({ color = "#84CC16" }: { color?: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border-2 border-black mix-blend-difference"
            style={{ backgroundColor: color, x: cursorX, y: cursorY }}
        />
    );
}

// Main export - switches between cursor styles
export default function CursorEffect({ style = "blob", color }: CursorEffectProps) {
    switch (style) {
        case "sparkle":
            return <SparkleCursor color={color || "#FFD700"} />;
        case "rainbow":
            return <RainbowCursor />;
        case "trail":
            return <TrailCursor color={color || "#84CC16"} />;
        case "blob":
        default:
            return <BlobCursor color={color || "#84CC16"} />;
    }
}
