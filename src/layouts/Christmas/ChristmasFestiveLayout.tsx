import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import EnterpriseHeader from '../../components/EnterpriseHeader';
import CommandPalette from '../../components/CommandPalette';

const Snowfall = () => {
    const [snowflakes, setSnowflakes] = useState<any[]>([]);

    useEffect(() => {
        const createSnowflake = () => ({
            id: Math.random(),
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 4}s`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: Math.random() * 0.5 + 0.3,
            size: `${Math.random() * 6 + 4}px`
        });

        setSnowflakes(Array.from({ length: 40 }).map(createSnowflake));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {snowflakes.map(flake => (
                <div
                    key={flake.id}
                    className="absolute top-[-10px] bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                    style={{
                        left: flake.left,
                        width: flake.size,
                        height: flake.size,
                        opacity: flake.opacity,
                        animation: `snowfall ${flake.animationDuration} linear ${flake.animationDelay} infinite`
                    }}
                />
            ))}
            <style>{`
                @keyframes snowfall {
                    0% { transform: translateY(-10px) translateX(0); }
                    50% { transform: translateY(50vh) translateX(20px); }
                    100% { transform: translateY(100vh) translateX(-20px); }
                }
            `}</style>
        </div>
    );
};

export default function ChristmasFestiveLayout() {
    return (
        <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans text-[#0f172a] transition-colors duration-500 relative">
            <Snowfall />

            {/* Festive Sidebar styling injected via classes over underlying logic */}
            <div className="hidden lg:flex flex-col w-72 bg-gradient-to-b from-[#09253c] to-[#0d3454] border-r-4 border-red-600 shadow-2xl relative z-40">
                {/* Mistletoe Decoration Component */}
                <div className="absolute top-0 right-4 w-12 h-16 bg-red-600 rounded-b-full flex justify-center items-end pb-2 drop-shadow-xl z-50">
                    <div className="w-8 h-8 rounded-full bg-[#8bc53f] border-2 border-white translate-y-4"></div>
                </div>

                {/* Standard sidebar wrapper with forced dark mode to contrast with snow */}
                <div className="theme-dark h-full">
                    <Sidebar />
                </div>
            </div>

            <CommandPalette />

            <main className="flex-1 overflow-y-auto relative w-full lg:ml-72 custom-scrollbar flex flex-col bg-gradient-to-br from-white via-red-50 to-[#8bc53f]/10 pb-24 lg:pb-0">
                <div className="relative z-40 bg-white/60 backdrop-blur-md shadow-sm border-b border-red-200">
                    <EnterpriseHeader />
                </div>

                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 py-8 flex-1 flex flex-col relative z-20">
                    <Outlet />
                </div>
            </main>

            {/* Frozen window effect on borders */}
            <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(255,255,255,0.8)] z-30"></div>
        </div>
    );
}
