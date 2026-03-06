import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WebsiteHome() {
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col pt-20">
            {/* High-Impact Hero Section */}
            <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-primary">
                {/* Simulated BG Video/Image Overlay with Parallax/Gradient */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-brand-primary/80 to-transparent z-10"></div>
                    {/* Placeholder for actual hero image/video, using a rich gradient for now */}
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1595856461942-0fdbd5e1ff83?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
                    <div className="max-w-2xl animate-fade-in-up">
                        <span className="inline-block py-1 px-3 rounded-full bg-brand-secondary/20 text-brand-secondary font-bold text-xs uppercase tracking-widest mb-6 border border-brand-secondary/50 backdrop-blur-sm">
                            Nigeria's Premier Agri-Food Enterprise
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
                            Nourishing the Nation. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-green-300">
                                Sustaining the Future.
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 mb-10 font-medium leading-relaxed max-w-xl">
                            From state-of-the-art agricultural farmlands to ultra-pure bottling facilities, Larabah Foods delivers unmatched quality at every step of the value chain.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate('/website/shop')}
                                className="px-8 py-4 bg-brand-secondary text-brand-primary font-black text-lg rounded-full hover:brightness-110 hover:shadow-[0_0_30px_rgba(139,197,63,0.4)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                Shop Products <LucideIcons.ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => navigate('/website/about')}
                                className="px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-full border border-white/20 hover:bg-white/20 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <LucideIcons.PlayCircle className="w-5 h-5" /> Our Story
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10 text-white/50">
                    <span className="text-xs font-bold uppercase tracking-widest">Discover</span>
                    <LucideIcons.ChevronDown className="w-5 h-5" />
                </div>
            </section>

            {/* Core Statistics Ribbon */}
            <section className="py-16 bg-white border-b border-slate-100 relative z-20 -mt-10 mx-6 lg:mx-auto max-w-7xl rounded-2xl shadow-2xl animate-fade-in-up-delay-1">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-8">
                    {[
                        { value: '5K+', label: 'Hectares Farmed' },
                        { value: '2M+', label: 'Bottles Daily' },
                        { value: '100%', label: 'Organic Process' },
                        { value: '1.2K', label: 'Local Jobs Created' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center group">
                            <h3 className="text-4xl md:text-5xl font-black text-brand-primary mb-2 group-hover:text-brand-secondary transition-colors duration-300">
                                {stat.value}
                            </h3>
                            <p className="text-sm font-bold text-slate-500 tracking-wide uppercase">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Highlight Divisions */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-brand-primary mb-4 tracking-tight">Two Divisions. One Standard of Excellence.</h2>
                        <p className="text-lg text-slate-600 font-medium">Larabah operates through two highly specialized divisions to ensure maximum quality control from source to consumer.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Farms Division */}
                        <div className="group rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col">
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2664&auto=format&fit=crop" alt="Larabah Farms" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="p-10 flex-1 flex flex-col">
                                <div className="p-3 bg-green-50 text-brand-secondary w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                    <LucideIcons.Leaf className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black text-brand-primary mb-4">Larabah Farms</h3>
                                <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                                    Utilizing cutting-edge agronomy and sustainable practices, our farms produce high-yield crops and premium livestock, supporting national food security targets.
                                </p>
                                <button className="text-brand-secondary font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-wide text-sm">
                                    Explore Farms <LucideIcons.ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Water Division */}
                        <div className="group rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col">
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <img src="https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=80&w=2788&auto=format&fit=crop" alt="Larabah Water" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="p-10 flex-1 flex flex-col">
                                <div className="p-3 bg-blue-50 text-blue-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                    <LucideIcons.Droplets className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black text-brand-primary mb-4">Larabah Water</h3>
                                <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                                    Our state-of-the-art purification and bottling plant guarantees 99.9% purity. Automated bottling lines ensure hygienic, untouched hydration for the masses.
                                </p>
                                <button className="text-blue-500 font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-wide text-sm">
                                    Explore Water <LucideIcons.ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Product Ribbon (e-commerce tease) */}
            <section className="py-24 bg-brand-primary text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-secondary via-brand-primary to-brand-primary"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Experience Pure Hydration.</h2>
                        <p className="text-lg text-slate-300 font-medium mb-8 max-w-lg leading-relaxed">
                            Order our premium bottled water directly to your doorstep. Enterprise logistics ensures same-day delivery across our major operating states.
                        </p>
                        <button
                            onClick={() => navigate('/website/shop')}
                            className="px-8 py-4 bg-white text-brand-primary font-black text-lg rounded-full hover:bg-brand-secondary transition-colors duration-300 shadow-xl"
                        >
                            Order Now
                        </button>
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-brand-secondary/20 blur-3xl rounded-full transform scale-150"></div>
                        <img src="https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=80&w=2788&auto=format&fit=crop" alt="Water Bottle" className="rounded-3xl shadow-2xl w-full max-w-md mx-auto relative z-10" />
                    </div>
                </div>
            </section>

            {/* Latest News Highlights */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-brand-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Media Center</span>
                            <h2 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tight">Latest News & Impact</h2>
                        </div>
                        <button className="hidden md:flex text-slate-500 hover:text-brand-primary font-bold items-center gap-2 transition-colors">
                            View All News <LucideIcons.ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { date: 'Oct 12, 2026', title: 'Larabah Commits ₦50M to Local Farmers in CSR Initiative', cat: 'Sustainability' },
                            { date: 'Sep 28, 2026', title: 'New Fully Automated Bottling Line Installed in Minna HQ', cat: 'Operations' },
                            { date: 'Sep 15, 2026', title: 'Q3 Yield Reports Exceed Predictions by 14.2%', cat: 'Financials' }
                        ].map((news, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="h-48 bg-slate-100 rounded-2xl mb-6 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors z-10"></div>
                                    <img src={`https://images.unsplash.com/photo-1595856461942-0fdbd5e1ff83?q=80&w=600&auto=format&fit=crop&sig=${i}`} alt="News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md uppercase tracking-wider">{news.cat}</span>
                                    <span className="text-sm font-medium text-slate-400">{news.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-brand-primary group-hover:text-brand-secondary transition-colors leading-snug">
                                    {news.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
