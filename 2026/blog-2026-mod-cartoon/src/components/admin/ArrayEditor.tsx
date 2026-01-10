"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface ArrayEditorProps {
    title: string;
    description?: string;
    items: any[];
    onChange: (newItems: any[]) => void;
    itemTemplate: any;
    renderItem: (item: any, index: number, updateItem: (key: string, val: any) => void) => React.ReactNode;
}

export function ArrayEditor({ title, description, items = [], onChange, itemTemplate, renderItem }: ArrayEditorProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleAdd = () => {
        onChange([...items, { ...itemTemplate }]);
    };

    const handleRemove = (index: number) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        onChange(newItems);
    };

    const handleUpdate = (index: number, key: string, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [key]: value };
        onChange(newItems);
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === items.length - 1) return;

        const newItems = [...items];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
        onChange(newItems);
    };

    return (
        <div className="bg-white/50 border-2 border-black/10 rounded-2xl">
            <div
                className="flex items-center justify-between p-4 bg-gray-50/50 cursor-pointer hover:bg-gray-100/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div>
                    <h3 className="font-bold flex items-center gap-2">
                        {title}
                        <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">{items.length}</span>
                    </h3>
                    {description && <p className="text-xs font-bold text-black/40">{description}</p>}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleAdd(); }}
                        className="bg-black text-white p-1 rounded-md hover:scale-110 transition-transform"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                    {isExpanded ? <ChevronUp className="w-4 h-4 opacity-40" /> : <ChevronDown className="w-4 h-4 opacity-40" />}
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="p-4 space-y-4"
                    >
                        {items.length === 0 ? (
                            <div className="text-center py-8 border-2 border-dashed border-black/10 rounded-xl text-black/30 font-bold text-sm">
                                还没有内容，点击右上角 + 添加
                            </div>
                        ) : (
                            items.map((item, index) => (
                                <motion.div
                                    key={index}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="group relative bg-white border-2 border-black/5 rounded-xl p-4 shadow-sm hover:border-black/20 hover:shadow-md transition-all"
                                    style={{ zIndex: items.length - index }}
                                >
                                    <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <button
                                            onClick={() => moveItem(index, 'up')}
                                            disabled={index === 0}
                                            className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                                        >
                                            <ChevronUp className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={() => moveItem(index, 'down')}
                                            disabled={index === items.length - 1}
                                            className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                                        >
                                            <ChevronDown className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={() => handleRemove(index)}
                                            className="p-1 hover:bg-red-50 text-red-500 rounded"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>

                                    {renderItem(item, index, (key, val) => handleUpdate(index, key, val))}
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Helper: Icon Selector
export function IconSelector({ value, onChange, readonly }: { value: string, onChange: (val: string) => void, readonly?: boolean }) {
    // Common icons list
    const commonIcons = [
        "Code", "Terminal", "Cpu", "Globe", "Database", "Layout", "Smartphone", // Tech
        "Music", "Coffee", "Camera", "Gamepad2", "Zap", "Heart", "Star", "Sparkles",// Life
        "PenTool", "Figma", "Palette", "Image", "Video", // Design
    ];

    if (readonly) {
        const Icon = (LucideIcons as any)[value] || LucideIcons.Sparkles;
        return <Icon className="w-10 h-10 text-white" />;
    }

    return (
        <div className="flex flex-wrap gap-2 mt-2 max-h-48 overflow-y-auto p-1 custom-scrollbar">
            {commonIcons.map(iconName => {
                //Dynamic Icon
                const Icon = (LucideIcons as any)[iconName];
                if (!Icon) return null;

                return (
                    <button
                        key={iconName}
                        type="button"
                        onClick={() => onChange(iconName)}
                        className={`p-2 rounded-lg border-2 transition-all ${value === iconName
                            ? "bg-black text-white border-black"
                            : "bg-white text-black/50 border-transparent hover:border-black/20"
                            }`}
                        title={iconName}
                    >
                        <Icon className="w-4 h-4" />
                    </button>
                )
            })}
        </div>
    )
}
