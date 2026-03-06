import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import ModularPageDispatcher from './pages/ModularPageDispatcher';
import PublicLayout from './pages/public/PublicLayout';
import WebsiteHome from './pages/public/WebsiteHome';
import WebsiteAbout from './pages/public/WebsiteAbout';
import WebsiteShop from './pages/public/WebsiteShop';
import WebsiteFarms from './pages/public/WebsiteFarms';
import WebsiteWater from './pages/public/WebsiteWater';
import WebsiteContact from './pages/public/WebsiteContact';
import { DesignSystemProvider } from './context/DesignSystemContext';
import ThemeFloatingButton from './components/ThemeFloatingButton';
import LayoutDispatcher from './layouts/LayoutDispatcher';

// Premium Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
    <div className="fixed inset-0 bg-[#09253c] flex items-center justify-center p-6 text-center z-[10000]">
        <div className="max-w-md w-full bg-slate-900 border border-red-500/30 rounded-2xl p-8 shadow-2xl shadow-red-500/10">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">System Encountered an Error</h2>
            <p className="text-slate-400 mb-6 text-sm">{error.message}</p>
            <button
                onClick={resetErrorBoundary}
                className="w-full py-3 bg-[#8bc53f] hover:bg-[#a3d957] text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-[#8bc53f]/20 uppercase tracking-wider text-xs"
            >
                Restart Session
            </button>
        </div>
    </div>
);

export default function App() {
    return (
        <HelmetProvider>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.href = '/larabah-foods-demo/'}
            >
                <DesignSystemProvider>
                    <Helmet>
                        <title>Larabah Foods | Enterprise Demo Application</title>
                        <meta name="description" content="Next-generation Enterprise Resource Management system for Larabah Foods. Explore our 9-Topology UI Engine." />
                        <meta property="og:title" content="Larabah Foods | Enterprise Demo" />
                        <meta property="og:description" content="Enterprise-grade food logistics and farm management simulation." />
                        <meta property="og:type" content="website" />
                        <meta property="og:brand" content="Larabah" />
                        <meta name="theme-color" content="#09253c" />
                    </Helmet>

                    <ThemeFloatingButton />

                    <Router basename="/larabah-foods-demo">
                        <Routes>
                            {/* Redirect root to first CEO role page */}
                            <Route path="/" element={<Navigate to="/role/1/page/1" replace />} />

                            {/* --- ENTERPRISE SYSTEM --- */}
                            <Route path="/role/:roleId" element={<LayoutDispatcher />}>
                                <Route path="page/:pageId" element={<ModularPageDispatcher />} />
                            </Route>

                            {/* --- PUBLIC WEBSITE --- */}
                            <Route path="/website" element={<PublicLayout />}>
                                <Route index element={<WebsiteHome />} />
                                <Route path="about" element={<WebsiteAbout />} />
                                <Route path="farms" element={<WebsiteFarms />} />
                                <Route path="water" element={<WebsiteWater />} />
                                <Route path="shop" element={<WebsiteShop />} />
                                <Route path="contact" element={<WebsiteContact />} />
                            </Route>
                        </Routes>
                    </Router>
                </DesignSystemProvider>
            </ErrorBoundary>
        </HelmetProvider>
    );
}
