"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Tag, Upload, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { UploadZone } from "./upload-zone";

interface MediaUploadDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadComplete?: (url: string) => void;
}

const CATEGORIES = [
    { id: 'general', label: 'General' },
    { id: 'article_cover', label: 'Article Cover' },
    { id: 'avatar', label: 'Avatar' },
    { id: 'daily', label: 'Daily' },
];

export function MediaUploadDialog({ isOpen, onClose, onUploadComplete }: MediaUploadDialogProps) {
    const [category, setCategory] = useState("general");

    if (typeof window === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white border-4 border-black rounded-3xl p-6 w-full max-w-2xl shadow-neo-lg relative overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Decorative Header Background */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-[#FFDE00] border-b-2 border-black" />

                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 mt-4 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center transform -rotate-3">
                                    <Upload className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight">Upload Media</h2>
                                    <p className="text-xs font-bold text-black/40 uppercase tracking-widest">
                                        Cloudflare R2 Storage
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors border-2 border-transparent hover:border-black/10"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Category Selector */}
                        <div className="mb-6 shrink-0">
                            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                                <Tag className="w-3 h-3" />
                                Select Category
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setCategory(cat.id)}
                                        className={`
                                            px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all
                                            ${category === cat.id
                                                ? "bg-black text-white border-black shadow-neo-sm transform -translate-y-0.5"
                                                : "bg-gray-50 text-gray-500 border-transparent hover:border-black/10 hover:bg-gray-100"
                                            }
                                        `}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mb-4 overflow-y-auto min-h-0 flex-1">
                            <UploadZone
                                onUploadComplete={onUploadComplete}
                                category={category}
                            />
                        </div>

                        {/* Footer Hint */}
                        <div className="text-center text-xs font-medium text-gray-400 shrink-0">
                            Supported formats: JPG, PNG, GIF, WEBP • Max size: 10MB
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
