"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface CharacterProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    floatDelay?: number;
    floatDuration?: number;
}

/**
 * 浮动角色组件
 * 带轻微浮动动画的角色图片
 */
export function FloatingCharacter({
    src,
    alt,
    className,
    width = 200,
    height = 200,
    floatDelay = 0,
    floatDuration = 4,
}: CharacterProps) {
    return (
        <div
            className={cn("motion-safe:animate-float", className)}
            style={{
                animationDelay: `${floatDelay}s`,
                animationDuration: `${floatDuration}s`,
            }}
        >
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="object-contain drop-shadow-lg"
            />
        </div>
    );
}

interface ScrollSectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    minHeight?: string;
}

/**
 * 滚动区块组件
 * 用于组织首页的各个屏幕区域
 */
export function ScrollSection({
    children,
    className,
    id,
    minHeight = "100vh",
}: ScrollSectionProps) {
    return (
        <section
            id={id}
            className={cn("relative w-full", className)}
            style={{ minHeight }}
        >
            {children}
        </section>
    );
}

interface StickyCharacterGroupProps {
    children: React.ReactNode;
    className?: string;
    startOffset?: number; // 开始固定的位置 (vh)
    endOffset?: number; // 结束固定的位置 (vh)
}

/**
 * 固定角色群组
 * 在特定滚动范围内保持角色位置固定
 */
export function StickyCharacterGroup({
    children,
    className,
    startOffset = 0,
    endOffset = 200,
}: StickyCharacterGroupProps) {
    const [isSticky, setIsSticky] = useState(false);
    const [opacity, setOpacity] = useState(1);
    const groupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!groupRef.current) return;

            const scrollY = window.scrollY;
            const startPx = (startOffset / 100) * window.innerHeight;
            const endPx = (endOffset / 100) * window.innerHeight;

            if (scrollY >= startPx && scrollY <= endPx) {
                setIsSticky(true);
                // 在结束前逐渐淡出
                const fadeStart = endPx - window.innerHeight * 0.5;
                if (scrollY > fadeStart) {
                    setOpacity(1 - (scrollY - fadeStart) / (endPx - fadeStart));
                } else {
                    setOpacity(1);
                }
            } else {
                setIsSticky(false);
                setOpacity(scrollY < startPx ? 1 : 0);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [startOffset, endOffset]);

    return (
        <div
            ref={groupRef}
            className={cn(
                "transition-opacity duration-300",
                isSticky ? "fixed" : "absolute",
                className
            )}
            style={{
                opacity,
                top: isSticky ? "50%" : undefined,
                transform: isSticky ? "translateY(-50%)" : undefined,
            }}
        >
            {children}
        </div>
    );
}
