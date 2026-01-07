import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditPostForm from "./edit-form"

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const post = await prisma.post.findUnique({
        where: { id: params.id }
    })

    if (!post) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Edit Post</h1>
            </div>

            <EditPostForm post={post} />
        </div>
    )
}
