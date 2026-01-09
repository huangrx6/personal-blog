"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationContextType {
    navigateTo: (href: string) => void;
    isNavigating: boolean;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function useNavigation() {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error("useNavigation must be used within NavigationProvider");
    }
    return context;
}

interface NavigationProviderProps {
    children: ReactNode;
    minLoadingTime?: number;
}

export function NavigationProvider({
    children,
    minLoadingTime = 1500
}: NavigationProviderProps) {
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);

    const navigateTo = useCallback((href: string) => {
        setIsNavigating(true);

        // Wait for minimum loading time, then navigate
        setTimeout(() => {
            router.push(href);
            // Keep loading visible during navigation
            setTimeout(() => {
                setIsNavigating(false);
            }, 300);
        }, minLoadingTime);
    }, [router, minLoadingTime]);

    return (
        <NavigationContext.Provider value={{ navigateTo, isNavigating }}>
            {children}

            {/* Loading Overlay */}
            <AnimatePresence>
                {isNavigating && (
                    <motion.div
                        className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center gap-8"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    >
                        {/* Bouncing Shape */}
                        <motion.div
                            className="w-20 h-20 bg-primary border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            animate={{
                                y: [-15, 0, -15],
                                rotate: [0, 180, 360],
                                borderRadius: ["50%", "20%", "50%"],
                                scale: [0.9, 1.1, 0.9]
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Loading Text */}
                        <motion.h2
                            className="text-4xl font-cartoon tracking-wider uppercase text-black"
                        >
                            Loading...
                        </motion.h2>
                    </motion.div>
                )}
            </AnimatePresence>
        </NavigationContext.Provider>
    );
}
