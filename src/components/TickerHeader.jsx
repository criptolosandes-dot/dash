import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Clock, Zap } from 'lucide-react';
import logo from '../assets/logo.png';

// Bitcoin Halving Data
const HALVING_BLOCKS = [
    { epoch: 0, block: 0, date: '2009-01-03', reward: 50 },
    { epoch: 1, block: 210000, date: '2012-11-28', reward: 25 },
    { epoch: 2, block: 420000, date: '2016-07-09', reward: 12.5 },
    { epoch: 3, block: 630000, date: '2020-05-11', reward: 6.25 },
    { epoch: 4, block: 840000, date: '2024-04-20', reward: 3.125 },
    { epoch: 5, block: 1050000, date: '2028-04-01', reward: 1.5625 }, // Estimated
];

const NEXT_HALVING_BLOCK = 1050000; // Epoch 5
const BLOCKS_PER_DAY = 144; // Average

export const TickerHeader = ({ price = 0, priceChange24h = 0 }) => {
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
    const [currentBlock, setCurrentBlock] = useState(875000); // Approximate current block

    // Fetch current block height (mock for now, would use blockchain.info API)
    useEffect(() => {
        // Mock: Estimate based on time since last halving
        const halvingDate = new Date('2024-04-20');
        const now = new Date();
        const daysSinceHalving = Math.floor((now - halvingDate) / (1000 * 60 * 60 * 24));
        const estimatedBlock = 840000 + (daysSinceHalving * BLOCKS_PER_DAY);
        setCurrentBlock(Math.min(estimatedBlock, NEXT_HALVING_BLOCK - 1));
    }, []);

    // Calculate countdown to next halving
    useEffect(() => {
        const blocksRemaining = NEXT_HALVING_BLOCK - currentBlock;
        const secondsPerBlock = 600; // 10 minutes average
        const totalSeconds = blocksRemaining * secondsPerBlock;

        const targetDate = new Date();
        targetDate.setSeconds(targetDate.getSeconds() + totalSeconds);

        const updateCountdown = () => {
            const now = new Date();
            const diff = targetDate - now;

            if (diff <= 0) {
                setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            setCountdown({ days, hours, mins, secs });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [currentBlock]);

    const isPositive = priceChange24h >= 0;
    const formattedPrice = price > 0
        ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : '---';

    return (
        <header className="glass-panel-static">
            <div className="container flex items-center justify-between gap-8 h-full">

                {/* Left: Branding */}
                <div className="flex items-center gap-5">
                    <img
                        src={logo}
                        alt="Cripto Andes Logo"
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: '100%',
                            objectFit: 'cover',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    />
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '0.5px', lineHeight: 1 }}>
                            CRIPTO <span style={{ color: '#64748b', fontWeight: 600 }}>LOS</span> <span className="text-gradient-gold">ANDES</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-1.5">
                            <div className="live-dot" style={{ width: 6, height: 6 }}></div>
                            <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '2px', color: '#64748b' }}>DATOS EN TIEMPO REAL</span>
                        </div>
                    </div>
                </div>

                {/* Center / Right Group */}
                <div className="flex items-center gap-12 ml-auto">

                    {/* Price Status */}
                    <div className="flex flex-col items-end">
                        <div style={{ fontSize: '0.75rem', letterSpacing: '1px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>BTC / USDT</div>
                        <div className="flex items-center gap-4">
                            <span className="font-bold" style={{ fontSize: '2.2rem', color: '#3b82f6', letterSpacing: '-1px', lineHeight: 1 }}>${formattedPrice}</span>
                            <div className="flex items-center justify-center" style={{
                                background: 'rgba(16, 185, 129, 0.15)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                borderRadius: '8px',
                                padding: '0.4rem 0.8rem',
                                color: '#34d399',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                height: 'fit-content'
                            }}>
                                {isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                                {Math.abs(priceChange24h).toFixed(2)}%
                            </div>
                        </div>
                    </div>

                    {/* Halving Box - Dark Teal */}
                    <div className="flex items-center ml-auto pl-8 pr-8 py-3 rounded-2xl hide-mobile" style={{
                        background: 'linear-gradient(180deg, rgba(8, 40, 50, 0.5) 0%, rgba(6, 20, 25, 0.8) 100%)',
                        border: '1px solid rgba(6, 182, 212, 0.15)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        marginLeft: '40px' // Ensure at least ~1cm spacing visual separation
                    }}>
                        <div className="flex items-center gap-10 font-mono">
                            <div className="flex flex-col items-start mr-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock size={14} style={{ color: '#06b6d4' }} />
                                    <span style={{ fontSize: '0.7rem', letterSpacing: '0.5px', fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase' }}>CUENTA REGRESIVA HALVING</span>
                                </div>
                                <div className="flex gap-6 text-white">
                                    <div className="flex flex-col items-center">
                                        <span style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}>{countdown.days}</span>
                                        <span style={{ fontSize: '0.6rem', opacity: 0.5, fontWeight: 600, marginTop: '4px' }}>DÍAS</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}>{String(countdown.hours).padStart(2, '0')}</span>
                                        <span style={{ fontSize: '0.6rem', opacity: 0.5, fontWeight: 600, marginTop: '4px' }}>HRS</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}>{String(countdown.mins).padStart(2, '0')}</span>
                                        <span style={{ fontSize: '0.6rem', opacity: 0.5, fontWeight: 600, marginTop: '4px' }}>MIN</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1 pl-6" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                                <div className="flex items-center gap-1.5">
                                    <Zap size={10} style={{ color: '#f59e0b' }} />
                                    <span style={{ fontSize: '0.6rem', fontWeight: 600, color: '#64748b' }}>RECOMPENSA</span>
                                </div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f59e0b' }}>3.125 ₿</div>
                                <div className="flex flex-col items-end">
                                    <span style={{ fontSize: '0.55rem', fontWeight: 600, color: '#64748b' }}>BLOQUES RESTANTES</span>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b' }}>{(NEXT_HALVING_BLOCK - currentBlock).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </header>
    );
};

export default TickerHeader;
