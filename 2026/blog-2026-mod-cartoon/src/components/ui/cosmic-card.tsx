"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface CosmicCardProps {
    name: string;
    description?: string | null;
    avatar?: string | null;
    url: string;
    index?: number;
}

export function CosmicCard({ name, description, avatar, url, index = 0 }: CosmicCardProps) {
    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block h-[280px] w-full max-w-[300px] mx-auto select-none"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05, duration: 0.8, type: "spring", bounce: 0.3 }}
        >
            {/* Glass Container */}
            <div
                className={cn(
                    "relative h-full w-full overflow-hidden rounded-[32px] transition-all duration-500",
                    "bg-white/5 backdrop-blur-2xl border border-white/10",
                    "hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]",
                    "flex flex-col items-center justify-center p-6 text-center"
                )}
            >
                {/* Ethereal Glow Blob (Background) */}
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl" />

                {/* Avatar */}
                <div className="relative mb-5 group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-lg group-hover:border-white/50 transition-colors relative z-10">
                        {avatar ? (
                            <img src={avatar} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black" />
                        )}
                    </div>
                    {/* Glow Ring */}
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 scale-125" />
                </div>

                {/* Text Content */}
                <div className="relative z-10 space-y-2">
                    <h3 className="text-lg font-bold text-white/90 tracking-wide group-hover:text-white transition-colors">
                        {name}
                    </h3>
                    <p className="text-xs text-white/50 line-clamp-2 leading-relaxed font-light px-2 h-[2.5em]">
                        {description || "探索未知的信号..."}
                    </p>
                </div>

                {/* Visit Indicator (Fade in) */}
                <div className="absolute bottom-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-white/70 bg-white/10 px-3 py-1 rounded-full border border-white/5">
                        <span>Visit Signal</span>
                        <ExternalLink size={10} />
                    </div>
                </div>
            </div>
        </motion.a>
    );
}
