import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useAltcoinPrices } from '../hooks/useAltcoinPrices';

export const AltcoinList = () => {
    const { coins, loading } = useAltcoinPrices();

    if (loading) {
        return (
            <div className="glass-panel h-full flex flex-col items-center justify-center text-muted">
                <span className="loading loading-spinner loading-md"></span>
            </div>
        );
    }

    return (
        <div className="glass-panel h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                <Activity className="text-purple-400" size={18} />
                <h3 className="font-bold text-sm tracking-wider text-purple-100 mobile-text-base">TOP 10 ALTCOINS</h3>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                <div className="space-y-1">
                    {coins.map(coin => (
                        <div key={coin.symbol} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors group mobile-compact-item">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold w-12 text-purple-400 mobile-text-sm">{coin.symbol}</span>
                                <span className="text-sm text-muted group-hover:text-white transition-colors mobile-text-sm">{coin.name}</span>
                            </div>
                            <div className="text-right">
                                <div className="font-mono text-sm font-bold mobile-text-sm">${coin.price.toFixed(coin.price < 1 ? 4 : 2)}</div>
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
