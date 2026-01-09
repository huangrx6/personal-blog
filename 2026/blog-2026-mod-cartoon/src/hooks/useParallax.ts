"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface ParallaxOptions {
    speed?: number; // 视差速度因子，1 = 正常速度，0.5 = 慢一半，2 = 快一倍
    direction?: "up" | "down"; // 滚动方向
    disabled?: boolean; // 是否禁用
}

interface ParallaxResult {
    offset: number;
    progress: number; // 0-1 滚动进度
    isReduced: boolean; // 是否启用了减少动态效果
}

/**
 * 视差滚动 Hook
 * 自动检测 prefers-reduced-motion 并在启用时禁用视差效果
 */
export function useParallax(options: ParallaxOptions = {}): ParallaxResult {
    const { speed = 0.5, direction = "up", disabled = false } = options;
    const [offset, setOffset] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isReduced, setIsReduced] = useState(false);
    const rafRef = useRef<number | null>(null);

    const handleScroll = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;

            const multiplier = direction === "up" ? -1 : 1;
            const parallaxOffset = scrollY * speed * multiplier;

            setOffset(parallaxOffset);
            setProgress(scrollProgress);
        });
    }, [speed, direction]);

    useEffect(() => {
        // 检测用户是否偏好减少动态效果
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setIsReduced(mediaQuery.matches);

        const handleMediaChange = (e: MediaQueryListEvent) => {
            setIsReduced(e.matches);
        };

        mediaQuery.addEventListener("change", handleMediaChange);

        // 如果用户偏好减少动态效果或禁用，不添加滚动监听
        if (!mediaQuery.matches && !disabled) {
            window.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll(); // 初始计算
        }

        return () => {
            mediaQuery.removeEventListener("change", handleMediaChange);
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [handleScroll, disabled]);

    return {
        offset: isReduced || disabled ? 0 : offset,
        progress,
        isReduced,
    };
}

/**
 * 元素可见性视差 Hook
 * 当元素进入视口时触发视差效果
 */
export function useElementParallax(
    elementRef: React.RefObject<HTMLElement>,
    options: ParallaxOptions = {}
) {
    const { speed = 0.3, direction = "up" } = options;
    const [offset, setOffset] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isReduced, setIsReduced] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setIsReduced(mediaQuery.matches);

        const handleMediaChange = (e: MediaQueryListEvent) => {
            setIsReduced(e.matches);
        };

        mediaQuery.addEventListener("change", handleMediaChange);
        return () => mediaQuery.removeEventListener("change", handleMediaChange);
    }, []);

    useEffect(() => {
        const element = elementRef.current;
        if (!element || isReduced) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0, rootMargin: "50px" }
        );

        observer.observe(element);

        const handleScroll = () => {
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementCenter = rect.top + rect.height / 2;
            const distanceFromCenter = (windowHeight / 2 - elementCenter) * speed;

            const multiplier = direction === "up" ? 1 : -1;
            setOffset(distanceFromCenter * multiplier);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, [elementRef, speed, direction, isReduced]);

    return { offset: isReduced ? 0 : offset, isVisible, isReduced };
}
