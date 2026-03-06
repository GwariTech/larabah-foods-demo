import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import FarmTelemetryDashboard from '../components/telemetry/FarmTelemetryDashboard';
import WaterTelemetryDashboard from '../components/telemetry/WaterTelemetryDashboard';

interface ViewProps {
    role: any;
    page: any;
}

export default function DashboardOverview({ role, page }: ViewProps) {
    const [loading, setLoading] = useState(true);

    // Simulate network fetch
    React.useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, [page.id, role.id]);

    // 3D Parallax Event Handler
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    // Dynamic content generator based on Role ID
    const getRoleDashboardContent = () => {
        const baseGreeting = () => {
            const hour = new Date().getHours();
            if (hour < 12) return 'Good morning';
            if (hour < 18) return 'Good afternoon';
            return 'Good evening';
        };

        // CEO Dynamic Content
        if (role.id === '1') {
            return {
                greeting: `${baseGreeting()}, Executive.`,
                subtitle: 'Enterprise Consolidated View across Farms and Water divisions.',
                stats: [
                    { title: 'Total Enterprise Revenue', value: '₦84.2M', trend: '+15.4%', icon: 'TrendingUp', color: 'text-brand-secondary' },
                    { title: 'Global Headcount', value: '412', trend: '+12', icon: 'Users', color: 'text-brand-accent' },
                    { title: 'Pending Executive Approvals', value: '4', trend: 'Action Required', icon: 'AlertCircle', color: 'text-red-500' },
                    { title: 'Division Performance (F/W)', value: '60/40', trend: '+2% Farms', icon: 'PieChart', color: 'text-blue-500' },
                ],
                chartTitle: 'Consolidated Global Revenue (30 Days)',
                action1: 'Review CAPEX Requests',
                action2: 'Generate Investor Report',
                status: 'Enterprise Systems Optimal',
                activities: [
                    { log: 'Q3 Farm Yield Report Submitted', time: '10 mins ago', icon: 'FileText' },
                    { log: 'Line 2 Bottling Maintenance Scheduled', time: '1 hr ago', icon: 'Wrench' },
                    { log: 'New Hire: Operations Manager', time: '3 hrs ago', icon: 'UserPlus' },
                ]
            };
        }

        // Farm Manager Dynamic Content
        if (role.id === '2') {
            return {
                greeting: `Welcome back, Farm Operations Manager.`,
                subtitle: 'Real-time overview of Larabah Farms production and livestock.',
                stats: [
                    { title: 'Daily Yield (Tons)', value: '12.4', trend: '+1.2%', icon: 'Tractor', color: 'text-brand-secondary' },
                    { title: 'Livestock Health Index', value: '98%', trend: 'Stable', icon: 'Activity', color: 'text-brand-accent' },
                    { title: 'Feed Inventory Status', value: '14 Days', trend: 'Order Soon', icon: 'AlertTriangle', color: 'text-amber-500' },
                    { title: 'Staff on Shift', value: '45/48', trend: '3 Absent', icon: 'Users', color: 'text-blue-500' },
                ],
                chartTitle: 'Harvest Output Volume',
                action1: 'Assign Daily Tasks',
                action2: 'Order Feed Supplies',
                status: 'All Tractors Operational',
                activities: [
                    { log: 'Tractor A2 Fueled and Dispatched', time: '5 mins ago', icon: 'Truck' },
                    { log: 'Veterinary Check: Sector 4 Clear', time: '45 mins ago', icon: 'CheckCircle' },
                    { log: 'Fertilizer Delivery Received', time: '2 hrs ago', icon: 'Box' },
                ]
            };
        }

        // Water Manager Dynamic Content
        if (role.id === '3') {
            return {
                greeting: `Shift overview, Plant Manager.`,
                subtitle: 'Monitoring Larabah Water purification and bottling metrics.',
                stats: [
                    { title: 'Bottles Produced (Today)', value: '24,500', trend: '+5%', icon: 'Droplets', color: 'text-blue-500' },
                    { title: 'Purification Purity Level', value: '99.9%', trend: 'Perfect', icon: 'TestTube', color: 'text-brand-accent' },
                    { title: 'Machine Downtime', value: '12m', trend: '-5m', icon: 'Wrench', color: 'text-brand-secondary' },
                    { title: 'Active Delivery Trucks', value: '8/10', trend: '2 Loading', icon: 'Truck', color: 'text-ui-muted' },
                ],
                chartTitle: 'Hourly Bottling Flow Rate',
                action1: 'Review QC Samples',
                action2: 'Dispatch Fleet',
                status: 'Line 2 Running at 100%',
                activities: [
                    { log: 'Quality Check Passed (Batch 902)', time: '2 mins ago', icon: 'ShieldCheck' },
                    { log: 'Palletizing Robot 1 Reloaded', time: '15 mins ago', icon: 'Cpu' },
                    { log: 'Truck #4 Departed for Abuja', time: '1 hr ago', icon: 'Navigation' },
                ]
            };
        }

        // Default Staff/Other Content
        return {
            greeting: `Hello, ${role.user}.`,
            subtitle: 'Your personal daily overview and task assignments.',
            stats: [
                { title: 'Completed Tasks', value: '14', trend: '8 remaining', icon: 'CheckSquare', color: 'text-brand-secondary' },
                { title: 'Next Shift', value: 'Tomorrow 8AM', trend: '', icon: 'Clock', color: 'text-ui-muted' },
                { title: 'Recent Announcements', value: '2', trend: 'Unread', icon: 'Megaphone', color: 'text-amber-500' },
                { title: 'Leave Balance', value: '12 Days', trend: '', icon: 'CalendarDays', color: 'text-blue-500' },
            ],
            chartTitle: 'Personal Productivity Metrics',
            action1: 'Log Shift Report',
            action2: 'Request Tools/Leave',
            status: 'No Active Incidents',
            activities: [
                { log: 'Completed: Morning Briefing', time: '4 hrs ago', icon: 'Check' },
                { log: 'Shift Schedule Published', time: '1 day ago', icon: 'Calendar' },
            ]
        };
    };

    const dashboardData = getRoleDashboardContent();

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 rounded-2xl bg-ui-surface animate-pulse border border-ui-border"></div>
                    ))}
                </div>
                <div className="h-96 rounded-2xl bg-ui-surface animate-pulse border border-ui-border"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Dynamic Greeting Area */}
            <div className="mb-6 p-6 bg-ui-card rounded-2xl border border-ui-border flex items-center justify-between shadow-lg animate-fade-in-up">
                <div>
                    <h2 className="text-2xl font-bold text-ui-text tracking-tight mb-1">{dashboardData.greeting}</h2>
                    <p className="text-ui-muted text-sm font-medium">{dashboardData.subtitle}</p>
                </div>
                <div className="hidden md:block">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-ui-surface text-brand-secondary border border-ui-border shadow-inner">
                        {role.name} Active
                    </span>
                </div>
            </div>

            {/* Stat Cards with 3D Parallax */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up-delay-1">
                {dashboardData.stats.map((stat, i) => {
                    const IconComponent = LucideIcons[stat.icon as keyof typeof LucideIcons] as React.ElementType;
                    return (
                        <div
                            key={i}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className="bg-ui-card border border-ui-border rounded-2xl p-6 transition-all duration-300 ease-out shadow-lg hover:shadow-brand-secondary/20 hover:border-brand-secondary/40 relative overflow-hidden group"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="absolute -right-6 -top-6 w-24 h-24 bg-brand-secondary/10 rounded-full blur-2xl group-hover:bg-brand-secondary/20 transition-all"></div>
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-sm font-semibold text-ui-muted">{stat.title}</h3>
                                <div className={`p-2 rounded-lg bg-ui-surface ${stat.color} shadow-inner`}>
                                    <IconComponent className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <p className="text-3xl font-bold text-ui-text tracking-tight">{stat.value}</p>
                                <span className={`text-sm font-medium ${stat.trend.includes('+') ? 'text-brand-secondary' : stat.trend.includes('-') ? 'text-brand-primary' : 'text-amber-500'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Dense Chart & Activity Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up-delay-2">
                {/* Main Operations Graph / Telemetry */}
                <div className="lg:col-span-2 bg-ui-card border border-ui-border rounded-2xl p-6 shadow-lg flex flex-col relative overflow-hidden h-[400px]">
                    {role.id === '2' ? (
                        <FarmTelemetryDashboard />
                    ) : role.id === '3' ? (
                        <WaterTelemetryDashboard />
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-6 z-10">
                                <h3 className="text-lg font-bold text-ui-text">{dashboardData.chartTitle}</h3>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-ui-surface text-ui-muted text-xs font-bold rounded hover:text-ui-text transition-colors">1W</button>
                                    <button className="px-3 py-1 bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/30 text-xs font-bold rounded">1M</button>
                                    <button className="px-3 py-1 bg-ui-surface text-ui-muted text-xs font-bold rounded hover:text-ui-text transition-colors">1Y</button>
                                </div>
                            </div>

                            <div className="flex-1 w-full flex items-end justify-between gap-2 px-2 pb-2 z-10">
                                {/* More Granular Map/Chart Bars */}
                                {[40, 70, 45, 90, 65, 85, 100, 60, 45, 80, 50, 75, 60, 85, 95].map((height, i) => (
                                    <div key={i} className="w-full relative group h-64 flex items-end">
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-ui-surface text-xs font-bold px-2 py-1 rounded text-ui-text border border-ui-border shadow-md pointer-events-none z-10 whitespace-nowrap">
                                            Value: {height}
                                        </div>
                                        <div
                                            className="bg-brand-secondary/50 hover:bg-brand-secondary transition-all duration-500 rounded-t-sm w-full cursor-pointer animate-fade-in-up"
                                            style={{ height: `${height}%`, minHeight: '10%', animationDelay: `${i * 30}ms` }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Live Activity Feed */}
                <div className="bg-ui-card border border-ui-border rounded-2xl p-6 shadow-lg flex flex-col">
                    <h3 className="text-lg font-bold text-ui-text mb-4">Live Activity</h3>
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
                        {dashboardData.activities.map((act, i) => {
                            const ActIcon = LucideIcons[act.icon as keyof typeof LucideIcons] as React.ElementType;
                            return (
                                <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-ui-surface transition-colors duration-200 border border-transparent hover:border-ui-border group">
                                    <div className="mt-1">
                                        <div className="p-2 rounded-full bg-ui-surface text-brand-secondary group-hover:bg-brand-secondary group-hover:text-brand-bg transition-colors duration-300">
                                            <ActIcon className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-ui-text mb-0.5 leading-tight">{act.log}</p>
                                        <p className="text-xs text-ui-muted font-medium flex items-center gap-1">
                                            <LucideIcons.Clock className="w-3 h-3" /> {act.time}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <button className="mt-4 w-full py-2.5 rounded-lg border border-ui-border bg-ui-surface text-sm font-bold text-ui-text hover:bg-ui-card transition-colors">
                        View All Activity
                    </button>
                </div>
            </div>

            {/* Quick Actions & Mini Widgets Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up-delay-3">

                {/* Mini System Health Radar */}
                <div className="bg-ui-card border border-ui-border rounded-2xl p-6 shadow-lg flex items-center gap-6">
                    <div className="relative w-20 h-20 rounded-full border-4 border-ui-surface flex items-center justify-center">
                        <div className="absolute inset-0 border-4 border-brand-secondary rounded-full border-t-transparent animate-[spin_3s_linear_infinite]"></div>
                        <span className="text-xl font-black text-ui-text">98<span className="text-xs">%</span></span>
                    </div>
                    <div>
                        <h4 className="font-bold text-ui-text mb-1">System Health</h4>
                        <p className="text-sm text-ui-muted flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse"></div>
                            {dashboardData.status}
                        </p>
                    </div>
                </div>

                {/* Quick Actions Flexbox */}
                <div className="lg:col-span-2 bg-transparent grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-between p-5 rounded-xl bg-ui-card hover:bg-ui-surface border border-ui-border hover:border-brand-secondary/50 transition-all duration-300 group shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-ui-surface text-brand-secondary group-hover:scale-110 transition-transform"><LucideIcons.Zap className="w-5 h-5" /></div>
                            <span className="font-bold text-ui-text">{dashboardData.action1}</span>
                        </div>
                        <LucideIcons.ArrowRight className="w-5 h-5 text-ui-muted group-hover:text-brand-secondary transition-colors group-hover:translate-x-1" />
                    </button>
                    <button className="flex items-center justify-between p-5 rounded-xl bg-ui-card hover:bg-ui-surface border border-ui-border hover:border-brand-secondary/50 transition-all duration-300 group shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-ui-surface text-brand-secondary group-hover:scale-110 transition-transform"><LucideIcons.FileCode className="w-5 h-5" /></div>
                            <span className="font-bold text-ui-text">{dashboardData.action2}</span>
                        </div>
                        <LucideIcons.ArrowRight className="w-5 h-5 text-ui-muted group-hover:text-brand-secondary transition-colors group-hover:translate-x-1" />
                    </button>
                </div>

            </div>
        </div>
    );
}
