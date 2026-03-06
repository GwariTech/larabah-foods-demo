import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import Modal from '../components/Modal';

interface ViewProps {
    role: any;
    page: any;
}

export default function GenericView({ role, page }: ViewProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, [page.id]);

    const PageIcon = LucideIcons[page.icon as keyof typeof LucideIcons] as React.ElementType || LucideIcons.FileText;

    // Simulate 10 rows of highly detailed mock data to give the "wow" data-grid feeling
    const mockData = Array.from({ length: 8 }).map((_, i) => ({
        id: `LRB-${Math.floor(Math.random() * 10000)}`,
        status: ['Active', 'Pending', 'Completed', 'Error'][Math.floor(Math.random() * 4)],
        date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
        operator: ['Aminu Kano', 'Fatima Bello', 'Chidi Okafor', 'System Auto'][Math.floor(Math.random() * 4)],
        value: `₦${(Math.random() * 500).toFixed(2)}k`,
        progress: Math.floor(Math.random() * 100)
    }));

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-brand-secondary/20 text-brand-secondary border-brand-secondary/50';
            case 'Completed': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
            case 'Error': return 'bg-red-500/20 text-red-500 border-red-500/50';
            default: return 'bg-amber-500/20 text-amber-500 border-amber-500/50';
        }
    };

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-24 rounded-2xl bg-ui-surface border border-ui-border"></div>
                <div className="h-16 rounded-2xl bg-ui-surface border border-ui-border"></div>
                <div className="h-96 rounded-2xl bg-ui-surface border border-ui-border"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in-up">

            {/* Page Header Area */}
            <div className="bg-ui-card rounded-2xl border border-ui-border p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-ui-surface rounded-xl border border-ui-border text-brand-secondary shadow-inner">
                        <PageIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-ui-text tracking-tight mb-1">{page.title}</h2>
                        <p className="text-ui-muted text-sm font-medium">{page.description}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-ui-surface border border-ui-border text-ui-text font-bold text-sm rounded-lg hover:bg-ui-card transition-colors shadow-sm">
                        <LucideIcons.Download className="w-4 h-4 text-ui-muted" /> Export
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-secondary text-brand-bg font-extrabold text-sm rounded-lg hover:brightness-110 transition-all shadow-md shadow-brand-secondary/20"
                    >
                        <LucideIcons.Plus className="w-4 h-4" /> New Entry
                    </button>
                </div>
            </div>

            {/* KPI Summary Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up-delay-1">
                {[
                    { label: 'Total Records', val: '1,248' },
                    { label: 'Pending Action', val: '14' },
                    { label: 'Success Rate', val: '98.2%' },
                    { label: 'This Month', val: '+12%' }
                ].map((kpi, i) => (
                    <div key={i} className="bg-ui-card p-4 rounded-xl border border-ui-border shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="text-xs font-bold text-ui-muted uppercase tracking-wider mb-1">{kpi.label}</span>
                        <span className="text-xl font-black text-ui-text">{kpi.val}</span>
                    </div>
                ))}
            </div>

            {/* Data Grid Area */}
            <div className="bg-ui-card rounded-2xl border border-ui-border shadow-lg overflow-hidden animate-fade-in-up-delay-2 flex flex-col">
                {/* Grid Toolbar */}
                <div className="p-4 border-b border-ui-border bg-ui-surface/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-72">
                        <LucideIcons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ui-muted" />
                        <input
                            type="text"
                            placeholder="Search records..."
                            className="w-full bg-ui-surface border border-ui-border text-ui-text text-sm rounded-lg pl-9 pr-4 py-2 placeholder-ui-muted focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all shadow-inner"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-ui-surface border border-ui-border text-ui-muted rounded-lg hover:text-ui-text transition-colors">
                            <LucideIcons.Filter className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-ui-surface border border-ui-border text-ui-muted rounded-lg hover:text-ui-text transition-colors">
                            <LucideIcons.SlidersHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Desktop Grid Table (Hidden on Mobile/Tablet) */}
                <div className="hidden lg:block w-full">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-ui-surface border-b border-ui-border text-xs uppercase tracking-wider text-ui-muted font-bold">
                                <th className="px-6 py-4">Reference ID</th>
                                <th className="px-6 py-4">Date Logged</th>
                                <th className="px-6 py-4">Operator / Assigned</th>
                                <th className="px-6 py-4">Value Metric</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Completion</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {mockData.map((row, i) => (
                                <tr key={i} className="border-b border-ui-border/50 hover:bg-ui-surface cursor-pointer transition-colors group">
                                    <td className="px-6 py-4 font-bold text-ui-text group-hover:text-brand-secondary transition-colors">{row.id}</td>
                                    <td className="px-6 py-4 text-ui-muted font-medium">{row.date}</td>
                                    <td className="px-6 py-4 font-medium text-ui-text flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-ui-surface border border-ui-border flex items-center justify-center text-[10px] font-bold text-brand-secondary">
                                            {row.operator.charAt(0)}
                                        </div>
                                        {row.operator}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-ui-text">{row.value}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${getStatusColor(row.status)}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-ui-surface rounded-full overflow-hidden border border-ui-border shadow-inner">
                                                <div className="h-full bg-brand-secondary" style={{ width: `${row.progress}%` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-ui-muted">{row.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-ui-muted hover:text-brand-secondary transition-colors">
                                            <LucideIcons.MoreVertical className="w-5 h-5 ml-auto" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile/Tablet Card View (Replaces Horizontal Scroll) */}
                <div className="lg:hidden flex flex-col divide-y divide-ui-border/50">
                    {mockData.map((row, i) => (
                        <div key={`mobile-${i}`} className="p-5 flex flex-col gap-4 hover:bg-ui-surface transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-lg text-ui-text group-hover:text-brand-secondary transition-colors mb-1">{row.id}</h4>
                                    <span className="text-xs text-ui-muted font-medium">{row.date}</span>
                                </div>
                                <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md border ${getStatusColor(row.status)}`}>
                                    {row.status}
                                </span>
                            </div>

                            <div className="flex justify-between items-center bg-ui-surface/50 p-3 rounded-xl border border-ui-border">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-ui-surface border border-ui-border flex items-center justify-center text-[10px] font-bold text-brand-secondary shadow-sm">
                                        {row.operator.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-ui-muted uppercase tracking-wider">Operator</span>
                                        <span className="text-xs font-bold text-ui-text">{row.operator}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-bold text-ui-muted uppercase tracking-wider">Metric Value</span>
                                    <span className="text-sm font-black text-ui-text">{row.value}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-ui-muted uppercase tracking-wider w-16">Progress</span>
                                <div className="flex-1 h-2 bg-ui-surface rounded-full overflow-hidden border border-ui-border shadow-inner">
                                    <div className="h-full bg-brand-secondary transition-all" style={{ width: `${row.progress}%` }}></div>
                                </div>
                                <span className="text-xs font-black text-ui-text w-8 text-right">{row.progress}%</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-ui-border bg-ui-surface/30 flex justify-between items-center text-xs font-medium text-ui-muted">
                    <span>Showing 1 to 8 of 1,248 entries</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1.5 border border-ui-border rounded hover:bg-ui-surface transition-colors disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1.5 border border-brand-secondary bg-brand-secondary/20 text-brand-secondary rounded font-bold">1</button>
                        <button className="px-3 py-1.5 border border-ui-border rounded hover:bg-ui-surface transition-colors">2</button>
                        <button className="px-3 py-1.5 border border-ui-border rounded hover:bg-ui-surface transition-colors">3</button>
                        <button className="px-3 py-1.5 border border-ui-border rounded hover:bg-ui-surface transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Modular Interactive Workflow Example */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Create New ${page.title} Entry`}>
                <div className="space-y-4">
                    <p className="text-sm text-ui-muted mb-4">Complete the form below to generate a new record within the <strong>{page.title}</strong> module. Certain fields are restricted based on your role.</p>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-ui-muted uppercase tracking-wider">Record Priority</label>
                        <select className="w-full bg-ui-surface border border-ui-border text-ui-text text-sm rounded-lg p-2.5 outline-none focus:border-brand-secondary transition-colors cursor-pointer text-white">
                            <option>Standard Priority</option>
                            <option>High Priority (Expedited)</option>
                            <option>Critical Action</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-ui-muted uppercase tracking-wider">Internal Remarks</label>
                        <textarea
                            rows={4}
                            className="w-full bg-ui-surface border border-ui-border text-ui-text text-sm rounded-lg p-3 outline-none focus:border-brand-secondary transition-colors resize-none placeholder-ui-muted"
                            placeholder="Enter detailed contextual notes for this entry..."
                        ></textarea>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-ui-border mt-6">
                        <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-bold text-ui-muted hover:text-ui-text transition-colors">
                            Cancel
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-brand-secondary text-brand-bg font-extrabold text-sm rounded-lg hover:brightness-110 shadow-md shadow-brand-secondary/20 transition-all">
                            Submit Record
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
