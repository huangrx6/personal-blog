"use client";

import { useState, useTransition, useEffect } from "react";
import { createPortal } from "react-dom";
import { Plus, Edit, X, Loader2 } from "lucide-react";
import { createCategory, updateCategory } from "@/actions/categories";
import { toast } from "sonner";

interface CategoryFormProps {
    mode: "create" | "edit";
    category?: {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        color: string;
    };
}

const colorOptions = [
    "#0EA5E9", "#32D74B", "#FF9F0A", "#BF5AF2", "#FF453A",
    "#64D2FF", "#30D158", "#FFD60A", "#5E5CE6", "#FF6482"
];

export function CategoryForm({ mode, category }: CategoryFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState(category?.name || "");
    const [description, setDescription] = useState(category?.description || "");
    const [color, setColor] = useState(category?.color || "#0EA5E9");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (category) {
            setName(category.name);
            setDescription(category.description || "");
            setColor(category.color);
        }
    }, [category]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("分类名称不能为空！");
            return;
        }

        startTransition(async () => {
            try {
                if (mode === "create") {
                    const result = await createCategory({ name, description, color });
                    if (result.success) {
                        toast.success("分类创建成功！");
                        setIsOpen(false);
                        setName("");
                        setDescription("");
                        setColor("#0EA5E9");
                    } else {
                        toast.error(result.error === "DUPLICATE"
                            ? "这个分类名已存在，换一个试试"
                            : "创建失败，请重试");
                    }
                } else if (category) {
                    const result = await updateCategory(category.id, { name, description, color });
                    if (result.success) {
                        toast.success("分类更新成功！");
                        setIsOpen(false);
                    } else {
                        toast.error(result.error === "DUPLICATE"
                            ? "这个分类名已存在"
                            : "更新失败，请重试");
                    }
                }
            } catch {
                toast.error("操作失败，请稍后重试");
            }
        });
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const modalContent = isOpen && mounted ? (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
        >
            <div
                className="bg-white border-4 border-black rounded-3xl p-8 w-full max-w-md shadow-neo-lg mx-4 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black">{mode === "create" ? "添加分类" : "编辑分类"}</h2>
                    <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">分类名称</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-black rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="如：技术、生活、设计"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">描述（可选）</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-black rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            rows={2}
                            placeholder="简单描述这个分类"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">颜色</label>
                        <div className="flex gap-2 flex-wrap">
                            {colorOptions.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    className={`w-8 h-8 rounded-lg border-2 transition-all ${color === c ? "border-black scale-110 shadow-neo-sm" : "border-transparent"
                                        }`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl font-bold shadow-neo hover:bg-primary hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                处理中...
                            </>
                        ) : mode === "create" ? (
                            <>
                                <Plus className="w-5 h-5" />
                                创建分类
                            </>
                        ) : (
                            "保存更改"
                        )}
                    </button>
                </form>
            </div>
        </div>
    ) : null;

    return (
        <>
            {mode === "create" ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl font-bold shadow-neo hover:bg-primary hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    <span>添加分类</span>
                </button>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Edit className="w-4 h-4" />
                </button>
            )}

            {mounted && createPortal(modalContent, document.body)}
        </>
    );
}
