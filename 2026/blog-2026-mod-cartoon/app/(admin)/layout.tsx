import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import { AdminClientWrapper } from "@/components/admin/admin-client-wrapper";
import { AdminHeader } from "@/components/admin/admin-header";

// Floating decorative shapes
const FloatingShape = ({ className }: { className: string }) => (
    <div className={className} />
);

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/10 relative">
            {/* Background Pattern - fixed position */}
            <div
                className="fixed inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #000 1.5px, transparent 1.5px)",
                    backgroundSize: "24px 24px",
                }}
            />

            {/* Decorative Shapes - fixed position */}
            <FloatingShape className="fixed top-[5%] right-[5%] w-20 h-20 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <FloatingShape className="fixed bottom-[20%] left-[3%] w-32 h-32 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            <FloatingShape className="fixed top-[40%] right-[2%] w-16 h-16 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

            {/* Sticky Header */}
            <AdminHeader />

            {/* Main Content Container */}
            <div className="relative z-10 pb-28">
                {/* Page Content with Navigation Provider */}
                <AdminClientWrapper>
                    <main className="px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 py-6 max-w-[560px] sm:max-w-[640px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1200px] 2xl:max-w-[1400px] mx-auto w-full">
                        {children}
                    </main>
                </AdminClientWrapper>
            </div>
        </div>
    );
}

