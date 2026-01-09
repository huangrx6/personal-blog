"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data/blog-data";
import { FloatingElement } from "@/components/parallax";
import { ArrowRight, Calendar } from "lucide-react";

const categories = ["All", "Design", "Code", "Writing", "Philosophy", "Engineering"];

export default function BlogPage() {
    return (
        <div className="flex flex-col">
            {/* ============================================
          Page Header - 视差效果
          ============================================ */}
            <section className="relative min-h-[60vh] flex items-center px-6 lg:px-8 pt-24">
                {/* 浮动装饰 */}
                <FloatingElement delay={0.5} duration={5} amplitude={15} className="absolute top-32 right-20 w-20 h-20 opacity-40 hidden md:block">
                    <Image src="/parallax/shapes.png" alt="" fill className="object-contain" />
                </FloatingElement>

                <div className="max-w-7xl mx-auto w-full">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-2 mb-6 rounded-full border-2 border-black bg-white/80 backdrop-blur-sm shadow-neo-sm text-sm font-bold animate-slide-up">
                            📝 Blog
                        </span>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                            <span className="text-gradient-primary">Ideas</span> & Stories
                        </h1>

                        <p className="text-xl text-black/60 max-w-lg animate-slide-up" style={{ animationDelay: "0.2s" }}>
                            Thoughts, ideas, and explorations in design, code, and creative work.
                        </p>

                        {/* Category Filter */}
                        <div className="mt-8 flex flex-wrap gap-2 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                            {categories.map((category, index) => (
                                <Button
                                    key={category}
                                    variant={index === 0 ? "default" : "outline"}
                                    size="sm"
                                    className="rounded-full border-2 shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
          Blog Posts Grid - Sticky 堆叠
          ============================================ */}
            <section className="parallax-section-sticky bg-white py-24 px-6 lg:px-8" style={{ zIndex: 11 }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="glass-card-hover p-6 flex flex-col group animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Category */}
                                <span className="inline-block px-3 py-1 text-xs font-bold bg-primary/20 text-primary rounded-full self-start mb-4">
                                    {post.category}
                                </span>

                                {/* Title */}
                                <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-sm text-black/60 mb-4 flex-1 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Meta */}
                                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                                    <div className="flex items-center gap-2 text-xs text-black/40">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
