"use client";

import { useRef, useState } from "react";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 25;
const CHARS = "!@#$%^&*():{};|,.<>/?~_";

interface ScrambleTextProps {
    text: string;
    className?: string;
}

export function ScrambleText({ text, className = "" }: ScrambleTextProps) {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [displayText, setDisplayText] = useState(text);

    const scramble = () => {
        let pos = 0;

        // Clear previous
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            const scrambled = text.split("").map((char, index) => {
                if (pos / CYCLES_PER_LETTER > index) {
                    return char; // Reveal original
                }

                // Random char
                const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
                return randomChar;
            }).join("");

            setDisplayText(scrambled);
            pos++;

            if (pos > text.length * CYCLES_PER_LETTER) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(text); // Ensure final is clean
            }
        }, SHUFFLE_TIME);
    };

    const stopScramble = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
    };

    return (
        <span
            onMouseEnter={scramble}
            onMouseLeave={stopScramble}
            className={`inline-block ${className}`}
        >
            {displayText}
        </span>
    );
}
