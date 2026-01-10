"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
    children: string;
    language?: string;
}

export function CodeBlock({ children, language }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const code = typeof children === 'string' ? children : String(children);
    const lines = code.split('\n');

    // Remove trailing empty line if exists
    if (lines.length > 0 && lines[lines.length - 1] === '') {
        lines.pop();
    }

    const handleCopy = async (e: React.MouseEvent) => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
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

                    {/* Copy button - Simplified */}
                    <button
                        onClick={handleCopy}
                        className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 border-2 border-black active:translate-y-0.5
                            ${copied
                                ? 'bg-[#A855F7] text-white shadow-none'
                                : 'bg-white text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                            }
                        `}
                    >
                        {copied ? (
                            <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
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
        </div>
    );
}
