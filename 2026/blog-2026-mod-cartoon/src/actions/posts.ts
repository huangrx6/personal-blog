'use server'

import { auth } from "@/lib/auth/config"
import { prisma } from "@/lib/db/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export type PostState = {
    message?: string | null
    errors?: {
        title?: string[]
        slug?: string[]
        content?: string[]
    }
}

export async function createPost(prevState: PostState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.email) {
        return { message: "Unauthorized" }
    }

    // Find user to associate author
    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })
    if (!user) {
        return { message: "User not found" }
    }

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const content = formData.get("content") as string
    const published = formData.get("published") === "on"

    // Basic validation
    if (!title || !slug || !content) {
        return {
            message: "Missing Fields",
            errors: {
                title: !title ? ["Title is required"] : [],
                slug: !slug ? ["Slug is required"] : [],
                content: !content ? ["Content is required"] : []
            }
        }
    }

    try {
        await prisma.post.create({
            data: {
                title,
                slug,
                content,
                published,
                authorId: user.id
            }
        })
    } catch (e) {
        console.error(e)
        return { message: "Database Error: Failed to create post (Slug might be duplicate)" }
    }

    revalidatePath("/admin/posts")
    redirect("/admin/posts")
}

export async function updatePost(id: string, prevState: PostState, formData: FormData) {
    const session = await auth()
    if (!session?.user?.email) return { message: "Unauthorized" }

    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const content = formData.get("content") as string
    const categoryId = formData.get("categoryId") as string

    if (!title || !slug || !content) {
        return { message: "Missing Fields" }
    }

    try {
        await prisma.post.update({
            where: { id },
            data: {
                title,
                slug,
                content,
                categoryId: categoryId || null
            }
        })
    } catch (e) {
        return { message: "Database Error: Failed to update post" }
    }

    revalidatePath("/admin/posts")
    redirect("/admin/posts")
}

export async function deletePost(id: string) {
    const session = await auth()
    if (!session?.user?.email) return

    try {
        await prisma.post.delete({ where: { id } })
        revalidatePath("/admin/posts")
        revalidatePath("/admin")
    } catch (e) {
        console.error("Delete failed", e)
    }
}

export async function togglePublish(id: string) {
    const session = await auth()
    if (!session?.user?.email) {
        return { success: false, message: "Unauthorized" }
    }

    try {
        const post = await prisma.post.findUnique({ where: { id } })
        if (!post) {
            return { success: false, message: "Post not found" }
        }

        await prisma.post.update({
            where: { id },
            data: { published: !post.published }
        })

        revalidatePath("/admin/posts")
        revalidatePath("/admin")
        revalidatePath(`/admin/posts/${id}/preview`)
        revalidatePath("/blog")

        return {
            success: true,
            published: !post.published,
            message: !post.published ? "文章已发布" : "文章已转为草稿"
        }
    } catch (e) {
        console.error("Toggle publish failed", e)
        return { success: false, message: "操作失败" }
    }
}

// Helper to parse Markdown file on client or server
// We will do client-side reading to populate form, but this action is just a placeholder if we need it.
