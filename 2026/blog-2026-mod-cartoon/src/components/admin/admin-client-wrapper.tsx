"use client";

import { ConfirmDialogProvider } from "@/components/ui/confirm-dialog";
import { ReactNode } from "react";
import { AdminActionProvider } from "./admin-action-context";
import { AdminDock } from "./admin-dock";

interface AdminClientWrapperProps {
    children: ReactNode;
}

export function AdminClientWrapper({ children }: AdminClientWrapperProps) {
    return (
        <AdminActionProvider>
            <ConfirmDialogProvider>
                {children}
                <AdminDock />
            </ConfirmDialogProvider>
        </AdminActionProvider>
    );
}
