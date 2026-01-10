import { FeatureGrid } from "@/components/home/FeatureGrid";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestPosts } from "@/components/home/LatestPosts";
import { WebAppShowcase } from "@/components/home/WebAppShowcase";
import { getLatestPosts } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const posts = await getLatestPosts(3);

    return (
        <main className="min-h-screen bg-white w-full overflow-x-hidden font-sans text-black">
            <HeroSection />
            <FeatureGrid />
            <WebAppShowcase />
            <LatestPosts posts={posts} />
        </main>
    );
}
