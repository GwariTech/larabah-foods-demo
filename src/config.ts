export const roles = [
    { id: '1', name: 'CEO Larabah Foods', user: 'Abdulbaki Ebbo', abbr: 'AE', color: 'border-brand-secondary text-brand-secondary bg-brand-secondary/10' },
    { id: '2', name: 'Manager', user: 'Larabah Farms', abbr: 'MF', color: 'border-brand-accent text-brand-accent bg-brand-accent/10' },
    { id: '3', name: 'Manager', user: 'Larabah Water', abbr: 'MW', color: 'border-blue-400 text-blue-400 bg-blue-400/10' },
    { id: '4', name: 'Staff', user: 'Larabah Farms', abbr: 'SF', color: 'border-brand-accent text-brand-accent bg-brand-accent/10' },
    { id: '5', name: 'Staff', user: 'Larabah Water', abbr: 'SW', color: 'border-blue-400 text-blue-400 bg-blue-400/10' },
    { id: '6', name: 'Cross-functional Staff', user: 'Larabah Farms & Water', abbr: 'CF', color: 'border-purple-400 text-purple-400 bg-purple-400/10' },
    { id: '7', name: 'System Admin', user: 'IT Operations', abbr: 'SA', color: 'border-slate-400 text-slate-400 bg-slate-400/10' },
];

export const sharedPages = {
    '1': [ // CEO
        { id: '1', title: 'Dashboard', desc: 'Enterprise-level widget view', icon: 'LayoutDashboard' },
        { id: '2', title: 'Profile & Settings', desc: 'Account management', icon: 'UserCircle' },
        { id: '3', title: 'Internal Messaging', desc: 'Direct communication channels', icon: 'MessageSquare' },
        { id: '4', title: 'HR & Leave Management', desc: 'Direct reports and executive leave', icon: 'Users' },
        { id: '5', title: 'Company Announcements', desc: 'Global notice board', icon: 'Megaphone' },
    ],
    '2': [ // Manager Farms
        { id: '1', title: 'Dashboard', desc: 'Farm-focused widget view', icon: 'LayoutDashboard' },
        { id: '2', title: 'Profile & Settings', desc: 'Account management', icon: 'UserCircle' },
        { id: '3', title: 'Internal Messaging', desc: 'Direct communication channels', icon: 'MessageSquare' },
        { id: '4', title: 'HR & Team Management', desc: 'Staff approvals, rosters', icon: 'Users' },
        { id: '5', title: 'Company Announcements', desc: 'Global notice board', icon: 'Megaphone' },
    ],
    '3': [ // Manager Water
        { id: '1', title: 'Dashboard', desc: 'Water-focused widget view', icon: 'LayoutDashboard' },
        { id: '2', title: 'Profile & Settings', desc: 'Account management', icon: 'UserCircle' },
        { id: '3', title: 'Internal Messaging', desc: 'Direct communication channels', icon: 'MessageSquare' },
        { id: '4', title: 'HR & Team Management', desc: 'Staff approvals, rosters', icon: 'Users' },
        { id: '5', title: 'Company Announcements', desc: 'Global notice board', icon: 'Megaphone' },
    ],
    '4': [ // Staff Farms
        { id: '1', title: 'Dashboard', desc: 'Personal staff view', icon: 'LayoutDashboard' },
        { id: '2', title: 'Profile & Settings', desc: 'Account management', icon: 'UserCircle' },
        { id: '3', title: 'Internal Messaging', desc: 'Direct communication channels', icon: 'MessageSquare' },
        { id: '4', title: 'HR & Leave Requests', desc: 'Time off, payslips', icon: 'CalendarDays' },
        { id: '5', title: 'Company Announcements', desc: 'Global notice board', icon: 'Megaphone' },
    ],
    '5': [ // Staff Water
        { id: '1', title: 'Dashboard', desc: 'Personal staff view', icon: 'LayoutDashboard' },
        { id: '2', title: 'Profile & Settings', desc: 'Account management', icon: 'UserCircle' },
        { id: '3', title: 'Internal Messaging', desc: 'Direct communication channels', icon: 'MessageSquare' },
        { id: '4', title: 'HR & Leave Requests', desc: 'Time off, payslips', icon: 'CalendarDays' },
        { id: '5', title: 'Company Announcements', desc: 'Global notice board', icon: 'Megaphone' },
    ],
    '6': [ // Cross-Functional
        { id: '1', title: 'Dashboard', desc: 'Split-view personal dashboard', icon: 'LayoutDashboard' },
        { id: '2', title: 'Profile & Settings', desc: 'Account management', icon: 'UserCircle' },
        { id: '3', title: 'Internal Messaging', desc: 'Direct communication channels', icon: 'MessageSquare' },
        { id: '4', title: 'HR & Leave Requests', desc: 'Time off, payslips', icon: 'CalendarDays' },
        { id: '5', title: 'Company Announcements', desc: 'Global notice board', icon: 'Megaphone' },
    ],
    '7': [ // SysAdmin
        { id: '1', title: 'Dashboard', desc: 'System health and IT overview', icon: 'LayoutDashboard' },
        { id: '2', title: 'Profile & Settings', desc: 'Account management', icon: 'UserCircle' },
        { id: '5', title: 'Company Announcements', desc: 'Global notice board', icon: 'Megaphone' },
    ]
};

export const exclusivePages = {
    '1': [ // CEO
        { id: '6', title: 'Enterprise Financial Overview', desc: 'Consolidated P&L for Farms + Water', icon: 'LineChart' },
        { id: '7', title: 'Strategic KPIs & Goals Tracker', desc: 'High-level business metrics', icon: 'Target' },
        { id: '8', title: 'Executive Approvals', desc: 'CAPEX, major hiring overrides', icon: 'CheckSquare' },
        { id: '9', title: 'Division Performance Comparison', desc: 'Farms vs. Water ROI analytics', icon: 'BarChart3' },
        { id: '10', title: 'Investor/Board Report Generator', desc: 'Automated high-level reporting', icon: 'FileText' },
    ],
    '2': [ // Manager Farms
        { id: '6', title: 'Farm Operations Hub', desc: 'Crop & Livestock real-time status', icon: 'Sprout' },
        { id: '7', title: 'Farm Inventory & Supply Chain', desc: 'Feed, vaccines, seeds, machinery', icon: 'Package' },
        { id: '8', title: 'Farm Yield & Harvest Reports', desc: 'Production outputs', icon: 'Tractor' },
        { id: '9', title: 'Farm Task Assignment', desc: 'Delegating daily activities', icon: 'ClipboardList' },
        { id: '10', title: 'Farm Expense & Budget Tracking', desc: 'Cost monitoring', icon: 'CircleDollarSign' },
    ],
    '3': [ // Manager Water
        { id: '6', title: 'Production Line Status', desc: 'Bottling metrics, machinery uptime', icon: 'Droplets' },
        { id: '7', title: 'Water Distribution & Fleet', desc: 'Logistics, delivery tracking', icon: 'Truck' },
        { id: '8', title: 'Quality Assurance & Lab', desc: 'Test results and safety', icon: 'TestTube' },
        { id: '9', title: 'Water Inventory & Sales', desc: 'Finished goods and raw materials', icon: 'Boxes' },
        { id: '10', title: 'Plant Maintenance Scheduling', desc: 'Preventative maintenance logs', icon: 'Wrench' },
    ],
    '4': [ // Staff Farms
        { id: '6', title: 'Daily Farm Task List', desc: 'Feeding, harvesting, cleaning schedules', icon: 'ListOrdered' },
        { id: '7', title: 'Incident & Health Reporting', desc: 'Flagging sick animals or pest outbreaks', icon: 'AlertTriangle' },
        { id: '8', title: 'Equipment & Tools Checkout', desc: 'Requesting physical assets', icon: 'Wrench' },
        { id: '9', title: 'Personal Target Tracking', desc: 'Individual yield/performance', icon: 'Activity' },
        { id: '10', title: 'Farm SOPs', desc: 'Standard Operating Procedures manuals', icon: 'BookOpen' },
    ],
    '5': [ // Staff Water
        { id: '6', title: 'Daily Production Shift Log', desc: 'Inputting manual counts and shift handovers', icon: 'ListOrdered' },
        { id: '7', title: 'Machine Error Flagging', desc: 'Reporting breakdowns', icon: 'AlertTriangle' },
        { id: '8', title: 'QC Sample Submission', desc: 'Logging testing samples', icon: 'FlaskConical' },
        { id: '9', title: 'Delivery Manifest', desc: 'For drivers/logistics staff', icon: 'FileCheck' },
        { id: '10', title: 'Factory Safety Protocols', desc: 'Safety guidelines and manuals', icon: 'ShieldAlert' },
    ],
    '6': [ // Cross-Functional
        { id: '6', title: 'Unified Cross-Business Task Manager', desc: 'Managing tasks across domains', icon: 'ListTodo' },
        { id: '7', title: 'Time & Cost Allocation Tracker', desc: 'Logging hours split between Farms/Water', icon: 'Clock' },
        { id: '8', title: 'Cross-site Logistics Request', desc: 'Transport between facilities', icon: 'ArrowRightLeft' },
        { id: '9', title: 'Joint Inventory Transfer Form', desc: 'Moving shared assets/supplies', icon: 'Repeat' },
        { id: '10', title: 'Multi-site Security & Access Log', desc: 'Gate access and visitor logging', icon: 'Lock' },
    ],
    '7': [ // SysAdmin
        { id: '6', title: 'User Role & Access Management', desc: 'RBAC configuration, staff', icon: 'ShieldCheck' },
        { id: '7', title: 'Audit Trails & System Logs', desc: 'Tracking all system actions', icon: 'ScrollText' },
        { id: '8', title: 'Database Management & Backups', desc: 'Data integrity controls', icon: 'Database' },
        { id: '9', title: 'Integration & API Settings', desc: 'Third-party software bridges', icon: 'Webhook' },
        { id: '10', title: 'Health & Performance Monitoring', desc: 'Server loads, errors', icon: 'Activity' },
        { id: '11', title: 'Global Notification Blaster', desc: 'Sending emergency system alerts', icon: 'Siren' },
        { id: '12', title: 'IT Support Ticketing System', desc: 'Resolving user tech issues', icon: 'Ticket' },
    ]
};
