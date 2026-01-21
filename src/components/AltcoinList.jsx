import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const MOCK_ALTCOINS = [
    { symbol: 'ETH', name: 'Ethereum', price: 3450.20, change: 2.4 },
    { symbol: 'SOL', name: 'Solana', price: 145.80, change: 5.1 },
    { symbol: 'BNB', name: 'Binance Coin', price: 620.15, change: -1.2 },
    { symbol: 'XRP', name: 'Ripple', price: 2.45, change: 0.8 },
    { symbol: 'ADA', name: 'Cardano', price: 1.12, change: -0.5 },
    { symbol: 'AVAX', name: 'Avalanche', price: 42.50, change: 3.2 },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.18, change: 1.5 },
    { symbol: 'DOT', name: 'Polkadot', price: 8.90, change: -2.1 },
    { symbol: 'LINK', name: 'Chainlink', price: 18.45, change: 4.0 },
    { symbol: 'MATIC', name: 'Polygon', price: 0.95, change: 0.2 },
];

export const AltcoinList = () => {
    const [coins, setCoins] = useState(MOCK_ALTCOINS);

    // Simulate live price ticks
    useEffect(() => {
        const interval = setInterval(() => {
            setCoins(currentCoins =>
                currentCoins.map(coin => ({
                    ...coin,
                    price: coin.price * (1 + (Math.random() * 0.002 - 0.001)), // +/- 0.1% fluctuation
                    change: coin.change + (Math.random() * 0.1 - 0.05)
                }))
            );
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-panel h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                <Activity className="text-purple-400" size={18} />
                <h3 className="font-bold text-sm tracking-wider text-purple-100">TOP 10 ALTCOINS</h3>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                <div className="space-y-1">
                    {coins.map(coin => (
                        <div key={coin.symbol} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold w-12 text-purple-400">{coin.symbol}</span>
                                <span className="text-sm text-muted group-hover:text-white transition-colors">{coin.name}</span>
                            </div>
                            <div className="text-right">
                                <div className="font-mono text-sm font-bold">${coin.price.toFixed(coin.price < 1 ? 4 : 2)}</div>
                                <div className={`text-xs flex items-center justify-end gap-1 ${coin.change >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {coin.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {Math.abs(coin.change).toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
