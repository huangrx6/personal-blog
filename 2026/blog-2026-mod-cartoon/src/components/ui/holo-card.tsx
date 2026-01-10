"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface HoloCardProps {
    name: string;
    description?: string | null;
    avatar?: string | null;
    url: string;
    index?: number;
}

export function HoloCard({ name, description, avatar, url, index = 0 }: HoloCardProps) {
    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full max-w-[300px] mx-auto select-none perspective-1000"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "circOut" }}
            whileHover={{ scale: 1.02, y: -5 }}
        >
            {/* Holographic Frame */}
            <div
                className={cn(
                    "relative overflow-hidden transition-all duration-300",
                    "bg-black/40 backdrop-blur-xl border border-white/10",
                    "group-hover:border-cyan-400/50 group-hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)]",
                    "clip-path-polygon-[0_0,_100%_0,_100%_85%,_85%_100%,_0_100%]" // Cut corner bottom-right
                )}
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)"
                }}
            >
                {/* Decoration Lines */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500 opacity-50" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500 opacity-50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500 opacity-50" />

                {/* Tech Scan Line Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-[200%] w-full animate-scanline opacity-0 group-hover:opacity-100 pointer-events-none" />

                <div className="p-6 flex flex-col items-center relative z-10">

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-sm animate-pulse" />
                        <span className="text-[9px] font-mono text-cyan-200/60 tracking-wider">ONLINE</span>
                    </div>

                    {/* Avatar Hex/Circle */}
                    <div className="relative mb-5 group-hover:scale-105 transition-transform duration-300">
                        <div className="w-20 h-20 relative">
                            {/* Spinning Ring */}
                            <div className="absolute inset-[-4px] rounded-full border border-dashed border-cyan-500/30 animate-spin-slow" />
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 bg-black">
                                {avatar ? (
                                    <img src={avatar} alt={name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-slate-800" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Name & Desc */}
                    <h3 className="text-xl font-bold text-white tracking-widest font-zcool mb-2 text-center group-hover:text-cyan-400 transition-colors">
                        {name}
                    </h3>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-3" />

                    <p className="text-xs text-white/60 font-medium text-center line-clamp-2 px-1 leading-relaxed font-sans mb-4 min-h-[2.5em]">
                        {description || "No signal data available."}
                    </p>

                    {/* Footer Actions */}
                    <div className="w-full flex justify-between items-end mt-auto pt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-mono text-cyan-300">ID: {String(index).padStart(3, '0')}</span>
                        <div className="p-2 bg-cyan-500/10 rounded-sm text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                            <ExternalLink size={14} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.a>
    );
}
