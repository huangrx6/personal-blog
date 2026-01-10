"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
    text: string;
    speed?: number;
    deleteSpeed?: number;
    waitTime?: number;
    delay?: number;
    className?: string;
}

export function Typewriter({
    text,
    speed = 100,
    deleteSpeed = 50,
    waitTime = 2000,
    delay = 0,
    className = ""
}: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const handleType = () => {
            const currentLength = displayedText.length;

            if (!isDeleting) {
                if (currentLength < text.length) {
                    setDisplayedText(text.substring(0, currentLength + 1));
                    timeout = setTimeout(handleType, speed);
                } else {
                    timeout = setTimeout(() => {
                        setIsDeleting(true);
                        handleType();
                    }, waitTime);
                }
            } else {
                if (currentLength > 0) {
                    setDisplayedText(text.substring(0, currentLength - 1));
                    timeout = setTimeout(handleType, deleteSpeed);
                } else {
                    setIsDeleting(false);
                    timeout = setTimeout(handleType, speed);
                }
            }
        };

        if (delay > 0 && !hasStarted) {
            timeout = setTimeout(() => {
                setHasStarted(true);
                handleType();
            }, delay);
        } else {
            timeout = setTimeout(handleType, speed);
        }

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, hasStarted, text, speed, deleteSpeed, waitTime, delay]);

    return (
        <span className={className}>
            {displayedText}
            <span className="animate-pulse">_</span>
        </span>
    );
}
