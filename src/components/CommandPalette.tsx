import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const mockSearchData = [
    { id: 1, type: 'Employee', title: 'Abdulbaki Ebbo', subtitle: 'CEO, Larabah Foods', icon: 'User', route: '/role/1/page/1' },
    { id: 2, type: 'Machinery', title: 'Tractor T-42 (Deere)', subtitle: 'Status: Active | Farms SEC-A', icon: 'Tractor', route: '/role/2/page/1' },
    { id: 3, type: 'Crop', title: 'Premium Parboiled Rice', subtitle: 'Yield: 450 Tons | Harvested', icon: 'Wheat', route: '/role/2/page/3' },
    { id: 4, type: 'Water Batch', title: 'Batch #2099 - 19L Refill', subtitle: 'QA Cleared | Dispatch Ready', icon: 'Droplets', route: '/role/3/page/1' },
    { id: 5, type: 'Employee', title: 'Sarah Jenkins', subtitle: 'Quality Assurance Lead, Water', icon: 'UserCircle', route: '/role/3/page/3' },
    { id: 6, type: 'Facility', title: 'Water Purification Plant Alpha', subtitle: 'Running: 98% Efficiency', icon: 'Factory', route: '/role/3/page/1' },
    { id: 7, type: 'Report', title: 'Q3 Enterprise Financials', subtitle: 'Consolidated P&L generated yesterday', icon: 'FileText', route: '/role/1/page/1' },
];

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        const handleCustomEvent = () => setIsOpen(true);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('open_command_palette', handleCustomEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open_command_palette', handleCustomEvent);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        } else {
            setQuery(''); // reset on close
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredData = mockSearchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
    );

    const renderIcon = (iconName: string) => {
        const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
        if (!IconComponent) return <LucideIcons.Search className="w-5 h-5" />;
        return <IconComponent className="w-5 h-5" />;
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4 sm:px-6">
            {/* Backdrop Blur Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Command Palette Terminal */}
            <div className="relative bg-ui-card w-full max-w-2xl rounded-2xl shadow-2xl border border-ui-border overflow-hidden animate-fade-in-up flex flex-col max-h-[60vh]">

                {/* Search Input Bar */}
                <div className="flex items-center px-4 py-4 border-b border-ui-border bg-ui-surface">
                    <LucideIcons.Search className="w-6 h-6 text-ui-muted shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search employees, machinery, reports, or crops..."
                        className="w-full bg-transparent border-none text-ui-text text-lg focus:ring-0 px-4 placeholder-ui-muted outline-none"
                    />
                    <kbd className="hidden sm:inline-block px-2 text-xs font-mono font-bold text-ui-muted bg-ui-bg border border-ui-border rounded shrink-0">ESC</kbd>
                </div>

                {/* Results Area */}
                <div className="overflow-y-auto custom-scrollbar p-2 flex-1">
                    {filteredData.length > 0 ? (
                        <div className="space-y-1">
                            {/* Grouping mock logic just visually */}
                            <div className="px-3 pt-2 pb-1 text-xs font-semibold text-ui-muted uppercase tracking-wider">
                                Suggestions
                            </div>
                            {filteredData.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        navigate(item.route);
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center gap-4 px-4 py-3 text-left rounded-xl hover:bg-brand-secondary/10 hover:text-brand-secondary transition-all group"
                                >
                                    <div className="bg-ui-surface p-2 rounded-lg border border-ui-border group-hover:bg-brand-secondary/20 group-hover:border-brand-secondary/50 transition-colors text-ui-muted group-hover:text-brand-secondary">
                                        {renderIcon(item.icon)}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <h4 className="font-bold text-ui-text group-hover:text-brand-secondary truncate transition-colors">{item.title}</h4>
                                        <p className="text-xs text-ui-muted truncate mt-0.5">{item.subtitle}</p>
                                    </div>
                                    <div className="text-xs font-medium text-ui-muted bg-ui-surface px-2 py-1 rounded-md border border-ui-border group-hover:border-brand-secondary/30">
                                        {item.type}
                                    </div>
                                    <LucideIcons.ArrowRight className="w-4 h-4 text-brand-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center text-ui-muted flex flex-col items-center justify-center gap-3">
                            <LucideIcons.SearchX className="w-12 h-12 opacity-50" />
                            <p className="text-sm font-medium">No results found for "{query}"</p>
                        </div>
                    )}
                </div>

                {/* Footer status */}
                <div className="px-4 py-3 border-t border-ui-border bg-ui-surface flex justify-between items-center text-xs text-ui-muted font-medium">
                    <span className="flex items-center gap-1"><LucideIcons.Radio className="w-3 h-3 text-brand-secondary animate-pulse" /> Live Enterprise Database</span>
                    <span className="flex items-center gap-1">Use <kbd className="px-1 font-mono border border-ui-border rounded bg-ui-bg">↑</kbd> <kbd className="px-1 font-mono border border-ui-border rounded bg-ui-bg">↓</kbd> to navigate</span>
                </div>
            </div>
        </div>
    );
}
