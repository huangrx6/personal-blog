"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface AdminActionContextType {
    actions: ReactNode | null;
    setActions: (actions: ReactNode | null) => void;
}

const AdminActionContext = createContext<AdminActionContextType | undefined>(undefined);

export function AdminActionProvider({ children }: { children: ReactNode }) {
    const [actions, setActions] = useState<ReactNode | null>(null);

    return (
        <AdminActionContext.Provider value={{ actions, setActions }}>
            {children}
        </AdminActionContext.Provider>
    );
}

export function useAdminActions() {
    const context = useContext(AdminActionContext);
    if (!context) {
        throw new Error("useAdminActions must be used within an AdminActionProvider");
    }
    return context;
}
