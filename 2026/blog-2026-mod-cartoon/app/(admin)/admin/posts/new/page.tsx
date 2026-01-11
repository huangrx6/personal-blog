"use client"

import { createPost } from "@/actions/posts"
import { BackButton } from "@/components/admin/back-button"
import { CategorySelect } from "@/components/admin/category-select"
import { MediaSelectorDialog } from "@/components/admin/media/media-selector-dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import matter from "gray-matter"
import { FileUp, ImagePlus, Loader2, Save, Tag, Upload } from "lucide-react"
import { useActionState, useEffect, useState } from "react"

interface Category {
    id: string;
    name: string;
    color: string;
}

export default function NewPostPage() {
    const initialState = { message: null, errors: {} }
    // @ts-ignore - useActionState type mismatch with Next.js 15/16 beta in some versions
    const [state, dispatch, isPending] = useActionState(createPost, initialState)

    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [content, setContent] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [isMediaOpen, setIsMediaOpen] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])

    // Fetch categories on mount
    useEffect(() => {
        fetch("/api/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(() => setCategories([]))
    }, [])

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const text = await file.text()

        try {
            const { data, content: mdContent } = matter(text)

            if (data.title) setTitle(data.title)
            if (data.slug) setSlug(data.slug)
            else if (data.title) setSlug(data.title.toLowerCase().replace(/ /g, '-'))

            setContent(mdContent)
        } catch (err) {
            console.warn("Gray-matter client parse failed, falling back to simple regex", err)
            const titleMatch = text.match(/^title:\s*(.*)$/m)
            const content = text.replace(/---[\s\S]*?---/, '').trim()

            if (titleMatch) setTitle(titleMatch[1].trim())
            setContent(content)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            {/* Header */}
            <div className="flex items-center gap-4">
                <BackButton />
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tight">Create New Post</h1>
                    <p className="text-black/60 font-medium">Write something amazing today.</p>
                </div>
            </div>

            {/* Markdown Import Card */}
            <div className="bg-white border-4 border-black shadow-neo rounded-2xl overflow-hidden">
                <div className="bg-yellow-400 border-b-4 border-black p-4 flex items-center gap-3">
                    <div className="w-3 h-3 bg-black rounded-full" />
                    <div className="w-3 h-3 bg-black rounded-full" />
                    <span className="font-bold font-mono text-sm ml-2">IMPORT.MD</span>
                </div>
                <div className="p-6">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-4 border-dashed border-black/20 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-black/40 transition-all group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="h-10 w-10 text-black/20 group-hover:text-black/60 group-hover:scale-110 transition-all mb-3" />
                            <p className="text-sm font-bold text-black/40 group-hover:text-black/70">
                                Click to upload Markdown file
                            </p>
                        </div>
                        <input type="file" accept=".md" onChange={handleFileUpload} className="hidden" />
                    </label>
                </div>
            </div>

            {/* Main Editor Form */}
            <form action={dispatch} className="bg-white border-4 border-black shadow-neo rounded-2xl overflow-hidden flex flex-col">

                {/* Form Header */}
                <div className="bg-black text-white p-4 flex items-center justify-between border-b-4 border-black">
                    <div className="flex items-center gap-2">
                        <FileUp className="w-5 h-5" />
                        <span className="font-bold">EDITOR</span>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-8 h-4 bg-white/20 rounded-full" />
                        <div className="w-4 h-4 bg-white/20 rounded-full" />
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    {state.message && (
                        <div className="p-4 bg-red-100 text-red-600 border-2 border-red-500 rounded-xl font-bold flex items-center gap-2 shadow-sm">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            {state.message}
                        </div>
                    )}


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
// ... and keep Categories selector separate, don't delete other inputs
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 font-black text-base">
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
                    </div>

                    <MediaSelectorDialog
                        isOpen={isMediaOpen}
                        onClose={() => setIsMediaOpen(false)}
                        onSelect={(url) => {
                            setCoverImage(url)
                            setIsMediaOpen(false)
                        }}
                    />

                    <div className="space-y-2">
                        <Label htmlFor="content" className="font-black text-base">Content (Markdown)</Label>
                        <Textarea
                            id="content"
                            name="content"
                            rows={20}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="font-mono border-2 border-black resize-y min-h-[400px] p-4 text-base focus-visible:ring-0 focus-visible:shadow-neo transition-all rounded-xl"
                            placeholder="# Start writing..."
                            required
                        />
                        {state.errors?.content && (
                            <p className="text-sm text-red-500 font-bold">{state.errors.content}</p>
                        )}
                    </div>
                </div>

                <div className="bg-gray-50 border-t-4 border-black p-6 flex items-center justify-between">
                    <p className="text-xs font-bold text-black/40 uppercase tracking-widest hidden md:block">
                        Markdown Supported
                    </p>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-green-400 text-black border-2 border-black shadow-neo hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all rounded-xl px-8 py-6 text-lg font-black w-full md:w-auto"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                SAVING...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-5 w-5" />
                                PUBLISH POST
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
