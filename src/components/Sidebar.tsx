import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { roles, sharedPages, exclusivePages } from '../config';

export default function Sidebar() {
    const { roleId } = useParams();
    const navigate = useNavigate();

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('larabah_theme') || 'light';
    });

    useEffect(() => {
        document.documentElement.className = '';
        if (theme === 'dark') document.documentElement.className = 'theme-dark';
        if (theme === 'night') document.documentElement.className = 'theme-night';
        localStorage.setItem('larabah_theme', theme);
    }, [theme]);

    const currentRoleId = roleId || '1';
    const activeRole = roles.find(r => r.id === currentRoleId);

    const roleSharedPages = sharedPages[currentRoleId as keyof typeof sharedPages] || [];
    const roleExclusivePages = exclusivePages[currentRoleId as keyof typeof exclusivePages] || [];
    const allPages = [...roleSharedPages, ...roleExclusivePages];

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRoleId = e.target.value;
        navigate(`/role/${newRoleId}/page/1`);
    };

    const renderIcon = (iconName: string) => {
        const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
        if (!IconComponent) return <LucideIcons.Circle className="w-5 h-5" />;
        return <IconComponent className="w-5 h-5" />;
    };

    return (
        <>
            <aside className="hidden lg:flex flex-col w-72 bg-brand-bg border-r border-ui-border transition-colors duration-500 fixed h-full z-20">
                {/* Minimalistic Logo Header area */}
                <div className="p-6 border-b border-ui-border flex flex-col gap-4 transition-colors duration-500">
                    <div className="flex justify-center items-center w-full mb-2">
                        <img
                            src="/logo.png"
                            alt="Larabah Foods Logo"
                            className={`h-14 w-auto object-contain drop-shadow-md transition-all duration-500 hover:scale-105 ${theme === 'dark' || theme === 'night' ? 'brightness-110 contrast-125' : ''}`}
                        />
                    </div>
                </div>

                {/* Dynamic Navigation Menus */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">

                    {/* Public Website Highlight Link */}
                    <div>
                        <NavLink
                            to="/website"
                            className={({ isActive }) =>
                                `flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive ? 'bg-brand-secondary text-brand-bg shadow-lg shadow-brand-secondary/20' : 'bg-brand-primary text-white shadow-md hover:bg-brand-primary/90 hover:shadow-lg hover:-translate-y-0.5'}`
                            }
                        >
                            <div className="flex items-center gap-3">
                                <LucideIcons.Globe className="w-5 h-5 text-brand-secondary group-hover:animate-pulse" />
                                <span className="font-bold text-sm tracking-wide">Public Website</span>
                            </div>
                            <LucideIcons.ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </NavLink>
                    </div>

                    {/* Shared Navigation */}
                    <div>
                        <h3 className="px-3 text-[10px] font-bold text-ui-muted uppercase tracking-[0.2em] mb-3 opacity-50">Shared Modules</h3>
                        <nav className="space-y-1.5">
                            {roleSharedPages.map(page => (
                                <NavLink
                                    key={`shared-${page.id}`}
                                    to={`/role/${currentRoleId}/page/${page.id}`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden ${isActive
                                            ? 'text-brand-primary font-bold'
                                            : 'text-ui-muted hover:text-ui-text hover:bg-white/5'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {isActive && (
                                                <div className="absolute inset-0 bg-brand-secondary/90 shadow-[0_0_20px_rgba(139,197,63,0.3)] animate-in fade-in zoom-in-95 duration-300" />
                                            )}
                                            <span className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-brand-primary' : 'group-hover:text-brand-secondary'}`}>
                                                {renderIcon(page.icon)}
                                            </span>
                                            <span className="relative z-10 text-sm tracking-tight truncate">{page.title}</span>
                                            {isActive && (
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-brand-primary rounded-l-full shadow-[0_0_10px_rgba(0,0,0,0.1)]" />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    {/* Exclusive Navigation */}
                    <div>
                        <h3 className="px-3 text-[10px] font-bold text-brand-secondary uppercase tracking-[0.2em] mb-3 opacity-80">
                            {activeRole?.name === 'System Admin' ? 'Governance' : 'Exclusive Tools'}
                        </h3>
                        <nav className="space-y-1.5">
                            {roleExclusivePages.map(page => (
                                <NavLink
                                    key={`exclusive-${page.id}`}
                                    to={`/role/${currentRoleId}/page/${page.id}`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden ${isActive
                                            ? 'text-brand-primary font-bold'
                                            : 'text-ui-muted hover:text-ui-text hover:bg-white/5'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {isActive && (
                                                <div className="absolute inset-0 bg-brand-secondary/90 shadow-[0_0_20px_rgba(139,197,63,0.3)] animate-in fade-in zoom-in-95 duration-300" />
                                            )}
                                            <span className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-brand-primary' : 'group-hover:text-brand-secondary'}`}>
                                                {renderIcon(page.icon)}
                                            </span>
                                            <span className="relative z-10 text-sm tracking-tight truncate">{page.title}</span>
                                            {isActive && (
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-brand-primary rounded-l-full shadow-[0_0_10px_rgba(0,0,0,0.1)]" />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                </div>

                {/* Interactive User Switcher / Footer */}
                <div className="p-4 border-t border-ui-border bg-ui-card transition-colors duration-500">
                    <div className="flex items-center gap-3 w-full mb-3 px-1">
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold text-sm shadow-md transition-colors duration-300 ${activeRole?.color}`}>
                            {activeRole?.abbr}
                        </div>
                        <div className="overflow-hidden flex-1">
                            <p className="text-sm font-semibold text-ui-text truncate transition-all duration-300">{activeRole?.user}</p>
                            <p className="text-xs text-brand-secondary font-medium tracking-wide truncate transition-all duration-300">{activeRole?.name}</p>
                        </div>
                    </div>

                    {/* Theme Switcher */}
                    <div className="flex gap-2 mb-3 bg-ui-surface p-1 rounded-lg border border-ui-border">
                        <button
                            onClick={() => setTheme('light')}
                            className={`flex-1 flex justify-center py-1.5 rounded-md transition-all ${theme === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-ui-muted hover:text-ui-text'}`}
                            title="Light Mode"
                        ><LucideIcons.Sun className="w-4 h-4" /></button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={`flex-1 flex justify-center py-1.5 rounded-md transition-all ${theme === 'dark' ? 'bg-slate-800 text-white shadow-sm' : 'text-ui-muted hover:text-ui-text'}`}
                            title="Premium Dark"
                        ><LucideIcons.Moon className="w-4 h-4" /></button>
                        <button
                            onClick={() => setTheme('night')}
                            className={`flex-1 flex justify-center py-1.5 rounded-md transition-all ${theme === 'night' ? 'bg-[#003300] text-[#00ff00] shadow-sm border border-[#00ff00]/50' : 'text-ui-muted hover:text-[#00ff00]'}`}
                            title="Night Vision"
                        ><LucideIcons.Eye className="w-4 h-4" /></button>
                    </div>

                    {/* Role Switcher */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-ui-muted">
                            <LucideIcons.Briefcase className="w-4 h-4" />
                        </div>
                        <select
                            value={currentRoleId}
                            onChange={handleRoleChange}
                            className="w-full bg-ui-surface border border-ui-border text-ui-text text-sm rounded-lg focus:ring-brand-secondary focus:border-brand-secondary block pl-9 pr-3 py-2 appearance-none shadow-sm cursor-pointer outline-none hover:border-brand-secondary/50 transition-all duration-300"
                            style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundPosition: 'right 0.75rem top 50%', backgroundSize: '0.65rem auto', backgroundRepeat: 'no-repeat' }}
                        >
                            {roles.map(r => (
                                <option key={r.id} value={r.id} className="bg-ui-surface text-ui-text font-medium">Simulate Role: {r.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </aside>

            {/* Unified Mobile Bottom Navigation Bar (Active on Modern, Christmas, default layouts) */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-ui-card border-t border-ui-border z-50 flex justify-around items-end px-2 pt-2 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] transition-colors duration-500">
                {allPages.slice(0, 5).map(page => (
                    <NavLink
                        key={`mobile-${page.id}`}
                        to={`/role/${currentRoleId}/page/${page.id}`}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center gap-1.5 transition-all duration-300 flex-1 relative ${isActive
                                ? 'text-brand-accent scale-110 -translate-y-2'
                                : 'text-ui-muted hover:text-ui-text'
                            }`
                        }
                    >
                        {({ isActive }: { isActive: boolean }) => (
                            <>
                                <div className={`p-2.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-brand-secondary shadow-[0_8px_15px_rgba(139,197,63,0.3)] text-brand-bg' : 'bg-transparent'}`}>
                                    {renderIcon(page.icon)}
                                </div>
                                <span className={`text-[10px] font-bold truncate w-full text-center transition-all ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                    {page.title}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </>
    );
}
