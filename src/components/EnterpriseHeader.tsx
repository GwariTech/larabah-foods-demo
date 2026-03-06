import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';

export default function EnterpriseHeader() {
    const [notifOpen, setNotifOpen] = useState(false);

    // Simulated stream of notifications
    const mockNotifs = [
        { id: 1, text: 'Tractor T-42 requires immediate refueling.', time: '2m ago', type: 'warning' },
        { id: 2, text: 'Water Batch #2099 Cleared QA Inspection.', time: '15m ago', type: 'success' },
        { id: 3, text: 'New HR Policy uploaded by Admin.', time: '1h ago', type: 'info' }
    ];

    return (
        <header className="w-full h-16 bg-ui-card border-b border-ui-border flex items-center justify-between px-6 sticky top-0 z-10 transition-colors duration-500">
            <div className="flex items-center gap-4 flex-1">
                {/* Simulated Cmd+K Search trigger placeholder */}
                <button
                    onClick={() => window.dispatchEvent(new Event('open_command_palette'))}
                    className="flex items-center gap-3 px-4 py-2 bg-ui-surface border border-ui-border rounded-lg text-ui-muted hover:text-ui-text transition-colors w-64 justify-between group"
                >
                    <div className="flex items-center gap-2">
                        <LucideIcons.Search className="w-4 h-4" />
                        <span className="text-sm font-medium">Search Enterprise...</span>
                    </div>
                    <kbd className="hidden group-hover:block text-xs font-mono bg-ui-card border border-ui-border px-1.5 rounded text-ui-text shadow-sm">⌘K</kbd>
                </button>
            </div>

            <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <div className="relative">
                    <button
                        onClick={() => setNotifOpen(!notifOpen)}
                        className="p-2 relative text-ui-muted hover:text-ui-text transition-colors rounded-full hover:bg-ui-surface"
                    >
                        <LucideIcons.Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-ui-card shadow-sm"></span>
                    </button>

                    {/* Dropdown Panel */}
                    {notifOpen && (
                        <div className="absolute right-0 mt-3 w-80 bg-ui-card border border-ui-border rounded-xl shadow-2xl overflow-hidden animate-fade-in-up z-50">
                            <div className="p-4 border-b border-ui-border bg-ui-surface flex justify-between items-center">
                                <h4 className="font-bold text-sm text-ui-text">Live Alerts</h4>
                                <span className="text-xs bg-brand-secondary/20 text-brand-secondary px-2 py-0.5 rounded-full font-bold">3 New</span>
                            </div>
                            <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                {mockNotifs.map(n => (
                                    <div key={n.id} className="p-4 border-b border-ui-border hover:bg-ui-surface transition-colors cursor-pointer flex gap-3 group">
                                        <div className="shrink-0 mt-0.5">
                                            {n.type === 'warning' && <LucideIcons.AlertTriangle className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />}
                                            {n.type === 'success' && <LucideIcons.CheckCircle className="w-4 h-4 text-brand-secondary group-hover:scale-110 transition-transform" />}
                                            {n.type === 'info' && <LucideIcons.Info className="w-4 h-4 text-ui-muted group-hover:scale-110 transition-transform" />}
                                        </div>
                                        <div>
                                            <p className="text-sm text-ui-text font-medium leading-snug">{n.text}</p>
                                            <p className="text-xs text-ui-muted mt-1">{n.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 text-center border-t border-ui-border hover:bg-ui-surface transition-colors cursor-pointer">
                                <button className="text-xs font-bold text-brand-secondary">Mark all as read</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* User quick actions */}
                <div className="h-8 w-px bg-ui-border mx-2"></div>
                <button className="text-ui-muted hover:text-ui-text transition-colors">
                    <LucideIcons.Settings className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
}
