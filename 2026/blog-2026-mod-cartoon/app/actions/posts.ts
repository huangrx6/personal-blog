'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
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
    const published = formData.get("published") === "on"

    if (!title || !slug || !content) {
        return { message: "Missing Fields" }
    }

    try {
        await prisma.post.update({
            where: { id },
            data: { title, slug, content, published }
        })
    } catch (e) {
        return { message: "Database Error: Failed to update post" }
    }

    revalidatePath("/admin/posts")
    redirect("/admin/posts")
}

export async function deletePost(id: string) {
    const session = await auth()
    if (!session?.user?.email) return { message: "Unauthorized" }

    try {
        await prisma.post.delete({ where: { id } })
        revalidatePath("/admin/posts")
    } catch (e) {
        console.error("Delete failed", e)
    }
}


// Helper to parse Markdown file on client or server
// We will do client-side reading to populate form, but this action is just a placeholder if we need it.
