"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface UploadZoneProps {
    onUploadComplete?: (url: string) => void;
    category?: string;
}

export function UploadZone({ onUploadComplete, category = "general" }: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleUpload(file);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
    };

    const handleUpload = async (file: File) => {
        if (!file.type.startsWith("image/")) {
            toast.error("Format not supported. Please upload an image.");
            return;
        }

        // Create local preview immediately
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", category);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Upload failed");
            }

            toast.success("Image uploaded successfully!");
            if (onUploadComplete) onUploadComplete(data.url);

            // Keep preview for a moment or clear it? 
            // Let's keep it to show success state, but updated with real URL if needed?
            // Actually, usually we might want to reset for next upload or show success.

        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload image.");
            setPreview(null); // Clear preview on error
        } finally {
            setUploading(false);
        }
    };

    const clearPreview = () => {
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {!preview ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key="dropzone"
                        className={`
                            relative group cursor-pointer
                            flex flex-col items-center justify-center 
                            h-64 rounded-3xl border-4 border-dashed transition-all duration-300
                            ${isDragging
                                ? "border-black bg-[#FFDE00] scale-[1.02] rotate-1"
                                : "border-black/20 bg-gray-50 hover:border-black/40 hover:bg-white"
                            }
                        `}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileSelect}
                        />

                        <div className="flex flex-col items-center gap-4 text-center p-6">
                            <div className={`
                                w-16 h-16 rounded-full flex items-center justify-center border-2 border-black
                                transition-all duration-300 shadow-neo
                                ${isDragging ? "bg-white scale-110" : "bg-black text-white group-hover:bg-[#FFDE00] group-hover:text-black"}
                            `}>
                                <Upload className="w-8 h-8" />
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-xl font-black uppercase tracking-tight">
                                    {isDragging ? "Drop it here!" : "Upload Image"}
                                </h3>
                                <p className="text-sm font-medium text-black/50">
                                    {isDragging ? "Release to upload" : "Drag & drop or click to browse"}
                                </p>
                            </div>
                        </div>

                        {/* Corner accents */}
                        <div className="absolute top-4 left-4 w-2 h-2 bg-black rounded-full opacity-20" />
                        <div className="absolute top-4 right-4 w-2 h-2 bg-black rounded-full opacity-20" />
                        <div className="absolute bottom-4 left-4 w-2 h-2 bg-black rounded-full opacity-20" />
                        <div className="absolute bottom-4 right-4 w-2 h-2 bg-black rounded-full opacity-20" />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        key="preview"
                        className="relative h-64 bg-white border-4 border-black rounded-3xl overflow-hidden shadow-neo flex items-center justify-center group"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.05]"
                            style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "16px 16px" }}
                        />

                        {/* Image Preview */}
                        <div className="relative w-full h-full p-4 flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
                            />
                        </div>

                        {/* Overlay State */}
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                            {uploading ? (
                                <div className="flex flex-col items-center gap-3 text-white">
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                    <span className="font-bold">Uploading...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold border-2 border-white shadow-lg flex items-center gap-2">
                                        <Check className="w-4 h-4" />
                                        <span>Uploaded</span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            clearPreview();
                                        }}
                                        className="bg-white text-black p-2 rounded-xl border-2 border-black hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
