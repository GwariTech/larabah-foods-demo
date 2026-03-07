import React, { useState } from 'react';
import { Outlet, useParams, NavLink } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import EnterpriseHeader from '../components/EnterpriseHeader';
import CommandPalette from '../components/CommandPalette';
import * as LucideIcons from 'lucide-react';
import { sharedPages, exclusivePages } from '../config';

export default function TabletLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { roleId } = useParams();
    const currentRoleId = roleId || '1';

    const roleSharedPages = sharedPages[currentRoleId as keyof typeof sharedPages] || [];
    const roleExclusivePages = exclusivePages[currentRoleId as keyof typeof exclusivePages] || [];
    const allPages = [...roleSharedPages, ...roleExclusivePages];

    const renderIcon = (iconName: string) => {
        const IconComponent = (LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.Circle) as React.ElementType;
        return <IconComponent className="w-5 h-5" />;
    };

    return (
        <div className="flex h-screen bg-brand-bg overflow-hidden font-sans text-ui-text selection:bg-brand-secondary selection:text-white transition-colors duration-500 relative">

            {/* Premium Blurred Overlay for Sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-md z-30 lg:hidden transition-all duration-500 animate-in fade-in"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Native-feel Floating Sidebar (Slide In) */}
            <div className={`fixed inset-y-0 left-0 z-50 w-72 transform shadow-2xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}>
                <div className="h-full bg-ui-card border-r border-ui-border shadow-2xl">
                    <Sidebar />
                </div>
            </div>

            <CommandPalette />

            <main className="flex-1 overflow-y-auto relative w-full custom-scrollbar flex flex-col">
                <div className="flex items-center backdrop-blur-xl bg-ui-card/80 border-b border-ui-border sticky top-0 z-20">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-5 text-ui-text hover:text-brand-secondary transition-all active:scale-90"
                    >
                        <LucideIcons.Menu className="w-6 h-6" />
                    </button>
                    <div className="flex-1">
                        <EnterpriseHeader />
                    </div>
                </div>

                <div className="max-w-7xl w-full mx-auto px-8 py-10 flex-1 flex flex-col animate-fade-in-up">
                    <Outlet />
                </div>
            </main>

            {/* Quick Access Floating Action (Optional - for Tablet Ergonomics) */}
            <button
                onClick={() => window.dispatchEvent(new Event('open_command_palette'))}
                className="fixed bottom-8 right-8 w-14 h-14 bg-brand-secondary text-brand-bg rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-all z-40 lg:hidden"
            >
                <LucideIcons.Search className="w-6 h-6" />
            </button>
        </div>
    );
}
