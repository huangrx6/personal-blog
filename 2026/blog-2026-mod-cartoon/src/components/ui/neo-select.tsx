"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Option {
    value: string;
    label: string;
    description?: string;
    emoji?: string;
}

interface NeoSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
}

export function NeoSelect({ value, onChange, options, placeholder = "Select...", className = "" }: NeoSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-black rounded-xl font-bold transition-all ${isOpen ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1" : "hover:bg-gray-50"
                    }`}
            >
                <div className="flex items-center gap-2">
                    {selectedOption?.emoji && <span>{selectedOption.emoji}</span>}
                    <span className={selectedOption ? "text-black" : "text-black/50"}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-5 h-5 opacity-60" />
                </motion.div>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-[9999] overflow-hidden"
                    >
                        <div className="max-h-60 overflow-y-auto p-2 space-y-1">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${option.value === value
                                        ? "bg-black text-white"
                                        : "hover:bg-gray-100 text-black"
                                        }`}
                                >
                                    <div>
                                        <div className="font-bold flex items-center gap-2">
                                            {option.emoji && <span>{option.emoji}</span>}
                                            {option.label}
                                        </div>
                                        {option.description && (
                                            <div className={`text-xs ${option.value === value ? "opacity-60" : "opacity-40"}`}>
                                                {option.description}
                                            </div>
                                        )}
                                    </div>
                                    {option.value === value && <Check className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
