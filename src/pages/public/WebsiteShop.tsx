import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

// Simulated Branded Product Database
const PRODUCTS = [
    { id: 'W1', name: 'Larabah Premium Table Water (750ml x 12)', price: 4500, category: 'Water', img: '/images/shop/water_bottle.png' },
    { id: 'W2', name: 'Larabah Dispenser Refill (19L)', price: 1200, category: 'Water', img: '/images/shop/dispenser.png' },
    { id: 'F1', name: 'Premium Rice Grains (50kg Bag)', price: 78500, category: 'Farms', img: '/images/shop/rice.png' },
    { id: 'F2', name: 'Organic Maize Bulk (Per Ton)', price: 450000, category: 'Farms', img: '/images/shop/maize.png' },
    { id: 'F3', name: 'A-Grade Sorghum Grain (100kg)', price: 95000, category: 'Farms', img: '/images/shop/sorghum.png' },
    { id: 'L1', name: 'Day-Old Chicks (Carton of 50)', price: 45000, category: 'Livestock', img: '/images/shop/chicks.png' }
];

export default function WebsiteShop() {
    const [cart, setCart] = useState<any[]>(() => {
        const saved = localStorage.getItem('larabah_cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('larabah_cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cart_updated'));
    }, [cart]);
    const [cartOpen, setCartOpen] = useState(false);
    const [filter, setFilter] = useState('All');
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    // Format currency
    const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;

    // Add to Cart Logic
    const addToCart = (product: any) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
        setCartOpen(true);
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const filteredProducts = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

    const handleMockCheckout = () => {
        setIsCheckingOut(true);
        setTimeout(() => {
            alert('Payment Successful! Tracking ID: LRB-' + Math.floor(Math.random() * 999999));
            setCart([]);
            setIsCheckingOut(false);
            setCartOpen(false);
        }, 2000);
    };

    return (
        <div className="w-full flex flex-col pt-24 bg-slate-50 min-h-screen relative overflow-hidden">

            {/* Storefront Header */}
            <div className="bg-brand-primary py-16 text-white text-center rounded-b-[3rem] shadow-2xl relative z-10 mx-4 lg:mx-8 mb-12">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-secondary/20 via-transparent to-transparent opacity-60 rounded-b-[3rem]"></div>
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight relative z-10 animate-fade-in-up">Larabah Storefront</h1>
                <p className="text-slate-300 font-medium max-w-xl mx-auto relative z-10 animate-fade-in-up-delay-1">Source premium quality hydration and agricultural supplies directly from our facilities. Delivered nationwide.</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-12 pb-24 relative z-10">

                {/* Sticky Filter Sidebar */}
                <aside className="w-full lg:w-64 shrink-0">
                    <div className="sticky top-32 bg-white rounded-2xl border border-slate-200 p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-secondary/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <h3 className="text-lg font-black text-brand-primary mb-6 uppercase tracking-wider flex items-center justify-between">
                            Categories
                            <LucideIcons.ListFilter className="w-5 h-5 text-brand-secondary" />
                        </h3>
                        <div className="space-y-2">
                            {['All', 'Water', 'Farms', 'Livestock'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all duration-300 ${filter === cat
                                        ? 'bg-brand-primary text-white shadow-md translate-x-2'
                                        : 'text-slate-500 hover:bg-slate-100 hover:text-brand-primary hover:translate-x-1'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Product Grid Area */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-800">
                            {filter} Products <span className="text-slate-400 font-medium text-lg ml-2">({filteredProducts.length} items)</span>
                        </h2>

                        {/* Mobile Cart Trigger */}
                        <button
                            onClick={() => setCartOpen(true)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm font-bold text-brand-primary"
                        >
                            <LucideIcons.ShoppingCart className="w-5 h-5" />
                            {cart.length}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredProducts.map((product, idx) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-500 ease-out flex flex-col animate-fade-in-up"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {/* Image Container */}
                                <div className="h-48 overflow-hidden relative bg-slate-100">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors duration-500 z-10"></div>
                                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-brand-primary rounded-full shadow-md z-20">
                                        {product.category}
                                    </span>
                                </div>

                                {/* Product Details */}
                                <div className="p-6 flex-1 flex flex-col justify-between relative bg-white cursor-pointer" onClick={() => setSelectedProduct(product)}>
                                    {/* Accent Glow underneath */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-secondary to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg leading-snug mb-2 group-hover:text-brand-primary transition-colors">{product.name}</h3>
                                        <p className="text-2xl font-black text-brand-primary mb-6">{formatNaira(product.price)}</p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                            className="flex-1 py-3.5 bg-slate-50 text-brand-primary font-bold rounded-xl border border-slate-200 hover:bg-brand-secondary hover:text-brand-bg hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 shadow-sm focus:outline-none"
                                        >
                                            <LucideIcons.Plus className="w-5 h-5" /> Add
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                                            className="px-4 py-3.5 bg-slate-100 text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-200 transition-all duration-300 flex items-center justify-center shadow-sm focus:outline-none"
                                            title="View Details"
                                        >
                                            <LucideIcons.Eye className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sliding Cart Drawer Overlay */}
            {cartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Dark Backdrop */}
                    <div
                        className="absolute inset-0 bg-brand-primary/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setCartOpen(false)}
                    ></div>

                    {/* Drawer Panel */}
                    <div className="w-full max-w-md bg-white h-full relative z-10 shadow-2xl flex flex-col animate-[slide-in-right_0.4s_ease-out]">

                        {/* Drawer Header */}
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-brand-primary text-white">
                            <h2 className="text-2xl font-black flex items-center gap-3">
                                <LucideIcons.ShoppingCart className="w-6 h-6 text-brand-secondary" />
                                Your Order
                            </h2>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <LucideIcons.X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 bg-slate-50 custom-scrollbar">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                                    <LucideIcons.ShoppingBag className="w-16 h-16 opacity-20" />
                                    <p className="font-bold text-lg">Your cart is empty.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group">
                                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                                                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col">
                                                <h4 className="font-bold text-slate-800 text-sm mb-1 leading-tight">{item.name}</h4>
                                                <div className="flex justify-between items-end mt-auto">
                                                    <p className="font-black text-brand-primary relative">
                                                        {formatNaira(item.price)}
                                                        <span className="text-xs text-slate-400 font-bold ml-1">x{item.qty}</span>
                                                    </p>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                                                    >
                                                        <LucideIcons.Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Drawer Footer & Checkout */}
                        {cart.length > 0 && (
                            <div className="p-6 bg-white border-t border-slate-100 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-slate-500 font-bold uppercase tracking-wider text-sm">Total Estimation</span>
                                    <span className="text-3xl font-black text-brand-primary">{formatNaira(cartTotal)}</span>
                                </div>

                                <button
                                    onClick={handleMockCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full relative overflow-hidden group py-4 rounded-xl flex items-center justify-center font-black text-lg text-brand-primary shadow-xl hover:shadow-2xl transition-all disabled:opacity-70"
                                >
                                    <div className="absolute inset-0 bg-brand-secondary"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary via-green-400 to-brand-secondary bg-[length:200%_auto] animate-[gradient_2s_linear_infinite]"></div>
                                    <span className="relative z-10 flex items-center gap-2">
                                        {isCheckingOut ? (
                                            <><LucideIcons.Loader2 className="w-6 h-6 animate-spin" /> Processing...</>
                                        ) : (
                                            <>Checkout <LucideIcons.ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></>
                                        )}
                                    </span>
                                </button>
                                <p className="text-center text-xs text-slate-400 mt-4 font-medium flex items-center justify-center gap-1">
                                    <LucideIcons.Lock className="w-3 h-3" /> Secure B2B/B2C Encrypted Form
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Advanced Product Details Slide-Out Drawer */}
            {selectedProduct && (
                <div className="fixed inset-0 z-[60] flex justify-center sm:justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedProduct(null)}
                    ></div>

                    {/* Drawer Panel */}
                    <div className="w-full max-w-2xl bg-white h-full relative z-10 shadow-2xl flex flex-col animate-[slide-in-right_0.4s_ease-out] overflow-y-auto custom-scrollbar">

                        <div className="absolute top-4 right-4 z-50">
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="p-2 bg-white/80 hover:bg-white backdrop-blur rounded-full text-slate-800 shadow-lg transition-transform hover:scale-110"
                            >
                                <LucideIcons.X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Immersive 3D Tilt Image Header */}
                        <div
                            className="h-80 sm:h-96 bg-slate-100 relative overflow-hidden flex items-center justify-center"
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                const centerX = rect.width / 2;
                                const centerY = rect.height / 2;
                                const rotateX = ((y - centerY) / centerY) * -10;
                                const rotateY = ((x - centerX) / centerX) * 10;
                                const img = e.currentTarget.querySelector('img');
                                if (img) img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                            }}
                            onMouseLeave={(e) => {
                                const img = e.currentTarget.querySelector('img');
                                if (img) img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                            }}
                        >
                            <img
                                src={selectedProduct.img}
                                alt={selectedProduct.name}
                                className="w-full h-full object-cover transition-transform duration-300 ease-out"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                        </div>

                        {/* Content Area */}
                        <div className="px-8 pb-12 pt-4 flex-1">
                            <span className="inline-block px-3 py-1 bg-brand-secondary/10 text-brand-secondary font-bold text-xs uppercase tracking-wider rounded-full mb-4">
                                Larabah {selectedProduct.category}
                            </span>

                            <h2 className="text-3xl font-black text-slate-800 mb-2 leading-tight">{selectedProduct.name}</h2>
                            <div className="flex items-center gap-4 mb-8">
                                <p className="text-3xl font-black text-brand-primary">{formatNaira(selectedProduct.price)}</p>
                                <div className="flex items-center gap-1 text-amber-400">
                                    <LucideIcons.Star className="w-5 h-5 fill-current" />
                                    <LucideIcons.Star className="w-5 h-5 fill-current" />
                                    <LucideIcons.Star className="w-5 h-5 fill-current" />
                                    <LucideIcons.Star className="w-5 h-5 fill-current" />
                                    <LucideIcons.StarHalf className="w-5 h-5 fill-current" />
                                    <span className="text-sm font-bold text-slate-500 ml-1">(128 Reviews)</span>
                                </div>
                            </div>

                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                Sourced directly from our enterprise-grade facilities, undergoing rigorous QA checks to ensure 99.9% purity and premium quality standard delivery directly to your business or home.
                            </p>

                            {/* Purchase Modifiers */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <LucideIcons.CalendarClock className="w-5 h-5 text-brand-secondary" />
                                    Delivery Options
                                </h3>

                                <label className="flex items-start gap-4 p-4 border border-brand-secondary bg-brand-secondary/5 rounded-xl cursor-pointer mb-3 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-brand-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                                    <input type="radio" name="delivery" className="mt-1 text-brand-secondary focus:ring-brand-secondary" defaultChecked />
                                    <div className="relative z-10">
                                        <p className="font-bold text-slate-800 flex items-center gap-2">One-time Purchase</p>
                                        <p className="text-sm text-slate-500 mt-1">Standard delivery within 3-5 business days.</p>
                                    </div>
                                </label>

                                <label className="flex items-start gap-4 p-4 border border-slate-200 hover:border-brand-secondary bg-white rounded-xl cursor-pointer transition-colors relative overflow-hidden group">
                                    <input type="radio" name="delivery" className="mt-1 text-brand-secondary focus:ring-brand-secondary" />
                                    <div className="relative z-10">
                                        <p className="font-bold text-slate-800 flex items-center gap-2">
                                            Subscribe & Save 10%
                                            <span className="bg-amber-100 text-amber-700 text-[10px] uppercase font-black px-2 py-0.5 rounded-full">Best Value</span>
                                        </p>
                                        <p className="text-sm text-slate-500 mt-1">Monthly recurring delivery. Cancel anytime.</p>
                                    </div>
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <button
                                onClick={() => {
                                    addToCart(selectedProduct);
                                    setSelectedProduct(null);
                                }}
                                className="w-full py-4 bg-brand-primary text-white font-black text-lg rounded-xl shadow-xl hover:shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
                            >
                                <LucideIcons.ShoppingBag className="w-6 h-6" />
                                Add to Order - {formatNaira(selectedProduct.price)}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
