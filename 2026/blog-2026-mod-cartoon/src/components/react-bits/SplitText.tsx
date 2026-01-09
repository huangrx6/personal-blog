"use client";

import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { useEffect, useRef } from "react";

type SplitTextProps = {
    text: string;
    className?: string;
    delay?: number;
    animationFrom?: any;
    animationTo?: any;
    threshold?: number;
    rootMargin?: string;
    textAlign?: "left" | "right" | "center" | "justify";
    onLetterAnimationComplete?: () => void;
};

const defaultAnimationFrom = {
    opacity: 0,
    y: 40,
};

const defaultAnimationTo = {
    opacity: 1,
    y: 0,
};

export const SplitText = ({
    text,
    className = "",
    delay = 100,
    animationFrom = defaultAnimationFrom,
    animationTo = defaultAnimationTo,
    threshold = 0.1,
    rootMargin = "-100px",
    textAlign = "center",
    onLetterAnimationComplete,
}: SplitTextProps) => {
    const controls = useAnimation();
    const ref = useRef(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inView = useInView(ref, { once: true, amount: threshold, margin: rootMargin as any });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [inView, controls]);

    const words = text.split(" ").map((word) => {
        return {
            text: word,
            characters: word.split(""),
        };
    });

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: i * delay * 0.001 },
        }),
    };

    const child: any = {
        hidden: animationFrom,
        visible: {
            ...animationTo,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.p
            ref={ref}
            className={`inline-block overflow-hidden ${className}`}
            style={{ textAlign }}
            variants={container}
            initial="hidden"
            animate={controls}
        >
            {words.map((word, i) => (
                <span key={i} style={{ display: "inline-block", marginRight: "0.25em" }}>
                    {word.characters.map((char: string, index: number) => (
                        <motion.span
                            key={index}
                            style={{ display: "inline-block" }}
                            variants={child}
                            onAnimationComplete={
                                i === words.length - 1 && index === word.characters.length - 1
                                    ? onLetterAnimationComplete
                                    : undefined
                            }
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.p>
    );
};
