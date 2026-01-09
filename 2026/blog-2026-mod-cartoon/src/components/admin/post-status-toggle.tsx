"use client";

import { useState, useTransition } from "react";
import { updatePostStatus } from "@/actions/post-status";
import { Eye, EyeOff, Archive, Loader2 } from "lucide-react";
import { toast } from "sonner";

type StatusType = "DRAFT" | "PUBLISHED" | "OFFLINE";

interface PostStatusToggleProps {
    postId: string;
    currentStatus: StatusType;
}

const statusOptions: { value: StatusType; label: string; icon: typeof Eye; color: string }[] = [
    { value: "DRAFT", label: "草稿", icon: Archive, color: "bg-accent/20 text-accent hover:bg-accent hover:text-white" },
    { value: "PUBLISHED", label: "发布", icon: Eye, color: "bg-secondary/20 text-secondary hover:bg-secondary hover:text-white" },
    { value: "OFFLINE", label: "下线", icon: EyeOff, color: "bg-gray-200 text-gray-600 hover:bg-gray-600 hover:text-white" },
];

export function PostStatusToggle({ postId, currentStatus }: PostStatusToggleProps) {
    const [status, setStatus] = useState<StatusType>(currentStatus);
    const [isPending, startTransition] = useTransition();

    const handleStatusChange = (newStatus: StatusType) => {
        if (newStatus === status || isPending) return;

        const option = statusOptions.find(o => o.value === newStatus);
        setStatus(newStatus);

        startTransition(async () => {
            const result = await updatePostStatus(postId, newStatus);
            if (result.success) {
                toast.success(`文章已设为${option?.label}`);
            } else {
                toast.error("状态更新失败");
                setStatus(currentStatus); // Revert on error
            }
        });
    };

    return (
        <div className="mt-3 pt-3 border-t border-black/10">
            <p className="text-xs font-bold text-black/40 mb-2">状态切换</p>
            <div className="flex gap-1">
                {statusOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = status === option.value;
                    return (
                        <button
                            key={option.value}
                            onClick={() => handleStatusChange(option.value)}
                            disabled={isPending}
                            className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${isActive
                                ? option.color.replace('hover:', '').split(' ').slice(2).join(' ') + ' border-black'
                                : 'border-transparent ' + option.color.split(' ').slice(0, 2).join(' ')
                                } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isPending && status === option.value ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                                <Icon className="w-3 h-3" />
                            )}
                            <span className="hidden sm:inline">{option.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
