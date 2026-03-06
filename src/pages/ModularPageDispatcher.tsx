import React, { useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { sharedPages, exclusivePages, roles } from '../config';

// Lazy load views for production optimization
const DashboardOverview = lazy(() => import('../views/DashboardOverview'));
const GenericView = lazy(() => import('../views/GenericView'));
const SystemSettingsView = lazy(() => import('../views/SystemSettingsView'));

// Premium Module Loader
const ModuleLoader = () => (
    <div className="flex flex-col items-center justify-center p-12 w-full min-h-[400px]">
        <div className="relative">
            <div className="w-16 h-16 border-2 border-[#8bc53f]/10 border-t-[#8bc53f] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-[#8bc53f]/20 rounded-full animate-pulse"></div>
            </div>
        </div>
        <p className="mt-6 text-slate-500 font-medium text-sm tracking-wide">Syncing Module Data...</p>
    </div>
);

export default function ModularPageDispatcher() {
    const { roleId, pageId } = useParams();

    // Safety check defaults
    const currentRoleId = roleId || '1';
    const currentRole = roles.find(r => r.id === currentRoleId);

    // Find the requested page details
    const allPages = [
        ...(sharedPages[currentRoleId as keyof typeof sharedPages] || []),
        ...(exclusivePages[currentRoleId as keyof typeof exclusivePages] || [])
    ];

    const pageDetails = allPages.find(p => p.id === pageId);

    // Render logic
    const renderInteractiveView = () => {
        if (!pageDetails) {
            return (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                    <h2 className="text-xl font-bold mb-2">Module Not Found</h2>
                    <p>The requested page module configuration does not exist for this role.</p>
                </div>
            );
        }

        return (
            <Suspense fallback={<ModuleLoader />}>
                {(() => {
                    // Dashboard is ID 1 for all shared modules
                    if (pageId === '1') {
                        return <DashboardOverview role={currentRole} page={pageDetails} />;
                    }

                    // Custom SysAdmin Design Settings Panel
                    if (pageId === '2' && currentRole?.id === '7') {
                        return <SystemSettingsView />;
                    }

                    // For the purposes of the demo, render a generic view with the exact title/desc
                    return <GenericView role={currentRole} page={pageDetails} />;
                })()}
            </Suspense>
        );
    };


    return (
        <div className="animate-fade-in-up w-full">
            {/* Page Header */}
            <div className="mb-8 border-b border-slate-800/80 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">{pageDetails?.title || 'Loading...'}</h1>
                    <p className="text-slate-400 font-medium">{pageDetails?.desc}</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-800 text-sm font-medium text-white rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors shadow-sm">
                        Export Data
                    </button>
                    <button className="px-4 py-2 bg-brand-secondary text-sm font-bold text-slate-900 rounded-lg hover:bg-brand-accent transition-colors shadow-sm shadow-brand-secondary/20">
                        New Action
                    </button>
                </div>
            </div>

            {/* Injected Module Component */}
            {renderInteractiveView()}
        </div>
    );
}
