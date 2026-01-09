import { Header } from "@/components/layout/header";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="public-page flex min-h-screen flex-col overflow-x-hidden">
            {/* 浮动玻璃态导航 */}
            <Header />

            {/* 主内容 */}
            <main className="flex-1 relative">
                {children}
            </main>

            {/* 简化的页脚 */}
            <footer className="relative z-20 py-8 text-center text-sm text-black/40 bg-[#84CC16]">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-black/60">© 2026 Creative Blog. Made with ❤️ and lots of ☕</p>
                </div>
            </footer>
        </div>
    );
}
