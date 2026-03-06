import React from 'react';
import { Outlet } from 'react-router-dom';
import CommandPalette from '../../components/CommandPalette';
import { roles, sharedPages, exclusivePages } from '../../config';
import { useParams, NavLink } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

export default function CorporateLayout() {
    const { roleId } = useParams();
    const currentRoleId = roleId || '1';

    const roleSharedPages = sharedPages[currentRoleId as keyof typeof sharedPages] || [];
    const roleExclusivePages = exclusivePages[currentRoleId as keyof typeof exclusivePages] || [];

    const allPages = [...roleSharedPages, ...roleExclusivePages];

    const renderIcon = (iconName: string) => {
        const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
        if (!IconComponent) return <LucideIcons.Circle className="w-4 h-4" />;
        return <IconComponent className="w-4 h-4" />;
    };

    return (
        <div className="flex justify-center bg-brand-bg min-h-screen text-ui-text font-serif">
            <CommandPalette />

            <div className="w-full max-w-[1400px] bg-white shadow-2xl overflow-hidden flex flex-col">
                {/* Massive Blue Corporate Header */}
                <header className="bg-brand-primary text-white p-6 md:p-10 flex flex-col gap-8">
                    <div className="flex justify-between items-center border-b border-white/20 pb-6">
                        <img src="/logo.png" className="h-16 contrast-200 brightness-200" alt="Larabah Logo" />
                        <div className="flex gap-4">
                            <button className="px-6 py-2 border-2 border-brand-secondary text-brand-secondary rounded-full font-bold hover:bg-brand-secondary/10 uppercase tracking-widest text-xs">Simulate Tools</button>
                        </div>
                    </div>

                    {/* Horizontal Top Navigation Bar wrapping (No Horizontal Scrolling) */}
                    <nav className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 pb-2">
                        {allPages.map(page => (
                            <NavLink
                                key={page.id}
                                to={`/role/${currentRoleId}/page/${page.id}`}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-all rounded-full border ${isActive
                                        ? 'bg-brand-secondary border-brand-secondary text-brand-bg shadow-[0_0_20px_rgba(139,197,63,0.4)] scale-105'
                                        : 'bg-white/5 border-white/20 text-white/80 hover:text-white hover:bg-white/15 hover:border-white/50 hover:scale-105'
                                    }`
                                }
                            >
                                {renderIcon(page.icon)}
                                <span>{page.title}</span>
                            </NavLink>
                        ))}
                    </nav>
                </header>

                {/* Centered strict-width content block */}
                <main className="flex-1 p-6 md:p-12 bg-slate-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
