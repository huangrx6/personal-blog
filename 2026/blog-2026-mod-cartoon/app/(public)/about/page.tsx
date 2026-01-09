"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FloatingElement } from "@/components/parallax";
import { Github, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";

const skills = [
    "React", "Next.js", "TypeScript", "Tailwind CSS",
    "Figma", "Node.js", "UI Design", "UX Research"
];

const services = [
    {
        title: "Product Design",
        description: "Creating intuitive and beautiful user interfaces",
        icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
        color: "bg-primary",
    },
    {
        title: "Frontend Development",
        description: "Building responsive and performant web applications",
        icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
        color: "bg-secondary",
    },
    {
        title: "Creative Writing",
        description: "Sharing insights and stories about technology and design",
        icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
        color: "bg-accent",
    },
];

export default function AboutPage() {
    return (
        <div className="flex flex-col">
            {/* ============================================
          Hero Section
          ============================================ */}
            <section className="relative min-h-[70vh] flex items-center px-6 lg:px-8 pt-24">
                {/* 浮动装饰 */}
                <FloatingElement delay={0} duration={5} amplitude={20} className="absolute top-40 right-10 w-24 h-24 opacity-50 hidden lg:block">
                    <Image src="/parallax/clouds.png" alt="" fill className="object-contain" />
                </FloatingElement>

                <div className="max-w-6xl mx-auto w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="space-y-6">
                            <span className="inline-block px-4 py-2 rounded-full border-2 border-black bg-white/80 backdrop-blur-sm shadow-neo-sm text-sm font-bold animate-slide-up">
                                👋 Hello!
                            </span>

                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter animate-slide-up" style={{ animationDelay: "0.1s" }}>
                                I'm <span className="text-gradient-primary">Creative</span>
                            </h1>

                            <p className="text-xl text-black/60 max-w-lg animate-slide-up" style={{ animationDelay: "0.2s" }}>
                                Designer & developer passionate about creating meaningful digital experiences.
                                Bridging the gap between aesthetics and functionality.
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                                {[
                                    { icon: Twitter, href: "#", label: "Twitter" },
                                    { icon: Github, href: "#", label: "GitHub" },
                                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                                    { icon: Mail, href: "#", label: "Email" },
                                ].map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="w-12 h-12 rounded-xl bg-white border-2 border-black shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] flex items-center justify-center transition-all hover:bg-primary hover:text-white"
                                        aria-label={label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Profile Card */}
                        <div className="glass-card p-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                            <div className="flex flex-col items-center text-center">
                                {/* Avatar with Mascot */}
                                <div className="relative w-32 h-32 mb-6">
                                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-glow" />
                                    <Image
                                        src="/parallax/mascot.png"
                                        alt="Avatar"
                                        fill
                                        className="object-contain relative z-10"
                                    />
                                </div>

                                <h2 className="text-2xl font-black mb-2">Your Name</h2>
                                <p className="text-black/60 mb-6">Designer & Developer</p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 text-sm font-bold rounded-full bg-secondary/20 text-secondary-foreground border border-secondary/30"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
          Services Section - Sticky 堆叠
          ============================================ */}
            <section className="parallax-section-sticky bg-white py-24 px-6 lg:px-8" style={{ zIndex: 11 }}>
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-12 text-center">
                        What I <span className="text-gradient-accent">Do</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div
                                key={service.title}
                                className="glass-card-hover p-8 text-center animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={`w-16 h-16 ${service.color} rounded-2xl border-2 border-black shadow-neo-sm mx-auto mb-6 flex items-center justify-center`}>
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d={service.icon}
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black mb-3">{service.title}</h3>
                                <p className="text-black/60">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================
          CTA Section - Sticky 堆叠
          ============================================ */}
            <section className="parallax-section-sticky bg-accent py-24 px-6 lg:px-8" style={{ zIndex: 12 }}>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
                        LET'S CONNECT
                    </h2>
                    <p className="text-xl font-medium text-white/80 mb-8">
                        Have a project in mind? Let's create something amazing together.
                    </p>

                    <Button size="lg" className="h-14 px-8 text-lg bg-white text-black border-2 border-black shadow-neo hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
                        Get in Touch
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </section>
        </div>
    );
}
