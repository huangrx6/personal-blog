"use client";

import { updatePostStatus } from "@/actions/post-status";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";
import { Archive, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type StatusType = "DRAFT" | "PUBLISHED" | "OFFLINE";

interface PostStatusToggleProps {
    postId: string;
    currentStatus: StatusType;
}

const statusOptions: { value: StatusType; label: string; icon: typeof Eye; color: string }[] = [
    { value: "DRAFT", label: "草稿", icon: Archive, color: "text-accent" },
    { value: "PUBLISHED", label: "发布", icon: Eye, color: "text-secondary" },
    { value: "OFFLINE", label: "下线", icon: EyeOff, color: "text-gray-500" },
];

export function PostStatusToggle({ postId, currentStatus }: PostStatusToggleProps) {
    const [status, setStatus] = useState<StatusType>(currentStatus);
    const [isPending, startTransition] = useTransition();
    const { confirm } = useConfirmDialog();

    const handleStatusChange = async (newStatus: StatusType) => {
        if (newStatus === status || isPending) return;

        const option = statusOptions.find(o => o.value === newStatus);

        const isConfirmed = await confirm({
            title: `设为${option?.label}`,
            message: `确定要将文章状态更改为 “${option?.label}” 吗？`,
            confirmText: "确认更改",
            cancelText: "取消",
            variant: newStatus === 'OFFLINE' ? 'danger' : 'info',
            icon: option?.icon ? <option.icon className="w-8 h-8" /> : undefined
        });

        if (!isConfirmed) return;

        // Optimistically update status
        const previousStatus = status;
        setStatus(newStatus);

        startTransition(async () => {
            const result = await updatePostStatus(postId, newStatus);
            if (result.success) {
                toast.success(`文章已设为${option?.label}`);
            } else {
                toast.error("状态更新失败");
                setStatus(previousStatus); // Revert on error
            }
        });
    };

    return (
        <div className="mt-4">
            <div className="flex border-2 border-black rounded-xl overflow-hidden shadow-neo-sm bg-white h-9 relative z-0">
                {statusOptions.map((option, index) => {
                    const Icon = option.icon;
                    const isActive = status === option.value;
                    const isLast = index === statusOptions.length - 1;

                    return (
                        <button
                            key={option.value}
                            onClick={() => handleStatusChange(option.value)}
                            disabled={isPending}
                            className={`
                                flex-1 flex items-center justify-center gap-1.5 text-xs font-bold transition-all relative
                                ${!isLast ? 'border-r-2 border-black' : ''}
                                ${isActive
                                    ? 'bg-black text-white'
                                    : 'bg-white text-black/60 hover:bg-gray-50 hover:text-black'
                                }
                                ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                            `}
                        >
                            {isPending && status === option.value ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : option.color}`} />
                            )}
                            <span>{option.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
