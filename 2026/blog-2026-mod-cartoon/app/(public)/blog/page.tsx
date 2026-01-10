import { BlogClient } from "@/components/blog/BlogClient";
import DotGrid from "@/components/ui/dot-grid";
import { getPublishedPosts } from "@/lib/actions";
import { prisma } from "@/lib/db/prisma";

export default async function BlogIndexPage() {
    // Parallel fetching for performance
    const [initialData, categories] = await Promise.all([
        getPublishedPosts(1, 6),
        prisma.category.findMany({
            orderBy: { posts: { _count: 'desc' } }, // Sort by most popular categories
            include: { _count: { select: { posts: true } } }
        })
    ]);

    return (
        <div className="min-h-screen bg-white text-black relative overflow-hidden">
            {/* Background Pattern */}
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

            {/* Header Section */}
            <div className="relative pt-48 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
                <div className="relative z-10">
                    <h1 className="text-6xl md:text-8xl font-black font-cartoon uppercase tracking-tight mb-6">
                        BLOG
                        <span className="text-primary">.</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-bold max-w-2xl text-black/60">
                        在这里你会看到最新的想法，技术教程，以及一些日常碎碎念。
                    </p>
                </div>

                {/* Decorative floating element */}
                <div className="absolute top-20 right-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="absolute top-40 right-40 w-24 h-24 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
            </div>

            {/* Client Component: Search + Filter + Grid */}
            <BlogClient
                initialPosts={initialData.posts}
                initialHasMore={initialData.hasMore}
                categories={categories}
            />
        </div>
    );
}
