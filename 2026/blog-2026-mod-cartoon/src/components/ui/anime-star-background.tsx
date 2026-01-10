"use client";

import { cn } from "@/lib/utils/cn";
import React, { useEffect, useRef } from "react";

interface AnimeStarBackgroundProps {
    className?: string;
    children?: React.ReactNode;
}

export function AnimeStarBackground({ className, children }: AnimeStarBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        // Star Class
        class Star {
            x: number;
            y: number;
            size: number;
            opacity: number;
            speed: number;
            twinkleSpeed: number;
            color: string;

            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 2 + 0.5;
                this.opacity = Math.random();
                this.speed = Math.random() * 0.05 + 0.01;
                this.twinkleSpeed = Math.random() * 0.02 + 0.005;
                // Anime star colors: mostly white/cyan/purple
                const colors = ["#ffffff", "#a5f3fc", "#e9d5ff", "#fef08a"];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = Math.abs(Math.sin(Date.now() * 0.001 * this.twinkleSpeed * 100)) * 0.8 + 0.2;
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            update() {
                this.y -= this.speed; // Slowly float up
                if (this.y < 0) this.y = h;
                this.draw();
            }
        }

        // Shooting Star Class
        class ShootingStar {
            x: number;
            y: number;
            length: number;
            speed: number;
            opacity: number;
            active: boolean;

            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h * 0.5; // Start in top half
                this.length = Math.random() * 80 + 20;
                this.speed = Math.random() * 10 + 5;
                this.opacity = 0;
                this.active = false;
            }

            reset() {
                this.x = Math.random() * w + 200; // Offset for angle
                this.y = Math.random() * h * 0.3;
                this.length = Math.random() * 80 + 20;
                this.speed = Math.random() * 15 + 10;
                this.opacity = 1;
                this.active = true;
            }

            draw() {
                if (!ctx || !this.active) return;

                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - this.length, this.y + this.length); // 45 degree angle
                const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.length, this.y + this.length);
                gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.lineCap = "round";
                ctx.stroke();
            }

            update() {
                if (!this.active) {
                    if (Math.random() < 0.005) { // 0.5% chance to spawn per frame
                        this.reset();
                    }
                    return;
                }

                this.x -= this.speed;
                this.y += this.speed;
                this.opacity -= 0.02;

                if (this.opacity <= 0 || this.x < 0 || this.y > h) {
                    this.active = false;
                } else {
                    this.draw();
                }
            }
        }

        const stars: Star[] = Array.from({ length: 200 }, () => new Star());
        const shootingStars: ShootingStar[] = Array.from({ length: 3 }, () => new ShootingStar());

        const render = () => {
            if (!ctx) return;
            // Clear but keep gradient
            ctx.clearRect(0, 0, w, h);

            // Draw Gradient Background - DARKER (Deep Space)
            const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
            bgGradient.addColorStop(0, "#000000");    // Pure Black
            bgGradient.addColorStop(0.4, "#0a0a0a");  // Almost Black
            bgGradient.addColorStop(0.8, "#1a1a1a");  // Dark Grey
            bgGradient.addColorStop(1, "#262626");    // Deep Charcoal (Horizon)

            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, w, h);

            stars.forEach(star => star.update());
            shootingStars.forEach(s => s.update());

            animationFrameId = requestAnimationFrame(render);
        };

        const handleResize = () => {
            w = (canvas.width = window.innerWidth);
            h = (canvas.height = window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className={cn("relative w-full min-h-screen", className)}>
            {/* 固定的星空canvas背景 */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 w-full h-full pointer-events-none"
            />
            {/* 内容区域需要有背景色来覆盖footer */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
