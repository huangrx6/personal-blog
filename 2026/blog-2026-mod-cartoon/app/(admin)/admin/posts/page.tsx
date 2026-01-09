import { deletePost } from "@/actions/posts"
import { prisma } from "@/lib/db/prisma"
import { Edit, Trash2, Plus, FileText, Clock, Eye, EyeOff, Archive, ExternalLink } from "lucide-react"
import Link from "next/link"
import { PostStatusToggle } from "@/components/admin/post-status-toggle"

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
                                className="group bg-white/80 backdrop-blur-sm border-4 border-black rounded-2xl overflow-hidden shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                            >
                                {/* Card Header with Status */}
                                <div className={`px-5 py-3 border-b-4 border-black ${getStatusColor(post.status).split(' ')[0]}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <StatusIcon className={`w-4 h-4 ${getStatusColor(post.status).split(' ')[1]}`} />
                                            <span className={`text-sm font-bold ${getStatusColor(post.status).split(' ')[1]}`}>
                                                {getStatusLabel(post.status)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-black/50">
                                            <Clock className="w-3 h-3" />
                                            <span>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-5">
                                    <h3 className="font-black text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
                                        {post.title || "无标题"}
                                    </h3>

                                    {/* Category Badge */}
                                    {post.category && (
                                        <div
                                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold mb-2"
                                            style={{ backgroundColor: `${post.category.color}20`, color: post.category.color }}
                                        >
                                            {post.category.name}
                                        </div>
                                    )}

                                    <p className="text-sm text-black/50 font-mono truncate mb-4">
                                        /{post.slug || "no-slug"}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Link
                                            href={`/admin/posts/${post.id}/preview`}
                                            className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 rounded-lg border-2 border-black font-bold text-xs hover:bg-gray-200 transition-colors"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            预览
                                        </Link>
                                        <Link
                                            href={`/admin/posts/${post.id}`}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary/10 rounded-lg border-2 border-black font-bold text-sm hover:bg-primary hover:text-white transition-colors"
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

                                    {/* Status Toggle */}
                                    <PostStatusToggle postId={post.id} currentStatus={post.status} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}
