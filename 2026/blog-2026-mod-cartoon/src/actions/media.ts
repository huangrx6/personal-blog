"use server";

import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function getMediaList(page = 1, limit = 10, search?: string, category?: string) {
    const session = await auth();
    if (!session) return { data: [], hasMore: false };

    try {
        const skip = (page - 1) * limit;
        const where: any = {};

        if (search) {
            where.filename = { contains: search };
        }

        if (category && category !== 'all') {
            where.category = category;
        }

        const media = await prisma.media.findMany({
            take: limit,
            skip: skip,
            where: where,
            orderBy: { createdAt: 'desc' },
        });

        const total = await prisma.media.count({ where });
        const hasMore = skip + media.length < total;

        return { data: media, hasMore };
    } catch (error) {
        console.error("Failed to fetch media:", error);
        return { data: [], hasMore: false };
    }
}

export async function deleteMedia(id: string) {
    const session = await auth();
    if (!session) return { error: "Unauthorized" };

    try {
        await prisma.media.delete({
            where: { id },
        });
        revalidatePath("/admin/media");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete media:", error);
        return { error: "Failed to delete" };
    }
}
