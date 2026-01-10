"use client";

import { LucideIcon } from "lucide-react";

interface NeoIconProps {
    icon: LucideIcon;
    className?: string;
    size?: number;
    iconSize?: number;
    color?: string; // Tailwind bg class like "bg-[#FACC15]"
}

export function NeoIcon({
    icon: Icon,
    className = "",
    size = 16, // w-16 h-16 equivalent
    iconSize = 24,
    color = "bg-[#FACC15]"
}: NeoIconProps) {
    // styles map based on size number roughly
    const sizeStyle = { width: size, height: size };

    return (
        <div
            className={`rounded-full ${color} border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-transform duration-300 ${className}`}
            style={sizeStyle}
        >
            <Icon size={iconSize} color="black" absoluteStrokeWidth strokeWidth={2.5} />
        </div>
    );
}
