"use client"

import { createPost } from "@/app/actions/posts"
import matter from "gray-matter"
import { Save, Upload } from "lucide-react"
import { useActionState, useState } from "react"

export default function NewPostPage() {
    const initialState = { message: null, errors: {} }
    // @ts-ignore - useActionState type mismatch with Next.js 15/16 beta in some versions, ignoring for now
    const [state, dispatch] = useActionState(createPost, initialState)

    const [title, setTitle] = useState("")
    const [slug, setSlug] = useState("")
    const [content, setContent] = useState("")

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const text = await file.text()
        // Use gray-matter on client side? 
        // Note: gray-matter often works better in Node.js. 
        // If client-side fails, we might need a purely client-side frontmatter parser or send to server API to parse.
        // Let's try simple parsing first or use a regex to ensure stability without Node polyfills in browser.

        try {
            const { data, content: mdContent } = matter(text)

            if (data.title) setTitle(data.title)
            if (data.slug) setSlug(data.slug)
            else if (data.title) setSlug(data.title.toLowerCase().replace(/ /g, '-'))

            setContent(mdContent)
        } catch (err) {
            console.warn("Gray-matter client parse failed, falling back to simple regex", err)
            // Fallback simple parser
            const titleMatch = text.match(/^title:\s*(.*)$/m)
            const dateMatch = text.match(/^date:\s*(.*)$/m)
            // Remove frontmatter roughly
            const content = text.replace(/---[\s\S]*?---/, '').trim()

            if (titleMatch) setTitle(titleMatch[1].trim())
            setContent(content)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Create New Post</h1>
            </div>

            {/* Markdown Upload Area */}
            <div className="p-6 bg-blue-50 border-2 border-blue-200 border-dashed rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
                <label className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="w-12 h-12 text-blue-500 mb-4" />
                    <span className="text-lg font-medium text-blue-700 dark:text-blue-300">Upload Markdown File (.md)</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">Auto-fill title, slug, and content</span>
                    <input type="file" accept=".md" onChange={handleFileUpload} className="hidden" />
                </label>
            </div>

            <form action={dispatch} className="space-y-6 bg-white p-8 rounded-lg shadow dark:bg-gray-800">
                {state.message && (
                    <div className="p-4 text-red-700 bg-red-100 rounded border border-red-200">
                        {state.message}
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                        <input
                            name="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                        {state.errors?.title && <p className="text-sm text-red-500 mt-1">{state.errors.title}</p>}
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug (URL)</label>
                        <input
                            name="slug"
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                        {state.errors?.slug && <p className="text-sm text-red-500 mt-1">{state.errors.slug}</p>}
                    </div>
                </div>

                {/* Content Editor */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content (Markdown)</label>
                    <textarea
                        name="content"
                        rows={15}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-3 py-2 font-mono text-sm border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                    {state.errors?.content && <p className="text-sm text-red-500 mt-1">{state.errors.content}</p>}
                </div>

                {/* Publishing Options */}
                <div className="flex items-center space-x-4 pt-4 border-t dark:border-gray-700">
                    <label className="flex items-center space-x-2">
                        <input name="published" type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                        <span className="text-gray-700 dark:text-gray-300">Publish immediately</span>
                    </label>

                    <div className="flex-1"></div>

                    <button
                        type="submit"
                        className="flex items-center px-6 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        <Save className="w-5 h-5 mr-2" />
                        Save Post
                    </button>
                </div>
            </form>
        </div>
    )
}
