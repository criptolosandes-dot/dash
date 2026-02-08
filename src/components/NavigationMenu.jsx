import { BarChart2, Calculator, TrendingUp, PieChart, Info, Cpu, BookOpen, Wallet, Globe } from 'lucide-react';
import React from 'react';

export const NavigationMenu = ({ onSelect }) => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Fallback for external links or future pages
            console.log("Section not found:", id);
        }
    };

    const menuItems = [
        { id: 'chart-section', label: 'Análisis de Precio', icon: BarChart2, color: 'var(--accent-primary)' },
        { id: 'holdings-section', label: 'Holdings Institucionales', icon: PieChart, color: 'var(--accent-purple)' },
        { id: 'dca-section', label: 'Simulador DCA', icon: TrendingUp, color: 'var(--accent-success)' },
        { id: 'calculator-section', label: 'Jubilación Bitcoin', icon: Calculator, color: 'var(--accent-warning)' },
        { id: 'hashrate-section', label: 'Seguridad de la Red', icon: Cpu, color: '#f97316' },
        { id: 'country-reserves-section', label: 'Reservas de Países', icon: Globe, color: '#3b82f6' }, // Added Country Reserves
        { id: 'wallets-section', label: 'Wallets', icon: Wallet, color: '#10b981' }, // Added Wallets
        { id: 'learn-more', label: 'Aprender Más', icon: BookOpen, color: '#3b82f6', link: 'curso.html' },
    ];

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', height: 'fit-content' }}>
            <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-6 pl-2">
                Menú Principal
            </h3>

            <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.link) {
                                    window.location.href = item.link;
                                } else {
                                    scrollToSection(item.id);
                                }
                                if (onSelect) onSelect();
                            }}
                            className="flex items-center gap-3 p-3 rounded-lg transition-all text-left group"
                            style={{
                                background: 'transparent',
                                border: '1px solid transparent',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.querySelector('.nav-icon').style.color = item.color;
                                e.currentTarget.querySelector('.nav-text').style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.borderColor = 'transparent';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.querySelector('.nav-icon').style.color = 'var(--text-muted)';
                                e.currentTarget.querySelector('.nav-text').style.color = 'var(--text-secondary)';
                            }}
                        >
                            <div
                                className="nav-icon flex items-center justify-center p-2 rounded-md transition-colors"
                                style={{
                                    background: 'rgba(0,0,0,0.2)',
                                    color: 'var(--text-muted)'
                                }}
                            >
                                <Icon size={20} />
                            </div>
                            <span className="nav-text font-medium text-sm transition-colors">
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>

            <div className="mt-8 pt-6 border-t border-white/5 pl-2">
                <div className="flex items-start gap-3 text-xs text-muted leading-relaxed">
                    <Info size={16} className="shrink-0 mt-0.5" />
                    <p>
                        Selecciona una herramienta para deslizarte automáticamente a su sección correspondiente.
                    </p>
                </div>
            </div>
        </div>
    );
};
