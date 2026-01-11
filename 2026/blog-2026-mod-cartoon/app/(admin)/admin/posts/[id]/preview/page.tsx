import { PreviewActions } from "@/components/admin/preview-actions"
import { MarkdownRenderer } from "@/components/blog/markdown-renderer"
import { prisma } from "@/lib/db/prisma"
import { Calendar, Tag } from "lucide-react"
import { notFound } from "next/navigation"

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
        <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-8 max-w-[560px] sm:max-w-[640px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1200px] 2xl:max-w-[1400px] mx-auto w-full min-h-screen pb-20">

            {/* Actions Dock (Desktop Floating + Mobile Injection) */}
            <PreviewActions postId={post.id} postStatus={post.status} />

            {/* Spacer for top since header is gone */}
            <div className="h-4 md:h-0"></div>

            {/* Main Article Canvas */}
            <article className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative group transition-all hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 duration-300">

                {/* ID Tag */}
                <div className="absolute top-0 right-0 p-6 md:p-10 z-20 pointer-events-none mix-blend-difference text-white">
                    <div className="font-mono text-sm font-black opacity-50">
                        #{post.id.slice(0, 8).toUpperCase()}
                    </div>
                </div>

                {/* Hero Section */}
                <div className="relative border-b-4 border-black bg-[#FFDE00] p-8 md:p-20 overflow-hidden">
                    {/* Clean Background */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#000_1px,transparent_1px)] [background-size:24px_24px]"></div>

                    <div className="relative z-10 max-w-5xl">
                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            {post.category && (
                                <div
                                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-black text-black border-2 border-black bg-white shadow-neo"
                                >
                                    <Tag className="w-4 h-4" />
                                    <span>{post.category.name}</span>
                                </div>
                            )}
                            <div className="px-4 py-1.5 bg-black text-white rounded-full text-xs font-black uppercase tracking-widest">
                                Preview
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-black mb-12">
                            {post.title || "UNTITLED"}
                        </h1>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-8 text-sm font-bold border-t-2 border-black pt-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col leading-none gap-1">
                                    <span className="text-[10px] uppercase tracking-widest opacity-60">Published</span>
                                    <span>
                                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>

                            {post.updatedAt && post.updatedAt > post.createdAt && (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-black rounded-full"></div>
                                    </div>
                                    <div className="flex flex-col leading-none gap-1">
                                        <span className="text-[10px] uppercase tracking-widest opacity-60">Updated</span>
                                        <span>{new Date(post.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            )}

                            <div className="ml-auto hidden sm:block">
                                <div className="bg-white border-2 border-black px-4 py-2 rounded-xl font-mono text-sm">
                                    {Math.ceil((post.content?.length || 0) / 500)} min read
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white p-6 md:p-20 min-h-[600px]">
                    <div className="max-w-4xl mx-auto prose prose-xl md:prose-2xl prose-stone prose-headings:font-black prose-headings:tracking-tight prose-p:font-medium prose-p:leading-relaxed prose-img:rounded-2xl prose-img:border-4 prose-img:border-black prose-img:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic">
                        {post.content ? (
                            <MarkdownRenderer content={post.content} />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-40 opacity-20">
                                <span className="text-9xl font-black text-black/10">EMPTY</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-black text-white p-8 md:p-12 flex items-center justify-between">
                    <div className="font-mono text-xs opacity-50">END OF DOCUMENT</div>
                    <div className="flex gap-4">
                        <div className="w-4 h-4 border-2 border-white/20 rounded-full"></div>
                        <div className="w-4 h-4 border-2 border-white/20 rounded-full"></div>
                    </div>
                </div>
            </article>
        </div>
    )
}
