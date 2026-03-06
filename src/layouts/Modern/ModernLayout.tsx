import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import EnterpriseHeader from '../../components/EnterpriseHeader';
import CommandPalette from '../../components/CommandPalette';
import { useDesignSystem } from '../../context/DesignSystemContext';

export default function ModernLayout() {
    const { device } = useDesignSystem();

    return (
        <div className="flex h-screen bg-brand-bg overflow-hidden font-sans text-ui-text selection:bg-brand-secondary selection:text-white transition-colors duration-500">
            {device !== 'mobile' && <Sidebar />}

            <CommandPalette />
            <main className={`flex-1 overflow-y-auto relative w-full ${device !== 'mobile' ? 'lg:ml-72' : ''} custom-scrollbar flex flex-col pb-24 lg:pb-0`}>
                <EnterpriseHeader />
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 py-8 flex-1 flex flex-col relative z-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
