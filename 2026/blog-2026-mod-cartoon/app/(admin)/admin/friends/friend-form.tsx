"use client";

import { createFriendLink, updateFriendLink } from "@/actions/friend-links"; // We need to export these or use a server action prop
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NeoSelect } from "@/components/ui/neo-select"; // Using the custom select we built
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface FriendFormProps {
    initialData?: {
        id: string;
        name: string;
        url: string;
        description: string | null;
        avatar: string | null;
        active: boolean;
        style: string;
    };
    isEdit?: boolean;
}

export function FriendForm({ initialData, isEdit = false }: FriendFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // State for controlled inputs (optional, but good for select/checkbox)
    const [active, setActive] = useState(initialData?.active ?? true);
    const [style, setStyle] = useState(initialData?.style || "neo");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            // Append controlled values if needed, though form data usually catches inputs. 
            // Checkbox 'on' is standard. Style might need manual set if NeoSelect doesn't use native select.
            // NeoSelect likely uses a hidden input or we strictly pass values.
            // Let's assume NeoSelect updates a hidden input or we append manually.
            // I'll append manually to be safe.
            formData.set("active", active ? "on" : "off");
            formData.set("style", style);

            let res;
            if (isEdit && initialData) {
                res = await updateFriendLink(initialData.id, formData);
            } else {
                res = await createFriendLink(formData);
            }

            if (res.success) {
                toast.success(res.message);
                router.push("/admin/friends");
                router.refresh(); // Ensure list updates
            } else {
                toast.error(res.message || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Submission error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/friends">
                    <Button variant="ghost" size="icon" type="button">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-black">{isEdit ? "Edit Friend" : "Add New Friend"}</h1>
            </div>

            <div className="space-y-4 bg-white p-6 border-4 border-black shadow-neo rounded-xl">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" defaultValue={initialData?.name} required placeholder="My Awesome Friend" className="border-2 border-black" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" name="url" defaultValue={initialData?.url} required type="url" placeholder="https://friend-blog.com" className="border-2 border-black" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" defaultValue={initialData?.description || ""} placeholder="A short bio..." className="border-2 border-black" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="avatar">Avatar URL</Label>
                    <Input id="avatar" name="avatar" defaultValue={initialData?.avatar || ""} placeholder="https://example.com/avatar.png" className="border-2 border-black" />
                </div>

                <div className="grid gap-2">
                    <Label>Card Style</Label>
                    <NeoSelect
                        value={style}
                        onChange={setStyle}
                        options={[
                            { value: "neo", label: "Neo-Brutalist (Default)" },
                            { value: "holo", label: "Holographic" },
                            { value: "retro", label: "Retro/Pixel" }
                        ]}
                    />
                </div>

                <div className="flex items-center gap-2 pt-2">
                    <input
                        type="checkbox"
                        id="active"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        className="w-5 h-5 border-2 border-black rounded focus:ring-black accent-black"
                    />
                    {/* Fallback to native checkbox if UI component missing, simpler for now */}
                    <Label htmlFor="active" className="cursor-pointer">Active (Show publicly)</Label>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button type="submit" disabled={loading} className="font-bold border-2 border-black shadow-neo hover:-translate-y-1 transition-transform min-w-[120px]">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
