"use client";

import { deletePost, getPosts } from "@/actions/posts";
import { PostStatusBadge } from "@/components/admin/post-status-badge";
import { PostsHeroDoodle } from "@/components/admin/posts-hero-doodle";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";
import { NeoPagination } from "@/components/ui/neo-pagination";
import { NeoSelect } from "@/components/ui/neo-select";
import { Clock, Edit, ExternalLink, FileText, Loader2, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const dynamic = 'force-dynamic';

const POST_STATUS_OPTIONS = [
    { value: 'all', label: '全部状态', emoji: '📝' },
    { value: 'PUBLISHED', label: 'Published', emoji: '✅' },
    { value: 'DRAFT', label: 'Drafts', emoji: '✏️' },
];

export default function AdminPostsPage() {
    // Data State
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0 });

    // Filters
    const [searchValue, setSearchValue] = useState("");
    const [activeSearch, setActiveSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);

    const { confirm } = useConfirmDialog();

    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, total } = await getPosts(page, 12, activeSearch, statusFilter);
            setPosts(data);
            setStats({ total });
        } catch (error) {
            toast.error("Failed to load posts");
        } finally {
            setIsLoading(false);
        }
    }, [page, activeSearch, statusFilter]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setActiveSearch(searchValue);
            setPage(1); // Reset to first page on new search
        }
    };

    const handleDelete = async (postId: string) => {
        const isConfirmed = await confirm({
            title: "Delete Post?",
            message: "This action cannot be undone.",
            variant: "danger",
            confirmText: "Delete"
        });

        if (!isConfirmed) return;

        try {
            await deletePost(postId);
            toast.success("Post deleted");
            fetchPosts(); // Reload list
        } catch (error) {
            toast.error("Failed to delete post");
        }
    };

    return (
        <div className="space-y-6 min-h-[80vh] pb-20">
            {/* Hero Section */}
            <div className="relative w-full bg-white border-4 border-black rounded-3xl overflow-hidden shadow-neo mb-10 min-h-[300px] md:min-h-[340px] flex flex-col md:flex-row group">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}
                />

                {/* Left: Text Content */}
                <div className="relative z-20 flex-1 p-10 md:p-16 flex flex-col justify-center items-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-bold rounded-full mb-4">
                        <Edit className="w-3 h-3" />
                        <span>CONTENT STUDIO</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4 drop-shadow-sm">
                        Post
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500 [-webkit-text-stroke:2px_black]">
                            Manager
                        </span>
                    </h1>

                    <p className="font-bold text-black/60 md:text-lg max-w-md mb-6">
                        Create, edit, and manage your blog posts with style.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/posts/new"
                            className="flex items-center gap-2 bg-green-400 text-black px-6 py-3 rounded-xl border-2 border-black shadow-neo font-black hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            <span>NEW POST</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-2 text-xs font-bold opacity-50">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                            {stats.total} STORIES
                        </div>
                    </div>
                </div>

                {/* Right: Visuals (Doodle) */}
                <div className="absolute inset-0 md:static md:w-1/2 overflow-visible md:overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent md:hidden z-10" />
                    <div className="absolute right-[-10%] md:right-0 top-0 bottom-0 w-full md:w-full flex items-center justify-center md:justify-end md:pr-[10%] transform scale-90 md:scale-100 origin-center">
                        <PostsHeroDoodle />
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
                        placeholder="Search posts by title..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-black/10 focus:border-black outline-none transition-colors font-bold placeholder:font-medium"
                    />
                </div>

                {/* Status Dropdown */}
                <div className="w-full md:w-48">
                    <NeoSelect
                        value={statusFilter}
                        onChange={(val) => setStatusFilter(val)}
                        options={POST_STATUS_OPTIONS}
                        placeholder="Filter Status"
                    />
                </div>
            </div>

            {/* Posts Grid */}
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-black/20" />
                </div>
            ) : posts.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-sm border-4 border-black rounded-2xl p-12 shadow-neo text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl border-2 border-black flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-black mb-2">No posts found</h3>
                    <p className="text-black/50 mb-6">
                        {activeSearch || statusFilter !== 'all' ? "Try adjusting your filters." : "Start writing your first story!"}
                    </p>
                    <Link
                        href="/admin/posts/new"
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl border-2 border-black shadow-neo font-bold hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Create New
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="group bg-white/80 backdrop-blur-sm border-4 border-black rounded-2xl overflow-hidden shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all p-6 flex flex-col justify-between h-full min-h-[220px]"
                        >
                            <div className="space-y-4">
                                {/* Top Row: Title & Status */}
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="font-black text-xl leading-tight line-clamp-2">
                                        {post.title || "Untitled Post"}
                                    </h3>
                                    <PostStatusBadge postId={post.id} currentStatus={post.status} />
                                </div>

                                {/* Meta Info */}
                                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-black/60">
                                    {post.category && (
                                        <div
                                            className="px-2 py-0.5 rounded-md border-2 border-black/10"
                                            style={{ backgroundColor: `${post.category.color}20`, color: post.category.color }}
                                        >
                                            {post.category.name}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
                                    </div>
                                    {post.coverImage && (
                                        <div className="flex items-center gap-1 text-blue-500" title="Has Cover Image">
                                            <ImageIcon className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions moved to bottom */}
                            <div className="pt-6 mt-auto flex items-center gap-2">
                                <Link
                                    href={`/admin/posts/${post.id}/preview`}
                                    className="flex items-center justify-center w-10 h-10 bg-white rounded-lg border-2 border-black font-bold text-xs hover:bg-gray-100 transition-all shadow-neo-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
                                    title="Preview"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                                <Link
                                    href={`/admin/posts/${post.id}`}
                                    className="flex-1 flex items-center justify-center gap-2 h-10 bg-white rounded-lg border-2 border-black font-bold text-sm hover:bg-yellow-100 transition-all shadow-neo-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-lg border-2 border-black text-white hover:bg-red-600 transition-all shadow-neo-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {/* Pagination */}
            {!isLoading && stats.total > 0 && (
                <div className="flex justify-center mt-8">
                    <NeoPagination
                        currentPage={page}
                        totalPages={Math.ceil(stats.total / 12)}
                        onPageChange={(newPage) => {
                            setPage(newPage);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    />
                </div>
            )}
        </div>
    )
}

function ImageIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
    )
}
