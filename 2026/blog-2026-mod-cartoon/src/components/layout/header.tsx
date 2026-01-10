"use client";

import { cn } from "@/lib/utils/cn";
import { SiteSettings } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderProps {
  settings?: SiteSettings | null;
}

export function Header({ settings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);

  // Check if we are on a blog post page (e.g. /blog/some-slug)
  // Ensure we don't hide on the main /blog list page
  const isBlogPost = pathname.startsWith("/blog/") && pathname.split("/").length > 2;

  useEffect(() => {
    if (!isBlogPost) {
      setIsHidden(false);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBlogPost]);

  const navItems = [
    { name: "首页", href: "/" },
    { name: "博客", href: "/blog" },
    { name: "关于", href: "/about" },
    { name: "友链", href: "/friends" },
  ];

  return (
    <header
      className={cn(
        "fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ease-in-out",
        isHidden ? "-translate-y-[150%] opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      )}
    >
      <div className="glass-nav rounded-full px-6 py-3 w-full max-w-7xl transition-all duration-300 hover:shadow-neo-sm">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 font-black text-xl hover:scale-105 transition-transform"
          >
            {/* Logo Image */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-black bg-white">
              <div className="w-full h-full bg-primary flex items-center justify-center font-bold">B</div>
            </div>
            <span className="hidden sm:block text-lg tracking-tight uppercase">
              {settings?.siteName || "BLOG 2026"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-6 py-2 pb-2.5 font-black text-base text-black/70 rounded-full border-2 border-transparent transition-all duration-200 
                hover:bg-[#FACC15] hover:text-black hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:scale-105 active:shadow-none active:translate-y-0 active:translate-x-0"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-black transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block w-6 h-0.5 bg-black transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
              <span className={`block w-6 h-0.5 bg-black transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 mt-4 border-t border-black/10">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-black/5 font-bold text-center"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
