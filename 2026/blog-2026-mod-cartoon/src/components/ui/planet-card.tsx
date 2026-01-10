"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import { ExternalLink, Radio } from "lucide-react";

interface PlanetCardProps {
    name: string;
    description?: string | null;
    avatar?: string | null;
    url: string;
    index?: number;
}

export function PlanetCard({ name, description, avatar, url, index = 0 }: PlanetCardProps) {
    // Generate a pseudo-random color based on name/index to make it feel distinct but cohesive
    const gradients = [
        "from-violet-500/20 to-purple-500/20",
        "from-blue-500/20 to-cyan-500/20",
        "from-pink-500/20 to-rose-500/20",
        "from-emerald-500/20 to-teal-500/20",
    ];
    const gradient = gradients[index % gradients.length];

    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full max-w-[280px] mx-auto select-none"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6, type: "spring", bounce: 0.5 }}
            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
        >
            {/* Main Bubbly Card */}
            <div
                className={cn(
                    "relative overflow-hidden rounded-[40px] border-[3px] border-white/20 transition-all duration-500",
                    "bg-black/30 backdrop-blur-2xl",
                    "group-hover:border-white/50 group-hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)]",
                    "flex flex-col items-center pt-8 pb-6 px-4"
                )}
            >
                {/* Internal Gradient Blob */}
                <div className={cn("absolute inset-0 bg-gradient-to-b opacity-50 group-hover:opacity-80 transition-opacity duration-500", gradient)} />

                {/* "Star" noise texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                {/* Avatar "Planet" */}
                <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-[4px] border-white/30 shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500 ease-out">
                        {avatar ? (
                            <img src={avatar} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-slate-800" />
                        )}
                    </div>
                    {/* Ring/Orbit Animation */}
                    <div className="absolute -inset-4 border-2 border-white/10 rounded-full scale-[1] group-hover:scale-[1.2] group-hover:border-white/30 transition-all duration-700" />
                    <div className="absolute top-0 right-0 w-4 h-4 bg-white rounded-full animate-bounce shadow-[0_0_10px_white]" style={{ animationDuration: '2s' }} />
                </div>

                {/* Info Pills */}
                <div className="relative z-10 flex flex-col items-center gap-2 w-full">
                    {/* Name Pill */}
                    <div className="px-5 py-2 bg-black/40 rounded-full border border-white/10 backdrop-blur-md">
                        <h3 className="text-lg font-black text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                            {name}
                        </h3>
                    </div>

                    {/* Desc Bubble */}
                    <div className="w-full min-h-[3em] flex items-center justify-center">
                        <p className="text-xs text-white/70 font-medium text-center line-clamp-2 px-2 leading-relaxed">
                            {description || "A mysterious signal..."}
                        </p>
                    </div>
                </div>

                {/* Signal Icon Footer */}
                <div className="mt-4 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <Radio size={14} className="text-white animate-pulse" />
                    <span className="text-[10px] uppercase font-bold text-white/60 tracking-widest">Connected</span>
                    <ExternalLink size={12} className="text-white ml-1" />
                </div>
            </div>
        </motion.a>
    );
}
