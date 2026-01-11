"use client";

import { getMediaList } from "@/actions/media";
import { MediaUploadDialog } from "@/components/admin/media/media-upload-dialog";
import { NeoPagination } from "@/components/ui/neo-pagination";
import { NeoSelect } from "@/components/ui/neo-select";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Image as ImageIcon, Loader2, Plus, Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

interface MediaSelectorDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
}

const CATEGORIES = [
    { id: 'all', label: 'All Categories' },
    { id: 'general', label: 'General' },
    { id: 'article_cover', label: 'Article Covers' },
    { id: 'avatar', label: 'Avatars' },
    { id: 'daily', label: 'Daily Notes' },
];

export function MediaSelectorDialog({ isOpen, onClose, onSelect }: MediaSelectorDialogProps) {
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    // Filters
    const [searchValue, setSearchValue] = useState("");
    const [activeSearch, setActiveSearch] = useState("");
    const [category, setCategory] = useState("all");

    // Data State
    const [mediaItems, setMediaItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    // const [hasMore, setHasMore] = useState(true);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const loadMedia = useCallback(async (pageNum: number) => {
        try {
            setIsLoading(true);

            const result = await getMediaList(pageNum, 12, activeSearch, category);

            // @ts-ignore
            const newData = Array.isArray(result) ? result : result.data;
            // @ts-ignore
            const totalCount = result.total || 0;

            setMediaItems(newData);
            setTotal(totalCount);
        } catch (error) {
            console.error("Failed to load media", error);
            toast.error("Failed to load media library");
        } finally {
            setIsLoading(false);
        }
    }, [activeSearch, category]);

    // Initial Load & Filter Change
    useEffect(() => {
        if (isOpen) {
            setPage(1);
            loadMedia(1);
        }
    }, [isOpen, loadMedia]);

    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setActiveSearch(searchValue);
            setPage(1); // Reset page on new search
        }
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl max-h-[85vh] bg-white border-4 border-black rounded-3xl shadow-neo overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b-4 border-black bg-yellow-400 flex items-center justify-between">
                            <h2 className="text-2xl font-black uppercase flex items-center gap-2">
                                <ImageIcon className="w-6 h-6" />
                                Select Media
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 bg-black text-white rounded-lg hover:scale-110 transition-transform"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Toolbar */}
                        <div className="p-4 border-b-4 border-black bg-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between z-10">
                            <div className="flex flex-1 gap-3 w-full">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Search media..."
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        onKeyDown={handleSearchKeyDown}
                                        className="w-full pl-12 pr-4 h-12 rounded-xl border-2 border-black focus:shadow-neo transition-all outline-none font-bold placeholder:text-black/30 bg-white"
                                    />
                                </div>
                                <div className="w-48 shrink-0">
                                    <NeoSelect
                                        value={category}
                                        onChange={setCategory}
                                        options={CATEGORIES.map(c => ({
                                            value: c.id,
                                            label: c.label,
                                            emoji: c.id === 'all' ? '📂' : '🏷️'
                                        }))}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => setIsUploadOpen(true)}
                                className="h-12 px-6 bg-black text-white rounded-xl border-2 border-black font-black shadow-neo hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm flex items-center gap-2 whitespace-nowrap"
                            >
                                <Plus className="w-5 h-5" />
                                UPLOAD
                            </button>
                        </div>

                        {/* Content Grid */}
                        <div className="flex-1 overflow-y-auto p-6 bg-gray-100/50">
                            {isLoading ? (
                                <div className="flex justify-center py-20">
                                    <Loader2 className="w-10 h-10 animate-spin text-black/20" />
                                </div>
                            ) : mediaItems.length === 0 ? (
                                <div className="text-center py-20 opacity-50 font-bold border-4 border-dashed border-black/10 rounded-3xl">
                                    <p>No media found.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {mediaItems.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => onSelect(item.url)}
                                            className="group relative aspect-square bg-gray-200 rounded-xl overflow-hidden border-2 border-black/10 hover:border-black cursor-pointer shadow-sm hover:shadow-neo transition-all"
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={item.url}
                                                alt={item.filename}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {/* Selection Overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="bg-white text-black px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 shadow-neo-sm">
                                                    <Check className="w-3 h-3" />
                                                    SELECT
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!isLoading && total > 0 && (
                                <div className="flex justify-center mt-8 pt-4 border-t-2 border-dashed border-black/5">
                                    <NeoPagination
                                        currentPage={page}
                                        totalPages={Math.ceil(total / 12)}
                                        onPageChange={(newPage) => {
                                            setPage(newPage);
                                            loadMedia(newPage);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>

                    <MediaUploadDialog
                        isOpen={isUploadOpen}
                        onClose={() => setIsUploadOpen(false)}
                        onUploadComplete={() => {
                            setIsUploadOpen(false);
                            setPage(1);
                            loadMedia(1);
                        }}
                    />
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
