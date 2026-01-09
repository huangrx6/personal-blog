"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { useParallax } from "@/hooks/useParallax";

interface ParallaxLayerProps {
    src: string;
    alt: string;
    speed?: number; // 视差速度
    className?: string;
    zIndex?: number;
    opacity?: number;
}

/**
 * 单层视差背景
 */
export function ParallaxLayer({
    src,
    alt,
    speed = 0.5,
    className,
    zIndex = 0,
    opacity = 1,
}: ParallaxLayerProps) {
    const { offset, isReduced } = useParallax({ speed });

    return (
        <div
            className={cn(
                "absolute inset-0 w-full h-full pointer-events-none overflow-hidden",
                className
            )}
            style={{
                zIndex,
                opacity,
            }}
        >
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                style={{
                    transform: isReduced ? "none" : `translateY(${offset}px)`,
                    transition: isReduced ? "none" : "transform 0.1s ease-out",
                }}
                priority
            />
        </div>
    );
}

interface ParallaxBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    showClouds?: boolean;
    showShapes?: boolean;
    showHeroBg?: boolean;
}

/**
 * 多层视差背景组件
 * 使用生成的素材图片创建深度感
 */
export function ParallaxBackground({
    className,
    children,
    showClouds = true,
    showShapes = false,
    showHeroBg = true,
}: ParallaxBackgroundProps) {
    return (
        <div className={cn("relative w-full min-h-screen", className)}>
            {/* 最远层：Hero 背景 */}
            {showHeroBg && (
                <ParallaxLayer
                    src="/parallax/hero-bg.png"
                    alt="Background"
                    speed={0.2}
                    zIndex={0}
                    opacity={0.6}
                />
            )}

            {/* 中层：云朵 */}
            {showClouds && (
                <ParallaxLayer
                    src="/parallax/clouds.png"
                    alt="Clouds"
                    speed={0.4}
                    zIndex={1}
                    opacity={0.8}
                />
            )}

            {/* 近层：装饰图形 */}
            {showShapes && (
                <ParallaxLayer
                    src="/parallax/shapes.png"
                    alt="Decorative shapes"
                    speed={0.6}
                    zIndex={2}
                    opacity={0.5}
                />
            )}

            {/* 内容层 */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}

interface FixedParallaxBackgroundProps {
    className?: string;
}

/**
 * 固定视差背景
 * 用于整个页面的固定背景层
 */
export function FixedParallaxBackground({
    className,
}: FixedParallaxBackgroundProps) {
    const { offset, isReduced } = useParallax({ speed: 0.15 });

    return (
        <div
            className={cn(
                "fixed inset-0 w-full h-full pointer-events-none overflow-hidden -z-10",
                className
            )}
        >
            {/* 奶白色背景 */}
            <div className="absolute inset-0 bg-[#FCFAF2]" />

            {/* 渐变装饰 - 类似 mindmarket 的边缘光晕 */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(ellipse 80% 50% at 20% 0%, rgba(14, 165, 233, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(244, 63, 94, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 50% 50%, rgba(132, 204, 22, 0.04) 0%, transparent 50%)
          `,
                }}
            />

            {/* Hero 背景 - 视差移动 */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: "url(/parallax/hero-bg.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: isReduced ? "none" : `translateY(${offset}px)`,
                    transition: "transform 0.1s ease-out",
                }}
            />

            {/* 网格装饰 */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                }}
            />
        </div>
    );
}
