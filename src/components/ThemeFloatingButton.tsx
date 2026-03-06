import React, { useState } from 'react';
import { useDesignSystem, ThemeType } from '../context/DesignSystemContext';
import { Settings2, X, Monitor, Tablet, Smartphone, Palette } from 'lucide-react';

const themes: { id: ThemeType; name: string }[] = [
    { id: 'theme-modern', name: 'Modern Default' },
    { id: 'theme-professional', name: 'Corporate Pro' },
    { id: 'theme-glassmorphism', name: 'Glassmorphism' },
    { id: 'theme-neobrutalism', name: 'Neo-Brutalism' },
    { id: 'theme-minimalist', name: 'Clean Minimalist' },
    { id: 'theme-highcontrast', name: 'High Contrast' },
    { id: 'theme-dashboard', name: 'Dense Data' },
    { id: 'theme-christmas', name: 'Festive (Christmas)' },
    { id: 'theme-ramadan', name: 'Festive (Ramadan)' },
];

export default function ThemeFloatingButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { activeTheme, forceOverrideTheme, device } = useDesignSystem();

    return (
        <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-4 animate-fade-in-up">
            {/* Expanded Menu */}
            {isOpen && (
                <div className="bg-ui-card border border-ui-border shadow-2xl rounded-2xl p-4 w-72 backdrop-blur-md transition-all duration-300 transform origin-bottom-left">
                    <div className="flex justify-between items-center mb-4 border-b border-ui-border pb-2">
                        <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4 text-brand-secondary" />
                            <h3 className="font-bold text-sm text-ui-text">Design System</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-ui-muted hover:text-ui-text transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="mb-4">
                        <p className="text-xs text-ui-muted mb-2 flex items-center gap-1 font-medium">
                            {device === 'desktop' ? <Monitor className="w-3 h-3" /> : device === 'tablet' ? <Tablet className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                            Current Target Viewport: <span className="uppercase text-brand-secondary">{device}</span>
                        </p>
                    </div>

                    <div className="space-y-1.5 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                        {themes.map((theme) => (
                            <button
                                key={theme.id}
                                onClick={() => forceOverrideTheme(theme.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${activeTheme === theme.id
                                        ? 'bg-brand-secondary/10 border-brand-secondary text-brand-secondary'
                                        : 'bg-ui-surface border-transparent text-ui-text hover:bg-ui-border'
                                    }`}
                            >
                                {theme.name}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => forceOverrideTheme(null)}
                        className="mt-3 w-full text-center text-xs text-ui-muted hover:text-ui-text underline"
                    >
                        Reset to Admin Default
                    </button>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 border-2 ${isOpen
                        ? 'bg-ui-surface border-ui-border text-ui-text scale-95'
                        : 'bg-brand-primary border-brand-secondary text-white hover:scale-110 hover:shadow-brand-secondary/30 hover:bg-brand-secondary'
                    }`}
                title="Toggle Theme Switcher"
            >
                {isOpen ? <X className="w-5 h-5" /> : <Settings2 className="w-6 h-6" />}
            </button>
        </div>
    );
}
