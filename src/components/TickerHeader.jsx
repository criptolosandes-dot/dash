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
        <header className="glass-panel-static" style={{ marginBottom: '1.5rem' }}>
            <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>

                {/* Logo & Title */}
                <div className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="Cripto Andes Logo"
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: '12px',
                            objectFit: 'cover',
                            boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)'
                        }}
                    />
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>
                            CRIPTO <span className="text-gradient-primary">LOS ANDES</span>
                        </h1>
                        <div className="flex items-center gap-2">
                            <div className="live-dot"></div>
                            <span className="text-muted" style={{ fontSize: '0.85rem' }}>DATOS EN TIEMPO REAL</span>
                        </div>
                    </div>
                </div>

                {/* Price Display */}
                <div className="flex items-center gap-6" style={{ flexWrap: 'wrap' }}>
                    <div>
                        <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            BTC/USDT
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-mono font-bold" style={{ fontSize: '1.75rem', color: 'var(--accent-primary)' }}>
                                ${formattedPrice}
                            </span>
                            <div className={`badge ${isPositive ? 'badge-success' : 'badge-danger'}`}>
                                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {isPositive ? '+' : ''}{priceChange24h.toFixed(2)}%
                            </div>
                        </div>
                    </div>

                    {/* Halving Countdown */}
                    <div style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '1px solid rgba(0, 212, 255, 0.2)',
                        borderRadius: '12px',
                        padding: '0.75rem 1.25rem',
                        minWidth: '240px'
                    }}>
                        <div className="flex items-center gap-2 mb-1">
                            <Clock size={14} className="text-cyan" />
                            <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase' }} className="text-cyan">
                                Next Halving Countdown
                            </span>
                        </div>
                        <div className="flex gap-4 font-mono">
                            <div className="text-center">
                                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{countdown.days}</div>
                                <div className="text-muted" style={{ fontSize: '0.6rem' }}>DAYS</div>
                            </div>
                            <div className="text-center">
                                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{String(countdown.hours).padStart(2, '0')}</div>
                                <div className="text-muted" style={{ fontSize: '0.6rem' }}>HRS</div>
                            </div>
                            <div className="text-center">
                                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{String(countdown.mins).padStart(2, '0')}</div>
                                <div className="text-muted" style={{ fontSize: '0.6rem' }}>MIN</div>
                            </div>
                            {/* Current Reward */}
                            <div className="text-center" style={{ minWidth: '80px' }}>
                                <div className="flex items-center justify-center gap-1 mb-1">
                                    <Zap size={12} className="text-warning" />
                                    <span className="text-muted" style={{ fontSize: '0.7rem' }}>REWARD</span>
                                </div>
                                <div className="font-mono font-bold" style={{ fontSize: '0.9rem', color: 'var(--accent-warning)' }}>
                                    3.125 ₿
                                </div>
                            </div>
                            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                                <div className="text-muted" style={{ fontSize: '0.6rem' }}>BLOCKS LEFT</div>
                                <div className="font-bold text-warning" style={{ fontSize: '0.875rem' }}>
                                    {(1050000 - currentBlock).toLocaleString()}
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
