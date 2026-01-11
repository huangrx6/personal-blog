"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Copy, FileType, Globe, HardDrive, X } from "lucide-react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

interface MediaPreviewDialogProps {
    isOpen: boolean;
    onClose: () => void;
    media: {
        id: string;
        url: string;
        filename: string;
        type: string;
        size: number;
        createdAt: string | Date;
    } | null;
}

export function MediaPreviewDialog({ isOpen, onClose, media }: MediaPreviewDialogProps) {
    if (typeof window === "undefined" || !media) return null;

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const copyUrl = () => {
        navigator.clipboard.writeText(media.url);
        toast.success("URL copied to clipboard!");
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors backdrop-blur-sm"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Left: Image Canvas */}
                        <div className="flex-1 bg-neutral-100 flex items-center justify-center p-8 relative min-h-[400px]">
                            <div className="absolute inset-0 opacity-10"
                                style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                            />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={media.url}
                                alt={media.filename}
                                className="max-w-full max-h-full object-contain shadow-xl rounded-lg"
                            />
                        </div>

                        {/* Right: Metadata & Actions */}
                        <div className="w-full md:w-96 bg-white p-6 md:p-8 flex flex-col overflow-y-auto border-l-2 border-dashed border-gray-200">
                            <h2 className="text-2xl font-black mb-1 break-all line-clamp-2" title={media.filename}>
                                {media.filename}
                            </h2>
                            <p className="text-sm text-gray-500 font-mono mb-8">
                                ID: {media.id}
                            </p>

                            <div className="space-y-6 flex-1">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Metadata</h3>

                                    <div className="flex items-center gap-3 text-sm font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                                            <FileType className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-500 text-xs">Type</p>
                                            <p>{media.type}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center">
                                            <HardDrive className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-500 text-xs">Size</p>
                                            <p>{formatSize(media.size)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-500 text-xs">Uploaded</p>
                                            <p>{new Date(media.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 mt-8">
                                <button
                                    onClick={copyUrl}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-neo-sm active:translate-y-0.5 active:shadow-none"
                                >
                                    <Copy className="w-4 h-4" />
                                    Copy URL
                                </button>

                                <a
                                    href={media.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-white border-2 border-black text-black rounded-xl font-bold hover:bg-gray-50 transition-colors"
                                >
                                    <Globe className="w-4 h-4" />
                                    Open in New Tab
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
