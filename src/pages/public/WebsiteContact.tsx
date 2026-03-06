import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';

export default function WebsiteContact() {
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            alert('Your message has been securely transmitted to Larabah Corporate HQ.');
            setSubmitting(false);
        }, 1500);
    };

    return (
        <div className="w-full flex flex-col pt-24 bg-slate-50 min-h-screen">

            <div className="bg-brand-primary text-white py-16 text-center animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-black mb-4">Get in Touch</h1>
                <p className="text-slate-300 font-medium max-w-xl mx-auto">We operate multi-channel support lines for enterprise orders, farm inquiries, and general assistance.</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 w-full flex flex-col md:flex-row gap-16 relative -mt-8 z-10">

                {/* Contact Information */}
                <div className="flex-1 space-y-8 animate-fade-in-up-delay-1">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                        <h3 className="text-2xl font-black text-brand-primary mb-6">Corporate Headquarters</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-xl">
                                    <LucideIcons.MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="block font-bold text-slate-800">Address</span>
                                    <span className="text-slate-500">No. 12 Larabah Boulevard, Minna, Niger State, Nigeria</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-xl">
                                    <LucideIcons.Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="block font-bold text-slate-800">Enterprise Sales</span>
                                    <span className="text-slate-500">+234 800 LARABAH</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-xl">
                                    <LucideIcons.Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="block font-bold text-slate-800">Email</span>
                                    <span className="text-slate-500">contact@larabahfoods.com</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Secure Contact Form */}
                <div className="flex-1 animate-fade-in-up-delay-2">
                    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-2xl flex flex-col gap-6">
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Send a Message</h3>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">First Name</label>
                                <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-primary transition-colors text-slate-800" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Last Name</label>
                                <input type="text" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-primary transition-colors text-slate-800" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                            <input type="email" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-primary transition-colors text-slate-800" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Inquiry Department</label>
                            <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-primary transition-colors text-slate-800">
                                <option>Larabah Farms (Bulk Orders)</option>
                                <option>Larabah Water (Distribution)</option>
                                <option>General Information</option>
                                <option>Careers & HR</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Message</label>
                            <textarea rows={4} required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-primary transition-colors text-slate-800 resize-none"></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full mt-4 py-4 bg-brand-primary text-white font-black rounded-xl hover:bg-slate-800 transition-colors shadow-lg flex justify-center items-center gap-2 group disabled:opacity-70"
                        >
                            {submitting ? <LucideIcons.Loader2 className="w-5 h-5 animate-spin" /> : 'Transmit Securely'}
                            {!submitting && <LucideIcons.Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
