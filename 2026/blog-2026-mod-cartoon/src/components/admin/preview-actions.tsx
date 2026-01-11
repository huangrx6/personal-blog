"use client";

import { useAdminActions } from "@/components/admin/admin-action-context";
import { PublishToggleButton, StatusType } from "@/components/admin/publish-toggle-button";
import { motion } from "framer-motion";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PreviewActionsProps {
    postId: string;
    postStatus: string; // Received as string from server
}

export function PreviewActions({ postId, postStatus }: PreviewActionsProps) {
    const { setActions } = useAdminActions();
    const router = useRouter();

    // Cast status for the button
    const validStatus = postStatus as StatusType;

    // Common Action Buttons
    const Actions = (
        <>
            <button
                onClick={() => router.back()}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-xl hover:bg-gray-100 transition-colors font-bold text-sm cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
            </button>

            <div className="hidden md:block w-px h-8 bg-black/10 mx-1"></div>

            <div className="flex items-center justify-between gap-3 w-full md:w-auto">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-xl font-bold border-2 border-green-200">
                    <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
                    <span className="text-[10px] uppercase tracking-widest">Live</span>
                </div>

                <PublishToggleButton postId={postId} initialStatus={validStatus} />
            </div>

            <Link
                href={`/admin/posts/${postId}`}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-black text-white rounded-xl font-bold shadow-neo hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all active:scale-95 cursor-pointer"
            >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
            </Link>
        </>
    );

    // Inject into Mobile Dock
    useEffect(() => {
        setActions(
            <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between gap-2">
                    <button
                        onClick={() => router.back()}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 border-2 border-transparent rounded-xl font-bold text-xs cursor-pointer"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Back
                    </button>
                    <Link
                        href={`/admin/posts/${postId}`}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-black text-white border-2 border-black rounded-xl font-bold text-xs cursor-pointer"
                    >
                        <Edit className="w-3 h-3" />
                        Edit
                    </Link>
                </div>
                <PublishToggleButton postId={postId} initialStatus={validStatus} />
            </div>
        );
        return () => setActions(null);
    }, [postId, validStatus, setActions, router]);

    // Render Desktop Floating Dock
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="hidden md:flex fixed bottom-6 right-12 z-[100] items-center gap-3 p-2 bg-white border-4 border-black rounded-2xl shadow-neo-lg"
        >
            {Actions}
        </motion.div>
    );
}
