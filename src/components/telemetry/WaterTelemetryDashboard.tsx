import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

export default function WaterTelemetryDashboard() {
    const [bottlesProduced, setBottlesProduced] = useState(24500);
    const [purityLevel, setPurityLevel] = useState(99.99);
    const [pressure, setPressure] = useState(4.2);

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate bottling speed (approx 5 bottles per second)
            setBottlesProduced(prev => prev + Math.floor(Math.random() * 3) + 3);

            // Jitter sensors
            setPurityLevel(prev => Math.min(100, Math.max(99.90, prev + (Math.random() * 0.02 - 0.01))));
            setPressure(prev => Math.min(5.0, Math.max(3.8, prev + (Math.random() * 0.2 - 0.1))));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex flex-col animate-fade-in-up">
            <div className="flex justify-between items-start mb-6 z-10">
                <div>
                    <h3 className="text-lg font-bold text-ui-text flex items-center gap-2">
                        <LucideIcons.Factory className="w-5 h-5 text-blue-500" />
                        Line 2 Bottling Telemetry
                    </h3>
                    <p className="text-xs text-ui-muted">Live reverse-osmosis & packaging metrics</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <p className="text-[10px] text-ui-muted font-bold uppercase tracking-widest">Live Purity</p>
                        <p className="text-lg font-black text-brand-secondary">{purityLevel.toFixed(2)}%</p>
                    </div>
                    <div className="w-px h-8 bg-ui-border"></div>
                    <div className="text-right">
                        <p className="text-[10px] text-ui-muted font-bold uppercase tracking-widest">Pipe Pressure</p>
                        <p className="text-lg font-black text-blue-400">{pressure.toFixed(1)} Bar</p>
                    </div>
                </div>
            </div>

            {/* Simulated Factory Diagram */}
            <div className="flex-1 rounded-xl border border-ui-border bg-ui-surface overflow-hidden relative p-6 flex flex-col justify-center gap-8">

                {/* Filtration Stage */}
                <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full border-4 border-blue-500/30 flex items-center justify-center relative overflow-hidden bg-ui-card shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <div className="absolute inset-x-0 bottom-0 bg-blue-500/20 animate-pulse" style={{ height: '70%' }}></div>
                        <LucideIcons.Filter className="w-8 h-8 text-blue-500 relative z-10" />
                    </div>
                    <div className="flex-1 h-3 bg-ui-border rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.5),transparent)] w-1/2 animate-[slide-right_2s_linear_infinite]"></div>
                    </div>
                    {/* Reverse Osmosis */}
                    <div className="w-20 h-24 rounded-lg border-2 border-brand-secondary/50 bg-ui-card flex flex-col items-center justify-center relative shrink-0">
                        <span className="text-xs font-bold text-brand-secondary mb-1">R.O.</span>
                        <LucideIcons.Activity className="w-6 h-6 text-brand-secondary animate-pulse" />
                    </div>
                    <div className="flex-1 h-3 bg-ui-border rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(34,197,94,0.5),transparent)] w-1/2 animate-[slide-right_1.5s_linear_infinite]"></div>
                    </div>
                </div>

                {/* Bottling Stage */}
                <div className="flex items-center gap-4 justify-end mt-4 pr-10 relative">
                    {/* Simulated bottles sliding down the line */}
                    <div className="absolute -top-12 right-32 flex gap-4 overflow-hidden w-64 mask-fade">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="w-6 h-12 border-2 border-blue-400/50 rounded-t-lg rounded-b flex flex-col items-center shrink-0 animate-[slide-left_4s_linear_infinite]" style={{ animationDelay: `${i * 0.5}s` }}>
                                <div className="w-3 h-2 bg-blue-600 rounded-t-sm mb-1"></div>
                                <div className="flex-1 w-full bg-blue-400/20"></div>
                            </div>
                        ))}
                    </div>

                    <div className="px-6 py-4 bg-ui-card border-2 border-slate-700 rounded-xl relative z-10 shadow-2xl flex flex-col items-center">
                        <h4 className="text-xs font-bold text-ui-muted uppercase mb-1">Bottler Unit A</h4>
                        <div className="text-3xl font-black text-ui-text font-mono flex items-center gap-2">
                            {bottlesProduced.toLocaleString()}
                        </div>
                        <p className="text-[10px] text-ui-muted mt-1">Total Output</p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slide-right {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
                @keyframes slide-left {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-500%); }
                }
                .mask-fade {
                    mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
                }
            `}</style>
        </div>
    );
}
