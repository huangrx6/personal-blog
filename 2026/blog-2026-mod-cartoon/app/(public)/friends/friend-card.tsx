"use client";

import ProfileCard from "@/components/ui/profile-card";
import { motion } from "framer-motion";

interface FriendCardProps {
    link: {
        id: string;
        name: string;
        description: string | null;
        avatar: string | null;
        url: string;
        style: string;
    };
    index: number;
}

export function FriendCard({ link, index }: FriendCardProps) {
    // Deterministic random rotation based on index
    const rotation = (index % 2 === 0 ? 1 : -1) * ((index * 7) % 3 + 1);

    const handleVisit = () => {
        window.open(link.url, "_blank", "noopener,noreferrer");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="w-full h-full min-h-[420px]"
        >
            <ProfileCard
                name={link.name}
                title={link.description || "Friend of the Blog"}
                handle={`friend-${index + 1}`}
                status="Connected"
                avatarUrl={link.avatar || ""}
                contactText="Visit Site"
                onContactClick={handleVisit}
                showUserInfo={true}
                enableTilt={true}
                behindGlowEnabled={true}
                // Premium Dark Gradients (No Blue)
                innerGradient={index % 3 === 0
                    ? 'linear-gradient(135deg, rgba(20,20,20,0.4) 0%, rgba(0,0,0,0.8) 100%)' // Obsidian
                    : index % 3 === 1
                        ? 'linear-gradient(135deg, rgba(35,30,40,0.4) 0%, rgba(10,10,15,0.8) 100%)' // Deep Violet Black
                        : 'linear-gradient(135deg, rgba(30,40,40,0.4) 0%, rgba(10,20,20,0.8) 100%)' // Deep Forest Black
                }
            />
        </motion.div>
    );
}
