"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";
import { FooterRevealWrapper } from "./footer-reveal-wrapper";

interface ConditionalFooterProps {
    settings: {
        emailAddress?: string | null;
        twitterUrl?: string | null;
        githubUrl?: string | null;
        weiboUrl?: string | null;
        siteName?: string | null;
        siteDescription?: string | null;
        author?: string | null;
    } | null;
}

// 需要隐藏 footer 的路径
const HIDE_FOOTER_PATHS = ["/friends"];

export function ConditionalFooter({ settings }: ConditionalFooterProps) {
    const pathname = usePathname();

    // 检查当前路径是否需要隐藏 footer
    const shouldHide = HIDE_FOOTER_PATHS.some(path => pathname.startsWith(path));

    if (shouldHide) {
        return null;
    }

    return (
        <FooterRevealWrapper>
            <Footer settings={settings} />
        </FooterRevealWrapper>
    );
}
