"use client";

import { FloatingShapes } from "@/components/ui/floating-shapes";
import {
    Save, User, Globe, Smartphone, RotateCcw, Link2, Mail,
    MessageSquare, Clock, Loader2, Check, Settings2, Sparkles, Palette
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
}

const defaultSettings: SettingsData = {
    siteName: "Blog 2026",
    siteDescription: "A creative personal blog",
    author: "",
    githubUrl: "",
    twitterUrl: "",
    emailAddress: "",
    weiboUrl: "",
    fontStyle: "system",
    primaryColor: "#0EA5E9",
    mouseFollowEnabled: true,
    cursorStyle: "blob",
    highPerformanceMode: false,
    commentsEnabled: false,
    showReadingTime: true,
};

const cursorOptions = [
    { id: "blob", name: "粘性球", description: "经典的跟随效果", emoji: "🟢" },
    { id: "sparkle", name: "闪光星", description: "鼠标经过处闪闪发光", emoji: "✨" },
    { id: "rainbow", name: "彩虹拖尾", description: "五彩斑斓的轨迹", emoji: "🌈" },
    { id: "trail", name: "气泡链", description: "渐变大小的跟随气泡", emoji: "🫧" },
];

// Mascot speech bubbles based on settings state
const getMascotSpeech = (settings: SettingsData): string => {
    if (settings.cursorStyle === "rainbow") return "哇！彩虹好漂亮！🌈";
    if (settings.cursorStyle === "sparkle") return "闪闪发光~✨ 魔法来啦！";
    if (!settings.mouseFollowEnabled) return "嗯？鼠标效果关掉了？那我休息一下~";
    if (settings.highPerformanceMode) return "性能模式启动！我要飞起来啦~🚀";
    if (settings.fontStyle === "zcool") return "站酷快乐体超可爱的！Love it~";
    if (settings.fontStyle === "comic") return "Comic字体也很不错呢！";
    if (settings.commentsEnabled) return "评论功能开了！期待和大家互动~";
    return "调整设置让博客更有个性吧！我在这里帮你~";
};

export default function SettingsPage() {
    const [settings, setSettings] = useState<SettingsData>(defaultSettings);
    const [originalSettings, setOriginalSettings] = useState<SettingsData>(defaultSettings);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const isDirty = JSON.stringify(settings) !== JSON.stringify(originalSettings);

    // Fetch settings on mount
    useEffect(() => {
        async function fetchSettings() {
            try {
                const response = await fetch('/api/settings');
                if (response.ok) {
                    const data = await response.json();
                    setSettings(data);
                    setOriginalSettings(data);
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSettings();
    }, []);

    // Save settings
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
                setSaveSuccess(true);
                // Apply font change immediately
                document.body.setAttribute('data-font-style', data.fontStyle);
                setTimeout(() => setSaveSuccess(false), 2000);
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
        } finally {
            setIsSaving(false);
        }
    };

    // Reset to defaults
    const handleReset = async () => {
        if (confirm('重置所有设置为默认？')) {
            setSettings(defaultSettings);
            await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(defaultSettings),
            });
            window.location.reload();
        }
    };

    // Update helper
    const updateSetting = <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    // Note: Loading state now handled by admin template.tsx
    // No internal loading spinner needed

    return (
        <div className="space-y-8 relative min-h-[80vh] pb-24">
            <FloatingShapes />

            {/* Mascot Character - Fixed position on the right */}
            <div className="hidden lg:block fixed right-8 bottom-8 z-30">
                <motion.div
                    className="relative"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Speech Bubble */}
                    <motion.div
                        className="absolute -top-20 -left-48 w-52 bg-white border-3 border-black rounded-2xl p-3 shadow-neo text-sm font-bold"
                        key={getMascotSpeech(settings)}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p>{getMascotSpeech(settings)}</p>
                        {/* Speech bubble tail */}
                        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r-3 border-b-3 border-black transform rotate-45"></div>
                    </motion.div>

                    {/* Mascot Image */}
                    <Image
                        src="/images/settings-mascot.png"
                        alt="Settings Mascot"
                        width={180}
                        height={180}
                        className="drop-shadow-lg"
                    />
                </motion.div>
            </div>

            {/* Header with Save Button - top offset for AdminHeader */}
            <div className="flex items-center justify-between mb-8 sticky top-20 z-20 bg-white/80 backdrop-blur-lg rounded-2xl p-4 border-2 border-black/5 shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                        <Settings2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black font-cartoon">系统设置</h1>
                        <p className="text-black/50 text-sm font-medium">
                            {isDirty ? "有未保存的更改" : "所有设置已保存"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleReset}
                        className="text-sm font-bold text-red-500 flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        重置
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={!isDirty || isSaving}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isDirty
                            ? 'bg-black text-white hover:bg-primary shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <AnimatePresence mode="wait">
                            {isSaving ? (
                                <motion.div key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                </motion.div>
                            ) : saveSuccess ? (
                                <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                    <Check className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                <motion.div key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <Save className="w-5 h-5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <span>{isSaving ? "保存中..." : saveSuccess ? "已保存!" : "保存更改"}</span>
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {/* Site Info */}
                <section className="bg-white/90 backdrop-blur-sm border-4 border-black rounded-3xl p-8 shadow-neo">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-black/5">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl border-2 border-black flex items-center justify-center">
                            <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">站点信息</h2>
                            <p className="text-sm font-bold text-black/40">基础站点配置</p>
                        </div>
                    </div>

                    <div className="space-y-4">
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
                            <label className="font-bold text-sm uppercase text-black/50">站点描述</label>
                            <textarea
                                value={settings.siteDescription}
                                onChange={(e) => updateSetting('siteDescription', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-black/10 rounded-xl font-bold focus:border-black transition-colors outline-none resize-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-bold text-sm uppercase text-black/50">作者名称</label>
                            <input
                                type="text"
                                value={settings.author}
                                onChange={(e) => updateSetting('author', e.target.value)}
                                placeholder="Your Name"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-black/10 rounded-xl font-bold focus:border-black transition-colors outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Social Links */}
                <section className="bg-white/90 backdrop-blur-sm border-4 border-black rounded-3xl p-8 shadow-neo">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-black/5">
                        <div className="w-12 h-12 bg-secondary/20 rounded-xl border-2 border-black flex items-center justify-center">
                            <Link2 className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">社交链接</h2>
                            <p className="text-sm font-bold text-black/40">展示在页脚的联系方式</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="font-bold text-sm uppercase text-black/50 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> GitHub
                            </label>
                            <input
                                type="url"
                                value={settings.githubUrl}
                                onChange={(e) => updateSetting('githubUrl', e.target.value)}
                                placeholder="https://github.com/username"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-black/10 rounded-xl font-medium focus:border-black transition-colors outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-bold text-sm uppercase text-black/50 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Twitter/X
                            </label>
                            <input
                                type="url"
                                value={settings.twitterUrl}
                                onChange={(e) => updateSetting('twitterUrl', e.target.value)}
                                placeholder="https://twitter.com/username"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-black/10 rounded-xl font-medium focus:border-black transition-colors outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-bold text-sm uppercase text-black/50 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> 邮箱地址
                            </label>
                            <input
                                type="email"
                                value={settings.emailAddress}
                                onChange={(e) => updateSetting('emailAddress', e.target.value)}
                                placeholder="your@email.com"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-black/10 rounded-xl font-medium focus:border-black transition-colors outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-bold text-sm uppercase text-black/50 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> 微博
                            </label>
                            <input
                                type="url"
                                value={settings.weiboUrl}
                                onChange={(e) => updateSetting('weiboUrl', e.target.value)}
                                placeholder="https://weibo.com/u/username"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-black/10 rounded-xl font-medium focus:border-black transition-colors outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Cursor Effects - NEW SECTION */}
                <section className="bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-sm border-4 border-black rounded-3xl p-8 shadow-neo">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-black/5">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl border-2 border-black flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">鼠标特效</h2>
                            <p className="text-sm font-bold text-black/40">选择你喜欢的光标跟随效果</p>
                        </div>
                    </div>

                    {/* Mouse Follow Toggle */}
                    <div
                        onClick={() => updateSetting('mouseFollowEnabled', !settings.mouseFollowEnabled)}
                        className="flex items-center justify-between p-4 bg-white/80 rounded-xl border-2 border-black/10 cursor-pointer hover:bg-white transition-colors mb-6"
                    >
                        <div>
                            <h3 className="font-bold">启用鼠标特效</h3>
                            <p className="text-xs font-bold text-black/40">关闭后将不显示任何光标跟随效果</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full relative transition-colors ${settings.mouseFollowEnabled ? 'bg-black' : 'bg-gray-300'}`}>
                            <motion.div
                                className="absolute top-1 w-4 h-4 bg-white rounded-full"
                                animate={{ left: settings.mouseFollowEnabled ? '28px' : '4px' }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </div>
                    </div>

                    {/* Cursor Style Options */}
                    <AnimatePresence>
                        {settings.mouseFollowEnabled && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                            >
                                {cursorOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => updateSetting('cursorStyle', option.id)}
                                        className={`relative p-4 border-2 rounded-xl text-left transition-all ${settings.cursorStyle === option.id
                                            ? 'bg-black text-white border-black scale-[0.98] shadow-none'
                                            : 'bg-white text-black border-black/10 hover:border-black hover:shadow-neo-sm'
                                            }`}
                                    >
                                        <span className="text-3xl mb-2 block">{option.emoji}</span>
                                        <span className="block text-sm font-bold">{option.name}</span>
                                        <span className="text-xs opacity-60">{option.description}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* Appearance */}
                <section className="bg-white/90 backdrop-blur-sm border-4 border-black rounded-3xl p-8 shadow-neo">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-black/5">
                        <div className="w-12 h-12 bg-accent/20 rounded-xl border-2 border-black flex items-center justify-center">
                            <Palette className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">外观设置</h2>
                            <p className="text-sm font-bold text-black/40">字体和性能优化</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Font Selection - Unified */}
                        <div className="space-y-3">
                            <label className="font-bold text-sm uppercase text-black/50">整体字体风格</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => updateSetting('fontStyle', 'system')}
                                    className={`relative p-4 border-2 rounded-xl text-left transition-all ${settings.fontStyle === 'system' ? 'bg-black text-white border-black' : 'bg-white text-black border-black/10 hover:border-black'}`}
                                >
                                    <span className="block text-lg font-bold mb-1">系统默认</span>
                                    <span className="text-xs opacity-60">苹方/微软雅黑</span>
                                </button>
                                <button
                                    onClick={() => updateSetting('fontStyle', 'comic')}
                                    className={`relative p-4 border-2 rounded-xl text-left transition-all ${settings.fontStyle === 'comic' ? 'bg-black text-white border-black' : 'bg-white text-black border-black/10 hover:border-black'}`}
                                >
                                    <span className="block text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-comic-neue)' }}>Comic Style</span>
                                    <span className="text-xs opacity-60">英文卡通风</span>
                                </button>
                                <button
                                    onClick={() => updateSetting('fontStyle', 'zcool')}
                                    className={`relative p-4 border-2 rounded-xl text-left transition-all ${settings.fontStyle === 'zcool' ? 'bg-black text-white border-black' : 'bg-white text-black border-black/10 hover:border-black'}`}
                                >
                                    <span className="block text-lg font-bold mb-1" style={{ fontFamily: '"ZCOOL KuaiLe", cursive' }}>站酷快乐体</span>
                                    <span className="text-xs opacity-60">可爱卡通风</span>
                                </button>
                                <button
                                    onClick={() => updateSetting('fontStyle', 'mashan')}
                                    className={`relative p-4 border-2 rounded-xl text-left transition-all ${settings.fontStyle === 'mashan' ? 'bg-black text-white border-black' : 'bg-white text-black border-black/10 hover:border-black'}`}
                                >
                                    <span className="block text-lg font-bold mb-1" style={{ fontFamily: '"Ma Shan Zheng", cursive' }}>马善政毛笔</span>
                                    <span className="text-xs opacity-60">手写书法风</span>
                                </button>
                                <button
                                    onClick={() => updateSetting('fontStyle', 'longcang')}
                                    className={`relative p-4 border-2 rounded-xl text-left transition-all ${settings.fontStyle === 'longcang' ? 'bg-black text-white border-black' : 'bg-white text-black border-black/10 hover:border-black'}`}
                                >
                                    <span className="block text-lg font-bold mb-1" style={{ fontFamily: '"Long Cang", cursive' }}>龙藏草书</span>
                                    <span className="text-xs opacity-60">潇洒草书风</span>
                                </button>
                            </div>
                        </div>

                        {/* High Performance Toggle */}
                        <div
                            onClick={() => updateSetting('highPerformanceMode', !settings.highPerformanceMode)}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-black/5 cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div>
                                <h3 className="font-bold">高性能模式</h3>
                                <p className="text-xs font-bold text-black/40">减少模糊特效以提高流畅度</p>
                            </div>
                            <div className={`w-12 h-6 rounded-full relative transition-colors ${settings.highPerformanceMode ? 'bg-black' : 'bg-gray-300'}`}>
                                <motion.div
                                    className="absolute top-1 w-4 h-4 bg-white rounded-full"
                                    animate={{ left: settings.highPerformanceMode ? '28px' : '4px' }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="bg-white/90 backdrop-blur-sm border-4 border-black rounded-3xl p-8 shadow-neo">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-black/5">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl border-2 border-black flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">功能开关</h2>
                            <p className="text-sm font-bold text-black/40">启用或禁用博客功能</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div
                            onClick={() => updateSetting('commentsEnabled', !settings.commentsEnabled)}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-black/5 cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold">评论功能</h3>
                                    <p className="text-xs font-bold text-black/40">允许读者在文章下方留言</p>
                                </div>
                            </div>
                            <div className={`w-12 h-6 rounded-full relative transition-colors ${settings.commentsEnabled ? 'bg-black' : 'bg-gray-300'}`}>
                                <motion.div
                                    className="absolute top-1 w-4 h-4 bg-white rounded-full"
                                    animate={{ left: settings.commentsEnabled ? '28px' : '4px' }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            </div>
                        </div>

                        <div
                            onClick={() => updateSetting('showReadingTime', !settings.showReadingTime)}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-black/5 cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold">显示阅读时间</h3>
                                    <p className="text-xs font-bold text-black/40">在文章页面显示预计阅读时间</p>
                                </div>
                            </div>
                            <div className={`w-12 h-6 rounded-full relative transition-colors ${settings.showReadingTime ? 'bg-black' : 'bg-gray-300'}`}>
                                <motion.div
                                    className="absolute top-1 w-4 h-4 bg-white rounded-full"
                                    animate={{ left: settings.showReadingTime ? '28px' : '4px' }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
