import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center font-mono relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            <h1 className="text-[12rem] md:text-[20rem] font-black text-white/5 select-none leading-none tracking-tighter mix-blend-difference">
                404
            </h1>

            <div className="space-y-6 relative z-10 -mt-12 md:-mt-24">
                <h2 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 uppercase tracking-tight skew-x-[-10deg] animate-pulse">
                    Signal Lost
                </h2>
                <p className="text-white/50 max-w-md mx-auto text-sm md:text-base tracking-widest border-l-2 border-red-500/50 pl-4 text-left">
                    WARNING: The coordinates you requested are outside the known universe.<br />
                    <span className="text-red-500/80 font-bold">// ERR_VECTOR_NOT_FOUND</span>
                </p>
                <div className="pt-12">
                    <Link href="/" className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 hover:border-white text-white font-bold tracking-[0.3em] text-xs uppercase transition-all overflow-hidden">
                        <span className="relative z-10 group-hover:text-black transition-colors">Return to Base</span>
                        <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
