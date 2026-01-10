import { getFriendLinks } from "@/actions/friend-links";
import { FriendsView } from "./friends-view";

interface FriendLink {
    id: string;
    name: string;
    description: string | null;
    avatar: string | null;
    url: string;
    active: boolean;
    style: string;
}

export const revalidate = 0;

export default async function FriendsPage() {
    const { data: links } = await getFriendLinks();
    const activeLinks = (links as FriendLink[])?.filter((l) => l.active) || [];

    return <FriendsView links={activeLinks} />;
}
