import React, { useState } from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { roles, sharedPages, exclusivePages } from '../config';
import EnterpriseHeader from '../components/EnterpriseHeader';
import CommandPalette from '../components/CommandPalette';

export default function MobileLayout() {
    const { roleId } = useParams();
    const currentRoleId = roleId || '1';

    // For mobile, we just highlight a few key routes in the bottom nav to mimic a native app
    const navItems = [
        { id: '1', icon: 'LayoutDashboard', label: 'Home' },
        { id: '2', icon: 'UserCircle', label: 'Profile' },
        { id: '6', icon: 'Target', label: 'Actions' }, // ID 6 is usually the first exclusive page
        { id: '3', icon: 'MessageSquare', label: 'Chat' },
    ];

    const renderIcon = (iconName: string) => {
        const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
        if (!IconComponent) return <LucideIcons.Circle className="w-6 h-6" />;
        return <IconComponent className="w-6 h-6" />;
    };

    return (
        <div className="flex flex-col h-screen bg-brand-bg overflow-hidden font-sans text-ui-text selection:bg-brand-secondary selection:text-white transition-colors duration-500">
            <CommandPalette />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative w-full custom-scrollbar flex flex-col pb-20">
                <EnterpriseHeader />
                <div className="w-full px-4 py-6 flex-1 flex flex-col">
                    <Outlet />
                </div>
            </main>

            {/* Fixed Bottom Native-App style Navigation */}
            <nav className="fixed bottom-0 w-full bg-ui-card border-t border-ui-border pb-safe pt-2 px-6 flex justify-between items-center z-40 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] transition-colors duration-500">
                {navItems.map(item => (
                    <NavLink
                        key={item.id}
                        to={`/role/${currentRoleId}/page/${item.id}`}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 p-2 transition-all duration-300 ${isActive
                                ? 'text-brand-secondary scale-110 -translate-y-1'
                                : 'text-ui-muted hover:text-ui-text'
                            }`
                        }
                    >
                        {renderIcon(item.icon)}
                        <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
