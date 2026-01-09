import { create } from 'zustand';

type FontStyleOption = 'system' | 'comic' | 'zcool' | 'mashan' | 'longcang';
type CursorStyleOption = 'blob' | 'sparkle' | 'rainbow' | 'trail';

export interface SettingsState {
    // State
    mouseFollowEnabled: boolean;
    highPerformanceMode: boolean;
    fontStyle: FontStyleOption;
    cursorStyle: CursorStyleOption;
    isLoading: boolean;
    isInitialized: boolean;

    // Actions
    toggleMouseFollow: () => void;
    toggleHighPerformance: () => void;
    setFontStyle: (font: FontStyleOption) => void;

    // API Sync
    fetchSettings: () => Promise<void>;
    saveSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
    // Default state
    mouseFollowEnabled: true,
    highPerformanceMode: false,
    fontStyle: 'system',
    cursorStyle: 'blob',
    isLoading: true,
    isInitialized: false,

    // Actions (update local state + trigger save)
    toggleMouseFollow: () => {
        set((state) => ({ mouseFollowEnabled: !state.mouseFollowEnabled }));
        get().saveSettings();
    },
    toggleHighPerformance: () => {
        set((state) => ({ highPerformanceMode: !state.highPerformanceMode }));
        get().saveSettings();
    },
    setFontStyle: (font) => {
        set({ fontStyle: font });
        get().saveSettings();
    },

    // Fetch settings from API
    fetchSettings: async () => {
        try {
            set({ isLoading: true });
            const response = await fetch('/api/settings');
            if (!response.ok) throw new Error('Failed to fetch settings');

            const data = await response.json();
            set({
                mouseFollowEnabled: data.mouseFollowEnabled,
                highPerformanceMode: data.highPerformanceMode,
                fontStyle: data.fontStyle as FontStyleOption,
                cursorStyle: (data.cursorStyle as CursorStyleOption) || 'blob',
                isLoading: false,
                isInitialized: true,
            });
        } catch (error) {
            console.error('Failed to fetch settings:', error);
            set({ isLoading: false, isInitialized: true });
        }
    },

    // Save settings to API
    saveSettings: async () => {
        const state = get();
        try {
            await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fontStyle: state.fontStyle,
                    mouseFollowEnabled: state.mouseFollowEnabled,
                    highPerformanceMode: state.highPerformanceMode,
                    cursorStyle: state.cursorStyle,
                }),
            });
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    },
}));
