"use client"

import { useState, useTransition } from "react"
import { updatePostStatus } from "@/actions/post-status"
import { Eye, EyeOff, Loader2 } from "lucide-react"

type StatusType = "DRAFT" | "PUBLISHED" | "OFFLINE";

interface PublishToggleButtonProps {
    postId: string;
    initialStatus: StatusType;
}

export function PublishToggleButton({ postId, initialStatus }: PublishToggleButtonProps) {
    const [status, setStatus] = useState<StatusType>(initialStatus);
    const [isPending, startTransition] = useTransition();

    const togglePublish = () => {
        const newStatus: StatusType = status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
        setStatus(newStatus);
        startTransition(async () => {
            await updatePostStatus(postId, newStatus);
        });
    };

    const isPublished = status === "PUBLISHED";

    return (
        <button
            onClick={togglePublish}
            disabled={isPending}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all border-2 ${isPublished
                    ? "bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary hover:text-white hover:border-secondary"
                    : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : isPublished ? (
                <Eye className="w-4 h-4" />
            ) : (
                <EyeOff className="w-4 h-4" />
            )}
            <span>{isPublished ? "已发布" : "草稿"}</span>
        </button>
    );
}
