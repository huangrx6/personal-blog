"use client";

import { BookOpen, Laptop, Smartphone } from "lucide-react";
import { useState } from "react";

export function WebAppShowcase() {
    const [activeTab, setActiveTab] = useState("web");

    return (
        <section className="w-full min-h-screen bg-white py-32 px-6 md:px-12 border-t-4 border-black flex flex-col justify-center">
            <div className="max-w-[1400px] mx-auto flex flex-col items-center w-full">

                <h2 className="text-5xl md:text-7xl font-black text-center mb-12 uppercase leading-tight">
                    全平台 <br /> 完美适配
                </h2>

                {/* Toggle Pill */}
                <div className="flex bg-white border-4 border-black rounded-full p-2 mb-16 shadow-neo-lg scale-105">
                    {[
                        { id: "web", label: "桌面端" },
                        { id: "mobile", label: "移动版" },
                        { id: "read", label: "阅读模式" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-8 py-3 rounded-full font-black text-lg uppercase transition-all ${activeTab === tab.id
                                    ? "bg-black text-white"
                                    : "bg-transparent text-black hover:bg-black/5"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Visual Side */}
                    <div className="neo-card bg-[#FACC15] p-8 md:p-16 aspect-[4/3] flex items-center justify-center relative overflow-hidden group">
                        {/* Mockup Placeholder */}
                        <div className="bg-white rounded-2xl w-full h-full p-8 text-black flex flex-col items-center justify-center border-4 border-black group-hover:scale-105 transition-transform duration-500 shadow-neo">
                            {activeTab === "web" && <Laptop className="w-40 h-40 mb-6 stroke-[1.5]" />}
                            {activeTab === "mobile" && <Smartphone className="w-32 h-32 mb-6 stroke-[1.5]" />}
                            {activeTab === "read" && <BookOpen className="w-32 h-32 mb-6 stroke-[1.5]" />}

                            <span className="font-mono text-xl opacity-60 font-bold">
                                {activeTab === "web" ? "Desktop View" : activeTab === "mobile" ? "Mobile View" : "Reader Mode"}
                            </span>
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="flex flex-col items-start text-left pl-4">
                        <h3 className="text-[8vw] lg:text-[4vw] font-black italic leading-[0.9] mb-8 uppercase text-outline">
                            RESPONSIVE
                        </h3>
                        <p className="text-2xl md:text-3xl font-bold leading-relaxed mb-10 max-w-lg">
                            {activeTab === "web" && "大屏浏览，细节尽收眼底。代码高亮、交互演示，专为大屏优化。"}
                            {activeTab === "mobile" && "碎片时间，依然流畅。针对拇指操作优化，单手也能轻松阅读长文。"}
                            {activeTab === "read" && "排除干扰，回归本质。纯净的阅读模式，让你专注于文字的力量。"}
                        </p>
                        <button className="neo-button bg-black text-white px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-neo-lg">
                            体验一下 ↗
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
}
