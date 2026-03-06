import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

export default function PublicLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(() => {
        const saved = localStorage.getItem('larabah_cart');
        return saved ? JSON.parse(saved).reduce((acc: number, item: any) => acc + item.qty, 0) : 0;
    });

    useEffect(() => {
        const handleCartUpdate = () => {
            const saved = localStorage.getItem('larabah_cart');
            setCartCount(saved ? JSON.parse(saved).reduce((acc: number, item: any) => acc + item.qty, 0) : 0);
        };
        window.addEventListener('cart_updated', handleCartUpdate);
        return () => window.removeEventListener('cart_updated', handleCartUpdate);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { title: 'Home', path: '/website' },
        { title: 'About Us', path: '/website/about' },
        { title: 'Farms', path: '/website/farms' },
        { title: 'Water', path: '/website/water' },
        { title: 'Shop', path: '/website/shop' },
    ];

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col selection:bg-brand-secondary selection:text-white transition-colors duration-500">
            {/* Global Corporate Header */}
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 py-3' : 'bg-transparent py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
                    {/* Brand Logo */}
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => navigate('/website')}
                    >
                        <img
                            src="/logo.png"
                            alt="Larabah Foods Logo"
                            className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === '/website'}
                                className={({ isActive }) =>
                                    `text-sm font-bold tracking-wide transition-colors duration-300 relative group ${isActive ? 'text-brand-primary' : 'text-slate-600 hover:text-brand-secondary'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.title}
                                        {/* Underline Indicator */}
                                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-secondary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}></span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Action Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className="text-slate-500 hover:text-brand-secondary transition-colors relative">
                            <LucideIcons.Search className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => navigate('/website/shop')}
                            className="text-slate-500 hover:text-brand-secondary transition-colors relative"
                        >
                            <LucideIcons.ShoppingCart className="w-5 h-5" />
                            <span className="absolute -top-1.5 -right-1.5 bg-brand-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                                {cartCount}
                            </span>
                        </button>
                        <button
                            onClick={() => navigate('/role/1/page/1')}
                            className="ml-4 px-5 py-2.5 bg-brand-primary text-white text-sm font-bold rounded-full hover:bg-slate-800 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 group"
                        >
                            <LucideIcons.Lock className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                            System Portal
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-slate-800 p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <LucideIcons.X className="w-6 h-6" /> : <LucideIcons.Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-lg pt-24 px-6 md:hidden flex flex-col font-bold text-xl gap-6 animate-fade-in-up">
                    {navLinks.map((link) => (
                        <NavLink key={link.path} to={link.path} className="text-brand-primary border-b border-slate-100 pb-2">
                            {link.title}
                        </NavLink>
                    ))}
                    <button
                        onClick={() => navigate('/role/1/page/1')}
                        className="mt-4 py-4 bg-brand-primary text-white text-center rounded-xl shadow-lg flex justify-center items-center gap-2"
                    >
                        <LucideIcons.Lock className="w-5 h-5" />
                        Enterprise Portal Login
                    </button>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 w-full flex flex-col">
                <Outlet />
            </main>

            {/* Global Corporate Footer */}
            <footer className="bg-brand-primary text-slate-300 py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1 border-r-0 md:border-r border-slate-700/50 pr-8">
                        <img src="/logo.png" alt="Larabah Foods Logo" className="h-12 w-auto mb-6 brightness-0 invert opacity-90" />
                        <p className="text-sm leading-relaxed mb-6 font-medium text-slate-400">
                            Pioneering agricultural innovation and pure hydration across West Africa. Quality from seed to bottle.
                        </p>
                        <div className="flex gap-4">
                            <button className="p-2 bg-slate-800/50 rounded-lg hover:bg-brand-secondary hover:text-white transition-colors text-slate-400"><LucideIcons.Twitter className="w-4 h-4" /></button>
                            <button className="p-2 bg-slate-800/50 rounded-lg hover:bg-brand-secondary hover:text-white transition-colors text-slate-400"><LucideIcons.Facebook className="w-4 h-4" /></button>
                            <button className="p-2 bg-slate-800/50 rounded-lg hover:bg-brand-secondary hover:text-white transition-colors text-slate-400"><LucideIcons.Instagram className="w-4 h-4" /></button>
                            <button className="p-2 bg-slate-800/50 rounded-lg hover:bg-brand-secondary hover:text-white transition-colors text-slate-400"><LucideIcons.Linkedin className="w-4 h-4" /></button>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wider text-sm uppercase">Our Divisions</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="#" className="hover:text-brand-secondary transition-colors">Larabah Farms</a></li>
                            <li><a href="#" className="hover:text-brand-secondary transition-colors">Larabah Water</a></li>
                            <li><a href="#" className="hover:text-brand-secondary transition-colors">Larabah Logistics</a></li>
                            <li><a href="#" className="hover:text-brand-secondary transition-colors">Retail Store</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wider text-sm uppercase">Quick Links</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="#" className="hover:text-brand-secondary transition-colors">About the Company</a></li>
                            <li><a href="#" className="hover:text-brand-secondary transition-colors">Careers & HR</a></li>
                            <li><a href="#" className="hover:text-brand-secondary transition-colors">Sustainability Report</a></li>
                            <li><a href="#" className="hover:text-brand-secondary transition-colors">Investor Relations</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wider text-sm uppercase">Contact Us</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-400">
                            <li className="flex items-start gap-3">
                                <LucideIcons.MapPin className="w-5 h-5 text-brand-secondary shrink-0" />
                                <span>No. 12 Larabah Boulevard, Minna, Niger State, Nigeria</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <LucideIcons.Phone className="w-5 h-5 text-brand-secondary shrink-0" />
                                <span>+234 800 LARABAH</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <LucideIcons.Mail className="w-5 h-5 text-brand-secondary shrink-0" />
                                <span>contact@larabahfoods.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium">
                    <p>&copy; {new Date().getFullYear()} Larabah Foods Enterprise. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
