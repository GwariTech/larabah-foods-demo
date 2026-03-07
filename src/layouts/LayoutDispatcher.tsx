import React, { lazy, Suspense } from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';

// Lazy load layout components for production optimization
const ModernLayout = lazy(() => import('./Modern/ModernLayout'));
const CorporateLayout = lazy(() => import('./Corporate/CorporateLayout'));
const GlassFloatingLayout = lazy(() => import('./Glass/GlassFloatingLayout'));
const NeobrutalGridLayout = lazy(() => import('./Brutalism/NeobrutalGridLayout'));
const MinimalistCanvasLayout = lazy(() => import('./Minimal/MinimalistCanvasLayout'));
const HighContrastLayout = lazy(() => import('./HighContrast/HighContrastLayout'));
const DataDenseLayout = lazy(() => import('./Dashboard/DataDenseLayout'));
const ChristmasFestiveLayout = lazy(() => import('./Christmas/ChristmasFestiveLayout'));
const RamadanFestiveLayout = lazy(() => import('./Ramadan/RamadanFestiveLayout'));

const MobileLayout = lazy(() => import('./MobileLayout'));
const TabletLayout = lazy(() => import('./TabletLayout'));

// Premium Loader Component
const LayoutLoader = () => (
    <div className="fixed inset-0 bg-[#09253c] flex items-center justify-center z-[9999]">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#8bc53f]/20 border-t-[#8bc53f] rounded-full animate-spin"></div>
            <p className="text-[#8bc53f] font-bold tracking-widest text-xs uppercase animate-pulse">Initializing System...</p>
        </div>
    </div>
);

export default function LayoutDispatcher() {
    const { activeTheme, device } = useDesignSystem();

    const renderLayout = () => {
        // Device-First Routing: Mobile and Tablet get dedicated high-end layouts
        if (device === 'mobile') {
            return <MobileLayout />;
        }
        if (device === 'tablet') {
            return <TabletLayout />;
        }

        // Desktop falls back to theme-specific 9-topology system
        switch (activeTheme) {
            case 'theme-modern':
                return <ModernLayout />;
            case 'theme-professional':
                return <CorporateLayout />;
            case 'theme-glassmorphism':
                return <GlassFloatingLayout />;
            case 'theme-neobrutalism':
                return <NeobrutalGridLayout />;
            case 'theme-minimalist':
                return <MinimalistCanvasLayout />;
            case 'theme-highcontrast':
                return <HighContrastLayout />;
            case 'theme-dashboard':
                return <DataDenseLayout />;
            case 'theme-christmas':
                return <ChristmasFestiveLayout />;
            case 'theme-ramadan':
                return <RamadanFestiveLayout />;
            default:
                return <ModernLayout />;
        }
    };

    return (
        <Suspense fallback={<LayoutLoader />}>
            {renderLayout()}
        </Suspense>
    );
}
