import { getFriendLinks } from "@/actions/friend-links";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { DeleteFriendButton } from "./delete-button";

export const dynamic = 'force-dynamic';

export default async function AdminFriendsPage() {
    const { data } = await getFriendLinks();
    const links = data as any[]; // Quick fix for type inference to avoid build fail

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-sm border-4 border-black rounded-2xl p-6 shadow-neo">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Friend Links</h1>
                    <p className="text-black/50 font-medium">Manage your blogroll and friendships.</p>
                </div>
                <Link
                    href="/admin/friends/new"
                    className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl border-2 border-black shadow-neo font-bold hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                    <Plus className="w-4 h-4" /> Add Friend
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {links?.map((link) => (
                    <Card key={link.id} className="p-6 border-4 border-black shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                {link.avatar && (
                                    <div className="w-12 h-12 rounded-xl border-2 border-black overflow-hidden bg-gray-100">
                                        <img src={link.avatar} alt={link.name} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-black text-lg leading-tight">{link.name}</h3>
                                    <a href={link.url} target="_blank" className="text-xs text-muted-foreground hover:underline flex items-center gap-1">
                                        {new URL(link.url).hostname}
                                        <ExternalLink size={10} />
                                    </a>
                                </div>
                            </div>
                            <div className={`px-2 py-0.5 rounded-full text-xs font-bold border-2 border-black ${link.active ? 'bg-green-300' : 'bg-gray-200'}`}>
                                {link.active ? 'ACTIVE' : 'HIDDEN'}
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-6 line-clamp-2 h-10">
                            {link.description || "No description provided."}
                        </p>

                        <div className="flex items-center gap-2">
                            <Link href={`/admin/friends/${link.id}/edit`} className="flex-1">
                                <Button variant="outline" className="w-full border-2 border-black font-bold hover:bg-yellow-100">
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                </Button>
                            </Link>
                            <DeleteFriendButton id={link.id} name={link.name} />
                        </div>
                    </Card>
                ))}

                {(!links || links.length === 0) && (
                    <div className="col-span-full py-12 text-center text-muted-foreground bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        No friend links found. Go make some friends! 🤝
                    </div>
                )}
            </div>
        </div>
    );
}
