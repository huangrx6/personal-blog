"use client";

import { ArrayEditor, IconSelector } from "@/components/admin/ArrayEditor";

export const dynamic = 'force-dynamic';

import { SettingsHeroDoodle } from "@/components/admin/settings-hero-doodle";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";
// import { FloatingShapes } from "@/components/ui/floating-shapes";
import { NeoSelect } from "@/components/ui/neo-select";
import { motion } from "framer-motion";
import {
    Check,
    FileText,
    Github,
    LayoutTemplate,
    Loader2,
    Mail,
    MessageSquare,
    Palette,
    RotateCcw,
    Save,
    Settings2, Sparkles,
    Twitter,
    User
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SettingsData {
    siteName: string;
    siteDescription: string;
    author: string;
    githubUrl: string;
    twitterUrl: string;
    emailAddress: string;
    weiboUrl: string;
    fontStyle: string;
    primaryColor: string;
    mouseFollowEnabled: boolean;
    cursorStyle: string;
    highPerformanceMode: boolean;
    commentsEnabled: boolean;
    showReadingTime: boolean;

    // About Page
    aboutHeroTitle1: string;
    aboutHeroTitle2: string;
    aboutHeroDescription: string;
    aboutSkills: Array<{ icon: string; title: string; desc: string }>;
    aboutVibeCards: Array<{ icon: string; title: string; desc: string; color: string; rot: number; textColor?: string; iconColor?: string; text?: string }>;
    resumeUrl: string;
}

const defaultSettings: SettingsData = {
    siteName: "Blog 2026",
    siteDescription: "A creative personal blog",
    author: "",
    githubUrl: "",
    twitterUrl: "",
    emailAddress: "",
    weiboUrl: "",
    resumeUrl: "",
    fontStyle: "system",
    primaryColor: "#0EA5E9",
    mouseFollowEnabled: true,
    cursorStyle: "blob",
    highPerformanceMode: false,
    commentsEnabled: false,
    showReadingTime: true,
    aboutHeroTitle1: "不仅是",
    aboutHeroTitle2: "开发者",
    aboutHeroDescription: "我是一名热衷于创造极致用户体验的全栈开发者。\n游走于设计与代码之间，构建既好用又好看的数字产品。",
    aboutSkills: [],
    aboutVibeCards: [],
};

const cursorOptions = [
    { id: "blob", name: "粘性球", description: "经典的跟随效果", emoji: "🟢" },
    { id: "sparkle", name: "闪光星", description: "鼠标经过处闪闪发光", emoji: "✨" },
    { id: "rainbow", name: "彩虹拖尾", description: "五彩斑斓的轨迹", emoji: "🌈" },
    { id: "trail", name: "气泡链", description: "渐变大小的跟随气泡", emoji: "🫧" },
];

export default function SettingsPage() {
    const [settings, setSettings] = useState<SettingsData>(defaultSettings);
    const [originalSettings, setOriginalSettings] = useState<SettingsData>(defaultSettings);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Hooks
    const { confirm } = useConfirmDialog();

    // Deep compare check (simple JSON stringify is enough for this size)
    const isDirty = JSON.stringify(settings) !== JSON.stringify(originalSettings);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const response = await fetch('/api/settings');
                if (response.ok) {
                    const data = await response.json();
                    // Merge with defaults to ensure all fields exist
                    setSettings({ ...defaultSettings, ...data });
                    setOriginalSettings({ ...defaultSettings, ...data });
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });
            if (response.ok) {
                const data = await response.json();
                setOriginalSettings(data);
                document.body.setAttribute('data-font-style', data.fontStyle);
                toast.success("所有更改已保存", {
                    description: "您的站点配置已更新生效。",
                    icon: <Check className="w-5 h-5" />,
                });
            } else {
                toast.error("保存失败", { description: "请稍后重试" });
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
            toast.error("保存失败", { description: "网络请求发生错误" });
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = async () => {
        const confirmed = await confirm({
            title: "确认重置？",
            message: "这将把所有设置恢复为默认状态，此操作无法撤销。",
            confirmText: "确认重置",
            variant: "danger",
        });

        if (confirmed) {
            setSettings(defaultSettings);

            // Optional: Immediately save reset state or just let user save manually?
            // Usually reset implies resetting to defaults locally, letting user decide to save.
            // But code logic was saving immediately. Let's keep it consistent but maybe ask user?
            // Actually, let's just reset local state to default and let them click save if they want, 
            // OR fully reset backend too. The original code reset backend too.
            // Let's stick to original behavior but add toast.

            try {
                await fetch('/api/settings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(defaultSettings),
                });
                toast.success("已重置", { description: "所有设置已恢复默认。" });
                window.location.reload();
            } catch (e) {
                toast.error("重置失败");
            }
        }
    };

    const updateSetting = <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-8 relative min-h-[80vh] pb-24">
            <SettingsHeroDoodle />

            {/* Header */}
            {/* Header */}
            {/* Header */}
            <div className="flex flex-col gap-4 mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center shadow-neo transform -rotate-3">
                        <Settings2 className="w-8 h-8 animate-spin-slow" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">
                            系统设置
                        </h1>
                        <p className="font-bold text-black/60 mt-1">
                            管理您的博客配置与个性化选项
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">

                {/* 1. Global Site Info */}
                <section className="bg-white/90 backdrop-blur-sm border-4 border-black rounded-3xl p-8 shadow-neo relative z-40">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-black/5">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl border-2 border-black flex items-center justify-center">
                            <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">站点信息</h2>
                            <p className="text-sm font-bold text-black/40">基础站点配置</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="font-bold text-sm uppercase text-black/50">博客名称</label>
                            <input
                                type="text"
                                value={settings.siteName}
                                onChange={(e) => updateSetting('siteName', e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-black/10 rounded-xl font-bold focus:border-black transition-colors outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-bold text-sm uppercase text-black/50">作者名称</label>
                            <input
                                type="text"
                                value={settings.author}
                                onChange={(e) => updateSetting('author', e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-black/10 rounded-xl font-bold focus:border-black transition-colors outline-none"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="font-bold text-sm uppercase text-black/50">站点描述</label>
                            <textarea
                                value={settings.siteDescription}
                                onChange={(e) => updateSetting('siteDescription', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-black/10 rounded-xl font-bold focus:border-black transition-colors outline-none resize-none"
                            />
                        </div>
                    </div>
                </section>

                {/* 2. Appearance & Features */}
                <div className="grid lg:grid-cols-2 gap-6 relative z-30">
                    <section className="bg-white/90 backdrop-blur-sm border-4 border-black rounded-3xl p-8 shadow-neo relative z-50">
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-black/5">
                            <div className="w-12 h-12 bg-accent/20 rounded-xl border-2 border-black flex items-center justify-center">
                                <Palette className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black">外观设置</h2>
                                <p className="text-sm font-bold text-black/40">字体和视觉风格</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="font-bold text-sm uppercase text-black/50">字体风格</label>

                                <NeoSelect
                                    value={settings.fontStyle}
                                    onChange={(val) => updateSetting('fontStyle', val)}
                                    className="relative z-30"
                                    options={[
                                        { value: "system", label: "系统默认", description: "苹方/微软雅黑" },
                                        { value: "comic", label: "Comic Style", description: "英文卡通风" },
                                        { value: "zcool", label: "站酷快乐体", description: "可爱卡通风" },
                                        { value: "mashan", label: "马善政毛笔", description: "手写书法风" },
                                        { value: "longcang", label: "龙藏草书", description: "潇洒草书风" },
                                    ]}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="font-bold text-sm uppercase text-black/50">鼠标特效</label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => updateSetting('mouseFollowEnabled', !settings.mouseFollowEnabled)}
                                        className={`px-4 py-2 border-2 rounded-lg font-bold ${settings.mouseFollowEnabled ? 'bg-black text-white border-black' : 'bg-gray-100 text-gray-500 border-transparent'}`}
                                    >
                                        {settings.mouseFollowEnabled ? '已开启' : '已关闭'}
                                    </button>
                                    {settings.mouseFollowEnabled && (
                                        <div className="flex-1 min-w-[150px]">
                                            <NeoSelect
                                                value={settings.cursorStyle}
                                                onChange={(val) => updateSetting('cursorStyle', val)}
                                                options={cursorOptions.map(opt => ({
                                                    value: opt.id,
                                                    label: opt.name,
                                                    emoji: opt.emoji,
                                                    description: opt.description
                                                }))}
                                                placeholder="选择特效"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white/90 backdrop-blur-sm border-4 border-black rounded-3xl p-8 shadow-neo relative z-40">
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-black/5">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl border-2 border-black flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black">功能开关</h2>
                                <p className="text-sm font-bold text-black/40">博客功能配置</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border-2 border-black/5">
                                <span className="font-bold">评论功能</span>
                                <div
                                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${settings.commentsEnabled ? 'bg-black' : 'bg-gray-300'}`}
                                    onClick={() => updateSetting('commentsEnabled', !settings.commentsEnabled)}
                                >
                                    <motion.div className="absolute top-1 w-4 h-4 bg-white rounded-full" animate={{ left: settings.commentsEnabled ? '28px' : '4px' }} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border-2 border-black/5">
                                <span className="font-bold">显示阅读时间</span>
                                <div
                                    className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${settings.showReadingTime ? 'bg-black' : 'bg-gray-300'}`}
                                    onClick={() => updateSetting('showReadingTime', !settings.showReadingTime)}
                                >
                                    <motion.div className="absolute top-1 w-4 h-4 bg-white rounded-full" animate={{ left: settings.showReadingTime ? '28px' : '4px' }} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 3. About Page Configuration */}
                <section className="bg-[#FACC15]/10 backdrop-blur-sm border-4 border-black rounded-3xl p-8 shadow-neo relative z-20">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-black/5">
                        <div className="w-12 h-12 bg-[#FACC15] rounded-xl border-2 border-black flex items-center justify-center">
                            <LayoutTemplate className="w-6 h-6 text-black" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">关于页面配置</h2>
                            <p className="text-sm font-bold text-black/40">自定义 Hero 文本、技能列表和个性卡片</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Hero Text */}
                        <div className="bg-white/50 border-2 border-black/10 rounded-2xl p-6">
                            <h3 className="font-bold mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4" /> Hero 区域文案</h3>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-black/40 uppercase">主标题第一行 (Prefix)</label>
                                    <input
                                        type="text"
                                        value={settings.aboutHeroTitle1}
                                        onChange={(e) => updateSetting('aboutHeroTitle1', e.target.value)}
                                        className="w-full px-3 py-2 border-2 border-black/10 rounded-lg font-bold"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-black/40 uppercase">主标题高亮 (Gradient)</label>
                                    <input
                                        type="text"
                                        value={settings.aboutHeroTitle2}
                                        onChange={(e) => updateSetting('aboutHeroTitle2', e.target.value)}
                                        className="w-full px-3 py-2 border-2 border-black/10 rounded-lg font-bold text-[#A855F7]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-black/40 uppercase">个人简介描述</label>
                                <textarea
                                    value={settings.aboutHeroDescription}
                                    onChange={(e) => updateSetting('aboutHeroDescription', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border-2 border-black/10 rounded-lg font-bold resize-none"
                                />
                            </div>
                        </div>

                        {/* Skills Editor */}
                        <ArrayEditor
                            title="技能卡片 (Skills)"
                            description="出现在横向滚动区域的技能卡片"
                            items={settings.aboutSkills || []}
                            onChange={(items) => updateSetting('aboutSkills', items)}
                            itemTemplate={{ icon: "Code", title: "New Skill", desc: "Description here...", hoverColor: "hover:bg-[#FACC15]" }}
                            renderItem={(item, index, update) => (
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    {/* Icon Preview */}
                                    <div className="shrink-0 space-y-2 text-center">
                                        <div className="w-20 h-20 bg-black text-white rounded-2xl flex items-center justify-center shadow-neo-sm">
                                            <IconSelector value={item.icon} onChange={() => { }} readonly />
                                        </div>
                                        <div className="text-xs font-bold opacity-40 uppercase">Preview</div>
                                    </div>

                                    {/* Inputs */}
                                    <div className="flex-1 space-y-4 w-full">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold opacity-40 uppercase">Title</label>
                                            <input
                                                value={item.title}
                                                onChange={(e) => update('title', e.target.value)}
                                                className="w-full font-black text-lg bg-transparent border-b-2 border-black/10 focus:border-black outline-none transition-colors py-1"
                                                placeholder="技能名称"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold opacity-40 uppercase">Description</label>
                                            <textarea
                                                value={item.desc}
                                                onChange={(e) => update('desc', e.target.value)}
                                                className="w-full text-sm font-bold bg-gray-50 border-2 border-transparent focus:border-black/10 focus:bg-white rounded-xl p-3 outline-none resize-none transition-all"
                                                rows={2}
                                                placeholder="技能描述..."
                                            />
                                        </div>

                                        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                                            {/* Icon Selector */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold opacity-40 uppercase flex items-center gap-2">
                                                    Icon
                                                    <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full">{item.icon}</span>
                                                </label>
                                                <div className="p-3 bg-gray-50 rounded-xl border-2 border-black/5">
                                                    <IconSelector value={item.icon} onChange={(val) => update('icon', val)} />
                                                </div>
                                            </div>

                                            {/* Hover Color Selector */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold opacity-40 uppercase hover:text-black transition-colors">Hover Color</label>
                                                <NeoSelect
                                                    value={item.hoverColor || "hover:bg-[#FACC15]"}
                                                    onChange={(val) => update('hoverColor', val)}
                                                    className="!text-xs"
                                                    placeholder="Select Color"
                                                    options={[
                                                        { value: "hover:bg-[#FACC15]", label: "Yellow", emoji: "🟡" },
                                                        { value: "hover:bg-[#A855F7]", label: "Purple", emoji: "🟣" },
                                                        { value: "hover:bg-[#4ADE80]", label: "Green", emoji: "🟢" },
                                                        { value: "hover:bg-blue-500", label: "Blue", emoji: "🔵" },
                                                        { value: "hover:bg-red-500", label: "Red", emoji: "🔴" },
                                                    ]}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />

                        {/* Vibe Cards Editor */}
                        <ArrayEditor
                            title="个性卡片 (Vibe Cards)"
                            description="堆叠卡片区域的内容"
                            items={settings.aboutVibeCards || []}
                            onChange={(items) => updateSetting('aboutVibeCards', items)}
                            itemTemplate={{ icon: "Music", title: "Hobbies", desc: "...", color: "bg-white", textColor: "text-black", iconColor: "text-black", rot: 0 }}
                            renderItem={(item, index, update) => (
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Left Column: Style Controls */}
                                    <div className="w-full md:w-48 space-y-3 p-4 bg-gray-50 rounded-xl border-2 border-black/5 h-fit">
                                        <h4 className="font-bold text-xs uppercase opacity-40 mb-2">Card Style</h4>
                                        <div>
                                            <label className="text-xs font-bold opacity-50 block mb-1">Color (Tailwind)</label>
                                            <NeoSelect
                                                value={item.color}
                                                onChange={(val) => update('color', val)}
                                                className="!text-xs"
                                                placeholder="Select Color"
                                                options={[
                                                    { value: "bg-white", label: "White", emoji: "⚪" },
                                                    { value: "bg-black", label: "Black", emoji: "⚫" },
                                                    { value: "bg-[#FACC15]", label: "Yellow", emoji: "🟡" },
                                                    { value: "bg-[#A855F7]", label: "Purple", emoji: "🟣" },
                                                    { value: "bg-[#4ADE80]", label: "Green", emoji: "🟢" },
                                                    { value: "bg-blue-500", label: "Blue", emoji: "🔵" },
                                                    { value: "bg-red-500", label: "Red", emoji: "🔴" },
                                                    { value: "bg-pink-500", label: "Pink", emoji: "💗" },
                                                    { value: "bg-orange-500", label: "Orange", emoji: "🟠" },
                                                    { value: "bg-teal-400", label: "Teal", emoji: "💠" },
                                                ]}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold opacity-50 block mb-1">Text Color</label>
                                            <NeoSelect
                                                value={item.textColor || "text-black"}
                                                onChange={(val) => update('textColor', val)}
                                                className="!text-xs"
                                                placeholder="Select Text Color"
                                                options={[
                                                    { value: "text-black", label: "Black", emoji: "⚫" },
                                                    { value: "text-white", label: "White", emoji: "⚪" },
                                                    { value: "text-[#FACC15]", label: "Yellow", emoji: "🟡" },
                                                    { value: "text-[#A855F7]", label: "Purple", emoji: "🟣" },
                                                    { value: "text-[#4ADE80]", label: "Green", emoji: "🟢" },
                                                ]}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold opacity-50 block mb-1">Icon Color</label>
                                            <NeoSelect
                                                value={item.iconColor || "text-black"}
                                                onChange={(val) => update('iconColor', val)}
                                                className="!text-xs"
                                                placeholder="Select Icon Color"
                                                options={[
                                                    { value: "text-black", label: "Black", emoji: "⚫" },
                                                    { value: "text-white", label: "White", emoji: "⚪" },
                                                    { value: "text-[#FACC15]", label: "Yellow", emoji: "🟡" },
                                                    { value: "text-[#A855F7]", label: "Purple", emoji: "🟣" },
                                                    { value: "text-[#4ADE80]", label: "Green", emoji: "🟢" },
                                                    { value: "text-blue-500", label: "Blue", emoji: "🔵" },
                                                    { value: "text-red-500", label: "Red", emoji: "🔴" },
                                                ]}
                                            />

                                        </div>
                                        <div>
                                            <label className="text-xs font-bold opacity-50 block mb-1">Rotation (°)</label>
                                            <input
                                                type="number"
                                                value={item.rot}
                                                onChange={(e) => update('rot', Number(e.target.value))}
                                                className="w-full px-3 py-2 bg-white border-2 border-black/10 rounded-lg font-mono text-xs focus:border-black outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column: Content */}
                                    <div className="flex-1 space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold opacity-40 uppercase">Title</label>
                                            <input
                                                value={item.title}
                                                onChange={(e) => update('title', e.target.value)}
                                                className="w-full font-black text-lg bg-transparent border-b-2 border-black/10 focus:border-black outline-none py-1"
                                                placeholder="卡片标题"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold opacity-40 uppercase">Description</label>
                                            <textarea
                                                value={item.desc}
                                                onChange={(e) => update('desc', e.target.value)}
                                                className="w-full text-sm font-bold bg-white border-2 border-black/10 focus:border-black rounded-xl p-3 outline-none resize-none"
                                                rows={2}
                                                placeholder="卡片描述"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold opacity-40 uppercase">Icon</label>
                                            <div className="p-3 bg-gray-50 rounded-xl border-2 border-black/5">
                                                <IconSelector value={item.icon} onChange={(val) => update('icon', val)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </section>

                {/* Social Links (Reduced priority) */}
                <section className="bg-white/90 backdrop-blur-sm border-4 border-black rounded-3xl p-8 shadow-neo relative z-10">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-black/5">
                        <h2 className="text-xl font-black opacity-50">社交链接</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center shrink-0">
                                <Github className="w-5 h-5" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <label className="text-xs font-bold opacity-40 uppercase">Github URL</label>
                                <input
                                    value={settings.githubUrl}
                                    onChange={(e) => updateSetting('githubUrl', e.target.value)}
                                    placeholder="https://github.com/..."
                                    className="w-full bg-gray-50 border-2 border-black/5 focus:border-black px-4 py-2 rounded-lg font-bold text-sm outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center shrink-0">
                                <Twitter className="w-5 h-5" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <label className="text-xs font-bold opacity-40 uppercase">Twitter / X URL</label>
                                <input
                                    value={settings.twitterUrl}
                                    onChange={(e) => updateSetting('twitterUrl', e.target.value)}
                                    placeholder="https://twitter.com/..."
                                    className="w-full bg-gray-50 border-2 border-black/5 focus:border-black px-4 py-2 rounded-lg font-bold text-sm outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <label className="text-xs font-bold opacity-40 uppercase">Email Address</label>
                                <input
                                    value={settings.emailAddress}
                                    onChange={(e) => updateSetting('emailAddress', e.target.value)}
                                    placeholder="example@mail.com"
                                    className="w-full bg-gray-50 border-2 border-black/5 focus:border-black px-4 py-2 rounded-lg font-bold text-sm outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <label className="text-xs font-bold opacity-40 uppercase">Resume URL</label>
                                <input
                                    value={settings.resumeUrl}
                                    onChange={(e) => updateSetting('resumeUrl', e.target.value)}
                                    placeholder="https://.../resume.pdf"
                                    className="w-full bg-gray-50 border-2 border-black/5 focus:border-black px-4 py-2 rounded-lg font-bold text-sm outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* Floating Action Bar */}
            <div className="fixed bottom-36 md:bottom-8 w-[90%] md:w-auto left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 z-50 flex items-center justify-between md:justify-start gap-3 p-2 pl-4 bg-black/90 backdrop-blur-xl text-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-white/10 transition-all duration-300">
                <div className="flex flex-col mr-4">
                    <span className="text-sm font-bold">
                        {isDirty ? "未保存更改" : "系统就绪"}
                    </span>
                    <span className="text-xs text-white/50">
                        {isDirty ? "请保存您的修改" : "所有设置已是最新"}
                    </span>
                </div>

                <div className="h-8 w-[1px] bg-white/20 mx-1" />

                <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/10 text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                    <RotateCcw className="w-4 h-4" />
                    重置
                </button>

                <button
                    onClick={handleSave}
                    disabled={!isDirty || isSaving}
                    className={`px-6 py-2 rounded-xl font-bold text-sm shadow-lg transform transition-all flex items-center gap-2
                        ${isDirty
                            ? "bg-[#FACC15] hover:bg-[#FACC15]/90 text-black hover:-translate-y-0.5"
                            : "bg-white/10 text-white/30 cursor-not-allowed"
                        }`}
                >
                    {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    Save Changes
                </button>
            </div>
        </div>
    );
}
