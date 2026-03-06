import React, { useState } from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import CommandPalette from '../../components/CommandPalette';
import { roles, sharedPages, exclusivePages } from '../../config';
import * as LucideIcons from 'lucide-react';

export default function MinimalistCanvasLayout() {
    const { roleId } = useParams();
    const currentRoleId = roleId || '1';
    const [menuOpen, setMenuOpen] = useState(false);

    const roleSharedPages = sharedPages[currentRoleId as keyof typeof sharedPages] || [];
    const roleExclusivePages = exclusivePages[currentRoleId as keyof typeof exclusivePages] || [];

    const allPages = [...roleSharedPages, ...roleExclusivePages];

    const renderIcon = (iconName: string) => {
        const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
        if (!IconComponent) return null;
        return <IconComponent className="w-8 h-8 stroke-1" />;
    };

    return (
        <div className="bg-white text-[#111] min-h-screen font-sans selection:bg-[#8bc53f] selection:text-white transition-colors duration-1000">
            <CommandPalette />

            {/* Hidden Full Screen Navigation Canvas */}
            <div className={`fixed inset-0 bg-[#09253c] text-white z-50 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] flex flex-col items-center justify-center ${menuOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-110'}`}>
                <button
                    onClick={() => setMenuOpen(false)}
                    className="absolute top-12 right-12 hover:rotate-90 transition-transform duration-500"
                >
                    <LucideIcons.X className="w-12 h-12 stroke-1" />
                </button>

                <nav className="flex flex-col gap-8 text-center">
                    {allPages.map(page => (
                        <NavLink
                            key={page.id}
                            to={`/role/${currentRoleId}/page/${page.id}`}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `text-4xl lg:text-6xl font-light tracking-tight hover:text-[#8bc53f] transition-colors ${isActive ? 'text-[#8bc53f] font-normal drop-shadow-[0_0_15px_rgba(139,197,63,0.3)]' : 'text-white/60'
                                }`
                            }
                        >
                            {page.title}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Main Minimalist Canvas */}
            <header className="flex justify-between items-center px-12 py-10 fixed w-full top-0 z-40 bg-white/80 backdrop-blur-3xl">
                <img src="/logo.png" className="h-8 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500" alt="Larabah Foods" />
                <button
                    onClick={() => setMenuOpen(true)}
                    className="flex items-center gap-4 group"
                >
                    <span className="uppercase tracking-[0.2em] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0">Menu</span>
                    <LucideIcons.Menu className="w-8 h-8 stroke-1 group-hover:text-[#8bc53f] transition-colors" />
                </button>
            </header>

            <main className="pt-40 px-6 sm:px-12 md:px-24 lg:px-48 pb-24 max-w-[1600px] mx-auto min-h-screen flex flex-col justify-center animate-fade-in-up">
                {/* Content injected here. Will adopt global minimalist overrides defined in CSS */}
                <Outlet />
            </main>
        </div>
    );
}
