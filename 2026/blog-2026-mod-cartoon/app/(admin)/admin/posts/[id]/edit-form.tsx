"use client"

import { updatePost } from "@/actions/posts"
import { CategorySelect } from "@/components/admin/category-select"
import { MediaSelectorDialog } from "@/components/admin/media/media-selector-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus, Loader2, Save, Tag } from "lucide-react"
import { useActionState, useState } from "react"

interface Category {
    id: string;
    name: string;
    color: string;
}

interface EditPostFormProps {
    post: any;
    categories: Category[];
}

export default function EditPostForm({ post, categories }: EditPostFormProps) {
    const updateAction = updatePost.bind(null, post.id)
    // @ts-ignore
    const [state, dispatch, isPending] = useActionState(updateAction, { message: null })

    const [title, setTitle] = useState(post.title)
    const [slug, setSlug] = useState(post.slug)
    const [content, setContent] = useState(post.content)
    const [categoryId, setCategoryId] = useState(post.categoryId || "")
    const [coverImage, setCoverImage] = useState(post.coverImage || "")
    const [isMediaOpen, setIsMediaOpen] = useState(false)

    return (
        <form action={dispatch} className="bg-white border-4 border-black shadow-neo rounded-2xl overflow-hidden flex flex-col">

            {/* Form Header */}
            <div className="bg-yellow-400 text-black p-4 flex items-center justify-between border-b-4 border-black">
                <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    <span className="font-black">EDIT MODE</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-8 h-4 bg-black/10 rounded-full" />
                    <div className="w-4 h-4 bg-black/10 rounded-full" />
                </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
                {state.message && (
                    <div className="p-4 bg-red-100 text-red-600 border-2 border-red-500 rounded-xl font-bold flex items-center gap-2 shadow-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        {state.message}
                    </div>
                )}

                {/* Cover Image Selector */}
                <div className="space-y-2">
                    <Label className="font-black text-base flex items-center gap-2">
                        <ImagePlus className="w-4 h-4" />
                        Cover Image
                    </Label>
                    <input type="hidden" name="coverImage" value={coverImage} />

                    {coverImage ? (
                        <div className="relative w-full h-48 md:h-64 bg-gray-100 rounded-xl border-2 border-black overflow-hidden group shadow-neo-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <Button
                                    type="button"
                                    onClick={() => setIsMediaOpen(true)}
                                    className="bg-white text-black border-2 border-black font-bold hover:bg-gray-100"
                                >
                                    Change
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setCoverImage("")}
                                    className="bg-red-500 text-white border-2 border-black font-bold hover:bg-red-600"
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => setIsMediaOpen(true)}
                            className="w-full h-32 border-4 border-dashed border-black/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-black/30 transition-all gap-2"
                        >
                            <div className="p-3 bg-gray-100 rounded-full">
                                <ImagePlus className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="text-sm font-bold text-black/40">Set Cover Image</p>
                        </div>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="font-black text-base">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="border-2 border-black h-12 text-lg font-bold focus-visible:ring-0 focus-visible:shadow-neo transition-all rounded-xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug" className="font-black text-base">Slug</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-black/40 text-sm font-bold">/</span>
                            <Input
                                id="slug"
                                name="slug"
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required
                                className="border-2 border-black h-12 pl-6 font-mono focus-visible:ring-0 focus-visible:shadow-neo transition-all rounded-xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Category Dropdown */}
                <div className="space-y-2">
                    <Label htmlFor="categoryId" className="flex items-center gap-2 font-black text-base">
                        <Tag className="w-4 h-4" />
                        Category
                    </Label>
                    <CategorySelect
                        categories={categories}
                        value={categoryId}
                        onChange={setCategoryId}
                        name="categoryId"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content" className="font-black text-base">Content (Markdown)</Label>
                    <Textarea
                        id="content"
                        name="content"
                        rows={20}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="font-mono border-2 border-black resize-y min-h-[400px] p-4 text-base focus-visible:ring-0 focus-visible:shadow-neo transition-all rounded-xl"
                        required
                    />
                </div>
            </div>

            <div className="bg-gray-50 border-t-4 border-black p-6 flex items-center justify-end">
                <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-yellow-400 text-black border-2 border-black shadow-neo hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all rounded-xl px-8 py-6 text-lg font-black w-full md:w-auto"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            SAVING...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-5 w-5" />
                            SAVE CHANGES
                        </>
                    )}
                </Button>
            </div>

            <MediaSelectorDialog
                isOpen={isMediaOpen}
                onClose={() => setIsMediaOpen(false)}
                onSelect={(url) => {
                    setCoverImage(url)
                    setIsMediaOpen(false)
                }}
            />
        </form>
    )
}
