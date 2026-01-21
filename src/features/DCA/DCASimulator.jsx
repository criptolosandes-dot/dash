import React, { useState, useMemo } from 'react';
import { History, DollarSign, Calendar, Table2, TrendingUp, Bitcoin, ChevronDown, ChevronUp } from 'lucide-react';
import { getPriceForDate, getMonthKey } from '../../utils/historicalData';

export const DCASimulator = ({ currentPrice = 102000 }) => {
    const [monthlyAmount, setMonthlyAmount] = useState('100'); // String to allow empty input
    const [startDate, setStartDate] = useState('2023-01');
    const [showTable, setShowTable] = useState(false);

    const dcaResults = useMemo(() => {
        const [startYear, startMonth] = startDate.split('-').map(Number);
        const start = new Date(startYear, startMonth - 1, 1);
        const now = new Date();

        const entries = [];
        let totalInvested = 0;
        let totalBTC = 0;

        // Safe number conversion
        const amountNum = parseFloat(monthlyAmount) || 0;

        const current = new Date(start);

        while (current <= now) {
            const monthKey = getMonthKey(current);
            const priceAtMonth = getPriceForDate(monthKey);

            // Skip future months if data not available yet (though our loop condition handles most)
            if (priceAtMonth > 0) {
                const btcBought = amountNum / priceAtMonth;

                totalInvested += amountNum;
                totalBTC += btcBought;

                entries.push({
                    month: monthKey,
                    monthLabel: current.toLocaleDateString('es-ES', { year: 'numeric', month: 'short' }),
                    price: priceAtMonth,
                    btcBought,
                    totalBTC,
                    totalInvested
                });
            }

            current.setMonth(current.getMonth() + 1);
        }

        const currentValue = totalBTC * currentPrice;
        const profit = currentValue - totalInvested;
        const roi = totalInvested > 0 ? ((currentValue - totalInvested) / totalInvested) * 100 : 0;
        const avgPrice = totalBTC > 0 ? totalInvested / totalBTC : 0;

        return {
            entries: entries.reverse(), // Show newest first
            totalInvested,
            totalBTC,
            currentValue,
            profit,
            roi,
            avgPrice,
            months: entries.length
        };
    }, [monthlyAmount, startDate, currentPrice]);

    const isProfitable = dcaResults.profit >= 0;

    return (
        <div className="glass-panel flex flex-col">
            {/* Centered Header & Inputs */}
            <div className="flex flex-col items-center gap-2 mb-3" style={{ borderBottom: 'var(--glass-border)', paddingBottom: '0.8rem' }}>
                <div className="flex items-center gap-2">
                    <History className="text-primary" size={20} />
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Simulador DCA</h2>
                </div>
                <div className="flex gap-2 w-full justify-center">
                    <div className="relative">
                        <DollarSign size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted" />
                        <input
                            type="number"
                            value={monthlyAmount}
                            onChange={(e) => setMonthlyAmount(e.target.value)}
                            placeholder="0"
                            className="input-dark"
                            style={{ width: '100px', padding: '0.4rem 0.4rem 0.4rem 1.75rem', fontSize: '1.1rem', height: '36px', textAlign: 'center' }}
                            min="0"
                            step="10"
                        />
                    </div>
                    <input
                        type="month"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="input-dark"
                        style={{ width: '140px', padding: '0.4rem', fontSize: '1.1rem', height: '36px' }}
                        min="2015-01"
                        max={getMonthKey(new Date())}
                    />
                </div>
            </div>

            {/* Ultra-Compact Results */}
            <div style={{
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px',
                padding: '0.5rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <div className="text-muted text-xs uppercase">Total</div>
                        <div className={`font-bold ${isProfitable ? 'text-success' : 'text-danger'}`} style={{ fontSize: '1.5rem', lineHeight: 1 }}>
                            ${dcaResults.currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`badge ${isProfitable ? 'badge-success' : 'badge-danger'}`} style={{ padding: '0.1rem 0.5rem', fontSize: '1rem' }}>
                            {isProfitable ? '+' : ''}{dcaResults.roi.toFixed(1)}%
                        </div>
                        <div className={`font-mono font-bold mt-1 ${isProfitable ? 'text-success' : 'text-danger'}`} style={{ fontSize: '1.1rem' }}>
                            {isProfitable ? '+' : ''}${dcaResults.profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3" style={{ fontSize: '0.95rem' }}>
                    <div className="flex justify-between p-2 rounded bg-black/20">
                        <span className="text-muted">Invertido</span>
                        <span className="font-mono">${dcaResults.totalInvested.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-black/20">
                        <span className="text-muted">Avg Price</span>
                        <span className="font-mono">${dcaResults.avgPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        <Bitcoin size={14} className="text-primary" />
                        <span className="font-mono font-bold text-base">{dcaResults.totalBTC.toFixed(6)}</span>
                        <span className="text-muted text-xs">BTC</span>
                    </div>
                </div>
            </div>

            {/* Toggle Table Button */}
            <button
                onClick={() => setShowTable(!showTable)}
                className="btn btn-secondary mt-4 w-full flex items-center justify-center gap-2 text-sm"
            >
                <Table2 size={14} />
                {showTable ? 'Ocultar' : 'Ver'} Detalle Mensual
                {showTable ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {/* Detailed Table (Collapsible) */}
            {showTable && (
                <div className="mt-4 overflow-hidden rounded-lg border border-white/5 bg-black/20">
                    <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                        <table className="w-full text-xs collapse-table">
                            <thead className="sticky top-0 bg-[#0f141e] z-10">
                                <tr>
                                    <th className="p-1 text-left text-muted font-medium">Mes</th>
                                    <th className="p-1 text-right text-muted font-medium">Precio</th>
                                    <th className="p-1 text-right text-muted font-medium">BTC</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dcaResults.entries.map((entry) => (
                                    <tr key={entry.month} className="border-t border-white/5 hover:bg-white/5">
                                        <td className="p-1 font-mono text-muted">{entry.monthLabel}</td>
                                        <td className="p-1 text-right font-mono">${entry.price.toLocaleString()}</td>
                                        <td className="p-1 text-right font-mono text-primary">+{entry.btcBought.toFixed(6)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DCASimulator;
