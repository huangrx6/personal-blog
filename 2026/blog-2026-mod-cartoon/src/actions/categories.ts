"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(data: { name: string; description: string; color: string }) {
    try {
        const slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
            .replace(/(^-|-$)/g, "") || `category-${Date.now()}`;

        await prisma.category.create({
            data: {
                name: data.name,
                slug,
                description: data.description || null,
                color: data.color,
            }
        });

        revalidatePath("/admin/categories");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to create category:", error);
        // Check for unique constraint violation
        if (error?.code === "P2002") {
            return { success: false, error: "DUPLICATE" };
        }
        return { success: false, error: "Failed to create category" };
    }
}

export async function updateCategory(id: string, data: { name: string; description: string; color: string }) {
    try {
        const slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
            .replace(/(^-|-$)/g, "") || `category-${Date.now()}`;

        await prisma.category.update({
            where: { id },
            data: {
                name: data.name,
                slug,
                description: data.description || null,
                color: data.color,
            }
        });

        revalidatePath("/admin/categories");
        return { success: true };
    } catch (error) {
        console.error("Failed to update category:", error);
        return { success: false, error: "Failed to update category" };
    }
}

export async function deleteCategory(id: string) {
    try {
        await prisma.category.delete({
            where: { id }
        });

        revalidatePath("/admin/categories");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete category:", error);
        return { success: false, error: "Failed to delete category" };
    }
}
