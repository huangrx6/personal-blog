"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";

// 注册 GSAP 插件
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollContextType {
    lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null });

export function useSmoothScroll() {
    return useContext(SmoothScrollContext);
}

interface SmoothScrollProviderProps {
    children: ReactNode;
}

/**
 * 平滑滚动 Provider
 * 使用 Lenis 实现丝滑滚动，并与 GSAP ScrollTrigger 集成
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // 创建 Lenis 实例
        const lenis = new Lenis({
            duration: 1.2, // 滚动持续时间
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            orientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // 将 Lenis 滚动同步到 GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // 使用 GSAP ticker 驱动 Lenis
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // 禁用 GSAP 的 lagSmoothing 以获得更精确的同步
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return (
        <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
            {children}
        </SmoothScrollContext.Provider>
    );
}
