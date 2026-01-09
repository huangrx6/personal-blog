"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiProps {
    trigger: boolean;
    onComplete?: () => void;
    // Optional origin for spawning, relative to viewport if fixed, or container
    origin?: { x: number, y: number };
}

// Cartoon-style confetti with emoji and shapes
const confettiItems = [
    '🎉', '✨', '⭐', '🌟', '💫', '🎊', '🎈', '💖', '🔥', '⚡',
    '●', '■', '★', '▲', '♦', '◆',
];

// Darker, more vibrant colors
const colors = [
    '#0284C7', // darker blue
    '#65A30D', // darker lime
    '#E11D48', // darker rose
    '#CA8A04', // darker yellow
    '#9333EA', // darker purple
    '#0891B2', // darker cyan
    '#EA580C', // darker orange
];

export function Confetti({ trigger, onComplete, origin }: ConfettiProps) {
    const [particles, setParticles] = useState<Array<{
        id: number;
        x: number;
        y: number;
        item: string;
        color: string;
        rotation: number;
        scale: number;
        delay: number;
    }>>([]);

    useEffect(() => {
        if (trigger) {
            // Generate more confetti particles
            const newParticles = Array.from({ length: 35 }, (_, i) => {
                // Direction mostly Up (-y)
                const angle = (Math.random() * 90 + 45) * (Math.PI / 180); // 45 to 135 degrees (upwards cone)
                const velocity = Math.random() * 200 + 100;

                return {
                    id: i,
                    // If origin provided, use 0 relative to that, else random center
                    x: origin ? (Math.random() - 0.5) * 100 : (Math.random() - 0.5) * 300,
                    y: origin ? -50 - Math.random() * 100 : Math.random() * -200 - 80,

                    item: confettiItems[Math.floor(Math.random() * confettiItems.length)],
                    color: colors[Math.floor(Math.random() * colors.length)],
                    rotation: Math.random() * 720 - 360,
                    scale: Math.random() * 0.6 + 1.0, // Larger scale 1.0-1.6
                    delay: Math.random() * 0.1,
                }
            });
            setParticles(newParticles);

            // Clear after animation
            const timer = setTimeout(() => {
                setParticles([]);
                onComplete?.();
            }, 1800);

            return () => clearTimeout(timer);
        }
    }, [trigger, onComplete, origin]);

    return (
        <AnimatePresence>
            {particles.length > 0 && (
                <div
                    className="fixed pointer-events-none z-[99999]"
                    style={{
                        // If origin is provided, use it (assumed viewport coordinates)
                        // If not, center screen
                        left: origin ? origin.x : '50%',
                        top: origin ? origin.y : '50%',
                        transform: origin ? 'translate(-50%, 0)' : 'translate(-50%, -50%)',
                        overflow: 'visible',
                        width: 0,
                        height: 0
                    }}
                >
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            initial={{
                                x: 0,
                                y: 0,
                                scale: 0,
                                opacity: 1,
                                rotate: 0,
                            }}
                            animate={{
                                x: particle.x,
                                y: particle.y,
                                scale: particle.scale,
                                opacity: 0,
                                rotate: particle.rotation,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 1.5,
                                delay: particle.delay,
                                ease: [0.25, 0.46, 0.45, 0.94], // Ease out cubic
                            }}
                            style={{
                                position: 'absolute',
                                color: particle.color,
                                fontSize: particle.item.length === 1 && !['●', '■', '★', '▲', '♦', '◆'].includes(particle.item)
                                    ? '32px'  // Emoji size
                                    : '24px', // Shape size
                                fontWeight: 'bold',
                                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            }}
                        >
                            {particle.item}
                        </motion.div>
                    ))}
                </div>
            )}
        </AnimatePresence>
    );
}
