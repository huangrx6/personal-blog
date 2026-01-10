"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export function AnimatedDoodle() {
    const containerRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Floating animation - each character has DIFFERENT amplitude and timing
            // This prevents them from bunching up at the same height

            // Character 1 (Yellow) - Subtle float (side character - lower jump)
            gsap.to(".doodle-char-1", {
                y: -15, // Significantly increased from -2
                rotation: 1,
                duration: 2.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });

            // Character 2 (Purple) - Center character
            gsap.to(".doodle-char-2", {
                y: -20, // Increased from -12
                rotation: -1,
                transformOrigin: "50% 50%",
                duration: 3,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                delay: 0.5
            });

            // Character 3 (Blue) - Side character
            gsap.to(".doodle-char-3", {
                y: -18, // Increased from -12
                rotation: 1.5,
                transformOrigin: "50% 50%",
                duration: 2.8,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                delay: 1
            });

            // "Blinking" or "Pulse" effect for the eyes/shapes
            gsap.to(".doodle-shape", {
                scale: 1.05,
                transformOrigin: "center",
                duration: 0.4,
                yoyo: true,
                repeat: -1,
                repeatDelay: 3,
                ease: "power2.out"
            });

            // Rotate decorations slowly
            gsap.to(".doodle-deco", {
                rotation: 360,
                transformOrigin: "center",
                duration: 15,
                repeat: -1,
                ease: "linear"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center p-10">
            <svg
                ref={containerRef}
                viewBox="0 0 500 500"
                className="w-full h-full max-w-[600px] drop-shadow-2xl"
                style={{ overflow: "visible" }}
            >
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Character 1 (Top Right) - Yellow */}
                <g transform="translate(300, 150)">
                    <g className="doodle-char-1">
                        <rect x="-50" y="-50" width="100" height="100" rx="50" fill="#FACC15" stroke="black" strokeWidth="5" />
                        {/* Face */}
                        <circle cx="-18" cy="-8" r="7" fill="black" className="doodle-shape" />
                        <circle cx="18" cy="-8" r="7" fill="black" className="doodle-shape" />
                        <path d="M-10 18 Q0 28 10 18" stroke="black" strokeWidth="4" fill="none" />
                    </g>
                </g>

                {/* Character 2 (Bottom Left) - Purple Square */}
                <g transform="translate(150, 310)"> {/* Moved down from 280 */}
                    <g className="doodle-char-2">
                        <rect x="-60" y="-60" width="120" height="120" rx="18" fill="#A855F7" stroke="black" strokeWidth="5" transform="rotate(-8)" />
                        {/* Face */}
                        <rect x="-35" y="-15" width="12" height="22" rx="4" fill="black" className="doodle-shape" />
                        <rect x="23" y="-15" width="12" height="22" rx="4" fill="black" className="doodle-shape" />
                        <path d="M-18 25 L18 25" stroke="black" strokeWidth="5" strokeLinecap="round" />
                    </g>
                </g>

                {/* Character 3 (Right) - Blue Cyclops */}
                <g transform="translate(380, 290)"> {/* Moved down from 260 */}
                    <g className="doodle-char-3">
                        <circle cx="0" cy="0" r="60" fill="#3B82F6" stroke="black" strokeWidth="5" />
                        {/* Cyclops Eye */}
                        <circle cx="0" cy="-15" r="22" fill="white" stroke="black" strokeWidth="3" />
                        <circle cx="0" cy="-15" r="7" fill="black" className="doodle-shape" />
                        {/* Mouth */}
                        <path d="M-12 25 Q0 12 12 25" stroke="black" strokeWidth="4" fill="none" />
                    </g>
                </g>

                {/* Floating Decor Items */}
                <g className="doodle-deco" transform="translate(100, 100)">
                    <path d="M0 -15 L12 12 L-12 12 Z" fill="none" stroke="black" strokeWidth="3" />
                </g>
                <g className="doodle-deco" transform="translate(420, 100)">
                    <circle r="8" fill="none" stroke="black" strokeWidth="3" />
                </g>
                <g className="doodle-deco" transform="translate(300, 400)">
                    <rect width="15" height="15" fill="none" stroke="black" strokeWidth="3" />
                </g>

            </svg>
        </div>
    );
}
