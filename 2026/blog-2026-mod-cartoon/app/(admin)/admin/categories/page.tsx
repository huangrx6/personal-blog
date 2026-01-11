import { CategoriesHeroDoodle } from "@/components/admin/categories-hero-doodle";
import { CategoryForm } from "@/components/admin/category-form";
import { CategoryList } from "@/components/admin/category-list";
import { prisma } from "@/lib/db/prisma";
import { Plus } from "lucide-react";

export const dynamic = 'force-dynamic';

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
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative w-full bg-white border-4 border-black rounded-3xl overflow-hidden shadow-neo mb-10 min-h-[300px] md:min-h-[340px] flex flex-col md:flex-row group">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}
                />

                {/* Left: Text Content */}
                <div className="relative z-20 flex-1 p-10 md:p-16 flex flex-col justify-center items-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-bold rounded-full mb-4">
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        <span>TAXONOMY</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4 drop-shadow-sm">
                        Category
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 [-webkit-text-stroke:2px_black]">
                            Manager
                        </span>
                    </h1>

                    <p className="font-bold text-black/60 md:text-lg max-w-md mb-6">
                        Organize your content with smart categorization efficiently.
                    </p>

                    <div className="flex items-center gap-4">
                        {/* Button reused naturally via the existing CategoryForm but styled? 
                             Actually the CategoryForm is a button trigger. We might need to wrap it or check it.
                             Checking previous code: <CategoryForm mode="create" />
                             We'll wrap it to style it or ask user later. For now, let's keep it simple or try to style it if it accepts className.
                             Wait, CategoryForm likely renders a DialogTrigger. Let's just place it here.
                         */}
                        <div className="[&>button]:bg-blue-400 [&>button]:text-black [&>button]:px-6 [&>button]:py-3 [&>button]:rounded-xl [&>button]:border-2 [&>button]:border-black [&>button]:shadow-neo [&>button]:font-black [&>button]:hover:shadow-none [&>button]:transition-all">
                            <CategoryForm mode="create" />
                        </div>

                        <div className="hidden md:flex items-center gap-2 text-xs font-bold opacity-50">
                            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                            {categories.length} CATEGORIES
                        </div>
                    </div>
                </div>

                {/* Right: Visuals (Doodle) */}
                <div className="absolute inset-0 md:static md:w-1/2 overflow-visible md:overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent md:hidden z-10" />
                    <div className="absolute right-[-10%] md:right-0 top-0 bottom-0 w-full md:w-full flex items-center justify-center md:justify-end md:pr-[10%] transform scale-90 md:scale-100 origin-center">
                        <CategoriesHeroDoodle />
                    </div>
                </div>
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
