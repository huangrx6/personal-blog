"use client"

import { ArrowLeft, ArrowRight } from "lucide-react";

interface NeoPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function NeoPagination({ currentPage, totalPages, onPageChange, className = "" }: NeoPaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Logic to show a window of pages can be added if totalPages is large,
    // but for now, simple implementation.
    // If totalPages > 7, we might want to show ellipses, but let's start simple.

    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border-2 border-black font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-all shadow-neo-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                aria-label="Previous Page"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
                {pages.map((page) => {
                    // Simple logic to hide pages if too many: 
                    // always show first, last, current, and neighbors.
                    if (
                        totalPages > 7 &&
                        page !== 1 &&
                        page !== totalPages &&
                        (page < currentPage - 1 || page > currentPage + 1)
                    ) {
                        if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} className="font-black text-black/20">...</span>
                        }
                        return null;
                    }

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 rounded-lg border-2 font-black transition-all shadow-neo-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 ${currentPage === page
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-black border-black hover:bg-yellow-400"
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border-2 border-black font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-all shadow-neo-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                aria-label="Next Page"
            >
                <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    );
}
