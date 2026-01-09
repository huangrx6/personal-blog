"use client"

import { createPost } from "@/actions/posts"
import matter from "gray-matter"
import { Save, Upload, Loader2, FileUp, Tag } from "lucide-react"
import { useActionState, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CategorySelect } from "@/components/admin/category-select"

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
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">创建新文章</h2>
                <p className="text-muted-foreground">
                    撰写并发布你的内容
                </p>
            </div>

            <Card className="border-dashed border-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        导入 Markdown
                    </CardTitle>
                    <CardDescription>
                        上传 .md 文件自动填充表单
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                                <span className="font-semibold">点击上传</span>或拖拽文件
                            </p>
                            <p className="text-xs text-muted-foreground">仅支持 .md 文件</p>
                        </div>
                        <input type="file" accept=".md" onChange={handleFileUpload} className="hidden" />
                    </label>
                </CardContent>
            </Card>

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
                                    placeholder="输入文章标题"
                                    required
                                />
                                {state.errors?.title && (
                                    <p className="text-sm text-destructive">{state.errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    name="slug"
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="post-url-slug"
                                    required
                                />
                                {state.errors?.slug && (
                                    <p className="text-sm text-destructive">{state.errors.slug}</p>
                                )}
                            </div>
                        </div>

                        {/* Category Select */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
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
                                placeholder="# 在这里写你的文章内容..."
                                required
                            />
                            {state.errors?.content && (
                                <p className="text-sm text-destructive">{state.errors.content}</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4 justify-between">
                        <p className="text-sm text-muted-foreground">
                            使用 Markdown 格式化文章
                        </p>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    保存中...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    创建文章
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
