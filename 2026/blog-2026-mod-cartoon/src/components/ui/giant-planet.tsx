"use client";

import { cn } from "@/lib/utils/cn";

export function GiantPlanet({ className }: { className?: string }) {
    return (
        <div className={cn("pointer-events-none absolute left-1/2 -bottom-[40vw] -translate-x-1/2 w-[120vw] h-[120vw] rounded-full z-0 opacity-40", className)}>
            {/* Main Planet Body */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-slate-900 to-black shadow-[0_-50px_150px_-20px_rgba(0,0,0,1)]">
                {/* Surface Gradient/Atmosphere */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#3b0764_0%,_transparent_60%)] opacity-80" /> {/* Dark Purple Top */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_#1e1b4b_0%,_transparent_40%)] opacity-90" /> {/* Deep Indigo Spot */}

                {/* Rim Light */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_20px_100px_rgba(139,92,246,0.3)]" />

                {/* Crater Details (Simple blurred blobs) */}
                <div className="absolute top-[20%] left-[30%] w-[10%] h-[5%] bg-black/20 blur-xl rounded-full" />
                <div className="absolute top-[40%] right-[30%] w-[15%] h-[8%] bg-black/30 blur-2xl rounded-full" />
            </div>

            {/* Ring System */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[30%] border-[2px] border-white/5 rounded-[50%] skew-x-12 blur-[1px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[40%] border-[40px] border-white/5 rounded-[50%] skew-x-12 blur-3xl opacity-30" />
        </div>
    );
}
