"use client";

import { ReactNode } from "react";
import { AdminDock } from "./admin-dock";
import { ConfirmDialogProvider } from "@/components/ui/confirm-dialog";

interface AdminClientWrapperProps {
    children: ReactNode;
}

export function AdminClientWrapper({ children }: AdminClientWrapperProps) {
    return (
        <ConfirmDialogProvider>
            {children}
            <AdminDock />
        </ConfirmDialogProvider>
    );
}
