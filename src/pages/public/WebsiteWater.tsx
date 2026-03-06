import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WebsiteWater() {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col pt-24 bg-white">
            <section className="bg-blue-50 py-24 border-b border-blue-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center animate-fade-in-up">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white rounded-2xl border border-blue-100 shadow-inner">
                            <LucideIcons.Droplets className="w-12 h-12 text-blue-500" />
                        </div>
                    </div>
                    <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">Unmatched Purity</span>
                    <h1 className="text-5xl md:text-6xl font-black text-brand-primary mb-6 tracking-tight">Larabah Water</h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium mb-8">
                        The gold standard in hydration. Our automated bottling lines utilize reverse osmosis and UV purification to deliver 99.9% pure drinking water.
                    </p>
                    <button
                        onClick={() => navigate('/website/shop')}
                        className="px-8 py-3 bg-blue-500 text-white font-extrabold rounded-full hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all"
                    >
                        Order Water Wholesale
                    </button>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-16 items-center">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-3xl font-black text-brand-primary">The 7-Step Purification Pipeline</h2>
                        <ul className="space-y-6">
                            {[
                                'Deep Aquifer Extraction via Stainless Steel Boreholes.',
                                'Multi-Media Organic Filtration.',
                                'Carbon Neutralization and Deodorization.',
                                'Precision Reverse Osmosis.',
                                'Ozone Injection for sterilization.',
                                'Ultraviolet (UV) Light Treatment.',
                                'Automated Untouched Bottling & Capping.'
                            ].map((step, i) => (
                                <li key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                                        {i + 1}
                                    </div>
                                    <p className="font-medium text-slate-700 pt-1">{step}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-blue-500/20 blur-3xl transform scale-110"></div>
                        <img src="https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=80&w=2788&auto=format&fit=crop" alt="Bottling Line" className="rounded-3xl shadow-2xl relative z-10 w-full h-[600px] object-cover" />
                    </div>
                </div>
            </section>
        </div>
    );
}
