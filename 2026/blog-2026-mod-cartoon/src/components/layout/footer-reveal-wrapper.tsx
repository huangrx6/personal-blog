"use client";

import React, { useEffect, useRef, useState } from "react";

export function FooterRevealWrapper({ children }: { children: React.ReactNode }) {
    const [height, setHeight] = useState(0);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!footerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setHeight(entry.contentRect.height);
            }
        });

        observer.observe(footerRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* 
        Spacing Element that takes up physical space in the document flow 
        so the scrollbar allows us to scroll "past" the content to see the footer.
      */}
            <div style={{ height: height }} className="w-full relative z-0 pointer-events-none" />

            {/* 
        The Fixed Footer sitting BEHIND the main content.
        z-index -10 ensures it's behind the bg-white main content.
      */}
            <div
                ref={footerRef}
                className="fixed bottom-0 left-0 w-full z-[-10]"
            >
                {children}
            </div>
        </>
    );
}
