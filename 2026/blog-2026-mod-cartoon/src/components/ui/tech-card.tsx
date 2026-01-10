"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import { Cpu, ExternalLink } from "lucide-react";

interface TechCardProps {
    name: string;
    description?: string | null;
    avatar?: string | null;
    url: string;
    index?: number;
}

export function TechCard({ name, description, avatar, url, index = 0 }: TechCardProps) {
    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block h-[380px] w-full max-w-[320px] mx-auto select-none"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            {/* Main Container with Cut Corners */}
            <div
                className={cn(
                    "relative h-full w-full overflow-hidden bg-black/60 backdrop-blur-xl transition-all duration-500",
                    "border border-white/10 group-hover:border-purple-500/50",
                    "clip-path-tech-card" // We'll define this in CSS or use inline style for consistency
                )}
                style={{
                    clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"
                }}
            >
                {/* Holographic Gradient Overlay (Active on Hover) */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/10 group-hover:via-cyan-500/5 group-hover:to-purple-500/10 transition-all duration-700 pointer-events-none" />

                {/* Scanline Effect (CSS only) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
                    style={{
                        backgroundImage: "linear-gradient(to bottom, transparent 50%, #000 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))",
                        backgroundSize: "100% 4px, 6px 100%"
                    }}
                />

                {/* Decorative Tech Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-white/30 group-hover:border-cyan-400 transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-white/30 group-hover:border-purple-400 transition-colors duration-300" />

                {/* Content Container */}
                <div className="relative z-10 flex flex-col h-full p-6">
                    {/* Header: ID & Status */}
                    <div className="flex justify-between items-start mb-6 text-[10px] tracking-[0.2em] text-white/40 font-mono">
                        <span className="group-hover:text-cyan-400 transition-colors">NO.0{index + 1}</span>
                        <div className="flex items-center gap-2">
                            <span className="uppercase">{index % 2 === 0 ? "ONLINE" : "ACTIVE"}</span>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                        </div>
                    </div>

                    {/* Avatar Area */}
                    <div className="relative w-24 h-24 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 ease-out">
                        {/* Spinning Ring */}
                        <div className="absolute -inset-4 border border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite] group-hover:border-cyan-500/50" />
                        <div className="absolute -inset-1 border border-white/10 rounded-full" />

                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10 bg-black relative z-10 group-hover:border-white/50 transition-colors">
                            {avatar ? (
                                <img src={avatar} alt={name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                    <Cpu size={32} className="text-white/20" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="text-center mt-auto mb-4">
                        <h3 className="text-xl font-bold text-white tracking-wider mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                            {name}
                        </h3>
                        <p className="text-xs text-white/50 line-clamp-2 leading-relaxed font-sans min-h-[2.5em]">
                            {description || "No signal data available for this sector."}
                        </p>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center group-hover:border-white/20 transition-colors">
                        <div className="flex gap-2">
                            <div className="h-1 w-1 bg-white/20 rounded-full group-hover:bg-cyan-400 transition-colors delay-100" />
                            <div className="h-1 w-1 bg-white/20 rounded-full group-hover:bg-cyan-400 transition-colors delay-200" />
                            <div className="h-1 w-1 bg-white/20 rounded-full group-hover:bg-cyan-400 transition-colors delay-300" />
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 group-hover:text-white transition-colors uppercase">
                            <span>Initialize</span>
                            <ExternalLink size={12} />
                        </div>
                    </div>
                </div>

                {/* Hover Scanning Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent -translate-y-full group-hover:translate-y-[400px] transition-transform duration-[1.5s] ease-in-out opacity-50" />
            </div>
        </motion.a>
    );
}
