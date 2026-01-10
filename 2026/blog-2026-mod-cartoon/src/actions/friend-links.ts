"use server";

import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function getFriendLinks() {
    try {
        const links = await prisma.friendLink.findMany({
            orderBy: { createdAt: "desc" }
        });
        return { success: true, data: links };
    } catch (e) {
        return { success: false, error: "Failed to fetch links" };
    }
}

export async function createFriendLink(formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) return { success: false, message: "Unauthorized" };

    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    const description = formData.get("description") as string;
    const avatar = formData.get("avatar") as string;
    const style = formData.get("style") as string || "neo";
    const active = formData.get("active") === "on";

    if (!name || !url) {
        return { success: false, message: "Name and URL are required" };
    }

    try {
        await prisma.friendLink.create({
            data: {
                name,
                url,
                description,
                avatar,
                style,
                active
            }
        });
        revalidatePath("/admin/friends");
        revalidatePath("/friends");
        return { success: true, message: "Friend link created" };
    } catch (e) {
        return { success: false, message: "Database Error" };
    }
}

export async function updateFriendLink(id: string, formData: FormData) {
    const session = await auth();
    if (!session?.user?.email) return { success: false, message: "Unauthorized" };

    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    const description = formData.get("description") as string;
    const avatar = formData.get("avatar") as string;
    const style = formData.get("style") as string;
    const active = formData.get("active") === "on";

    try {
        await prisma.friendLink.update({
            where: { id },
            data: {
                name,
                url,
                description,
                avatar,
                style,
                active
            }
        });
        revalidatePath("/admin/friends");
        revalidatePath("/friends");
        return { success: true, message: "Updated successfully" };
    } catch (e) {
        return { success: false, message: "Failed to update" };
    }
}

export async function deleteFriendLink(id: string) {
    const session = await auth();
    if (!session?.user?.email) return { success: false, message: "Unauthorized" };

    try {
        await prisma.friendLink.delete({ where: { id } });
        revalidatePath("/admin/friends");
        revalidatePath("/friends");
        return { success: true, message: "Deleted successfully" };
    } catch (e) {
        return { success: false, message: "Failed to delete" };
    }
}
