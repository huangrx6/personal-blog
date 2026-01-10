"use client";

import gsap from "gsap";
import { CheckCircle2, Feather, Rocket, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

export function FeatureGrid() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".feature-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            gsap.to(".floating-icon", {
                y: -15,
                rotation: 5,
                duration: 2.5,
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full min-h-screen bg-white py-20 px-6 md:px-12 flex items-center">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-center">

                {/* Left: Big Statement */}
                <div className="flex flex-col justify-center lg:pr-10 relative">
                    <h2 className="text-[10vw] lg:text-[6vw] font-black leading-[0.9] tracking-tighter italic uppercase mb-8">
                        极致 <br /> <span className="text-secondary">顺滑</span>
                    </h2>
                    <p className="text-2xl lg:text-3xl font-bold mb-10 text-black/70 leading-relaxed">
                        没有繁杂的加载，只有纯粹的内容。<br />
                        这就是 2026 年博客该有的样子。
                    </p>
                    <button className="neo-button bg-black text-white w-fit px-8 py-4 rounded-full font-bold text-lg hover:bg-primary hover:text-black transition-colors shadow-neo">
                        阅读文章 ↗
                    </button>

                    {/* Floating Icon Decoration */}
                    <div className="flex floating-icon absolute right-0 top-0 lg:right-20 lg:top-[-30px] p-5 border-4 border-black rounded-full bg-[#FACC15] shadow-neo-lg z-10">
                        <Zap className="w-12 h-12 text-black" />
                    </div>
                </div>

                {/* Right: Feature Cards */}
                <div className="grid grid-cols-1 gap-8">

                    {/* Card 1: Purple - Performance */}
                    <div className="feature-card neo-card bg-secondary p-8 md:p-10 flex flex-col justify-between min-h-[300px] rotate-[-1deg] hover:rotate-0 transition-transform">
                        <div>
                            <h3 className="text-4xl font-black mb-4">快如闪电</h3>
                            <p className="text-2xl font-bold leading-relaxed text-white">
                                "这加载速度... 是本地应用吗？Next.js 的性能优化被发挥到了极致。"
                            </p>
                        </div>
                        <div className="flex items-center gap-2 mt-8 font-black text-lg bg-black text-white w-fit px-4 py-2 rounded-full">
                            <Rocket className="w-5 h-5" /> Google Lighthouse 100分
                        </div>
                    </div>

                    {/* Card 2: Orange - Content */}
                    <div className="feature-card neo-card bg-highlight p-8 md:p-10 flex flex-col justify-between min-h-[300px] relative overflow-hidden rotate-[1deg] hover:rotate-0 transition-transform">
                        <div>
                            <h3 className="text-4xl font-black italic uppercase leading-none mb-4">
                                沉浸式 <br /> 阅读体验
                            </h3>
                            <p className="text-xl font-bold text-black/80">
                                无论白天黑夜，精心调教的排版和配色，让阅读成为一种享受。
                            </p>
                        </div>

                        {/* Illustrative Icons */}
                        <div className="absolute bottom-6 right-6 flex gap-3">
                            <div className="bg-[#4ADE80] p-3 rounded-full border-3 border-black shadow-neo animate-bounce duration-[2000ms]">
                                <Feather className="w-8 h-8 text-black" />
                            </div>
                            <div className="bg-[#60A5FA] p-3 rounded-full border-3 border-black shadow-neo animate-pulse">
                                <CheckCircle2 className="w-8 h-8 text-black" />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
