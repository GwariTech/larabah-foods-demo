import React from 'react';
import { useDesignSystem, ThemeType } from '../context/DesignSystemContext';
import { Monitor, Tablet, Smartphone, Check, Palette } from 'lucide-react';

const themes: { id: ThemeType; name: string; desc: string }[] = [
    { id: 'theme-modern', name: 'Modern Default', desc: 'Clean, light, standard view' },
    { id: 'theme-professional', name: 'Corporate Pro', desc: 'Navy blue, high contrast dark' },
    { id: 'theme-glassmorphism', name: 'Glassmorphism', desc: 'Translucent panels, animated background' },
    { id: 'theme-neobrutalism', name: 'Neo-Brutalism', desc: 'Harsh borders, high contrast shadows' },
    { id: 'theme-minimalist', name: 'Minimalist Clean', desc: 'Excessive whitespace, no borders' },
    { id: 'theme-highcontrast', name: 'High Contrast', desc: 'Black background, white text for accessibility' },
    { id: 'theme-dashboard', name: 'Dense Data', desc: 'Dark gray, compressed spacing' },
    { id: 'theme-christmas', name: 'Festive (Christmas)', desc: 'Snowy backgrounds, red accents' },
    { id: 'theme-ramadan', name: 'Festive (Ramadan)', desc: 'Twilight blue base, gold accents' },
];

export default function SystemSettingsView() {
    const { themeConfig, setThemeConfig } = useDesignSystem();

    const updateConfig = (device: 'mobile' | 'tablet' | 'desktop', themeId: ThemeType) => {
        setThemeConfig({
            ...themeConfig,
            [device]: themeId
        });
    };

    const renderDeviceColumn = (device: 'mobile' | 'tablet' | 'desktop', title: string, icon: React.ReactNode) => (
        <div className="bg-ui-card border border-ui-border rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 border-b border-ui-border bg-ui-surface flex items-center justify-between">
                <div className="flex items-center gap-2 text-ui-text font-bold">
                    {icon}
                    <h3>{title}</h3>
                </div>
                <span className="text-xs uppercase tracking-wider font-bold text-brand-secondary bg-brand-secondary/10 px-2 py-1 rounded">
                    Active
                </span>
            </div>
            <div className="p-4 space-y-2 flex-1 overflow-y-auto custom-scrollbar">
                {themes.map((theme) => {
                    const isSelected = themeConfig[device] === theme.id;
                    return (
                        <button
                            key={theme.id}
                            onClick={() => updateConfig(device, theme.id)}
                            className={`w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-start gap-3 ${isSelected
                                    ? 'bg-brand-secondary/10 border-brand-secondary ring-1 ring-brand-secondary shadow-md'
                                    : 'bg-ui-surface border-ui-border hover:border-ui-text/30 hover:bg-ui-card'
                                }`}
                        >
                            <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'bg-brand-secondary border-brand-secondary' : 'border-ui-muted bg-transparent'}`}>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div>
                                <h4 className={`font-bold text-sm leading-tight mb-1 ${isSelected ? 'text-brand-secondary' : 'text-ui-text'}`}>
                                    {theme.name}
                                </h4>
                                <p className="text-xs text-ui-muted font-medium">{theme.desc}</p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header / Intro */}
            <div className="bg-ui-card border border-ui-border p-6 rounded-2xl shadow-lg flex items-start gap-4">
                <div className="p-3 bg-brand-secondary/10 text-brand-secondary rounded-xl">
                    <Palette className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-ui-text mb-2">Global UI Design Dispatcher</h2>
                    <p className="text-ui-muted text-sm max-w-3xl leading-relaxed">
                        System Administrators can natively assign entirely different design system rules to specific device resolutions.
                        When a user logs in, the platform automatically detects their device and downloads the target layout structural tree coupled with the target CSS styling variables matching your configuration below.
                    </p>
                </div>
            </div>

            {/* Config Grids */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                {renderDeviceColumn('desktop', 'Desktop Viewport', <Monitor className="w-5 h-5" />)}
                {renderDeviceColumn('tablet', 'Tablet Viewport', <Tablet className="w-5 h-5" />)}
                {renderDeviceColumn('mobile', 'Mobile Native Application', <Smartphone className="w-5 h-5" />)}
            </div>
        </div>
    );
}
