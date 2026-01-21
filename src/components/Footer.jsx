import React from 'react';
import { AlertTriangle, Shield, ExternalLink } from 'lucide-react';

export const Footer = () => {
    return (
        <footer style={{
            marginTop: '3rem',
            padding: '2rem 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
            {/* Disclaimer Box */}
            <div style={{
                background: 'rgba(255, 170, 0, 0.08)',
                border: '1px solid rgba(255, 170, 0, 0.2)',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '2rem'
            }}>
                <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-warning" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                        <h3 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem' }} className="text-warning">
                            ⚠️ Aviso Legal / Disclaimer
                        </h3>
                        <p style={{ fontSize: '0.8125rem', lineHeight: 1.6 }} className="text-secondary">
                            Esta herramienta es para <strong>fines informativos y especulativos únicamente</strong>.
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
            <div className="grid grid-3 gap-6" style={{ textAlign: 'center' }}>
                <div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Shield size={14} className="text-muted" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }} className="text-muted">
                            Privacidad
                        </span>
                    </div>
                    <p style={{ fontSize: '0.75rem' }} className="text-muted">
                        No almacenamos datos financieros sensibles. Tu privacidad es prioridad.
                    </p>
                </div>

                <div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span style={{ fontSize: '1.25rem' }}>₿</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }} className="text-muted">
                            Cripto Andes
                        </span>
                    </div>
                    <p style={{ fontSize: '0.75rem' }} className="text-muted">
                        Dashboard de análisis técnico y fundamental para Bitcoin con sello de los Andes.
                    </p>
                    <p style={{ fontSize: '0.6875rem', marginTop: '0.5rem' }} className="text-muted">
                        © 2026 - Todos los derechos reservados
                    </p>
                </div>

                <div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <ExternalLink size={14} className="text-muted" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }} className="text-muted">
                            Fuentes de Datos
                        </span>
                    </div>
                    <div className="flex items-center justify-center gap-3" style={{ fontSize: '0.75rem' }}>
                        <a href="https://www.binance.com" target="_blank" rel="noopener noreferrer">Binance</a>
                        <span className="text-muted">•</span>
                        <a href="https://cryptopanic.com" target="_blank" rel="noopener noreferrer">CryptoPanic</a>
                        <span className="text-muted">•</span>
                        <a href="https://blockchain.info" target="_blank" rel="noopener noreferrer">Blockchain.info</a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="text-center mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontSize: '0.6875rem' }} className="text-muted">
                    Hecho con 🧡 para la comunidad de Bitcoin |
                    <span style={{ marginLeft: '0.5rem' }}>
                        Powered by <span className="text-primary">TradingView Lightweight Charts</span> & <span className="text-cyan">Binance WebSocket API</span>
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
