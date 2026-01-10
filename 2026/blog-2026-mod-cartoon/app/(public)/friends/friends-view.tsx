"use client";

import { AnimeStarBackground } from "@/components/ui/anime-star-background";
import { MechaShip } from "@/components/ui/mecha-ship";
import { ModernAnimeCard } from "@/components/ui/modern-anime-card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Shield, Zap } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

interface FriendLink {
    id: string;
    name: string;
    description: string | null;
    avatar: string | null;
    url: string;
    active: boolean;
    style: string;
}

export function FriendsView({ links }: { links: FriendLink[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const applyRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const rocketRef = useRef<HTMLDivElement>(null);
    const [isDeployed, setIsDeployed] = useState(false);

    // Use real links.
    const displayLinks = links;

    const applyCode = `{
  "name": "你的昵称",
  "url": "https://your.site",
  "avatar": "https://...",
  "desc": "一句话介绍..."
}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(applyCode);
        toast.success("协议代码已复制 | Protocol Copied");
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Parallax Stars (Background Depth)
            gsap.to(".star-layer-1", {
                y: -100,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5
                }
            });
            gsap.to(".star-layer-2", {
                y: -300,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // 2. Title Float
            gsap.to(".hero-title", {
                y: 150,
                opacity: 0,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom center",
                    scrub: true
                }
            });

            // 3. THE SIGNAL PATH ANIMATION
            // Calculate path length
            if (pathRef.current && containerRef.current) {
                const length = pathRef.current.getTotalLength();
                gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

                // Animate the line drawing
                gsap.to(pathRef.current, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1
                    }
                });

                // Animate the Rocket following the path (simplified mapping)
                // We use motionPath plugin usually, but for vertical scroll simple mapping is okay-ish,
                // But honestly a simple 'y' movement synced with scroll is safer for stability without MotionPathPlugin
                gsap.to(rocketRef.current, {
                    y: containerRef.current.scrollHeight - window.innerHeight,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1
                    }
                });
            }

            // 4. MECHA SHIP FLIGHT ANIMATION - REFINED
            // Fly in from Left (-100vw) to Center (0vw)
            // Spraying fire (handled by component internal state visually)
            gsap.set(".mecha-ship-container", {
                x: "-120vw",
                y: "20vh", // Start slightly lower
                scale: 0.8,
                rotation: -5,
                opacity: 1
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: applyRef.current,
                    start: "top 80%", // START EARLIER
                    end: "center center",
                    scrub: 1,
                    onLeave: () => setIsDeployed(true),
                    onEnterBack: () => setIsDeployed(false)
                }
            });

            tl.to(".mecha-ship-container", {
                x: "0vw",
                y: "0vh",
                scale: 1,
                rotation: 0,
                duration: 2,
                ease: "power4.out" // Fast arrival, slow landing
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <AnimeStarBackground className="font-sans selection:bg-cyan-500 selection:text-black overflow-hidden" >

            {/* --- SVG SIGNAL PATH LAYER --- */}
            <div className="absolute inset-0 z-0 pointer-events-none w-full h-full opacity-40">
                <svg className="w-full h-full text-white/20 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" preserveAspectRatio="none">
                    <path
                        ref={pathRef}
                        d="M 50% 100 Q 45% 400 55% 800 T 50% 1600 T 45% 2400 T 50% 3200"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* --- STAR LAYERS --- */}
            {/* Removed as AnimeStarBackground handles this */}


            <div className="relative w-full max-w-[1920px] mx-auto overflow-x-hidden z-10">

                {/* --- ROCKET FOLLOWER --- */}
                <div ref={rocketRef} className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                    <div className="relative">
                        <div className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_20px_cyan] animate-pulse" />
                        <div className="absolute top-3 transform -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-cyan-400 to-transparent opacity-50" />
                    </div>
                </div>


                {/* --- SECTION 1: HERO (星海) --- */}
                <section ref={heroRef} className="h-screen w-full flex flex-col items-center justify-center relative p-6 snap-start">
                    <div className="hero-title text-center relative z-20">
                        <div className="inline-flex items-center gap-4 mb-10 px-6 py-2 border border-white/20 bg-black/50 backdrop-blur-md clip-path-polygon-[10px_0,_100%_0,_100%_100%,_0_100%,_0_10px]">
                            <div className="flex gap-1">
                                <span className="w-1 h-4 bg-cyan-500 animate-pulse" />
                                <span className="w-1 h-4 bg-cyan-500/50" />
                                <span className="w-1 h-4 bg-cyan-500/20" />
                            </div>
                            <span className="text-sm font-bold tracking-[0.3em] text-cyan-50 uppercase font-bangers">Signal Detected</span>
                        </div>

                        <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter text-transparent bg-clip-text bg-white mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] font-zcool">
                            星海同游
                        </h1>

                        <div className="flex items-center justify-center gap-4 text-white/50 font-mono text-sm tracking-widest">
                            <span>COORDINATES: 42.000 / 99.999</span>
                            <span>///</span>
                            <span>STATUS: SCANNING</span>
                        </div>
                    </div>

                    {/* SCROLL INDICATOR */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
                        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                            <div className="w-1 h-2 bg-white rounded-full animate-scroll-down" />
                        </div>
                        <span className="text-[10px] font-mono tracking-widest text-white/80">SCROLL</span>
                    </div>
                </section>


                {/* --- SECTION 2: THE GRID (漫游者) --- */}
                <section ref={gridRef} className="min-h-screen w-full flex flex-col items-center justify-center relative py-20 px-6 md:px-12 snap-start">

                    {/* NO GIANT PLANET - PURE VOID */}

                    <div className="max-w-[1600px] w-full mx-auto relative z-10">
                        <div className="text-center mb-24">
                            <h2 className="text-6xl md:text-8xl font-black text-white mb-6 font-zcool tracking-tight italic transform -skew-x-6">
                                漫游者联盟
                            </h2>
                            <p className="text-cyan-500 font-bold font-mono text-sm uppercase tracking-[1em]">// AGENT_LIST_LOADED</p>
                        </div>

                        {displayLinks.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
                                {displayLinks.map((link, index) => (
                                    <ModernAnimeCard
                                        key={link.id}
                                        name={link.name}
                                        description={link.description}
                                        avatar={link.avatar}
                                        url={link.url}
                                        index={index}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="h-[300px] flex items-center justify-center border border-dashed border-white/20 bg-black/40 backdrop-blur-sm">
                                <p className="text-white/40 font-bold text-2xl font-bangers tracking-widest uppercase">Scanner Empty...</p>
                            </div>
                        )}
                    </div>
                </section>


                {/* --- SECTION 3: THE MECHA SHIP (APPLY) --- */}
                <section ref={applyRef} className="h-screen w-full flex items-center justify-center relative px-6 snap-start overflow-hidden">

                    {/* HANGAR ENVIRONMENT LAYER */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        {/* 1. Perspective Floor Grid */}
                        <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-[linear-gradient(transparent_0%,rgba(6,182,212,0.1)_100%)] perspective-[1000px] origin-bottom transform-style-3d">
                            <div className="w-full h-full absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(6,182,212,0.3)_25%,rgba(6,182,212,0.3)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.3)_75%,rgba(6,182,212,0.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(6,182,212,0.3)_25%,rgba(6,182,212,0.3)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.3)_75%,rgba(6,182,212,0.3)_76%,transparent_77%,transparent)] bg-[length:100px_100px] [transform:rotateX(60deg)_scale(2)] opacity-30 mask-image-gradient-to-t-transparent-black" />
                        </div>

                        {/* 2. Giant Background Typography */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/5 whitespace-nowrap font-zcool scale-150 select-none">
                            DOCK-03
                        </div>

                        {/* 3. Side Structural Beams */}
                        <div className="absolute left-0 top-0 h-full w-24 bg-[repeating-linear-gradient(0deg,transparent_0,transparent_99px,rgba(6,182,212,0.2)_100px)] border-r border-white/10 hidden md:block" />
                        <div className="absolute right-0 top-0 h-full w-24 bg-[repeating-linear-gradient(0deg,transparent_0,transparent_99px,rgba(6,182,212,0.2)_100px)] border-l border-white/10 hidden md:block" />

                        {/* 4. Bottom Safety Line & Deck Plate (Replaces minimal footer) */}
                        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end pb-4 border-t border-white/10">
                            <div className="w-full h-2 bg-[repeating-linear-gradient(45deg,#000_0,#000_20px,#facc15_20px,#facc15_40px)] opacity-50 mb-2" />
                            <div className="flex justify-between items-center px-12 text-[10px] text-white/30 font-mono uppercase tracking-[0.2em]">
                                <span>SYSTEM_READY</span>
                                <span>/// MISSION STATUS: GREEN ///</span>
                                <span>SECURE_CONNECTION</span>
                            </div>
                        </div>
                    </div>

                    {/* The Ship Container - Controlled by GSAP */}
                    <div className="mecha-ship-container w-full max-w-6xl z-20">
                        <MechaShip isOpen={isDeployed}>
                            <div className="grid md:grid-cols-2 gap-12 items-center">

                                {/* Text Content */}
                                <div className="space-y-8">
                                    <div className="border-l-4 border-cyan-500 pl-6">
                                        <h2 className="text-6xl font-black text-white leading-none font-zcool mb-2 italic">
                                            接入<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">协议</span>
                                        </h2>
                                        <div className="text-sm text-gray-500 font-mono tracking-[0.2em] mt-2">
                                            // UPLINK_ESTABLISHED
                                        </div>
                                    </div>
                                    <p className="text-gray-300 font-bold text-xl leading-relaxed font-zcool">
                                        发射你的信号到这片星域。只要频率相同，我们终会相遇。
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-[#1a1a1a] p-4 border border-[#333] hover:border-cyan-500 transition-colors group">
                                            <Shield size={24} className="text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                                            <span className="font-bold font-zcool text-white tracking-wide block">需包含原创内容</span>
                                        </div>
                                        <div className="bg-[#1a1a1a] p-4 border border-[#333] hover:border-cyan-500 transition-colors group">
                                            <Zap size={24} className="text-yellow-500 mb-2 group-hover:scale-110 transition-transform" />
                                            <span className="font-bold font-zcool text-white tracking-wide block">支持 HTTPS 协议</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Form/Code */}
                                <div className="relative bg-[#080808] border border-[#222] p-8 shadow-2xl">
                                    <div className="flex justify-between items-center mb-6 border-b border-[#222] pb-4">
                                        <span className="text-xs bg-cyan-900/20 text-cyan-400 px-2 py-1 font-mono font-bold">DATA_PACKET.JSON</span>
                                        <button onClick={handleCopy} className="text-xs text-gray-500 hover:text-white uppercase font-black tracking-widest transition-colors font-mono cursor-pointer flex items-center gap-1">
                                            [ COPY ]
                                        </button>
                                    </div>

                                    <pre className="font-mono text-sm text-green-500 font-bold overflow-x-auto whitespace-pre-wrap leading-relaxed select-all mb-8">
                                        {applyCode}
                                    </pre>

                                    <button className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xl transition-all flex items-center justify-center gap-3 font-zcool uppercase tracking-widest italic transform skew-x-[-10deg] hover:skew-x-[-20deg] shadow-[5px_5px_0px_#000]">
                                        <Send size={24} />
                                        <span>发射满功率信号</span>
                                    </button>
                                </div>

                            </div>
                        </MechaShip>
                    </div>

                </section>

                {/* --- SECTION 4: DECK FOUNDATION (FOOTER) --- */}
                {/* 整个section是100vh，60vh内容区域垂直居中 */}
                <section className="h-screen w-full flex flex-col items-center justify-center relative snap-start overflow-hidden">
                    {/* 内容区域：只有60vh高度，带背景 */}
                    <div className="h-[60vh] w-full bg-[#050505] border-t border-b border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Background Detail: Floor Grating */}
                        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] mask-image-gradient-to-b-transparent-black" />

                        {/* Giant Graphic Number - 缩小并限制在容器内 */}
                        <div className="absolute right-0 bottom-0 text-[15vw] font-black text-white/5 font-zcool leading-none select-none">
                            BL-04
                        </div>

                        <div className="relative z-10 text-center space-y-8">
                            {/* Animated Logo / Icon */}
                            <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10 animate-pulse">
                                <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white/40 font-zcool tracking-widest uppercase">
                                    通讯结束
                                </h3>
                                <p className="text-xs text-white/20 font-mono tracking-[0.5em]">
                                    // END_OF_TRANSMISSION
                                </p>
                            </div>

                            <div className="pt-12 border-t border-white/5 w-64 mx-auto">
                                <p className="text-[10px] text-white/10 font-mono">
                                    SYSTEM INTEGRITY: 100%<br />
                                    FLUX CAPACITOR: ONLINE
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </AnimeStarBackground>
    );
}
