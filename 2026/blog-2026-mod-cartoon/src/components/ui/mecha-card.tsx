"use client";

import { motion } from "framer-motion";
import { ExternalLink, Shield } from "lucide-react";

interface MechaCardProps {
    name: string;
    description?: string | null;
    avatar?: string | null;
    url: string;
    index?: number;
}

export function MechaCard({ name, description, avatar, url, index = 0 }: MechaCardProps) {
    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full max-w-[320px] mx-auto select-none perspective-1000"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "backOut" }}
            whileHover={{ scale: 1.05 }}
        >
            {/* --- MAIN ARMOR CONTAINER --- */}
            <div className="relative bg-[#e6e9ef] border-2 border-[#a1aab9] overflow-hidden transition-all duration-300 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)]
                clip-path-polygon-[20px_0,_100%_0,_100%_calc(100%-20px),_calc(100%-20px)_100%,_0_100%,_0_20px]"
                style={{
                    clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"
                }}
            >

                {/* --- DECORATIVE PANEL LINES --- */}
                <div className="absolute top-0 right-10 w-[1px] h-full bg-[#cbd5e1]" />
                <div className="absolute top-10 left-0 w-full h-[1px] bg-[#cbd5e1]" />
                <div className="absolute bottom-4 right-4 text-[9px] font-black text-black/20 font-mono tracking-widest z-10 rotate-90 origin-bottom-right">
                    RX-78-MOD-{String(index).padStart(2, '0')}
                </div>

                {/* --- HEADER SENSOR --- */}
                <div className="h-2 w-1/3 bg-blue-600 absolute top-0 left-0" />
                <div className="h-2 w-16 bg-yellow-400 absolute top-0 left-[35%] skew-x-[-20deg]" />

                {/* --- INNER FRAME (CONTENT) --- */}
                <div className="p-6 relative z-10 flex flex-col items-center pt-10">

                    {/* Avatar Port */}
                    <div className="relative mb-4 group-hover:-translate-y-2 transition-transform duration-300 ease-out">
                        {/* Mechanical Ring */}
                        <div className="w-24 h-24 rounded-full border-4 border-[#334155] bg-[#1e293b] flex items-center justify-center relative overflow-hidden shadow-inner">
                            {avatar ? (
                                <img src={avatar} alt={name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                            ) : (
                                <div className="w-full h-full bg-[#1e293b] flex items-center justify-center">
                                    <Shield className="text-gray-600" />
                                </div>
                            )}

                            {/* Scanning Line overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/20 to-transparent w-full h-[200%] animate-scanline pointer-events-none" />
                        </div>

                        {/* Status Light */}
                        <div className="absolute -bottom-1 right-1 w-6 h-6 bg-[#1e293b] border-2 border-[#334155] rounded-full flex items-center justify-center z-20">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]" />
                        </div>
                    </div>

                    {/* Text Plate */}
                    <div className="w-full bg-white/50 backdrop-blur-sm border border-black/10 p-3 text-center mb-4 transition-colors group-hover:bg-white/80">
                        <h3 className="text-lg font-black text-slate-800 font-zcool tracking-wide uppercase group-hover:text-blue-700 transition-colors">
                            {name}
                        </h3>
                        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-slate-300 to-transparent my-1" />
                        <p className="text-xs text-slate-500 font-bold font-mono line-clamp-2 h-[2.5em]">
                            {description || "NO DATA AVAILABLE"}
                        </p>
                    </div>

                    {/* Footer / Vents */}
                    <div className="w-full flex justify-between items-center px-2">
                        <div className="flex gap-1">
                            <div className="w-2 h-4 bg-slate-300 rounded-sm" />
                            <div className="w-2 h-4 bg-slate-300 rounded-sm" />
                            <div className="w-2 h-4 bg-slate-300 rounded-sm" />
                        </div>
                        <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                            <ExternalLink size={16} strokeWidth={3} />
                        </div>
                    </div>
                </div>

                {/* --- WARNING STRIPES --- */}
                <div className="absolute bottom-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,#fcd34d,#fcd34d_10px,#000,#000_20px)] opacity-10" />

            </div>
        </motion.a>
    );
}
