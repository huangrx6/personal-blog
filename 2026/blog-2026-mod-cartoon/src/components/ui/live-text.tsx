"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

interface LiveTextProps {
    text: string;
    className?: string;
    outline?: boolean; // If true, applies outline style
}

export function LiveText({ text, className = "", outline = false }: LiveTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const charsRef = useRef<HTMLSpanElement[]>([]);
    const animationRef = useRef<GSAPAnimation | null>(null);

    const startFloating = () => {
        // Kill previous if exists to avoid stacking
        if (animationRef.current) animationRef.current.kill();

        animationRef.current = gsap.to(charsRef.current, {
            y: -8, // Gentle float up
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                each: 0.1,
                from: "random"
            }
        });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial Reveal (Smooth Blur + Slide - React Bits inspired)
            gsap.from(charsRef.current, {
                yPercent: 200, // Increased to 200 to clear the larger padding area (p-4)
                rotationX: 0,
                opacity: 0,
                filter: "blur(10px)",
                duration: 1.2,
                stagger: 0.04,
                ease: "power4.out",
                delay: 0.2,
                onComplete: () => {
                    // Safe to switch now because p-4 (16px) ensures no clipped pixels at rest
                    // ensuring transparent transition to visible state for hover effects
                    if (containerRef.current) {
                        containerRef.current.style.overflow = "visible";
                    }
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = () => {
        // Kill floating animation
        if (animationRef.current) animationRef.current.kill();

        // "Wave" effect on hover
        gsap.to(charsRef.current, {
            y: -25, // Higher jump
            scale: 1.3,
            rotate: "random(-10, 10)",
            color: outline ? "#FACC15" : "#A855F7",
            textShadow: "0px 10px 20px rgba(0,0,0,0.2)",
            duration: 0.4,
            stagger: {
                each: 0.05,
                from: "center",
                yoyo: true,
                repeat: 1
            },
            ease: "power2.out",
            onComplete: () => {
                // Return to normal color/state then restart float
                gsap.to(charsRef.current, {
                    scale: 1,
                    rotate: 0,
                    color: outline ? "transparent" : "black",
                    textShadow: "none",
                    duration: 0.4,
                    // onComplete: startFloating // Disable resume floating
                });
            }
        });
    };

    return (
        <div
            ref={containerRef}
            // Increased to p-4 (16px) to safely contain standard stroke/blur without clipping
            className={`inline-block overflow-hidden cursor-pointer selection:bg-primary selection:text-black p-4 ${className}`}
            onMouseEnter={handleMouseEnter}
        >
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    ref={(el) => {
                        if (el) charsRef.current[i] = el;
                    }}
                    className={`inline-block transition-colors will-change-transform ${outline
                        ? "text-[transparent] [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:4px_black]"
                        : "text-black"
                        }`}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}
