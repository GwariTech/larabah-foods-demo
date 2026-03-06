import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDeviceDetector, DeviceType } from '../hooks/useDeviceDetector';

export type ThemeType =
    | 'theme-modern'
    | 'theme-professional'
    | 'theme-glassmorphism'
    | 'theme-neobrutalism'
    | 'theme-minimalist'
    | 'theme-highcontrast'
    | 'theme-dashboard'
    | 'theme-christmas'
    | 'theme-ramadan';

interface ThemeConfig {
    mobile: ThemeType;
    tablet: ThemeType;
    desktop: ThemeType;
}

interface DesignSystemContextType {
    device: DeviceType;
    activeTheme: ThemeType;
    themeConfig: ThemeConfig;
    setThemeConfig: (config: ThemeConfig) => void;
    forceOverrideTheme: (theme: ThemeType | null) => void;
}

const defaultConfig: ThemeConfig = {
    mobile: 'theme-modern',
    tablet: 'theme-modern',
    desktop: 'theme-modern'
};

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
    const device = useDeviceDetector();

    const [themeConfig, setThemeConfigState] = useState<ThemeConfig>(() => {
        const saved = localStorage.getItem('larabah_theme_config');
        return saved ? JSON.parse(saved) : defaultConfig;
    });

    const [overrideTheme, setOverrideTheme] = useState<ThemeType | null>(null);

    const activeTheme = overrideTheme || themeConfig[device];

    // Effect to apply the root class to the body element
    useEffect(() => {
        const body = document.body;
        // Remove all previous theme classes
        const classes = body.className.split(' ').filter(c => !c.startsWith('theme-'));
        body.className = classes.join(' ').trim();

        // Add new theme class
        body.classList.add(activeTheme);

        // Also tag the device type as a class on body for some general responsive tweaks if needed
        body.classList.remove('device-mobile', 'device-tablet', 'device-desktop');
        body.classList.add(`device-${device}`);

    }, [activeTheme, device]);

    const setThemeConfig = (config: ThemeConfig) => {
        setThemeConfigState(config);
        localStorage.setItem('larabah_theme_config', JSON.stringify(config));
    };

    const forceOverrideTheme = (theme: ThemeType | null) => {
        setOverrideTheme(theme);
    };

    return (
        <DesignSystemContext.Provider value={{
            device,
            activeTheme,
            themeConfig,
            setThemeConfig,
            forceOverrideTheme
        }}>
            {children}
        </DesignSystemContext.Provider>
    );
}

export function useDesignSystem() {
    const context = useContext(DesignSystemContext);
    if (context === undefined) {
        throw new Error('useDesignSystem must be used within a DesignSystemProvider');
    }
    return context;
}
