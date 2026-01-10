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
    // Handle categoryId: convert empty string to null
    const rawCategoryId = formData.get("categoryId") as string
    const categoryId = rawCategoryId && rawCategoryId !== "" ? rawCategoryId : null
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

    // Check if slug exists
    const existingPost = await prisma.post.findUnique({
        where: { slug }
    })

    if (existingPost) {
        return {
            message: "Slug validation failed",
            errors: {
                slug: ["This slug is already used by another post (Published or Draft)."]
            }
        }
    }

    try {
        await prisma.post.create({
            data: {
                title,
                slug,
                content,
                status: published ? "PUBLISHED" : "DRAFT",
                authorId: user.id,
                categoryId // Pass undefined/null if empty
            }
        })
    } catch (e: any) {
        console.error("Create Post Error Details:", e)
        // Return actual error message for debugging
        return { message: `Database Error: ${e.message || "Unknown error"}` }
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

        const newStatus = post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED"

        await prisma.post.update({
            where: { id },
            data: { status: newStatus }
        })

        revalidatePath("/admin/posts")
        revalidatePath("/admin")
        revalidatePath(`/admin/posts/${id}/preview`)
        revalidatePath("/blog")

        return {
            success: true,
            published: newStatus === "PUBLISHED",
            message: newStatus === "PUBLISHED" ? "文章已发布" : "文章已转为草稿"
        }
    } catch (e) {
        console.error("Toggle publish failed", e)
        return { success: false, message: "操作失败" }
    }
}

// Helper to parse Markdown file on client or server
// We will do client-side reading to populate form, but this action is just a placeholder if we need it.
