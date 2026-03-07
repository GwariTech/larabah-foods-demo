import React from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { sharedPages, exclusivePages } from '../config';
import EnterpriseHeader from '../components/EnterpriseHeader';
import CommandPalette from '../components/CommandPalette';

export default function MobileLayout() {
    const { roleId } = useParams();
    const currentRoleId = roleId || '1';

    // Get all pages for this role
    const roleSharedPages = sharedPages[currentRoleId as keyof typeof sharedPages] || [];
    const roleExclusivePages = exclusivePages[currentRoleId as keyof typeof exclusivePages] || [];

    // For mobile bottom nav, we take the top 5 most important pages
    // Usually: Home (Dashboard), and the first few exclusive actions
    const allPages = [...roleSharedPages, ...roleExclusivePages];
    const navItems = allPages.slice(0, 5);

    const renderIcon = (iconName: string, isActive: boolean) => {
        const IconComponent = (LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.Circle) as React.ElementType;
        return <IconComponent className={`w-6 h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-70'}`} />;
    };

    return (
        <div className="flex flex-col h-screen bg-brand-bg overflow-hidden font-sans text-ui-text selection:bg-brand-secondary selection:text-white transition-colors duration-500">
            <CommandPalette />

            {/* Premium Glass Header */}
            <div className="fixed top-0 w-full z-40 backdrop-blur-xl bg-ui-card/80 border-b border-ui-border shadow-sm">
                <EnterpriseHeader />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative w-full pt-16 pb-24 custom-scrollbar flex flex-col">
                <div className="w-full px-4 py-6 flex-1 flex flex-col animate-fade-in-up">
                    <Outlet />
                </div>
            </main>

            {/* Fixed Bottom Native-App Navigation */}
            <nav className="fixed bottom-0 w-full backdrop-blur-2xl bg-ui-card/90 border-t border-ui-border pb-safe pt-2 px-4 flex justify-around items-center z-40 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)]">
                {navItems.map(page => (
                    <NavLink
                        key={page.id}
                        to={`/role/${currentRoleId}/page/${page.id}`}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1.5 p-2 transition-all duration-300 active:scale-95 ${isActive
                                ? 'text-brand-secondary'
                                : 'text-ui-muted hover:text-ui-text'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`relative ${isActive ? 'translate-y-[-2px]' : ''} transition-transform`}>
                                    {renderIcon(page.icon, isActive)}
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-secondary rounded-full animate-pulse"></span>
                                    )}
                                </div>
                                <span className={`text-[10px] font-bold tracking-tight uppercase ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                    {page.title.split(' ')[0]}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Safe Area Inset for modern mobile browsers */}
            <div className="h-[env(safe-area-inset-bottom)] bg-ui-card/90"></div>
        </div>
    );
}
