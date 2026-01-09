"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
    return (
        <SonnerToaster
            position="bottom-right"
            expand={true}
            richColors
            closeButton
            toastOptions={{
                className: "!border-3 !border-black !rounded-2xl !shadow-neo !font-bold !py-4 !px-5",
                style: {
                    fontFamily: "var(--font-cartoon), system-ui, sans-serif",
                    fontSize: "15px",
                },
                classNames: {
                    toast: "!bg-white",
                    success: "!bg-secondary/10 !text-secondary !border-secondary",
                    error: "!bg-red-50 !text-red-600 !border-red-400",
                    warning: "!bg-accent/20 !text-accent !border-accent",
                    info: "!bg-primary/10 !text-primary !border-primary",
                    closeButton: "!bg-black !text-white !border-black hover:!bg-primary",
                },
            }}
        />
    );
}
