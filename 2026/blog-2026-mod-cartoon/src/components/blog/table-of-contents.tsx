"use client";

import { cn } from "@/lib/utils/cn";
import { ChevronDown, ChevronRight, List } from "lucide-react";
import { useEffect, useState } from "react";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("article h1, article h2, article h3"))
            .map((elem) => ({
                id: elem.id,
                text: elem.textContent || "",
                level: Number(elem.tagName.substring(1)),
            }))
            .filter(item => item.id);

        setHeadings(elements);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        elements.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <div className="bg-white border-4 border-black rounded-2xl shadow-neo overflow-hidden transition-all duration-300">
            {/* Header / Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 border-b-2 border-black/10 hover:bg-gray-100 transition-colors"
            >
                <div className="flex items-center gap-2 font-black uppercase text-sm tracking-wider">
                    <List size={16} />
                    Directory
                </div>
                <div className="text-black/50">
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>

            {/* List */}
            <div
                className={cn(
                    "transition-all duration-300 ease-in-out overflow-hidden",
                    isCollapsed ? "max-h-0" : "max-h-[70vh] overflow-y-auto"
                )}
            >
                <nav className="flex flex-col py-2">
                    {headings.map((heading) => (
                        <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });
                                setActiveId(heading.id);
                            }}
                            className={cn(
                                "block text-sm py-2 pr-4 transition-all duration-200 border-l-4 hover:bg-black/5 leading-relaxed relative group",
                                activeId === heading.id
                                    ? "border-primary bg-primary/5 font-bold text-black"
                                    : "border-transparent text-black/60 hover:text-black hover:border-black/20",
                                heading.level === 1 && "pl-4",
                                heading.level === 2 && "pl-6 text-[0.95em]",
                                heading.level === 3 && "pl-10 text-[0.9em]",
                            )}
                            title={heading.text} // Native tooltip for full text
                        >
                            <span className="line-clamp-2 block">
                                {heading.text}
                            </span>
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
}
