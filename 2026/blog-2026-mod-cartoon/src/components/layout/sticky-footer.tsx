"use client";

import Link from "next/link";

export default function StickyFooter() {
    return (
        <div
            className="relative h-[600px]"
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className="fixed bottom-0 h-[600px] w-full bg-black text-white p-6 md:p-12 flex flex-col justify-between -z-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                    <div className="space-y-4">
                        <h2 className="text-[15vw] md:text-[10vw] font-cartoon leading-[0.8] tracking-wider uppercase text-white drop-shadow-[4px_4px_0px_#0EA5E9]">
                            Build
                        </h2>
                        <h2 className="text-[15vw] md:text-[10vw] font-cartoon leading-[0.8] tracking-wider uppercase text-secondary drop-shadow-[4px_4px_0px_#F43F5E]">
                            Something
                        </h2>
                        <h2 className="text-[15vw] md:text-[10vw] font-cartoon leading-[0.8] tracking-wider uppercase text-primary drop-shadow-[4px_4px_0px_#fff]">
                            Fun!
                        </h2>
                    </div>
                    <div className="flex flex-col gap-6 text-right">
                        <div className="flex flex-col gap-2 font-black text-2xl uppercase tracking-tight">
                            <span className="text-white/50 text-sm font-sans mb-1">Navigation</span>
                            <Link href="/blog" className="hover:text-primary transition-colors hover:translate-x-[-10px]">Read Blog</Link>
                            <Link href="/about" className="hover:text-secondary transition-colors hover:translate-x-[-10px]">About Me</Link>
                            <Link href="/login" className="hover:text-accent transition-colors hover:translate-x-[-10px]">Admin</Link>
                        </div>
                        <div className="flex flex-col gap-2 font-black text-2xl uppercase tracking-tight">
                            <span className="text-white/50 text-sm font-sans mb-1">Socials</span>
                            <a href="#" className="hover:text-primary transition-colors hover:translate-x-[-10px]">GitHub</a>
                            <a href="#" className="hover:text-secondary transition-colors hover:translate-x-[-10px]">Twitter</a>
                        </div>
                    </div>
                </div>

                <div className="w-full border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-bold opacity-60 font-mono">
                    <p>&copy; 2026 Blog Mod Cartoon. Design by UI/UX Pro Max.</p>
                    <p>Made with Next.js 16 & React Bits</p>
                </div>

                {/* Decorative Marquee */}
                <div className="absolute bottom-20 left-0 w-full overflow-hidden opacity-20 pointer-events-none mix-blend-overlay">
                    <div className="whitespace-nowrap animate-marquee text-[10rem] font-cartoon text-white">
                        DESIGN • CODE • CREATE • INSPIRE • REPEAT •
                    </div>
                </div>
            </div>
        </div>
    );
}
