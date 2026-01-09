import { prisma } from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import EditPostForm from "./edit-form"
import Link from "next/link"
import { ArrowLeft, Eye } from "lucide-react"

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const [post, categories] = await Promise.all([
        prisma.post.findUnique({
            where: { id }
        }),
        prisma.category.findMany({
            orderBy: { name: "asc" }
        })
    ])

    if (!post) {
        notFound()
    }

    return (
        <div className="space-y-6">
            {/* Header Bar */}
            <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm border-4 border-black rounded-2xl p-4 shadow-neo">
                <Link
                    href="/admin/posts"
                    className="flex items-center gap-2 text-black/60 hover:text-black transition-colors font-bold"
                >
                    <ArrowLeft className="w-4 h-4" />
                    返回文章列表
                </Link>

                <div className="flex items-center gap-3">
                    <Link
                        href={`/admin/posts/${post.id}/preview`}
                        className="flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-xl border-2 border-black font-bold hover:bg-secondary hover:text-white transition-all"
                    >
                        <Eye className="w-4 h-4" />
                        预览
                    </Link>
                </div>
            </div>

            {/* Title */}
            <div className="bg-white/80 backdrop-blur-sm border-4 border-black rounded-2xl p-6 shadow-neo">
                <h1 className="text-3xl font-black tracking-tight">编辑文章</h1>
                <p className="text-black/50 font-medium mt-1">
                    {post.title || "无标题"}
                </p>
            </div>

            {/* Form */}
            <EditPostForm post={post} categories={categories} />
        </div>
    )
}

