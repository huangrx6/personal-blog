"use client";

import { useEffect, useRef } from "react";

interface DotGridProps {
    dotSize?: number;
    gap?: number;
    baseColor?: string;
    activeColor?: string;
    proximity?: number;
    className?: string;
}

export function DotGridBackground({
    dotSize = 2,
    gap = 20,
    baseColor = "#a1a1aa", // neutral-400
    activeColor = "#000000", // black
    proximity = 100,
    className
}: DotGridProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse state
    const mouse = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let dots: { x: number; y: number; originX: number; originY: number }[] = [];

        const initDots = () => {
            const width = container.offsetWidth;
            const height = container.offsetHeight;

            canvas.width = width;
            canvas.height = height; // Set canvas size to match container

            // Handle high DPI displays
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            dots = [];
            // Create grid of dots
            for (let x = gap / 2; x < width; x += gap) {
                for (let y = gap / 2; y < height; y += gap) {
                    dots.push({ x, y, originX: x, originY: y });
                }
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Get mouse position relative to the container
            const rect = container.getBoundingClientRect();
            mouse.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseLeave = () => {
            mouse.current = { x: -1000, y: -1000 };
        };

        const render = () => {
            if (!container || !ctx) return;
            const width = container.offsetWidth;
            const height = container.offsetHeight;

            ctx.clearRect(0, 0, width, height);

            dots.forEach(dot => {
                // Calculate distance to mouse
                const dx = mouse.current.x - dot.x;
                const dy = mouse.current.y - dot.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Interaction logic
                let color = baseColor;

                // Spring/Lerp back to origin
                // We want the dot to move *slightly* away or towards the mouse?
                // The ReactBits description says "organized and chaotic effect with every cursor movement".
                // Usually this means dots move away from cursor or scale up.

                // Let's implement a gentle repulsion/attraction
                if (dist < proximity) {
                    color = activeColor;

                    // Simple displacement: move slightly away
                    // const angle = Math.atan2(dy, dx);
                    // const force = (proximity - dist) / proximity; 
                    // const displacement = force * 5; // Max 5px displacement

                    // dot.x -= Math.cos(angle) * displacement;
                    // dot.y -= Math.sin(angle) * displacement;
                }

                // Draw dot
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
                ctx.fill();
            });

            // For now, let's keep it static but with color change to verify it works first.
            // If we want movement, we need to update dot.x/y statefully which requires more complex logic (velocity etc)
            // or just simple functional displacement based on current mouse pos.

            animationFrameId = requestAnimationFrame(render);
        };

        initDots();
        window.addEventListener("resize", initDots);
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        render();

        return () => {
            window.removeEventListener("resize", initDots);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [dotSize, gap, baseColor, activeColor, proximity]);

    return (
        <div ref={containerRef} className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
            <canvas ref={canvasRef} className="block" />
        </div>
    );
}
