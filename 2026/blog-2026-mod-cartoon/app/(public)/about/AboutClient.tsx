"use client";

import { NeoIcon } from "@/components/ui/neo-icon";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as LucideIcons from "lucide-react";
import { Download, Sparkles } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Helper to look up icons dynamically
const getIcon = (name: string) => {
    // defaults
    const Fallback = LucideIcons.Sparkles;
    if (!name) return Fallback;
    // @ts-ignore
    return LucideIcons[name] || Fallback;
};

interface AboutClientProps {
    settings: {
        aboutHeroTitle1: string;
        aboutHeroTitle2: string;
        aboutHeroDescription: string;
        aboutSkills: any[]; // JSON
        aboutVibeCards: any[]; // JSON
        // fallback legacy fields if needed
        githubUrl?: string;
        resumeUrl?: string;
        twitterUrl?: string;
    }
}

export default function AboutClient({ settings }: AboutClientProps) {
    const mainRef = useRef<HTMLDivElement>(null);
    const skillsContainerRef = useRef<HTMLDivElement>(null);
    const vibeContainerRef = useRef<HTMLDivElement>(null);

    // Default Fallbacks if JSON is empty/null
    const skills = (Array.isArray(settings.aboutSkills) && settings.aboutSkills.length > 0)
        ? settings.aboutSkills
        : [
            { icon: "PenTool", title: "产品设计", desc: "从交互逻辑到视觉呈现，我注重每一个像素的完美。" },
            { icon: "Code", title: "前端开发", desc: "精通 React & Next.js。追求极致的性能优化。" },
            { icon: "Terminal", title: "全栈架构", desc: "Node.js, Prisma, Postgres... 构建坚实可靠的后端服务。" }
        ];

    const vibeCards = (Array.isArray(settings.aboutVibeCards) && settings.aboutVibeCards.length > 0)
        ? settings.aboutVibeCards
        : [
            { icon: "Music", title: "音乐控", desc: "Lo-Fi & EDM 是燃料", color: "bg-[#A855F7]", rot: -5 },
            { icon: "Coffee", title: "咖啡续命", desc: "手冲爱好者", color: "bg-black", text: "text-[#FACC15]", rot: 3 },
            { icon: "Gamepad2", title: "头号玩家", desc: "虚拟世界灵感", color: "bg-[#4ADE80]", rot: -2 },
            { icon: "Camera", title: "摄影", desc: "记录光影瞬间", color: "bg-white", rot: 6 },
        ];


    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Hero Parallax
            gsap.to(".hero-mascot", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // 2. Horizontal Scroll for Skills
            const scrollContainer = document.querySelector(".skills-track");
            if (scrollContainer) {
                const scrollWidth = scrollContainer.scrollWidth;
                const windowWidth = window.innerWidth;
                const amountToScroll = scrollWidth - windowWidth;

                gsap.to(scrollContainer, {
                    x: -amountToScroll,
                    ease: "none",
                    scrollTrigger: {
                        trigger: skillsContainerRef.current,
                        pin: true,
                        scrub: 1,
                        snap: 1 / (skills.length - 1 || 1), // Dynamic snap
                        end: () => "+=" + (windowWidth * 3),
                        anticipatePin: 1
                    }
                });
            }

            // 3. Stacking Cards for Vibe
            const cards = gsap.utils.toArray(".vibe-card") as HTMLElement[];
            if (cards.length > 0) {
                // Initial State: First card visible (Anchor), others hidden below
                gsap.set(cards[0], { y: 0, scale: 1, opacity: 1, rotation: vibeCards[0].rot });
                gsap.set(cards.slice(1), { y: window.innerHeight, opacity: 0 });

                ScrollTrigger.create({
                    trigger: vibeContainerRef.current,
                    start: "top top",
                    end: "+=3000",
                    pin: true,
                    scrub: true,
                    animation: gsap.timeline()
                        .to(cards.slice(1), {
                            y: 0,
                            scale: 1,
                            opacity: 1,
                            stagger: 0.5,
                            duration: 1,
                            ease: "power2.out"
                        })
                });
            }

        }, mainRef);

        return () => ctx.revert();
    }, [skills, vibeCards]); // Re-run if data changes (though it shouldn't on client)

    return (
        <div ref={mainRef} className="w-full bg-white overflow-x-hidden">

            {/* ============================================
                Hero Section (Parallax)
            ============================================ */}
            <section className="hero-section relative !h-screen !w-screen !left-0 !top-0 !m-0 !max-w-none flex items-center justify-center px-6 lg:px-12 py-24 overflow-hidden bg-white">
                {/* Background Decor */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-[#FACC15] rounded-full blur-[100px] opacity-20 animate-pulse" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#A855F7] rounded-full blur-[100px] opacity-20 animate-pulse delay-75" />

                {/* Massive Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[20vw] text-black/[0.02] select-none pointer-events-none whitespace-nowrap z-0">
                    CREATOR
                </div>

                <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    {/* Left: Text Content */}
                    <div className="flex flex-col items-start space-y-8 hero-text">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                            <Sparkles className="w-4 h-4 text-[#FACC15]" />
                            <span>关于我 / ABOUT ME</span>
                        </div>

                        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[1.0] uppercase">
                            {settings.aboutHeroTitle1}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#FACC15] decoration-clone">
                                {settings.aboutHeroTitle2}
                            </span>
                        </h1>

                        <p className="text-xl lg:text-2xl font-medium text-black/70 max-w-lg leading-relaxed whitespace-pre-line">
                            {settings.aboutHeroDescription}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <a href={settings.resumeUrl || "#"} target="_blank" className="neo-button bg-[#FACC15] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2">
                                <Download className="w-5 h-5" />
                                下载简历
                            </a>
                            <a href={settings.githubUrl || "#"} className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-black hover:bg-black hover:text-white transition-all flex items-center gap-2">
                                <LucideIcons.Github className="w-5 h-5" />
                                Github
                            </a>
                        </div>
                    </div>

                    {/* Right: Visual / Mascot (Parallaxed) */}
                    <div className="hero-mascot relative w-full aspect-square max-w-md mx-auto lg:ml-auto perspective-1000 group">
                        {/* Neo Frame */}
                        <div className="absolute inset-0 bg-[#A855F7] rounded-3xl border-3 border-black transform rotate-6 translate-x-4 translate-y-4 group-hover:rotate-3 transition-transform duration-500 ease-out" />
                        <div className="absolute inset-0 bg-white rounded-3xl border-3 border-black overflow-hidden z-10 transform group-hover:-translate-y-2 transition-transform duration-500 ease-out flex items-center justify-center bg-grid-black/5">
                            <Image
                                src="/parallax/mascot_v3.png"
                                alt="Mascot"
                                fill
                                className="object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Floating Badges */}
                        <div className="absolute -top-6 -right-6 bg-white border-2 border-black px-4 py-2 rounded-lg shadow-neo font-bold transform rotate-12 z-20 animate-bounce delay-1000 flex items-center gap-2">
                            <NeoIcon icon={LucideIcons.Code} size={24} iconSize={14} color="bg-[#4ADE80]" className="border border-black" />
                            <span>全栈开发</span>
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-[#FACC15] border-2 border-black px-4 py-2 rounded-lg shadow-neo font-bold transform -rotate-6 z-20 animate-bounce delay-700 flex items-center gap-2">
                            <NeoIcon icon={LucideIcons.Palette} size={24} iconSize={14} color="bg-[#A855F7]" className="border border-black" />
                            <span>UI/UX 设计</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
                Horizontal Scroll Skills Section
            ============================================ */}
            <section ref={skillsContainerRef} className="relative !h-screen !w-screen !left-0 !top-0 !m-0 !max-w-none bg-black text-white flex flex-col justify-center overflow-hidden">
                <div className="absolute top-12 left-12 z-20">
                    <h2 className="text-6xl font-black uppercase tracking-tight mb-2">
                        我的<span className="text-[#4ADE80]">技能库</span>
                    </h2>
                    <p className="text-white/50 text-xl">Scroll to explore &rarr;</p>
                </div>

                <div className="skills-track flex flex-nowrap h-[60vh] gap-12 px-12 items-center w-max">
                    {skills.map((skill: any, index: number) => {
                        const Icon = getIcon(skill.icon);
                        const hoverColors = ["hover:bg-[#FACC15]", "hover:bg-[#A855F7]", "hover:bg-[#4ADE80]"];
                        const hoverColor = skill.hoverColor || hoverColors[index % hoverColors.length];

                        // Dynamic text color based on background brightness
                        let hoverText = 'hover:text-black';
                        if (
                            hoverColor.includes('bg-[#A855F7]') || // Purple
                            hoverColor.includes('bg-black') ||      // Black
                            hoverColor.includes('bg-blue-500') ||   // Blue
                            hoverColor.includes('bg-red-500')       // Red
                        ) {
                            hoverText = 'hover:text-white';
                        }

                        return (
                            <div key={index} className={`skill-card w-[80vw] md:w-[60vw] h-full bg-[#1a1a1a] border border-white/10 p-12 rounded-3xl flex flex-col justify-between shrink-0 ${hoverColor} ${hoverText} transition-colors duration-500 group`}>
                                <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center group-hover:bg-black/10">
                                    <Icon className="w-12 h-12" />
                                </div>
                                <div>
                                    <h3 className="text-6xl font-black mb-6">{skill.title}</h3>
                                    <p className="text-2xl font-medium opacity-60 leading-relaxed">
                                        {skill.desc}
                                    </p>
                                </div>
                                <div className="text-[10rem] font-black opacity-5 self-end leading-none -mb-10 -mr-10">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* ============================================
                Vibe Section (Card Stacking)
            ============================================ */}
            <section ref={vibeContainerRef} className="relative !h-screen !w-screen !left-0 !top-0 !m-0 !max-w-none bg-[#FACC15] text-black">
                <div className="h-full flex flex-col items-center justify-center overflow-hidden">
                    <div className="text-center mb-12 relative z-50">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full font-bold text-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] mb-6">
                            <Sparkles className="w-4 h-4 text-[#FACC15]" />
                            <span>代码之外 / BEYOND CODE</span>
                        </div>
                        <h2 className="text-7xl font-black uppercase tracking-tight">
                            生活 & <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">灵感</span>
                        </h2>
                    </div>

                    <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
                        {vibeCards.map((item: any, index: number) => {
                            const Icon = getIcon(item.icon);
                            const textColor = item.textColor || item.text || 'text-black';
                            const iconColor = item.iconColor || item.text || 'text-white';

                            return (
                                <div
                                    key={index}
                                    className={`vibe-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[450px] ${item.color} ${textColor} border-4 border-black rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center items-center text-center origin-bottom`}
                                    style={{ zIndex: index + 10, transform: `rotate(${item.rot}deg)` }}
                                >
                                    <Icon className={`w-20 h-20 mb-6 ${iconColor}`} />
                                    <h3 className={`text-4xl font-black mb-4`}>{item.title}</h3>
                                    <p className="font-bold text-xl opacity-80">{item.desc}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="absolute bottom-12 z-50">
                        <a href="mailto:huangrx6@foxmail.com" className="h-16 px-10 text-xl bg-black text-white hover:bg-white hover:text-black border-3 border-black shadow-[6px_6px_0px_0px_white] hover:shadow-[6px_6px_0px_0px_black] rounded-xl font-black flex items-center gap-3 transition-all">
                            <LucideIcons.Mail className="w-6 h-6" />
                            现在联系我 / CONTACT
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}
