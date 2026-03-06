import React from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import CommandPalette from '../../components/CommandPalette';
import { roles, sharedPages, exclusivePages } from '../../config';
import * as LucideIcons from 'lucide-react';

export default function HighContrastLayout() {
    const { roleId } = useParams();
    const currentRoleId = roleId || '1';

    const roleSharedPages = sharedPages[currentRoleId as keyof typeof sharedPages] || [];
    const roleExclusivePages = exclusivePages[currentRoleId as keyof typeof exclusivePages] || [];

    const allPages = [...roleSharedPages, ...roleExclusivePages];

    const renderIcon = (iconName: string) => {
        const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
        if (!IconComponent) return null;
        return <IconComponent className="w-10 h-10" />;
    };

    return (
        <div className="flex flex-col lg:flex-row bg-black text-white min-h-screen font-sans">
            <CommandPalette />

            {/* Accessibility Massive Navigation Sidebar */}
            <aside className="w-full lg:w-1/3 lg:min-w-[350px] lg:max-w-[500px] border-b-[6px] lg:border-b-0 lg:border-r-[6px] border-[#8bc53f] bg-black flex flex-col lg:h-screen lg:overflow-y-auto">
                <div className="p-6 lg:p-8 border-b-[6px] border-[#333] flex justify-center lg:justify-start">
                    <img src="/logo.png" className="h-12 lg:h-20 contrast-[200%] grayscale" alt="Larabah Logo" style={{ filter: 'brightness(0) invert(1)' }} />
                </div>

                <nav className="flex-1 flex flex-row flex-wrap lg:flex-col overflow-x-hidden">
                    {allPages.map(page => (
                        <NavLink
                            key={page.id}
                            to={`/role/${currentRoleId}/page/${page.id}`}
                            className={({ isActive }) =>
                                `flex-1 min-w-[50%] lg:min-w-0 flex items-center justify-center lg:justify-start gap-3 lg:gap-6 p-4 lg:p-8 border-b-[6px] border-r-[6px] lg:border-r-0 border-[#333] transition-colors focus:outline-none focus:ring-[8px] focus:ring-yellow-400 focus:z-10 relative ${isActive
                                    ? 'bg-[#8bc53f] text-black font-extrabold'
                                    : 'bg-black text-white hover:bg-[#222]'
                                }`
                            }
                            title={page.title}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={isActive ? 'text-black' : 'text-[#8bc53f]'}>
                                        {renderIcon(page.icon)}
                                    </span>
                                    <span className="text-xl lg:text-3xl leading-tight line-clamp-2">{page.title}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Massive Padding Content Area */}
            <main className="flex-1 p-4 lg:p-12 xl:p-20 overflow-y-auto custom-scrollbar flex flex-col">
                <div className="bg-[#111] border-[6px] border-white p-6 lg:p-12 rounded-[2rem] flex-1">
                    <div className="mb-8 lg:mb-12 border-b-[6px] border-[#333] pb-6 lg:pb-8 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
                        <h1 className="text-4xl lg:text-6xl font-black text-[#8bc53f] text-center sm:text-left">CORE SYSTEM</h1>
                        <LucideIcons.Eye className="w-12 h-12 lg:w-16 lg:h-16 text-yellow-400" />
                    </div>
                    {/* Module Injection */}
                    <div className="text-lg lg:text-2xl leading-relaxed">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
