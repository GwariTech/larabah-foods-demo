import React, { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: string;
}

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-xl' }: ModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 text-left">
            {/* Background Backdrop Blur overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Box */}
            <div className={`relative bg-ui-card border border-ui-border rounded-2xl shadow-2xl w-full ${maxWidth} animate-fade-in-up overflow-hidden flex flex-col max-h-[90vh]`}>

                {/* Header */}
                <div className="px-6 py-4 border-b border-ui-border flex justify-between items-center bg-ui-surface backdrop-blur-md">
                    <h3 className="text-xl font-bold text-ui-text tracking-tight">{title}</h3>
                    <button onClick={onClose} className="text-ui-muted hover:text-ui-text transition-colors p-1.5 bg-ui-surface rounded-lg border border-ui-border hover:border-brand-secondary">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Inject any content inside the modal */}
                <div className="p-6 overflow-y-auto custom-scrollbar text-ui-text">
                    {children}
                </div>
            </div>
        </div>
    );
}
