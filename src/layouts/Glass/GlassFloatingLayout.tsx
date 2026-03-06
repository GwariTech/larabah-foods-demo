import React from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import CommandPalette from '../../components/CommandPalette';
import { roles, sharedPages, exclusivePages } from '../../config';
import * as LucideIcons from 'lucide-react';
import EnterpriseHeader from '../../components/EnterpriseHeader';

export default function GlassFloatingLayout() {
    const { roleId } = useParams();
    const currentRoleId = roleId || '1';

    const roleSharedPages = sharedPages[currentRoleId as keyof typeof sharedPages] || [];
    const roleExclusivePages = exclusivePages[currentRoleId as keyof typeof exclusivePages] || [];

    const allPages = [...roleSharedPages, ...roleExclusivePages];

    const renderIcon = (iconName: string) => {
        const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
        if (!IconComponent) return <LucideIcons.Circle className="w-5 h-5" />;
        return <IconComponent className="w-5 h-5" />;
    };

    return (
        <div className="flex h-screen overflow-hidden font-sans text-ui-text bg-gradient-to-br from-[#09253c] via-[#103a5e] to-[#8bc53f] transition-all relative">
            <CommandPalette />

            {/* Ambient Animated Orbs */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-[#8bc53f]/30 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#09253c]/40 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>

            <div className="w-full h-full p-4 lg:p-8 flex flex-col lg:flex-row gap-4 lg:gap-8 relative z-10">
                {/* Floating Glass Sidebar (Desktop Only) */}
                <aside className="hidden lg:flex w-72 shrink-0 rounded-[2.5rem] backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/5 shadow-2xl flex-col pt-8 pb-4 transition-all duration-300 z-20">
                    <div className="px-6 mb-8 flex justify-center lg:justify-start">
                        <img src="/logo.png" className="h-10 contrast-125 brightness-125 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all" alt="Larabah Logo" />
                    </div>
                    <nav className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto custom-scrollbar">
                        {allPages.map(page => (
                            <NavLink
                                key={page.id}
                                to={`/role/${currentRoleId}/page/${page.id}`}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${isActive
                                        ? 'bg-white/20 dark:bg-white/10 text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/30 dark:border-white/10 backdrop-blur-md scale-105'
                                        : 'text-white/60 hover:text-white hover:bg-white/10 border border-transparent hover:scale-105'
                                    }`
                                }
                            >
                                <span className="group-hover:scale-110 group-hover:rotate-6 transition-all">{renderIcon(page.icon)}</span>
                                <span className="font-medium truncate">{page.title}</span>
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                {/* Floating Glass Content Container */}
                <main className="flex-1 rounded-[2.5rem] backdrop-blur-xl bg-white/80 dark:bg-[#09253c]/80 border border-white/20 dark:border-white/5 shadow-2xl overflow-hidden flex flex-col relative transition-all duration-300 z-10 mb-20 lg:mb-0">
                    <div className="p-4 lg:p-6 bg-white/40 dark:bg-black/20 border-b border-white/20 dark:border-white/5 backdrop-blur-md sticky top-0 z-20">
                        <EnterpriseHeader />
                    </div>
                    <div className="p-4 lg:p-10 flex-1 overflow-y-auto custom-scrollbar bg-white/30 dark:bg-black/10">
                        <Outlet />
                    </div>
                </main>

                {/* Mobile Bottom Glass Pill Nav */}
                <nav className="lg:hidden fixed bottom-6 left-4 right-4 rounded-full backdrop-blur-3xl bg-[#09253c]/80 dark:bg-black/80 border border-white/30 dark:border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex justify-around p-2 z-50">
                    {allPages.slice(0, 5).map(page => (
                        <NavLink
                            key={`mobile-${page.id}`}
                            to={`/role/${currentRoleId}/page/${page.id}`}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center p-3 rounded-full transition-all duration-300 ${isActive
                                    ? 'bg-white/20 text-[#8bc53f] shadow-inner scale-110 -translate-y-2'
                                    : 'text-white/60 hover:text-white hover:bg-white/10'
                                }`
                            }
                        >
                            {renderIcon(page.icon)}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
}
