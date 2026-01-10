"use server";

import { prisma } from "@/lib/db/prisma";

import { cache } from 'react';

export const getSiteSettings = cache(async function getSiteSettings() {
    try {
        const settings = await prisma.siteSettings.findFirst();
        return settings;
    } catch (error) {
        console.warn("Failed to fetch site settings (using defaults):", error);
        return {
            id: "fallback",
            siteName: "Blog 2026",
            siteDescription: "System Maintenance Mode",
            author: "Admin",
            githubUrl: "",
            twitterUrl: "",
            emailAddress: "",
            weiboUrl: "",
            resumeUrl: "",
            fontStyle: "system",
            primaryColor: "#0EA5E9",
            mouseFollowEnabled: true,
            cursorStyle: "blob",
            highPerformanceMode: false,
            commentsEnabled: false,
            showReadingTime: true,
            aboutHeroTitle1: "System",
            aboutHeroTitle2: "Offline",
            aboutHeroDescription: "Database connection failed. Serving static fallback.",
            aboutSkills: [],
            aboutVibeCards: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
});

export async function getLatestPosts(limit: number = 3) {
    try {
        const posts = await prisma.post.findMany({
            where: { status: 'PUBLISHED' },
            orderBy: { createdAt: "desc" },
            take: limit,
            include: {
                category: true,
            },
        });
        return posts;
    } catch (error) {
        console.error("Failed to fetch latest posts:", error);
        return [];
    }
}

export async function getPublishedPosts(
    page: number = 1,
    limit: number = 6,
    categoryId?: string | null,
    search?: string
) {
    try {
        const where: any = { status: 'PUBLISHED' };

        if (categoryId) {
            where.categoryId = categoryId;
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } }
            ];
        }

        const posts = await prisma.post.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
            include: {
                category: true,
            },
        });

        // Check if there are more posts
        const total = await prisma.post.count({ where });
        const hasMore = (page * limit) < total;

        return { posts, hasMore, total };
    } catch (error) {
        console.error("Failed to fetch published posts:", error);
        return { posts: [], hasMore: false, total: 0 };
    }
}

export async function getPostBySlug(slug: string) {
    try {
        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                category: true,
                author: true,
            }
        });
        return post;
    } catch (error) {
        console.error("Failed to fetch post:", error);
        return null;
    }
}
