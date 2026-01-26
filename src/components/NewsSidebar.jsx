import React, { useState, useEffect } from 'react';
import { Newspaper, TrendingUp, TrendingDown, Minus, ExternalLink, RefreshCw, AlertTriangle, Clock } from 'lucide-react';

// Mock news data (simulating CryptoPanic API response)
const MOCK_NEWS = [
    {
        id: 1,
        title: 'BlackRock Bitcoin ETF supera los $40 mil millones en tenencias',
        source: 'Bloomberg',
        url: 'https://www.bloomberg.com/crypto',
        sentiment: 'bullish',
        publishedAt: '15m atrás',
        image: null
    },
    {
        id: 2,
        title: 'El presidente de la SEC comenta sobre el futuro marco regulatorio cripto',
        source: 'CoinDesk',
        url: 'https://www.coindesk.com/',
        sentiment: 'neutral',
        publishedAt: '45m atrás',
        image: null
    },
    {
        id: 3,
        title: 'Mineros de Bitcoin enfrentan ajustes de dificultad incrementados',
        source: 'CoinTelegraph',
        url: 'https://cointelegraph.com/',
        sentiment: 'bearish',
        publishedAt: '2h atrás',
        image: null
    },
    {
        id: 4,
        title: 'MicroStrategy compra más Bitcoin a un promedio de $98,000',
        source: 'Michael Saylor',
        url: 'https://twitter.com/saylor',
        sentiment: 'bullish',
        publishedAt: '3h atrás',
        image: null
    },
    {
        id: 5,
        title: 'Análisis Técnico: BTC formando patrón de Cruz Dorada',
        source: 'TradingView',
        url: 'https://www.tradingview.com/symbols/BTCUSD/',
        sentiment: 'bullish',
        publishedAt: '5h atrás',
        image: null
    }
];



const NewsCard = ({ news }) => {
    const sentimentConfig = {
        bullish: { icon: TrendingUp, color: 'var(--accent-success)', bg: 'rgba(0, 230, 118, 0.05)' },
        bearish: { icon: TrendingDown, color: 'var(--accent-danger)', bg: 'rgba(255, 61, 113, 0.05)' },
        neutral: { icon: Minus, color: 'var(--text-muted)', bg: 'rgba(255, 255, 255, 0.02)' }
    };

    const config = sentimentConfig[news.sentiment] || sentimentConfig.neutral;
    const Icon = config.icon;

    return (
        <a href={news.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{
                padding: '1rem',
                background: config.bg,
                borderRadius: '12px',
                borderLeft: `4px solid ${config.color}`,
                marginBottom: '0.75rem',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.background = `linear-gradient(90deg, ${config.bg}, rgba(255,255,255,0.05))`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.background = config.bg;
                }}
            >
                <div className="flex items-start gap-3">
                    {news.image && (
                        <img
                            src={news.image}
                            alt="News thumbnail"
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '8px',
                                objectFit: 'cover',
                                flexShrink: 0
                            }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    )}
                    {!news.image && (
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(230,0,122,0.2))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <Newspaper size={20} className="text-cyan" />
                        </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            lineHeight: 1.4,
                            marginBottom: '0.5rem',
                            color: 'var(--text-main)',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {news.title}
                        </h4>
                        <div className="flex items-center gap-3 text-muted" style={{ fontSize: '0.7rem' }}>
                            <span className="font-medium text-primary">{news.source}</span>
                            <span className="flex items-center gap-1">
                                <Clock size={10} />
                                {news.publishedAt}
                            </span>
                        </div>
                    </div>
                    <ExternalLink size={12} className="text-muted opacity-50 absolute top-3 right-3" />
                </div>
            </div>
        </a>
    );
};

export const NewsSidebar = () => {
    const [news, setNews] = useState(MOCK_NEWS);
    const [isLoading, setIsLoading] = useState(false);

    const refreshNews = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="glass-panel flex flex-col" style={{ height: '100%', maxHeight: 'calc(100vh - 100px)' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4" style={{ borderBottom: 'var(--glass-border)', paddingBottom: '1rem' }}>
                <div className="flex items-center gap-2">
                    <Newspaper className="text-cyan" size={20} />
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Noticias en Vivo</h2>
                </div>
                <button
                    onClick={refreshNews}
                    disabled={isLoading}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted hover:text-white"
                >
                    <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                </button>
            </div>



            {/* News List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2 space-y-3">
                {news.map(item => (
                    <NewsCard key={item.id} news={item} />
                ))}
            </div>

            {/* Affiliate / Recommended Links */}
            <div className="glass-panel mt-4 p-4">
                <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="text-primary" size={16} />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-muted">Exchanges Recomendados</h3>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    <a href="https://accounts.binance.com/register?ref=YOUR_CODE" target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 p-2 rounded text-xs font-bold text-black bg-[#FCD535] hover:opacity-90 transition-opacity">
                        Binance
                    </a>
                    <a href="https://www.bitget.com/expressly?channelCode=YOUR_CODE" target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 p-2 rounded text-xs font-bold text-black bg-[#00F0FF] hover:opacity-90 transition-opacity">
                        Bitget
                    </a>
                    <a href="https://www.bitmex.com/register/YOUR_CODE" target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 p-2 rounded text-xs font-bold text-white bg-[#FF3D00] hover:opacity-90 transition-opacity">
                        Bitmex
                    </a>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/5 text-center">
                <a href="https://cryptopanic.com/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted hover:text-white transition-colors">
                    Powered by CryptoPanic API
                </a>
            </div>

            <style>{`
                .shine-effect {
                    position: relative;
                }
                .shine-effect::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.05),
                        transparent
                    );
                    animation: shine 8s infinite;
                }
                @keyframes shine {
                    0% { left: -100%; }
                    20% { left: 200%; }
                    100% { left: 200%; }
                }
            `}</style>
        </div>
    );
};

export default NewsSidebar;
