"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-black/60 hover:text-black transition-colors font-bold group"
        >
            <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-primary/20 transition-colors">
                <ArrowLeft className="w-4 h-4" />
            </div>
            <span>返回</span>
        </button>
    );
}
