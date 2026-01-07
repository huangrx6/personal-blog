import { auth, signOut } from "@/auth"
import { FileText, LayoutDashboard, LogOut, PlusCircle } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Welcome, {session.user?.name || 'Admin'}</p>
                </div>
                <nav className="mt-6">
                    <Link href="/admin" className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link href="/admin/posts" className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FileText className="w-5 h-5 mr-3" />
                        All Posts
                    </Link>
                    <Link href="/admin/posts/new" className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <PlusCircle className="w-5 h-5 mr-3" />
                        New Post
                    </Link>
                </nav>
                <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200 dark:border-gray-700">
                    <form
                        action={async () => {
                            "use server"
                            await signOut()
                        }}
                    >
                        <button className="flex items-center text-red-600 hover:text-red-800">
                            <LogOut className="w-5 h-5 mr-3" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    )
}
