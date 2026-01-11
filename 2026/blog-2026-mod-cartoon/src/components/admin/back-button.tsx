"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-black hover:text-white border-2 border-transparent hover:border-black hover:-translate-x-1 transition-all rounded-xl"
            title="Go Back"
        >
            <ArrowLeft className="w-5 h-5" />
        </Button>
    );
}
