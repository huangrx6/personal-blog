"use client";

import { Category, Post } from "@prisma/client";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import Link from "next/link";

interface LatestPostsProps {
    posts: (Post & { category: Category | null } & { coverImage?: string })[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <section className="w-full bg-white py-32 px-6 md:px-12 border-t-4 border-black">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <h2 className="text-[10vw] lg:text-[6vw] font-black uppercase leading-[0.85]">
                        最新 <br /> <span className="text-outline-black text-transparent">文章</span>
                    </h2>
                    <Link href="/blog" className="hidden md:flex items-center gap-2 text-xl font-bold hover:underline decoration-4 underline-offset-4">
                        查看全部 <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                            <div className="neo-card bg-white h-full hover:-translate-y-2 hover:shadow-neo-lg transition-all border-2 border-black p-0 overflow-hidden flex flex-col">
                                {/* Image Placeholder or Real Image */}
                                <div className="aspect-[16/9] w-full bg-black/5 relative border-b-2 border-black overflow-hidden">
                                    {post.coverImage ? (
                                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center font-black text-4xl text-black/10 bg-${index % 2 === 0 ? 'primary' : 'highlight'}`}>
                                            BLOG
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        {post.category && (
                                            <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                                <Tag className="w-3 h-3" /> {post.category.name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-sm font-bold opacity-60 mb-4">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </div>
                                    <h3 className="text-2xl font-black mb-4 line-clamp-2 md:text-3xl leading-tight group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-lg opacity-80 line-clamp-3 mb-8 flex-1">
                                        {post.content.slice(0, 100).replace(/[#*`]/g, '') || "点击阅读更多内容..."}
                                    </p>
                                    <div className="flex items-center gap-2 font-bold underline decoration-2">
                                        READ ARTICLE <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-12 md:hidden text-center">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-xl font-bold hover:underline decoration-4 underline-offset-4">
                        查看全部 <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
