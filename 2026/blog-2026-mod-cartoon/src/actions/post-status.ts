"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { PostStatus } from "@prisma/client";

export async function updatePostStatus(postId: string, status: PostStatus) {
    try {
        await prisma.post.update({
            where: { id: postId },
            data: { status }
        });
        revalidatePath("/admin/posts");
        return { success: true };
    } catch (error) {
        console.error("Failed to update post status:", error);
        return { success: false, error: "Failed to update status" };
    }
}
