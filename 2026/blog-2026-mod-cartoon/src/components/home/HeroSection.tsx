"use client";

import { LiveText } from "@/components/ui/live-text";
import { NeoIcon } from "@/components/ui/neo-icon";
import { Typewriter } from "@/components/ui/typewriter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Box, Layers, Sparkles, Terminal } from "lucide-react";
import { useEffect, useRef } from "react";
import { AnimatedDoodle } from "./AnimatedDoodle";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // 1. Initial Reveal (Smoother, less aggressive)
            const tl = gsap.timeline();
            tl.from(titleRef.current, {
                y: 50, // Reduced from 100
                opacity: 0,
                rotateX: -15, // Reduced from -45
                duration: 1.2,
                ease: "power3.out"
            })
                .from(".hero-card", {
                    y: 100, // Reduced from 200
                    opacity: 0,
                    stagger: 0.1,
                    rotate: 5, // Reduced from 10
                    duration: 1,
                    ease: "back.out(1.2)"
                }, "-=0.8");

            // 2. Parallax Scroll Effect (Subtler)
            gsap.to(".hero-parallax", {
                yPercent: -10, // Reduced from -20
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // 3. Card Spread on Scroll (Reduced movement)
            gsap.to(".hero-card", {
                rotation: (i) => (i - 1) * 3, // Reduced spread angle
                y: (i) => (i === 1 ? -15 : 0), // Reduced vertical move
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top", // Spread over full section height so it doesn't finish too early
                    scrub: 1
                }
            });

            // 4. Floating Icons Animation
            gsap.to(".floating-icon", {
                y: -15,
                rotation: 10,
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: {
                    each: 1,
                    from: "random"
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full h-screen min-h-[800px] bg-white flex flex-col items-center justify-center relative overflow-hidden pt-24"
        >
            {/* Background Noise used to be here, keeping it clean for now or ensuring it's not distracting */}

            {/* Main Layout Grid */}
            <div className="w-full max-w-[1800px] h-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 lg:px-12 items-center">

                {/* Left: Typography & CTA */}
                <div ref={titleRef} className="flex flex-col items-start z-10 hero-parallax space-y-2">
                    <h1 className="text-[10vw] lg:text-[6vw] leading-[0.9] font-black tracking-tighter uppercase relative z-20">
                        <div className="block">
                            <LiveText text="拒绝枯燥" outline />
                        </div>
                        <div className="block relative">
                            <LiveText text="即刻硬核" />
                        </div>

                        {/* Falling Icon: Sparkles (Bottom Right) */}
                        <div className="floating-icon absolute -bottom-8 -right-4 md:-right-12 z-30 transform rotate-12 hidden md:block">
                            <NeoIcon icon={Sparkles} size={56} iconSize={28} color="bg-[#4ADE80]" />
                        </div>
                    </h1>
                    <div className="text-xl lg:text-2xl font-bold uppercase tracking-widest text-black/60 max-w-lg leading-relaxed h-[60px] flex items-center pt-4">
                        <Typewriter text="不仅仅是极客，这里更是你的数字游乐场" delay={1500} speed={150} deleteSpeed={80} waitTime={3000} />
                    </div>

                    <button className="neo-button bg-black text-white px-10 py-5 rounded-full font-bold text-xl hover:scale-110 transition-transform shadow-neo-lg group flex items-center gap-3">
                        开始探索 <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Right: Illustration & Cards Layer */}
                <div className="relative h-full flex items-center justify-center">

                    {/* The Dynamic Doodle Layer (Behind cards) */}
                    <div className="absolute inset-0 z-0 scale-110 opacity-80 pointer-events-none">
                        <AnimatedDoodle />
                    </div>

                    {/* Floating Cards Container - Centered better */}
                    <div ref={cardsRef} className="relative z-10 w-full max-w-md aspect-square flex items-center justify-center perspective-1000">

                        {/* Card 1: Power Users (Purple) */}
                        <div className="hero-card absolute w-[80%] aspect-[4/3] bg-secondary neo-card p-6 rotate-[-3deg] hover:z-50 hover:scale-105 transition-all shadow-neo-lg">
                            <Box className="w-10 h-10 mb-3" />
                            <h2 className="text-3xl font-black italic uppercase">硬核<br />玩家</h2>
                        </div>

                        {/* Card 2: Developers (Blue) */}
                        <div className="hero-card absolute w-[80%] aspect-[4/3] bg-accent neo-card p-6 rotate-2 hover:z-50 hover:scale-105 transition-all shadow-neo-lg translate-y-4">
                            <Terminal className="w-10 h-10 mb-3" />
                            <h2 className="text-3xl font-black italic uppercase">代码<br />狂魔</h2>
                        </div>

                        {/* Card 3: Creative (Yellow) */}
                        <div className="hero-card absolute w-[80%] aspect-[4/3] bg-primary neo-card p-6 rotate-[6deg] hover:z-50 hover:scale-105 transition-all shadow-neo-lg translate-y-8 translate-x-4">
                            <Layers className="w-10 h-10 mb-3" />
                            <h2 className="text-3xl font-black italic uppercase">创意<br />无限</h2>
                        </div>

                    </div>

                    {/* Additional Floating Element Left of Cards */}
                    {/* Removed extra sidebar floating icon */}
                </div>

            </div>
        </section>
    );
}
