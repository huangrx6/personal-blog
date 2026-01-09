import { prisma } from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Edit, Calendar, Clock, Sparkles, Hash, Terminal, Tag } from "lucide-react"
import { MarkdownRenderer } from "@/components/blog/markdown-renderer"
import { PublishToggleButton } from "@/components/admin/publish-toggle-button"
import { AnimatedMascots } from "@/components/ui/animated-mascots"
import { FloatingShapes } from "@/components/ui/floating-shapes"
import { BackButton } from "@/components/ui/back-button"

export default async function PostPreviewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            category: true
        }
    })

    if (!post) {
        notFound()
    }

    return (
        <div className="relative max-w-4xl mx-auto px-4 min-h-screen">
            {/* Animated mascots on sides */}
            <AnimatedMascots />

            {/* Floating geometric shapes (Memphis/Pro Max style) */}
            <FloatingShapes />

            {/* Background soft gradients */}
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none"></div>

            {/* Header Bar */}
            <div className="relative flex items-center justify-between bg-white/90 backdrop-blur-md border-3 border-black p-4 rounded-2xl shadow-neo sticky top-4 z-40 mb-8 transition-transform hover:scale-[1.01] duration-300">
                <BackButton />

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg border border-black/5 mr-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-black/40 uppercase tracking-widest">Live Preview</span>
                    </div>

                    <PublishToggleButton postId={post.id} initialStatus={post.status} />

                    <Link
                        href={`/admin/posts/${post.id}`}
                        className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary hover:text-white hover:scale-105 hover:shadow-lg transition-all border-2 border-transparent hover:border-black"
                    >
                        <Edit className="w-4 h-4" />
                        <span>编辑文章</span>
                    </Link>
                </div>
            </div>

            {/* Article - Clean Organic Card Style */}
            <article className="relative bg-white border-4 border-black rounded-[40px] shadow-neo-lg overflow-hidden mb-20 group">
                {/* Decorative top pattern/progress bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-black/5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent w-full animate-progress-indeterminate"></div>
                </div>

                {/* Hero Section with animated grid */}
                <div className="relative pt-20 pb-16 px-8 lg:px-16 border-b-2 border-dashed border-black/10 overflow-hidden">
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

                    {/* Floating Tech Elements */}
                    <div className="absolute top-10 left-10 text-black/5 font-mono text-6xl font-black select-none pointer-events-none">01</div>
                    <div className="absolute bottom-10 right-10 text-black/5 font-mono text-6xl font-black select-none pointer-events-none"></div>

                    {/* Decorative brackets */}
                    <div className="absolute top-12 right-12 text-black/20 font-mono text-xl animate-pulse delay-700">[ SYSTEM_READY ]</div>

                    <div className="relative z-10">
                        {/* Category & Status */}
                        <div className="flex items-center gap-3 mb-8">
                            {post.category && (
                                <div
                                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default border-2 border-black"
                                    style={{ backgroundColor: post.category.color }}
                                >
                                    <Tag className="w-3.5 h-3.5" />
                                    <span>{post.category.name}</span>
                                </div>
                            )}

                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-black rounded-full text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                <span>BLOG POST</span>
                            </div>

                            <div className="w-full h-px bg-black/10 flex-1"></div>

                            <div className="font-mono text-xs font-bold text-black/40">
                                ID: {post.id.slice(0, 8)}...
                            </div>
                        </div>

                        {/* Title with hover effect */}
                        <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight mb-8 text-black group-hover:text-primary transition-colors duration-300 decoration-4 decoration-black/10 underline-offset-8">
                            {post.title || "无标题文章"}
                        </h1>

                        {/* Meta info cards */}
                        <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
                            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border-2 border-black/10 hover:border-black hover:bg-blue-50 transition-all cursor-default">
                                <div className="p-1 bg-blue-100 rounded-md text-blue-600">
                                    <Calendar className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-black/70">
                                    {new Date(post.createdAt).toLocaleDateString('zh-CN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>

                            {post.updatedAt && post.updatedAt > post.createdAt && (
                                <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border-2 border-black/10 hover:border-black hover:bg-purple-50 transition-all cursor-default">
                                    <div className="p-1 bg-purple-100 rounded-md text-purple-600">
                                        <Clock className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-black/70">
                                        更新于 {new Date(post.updatedAt).toLocaleDateString('zh-CN')}
                                    </span>
                                </div>
                            )}

                            {/* Reading time Estimate (Mock) */}
                            <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border-2 border-black/10 hover:border-black hover:bg-orange-50 transition-all cursor-default ml-auto">
                                <div className="p-1 bg-orange-100 rounded-md text-orange-600">
                                    <Terminal className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-black/70">
                                    {Math.ceil((post.content?.length || 0) / 500)} min read
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative bg-white px-8 lg:px-16 py-12 min-h-[400px]">
                    {/* Subtle aesthetic pattern */}
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Hash className="w-32 h-32 rotate-12" />
                    </div>

                    <div className="max-w-3xl mx-auto relative z-10">
                        {post.content ? (
                            <MarkdownRenderer content={post.content} />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-black/40">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                                    <Edit className="w-6 h-6 opacity-50" />
                                </div>
                                <p className="text-lg font-bold">暂无内容</p>
                                <p className="text-sm opacity-60">点击上方按钮开始写作</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer decorative bar */}
                <div className="h-3 bg-black w-full relative overflow-hidden flex">
                    <div className="w-1/3 h-full bg-primary"></div>
                    <div className="w-1/3 h-full bg-secondary"></div>
                    <div className="w-1/3 h-full bg-accent"></div>
                </div>
            </article>
        </div>
    )
}
