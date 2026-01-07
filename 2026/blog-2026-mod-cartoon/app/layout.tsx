import type { Metadata } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import "./globals.css";

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
        className={`${outfit.variable} ${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
