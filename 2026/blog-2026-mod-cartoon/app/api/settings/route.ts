import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET /api/settings - Fetch site settings
export async function GET() {
    try {
        // Try to get existing settings, or create default if not exists
        let settings = await prisma.siteSettings.findUnique({
            where: { id: "default" }
        });

        if (!settings) {
            // Create default settings on first access
            settings = await prisma.siteSettings.create({
                data: { id: "default" }
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Failed to fetch settings:", error);
        return NextResponse.json(
            { error: "Failed to fetch settings" },
            { status: 500 }
        );
    }
}

// POST /api/settings - Update site settings
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Build update object, only including defined values
        const updateData: Record<string, unknown> = {};

        // Site Info
        if (body.siteName !== undefined) updateData.siteName = body.siteName;
        if (body.siteDescription !== undefined) updateData.siteDescription = body.siteDescription;
        if (body.author !== undefined) updateData.author = body.author;

        // Social Links
        if (body.githubUrl !== undefined) updateData.githubUrl = body.githubUrl;
        if (body.twitterUrl !== undefined) updateData.twitterUrl = body.twitterUrl;
        if (body.emailAddress !== undefined) updateData.emailAddress = body.emailAddress;
        if (body.weiboUrl !== undefined) updateData.weiboUrl = body.weiboUrl;

        // Appearance
        if (body.fontStyle !== undefined) updateData.fontStyle = body.fontStyle;
        if (body.primaryColor !== undefined) updateData.primaryColor = body.primaryColor;
        if (body.mouseFollowEnabled !== undefined) updateData.mouseFollowEnabled = body.mouseFollowEnabled;
        if (body.cursorStyle !== undefined) updateData.cursorStyle = body.cursorStyle;
        if (body.highPerformanceMode !== undefined) updateData.highPerformanceMode = body.highPerformanceMode;

        // Features
        if (body.commentsEnabled !== undefined) updateData.commentsEnabled = body.commentsEnabled;
        if (body.showReadingTime !== undefined) updateData.showReadingTime = body.showReadingTime;

        // About Page
        if (body.weiboUrl !== undefined) updateData.weiboUrl = body.weiboUrl;
        if (body.resumeUrl !== undefined) updateData.resumeUrl = body.resumeUrl;

        // About Page
        if (body.aboutHeroTitle2 !== undefined) updateData.aboutHeroTitle2 = body.aboutHeroTitle2;
        if (body.aboutHeroDescription !== undefined) updateData.aboutHeroDescription = body.aboutHeroDescription;
        if (body.aboutSkills !== undefined) updateData.aboutSkills = body.aboutSkills;
        if (body.aboutVibeCards !== undefined) updateData.aboutVibeCards = body.aboutVibeCards;

        const settings = await prisma.siteSettings.upsert({
            where: { id: "default" },
            update: updateData,
            create: {
                id: "default",
                siteName: body.siteName ?? "Blog 2026",
                siteDescription: body.siteDescription ?? "A creative personal blog",
                author: body.author ?? "",
                githubUrl: body.githubUrl ?? "",
                twitterUrl: body.twitterUrl ?? "",
                emailAddress: body.emailAddress ?? "",
                weiboUrl: body.weiboUrl ?? "",
                fontStyle: body.fontStyle ?? "system",
                primaryColor: body.primaryColor ?? "#0EA5E9",
                mouseFollowEnabled: body.mouseFollowEnabled ?? true,
                cursorStyle: body.cursorStyle ?? "blob",
                highPerformanceMode: body.highPerformanceMode ?? false,
                commentsEnabled: body.commentsEnabled ?? false,
                showReadingTime: body.showReadingTime ?? true,
                // About defaults
                aboutHeroTitle1: body.aboutHeroTitle1 ?? "不仅是",
                aboutHeroTitle2: body.aboutHeroTitle2 ?? "开发者",
                aboutHeroDescription: body.aboutHeroDescription ?? "我是一名热衷于创造极致用户体验的全栈开发者。\n游走于设计与代码之间，构建既好用又好看的数字产品。",
                aboutSkills: body.aboutSkills ?? undefined,
                aboutVibeCards: body.aboutVibeCards ?? undefined,
            }
        });

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Failed to update settings:", error);
        return NextResponse.json(
            { error: "Failed to update settings", details: String(error) },
            { status: 500 }
        );
    }
}
