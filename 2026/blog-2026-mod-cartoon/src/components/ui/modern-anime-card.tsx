"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ModernAnimeCardProps {
    name: string;
    description?: string | null;
    avatar?: string | null;
    url: string;
    index?: number;
}

export function ModernAnimeCard({ name, description, avatar, url, index = 0 }: ModernAnimeCardProps) {
    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full max-w-[340px] aspect-[3/4] mx-auto select-none"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.02, rotate: 1 }}
        >
            {/* --- CARD SHAPE CONSTANT --- */}
            {/* Using basic skew transform instead of complex clip-path for easier shadow handling, or outer container for shadow */}

            <div className="relative w-full h-full bg-[#050510] border border-white/10 overflow-hidden group-hover:border-cyan-400 transition-colors duration-300 shadow-2xl">

                {/* --- BACKGROUND IMAGE (Avatar as Cover) --- */}
                <div className="absolute inset-0 z-0">
                    {avatar ? (
                        <img
                            src={avatar}
                            alt={name}
                            className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#0a0a1a] flex items-center justify-center opacity-50">
                            <span className="text-4xl font-black text-[#ffffff]/10">NO SIGNAL</span>
                        </div>
                    )}
                    {/* Dark gradient overlay at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-300" />
                </div>

                {/* --- DECORATIVE ELEMENTS --- */}
                {/* Top Right 'Rank' */}
                <div className="absolute top-0 right-0 p-3 z-20">
                    <div className="bg-white text-black font-black font-bangers text-xl px-2 py-1 transform skew-x-[-10deg]">
                        RANK {String(index + 1).padStart(2, '0')}
                    </div>
                </div>

                {/* Flash Line */}
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-shine z-10" />

                {/* --- CONTENT LAYER --- */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full pointer-events-none">

                    {/* Animated Line */}
                    <div className="w-12 h-1 bg-cyan-500 mb-4 group-hover:w-full transition-all duration-300 ease-out" />

                    <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase font-zcool drop-shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {name}
                    </h3>

                    <p className="text-gray-400 font-bold font-mono text-xs mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                        {description || "A mysterious signal from the depths of the web."}
                    </p>

                    {/* Action Icon */}
                    <div className="absolute bottom-4 right-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <ArrowUpRight size={32} />
                    </div>
                </div>

                {/* --- BORDER CORNERS --- */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20" />

            </div>
        </motion.a>
    );
}
