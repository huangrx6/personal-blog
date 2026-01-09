import { FloatingShapes } from "@/components/ui/floating-shapes"
import { Image as ImageIcon, Upload, Trash2, Maximize2 } from "lucide-react"

export default function MediaPage() {
    return (
        <div className="space-y-8 relative min-h-[80vh]">
            <FloatingShapes />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl lg:text-5xl font-black font-cartoon tracking-wide mb-2">媒体库</h1>
                    <p className="text-black/60 font-medium">管理博客图片和文件资源。</p>
                </div>

                <button className="group flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl font-bold shadow-neo hover:bg-primary hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                    <Upload className="w-5 h-5" />
                    <span>上传图片</span>
                </button>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* Image Item Mockups */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item} className="group relative aspect-square bg-gray-100 rounded-2xl overflow-hidden border-2 border-black/10 hover:border-black transition-all cursor-pointer">
                        {/* Mock Image Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center text-black/20 font-bold bg-white">
                            <ImageIcon className="w-8 h-8 opacity-20" />
                        </div>

                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                            <button className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors">
                                <Maximize2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-white rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination or Load More */}
            <div className="flex justify-center mt-12 pb-12">
                <button className="px-8 py-3 bg-white border-2 border-black rounded-xl font-bold shadow-neo-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    加载更多
                </button>
            </div>
        </div>
    )
}
