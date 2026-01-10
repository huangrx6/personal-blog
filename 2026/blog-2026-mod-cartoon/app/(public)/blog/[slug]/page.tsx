import { BlogPostLayout } from "@/components/blog/blog-post-layout";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { ScrollProgress } from "@/components/blog/scroll-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import DotGrid from "@/components/ui/dot-grid";
import { getPostBySlug } from "@/lib/actions";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Helper to format date
const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
        dateStyle: 'long',
    }).format(new Date(date));
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    // Awaiting params is required in recent Next.js versions for dynamic routes
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Calculate reading time (rough estimate: 500 chars / min for Chinese/English mix)
    const readingTime = Math.ceil(post.content.length / 500);

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-black pb-24 relative selection:bg-primary selection:text-white">
            <ScrollProgress />

            {/* Header Section */}
            <header className="bg-white border-b-4 border-black pt-48 pb-16 px-6 lg:px-12 relative overflow-hidden">
                {/* Dot Grid Background */}
                <div className="absolute inset-0 z-0">
                    <DotGrid
                        dotSize={2}
                        gap={25}
                        baseColor="#a1a1aa"
                        activeColor="#7e22ce"
                        proximity={200}
                        shockRadius={100}
                    />
                </div>
                <div className="max-w-7xl mx-auto relative z-10 w-full">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 font-bold mb-8 text-black/60 hover:text-black transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-full border-2 border-black/20 group-hover:border-black flex items-center justify-center bg-white transition-all group-hover:-translate-x-1">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        Back to Blog
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        {post.category && (
                            <span
                                className="border-2 border-black px-4 py-1.5 rounded-full font-black uppercase text-sm shadow-neo-sm flex items-center gap-2"
                                style={{ backgroundColor: post.category.color, color: 'white' }}
                            >
                                <Tag size={14} />
                                {post.category.name}
                            </span>
                        )}
                        <span className="bg-black text-white px-4 py-1.5 rounded-full font-bold flex items-center gap-2 text-sm shadow-neo-sm">
                            <Calendar size={14} />
                            {formatDate(post.createdAt)}
                        </span>
                        <span className="bg-white border-2 border-black text-black px-4 py-1.5 rounded-full font-bold flex items-center gap-2 text-sm shadow-neo-sm">
                            <Clock size={14} />
                            {readingTime} min read
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-8 max-w-5xl">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 border-t-2 border-black/5 pt-8 w-full max-w-2xl">
                        <div className="w-12 h-12 bg-gray-200 rounded-full border-2 border-black overflow-hidden relative">
                            {/* Initials Avatar */}
                            <div className="absolute inset-0 flex items-center justify-center bg-primary text-white font-black text-xl">
                                {(post.author?.name || "A").charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-lg leading-none mb-1">
                                {post.author?.name || "Anonymous Author"}
                            </span>
                            <span className="text-sm font-bold text-black/40">
                                {post.author?.email || "Content Creator"}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Layout */}
            <main className="max-w-7xl mx-auto py-12 lg:py-20 relative">
                <BlogPostLayout
                    sidebar={<TableOfContents />}
                >
                    <div className="bg-white border-4 border-black p-8 md:p-12 rounded-[2rem] shadow-neo relative">
                        {/* Decorative Tape */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-yellow-400/80 -rotate-1 shadow-sm border border-black/10 z-10" />

                        <MarkdownRenderer content={post.content} />
                    </div>
                </BlogPostLayout>
            </main>
        </div>
    );
}
