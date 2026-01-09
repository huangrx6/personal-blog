"use client";

import { useState, useCallback, createContext, useContext, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";

interface ConfirmDialogOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning" | "info";
    icon?: ReactNode;
}

interface ConfirmDialogContextType {
    confirm: (options: ConfirmDialogOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | null>(null);

export function useConfirmDialog() {
    const context = useContext(ConfirmDialogContext);
    if (!context) {
        throw new Error("useConfirmDialog must be used within ConfirmDialogProvider");
    }
    return context;
}

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmDialogOptions | null>(null);
    const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);
    const [isConfirming, setIsConfirming] = useState(false);

    const confirm = useCallback((opts: ConfirmDialogOptions): Promise<boolean> => {
        setOptions(opts);
        setIsOpen(true);
        return new Promise((resolve) => {
            setResolvePromise(() => resolve);
        });
    }, []);

    const handleConfirm = async () => {
        setIsConfirming(true);
        // Small delay for visual feedback
        await new Promise(r => setTimeout(r, 200));
        setIsOpen(false);
        setIsConfirming(false);
        resolvePromise?.(true);
    };

    const handleCancel = () => {
        setIsOpen(false);
        resolvePromise?.(false);
    };

    const variantStyles = {
        danger: {
            iconBg: "bg-red-100",
            iconColor: "text-red-500",
            confirmBg: "bg-red-500 hover:bg-red-600",
            border: "border-red-400",
        },
        warning: {
            iconBg: "bg-accent/20",
            iconColor: "text-accent",
            confirmBg: "bg-accent hover:bg-accent/90",
            border: "border-accent",
        },
        info: {
            iconBg: "bg-primary/20",
            iconColor: "text-primary",
            confirmBg: "bg-primary hover:bg-primary/90",
            border: "border-primary",
        },
    };

    const variant = options?.variant || "danger";
    const styles = variantStyles[variant];

    return (
        <ConfirmDialogContext.Provider value={{ confirm }}>
            {children}
            {typeof window !== "undefined" && createPortal(
                <AnimatePresence>
                    {isOpen && options && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                            onClick={handleCancel}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                className={`bg-white border-4 border-black rounded-3xl p-6 w-full max-w-md shadow-neo-lg relative overflow-hidden`}
                            >
                                {/* Decorative corner */}
                                <div className={`absolute -top-10 -right-10 w-32 h-32 ${styles.iconBg} rounded-full opacity-50`}></div>

                                {/* Close button */}
                                <button
                                    onClick={handleCancel}
                                    className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <motion.div
                                        initial={{ rotate: -10 }}
                                        animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className={`w-16 h-16 ${styles.iconBg} rounded-2xl border-2 border-black flex items-center justify-center mb-4 shadow-neo-sm`}
                                    >
                                        {options.icon || (variant === "danger" ? (
                                            <Trash2 className={`w-8 h-8 ${styles.iconColor}`} />
                                        ) : (
                                            <AlertTriangle className={`w-8 h-8 ${styles.iconColor}`} />
                                        ))}
                                    </motion.div>

                                    {/* Title */}
                                    <h2 className="text-2xl font-black mb-2">{options.title}</h2>

                                    {/* Message */}
                                    <p className="text-black/60 font-medium mb-6">{options.message}</p>

                                    {/* Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleCancel}
                                            disabled={isConfirming}
                                            className="flex-1 px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold border-2 border-black/10 transition-all disabled:opacity-50"
                                        >
                                            {options.cancelText || "取消"}
                                        </button>
                                        <button
                                            onClick={handleConfirm}
                                            disabled={isConfirming}
                                            className={`flex-1 px-5 py-3 ${styles.confirmBg} text-white rounded-xl font-bold border-2 border-black shadow-neo hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2`}
                                        >
                                            {isConfirming ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                options.confirmText || "确认"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </ConfirmDialogContext.Provider>
    );
}
