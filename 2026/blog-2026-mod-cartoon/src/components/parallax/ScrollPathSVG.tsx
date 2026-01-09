"use client";

import React, { useEffect, useState } from "react";

interface ScrollingPathProps {
    className?: string;
    startOffset?: number; // 开始显示路径的滚动位置 (vh)
}

/**
 * 滚动驱动的蜿蜒路径 SVG
 * - 第三屏开始显示
 * - 路径宽粗
 * - 延伸缓慢（需要滚动整个页面才能看到完整路径）
 */
export function ScrollingPath({ className, startOffset = 180 }: ScrollingPathProps) {
    const [pathProgress, setPathProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 检查 prefers-reduced-motion
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) {
            setPathProgress(1);
            setIsVisible(true);
            return;
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const vh = window.innerHeight;
            const startPx = (startOffset / 100) * vh;
            const docHeight = document.documentElement.scrollHeight - vh;

            // 路径从 startOffset 开始显示
            if (scrollY > startPx) {
                setIsVisible(true);
                // 计算路径进度：从开始位置到页面底部
                const scrollRange = docHeight - startPx;
                const progress = Math.min(Math.max((scrollY - startPx) / scrollRange, 0), 1);
                setPathProgress(progress);
            } else {
                setIsVisible(false);
                setPathProgress(0);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [startOffset]);

    if (!isVisible) return null;

    // SVG viewBox 尺寸
    const width = 1000;
    const height = 3000;

    // 蜿蜒路径关键点 (使用绝对坐标，不是百分比)
    const fullPoints = [
        { x: 500, y: 0 },      // 起点 - 中间
        { x: 250, y: 300 },    // 向左
        { x: 700, y: 600 },    // 向右
        { x: 200, y: 900 },    // 向左
        { x: 750, y: 1200 },   // 向右
        { x: 300, y: 1500 },   // 向左
        { x: 650, y: 1800 },   // 向右
        { x: 250, y: 2100 },   // 向左
        { x: 700, y: 2400 },   // 向右
        { x: 500, y: 2700 },   // 回中间
        { x: 400, y: 3000 },   // 结束
    ];

    // 根据进度选择可见的点
    const visiblePointCount = Math.max(2, Math.ceil(pathProgress * fullPoints.length));
    const points = fullPoints.slice(0, visiblePointCount);

    // 构建平滑的贝塞尔曲线路径
    const buildPath = () => {
        if (points.length < 2) return "";

        let d = `M ${points[0].x} ${points[0].y}`;

        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            // 使用二次贝塞尔曲线实现平滑弯曲
            const cpY = prev.y + (curr.y - prev.y) / 2;
            d += ` Q ${prev.x} ${cpY}, ${curr.x} ${curr.y}`;
        }

        return d;
    };

    const pathData = buildPath();

    return (
        <svg
            className={className}
            style={{
                position: "absolute",
                top: "200vh", // 第三屏开始
                left: 0,
                width: "100%",
                height: "300vh",
                pointerEvents: "none",
                zIndex: 1,
                overflow: "visible",
            }}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMin slice"
        >
            <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(199, 89%, 48%)" />
                    <stop offset="100%" stopColor="hsl(199, 89%, 38%)" />
                </linearGradient>
            </defs>

            {/* 路径外发光效果 */}
            <path
                d={pathData}
                fill="none"
                stroke="hsl(199, 89%, 55%)"
                strokeWidth="180"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.2"
                style={{ filter: "blur(40px)" }}
            />

            {/* 主路径 - 宽粗 */}
            <path
                d={pathData}
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="120"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* 路径高光 */}
            <path
                d={pathData}
                fill="none"
                stroke="hsl(199, 89%, 65%)"
                strokeWidth="40"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
            />
        </svg>
    );
}
