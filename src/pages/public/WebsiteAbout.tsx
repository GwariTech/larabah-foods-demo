import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function WebsiteAbout() {
    return (
        <div className="w-full flex flex-col pt-24 bg-white">
            {/* Header Area */}
            <section className="bg-slate-50 py-20 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center animate-fade-in-up">
                    <span className="text-brand-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Corporate History</span>
                    <h1 className="text-5xl md:text-6xl font-black text-brand-primary mb-6 tracking-tight">About Larabah Foods</h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
                        Rooted in tradition, powered by innovation. We are dedicated to redefining the agricultural and hydration landscape of Nigeria.
                    </p>
                </div>
            </section>

            {/* Content Body */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative animate-fade-in-up-delay-1">
                        <div className="absolute inset-0 bg-brand-secondary/20 rounded-3xl translate-x-4 translate-y-4"></div>
                        <img
                            src="https://images.unsplash.com/photo-1595856461942-0fdbd5e1ff83?q=80&w=2670&auto=format&fit=crop"
                            alt="Farming Fields"
                            className="rounded-3xl shadow-2xl relative z-10 w-full h-auto object-cover"
                        />
                    </div>

                    <div className="animate-fade-in-up-delay-2">
                        <h2 className="text-3xl font-black text-brand-primary mb-6">Our Mission & Vision</h2>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Our Mission</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            To deliver premium quality, sustainably sourced agricultural products and ultra-pure drinking water to every household, ensuring food security and health across the region through advanced operational excellence.
                        </p>

                        <h3 className="text-xl font-bold text-slate-800 mb-2">Our Vision</h3>
                        <p className="text-slate-600 mb-10 leading-relaxed">
                            To become the undisputed market leader in West African FMCG and agribusiness, recognized globally for our commitment to quality, community empowerment, and environmental stewardship.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <LucideIcons.ShieldCheck className="w-8 h-8 text-brand-secondary mb-3" />
                                <h4 className="font-bold text-brand-primary mb-1">Quality Guaranteed</h4>
                                <p className="text-sm text-slate-500">ISO 9001 certified facilities.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <LucideIcons.Globe className="w-8 h-8 text-brand-secondary mb-3" />
                                <h4 className="font-bold text-brand-primary mb-1">Sustainable Focus</h4>
                                <p className="text-sm text-slate-500">Zero-waste pipeline goals by 2030.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Placeholder */}
            <section className="bg-brand-primary py-24 text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-black mb-16">Executive Leadership</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                        <div className="flex flex-col items-center group">
                            <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-white/10 group-hover:border-brand-secondary transition-colors">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" alt="CEO" className="w-full h-full object-cover" />
                            </div>
                            <h4 className="text-xl font-bold">Abdulbaki Ebbo</h4>
                            <p className="text-brand-secondary font-medium tracking-wide text-sm uppercase">Chief Executive Officer</p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-white/10 group-hover:border-brand-secondary transition-colors">
                                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" alt="VP Farms" className="w-full h-full object-cover" />
                            </div>
                            <h4 className="text-xl font-bold">A. Ibrahim</h4>
                            <p className="text-brand-secondary font-medium tracking-wide text-sm uppercase">VP, Larabah Farms</p>
                        </div>
                        <div className="flex flex-col items-center group">
                            <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-white/10 group-hover:border-brand-secondary transition-colors">
                                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop" alt="VP Water" className="w-full h-full object-cover" />
                            </div>
                            <h4 className="text-xl font-bold">S. Olatunbosun</h4>
                            <p className="text-brand-secondary font-medium tracking-wide text-sm uppercase">VP, Larabah Water</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
