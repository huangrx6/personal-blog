"use client";

import { useEffect, useState } from "react";
import CursorEffect, { CursorStyle } from "@/components/ui/cursor-effect";
import { useSettingsStore } from "@/lib/store/settings-store";

export default function GlobalFeatures() {
    const mouseFollowEnabled = useSettingsStore((state) => state.mouseFollowEnabled);
    const fontStyle = useSettingsStore((state) => state.fontStyle);
    const isInitialized = useSettingsStore((state) => state.isInitialized);
    const fetchSettings = useSettingsStore((state) => state.fetchSettings);

    // Local state for cursor style from API
    const [cursorStyle, setCursorStyle] = useState<CursorStyle>("blob");

    // Hydration safety
    const [mounted, setMounted] = useState(false);

    // Fetch settings from DB on mount
    useEffect(() => {
        setMounted(true);
        fetchSettings();

        // Also fetch cursor style directly from API
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data.cursorStyle) {
                    setCursorStyle(data.cursorStyle as CursorStyle);
                }
            })
            .catch(console.error);
    }, [fetchSettings]);

    // Apply font preference to body when settings change
    useEffect(() => {
        if (mounted && isInitialized) {
            document.body.setAttribute('data-font-style', fontStyle);
        }
    }, [fontStyle, mounted, isInitialized]);

    // Don't render cursor until mounted and initialized
    if (!mounted || !isInitialized) return null;

    return mouseFollowEnabled ? <CursorEffect style={cursorStyle} /> : null;
}
