"use client";

import { updatePostStatus } from "@/actions/post-status";
import { useConfirmDialog } from "@/components/ui/confirm-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Archive, Check, ChevronDown, Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

type StatusType = "DRAFT" | "PUBLISHED" | "OFFLINE";

interface PostStatusBadgeProps {
    postId: string;
    currentStatus: StatusType;
}

const statusOptions: { value: StatusType; label: string; icon: typeof Eye; color: string }[] = [
    { value: "PUBLISHED", label: "已发布", icon: Eye, color: "bg-green-100 text-green-700" },
    { value: "DRAFT", label: "草稿", icon: Archive, color: "bg-gray-100 text-gray-700" },
    { value: "OFFLINE", label: "下线", icon: EyeOff, color: "bg-red-100 text-red-700" },
];

export function PostStatusBadge({ postId, currentStatus }: PostStatusBadgeProps) {
    const [status, setStatus] = useState<StatusType>(currentStatus);
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const containerRef = useRef<HTMLDivElement>(null);
    const { confirm } = useConfirmDialog();

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleStatusChange = async (newStatus: StatusType) => {
        setIsOpen(false);
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

    const currentOption = statusOptions.find(o => o.value === status) || statusOptions[0];
    const Icon = currentOption.icon;

    // Determine badge style based on status
    const badgeStyle = {
        PUBLISHED: "bg-green-300 text-black",
        DRAFT: "bg-gray-200 text-black/60",
        OFFLINE: "bg-red-200 text-red-900"
    }[status];

    return (
        <div className="relative z-20" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isPending}
                className={`
                    px-2 py-0.5 rounded-full border-2 border-black text-xs font-bold flex items-center gap-1 transition-all
                    ${badgeStyle}
                    ${isOpen ? 'shadow-none translate-y-0.5' : 'shadow-neo-sm hover:-translate-y-0.5 hover:shadow-neo'}
                    ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
            >
                {isPending ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                    <Icon className="w-3 h-3" />
                )}
                <span>{currentOption.label}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="absolute top-full right-0 mt-2 w-32 bg-white border-2 border-black rounded-xl shadow-neo-lg overflow-hidden flex flex-col p-1 gap-1 z-[100]"
                    >
                        {statusOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleStatusChange(option.value)}
                                className={`
                                    flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-left transition-colors
                                    ${option.value === status ? 'bg-black text-white' : 'hover:bg-gray-100 text-black'}
                                `}
                            >
                                <option.icon className="w-3 h-3" />
                                <span className="flex-1">{option.label}</span>
                                {option.value === status && <Check className="w-3 h-3" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
