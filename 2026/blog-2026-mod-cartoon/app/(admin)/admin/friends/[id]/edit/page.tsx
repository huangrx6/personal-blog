import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { FriendForm } from "../../friend-form";

export default async function EditFriendPage({ params }: { params: { id: string } }) {
    // Await params if needed in Next.js 15, but usually ok in 14. 
    // Wait, recent Next versions require awaiting params.
    const { id } = await params;

    // Fetch data directly in server component
    const friend = await prisma.friendLink.findUnique({
        where: { id }
    });

    if (!friend) {
        notFound();
    }

    return <FriendForm initialData={friend} isEdit />;
}
