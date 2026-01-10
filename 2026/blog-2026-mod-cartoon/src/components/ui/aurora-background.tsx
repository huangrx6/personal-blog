"use client";
import { cn } from "@/lib/utils/cn";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children?: ReactNode;
    showRadialGradient?: boolean;
}

export const AuroraBackground = ({
    className,
    children,
    showRadialGradient = true,
    ...props
}: AuroraBackgroundProps) => {
    return (
        <main
            className={cn(
                "relative flex flex-col items-center justify-center min-h-screen bg-black text-slate-950 transition-bg",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className={cn(
                        `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,#4c1d95_10%,#2e1065_15%,#000000_20%,#171717_25%,#4c1d95_30%)]
            [background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)] 
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,
                        showRadialGradient &&
                        `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
                    )}
                ></div>
            </div>
            {/* Deep Space Stars */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute h-[2px] w-[2px] bg-white rounded-full top-1/4 left-1/4 animate-pulse"></div>
                <div className="absolute h-[3px] w-[3px] bg-purple-500 rounded-full top-1/3 left-2/3 animate-pulse delay-75"></div>
                <div className="absolute h-[1px] w-[1px] bg-white rounded-full top-1/2 left-1/2 animate-pulse delay-150"></div>
                <div className="absolute h-[2px] w-[2px] bg-violet-400 rounded-full top-2/3 left-1/3 animate-pulse delay-300"></div>
            </div>

            <div className="relative z-10 w-full">{children}</div>
        </main>
    );
};
