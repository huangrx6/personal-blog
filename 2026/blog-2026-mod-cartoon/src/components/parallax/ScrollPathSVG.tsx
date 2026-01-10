"use client";

import { useLayoutEffect, useRef, useState } from "react";

interface ScrollPathProps {
    startOffset?: number; // Distance from top where path starts
    className?: string;
}

export function ScrollingPath({ startOffset = 0, className = "" }: ScrollPathProps) {
    const pathRef = useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = useState(0);

    useLayoutEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }

        const handleScroll = () => {
            if (!pathRef.current) return;

            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            // Calculate progress with a distinct lag/slowdown factor
            const rawProgress = (scrollY - startOffset) / (docHeight - windowHeight - startOffset);
            const clampedProgress = Math.max(0, Math.min(1, rawProgress));

            // Apply a multiplier to make it draw "slower" than the actual scroll (lagging behind)
            // 0.85 means at the very bottom of the page, the line is 85% done.
            // This creates a feeling of "following" rather than leading.
            const slowedProgress = clampedProgress * 0.85;

            if (pathRef.current) {
                const drawLength = pathLength * slowedProgress;
                pathRef.current.style.strokeDasharray = `${pathLength} ${pathLength}`;
                pathRef.current.style.strokeDashoffset = `${pathLength - drawLength}`;
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathLength, startOffset]);

    return (
        <div className={`fixed top-0 left-0 w-full h-full pointer-events-none -z-10 ${className}`}>
            <svg
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMin slice"
                className="w-full h-full overflow-visible"
                viewBox="0 0 1440 3200" // Large bounding box to accommodate the path
            >
                <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FF4D4D" stopOpacity="0" />
                        <stop offset="10%" stopColor="#FF4D4D" stopOpacity="0.8" />
                        <stop offset="40%" stopColor="#8A2BE2" stopOpacity="0.8" />
                        <stop offset="70%" stopColor="#4169E1" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#00E5FF" stopOpacity="1" />
                    </linearGradient>

                    {/* Hand-Drawn Displacement Filter */}
                    <filter id="displacementFilter">
                        <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="3" result="turbulence" />
                        <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="8" xChannelSelector="R" yChannelSelector="G" />
                    </filter>

                    {/* Glow Filter */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* The Path: A long winding road down the center */}
                <path
                    ref={pathRef}
                    d="M 100,0 
                       Q 400,400 720,600 
                       T 1000,1000 
                       T 400,1600 
                       T 800,2200
                       T 200,2800
                       T 720,3400"
                    fill="none"
                    stroke="url(#pathGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    filter="url(#displacementFilter) url(#glow)"
                    style={{
                        strokeDasharray: pathLength,
                        strokeDashoffset: pathLength,
                        transition: "stroke-dashoffset 0.15s cubic-bezier(0.25, 1, 0.5, 1)" // Smooth easing
                    }}
                />
            </svg>
        </div>
    );
}
