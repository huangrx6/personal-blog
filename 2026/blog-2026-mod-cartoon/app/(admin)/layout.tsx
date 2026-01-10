import { AdminClientWrapper } from "@/components/admin/admin-client-wrapper";
import { AdminHeader } from "@/components/admin/admin-header";
import { ConfirmDialogProvider } from "@/components/ui/confirm-dialog";
import { Toaster } from "@/components/ui/toaster";
import { getSiteSettings } from "@/lib/actions";
import { auth } from "@/lib/auth/config";
import { redirect } from "next/navigation";

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
    const settings = await getSiteSettings();

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

            <ConfirmDialogProvider>
                {/* Sticky Header with Settings */}
                <AdminHeader settings={settings} />

                {/* Main Content Container */}
                <div className="relative z-10 pb-28">
                    {/* Page Content with Navigation Provider */}
                    <AdminClientWrapper>
                        <main className="px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 py-6 max-w-[560px] sm:max-w-[640px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1200px] 2xl:max-w-[1400px] mx-auto w-full">
                            {children}
                        </main>
                    </AdminClientWrapper>
                </div>
                <Toaster />
            </ConfirmDialogProvider>
        </div>
    );
}
