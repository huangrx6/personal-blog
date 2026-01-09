import { prisma } from "@/lib/db/prisma";
import { NextResponse, NextRequest } from "next/server";

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET /api/categories/[id] - Get a single category
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                _count: { select: { posts: true } }
            }
        });

        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(category);
    } catch (error) {
        console.error("Failed to fetch category:", error);
        return NextResponse.json(
            { error: "Failed to fetch category" },
            { status: 500 }
        );
    }
}

// PUT /api/categories/[id] - Update a category
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();

        const category = await prisma.category.update({
            where: { id },
            data: {
                name: body.name,
                slug: body.slug,
                description: body.description,
                color: body.color,
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error("Failed to update category:", error);
        return NextResponse.json(
            { error: "Failed to update category" },
            { status: 500 }
        );
    }
}

// DELETE /api/categories/[id] - Delete a category
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;

        await prisma.category.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete category:", error);
        return NextResponse.json(
            { error: "Failed to delete category" },
            { status: 500 }
        );
    }
}
