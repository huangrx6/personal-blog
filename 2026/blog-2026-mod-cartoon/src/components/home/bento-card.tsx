"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface BentoCardProps {
    title: string;
    category?: string;
    description?: string;
    className?: string;
    href: string;
    color?: string; // Accent color for reveal
    image?: React.ReactNode;
    children?: React.ReactNode;
}

export function BentoCard({ title, category, description, className, href, color = "bg-primary", image, children }: BentoCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        x.set(clientX - left);
        y.set(clientY - top);
    }

    return (
        <motion.div
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-xl border-2 border-black bg-white p-6 shadow-neo transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
                className
            )}
            onMouseMove={onMouseMove}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
        >
            <div
                className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500", color)}
            />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                    {category && (
                        <span className="inline-block rounded-full border-2 border-black px-2 py-0.5 text-xs font-bold bg-white shadow-neo-sm mb-4">
                            {category}
                        </span>
                    )}
                    <Link href={href} className="p-2 border-2 border-black rounded-full bg-white hover:bg-black hover:text-white transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="space-y-2 mt-4">
                    <h3 className="text-2xl font-black leading-tight group-hover:underline decoration-wavy decoration-2 underline-offset-4">{title}</h3>
                    {description && <p className="text-sm font-medium text-black/60 line-clamp-2">{description}</p>}
                </div>
            </div>

            {/* Decorative or Image Background */}
            {children}
        </motion.div>
    );
}
