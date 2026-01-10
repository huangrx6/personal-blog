"use client";

import { cn } from "@/lib/utils/cn";
import { useState } from "react";
import { FloatingNav } from "./floating-nav";

interface BlogPostLayoutProps {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}

export function BlogPostLayout({ children, sidebar }: BlogPostLayoutProps) {
    const [showToc, setShowToc] = useState(true);

    return (
        <div className="relative">
            {/* Floating Navigation Controls */}
            <FloatingNav showToc={showToc} setShowToc={setShowToc} />

            {/* Main Content Container - Centered */}
            <div className="relative transition-all duration-300">

                {/* Article Content - Always Full Width of Container */}
                <article className="w-full">
                    {children}
                </article>

                {/* Sidebar / TOC - Absolutely Positioned in the Gutter */}
                <aside
                    className={cn(
                        "hidden xl:block absolute left-[102%] top-0 h-full transition-all duration-300 ease-in-out",
                        showToc ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"
                    )}
                >
                    <div className="sticky top-4 w-64">
                        {sidebar}
                    </div>
                </aside>
            </div>
        </div>
    );
}
