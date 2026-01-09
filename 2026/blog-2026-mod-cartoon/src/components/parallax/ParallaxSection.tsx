"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils/cn";

interface ParallaxSectionProps {
    children: React.ReactNode;
    className?: string;
    bgColor?: string;
    index?: number; // 用于 z-index 计算
    sticky?: boolean; // 是否使用 sticky 堆叠效果
    rounded?: boolean; // 是否使用圆角
}

/**
 * 视差区块组件
 * 实现 mindmarket 风格的 Sticky 堆叠滑入效果
 * 
 * 核心原理：
 * - 每个区块使用 sticky positioning
 * - 下一个区块滚动时覆盖上一个
 * - 大圆角创造层叠深度感
 */
export function ParallaxSection({
    children,
    className,
    bgColor = "bg-background",
    index = 0,
    sticky = true,
    rounded = true,
}: ParallaxSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={sectionRef}
            className={cn(
                "relative w-full min-h-screen",
                sticky && "sticky top-0",
                bgColor,
                rounded && "rounded-t-[3rem] md:rounded-t-[4rem]",
                // 阴影增加层次感
                sticky && "shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)]",
                className
            )}
            style={{
                zIndex: 10 + index, // 确保后面的区块覆盖前面的
            }}
        >
            {children}
        </section>
    );
}

interface ParallaxHeroProps {
    children: React.ReactNode;
    className?: string;
    backgroundImage?: string;
    overlayOpacity?: number;
}

/**
 * 视差 Hero 组件
 * 全屏高度，带视差背景
 */
export function ParallaxHero({
    children,
    className,
    backgroundImage,
    overlayOpacity = 0.3,
}: ParallaxHeroProps) {
    return (
        <section
            className={cn(
                "relative min-h-screen w-full overflow-hidden",
                className
            )}
        >
            {/* 视差背景层 */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        transform: "translateZ(0)", // 硬件加速
                    }}
                />
            )}

            {/* 遮罩层 */}
            <div
                className="absolute inset-0 bg-background"
                style={{ opacity: overlayOpacity }}
            />

            {/* 内容 */}
            <div className="relative z-10">{children}</div>
        </section>
    );
}

interface FloatingElementProps {
    children: React.ReactNode;
    className?: string;
    delay?: number; // 动画延迟
    duration?: number; // 动画持续时间
    amplitude?: number; // 浮动幅度
}

/**
 * 浮动元素组件
 * 用于云朵、吉祥物等需要轻微浮动效果的元素
 */
export function FloatingElement({
    children,
    className,
    delay = 0,
    duration = 4,
    amplitude = 15,
}: FloatingElementProps) {
    return (
        <div
            className={cn(
                "motion-safe:animate-float",
                className
            )}
            style={{
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                // CSS 变量控制浮动幅度
                "--float-amplitude": `${amplitude}px`,
            } as React.CSSProperties}
        >
            {children}
        </div>
    );
}
