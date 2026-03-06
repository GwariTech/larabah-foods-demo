import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import EnterpriseHeader from '../components/EnterpriseHeader';
import CommandPalette from '../components/CommandPalette';
import * as LucideIcons from 'lucide-react';

export default function TabletLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-brand-bg overflow-hidden font-sans text-ui-text selection:bg-brand-secondary selection:text-white transition-colors duration-500 relative">

            {/* Overlay for Sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Floating Sidebar (Slide In) */}
            <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <Sidebar />
            </div>

            <CommandPalette />

            <main className="flex-1 overflow-y-auto relative w-full custom-scrollbar flex flex-col">
                <div className="flex items-center bg-ui-card border-b border-ui-border">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-4 text-ui-text hover:text-brand-secondary transition-colors"
                    >
                        <LucideIcons.Menu className="w-6 h-6" />
                    </button>
                    <div className="flex-1">
                        <EnterpriseHeader />
                    </div>
                </div>

                <div className="max-w-7xl w-full mx-auto px-6 py-8 flex-1 flex flex-col">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
