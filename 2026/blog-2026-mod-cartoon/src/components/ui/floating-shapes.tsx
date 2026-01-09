"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

export function FloatingShapes() {
    const [isMounted, setIsMounted] = useState(false);
    const { scrollY } = useScroll();

    // Mouse parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        setIsMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            // Normalized coordinates -1 to 1
            mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
            mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    if (!isMounted) return null;

    // Geometric shapes data
    const shapes = [
        // Left Side
        { id: 1, type: 'circle', color: 'bg-primary/20', size: 'w-16 h-16', top: '15%', left: '5%', delay: 0 },
        { id: 2, type: 'triangle', color: 'border-secondary/30', size: 'w-12 h-12', top: '45%', left: '8%', delay: 1 },
        { id: 3, type: 'squiggle', color: 'text-accent/20', size: 'w-20 h-20', top: '75%', left: '4%', delay: 2 },
        { id: 4, type: 'cross', color: 'text-black/10', size: 'w-8 h-8', top: '25%', left: '12%', delay: 1.5 },

        // Right Side
        { id: 5, type: 'circle', color: 'border-primary/20', size: 'w-20 h-20', top: '10%', right: '8%', delay: 0.5 },
        { id: 6, type: 'square', color: 'bg-secondary/10', size: 'w-14 h-14', top: '55%', right: '5%', delay: 1.2 },
        { id: 7, type: 'triangle', color: 'border-accent/30', size: 'w-10 h-10', top: '80%', right: '10%', delay: 2.5 },
        { id: 8, type: 'donut', color: 'border-black/10', size: 'w-12 h-12', top: '35%', right: '12%', delay: 1.8 },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {shapes.map((shape) => (
                <Shape key={shape.id} shape={shape} mouseX={mouseX} mouseY={mouseY} />
            ))}
        </div>
    );
}

function Shape({ shape, mouseX, mouseY }: { shape: any, mouseX: any, mouseY: any }) {
    // Parallax movement
    const x = useTransform(mouseX, [-1, 1], [shape.left ? -20 : 20, shape.left ? 20 : -20]);
    const y = useTransform(mouseY, [-1, 1], [-20, 20]);

    // Smooth spring physics for parallax
    const springX = useSpring(x, { stiffness: 50, damping: 20 });
    const springY = useSpring(y, { stiffness: 50, damping: 20 });

    return (
        <motion.div
            className={`absolute ${shape.top ? `top-[${shape.top}]` : ''} ${shape.left ? `left-[${shape.left}]` : ''} ${shape.right ? `right-[${shape.right}]` : ''} ${shape.bottom ? `bottom-[${shape.bottom}]` : ''}`}
            style={{
                top: shape.top,
                left: shape.left,
                right: shape.right,
                bottom: shape.bottom,
                x: springX,
                y: springY
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
            }}
            transition={{
                opacity: { duration: 1 },
                scale: { duration: 0.8, type: "spring" },
                y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: shape.delay },
                rotate: { duration: 6 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: shape.delay }
            }}
        >
            {/* Render shape based on type */}
            {shape.type === 'circle' && (
                <div className={`${shape.size} rounded-full ${shape.color.startsWith('border') ? 'border-4 ' + shape.color : shape.color}`}></div>
            )}
            {shape.type === 'donut' && (
                <div className={`${shape.size} rounded-full border-8 ${shape.color}`}></div>
            )}
            {shape.type === 'square' && (
                <div className={`${shape.size} rounded-3xl rotate-12 ${shape.color.startsWith('border') ? 'border-4 ' + shape.color : shape.color}`}></div>
            )}
            {shape.type === 'triangle' && (
                <div className="w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-current opacity-20 text-accent" style={{ transform: 'rotate(15deg)' }}></div>
            )}
            {shape.type === 'cross' && (
                <div className="text-4xl font-black opacity-20 select-none">+</div>
            )}
            {shape.type === 'squiggle' && (
                <svg className="w-24 h-24 opacity-20" viewBox="0 0 100 20">
                    <path d="M0 10 Q 25 20, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="8" />
                </svg>
            )}
        </motion.div>
    );
}
