import { prisma } from "@/lib/db/prisma";
import AboutClient from "./AboutClient";

export const dynamic = "force-dynamic"; // Ensure fresh data on every request

export default async function AboutPage() {
    // Fetch settings directly from DB
    let settings = await prisma.siteSettings.findUnique({
        where: { id: "default" }
    });

    if (!settings) {
        // Fallback or create default if missing (handled in API usually, but safe to duplicate basic valid object here)
        // We'll just pass an empty object structure and let ClientComponent use its internal defaults
        // or we could perform a create here.
        settings = await prisma.siteSettings.create({
            data: { id: "default" }
        });
    }

    // Transform to simple object to avoid date serialization issues if any (though here we just pass primitives/json)
    const plainSettings = {
        aboutHeroTitle1: settings.aboutHeroTitle1,
        aboutHeroTitle2: settings.aboutHeroTitle2,
        aboutHeroDescription: settings.aboutHeroDescription,
        aboutSkills: settings.aboutSkills as any[], // Cast JSON
        aboutVibeCards: settings.aboutVibeCards as any[], // Cast JSON
        githubUrl: settings.githubUrl,
    };

    return <AboutClient settings={plainSettings} />;
}
