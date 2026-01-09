import { prisma } from "@/lib/db/prisma"
import { FloatingShapes } from "@/components/ui/floating-shapes"
import { Plus } from "lucide-react"
import { CategoryList } from "@/components/admin/category-list"
import { CategoryForm } from "@/components/admin/category-form"

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
        include: {
            _count: {
                select: { posts: true }
            }
        }
    })

    return (
        <div className="space-y-8 relative min-h-[80vh]">
            <FloatingShapes />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl lg:text-5xl font-black font-cartoon tracking-wide mb-2">分类管理</h1>
                    <p className="text-black/60 font-medium">管理文章分类，让内容井井有条。共 {categories.length} 个分类</p>
                </div>

                <CategoryForm mode="create" />
            </div>

            {/* Categories Grid */}
            {categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border-4 border-dashed border-black/10 rounded-[2rem] bg-white/50">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <Plus className="w-8 h-8 opacity-40" />
                    </div>
                    <h3 className="text-xl font-bold text-black/40 mb-2">还没有分类</h3>
                    <p className="text-black/30">点击上方按钮添加第一个分类</p>
                </div>
            ) : (
                <CategoryList categories={categories} />
            )}
        </div>
    )
}
