"use client";

import { NeoPagination } from "@/components/ui/neo-pagination";
import { getPublishedPosts } from "@/lib/actions";
import { Category, Post } from "@prisma/client";
import { ArrowRight, Search, Tag, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Extended Post type to includes category
type PostWithCategory = Post & { category: Category | null; coverImage?: string | null };

interface BlogClientProps {
    initialPosts: PostWithCategory[];
    initialTotal: number;
    categories: Category[];
}

export function BlogClient({ initialPosts, initialTotal, categories }: BlogClientProps) {
    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Data State
    const [posts, setPosts] = useState<PostWithCategory[]>(initialPosts);
    // const [hasMore, setHasMore] = useState(initialHasMore);
    const [total, setTotal] = useState(0); // We need total count passed from server or implied
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(false);

    // Hardcoded limit match server default
    const LIMIT = 6;
    // We might need to fetch total count if not provided in props.
    // Assuming initialHasMore is not enough for pagination.
    // For now, let's fetch total when we filter.
    const [totalPages, setTotalPages] = useState(Math.ceil(initialTotal / LIMIT));

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Reset and Fetch when Filter Changes
    useEffect(() => {
        async function fetchNewData() {
            setIsLoading(true);
            const res = await getPublishedPosts(1, 6, selectedCategory, debouncedSearch);
            setPosts(res.posts as PostWithCategory[]);
            // setHasMore(res.hasMore);
            setTotalPages(Math.ceil(res.total / 6));
            setPage(1);
            setIsLoading(false);
        }

        if (isInitialLoad) {
            fetchNewData();
        } else {
            setIsInitialLoad(true);
        }

    }, [debouncedSearch, selectedCategory]);


    // Load More Function
    const handlePageChange = async (newPage: number) => {
        setIsLoading(true);
        const res = await getPublishedPosts(newPage, 6, selectedCategory, debouncedSearch);
        setPosts(res.posts as PostWithCategory[]);
        setPage(newPage);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };




    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('zh-CN', {
            dateStyle: 'long',
        }).format(new Date(date));
    };

    return (
        <div className="space-y-12">
            {/* Filter Section */}
            <div className="bg-white/80 backdrop-blur-md border-b-4 border-black sticky top-0 z-40 transition-all">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col gap-6">

                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative w-full md:max-w-md group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="搜索文章..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-11 pr-10 py-3 bg-white border-2 border-black rounded-xl font-bold placeholder-gray-400 focus:outline-none focus:ring-0 focus:shadow-neo-sm transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category List - Wrapped Layout */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-full border-2 font-bold text-sm transition-all cursor-pointer ${selectedCategory === null
                                ? "bg-black text-white border-black shadow-neo-sm hover:-translate-y-0.5"
                                : "bg-white text-black border-black hover:bg-gray-100"
                                }`}
                        >
                            全部
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-full border-2 font-bold text-sm transition-all flex items-center gap-1 cursor-pointer ${selectedCategory === cat.id
                                    ? "text-white border-black shadow-neo-sm -translate-y-0.5"
                                    : "bg-white text-black border-black hover:bg-gray-50"
                                    }`}
                                style={{
                                    backgroundColor: selectedCategory === cat.id ? cat.color : 'white',
                                    borderColor: 'black' // Always black border for brut style
                                }}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
                {posts.length === 0 && !isLoading ? (
                    <div className="py-20 text-center animate-in fade-in zoom-in duration-300">
                        <div className="inline-block bg-white border-4 border-black p-12 rounded-[2rem] shadow-neo">
                            <h3 className="text-2xl font-black mb-2">没有找到相关文章</h3>
                            <p className="text-gray-500 font-medium">换个关键词或分类试试看？</p>
                            <button
                                onClick={() => { setSearchQuery(""); setSelectedCategory(null) }}
                                className="mt-6 px-6 py-2 bg-primary text-white font-bold rounded-xl border-2 border-black hover:shadow-none shadow-neo-sm transition-all"
                            >
                                清除筛选
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-50 pointer-events-none">
                                {/* Loading Skeleton Placeholder - repurposing existing posts for skeleton look if available, else standard loader */}
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="h-[500px] bg-gray-100 rounded-3xl border-4 border-black border-dashed animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
                                {posts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${post.slug}`}
                                        className="group relative block bg-white border-4 border-black rounded-3xl shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 overflow-hidden flex flex-col h-full"
                                    >
                                        {/* Category Badge */}
                                        <div className="absolute top-4 right-4 z-10 pointer-events-none">
                                            {post.category ? (
                                                <span
                                                    className="inline-flex items-center gap-1 border-2 border-black px-3 py-1 rounded-full text-xs font-black uppercase shadow-neo-sm"
                                                    style={{ backgroundColor: post.category.color, color: 'white' }}
                                                >
                                                    <Tag size={12} />
                                                    {post.category.name}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 bg-gray-200 border-2 border-black px-3 py-1 rounded-full text-xs font-bold uppercase shadow-neo-sm">
                                                    Uncategorized
                                                </span>
                                            )}
                                        </div>

                                        {/* Cover Image */}
                                        <div className="aspect-[16/9] w-full bg-gray-100 border-b-4 border-black relative overflow-hidden group-hover:bg-primary/5 transition-colors">
                                            {post.coverImage ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-50 group-hover:bg-yellow-400 transition-colors">
                                                    <div className="text-4xl font-black text-black/10 uppercase tracking-tighter">
                                                        {post.category?.name || "BLOG"}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="text-xs font-bold text-black/40 mb-3 font-mono uppercase tracking-wider flex items-center gap-2">
                                                <span>{formatDate(post.createdAt)}</span>
                                                <span className="w-1 h-1 rounded-full bg-black/20" />
                                                <span>{post.authorId ? 'ADMIN' : 'GUEST'}</span>
                                            </div>

                                            <h2 className="text-2xl font-black mb-4 line-clamp-2 leading-tight group-hover:underline decoration-4 underline-offset-4 decoration-primary">
                                                {post.title}
                                            </h2>

                                            <p className="text-black/70 mb-6 line-clamp-3 font-medium flex-1">
                                                {post.content.slice(0, 100).replace(/[#*`]/g, '')}...
                                            </p>

                                            <div className="mt-auto pt-5 border-t-2 border-dashed border-black/10 flex items-center justify-between">
                                                <span className="font-black text-sm uppercase tracking-wide bg-primary/0 group-hover:bg-primary/20 px-2 -ml-2 rounded-lg transition-all py-1">
                                                    Read Article
                                                </span>
                                                <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center bg-white group-hover:bg-black group-hover:text-white transition-colors">
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="pt-8">
                            <NeoPagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
