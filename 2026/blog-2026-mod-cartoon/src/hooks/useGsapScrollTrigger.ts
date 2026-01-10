"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

// 注册 ScrollTrigger 插件
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP ScrollTrigger Hook
 * 提供 ScrollTrigger 的 React 生命周期管理
 */
export function useGsapScrollTrigger() {
    const contextRef = useRef<gsap.Context | null>(null);

    useEffect(() => {
        // 创建 GSAP 上下文，用于自动清理
        contextRef.current = gsap.context(() => { });

        // 处理窗口 resize
        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            // 清理所有 ScrollTrigger 实例
            contextRef.current?.revert();
        };
    }, []);

    return { gsap, ScrollTrigger, context: contextRef };
}

/**
 * 创建带 scrub 的滚动动画时间轴
 */
export function createScrollTimeline(options: ScrollTrigger.Vars) {
    return gsap.timeline({
        scrollTrigger: {
            scrub: true,
            ...options,
        },
    });
}

export { gsap, ScrollTrigger };
