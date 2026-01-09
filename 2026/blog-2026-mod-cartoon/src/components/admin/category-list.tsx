"use client";

import { Trash2, Loader2 } from "lucide-react";
import { CategoryForm } from "./category-form";
import { deleteCategory } from "@/actions/categories";
import { useState } from "react";
import { toast } from "sonner";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    color: string;
    _count: {
        posts: number;
    };
}

interface CategoryListProps {
    categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { confirm } = useConfirmDialog();

    const handleDelete = async (id: string, name: string) => {
        const confirmed = await confirm({
            title: "删除分类",
            message: `确定要删除分类 "${name}" 吗？这个操作无法撤销哦~`,
            confirmText: "确认删除",
            cancelText: "取消",
            variant: "danger",
        });

        if (!confirmed) return;

        setDeletingId(id);
        try {
            const result = await deleteCategory(id);
            if (result.success) {
                toast.success(`分类 "${name}" 已删除`);
            } else {
                toast.error("删除失败，请重试");
            }
        } catch (error) {
            toast.error("删除失败，请重试");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
                const isDeleting = deletingId === category.id;

                return (
                    <div
                        key={category.id}
                        className="bg-white/90 backdrop-blur-sm border-4 border-black rounded-3xl p-6 shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all group relative overflow-hidden"
                    >
                        <div
                            className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-20 pointer-events-none"
                            style={{ backgroundColor: category.color }}
                        ></div>

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div
                                className="w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                style={{ backgroundColor: category.color }}
                            >
                                <span className="font-black text-lg">{category.name.charAt(0).toUpperCase()}</span>
                            </div>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <CategoryForm mode="edit" category={category} />
                                <button
                                    type="button"
                                    onClick={() => handleDelete(category.id, category.name)}
                                    disabled={isDeleting}
                                    className="p-2 bg-white hover:bg-red-100 rounded-lg transition-colors text-red-500 disabled:opacity-50 border border-red-200 cursor-pointer"
                                >
                                    {isDeleting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <h3 className="font-black text-xl mb-1 relative z-10">{category.name}</h3>
                        {category.description && (
                            <p className="text-sm text-black/50 mb-2 line-clamp-2">{category.description}</p>
                        )}
                        <p className="text-sm font-bold text-black/40">{category._count.posts} 篇文章</p>
                    </div>
                );
            })}
        </div>
    );
}
