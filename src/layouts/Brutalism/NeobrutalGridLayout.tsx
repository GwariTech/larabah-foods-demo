import React from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import CommandPalette from '../../components/CommandPalette';
import { roles, sharedPages, exclusivePages } from '../../config';
import * as LucideIcons from 'lucide-react';

export default function NeobrutalGridLayout() {
    const { roleId } = useParams();
    const currentRoleId = roleId || '1';

    const roleSharedPages = sharedPages[currentRoleId as keyof typeof sharedPages] || [];
    const roleExclusivePages = exclusivePages[currentRoleId as keyof typeof exclusivePages] || [];

    const allPages = [...roleSharedPages, ...roleExclusivePages];

    const renderIcon = (iconName: string) => {
        const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
        if (!IconComponent) return <LucideIcons.Circle className="w-6 h-6" />;
        return <IconComponent className="w-6 h-6" />;
    };

    return (
        <div className="flex flex-col lg:flex-row bg-[#fcf9f2] text-black min-h-screen font-sans selection:bg-black selection:text-[#8bc53f]">
            <CommandPalette />

            {/* Brutalist Thick Block Sidebar */}
            <aside className="w-full lg:w-80 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white flex flex-col lg:h-screen lg:fixed z-30">
                <div className="p-6 lg:p-8 border-b-4 border-black bg-[#8bc53f] flex items-center justify-center lg:justify-start">
                    <img src="/logo.png" className="h-8 lg:h-12 drop-shadow-[4px_4px_0_rgba(0,0,0,1)] hover:drop-shadow-[2px_2px_0_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1" alt="Larabah Logo" style={{ filter: 'brightness(0)' }} />
                </div>

                <div className="p-4 lg:p-6 border-b-4 border-black bg-[#09253c] text-white flex justify-between items-center">
                    <span className="font-black text-lg lg:text-xl tracking-tighter uppercase">Operations</span>
                    <LucideIcons.Activity className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>

                {/* Desktop layout: Vertical Col. Mobile Layout: Auto-Fit Wrapped Flex Grid. Never Horizontal Scroll */}
                <nav className="flex-1 lg:overflow-y-auto custom-scrollbar flex flex-wrap lg:flex-col lg:divide-y-4 divide-black bg-[#ccc] lg:bg-transparent border-b-4 border-black lg:border-b-0">
                    {allPages.map(page => (
                        <NavLink
                            key={page.id}
                            to={`/role/${currentRoleId}/page/${page.id}`}
                            className={({ isActive }) =>
                                `group flex items-center justify-center lg:justify-start flex-1 min-w-[33%] sm:min-w-[25%] lg:min-w-0 p-4 lg:p-6 transition-transform hover:bg-[#8bc53f] lg:hover:translate-x-4 border border-black lg:border-0 lg:border-l-8 ${isActive
                                    ? 'bg-[#8bc53f] border-black text-black font-black'
                                    : 'bg-white border-transparent text-black font-bold'
                                }`
                            }
                        >
                            <span className="hidden lg:flex mr-4 p-2 border-2 border-black bg-[#09253c] text-white shadow-[4px_4px_0_rgba(0,0,0,1)] group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                                {renderIcon(page.icon)}
                            </span>
                            <span className="lg:hidden mr-2">
                                {renderIcon(page.icon)}
                            </span>
                            <span className="text-xs lg:text-lg uppercase tracking-tight truncate flex-1 text-center lg:text-left">{page.title}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Content Area */}
            <main className="flex-1 lg:ml-80 p-4 sm:p-6 lg:p-12 bg-pattern overflow-y-auto relative z-10 flex flex-col min-w-0">
                {/* Header Replacement */}
                <header className="mb-8 lg:mb-12 border-4 border-black p-4 lg:p-6 bg-white shadow-[4px_4px_0_rgba(0,0,0,1)] lg:shadow-[8px_8px_0_rgba(0,0,0,1)] flex flex-col sm:flex-row gap-4 justify-between items-center sm:items-start group transition-all">
                    <h1 className="font-black text-2xl lg:text-4xl uppercase tracking-tighter mix-blend-difference">Larabah Core V2</h1>
                    <button className="w-full sm:w-auto px-6 lg:px-8 py-3 bg-[#09253c] text-white font-black uppercase tracking-widest border-4 border-black shadow-[4px_4px_0_rgba(139,197,63,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all active:bg-black">
                        Execute
                    </button>
                </header>

                {/* Inject the actual polymorphic module content but within brutalist wrapper rules */}
                <div className="border-4 border-black bg-white shadow-[8px_8px_0_rgba(9,37,60,1)] lg:shadow-[16px_16px_0_rgba(9,37,60,1)] p-4 sm:p-6 lg:p-8 flex-1 min-w-0 overflow-hidden relative group transition-all">
                    <div className="absolute inset-0 bg-[#8bc53f]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0"></div>
                    <div className="relative z-10 w-full overflow-hidden">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
