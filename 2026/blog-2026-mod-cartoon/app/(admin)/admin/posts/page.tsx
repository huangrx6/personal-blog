import { deletePost } from "@/actions/posts"
import { PostStatusToggle } from "@/components/admin/post-status-toggle"
import { prisma } from "@/lib/db/prisma"
import { Archive, Clock, Edit, ExternalLink, Eye, EyeOff, FileText, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            category: true
        }
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PUBLISHED': return 'bg-secondary/20 text-secondary';
            case 'DRAFT': return 'bg-accent/20 text-accent';
            case 'OFFLINE': return 'bg-gray-200 text-gray-600';
            default: return 'bg-gray-200 text-gray-600';
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'PUBLISHED': return '已发布';
            case 'DRAFT': return '草稿';
            case 'OFFLINE': return '已下线';
            default: return '未知';
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PUBLISHED': return Eye;
            case 'DRAFT': return Archive;
            case 'OFFLINE': return EyeOff;
            default: return Archive;
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-sm border-4 border-black rounded-2xl p-6 shadow-neo">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">文章管理</h1>
                    <p className="text-black/50 font-medium">
                        共 {posts.length} 篇文章
                    </p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl border-2 border-black shadow-neo font-bold hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    新建文章
                </Link>
            </div>

            {/* Posts Grid */}
            {posts.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-sm border-4 border-black rounded-2xl p-12 shadow-neo text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl border-2 border-black flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-black mb-2">还没有文章</h3>
                    <p className="text-black/50 mb-6">点击上方按钮开始创作你的第一篇文章吧！</p>
                    <Link
                        href="/admin/posts/new"
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl border-2 border-black shadow-neo font-bold hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        新建文章
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => {
                        const StatusIcon = getStatusIcon(post.status);
                        return (
                            <div
                                key={post.id}
                                className="group bg-white/80 backdrop-blur-sm border-4 border-black rounded-2xl overflow-hidden shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all p-6 flex flex-col justify-between h-full"
                            >
                                <div>
                                    {/* Top Row: Title & Status */}
                                    <div className="flex items-start justify-between mb-4 gap-4">
                                        <h3 className="font-black text-xl leading-tight line-clamp-2">
                                            {post.title || "无标题"}
                                        </h3>
                                        <div className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-bold border-2 border-black flex items-center gap-1 ${getStatusColor(post.status).split(' ')[0]}`}>
                                            <StatusIcon className="w-3 h-3" />
                                            <span>{getStatusLabel(post.status)}</span>
                                        </div>
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-black/60 mb-6">
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
                                        <div className="flex items-center gap-1 max-w-[120px] truncate" title={post.slug || ""}>
                                            <FileText className="w-3 h-3" />
                                            <span className="truncate">/{post.slug || "no-slug"}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Row: Actions */}
                                <div className="space-y-3 mt-auto">
                                    <PostStatusToggle postId={post.id} currentStatus={post.status} />

                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/posts/${post.id}/preview`}
                                            className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg border-2 border-black font-bold text-xs hover:bg-gray-200 transition-colors"
                                            title="预览"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/posts/${post.id}`}
                                            className="flex-1 flex items-center justify-center gap-2 h-10 bg-primary/10 rounded-lg border-2 border-black font-bold text-sm hover:bg-primary hover:text-white transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                            编辑
                                        </Link>
                                        <form action={deletePost.bind(null, post.id)}>
                                            <button
                                                type="submit"
                                                className="flex items-center justify-center w-10 h-10 bg-red-50 rounded-lg border-2 border-black text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}
