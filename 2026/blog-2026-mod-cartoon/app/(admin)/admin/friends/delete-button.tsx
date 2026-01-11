"use client";

import { deleteFriendLink } from "@/actions/friend-links";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteFriendButton({ id, name }: { id: string, name: string }) {
    const handleDelete = async () => {
        const confirmed = confirm(`Are you sure you want to remove ${name} from your friends? 😢`);
        if (!confirmed) return;

        const res = await deleteFriendLink(id);
        if (res?.success) {
            toast.success("Friend link deleted");
        } else {
            toast.error("Failed to delete");
        }
    };

    return (
        <Button
            variant="destructive"
            size="icon"
            className="border-2 border-black shadow-neo-sm hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
            onClick={handleDelete}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    );
}
