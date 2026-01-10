import { FloatingShapes } from "@/components/ui/floating-shapes";
import { prisma } from "@/lib/db/prisma";
import { ArrowRight, CheckCircle2, Clock, FileEdit, FileText, Plus, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const postCount = await prisma.post.count()
    const publishedCount = await prisma.post.count({ where: { status: "PUBLISHED" } })
    const draftCount = await prisma.post.count({ where: { status: "DRAFT" } })
    const offlineCount = await prisma.post.count({ where: { status: "OFFLINE" } })
    const categoryCount = await prisma.category.count()

    const recentPosts = await prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, status: true, createdAt: true }
    })

    return (
        <div className="space-y-8 relative">
            {/* Background Decorations */}
            <FloatingShapes />

            {/* Hero Welcome Section - Enhanced */}
            <div className="relative bg-white/90 backdrop-blur-md border-4 border-black rounded-[2.5rem] p-8 lg:p-12 shadow-neo-lg overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:60px_60px] bg-[position:0_0,30px_30px] animate-slide-diagonal"></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-black/10">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Dashboard Pro</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-cartoon tracking-wide text-black drop-shadow-sm">
                            Welcome Back!
                        </h1>
                        <p className="text-xl font-medium text-black/60 max-w-lg font-zcool">
                            今天也是充满创意的一天！你有 {draftCount} 篇草稿正在等待灵感注入。
                        </p>
                    </div>

                    <Link
                        href="/admin/posts/new"
                        className="group relative flex items-center gap-3 bg-black text-white px-8 py-5 rounded-2xl font-bold text-lg overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative z-10 flex items-center gap-2 group-hover:tracking-wider transition-all">
                            <Plus className="w-6 h-6" />
                            写新文章
                        </span>
                        <ArrowRight className="relative z-10 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Stats Grid - Neo Brutal Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Posts */}
                <div className="bg-[#FFD60A]/20 backdrop-blur-sm border-4 border-black rounded-3xl p-6 shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all cursor-default relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FFD60A] rounded-full opacity-20 blur-xl"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-[#FFD60A] rounded-xl border-2 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <FileText className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="font-zcool text-black/60 text-lg">文章总数</h3>
                        <p className="text-5xl font-black font-cartoon">{postCount}</p>
                    </div>
                </div>

                {/* Published */}
                <div className="bg-[#32D74B]/20 backdrop-blur-sm border-4 border-black rounded-3xl p-6 shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all cursor-default relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#32D74B] rounded-full opacity-20 blur-xl"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-[#32D74B] rounded-xl border-2 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <CheckCircle2 className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="font-zcool text-black/60 text-lg">已发布</h3>
                        <p className="text-5xl font-black font-cartoon">{publishedCount}</p>
                    </div>
                </div>

                {/* Drafts */}
                <div className="bg-[#FF9F0A]/20 backdrop-blur-sm border-4 border-black rounded-3xl p-6 shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all cursor-default relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FF9F0A] rounded-full opacity-20 blur-xl"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-[#FF9F0A] rounded-xl border-2 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <FileEdit className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="font-zcool text-black/60 text-lg">草稿箱</h3>
                        <p className="text-5xl font-black font-cartoon">{draftCount}</p>
                    </div>
                </div>

                {/* Categories */}
                <div className="bg-[#BF5AF2]/20 backdrop-blur-sm border-4 border-black rounded-3xl p-6 shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all cursor-default relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#BF5AF2] rounded-full opacity-20 blur-xl"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-[#BF5AF2] rounded-xl border-2 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <TrendingUp className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="font-zcool text-black/60 text-lg">全部分类</h3>
                        <p className="text-5xl font-black font-cartoon">{categoryCount}</p>
                    </div>
                </div>
            </div>

            {/* Recent Posts + Quick Actions Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Posts - Spans 2 Columns */}
                <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm border-4 border-black rounded-[2rem] p-8 shadow-neo-lg">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black font-cartoon">最近文章</h2>
                        <Link href="/admin/posts" className="text-sm font-bold text-primary hover:underline underline-offset-4 decoration-2">
                            查看全部 →
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentPosts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-black/10 rounded-2xl bg-gray-50/50">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-black shadow-sm mb-4">
                                    <FileEdit className="w-6 h-6 text-black/40" />
                                </div>
                                <p className="text-black/50 font-medium">还没有文章，开始创作吧！</p>
                            </div>
                        ) : (
                            recentPosts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/admin/posts/${post.id}/preview`}
                                    className="flex items-center justify-between p-5 bg-white rounded-2xl border-2 border-black/5 hover:border-black hover:shadow-neo transition-all group duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${post.status === 'PUBLISHED' ? 'bg-[#32D74B]' : post.status === 'DRAFT' ? 'bg-[#FF9F0A]' : 'bg-gray-400'}`}></div>
                                        <span className="font-bold text-lg truncate max-w-[200px] md:max-w-[300px] group-hover:text-primary transition-colors">{post.title || "无标题"}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-black/50">
                                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-lg font-mono text-xs">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-50 transition-all">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/90 backdrop-blur-sm border-4 border-black rounded-[2rem] p-8 shadow-neo-lg h-fit sticky top-6">
                    <h2 className="text-2xl font-black font-cartoon mb-8">快捷操作</h2>

                    <div className="space-y-4">
                        <Link
                            href="/admin/posts/new"
                            className="flex items-center gap-4 p-5 bg-primary/10 rounded-2xl border-2 border-black hover:bg-primary hover:text-white transition-all group relative overflow-hidden"
                        >
                            <div className="absolute right-0 top-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:bg-white/40 transition-colors"></div>
                            <div className="w-12 h-12 bg-primary rounded-xl border-2 border-black flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary transition-colors shadow-sm">
                                <Plus className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-lg">新建文章</span>
                        </Link>

                        <Link
                            href="/admin/posts"
                            className="flex items-center gap-4 p-5 bg-secondary/10 rounded-2xl border-2 border-black hover:bg-secondary hover:text-white transition-all group relative overflow-hidden"
                        >
                            <div className="absolute right-0 top-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:bg-white/40 transition-colors"></div>
                            <div className="w-12 h-12 bg-secondary rounded-xl border-2 border-black flex items-center justify-center text-white group-hover:bg-white group-hover:text-secondary transition-colors shadow-sm">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-lg">管理文章</span>
                        </Link>

                        <Link
                            href="/admin/settings"
                            className="flex items-center gap-4 p-5 bg-accent/10 rounded-2xl border-2 border-black hover:bg-accent hover:text-black transition-all group relative overflow-hidden"
                        >
                            <div className="absolute right-0 top-0 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:bg-white/40 transition-colors"></div>
                            <div className="w-12 h-12 bg-accent rounded-xl border-2 border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors shadow-sm">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-lg">系统设置</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
