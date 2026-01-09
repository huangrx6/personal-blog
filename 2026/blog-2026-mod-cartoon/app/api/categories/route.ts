import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// GET /api/categories - Get all categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: "asc" },
            include: {
                _count: {
                    select: { posts: true }
                }
            }
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}

// POST /api/categories - Create a new category
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Generate slug from name
        const slug = body.name
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
            .replace(/(^-|-$)/g, "");

        const category = await prisma.category.create({
            data: {
                name: body.name,
                slug: slug || `category-${Date.now()}`,
                description: body.description || null,
                color: body.color || "#0EA5E9",
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error("Failed to create category:", error);
        return NextResponse.json(
            { error: "Failed to create category" },
            { status: 500 }
        );
    }
}
