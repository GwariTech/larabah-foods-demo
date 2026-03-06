import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

export default function FarmTelemetryDashboard() {
    const [soilMoisture, setSoilMoisture] = useState(68);
    const [temperature, setTemperature] = useState(24.5);
    const [tractors, setTractors] = useState([
        { id: 'T-42', x: 20, y: 30, active: true },
        { id: 'T-19', x: 70, y: 60, active: true },
        { id: 'H-01', x: 40, y: 80, active: false }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Jitter sensor data
            setSoilMoisture(prev => Math.min(100, Math.max(0, prev + (Math.random() * 2 - 1))));
            setTemperature(prev => Math.min(50, Math.max(0, prev + (Math.random() * 0.4 - 0.2))));

            // Move tractors slightly
            setTractors(prev => prev.map(t => {
                if (!t.active) return t;
                return {
                    ...t,
                    x: Math.min(95, Math.max(5, t.x + (Math.random() * 4 - 2))),
                    y: Math.min(95, Math.max(5, t.y + (Math.random() * 4 - 2)))
                };
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex flex-col animate-fade-in-up">
            <div className="flex justify-between items-center mb-6 z-10">
                <div>
                    <h3 className="text-lg font-bold text-ui-text flex items-center gap-2">
                        <LucideIcons.Map className="w-5 h-5 text-brand-secondary" />
                        Live Sector Mapping
                    </h3>
                    <p className="text-xs text-ui-muted">GPS Telemetry vs Automated Soil Sensors</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-xs text-ui-muted font-bold uppercase">Avg Moisture</p>
                        <p className="text-lg font-black text-blue-400">{soilMoisture.toFixed(1)}%</p>
                    </div>
                    <div className="w-px h-8 bg-ui-border"></div>
                    <div className="text-right">
                        <p className="text-xs text-ui-muted font-bold uppercase">Sector Temp</p>
                        <p className="text-lg font-black text-amber-500">{temperature.toFixed(1)}°C</p>
                    </div>
                </div>
            </div>

            {/* Simulated Satellite Map Grid */}
            <div className="flex-1 relative rounded-xl border border-ui-border bg-[#0a150a] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                {/* Sector Highlights */}
                <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 border border-brand-secondary/30 bg-brand-secondary/10 rounded pointer-events-none">
                    <span className="absolute -top-5 left-1 text-[10px] text-brand-secondary font-mono bg-[#0a150a] px-1">SECTOR A (IRRIGATING)</span>
                </div>
                <div className="absolute bottom-1/4 right-1/4 w-1/4 h-1/4 border border-amber-500/30 bg-amber-500/10 rounded pointer-events-none">
                    <span className="absolute -top-5 left-1 text-[10px] text-amber-500 font-mono bg-[#0a150a] px-1">SECTOR B (DRY)</span>
                </div>

                {/* Moving Tractors */}
                {tractors.map((t) => (
                    <div
                        key={t.id}
                        className="absolute transition-all duration-1000 ease-linear flex flex-col items-center justify-center"
                        style={{ left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <div className={`p-1.5 rounded-full ${t.active ? 'bg-brand-secondary text-[#0a150a] shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-ui-surface text-ui-muted'}`}>
                            <LucideIcons.Tractor className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[9px] font-bold font-mono mt-1 px-1 bg-ui-bg text-ui-text rounded border border-ui-border shadow-sm">{t.id}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
