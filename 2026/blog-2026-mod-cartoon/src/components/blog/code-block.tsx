"use client";

import { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { Confetti } from "@/components/ui/confetti";

interface CodeBlockProps {
    children: string;
    language?: string;
}

export function CodeBlock({ children, language }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [confettiOrigin, setConfettiOrigin] = useState<{ x: number, y: number } | undefined>(undefined);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const code = typeof children === 'string' ? children : String(children);
    const lines = code.split('\n');

    // Remove trailing empty line if exists
    if (lines.length > 0 && lines[lines.length - 1] === '') {
        lines.pop();
    }

    const handleCopy = async (e: React.MouseEvent) => {
        await navigator.clipboard.writeText(code);

        // Calculate button center for confetti origin
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setConfettiOrigin({
                x: rect.left + rect.width / 2,
                y: rect.top
            });
        }

        setCopied(true);
        setShowConfetti(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-6 relative group">
            {/* Container with neo-brutal border */}
            <div className="bg-white rounded-2xl border-4 border-black shadow-neo overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b-2 border-black">
                    <div className="flex items-center gap-2">
                        {/* Decorative dots */}
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-accent border border-black"></div>
                            <div className="w-3 h-3 rounded-full bg-secondary border border-black"></div>
                            <div className="w-3 h-3 rounded-full bg-primary border border-black"></div>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-black/50 ml-2">
                            {language || 'code'}
                        </span>
                    </div>

                    {/* Copy button with confetti */}
                    <div className="relative">
                        <button
                            ref={buttonRef}
                            onClick={handleCopy}
                            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200
                                ${copied
                                    ? 'bg-secondary text-white scale-105'
                                    : 'bg-black text-white hover:bg-primary'
                                }
                            `}
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>已复制!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>复制</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Code content */}
                <div className="overflow-x-auto bg-gray-50 py-3">
                    <table className="w-full border-collapse font-mono text-sm">
                        <tbody>
                            {lines.map((line, index) => (
                                <tr key={index} className="hover:bg-primary/5">
                                    {/* Line number */}
                                    <td className="select-none text-right pr-4 pl-4 py-1 text-black/30 text-xs border-r-2 border-black/10 bg-gray-100/50 sticky left-0 w-12">
                                        {index + 1}
                                    </td>
                                    {/* Code content */}
                                    <td className="pl-4 pr-6 py-1 text-black whitespace-pre">
                                        {line || ' '}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Global Confetti Portal - rendered outside of overflow hidden container */}
            <Confetti
                trigger={showConfetti}
                onComplete={() => setShowConfetti(false)}
                origin={confettiOrigin}
            />
        </div>
    );
}
