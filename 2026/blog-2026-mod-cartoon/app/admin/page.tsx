import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
    const postCount = await prisma.post.count()
    const publishedCount = await prisma.post.count({ where: { published: true } })

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Dashboard</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Posts Card */}
                <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Posts</h3>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{postCount}</div>
                </div>

                {/* Published Posts Card */}
                <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Published</h3>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{publishedCount}</div>
                </div>
            </div>
        </div>
    )
}
