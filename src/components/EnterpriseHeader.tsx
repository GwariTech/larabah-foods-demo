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
            <div className="flex items-center gap-6 flex-1">
                {/* Real-time System Status Pulse */}
                <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-brand-primary/5 border border-ui-border rounded-full group cursor-help transition-all hover:bg-brand-primary/10">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-secondary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-secondary"></span>
                    </span>
                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">Core Sync: Active</span>
                </div>

                {/* Simulated Cmd+K Search trigger placeholder */}
                <button
                    onClick={() => window.dispatchEvent(new Event('open_command_palette'))}
                    className="flex items-center gap-3 px-4 py-2 bg-ui-surface/50 backdrop-blur-sm border border-ui-border rounded-xl text-ui-muted hover:text-ui-text transition-all w-72 justify-between group shadow-sm hover:shadow-md hover:border-brand-secondary/30"
                >
                    <div className="flex items-center gap-2">
                        <LucideIcons.Search className="w-4 h-4 group-hover:text-brand-secondary transition-colors" />
                        <span className="text-sm font-medium opacity-70 group-hover:opacity-100">Quick search...</span>
                    </div>
                    <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono bg-ui-card border border-ui-border px-1.5 py-0.5 rounded text-ui-muted shadow-sm group-hover:text-brand-secondary group-hover:border-brand-secondary/50 transition-all">
                        <span>⌘</span><span>K</span>
                    </kbd>
                </button>
            </div>

            <div className="flex items-center gap-3">
                {/* Notification Bell */}
                <div className="relative">
                    <button
                        onClick={() => setNotifOpen(!notifOpen)}
                        className={`p-2.5 relative transition-all rounded-xl border ${notifOpen ? 'bg-brand-secondary/10 text-brand-secondary border-brand-secondary/30' : 'text-ui-muted hover:text-ui-text hover:bg-ui-surface border-transparent hover:border-ui-border'}`}
                    >
                        <LucideIcons.Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-ui-card shadow-sm"></span>
                    </button>

                    {/* Dropdown Panel */}
                    {notifOpen && (
                        <div className="absolute right-0 mt-4 w-96 bg-ui-card/95 backdrop-blur-xl border border-ui-border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden animate-fade-in-up z-50">
                            <div className="p-5 border-b border-ui-border bg-ui-surface/50 flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-sm text-ui-text tracking-tight">Live Intelligence</h4>
                                    <p className="text-[10px] text-ui-muted uppercase tracking-wider font-bold mt-0.5">Larabah Sync Engine v2.0</p>
                                </div>
                                <span className="text-[10px] bg-brand-secondary text-brand-primary px-2.5 py-1 rounded-full font-black uppercase tracking-tighter">3 New Alerts</span>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                {mockNotifs.map(n => (
                                    <div key={n.id} className="p-5 border-b border-ui-border hover:bg-ui-surface/50 transition-all cursor-pointer flex gap-4 group">
                                        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${n.type === 'warning' ? 'bg-orange-500/10 text-orange-500' :
                                                n.type === 'success' ? 'bg-brand-secondary/10 text-brand-secondary' :
                                                    'bg-blue-500/10 text-blue-500'
                                            }`}>
                                            {n.type === 'warning' && <LucideIcons.AlertTriangle className="w-5 h-5" />}
                                            {n.type === 'success' && <LucideIcons.CheckCircle className="w-5 h-5" />}
                                            {n.type === 'info' && <LucideIcons.Info className="w-5 h-5" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="text-sm text-ui-text font-bold leading-snug truncate">{n.type.toUpperCase()}</p>
                                                <p className="text-[10px] text-ui-muted font-medium ml-2">{n.time}</p>
                                            </div>
                                            <p className="text-xs text-ui-muted leading-relaxed line-clamp-2">{n.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full p-4 text-xs font-bold text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary transition-all bg-ui-surface border-t border-ui-border uppercase tracking-widest">
                                Enter Alert Command Center
                            </button>
                        </div>
                    )}
                </div>

                {/* Productivity Quick Actions */}
                <div className="h-8 w-px bg-ui-border mx-1 opacity-50"></div>
                <div className="flex items-center gap-1.5">
                    <button className="p-2.5 text-ui-muted hover:text-ui-text transition-all rounded-xl hover:bg-ui-surface border border-transparent hover:border-ui-border" title="Enterprise Settings">
                        <LucideIcons.ShieldCheck className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 text-ui-muted hover:text-ui-text transition-all rounded-xl hover:bg-ui-surface border border-transparent hover:border-ui-border" title="Direct Database Access">
                        <LucideIcons.Database className="w-5 h-5" />
                    </button>
                </div>
            </div>

        </header>
    );
}
