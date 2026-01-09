import type { Metadata } from "next";
import { Outfit, Work_Sans, Bangers, ZCOOL_KuaiLe, Comic_Neue, Ma_Shan_Zheng, Long_Cang } from "next/font/google";
import "./globals.css";
import GlobalFeatures from "@/components/layout/global-features";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const bangers = Bangers({
  variable: "--font-bangers",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const comicNeue = Comic_Neue({
  variable: "--font-comic-neue",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const zcoolKuaiLe = ZCOOL_KuaiLe({
  variable: "--font-zcool",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const maShanZheng = Ma_Shan_Zheng({
  variable: "--font-mashan",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const longCang = Long_Cang({
  variable: "--font-longcang",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Blog 2026 - Creative Personal Blog",
  description: "A modern personal blog with hand-drawn inspired design. Sharing thoughts, ideas, and creative work.",
  keywords: ["blog", "personal", "creative", "writing", "portfolio"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Blog 2026 - Creative Personal Blog",
    description: "A modern personal blog with hand-drawn inspired design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${workSans.variable} ${bangers.variable} ${zcoolKuaiLe.variable} ${comicNeue.variable} ${maShanZheng.variable} ${longCang.variable} antialiased`}
        data-font-en="system"
        data-font-cn="system"
      >
        <GlobalFeatures />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
