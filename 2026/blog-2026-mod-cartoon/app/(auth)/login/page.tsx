"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Floating shapes for visual interest
const FloatingShape = ({ className, delay = 0 }: { className: string; delay?: number }) => (
    <motion.div
        className={className}
        animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
        }}
        transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
        }}
    />
);

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                redirect: false,
            });

            if (result?.error) {
                setError("登录失败，请检查邮箱是否正确");
            } else {
                router.push("/admin");
                router.refresh();
            }
        } catch (err) {
            setError("登录失败，请稍后重试");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-primary/5 to-secondary/10">
            {/* Unified Halftone Dot Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #000 1.5px, transparent 1.5px)",
                    backgroundSize: "20px 20px",
                }}
            />

            {/* Floating Accent Shapes (scattered across entire page) */}
            <FloatingShape
                className="absolute top-[8%] left-[5%] w-12 h-12 bg-secondary rounded-full border-2 border-black shadow-neo z-10"
                delay={0}
            />
            <FloatingShape
                className="absolute top-[15%] right-[10%] w-16 h-16 bg-primary rounded-full border-2 border-black shadow-neo z-10"
                delay={0.3}
            />
            <FloatingShape
                className="absolute top-[60%] left-[3%] w-10 h-10 bg-accent rotate-45 border-2 border-black shadow-neo z-10"
                delay={0.6}
            />
            <FloatingShape
                className="absolute bottom-[20%] right-[5%] w-14 h-14 bg-secondary rotate-12 rounded-lg border-2 border-black shadow-neo z-10"
                delay={0.9}
            />
            <FloatingShape
                className="absolute bottom-[10%] left-[40%] w-8 h-8 bg-white rounded-full border-2 border-black shadow-neo z-10"
                delay={1.2}
            />

            {/* Main Character - Positioned to overlap and break boundaries */}
            <motion.div
                className="absolute right-[-5%] lg:right-[5%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] z-20 pointer-events-none"
                animate={{
                    y: [-15, 15, -15],
                    rotate: [-1, 1, -1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <img
                    src="/login-character.png"
                    alt="Creative Character"
                    className="w-full h-full object-contain"
                    style={{
                        filter: "drop-shadow(10px 10px 0px hsl(var(--secondary)))",
                    }}
                />
            </motion.div>

            {/* Login Form Card - Centered */}
            <div className="relative z-30 min-h-screen flex items-center justify-center px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, x: -50, rotate: -2 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md bg-white/90 backdrop-blur-sm border-4 border-black rounded-3xl p-8 lg:p-10 shadow-neo-lg"
                >
                    {/* Logo / Brand Mark */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-primary rounded-xl border-2 border-black shadow-neo flex items-center justify-center text-white font-black text-xl">
                            B
                        </div>
                        <span className="font-black text-xl tracking-tight">Blog 2026</span>
                    </div>

                    <div className="space-y-2 mb-8">
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter leading-none">
                            欢迎回来
                            <span className="text-primary">!</span>
                        </h1>
                        <p className="text-black/50 font-medium">
                            登录以继续你的创作之旅
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border-2 border-red-500 rounded-lg text-red-600 text-sm font-bold">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-bold uppercase tracking-wider">邮箱</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="h-14 border-2 border-black shadow-neo-sm focus-visible:shadow-neo focus-visible:translate-x-0.5 focus-visible:translate-y-0.5 transition-all text-base bg-white"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-bold uppercase tracking-wider">密码</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-14 border-2 border-black shadow-neo-sm focus-visible:shadow-neo focus-visible:translate-x-0.5 focus-visible:translate-y-0.5 transition-all text-base bg-white"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 text-lg font-black border-2 border-black shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1.5 active:translate-y-1.5 transition-all uppercase tracking-wider disabled:opacity-50"
                        >
                            {isLoading ? "登录中..." : "登录 →"}
                        </Button>
                    </form>

                    <div className="text-center text-sm font-bold mt-6">
                        <Link href="#" className="text-black/50 hover:text-primary transition-colors">
                            忘记密码？
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Speech Bubble Quote - Positioned near character */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-8 right-[10%] lg:right-[15%] z-30 hidden lg:block"
            >
                <div className="relative bg-white border-3 border-black rounded-2xl px-6 py-4 shadow-neo max-w-xs">
                    {/* Speech Bubble Tail pointing up-right */}
                    <div
                        className="absolute -top-4 right-8 w-0 h-0"
                        style={{
                            borderLeft: "12px solid transparent",
                            borderRight: "12px solid transparent",
                            borderBottom: "16px solid black",
                        }}
                    />
                    <div
                        className="absolute -top-2.5 right-[34px] w-0 h-0"
                        style={{
                            borderLeft: "10px solid transparent",
                            borderRight: "10px solid transparent",
                            borderBottom: "14px solid white",
                        }}
                    />

                    <p className="text-lg font-black text-center">
                        "用<span className="text-primary">代码</span>创造无限可能"
                    </p>
                    <p className="text-center text-xs font-bold text-black/50 mt-1">
                        — 欢迎回来，开发者
                    </p>
                </div>
            </motion.div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-bl-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-tr-[100px] pointer-events-none"></div>
        </div>
    );
}
