"use client"

import { updatePost } from "@/actions/posts"
import { Save, Loader2, Tag } from "lucide-react"
import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CategorySelect } from "@/components/admin/category-select"

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

    return (
        <form action={dispatch}>
            <Card>
                <CardHeader>
                    <CardTitle>文章详情</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {state.message && (
                        <div className="p-4 text-destructive-foreground bg-destructive/10 rounded border border-destructive/20">
                            {state.message}
                        </div>
                    )}

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="title">标题</Label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                name="slug"
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Category Dropdown */}
                    <div className="space-y-2">
                        <Label htmlFor="categoryId" className="flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            分类
                        </Label>
                        <CategorySelect
                            categories={categories}
                            value={categoryId}
                            onChange={setCategoryId}
                            name="categoryId"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">内容 (Markdown)</Label>
                        <Textarea
                            id="content"
                            name="content"
                            rows={20}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="font-mono"
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                保存中...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                保存更改
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}
