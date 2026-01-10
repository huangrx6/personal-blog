"use client";

import { cn } from "@/lib/utils/cn";
import React from "react";

interface MechaShipProps {
    className?: string;
    isOpen?: boolean;
    children?: React.ReactNode;
}

export function MechaShip({ className, isOpen, children }: MechaShipProps) {
    return (
        <div className={cn("relative w-full max-w-6xl mx-auto transition-all duration-1000", className)}>

            {/* --- DROP POD HULL --- */}
            <div className="relative z-10 w-full bg-[#111] border-2 border-[#444] shadow-[0_0_100px_rgba(0,255,255,0.1)] overflow-hidden transition-all duration-700 origin-center"
                style={{
                    clipPath: "polygon(50px 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%, 0 50px)", // Chamfered Box
                    transform: isOpen ? "scale(1)" : "scale(0.95)",
                }}
            >
                {/* --- ENGINE FLAMES (Rear Thrusters) --- */}
                <div className={cn("absolute -left-32 top-1/2 -translate-y-1/2 flex flex-col gap-4 transition-opacity duration-500", isOpen ? "opacity-0" : "opacity-100")}>
                    {/* Horizontal flames for 'Flying In' visual */}
                    <div className="w-48 h-6 bg-cyan-400 blur-md animate-pulse origin-right" />
                    <div className="w-32 h-4 bg-cyan-200 blur-sm animate-pulse origin-right delay-75" />
                    <div className="w-64 h-8 bg-blue-600 blur-xl animate-pulse origin-right delay-150" />
                </div>


                {/* --- COCKPIT GLASS / SHUTTER --- */}
                {/* This overlay slides away when open */}
                <div className={cn("absolute inset-0 bg-[#000] z-20 flex items-center justify-center transition-transform duration-1000 ease-in-out",
                    isOpen ? "-translate-x-full" : "translate-x-0"
                )}>
                    <div className="text-center">
                        <div className="text-6xl font-black text-white/10 font-zcool uppercase tracking-widest animate-pulse">
                            DEPLOYING
                        </div>
                        <div className="mt-4 h-1 w-32 bg-cyan-500/50 mx-auto overflow-hidden">
                            <div className="h-full w-full bg-cyan-400 animate-progress" />
                        </div>
                    </div>
                    {/* Decorative shutter lines */}
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,#222_40px,#222_41px)] opacity-20" />
                </div>

                {/* --- INNER CONTENT CLADDING --- */}
                <div className="relative bg-[#050505] p-1 border-t-8 border-cyan-500">

                    {/* Header Details */}
                    <div className="h-12 bg-[#111] w-full flex justify-between items-center px-6 border-b border-[#333]">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse box-shadow-[0_0_10px_green]" />
                            <span className="text-xs text-cyan-400 font-bold font-mono tracking-widest">SYSTEM: {isOpen ? "ONLINE" : "STANDBY"}</span>
                        </div>
                        <div className="text-xs text-gray-600 font-mono">UNIT-01 // M.A.R.S.</div>
                    </div>

                    {/* CONTENT AREA */}
                    <div className={cn("transition-all duration-1000 delay-300 p-4 md:p-8", isOpen ? "opacity-100" : "opacity-0")}>
                        {children}
                    </div>
                </div>

            </div>
        </div>
    );
}
