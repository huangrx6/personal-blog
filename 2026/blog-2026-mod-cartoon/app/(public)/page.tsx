"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Sparkles, Code, Palette, BookOpen } from "lucide-react";
import { ScrollingPath, ScrollSection, FloatingCharacter } from "@/components/parallax";
import { blogPosts } from "@/lib/data/blog-data";

export default function HomePage() {
    const [scrollY, setScrollY] = useState(0);
    const [vh, setVh] = useState(1000);

    useEffect(() => {
        setVh(window.innerHeight);

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const handleResize = () => {
            setVh(window.innerHeight);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // 人物动画计算
    // 第一屏：人物在左边，小尺寸
    // 滚动过程：慢慢放大
    // 第二屏底部：固定在底部中间

    const section1End = vh; // 第一屏结束
    const section2End = vh * 2; // 第二屏结束

    // 人物缩放：1 -> 1.5
    const characterScale = scrollY < section1End
        ? 1
        : scrollY < section2End
            ? 1 + (scrollY - section1End) / (section2End - section1End) * 0.5
            : 1.5;

    // 人物位置：左边 -> 中间
    const characterLeft = scrollY < section1End
        ? 10 // 左边 10%
        : scrollY < section2End
            ? 10 + (scrollY - section1End) / (section2End - section1End) * 40 // 移动到 50%
            : 50;

    // 人物垂直位置：跟随滚动 -> 固定在底部
    const characterTop = scrollY < section1End
        ? 70 // 第一屏：70% 位置
        : scrollY < section2End
            ? 70 - (scrollY - section1End) / (section2End - section1End) * 10 // 移动到 60%
            : 60;

    // 固定状态
    const isCharacterFixed = scrollY >= section1End && scrollY < section2End * 1.5;

    // 人物透明度：第三屏后逐渐消失
    const characterOpacity = scrollY > section2End * 1.5
        ? Math.max(0, 1 - (scrollY - section2End * 1.5) / (vh * 0.5))
        : 1;

    return (
        <div className="relative min-h-[500vh] overflow-x-hidden bg-[#FCFAF2]">
            {/* ============================================
          主角人物群组 - 放大 + 移动动画
          ============================================ */}
            <div
                className="z-20 flex items-end justify-center gap-2 transition-transform duration-100"
                style={{
                    position: isCharacterFixed ? "fixed" : "absolute",
                    left: `${characterLeft}%`,
                    top: isCharacterFixed ? `${characterTop}%` : `${section1End * 0.7}px`,
                    transform: `translate(-50%, 0) scale(${characterScale})`,
                    opacity: characterOpacity,
                    transformOrigin: "bottom center",
                }}
            >
                <FloatingCharacter
                    src="/characters/girl-laptop.png"
                    alt="Girl with laptop"
                    width={100}
                    height={100}
                    floatDelay={0.5}
                    className="translate-y-2"
                />
                <FloatingCharacter
                    src="/characters/hero-sitting.png"
                    alt="Hero character"
                    width={140}
                    height={140}
                    floatDelay={0}
                />
                <FloatingCharacter
                    src="/characters/boy-reading.png"
                    alt="Boy reading"
                    width={100}
                    height={100}
                    floatDelay={1}
                    className="translate-y-1"
                />
            </div>

            {/* ============================================
          第1屏：Hero - 标题和按钮
          ============================================ */}
            <ScrollSection
                id="hero"
                className="relative flex flex-col items-center justify-center px-6 lg:px-8 pt-32"
                minHeight="100vh"
            >
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    {/* 标签 */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border-2 border-black bg-white shadow-neo-sm animate-slide-up">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold">Creative Blog 2026</span>
                    </div>

                    {/* 大标题 */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8">
                        <span className="block text-black animate-slide-up" style={{ animationDelay: "0.1s" }}>
                            CREATE
                        </span>
                        <span className="block text-gradient-primary animate-slide-up" style={{ animationDelay: "0.2s" }}>
                            BOLDLY
                        </span>
                    </h1>

                    {/* 副标题 */}
                    <p className="text-xl md:text-2xl font-medium text-black/60 max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                        一个关于创意、代码和设计的游乐场。探索我的想法和创作。
                    </p>

                    {/* CTA 按钮 */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
                        <Button size="lg" className="h-14 px-8 text-lg bg-primary text-white border-2 border-black shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all" asChild>
                            <Link href="/blog">
                                探索博客
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white border-2 border-black shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all" asChild>
                            <Link href="/about">关于我</Link>
                        </Button>
                    </div>
                </div>

                {/* 滚动指示器 */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-30">
                    <div className="w-6 h-10 rounded-full border-2 border-black/30 flex items-start justify-center p-2">
                        <div className="w-1.5 h-3 rounded-full bg-black/30" />
                    </div>
                </div>
            </ScrollSection>

            {/* ============================================
          第2屏：介绍 - 人物会移动到这里底部中间
          ============================================ */}
            <ScrollSection
                id="intro"
                className="relative flex items-center px-6 lg:px-8"
                minHeight="100vh"
            >
                <div className="max-w-7xl mx-auto w-full py-24">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                            嗨，我是一名<br />
                            <span className="text-gradient-primary">创意开发者</span>
                        </h2>
                        <p className="text-lg text-black/50 mb-8 leading-relaxed">
                            我热衷于创造有意义的数字体验，在美学和功能之间架起桥梁。
                            这里是我分享想法、项目和学习心得的地方。
                        </p>
                        <Button className="border-2 shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all" asChild>
                            <Link href="/about">
                                了解更多
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* 右侧装饰角色 */}
                <div className="absolute right-[10%] top-1/4 hidden lg:block">
                    <FloatingCharacter
                        src="/login-character.png"
                        alt="Main character"
                        width={250}
                        height={250}
                        floatDelay={0}
                    />
                </div>
            </ScrollSection>

            {/* ============================================
          SVG 蜿蜒路径 - 从第三屏开始，随滚动延伸
          ============================================ */}
            <ScrollingPath startOffset={180} />

            {/* ============================================
          第3屏：博客展示 - 路径旁出现角色
          ============================================ */}
            <ScrollSection
                id="blog"
                className="relative px-6 lg:px-8"
                minHeight="100vh"
            >
                <div className="max-w-7xl mx-auto py-24 relative z-10">
                    <div className="max-w-xl mb-16">
                        <span className="inline-block px-3 py-1 text-sm font-bold bg-primary/20 text-primary rounded-full mb-4">
                            Latest Posts
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                            Fresh Drops
                        </h2>
                        <p className="text-black/50 mt-2">最新的想法和创作</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogPosts.slice(0, 6).map((post, index) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="glass-card-hover p-6 flex flex-col group"
                            >
                                <span className="inline-block px-3 py-1 text-xs font-bold bg-primary/20 text-primary rounded-full self-start mb-4">
                                    {post.category}
                                </span>
                                <h3 className="text-lg font-black mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-black/60 mb-4 flex-1 line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 路径旁角色 - 更大尺寸 */}
                <div className="absolute left-[3%] top-[50%] hidden lg:block z-10">
                    <FloatingCharacter
                        src="/characters/girl-skateboard.png"
                        alt="Skateboard girl"
                        width={220}
                        height={220}
                        floatDelay={0.5}
                    />
                </div>
            </ScrollSection>

            {/* ============================================
          第4屏：技能展示
          ============================================ */}
            <ScrollSection
                id="skills"
                className="relative px-6 lg:px-8"
                minHeight="100vh"
            >
                <div className="max-w-7xl mx-auto py-24 relative z-10">
                    <div className="text-right max-w-xl ml-auto mb-16">
                        <span className="inline-block px-3 py-1 text-sm font-bold bg-accent/20 text-accent rounded-full mb-4">
                            What I Do
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                            我的<span className="text-gradient-accent">技能</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            { icon: Palette, title: "UI/UX Design", description: "创造直观美观的用户界面", color: "bg-primary" },
                            { icon: Code, title: "Frontend Dev", description: "React、Next.js 现代技术栈", color: "bg-secondary" },
                            { icon: BookOpen, title: "Creative Writing", description: "技术和设计的见解分享", color: "bg-accent" },
                        ].map((skill) => (
                            <div key={skill.title} className="glass-card-hover p-8 text-center">
                                <div className={`w-16 h-16 ${skill.color} rounded-2xl border-2 border-black shadow-neo-sm mx-auto mb-6 flex items-center justify-center`}>
                                    <skill.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-black mb-3">{skill.title}</h3>
                                <p className="text-black/60">{skill.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 路径旁角色 */}
                <div className="absolute right-[3%] top-[30%] hidden lg:block z-10">
                    <FloatingCharacter
                        src="/characters/boy-camera.png"
                        alt="Boy with camera"
                        width={200}
                        height={200}
                        floatDelay={0.3}
                    />
                </div>

                <div className="absolute left-[5%] bottom-[20%] hidden lg:block z-10">
                    <FloatingCharacter
                        src="/characters/boy-phone.png"
                        alt="Boy with phone"
                        width={180}
                        height={180}
                        floatDelay={0.7}
                    />
                </div>
            </ScrollSection>

            {/* ============================================
          第5屏：Newsletter CTA
          ============================================ */}
            <ScrollSection
                id="cta"
                className="relative flex items-center justify-center px-6 lg:px-8 bg-primary"
                minHeight="100vh"
            >
                <div className="max-w-4xl mx-auto text-center relative z-10 py-24">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
                        JOIN THE<br />JOURNEY
                    </h2>
                    <p className="text-xl font-medium text-white/80 mb-8 max-w-xl mx-auto">
                        加入创意社区，获取最新的文章、教程和项目更新。
                    </p>

                    <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
                        <Input
                            type="email"
                            placeholder="your@email.com"
                            className="h-14 bg-white text-black border-2 border-black shadow-neo flex-1"
                        />
                        <Button size="lg" className="h-14 px-8 bg-black text-white border-2 border-black shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
                            Subscribe
                            <Mail className="ml-2 w-5 h-5" />
                        </Button>
                    </div>

                    <div className="mt-16">
                        <FloatingCharacter
                            src="/characters/girl-waving.png"
                            alt="Girl waving"
                            width={160}
                            height={160}
                            floatDelay={0}
                        />
                    </div>
                </div>
            </ScrollSection>
        </div>
    );
}
