import { getFriendLinks } from "@/actions/friend-links";
import { FriendsHeroDoodle } from "@/components/admin/friends-hero-doodle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Pencil, Plus, Users } from "lucide-react";
import Link from "next/link";
import { DeleteFriendButton } from "./delete-button";

export const dynamic = 'force-dynamic';

export default async function AdminFriendsPage() {
    const { data } = await getFriendLinks();
    const links = data as any[]; // Quick fix for type inference to avoid build fail

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative w-full bg-white border-4 border-black rounded-3xl overflow-hidden shadow-neo mb-10 min-h-[300px] md:min-h-[340px] flex flex-col md:flex-row group">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}
                />

                {/* Left: Text Content */}
                <div className="relative z-20 flex-1 p-10 md:p-16 flex flex-col justify-center items-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-bold rounded-full mb-4">
                        <Users className="w-3 h-3" />
                        <span>NETWORK MANAGER</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4 drop-shadow-sm">
                        Friend
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] to-[#F97316] [-webkit-text-stroke:2px_black]">
                            Connections
                        </span>
                    </h1>

                    <p className="font-bold text-black/60 md:text-lg max-w-md mb-6">
                        管理您的友情链接与社交网络，构建独特的博客朋友圈。
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/friends/new"
                            className="flex items-center gap-2 bg-[#FACC15] text-black px-6 py-3 rounded-xl border-2 border-black shadow-neo font-black hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            <span>ADD FRIEND</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-2 text-xs font-bold opacity-50">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            {links?.length || 0} LINKS ACTIVE
                        </div>
                    </div>
                </div>

                {/* Right: Visuals (Doodle) */}
                <div className="absolute inset-0 md:static md:w-1/2 overflow-visible md:overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent md:hidden z-10" />
                    <div className="absolute right-[-10%] md:right-0 top-0 bottom-0 w-full md:w-full flex items-center justify-center md:justify-end md:pr-[10%] transform scale-90 md:scale-100 origin-center">
                        <FriendsHeroDoodle />
                    </div>
                </div>
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
                                <Button variant="outline" className="w-full border-2 border-black font-bold hover:bg-yellow-100 cursor-pointer">
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
