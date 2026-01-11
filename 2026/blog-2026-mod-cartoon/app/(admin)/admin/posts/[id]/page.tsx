import { BackButton } from "@/components/admin/back-button"
import { prisma } from "@/lib/db/prisma"
import { Eye } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import EditPostForm from "./edit-form"

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
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            {/* Header Bar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <BackButton />
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight">Edit Post</h1>
                        <p className="text-black/60 font-medium">Refine your content.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href={`/admin/posts/${post.id}/preview`}
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl border-2 border-black font-bold shadow-neo hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                        <Eye className="w-4 h-4" />
                        <span>PREVIEW</span>
                    </Link>
                </div>
            </div>

            {/* Form */}
            <EditPostForm post={post} categories={categories} />
        </div>
    )
}

