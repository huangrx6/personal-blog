"use client";

import { MediaHeroDoodle } from "@/components/admin/media-hero-doodle";
import { MediaPreviewDialog } from "@/components/admin/media/media-preview-dialog";
import { MediaUploadDialog } from "@/components/admin/media/media-upload-dialog";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";
import { NeoPagination } from "@/components/ui/neo-pagination";
import { NeoSelect } from "@/components/ui/neo-select";
import { Image as ImageIcon, Loader2, Maximize2, Search, Trash2, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// Simple debounce hook removed as per request

export const dynamic = 'force-dynamic';

const CATEGORIES = [
    { id: 'all', label: 'All Categories' },
    { id: 'general', label: 'General' },
    { id: 'article_cover', label: 'Article Covers' },
    { id: 'avatar', label: 'Avatars' },
    { id: 'daily', label: 'Daily Notes' },
];

export default function MediaPage() {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<any | null>(null);

    // Filters
    const [searchValue, setSearchValue] = useState("");
    const [activeSearch, setActiveSearch] = useState("");
    const [category, setCategory] = useState("all");

    // Data State
    const [mediaItems, setMediaItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [isLoadingMore, setIsLoadingMore] = useState(false); // Removed
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    // const [hasMore, setHasMore] = useState(true); // Removed

    const { confirm } = useConfirmDialog();

    const loadMedia = useCallback(async (pageNum: number) => {
        try {
            setIsLoading(true);

            const { getMediaList } = await import("@/actions/media");
            // Pass filters to server action
            const result = await getMediaList(pageNum, 10, activeSearch, category);

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

    // Reload when filters change
    useEffect(() => {
        setPage(1);
        loadMedia(1);
    }, [loadMedia]);

    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setActiveSearch(searchValue);
        }
    };



    const handleRefresh = () => {
        setPage(1);
        loadMedia(1);
    };

    const handleDelete = async (id: string) => {
        const isConfirmed = await confirm({
            title: "Delete Image?",
            message: "This action cannot be undone. The image will be permanently removed from storage.",
            variant: "danger",
            confirmText: "Delete Forever"
        });

        if (!isConfirmed) return;

        try {
            const { deleteMedia } = await import("@/actions/media");
            await deleteMedia(id);
            toast.success("Image deleted successfully");
            setMediaItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            toast.error("Failed to delete image");
        }
    };

    return (
        <div className="space-y-6 relative min-h-[80vh] pb-20">
            <MediaUploadDialog
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                onUploadComplete={() => {
                    handleRefresh();
                    setIsUploadOpen(false);
                }}
            />

            <MediaPreviewDialog
                isOpen={!!selectedMedia}
                onClose={() => setSelectedMedia(null)}
                media={selectedMedia}
            />

            {/* Redesigned Hero Header */}
            <div className="relative w-full bg-white border-4 border-black rounded-3xl overflow-hidden shadow-neo mb-10 min-h-[300px] md:min-h-[340px] flex flex-col md:flex-row group">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}
                />

                {/* Left: Text Content */}
                <div className="relative z-20 flex-1 p-10 md:p-16 flex flex-col justify-center items-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-bold rounded-full mb-6">
                        <ImageIcon className="w-3 h-3" />
                        <span>ASSET MANAGEMENT</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-sm">
                        Media
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] to-[#FB923C] [-webkit-text-stroke:2px_black]">
                            Library
                        </span>
                    </h1>

                    <p className="font-bold text-black/60 md:text-lg max-w-md leading-relaxed mb-8">
                        管理博客图片和文件资源，打造精彩视觉体验。
                    </p>

                    <button
                        onClick={() => setIsUploadOpen(true)}
                        className="group flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl border-2 border-black font-black shadow-neo hover:bg-primary hover:text-white hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all active:scale-95"
                    >
                        <Upload className="w-5 h-5 group-hover:animate-bounce" />
                        <span>UPLOAD NEW</span>
                    </button>
                </div>

                {/* Right: Visuals (Doodle) */}
                <div className="absolute inset-0 md:static md:w-1/2 overflow-visible md:overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent md:hidden z-10" />
                    <div className="absolute right-[-20%] top-0 bottom-0 w-full md:w-full flex items-center justify-center md:justify-end pr-0 transform scale-90 md:scale-100 origin-center">
                        <MediaHeroDoodle />
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search by filename & press Enter..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-black/10 focus:border-black outline-none transition-colors font-bold placeholder:font-medium"
                    />
                </div>

                {/* Categories */}
                <div className="w-full md:w-48">
                    <NeoSelect
                        value={category}
                        onChange={(value) => setCategory(value)}
                        options={CATEGORIES.map(c => ({
                            value: c.id,
                            label: c.label,
                            emoji: c.id === 'all' ? '📂' : c.id === 'general' ? '📄' : c.id === 'article_cover' ? '🖼️' : c.id === 'avatar' ? '👤' : '📝'
                        }))}
                        placeholder="Select Category"
                    />
                </div>
            </div>

            {/* Media Grid */}
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin w-10 h-10 text-black/20" />
                </div>
            ) : mediaItems.length === 0 ? (
                <div className="text-center py-20 opacity-50 font-bold border-4 border-dashed border-black/10 rounded-3xl min-h-[300px] flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-xl">No images found</p>
                    {activeSearch || category !== 'all' ? (
                        <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
                    ) : (
                        <p className="text-sm text-gray-400 mt-2">Upload your first one!</p>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {mediaItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedMedia(item)}
                            className="group relative aspect-square bg-gray-100 rounded-2xl overflow-hidden border-2 border-black/10 hover:border-black transition-all cursor-pointer shadow-sm hover:shadow-neo-sm"
                        >
                            {/* Image */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={item.url}
                                alt={item.filename}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Badges */}
                            <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                                <div className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.type.split('/')[1].toUpperCase()}
                                </div>
                                {item.category && item.category !== 'general' && (
                                    <div className="bg-yellow-400 text-black border border-black text-[10px] px-2 py-0.5 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        {item.category.replace('_', ' ')}
                                    </div>
                                )}
                            </div>

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedMedia(item);
                                    }}
                                    className="p-2 bg-white rounded-xl hover:bg-black hover:text-white transition-all shadow-lg hover:scale-110 active:scale-95"
                                    title="View"
                                >
                                    <Maximize2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(item.id);
                                    }}
                                    className="p-2 bg-white rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg hover:scale-110 active:scale-95"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Load More */}
            {/* Pagination */}
            {!isLoading && (
                <div className="flex justify-center mt-12 pb-8">
                    <NeoPagination
                        currentPage={page}
                        totalPages={Math.ceil(total / 10)}
                        onPageChange={(newPage) => {
                            setPage(newPage);
                            loadMedia(newPage);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    />
                </div>
            )}
        </div>
    )
}
