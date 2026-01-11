"use client";

import { useAdminActions } from "@/components/admin/admin-action-context";
import { ArrayEditor, IconSelector } from "@/components/admin/ArrayEditor";
import { SettingsHeroDoodle } from "@/components/admin/settings-hero-doodle";

export const dynamic = 'force-dynamic';

import { useConfirmDialog } from "@/components/ui/confirm-dialog";
// import { FloatingShapes } from "@/components/ui/floating-shapes";
import { NeoSelect } from "@/components/ui/neo-select";
import { motion } from "framer-motion";
import {
    Check,
    Github,
    LayoutTemplate,
    Loader2,
    MessageSquare,
    Palette,
    RotateCcw,
    Save,
    Settings2, Sparkles,
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
    const { setActions } = useAdminActions();

    // Deep compare check (simple JSON stringify is enough for this size)
    const isDirty = JSON.stringify(settings) !== JSON.stringify(originalSettings);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const response = await fetch('/api/settings');
                if (response.ok) {
                    const data = await response.json();
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

    // Inject actions into AdminDock for Mobile
    useEffect(() => {
        setActions(
            <>
                {isDirty && (
                    <div className="text-[10px] font-bold text-red-500 uppercase text-center mb-1 animate-pulse">
                        Unsaved Changes
                    </div>
                )}
                <button
                    onClick={handleSave}
                    disabled={!isDirty || isSaving}
                    className={`
                        w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl font-black border-2 border-black transition-all text-sm
                        ${isDirty
                            ? "bg-[#FACC15] text-black shadow-neo hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                            : "bg-gray-100 text-black/30 border-black/10 cursor-not-allowed"
                        }
                    `}
                >
                    {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    <span>SAVE</span>
                </button>

                <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border-2 border-black bg-white text-black text-sm hover:bg-gray-100 transition-colors"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                </button>
            </>
        );
        return () => setActions(null);
    }, [isDirty, isSaving]);

    return (
        <div className="space-y-8 relative min-h-[80vh] pb-24">
            {/* Redesigned Hero Header */}
            <div className="relative w-full bg-white border-4 border-black rounded-3xl overflow-hidden shadow-neo mb-10 min-h-[300px] md:min-h-[340px] flex flex-col md:flex-row group">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}
                />

                {/* Left: Text Content */}
                <div className="relative z-20 flex-1 p-10 md:p-16 flex flex-col justify-center items-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-bold rounded-full mb-6">
                        <Settings2 className="w-3 h-3 animate-spin-slow" />
                        <span>CONTROL PANEL</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-sm">
                        System
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#3B82F6] [-webkit-text-stroke:2px_black]">
                            Settings
                        </span>
                    </h1>

                    <p className="font-bold text-black/60 md:text-lg max-w-md leading-relaxed">
                        管理您的博客配置与个性化选项，构建独特的数字空间。
                    </p>

                    <div className="mt-8 flex items-center gap-3">
                        <div className="px-3 py-1.5 bg-green-400 border-2 border-black text-xs font-black rounded-lg flex items-center gap-2 shadow-neo-sm">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            SYSTEM ONLINE
                        </div>
                        <div className="px-3 py-1.5 bg-white border-2 border-black text-xs font-bold rounded-lg shadow-neo-sm">
                            v2.4.0
                        </div>
                    </div>
                </div>

                {/* Right: Visuals (Doodle) */}
                <div className="absolute inset-0 md:static md:w-1/2 overflow-visible md:overflow-hidden pointer-events-none">
                    {/* Gradient Fade for text readability on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent md:hidden z-10" />

                    {/* The Doodle Component - Positioned to interact with the card */}
                    <div className="absolute right-[-10%] md:right-0 top-0 bottom-0 w-full md:w-full flex items-center justify-center transform scale-90 md:scale-100 origin-center">
                        <SettingsHeroDoodle />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-24">
                {/* ... Main Content ... */}
                {/* 1. Global Site Info */}
                <section className="lg:col-span-2 bg-white border-4 border-black rounded-3xl p-6 md:p-8 shadow-neo relative z-40">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-4 border-black/5">
                        <div className="w-12 h-12 bg-primary text-white rounded-xl border-2 border-black flex items-center justify-center shadow-neo-sm">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase">站点信息</h2>
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
                                className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-bold shadow-neo-sm focus:shadow-neo focus:translate-x-[2px] focus:translate-y-[2px] transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-bold text-sm uppercase text-black/50">作者名称</label>
                            <input
                                type="text"
                                value={settings.author}
                                onChange={(e) => updateSetting('author', e.target.value)}
                                className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-bold shadow-neo-sm focus:shadow-neo focus:translate-x-[2px] focus:translate-y-[2px] transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="font-bold text-sm uppercase text-black/50">站点描述</label>
                            <textarea
                                value={settings.siteDescription}
                                onChange={(e) => updateSetting('siteDescription', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl font-bold shadow-neo-sm focus:shadow-neo focus:translate-x-[2px] focus:translate-y-[2px] transition-all outline-none resize-none"
                            />
                        </div>
                    </div>
                </section>

                {/* 2. Social Links */}
                <section className="bg-white border-4 border-black rounded-3xl p-6 md:p-8 shadow-neo relative z-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-4 border-black/5">
                        <div className="w-12 h-12 bg-black text-white rounded-xl border-2 border-black flex items-center justify-center shadow-neo-sm">
                            <Github className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase">社交链接</h2>
                            <p className="text-sm font-bold text-black/40">联系方式</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex-1 space-y-1">
                            <label className="text-xs font-bold opacity-40 uppercase">Github URL</label>
                            <input
                                value={settings.githubUrl}
                                onChange={(e) => updateSetting('githubUrl', e.target.value)}
                                placeholder="https://github.com/..."
                                className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl font-bold text-sm shadow-neo-sm focus:shadow-neo focus:translate-x-[1px] focus:translate-y-[1px] transition-all outline-none"
                            />
                        </div>
                        <div className="flex-1 space-y-1">
                            <label className="text-xs font-bold opacity-40 uppercase">Twitter / X URL</label>
                            <input
                                value={settings.twitterUrl}
                                onChange={(e) => updateSetting('twitterUrl', e.target.value)}
                                placeholder="https://twitter.com/..."
                                className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl font-bold text-sm shadow-neo-sm focus:shadow-neo focus:translate-x-[1px] focus:translate-y-[1px] transition-all outline-none"
                            />
                        </div>
                        <div className="flex-1 space-y-1">
                            <label className="text-xs font-bold opacity-40 uppercase">Email Address</label>
                            <input
                                value={settings.emailAddress}
                                onChange={(e) => updateSetting('emailAddress', e.target.value)}
                                placeholder="example@mail.com"
                                className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl font-bold text-sm shadow-neo-sm focus:shadow-neo focus:translate-x-[1px] focus:translate-y-[1px] transition-all outline-none"
                            />
                        </div>
                        <div className="flex-1 space-y-1">
                            <label className="text-xs font-bold opacity-40 uppercase">Resume URL</label>
                            <input
                                value={settings.resumeUrl}
                                onChange={(e) => updateSetting('resumeUrl', e.target.value)}
                                placeholder="https://.../resume.pdf"
                                className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl font-bold text-sm shadow-neo-sm focus:shadow-neo focus:translate-x-[1px] focus:translate-y-[1px] transition-all outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* 3. Appearance */}
                <section className="bg-white border-4 border-black rounded-3xl p-6 md:p-8 shadow-neo relative z-50">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-4 border-black/5">
                        <div className="w-12 h-12 bg-accent text-white rounded-xl border-2 border-black flex items-center justify-center shadow-neo-sm">
                            <Palette className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase">外观设置</h2>
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
                                    className={`px-4 py-2 border-2 rounded-xl font-bold transition-all ${settings.mouseFollowEnabled ? 'bg-black text-white border-black shadow-neo-sm' : 'bg-gray-100 text-gray-500 border-transparent'}`}
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

                {/* 4. Features */}
                <section className="bg-white border-4 border-black rounded-3xl p-6 md:p-8 shadow-neo relative z-40">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-4 border-black/5">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl border-2 border-black flex items-center justify-center shadow-neo-sm">
                            <MessageSquare className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase">功能开关</h2>
                            <p className="text-sm font-bold text-black/40">博客功能配置</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-black shadow-neo-sm">
                            <span className="font-bold">评论功能</span>
                            <div
                                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors border-2 border-black ${settings.commentsEnabled ? 'bg-black' : 'bg-gray-200'}`}
                                onClick={() => updateSetting('commentsEnabled', !settings.commentsEnabled)}
                            >
                                <motion.div className="absolute top-0.5 w-4 h-4 bg-white rounded-full border border-black" animate={{ left: settings.commentsEnabled ? '26px' : '2px' }} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-black shadow-neo-sm">
                            <span className="font-bold">显示阅读时间</span>
                            <div
                                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors border-2 border-black ${settings.showReadingTime ? 'bg-black' : 'bg-gray-200'}`}
                                onClick={() => updateSetting('showReadingTime', !settings.showReadingTime)}
                            >
                                <motion.div className="absolute top-0.5 w-4 h-4 bg-white rounded-full border border-black" animate={{ left: settings.showReadingTime ? '26px' : '2px' }} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. About Page Configuration */}
                <section className="lg:col-span-2 xl:col-span-3 bg-[#FACC15]/20 border-4 border-black rounded-3xl p-6 md:p-8 shadow-neo relative z-20">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-4 border-black/5">
                        <div className="w-12 h-12 bg-[#FACC15] rounded-xl border-2 border-black flex items-center justify-center shadow-neo-sm">
                            <LayoutTemplate className="w-6 h-6 text-black" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase">关于页面配置</h2>
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
                                        className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg font-bold shadow-neo-sm focus:shadow-neo transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-black/40 uppercase">主标题高亮 (Gradient)</label>
                                    <input
                                        type="text"
                                        value={settings.aboutHeroTitle2}
                                        onChange={(e) => updateSetting('aboutHeroTitle2', e.target.value)}
                                        className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg font-bold text-[#A855F7] shadow-neo-sm focus:shadow-neo transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-black/40 uppercase">个人简介描述</label>
                                <textarea
                                    value={settings.aboutHeroDescription}
                                    onChange={(e) => updateSetting('aboutHeroDescription', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg font-bold shadow-neo-sm focus:shadow-neo transition-all outline-none resize-none"
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
                                                className="w-full text-sm font-bold bg-white border-2 border-black rounded-xl p-3 shadow-neo-sm focus:shadow-neo outline-none resize-none transition-all"
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
                                                <div className="p-3 bg-white rounded-xl border-2 border-black shadow-neo-sm">
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
                                    <div className="w-full md:w-48 space-y-3 p-4 bg-white rounded-xl border-2 border-black h-fit shadow-neo-sm">
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
                                                className="w-full px-3 py-2 bg-white border-2 border-black rounded-lg font-mono text-xs focus:border-black outline-none shadow-neo-sm"
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
                                                className="w-full text-sm font-bold bg-white border-2 border-black rounded-xl p-3 shadow-neo-sm focus:shadow-neo outline-none resize-none"
                                                rows={2}
                                                placeholder="卡片描述"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold opacity-40 uppercase">Icon</label>
                                            <div className="p-3 bg-white rounded-xl border-2 border-black shadow-neo-sm">
                                                <IconSelector value={item.icon} onChange={(val) => update('icon', val)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </section>

            </div>

            {/* Anime Style Floating Action Bar - Desktop Only */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="hidden md:flex fixed bottom-6 right-6 md:right-12 z-[100] items-center gap-3 p-2 bg-white border-4 border-black rounded-2xl shadow-neo-lg"
            >
                {isDirty && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="hidden md:flex flex-col mr-2 px-2"
                    >
                        <span className="text-xs font-black uppercase text-red-500">Unsaved Changes</span>
                        <span className="text-[10px] font-bold text-black/40">记得保存哦!</span>
                    </motion.div>
                )}

                <button
                    onClick={handleReset}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-black bg-white text-black hover:bg-gray-100 transition-colors"
                    title="重置"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>

                <div className="w-px h-8 bg-black/10 mx-1" />

                <button
                    onClick={handleSave}
                    disabled={!isDirty || isSaving}
                    className={`
                        flex items-center gap-2 px-6 py-2 rounded-xl font-black border-2 border-black transition-all
                        ${isDirty
                            ? "bg-[#FACC15] text-black shadow-neo hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                            : "bg-gray-100 text-black/30 border-black/10 cursor-not-allowed"
                        }
                    `}
                >
                    {isSaving ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Save className="w-5 h-5" />
                    )}
                    <span>SAVE</span>
                </button>
            </motion.div>
        </div>
    );
}
