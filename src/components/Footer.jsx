import React from 'react';
import { AlertTriangle, Shield, ExternalLink } from 'lucide-react';

export const Footer = () => {
    return (
        <footer style={{
            marginTop: '4rem',
            padding: '3rem 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'linear-gradient(to bottom, rgba(7, 11, 16, 0.8), #05070a)'
        }}>
            {/* Disclaimer Box */}
            <div style={{
                background: 'rgba(255, 170, 0, 0.08)',
                border: '1px solid rgba(255, 170, 0, 0.2)',
                borderRadius: '16px',
                padding: '1.5rem 2rem',
                marginBottom: '3rem'
            }}>
                <div className="flex items-start gap-4">
                    <AlertTriangle size={28} className="text-warning" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '0.5px' }} className="text-warning">
                            ⚠️ AVISO LEGAL / DISCLAIMER
                        </h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#e2e8f0', fontWeight: 500 }}>
                            Esta herramienta es para <strong style={{ color: '#fbbf24' }}>fines informativos y especulativos únicamente</strong>.
                            No constituye consejo financiero, de inversión, ni recomendación de compra o venta de activos.
                            Los cálculos y proyecciones mostrados son modelos teóricos basados en fórmulas especulativas
                            y no garantizan resultados futuros. Invertir en criptomonedas conlleva riesgos significativos,
                            incluyendo la pérdida total del capital. Realiza tu propia investigación (DYOR) y consulta
                            con un asesor financiero profesional antes de tomar decisiones de inversión.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Links & Info */}
            <div className="grid grid-3 gap-10" style={{ textAlign: 'center' }}>
                {/* Privacidad */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-3">
                        <Shield size={18} className="text-muted" />
                        <span style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px' }}>
                            Privacidad
                        </span>
                    </div>
                    <p style={{ fontSize: '1.1rem', color: '#cbd5e1', fontWeight: 500 }}>
                        No almacenamos datos financieros sensibles. <br />
                        <span style={{ color: '#38bdf8', fontWeight: 600 }}>Tu privacidad es prioridad.</span>
                    </p>
                </div>

                {/* Branding */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-3">
                        <span style={{ fontSize: '1.5rem', color: '#f59e0b' }}>₿</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', color: '#f8fafc', letterSpacing: '2px' }}>
                            Cripto Andes
                        </span>
                    </div>
                    <p style={{ fontSize: '1rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                        Dashboard de análisis técnico y fundamental para Bitcoin con sello de los Andes.
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
                        © 2026 - Todos los derechos reservados
                    </p>
                </div>

                {/* Fuentes */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-3">
                        <ExternalLink size={18} className="text-muted" />
                        <span style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px' }}>
                            Fuentes de Datos
                        </span>
                    </div>
                    <div className="flex items-center gap-3" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                        <a href="https://www.binance.com" target="_blank" rel="noopener noreferrer" style={{ color: '#FCD535' }}>Binance</a>
                        <span className="text-muted">•</span>
                        <a href="https://cryptopanic.com" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8' }}>CryptoPanic</a>
                        <span className="text-muted">•</span>
                        <a href="https://blockchain.info" target="_blank" rel="noopener noreferrer" style={{ color: '#F7931A' }}>Blockchain.info</a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="text-center mt-12 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ fontSize: '1rem', color: '#94a3b8' }}>
                    Hecho con 🧡 para la comunidad de Bitcoin |
                    <span style={{ marginLeft: '0.5rem' }}>
                        Powered by <span className="text-primary font-bold">TradingView</span> & <span className="text-cyan font-bold">Binance API</span>
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
