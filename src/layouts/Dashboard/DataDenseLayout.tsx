import React, { useState } from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import CommandPalette from '../../components/CommandPalette';
import { roles, sharedPages, exclusivePages } from '../../config';
import * as LucideIcons from 'lucide-react';
import EnterpriseHeader from '../../components/EnterpriseHeader';

export default function DataDenseLayout() {
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
        <div className="flex flex-col lg:flex-row bg-[#121212] text-gray-200 h-screen font-mono text-sm overflow-hidden">
            <CommandPalette />

            {/* Slim Header on Mobile / Sidebar on Desktop */}
            <div className="lg:hidden h-12 bg-[#1a1a1a] border-b border-[#333] flex items-center justify-center shrink-0 z-20">
                <img src="/logo.png" className="h-6 object-contain" alt="Logo" />
            </div>

            {/* Ultra-Slim Icon Only Sidebar (Bottom Bar on Mobile) */}
            <aside className="order-last lg:order-none w-full lg:w-16 h-16 lg:h-auto bg-[#1a1a1a] border-t lg:border-t-0 lg:border-r border-[#333] flex lg:flex-col items-center justify-around lg:justify-start py-0 lg:py-4 z-20 shrink-0">
                <img src="/logo.png" className="hidden lg:block w-8 h-8 mb-8 object-contain" alt="Logo" />

                <nav className="flex-1 flex flex-row lg:flex-col items-center justify-around lg:justify-start gap-2 lg:gap-4 w-full h-full lg:h-auto px-2 lg:px-0">
                    {allPages.map(page => (
                        <NavLink
                            key={page.id}
                            to={`/role/${currentRoleId}/page/${page.id}`}
                            title={page.title}
                            className={({ isActive }) =>
                                `p-3 rounded-md transition-colors ${isActive
                                    ? 'bg-[#8bc53f]/20 text-[#8bc53f] border border-[#8bc53f]/50 shadow-[0_0_10px_rgba(139,197,63,0.2)]'
                                    : 'text-gray-400 hover:text-white hover:bg-[#333]'
                                }`
                            }
                        >
                            {renderIcon(page.icon)}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Edge-to-Edge Content Area with zero structural padding */}
            <main className="flex-1 flex flex-col relative w-full overflow-hidden">
                {/* Slimline Dashboard Header */}
                <header className="h-12 bg-[#1a1a1a] border-b border-[#333] flex justify-between items-center px-4 shrink-0 overflow-x-auto custom-scrollbar whitespace-nowrap">
                    <div className="flex items-center gap-4 text-xs">
                        <span className="text-gray-500">SYS:</span>
                        <span className="text-[#8bc53f] font-bold">ON</span>
                        <span className="text-gray-500 ml-2 hidden sm:inline">VIEWPORT:</span>
                        <span className="text-white hidden sm:inline">EDGE-TO-EDGE</span>
                    </div>
                    <button className="text-xs bg-[#09253c] text-white px-3 py-1 border border-[#333] hover:bg-[#103a5e] shrink-0 ml-4">Export CSV</button>
                </header>

                <div className="flex-1 overflow-auto custom-scrollbar p-1 sm:p-2 bg-[#0a0a0a]">
                    <div className="w-full min-h-full border border-[#333] bg-[#1a1a1a]">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
