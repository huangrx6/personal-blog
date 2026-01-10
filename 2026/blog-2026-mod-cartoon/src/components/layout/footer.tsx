"use client";

import { ArrowUpRight, Github, Mail, MessageCircle, Twitter } from "lucide-react";

interface FooterProps {
  settings?: {
    emailAddress?: string | null;
    twitterUrl?: string | null;
    githubUrl?: string | null;
    weiboUrl?: string | null;
    siteName?: string | null;
    siteDescription?: string | null;
    author?: string | null;
  } | null;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const email = settings?.emailAddress || "hello@blog2026.com";

  return (
    <footer className="w-full bg-black/90 p-8 md:p-12 lg:p-20 relative z-50">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-6 gap-6">

        {/* --- ROW 1 (Height: 400px) --- */}

        {/* 1. Massive Title Block */}
        <div className="col-span-1 md:col-span-4 bg-[#A855F7] rounded-[2.5rem] p-10 md:p-14 flex flex-col justify-between neo-shadow hover:scale-[1.01] transition-transform h-[400px]">
          <div className="flex justify-between items-start">
            <span className="inline-block px-4 py-2 rounded-full bg-black/20 text-white font-bold">CONTACT</span>
            <ArrowUpRight className="w-20 h-20 text-white opacity-80" />
          </div>
          <h1 className="text-8xl md:text-9xl font-black text-white leading-[0.8] tracking-tighter uppercase">
            来<br />聊聊
          </h1>
        </div>

        {/* 2. Email Block */}
        <div className="col-span-1 md:col-span-2 bg-[#FACC15] rounded-[2.5rem] p-10 flex flex-col justify-between neo-shadow hover:scale-[1.01] transition-transform h-[400px] group cursor-pointer relative overflow-hidden">
          <div className="relative z-10 border-b-4 border-black pb-2 self-start">
            <span className="text-black font-black text-2xl uppercase">Email Me</span>
          </div>
          <a href={`mailto:${email}`} className="relative z-10 text-2xl md:text-3xl font-black text-black break-words leading-tight group-hover:scale-105 transition-transform origin-bottom-left">
            {email}
          </a>
          <Mail className="absolute bottom-[-20px] right-[-20px] w-48 h-48 text-black/5 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
        </div>

        {/* --- ROW 2 (Height: 220px) --- */}

        {/* 3. Social Icons (1 col each) */}
        {settings?.twitterUrl && (
          <a href={settings.twitterUrl} target="_blank" className="col-span-1 bg-white rounded-[2.5rem] h-[220px] flex items-center justify-center neo-shadow hover:bg-[#1DA1F2] hover:text-white transition-colors group">
            <Twitter className="w-16 h-16 md:w-20 md:h-20 group-hover:scale-110 transition-transform" />
          </a>
        )}

        {settings?.githubUrl && (
          <a href={settings.githubUrl} target="_blank" className="col-span-1 bg-white rounded-[2.5rem] h-[220px] flex items-center justify-center neo-shadow hover:bg-black hover:text-white transition-colors group">
            <Github className="w-16 h-16 md:w-20 md:h-20 group-hover:scale-110 transition-transform" />
          </a>
        )}

        {settings?.weiboUrl && (
          <a href={settings.weiboUrl} target="_blank" className="col-span-1 bg-white rounded-[2.5rem] h-[220px] flex items-center justify-center neo-shadow hover:bg-[#E6162D] hover:text-white transition-colors group">
            <MessageCircle className="w-16 h-16 md:w-20 md:h-20 group-hover:scale-110 transition-transform" />
          </a>
        )}

        {/* 4. Info Block (Fills remaining space - 3 cols) */}
        <div className="col-span-1 md:col-span-3 bg-[#4ADE80] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between neo-shadow h-[220px]">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-black uppercase text-black">
              {settings?.siteName || "Blog 2026"}
            </h3>
            <div className="text-right flex gap-3 text-sm font-bold text-black opacity-60">
              <span>EST. {currentYear}</span>
              <span>CN: {settings?.author || "Me"}</span>
            </div>
          </div>

          <div>
            <p className="font-mono text-black/70 text-base leading-tight uppercase">
              {settings?.siteDescription || "Digital Playground"}
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
