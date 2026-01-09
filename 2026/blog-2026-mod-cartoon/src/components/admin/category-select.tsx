"use client";

import { useState, useRef, useEffect } from "react";
import { Tag, ChevronDown, Check, X } from "lucide-react";

interface Category {
    id: string;
    name: string;
    color: string;
}

interface CategorySelectProps {
    categories: Category[];
    value: string;
    onChange: (value: string) => void;
    name?: string;
}

export function CategorySelect({ categories, value, onChange, name }: CategorySelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedCategory = categories.find((c) => c.id === value);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative">
            {/* Hidden input for form submission */}
            <input type="hidden" name={name} value={value} />

            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full max-w-xs flex items-center justify-between gap-3 px-4 py-3 bg-white border-2 border-black/20 rounded-xl font-medium hover:border-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
                <div className="flex items-center gap-3">
                    {selectedCategory ? (
                        <>
                            <div
                                className="w-4 h-4 rounded-full border border-black/20"
                                style={{ backgroundColor: selectedCategory.color }}
                            />
                            <span>{selectedCategory.name}</span>
                        </>
                    ) : (
                        <>
                            <Tag className="w-4 h-4 text-black/40" />
                            <span className="text-black/50">无分类</span>
                        </>
                    )}
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full max-w-xs bg-white border-2 border-black rounded-xl shadow-neo overflow-hidden z-50">
                    {/* No Category Option */}
                    <button
                        type="button"
                        onClick={() => {
                            onChange("");
                            setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${!value ? "bg-primary/10" : ""
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <X className="w-4 h-4 text-black/40" />
                            <span className="font-medium">无分类</span>
                        </div>
                        {!value && <Check className="w-4 h-4 text-primary" />}
                    </button>

                    {/* Divider */}
                    <div className="border-t border-black/10" />

                    {/* Category Options */}
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => {
                                onChange(category.id);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${value === category.id ? "bg-primary/10" : ""
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-4 h-4 rounded-full border-2 border-black/20"
                                    style={{ backgroundColor: category.color }}
                                />
                                <span className="font-medium">{category.name}</span>
                            </div>
                            {value === category.id && <Check className="w-4 h-4 text-primary" />}
                        </button>
                    ))}

                    {categories.length === 0 && (
                        <div className="px-4 py-6 text-center text-black/40">
                            暂无分类
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
