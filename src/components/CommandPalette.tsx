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

const [recentSearches, setRecentSearches] = useState<typeof mockSearchData>(() => {
    const saved = localStorage.getItem('larabah_recent_searches');
    return saved ? JSON.parse(saved) : [];
});
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

const addToRecent = (item: typeof mockSearchData[0]) => {
    const updated = [item, ...recentSearches.filter(i => i.id !== item.id)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('larabah_recent_searches', JSON.stringify(updated));
};

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
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 sm:px-6">
        {/* Ultra-Blur Backdrop */}
        <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-500"
            onClick={() => setIsOpen(false)}
        ></div>

        {/* Premium Command Palette Terminal */}
        <div className="relative bg-ui-card w-full max-w-2xl rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.4)] border border-ui-border/50 overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col max-h-[70vh]">

            {/* Search Input Bar */}
            <div className="flex items-center px-6 py-5 border-b border-ui-border bg-ui-surface/30 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mr-4">
                    <LucideIcons.Search className="w-6 h-6 text-brand-secondary" />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type to search enterprise data..."
                    className="w-full bg-transparent border-none text-ui-text text-xl placeholder-ui-muted/50 outline-none font-medium"
                />
                <div className="flex items-center gap-2">
                    <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-[10px] font-mono font-black text-ui-muted bg-ui-bg border border-ui-border rounded-lg shadow-sm">ESC</kbd>
                </div>
            </div>

            {/* Results Area */}
            <div className="overflow-y-auto custom-scrollbar p-3 flex-1 bg-ui-card/50">
                {query.length === 0 && recentSearches.length > 0 && (
                    <div className="mb-6">
                        <div className="px-4 pt-2 pb-2 text-[10px] font-black text-ui-muted uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
                            <LucideIcons.History className="w-3 h-3" /> Recent Queries
                        </div>
                        <div className="space-y-1">
                            {recentSearches.map(item => (
                                <button
                                    key={`recent-${item.id}`}
                                    onClick={() => {
                                        navigate(item.route);
                                        setIsOpen(false);
                                    }}
                                    className="w-full flex items-center gap-4 px-4 py-3 text-left rounded-2xl hover:bg-brand-secondary/10 hover:shadow-inner transition-all group border border-transparent hover:border-brand-secondary/20"
                                >
                                    <div className="text-ui-muted group-hover:text-brand-secondary transition-colors">
                                        {renderIcon(item.icon)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-ui-text text-sm group-hover:text-brand-secondary transition-colors">{item.title}</h4>
                                    </div>
                                    <LucideIcons.CornerDownLeft className="w-4 h-4 text-ui-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {filteredData.length > 0 ? (
                    <div className="space-y-1">
                        <div className="px-4 pt-2 pb-2 text-[10px] font-black text-ui-muted uppercase tracking-[0.2em] mb-1">
                            {query.length > 0 ? `Search Results (${filteredData.length})` : 'Suggested Commands'}
                        </div>
                        {filteredData.map(item => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    addToRecent(item);
                                    navigate(item.route);
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-4 px-4 py-4 text-left rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-ui-border/50"
                            >
                                <div className="w-12 h-12 rounded-xl bg-ui-surface flex items-center justify-center border border-ui-border group-hover:bg-brand-secondary/20 group-hover:border-brand-secondary/50 transition-all text-ui-muted group-hover:text-brand-secondary group-hover:shadow-[0_0_15px_rgba(139,197,63,0.1)]">
                                    {renderIcon(item.icon)}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-ui-text group-hover:text-brand-secondary truncate transition-colors">{item.title}</h4>
                                        <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-ui-surface border border-ui-border text-ui-muted group-hover:border-brand-secondary/30">
                                            {item.type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-ui-muted truncate mt-1 opacity-70">{item.subtitle}</p>
                                </div>
                                <div className="text-[10px] font-black text-brand-secondary opacity-0 group-hover:opacity-100 uppercase tracking-tighter flex items-center gap-1">
                                    Open <LucideIcons.ArrowUpRight className="w-3 h-3 translate-y-px" />
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center text-ui-muted flex flex-col items-center justify-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-ui-surface flex items-center justify-center border-2 border-dashed border-ui-border">
                            <LucideIcons.SearchX className="w-8 h-8 opacity-30" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-ui-text">No matches found for "{query}"</p>
                            <p className="text-xs mt-1 opacity-50">Try searching for people, assets, or facilities.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer status */}
            <div className="px-6 py-4 border-t border-ui-border bg-ui-surface/50 flex justify-between items-center text-[10px] text-ui-muted font-bold tracking-widest uppercase">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse"></div> Enterprise Mesh: Online</span>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5"><LucideIcons.ArrowUp className="w-3 h-3" /><LucideIcons.ArrowDown className="w-3 h-3" /> Navigate</span>
                    <span className="flex items-center gap-1.5"><LucideIcons.CornerDownLeft className="w-3 h-3" /> Select</span>
                </div>
            </div>
        </div>
    </div>

            </div >
        </div >
    );
}
