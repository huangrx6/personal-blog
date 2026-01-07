"use client"

import { updatePost } from "@/app/actions/posts"
import { Save } from "lucide-react"
import { useActionState, useState } from "react"

export default function EditPostForm({ post }: { post: any }) {
    const updateAction = updatePost.bind(null, post.id)
    // @ts-ignore
    const [state, dispatch] = useActionState(updateAction, { message: null })

    const [title, setTitle] = useState(post.title)
    const [slug, setSlug] = useState(post.slug)
    const [content, setContent] = useState(post.content)
    const [published, setPublished] = useState(post.published)

    return (
        <form action={dispatch} className="space-y-6 bg-white p-8 rounded-lg shadow dark:bg-gray-800">
            {state.message && (
                <div className="p-4 text-red-700 bg-red-100 rounded border border-red-200">
                    {state.message}
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
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
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label>
                    <input
                        name="slug"
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                <textarea
                    name="content"
                    rows={15}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-3 py-2 font-mono text-sm border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                />
            </div>

            <div className="flex items-center space-x-4 pt-4 border-t dark:border-gray-700">
                <label className="flex items-center space-x-2">
                    <input
                        name="published"
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Publish immediately</span>
                </label>

                <div className="flex-1"></div>

                <button
                    type="submit"
                    className="flex items-center px-6 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                </button>
            </div>
        </form>
    )
}
