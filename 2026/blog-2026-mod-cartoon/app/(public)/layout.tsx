import { ConditionalFooter } from "@/components/layout/conditional-footer";
import { Header } from "@/components/layout/header";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { getSiteSettings } from "@/lib/actions";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await getSiteSettings();

    return (
        <SmoothScrollProvider>
            <div className="public-page flex min-h-screen flex-col relative" style={{ overflowX: 'clip' }}>
                <Header settings={settings} />

                {/* Main content must be relative, z-10, and have a background to cover the footer */}
                <main className="flex-1 relative z-10 bg-white shadow-2xl">
                    {children}
                </main>

                <ConditionalFooter settings={settings} />
            </div>
        </SmoothScrollProvider>
    );
}
