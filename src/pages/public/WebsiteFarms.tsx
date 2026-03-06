import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WebsiteFarms() {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col pt-24 bg-white">
            <section className="bg-slate-50 py-24 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center animate-fade-in-up">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-green-50 rounded-2xl border border-green-100 shadow-inner">
                            <LucideIcons.Leaf className="w-12 h-12 text-brand-secondary" />
                        </div>
                    </div>
                    <span className="text-brand-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Agricultural Excellence</span>
                    <h1 className="text-5xl md:text-6xl font-black text-brand-primary mb-6 tracking-tight">Larabah Farms</h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium mb-8">
                        Over 5,000 hectares of precision-farmed land dedicated to sustainable crop production and advanced livestock management.
                    </p>
                    <button
                        onClick={() => navigate('/website/shop')}
                        className="px-8 py-3 bg-brand-secondary text-brand-bg font-extrabold rounded-full hover:brightness-110 shadow-lg shadow-brand-secondary/30 transition-all"
                    >
                        Buy Farm Produce
                    </button>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            { title: 'Row Crop Production', desc: 'High-yield Maize, Rice, and Sorghum cultivated using GPS-guided tractors and precision pivot irrigation.', icon: 'Tractor' },
                            { title: 'Poultry & Livestock', desc: 'State-of-the-art climate-controlled housing for thousands of broilers and layers, ensuring maximum animal welfare and yield.', icon: 'Bird' },
                            { title: 'Organic Fertilization', desc: 'Closing the loop by converting livestock waste into nutrient-dense organic fertilizers to feed our soils.', icon: 'Recycle' }
                        ].map((feature, i) => {
                            const IconComponent = LucideIcons[feature.icon as keyof typeof LucideIcons] as React.ElementType || LucideIcons.Check;
                            return (
                                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl hover:-translate-y-2 transition-transform duration-300">
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200 mb-6 group-hover:bg-brand-secondary group-hover:border-transparent transition-colors">
                                        <IconComponent className="w-7 h-7 text-brand-secondary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-brand-primary mb-4">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed font-medium">{feature.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-brand-primary text-white py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center justify-center text-center">
                    <h2 className="text-4xl font-black mb-8">Farm-to-Table Logistics</h2>
                    <p className="text-lg text-slate-300 max-w-2xl mb-12">
                        We don't just grow the food; we own the supply chain. Our fleet of refrigerated trucks ensures that produce leaves the farm and reaches the markets within 24 hours.
                    </p>
                    <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2670&auto=format&fit=crop" alt="Logistics" className="w-full max-w-4xl h-96 object-cover rounded-3xl shadow-2xl opacity-90 border-4 border-white/10" />
                </div>
            </section>
        </div>
    );
}
