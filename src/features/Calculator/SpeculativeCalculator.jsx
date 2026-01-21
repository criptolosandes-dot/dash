import React, { useState, useMemo } from 'react';
import { Info, Bitcoin, ArrowRight, AlertCircle, Trophy } from 'lucide-react';

export const SpeculativeCalculator = ({ currentPrice = 95800 }) => {
    // State
    const [investmentUSD, setInvestmentUSD] = useState(1000);
    const [investmentBTC, setInvestmentBTC] = useState(0);
    const [productionCost, setProductionCost] = useState(60000); // CP: Costo Producción
    const [inputMode, setInputMode] = useState('usd'); // 'usd' or 'btc'
    const [showInfo, setShowInfo] = useState(false);

    // Constants
    const RI_INITIAL = 3.125; // Recompensa Inicial (Base 2024)
    const RETIREMENT_GOAL = 1000000; // $1 Million USD
    const CURRENT_HALVING_INDEX = 4; // 2024 es el 4to halving

    // Calculate BTC amount from investment
    const btcAmount = useMemo(() => {
        if (inputMode === 'btc') {
            return investmentBTC;
        }
        return investmentUSD / currentPrice;
    }, [investmentUSD, investmentBTC, currentPrice, inputMode]);

    // Calculate projected price and value for each halving (2024 - 2068)
    const calculateProjections = useMemo(() => {
        const projections = [];
        let retirementHalving = null;

        // Generate projections for Halving 4 (2024) to Halving 15 (2068)
        for (let h = 4; h <= 15; h++) {
            const year = 2024 + (h - 4) * 4;
            const nh = h - 4; // Number of Halvings since model start

            // Formula Logic:
            // RF = RI / 2^NH
            const rf = RI_INITIAL / Math.pow(2, nh);

            // PBTC = ((RI * CP) * (2^NH)) / RF
            // Simplification: PBTC = CP * 4^NH
            // We use the full formula for display accuracy if needed, but simplification is exact.
            const pbtc = productionCost * Math.pow(4, nh);

            const investmentValue = btcAmount * pbtc;

            projections.push({
                halving: h,
                year,
                reward: rf,
                btcPrice: pbtc,
                investmentValue,
                reachedGoal: investmentValue >= RETIREMENT_GOAL
            });

            // Find first halving where we reach retirement goal
            if (!retirementHalving && investmentValue >= RETIREMENT_GOAL) {
                retirementHalving = h;
            }
        }

        return { projections, retirementHalving };
    }, [btcAmount, productionCost]);

    const { projections, retirementHalving } = calculateProjections;
    const retirementProjection = projections.find(p => p.halving === retirementHalving);

    const formatCurrency = (num) => {
        if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
        if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
        if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
        return `$${num.toFixed(2)}`;
    };

    return (
        <div className="glass-panel h-full flex flex-col gap-5">
            {/* Header simplified */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Bitcoin className="text-warning" size={20} />
                    <span className="font-bold text-lg">Jubilación Bitcoin</span>
                </div>
                <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="text-muted hover:text-white transition-colors"
                    title="Configuración Modelo"
                >
                    <Info size={18} />
                </button>
            </div>

            {/* Formula (Always Visible & Minimalist) */}
            <div className="text-center py-2">
                <div className="font-serif italic text-xl text-muted opacity-80" style={{ fontFamily: 'serif' }}>
                    PBTC = <span className="border-b border-muted/30">((RI * CP) * 2<sup>NH</sup>)</span> / RF
                </div>
            </div>

            {/* Config Panel (Hidden by default or minimal) */}
            {showInfo && (
                <div className="bg-black/40 rounded p-3 mb-2 animate-in fade-in slide-in-from-top-2">
                    <label className="text-xs text-muted uppercase font-bold block mb-1">Costo Producción (CP)</label>
                    <input
                        type="number"
                        value={productionCost}
                        onChange={(e) => setProductionCost(Number(e.target.value))}
                        className="input-dark w-full text-sm"
                    />
                </div>
            )}

            {/* Inputs: USD <-> BTC */}
            <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-success font-bold">$</span>
                    <input
                        type="number"
                        value={inputMode === 'btc' ? (investmentBTC * currentPrice).toFixed(2) : investmentUSD}
                        onChange={(e) => {
                            setInvestmentUSD(Number(e.target.value));
                            setInputMode('usd');
                        }}
                        className={`input-dark w-full pl-6 font-mono text-center text-lg ${inputMode === 'usd' ? 'border-success' : ''}`}
                    />
                </div>
                <div className="text-muted">
                    <ArrowRight size={16} />
                </div>
                <div className="flex-1 relative">
                    <Bitcoin className="absolute left-3 top-1/2 -translate-y-1/2 text-warning" size={16} />
                    <input
                        type="number"
                        value={inputMode === 'usd' ? (investmentUSD / currentPrice).toFixed(8) : investmentBTC} // Display derived if USD mode
                        onChange={(e) => {
                            setInputMode('btc');
                            const val = Number(e.target.value);
                            setInvestmentBTC(val);
                            // Update USD state with 2 decimal precision
                            setInvestmentUSD(Number((val * currentPrice).toFixed(2)));
                        }}
                        className={`input-dark w-full pl-8 font-mono text-center text-lg ${inputMode === 'btc' ? 'border-warning' : ''}`}
                        step="0.00000001"
                    />
                </div>
            </div>

            {/* Dual Cards: Actual vs Jubilación */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {/* Halving Actual */}
                <div className="rounded-xl border border-white/10 p-3 flex flex-col items-center justify-center text-center bg-white/5">
                    <span className="text-sm text-muted uppercase tracking-wider mb-1">Halving Actual</span>
                    <span className="text-2xl font-bold">{CURRENT_HALVING_INDEX}</span>
                    <div className="mt-2 text-sm text-muted">
                        <div>Año {new Date().getFullYear()}</div>
                        <div>Rec: {RI_INITIAL}</div>
                    </div>
                </div>

                {/* Halving Jubilación */}
                <div className={`rounded-xl border p-3 flex flex-col items-center justify-center text-center transition-colors ${retirementProjection ? 'border-success/30 bg-success/5' : 'border-white/10 bg-white/5'}`}>
                    <span className={`text-sm uppercase tracking-wider mb-1 ${retirementProjection ? 'text-success' : 'text-muted'}`}>
                        {retirementProjection ? 'Meta Jubilación' : 'Meta no alcanzada'}
                    </span>
                    <div className="text-2xl font-bold">
                        {retirementProjection ? retirementProjection.halving : '-'}
                    </div>
                    {retirementProjection && (
                        <div className="mt-2 text-sm text-muted">
                            <div>Año {retirementProjection.year}</div>
                            <div className="text-success font-bold font-mono">
                                {formatCurrency(retirementProjection.investmentValue)}
                            </div>
                            <div className="text-sm text-muted text-right mt-1">
                                ≈ {btcAmount.toFixed(8)} BTC
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* List Table (Minimalist) */}
            <div className="flex-1 flex flex-col min-h-0">
                <h3 className="text-center text-sm font-bold text-muted uppercase tracking-wider mb-3">
                    Equivalencia en cada Halving
                </h3>
                <div className="overflow-y-auto custom-scrollbar flex-1 pr-1">
                    <div className="flex flex-col gap-2">
                        {/* Header Row */}
                        <div className="text-sm text-muted px-3 pb-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                            <span>Año</span>
                            <span className="text-right">PBTC</span>
                            <span className="text-right">Inversión</span>
                        </div>

                        {projections.map((p) => {
                            const isMilestone = p.reachedGoal && (!retirementProjection || p.halving === retirementProjection.halving);
                            return (
                                <div
                                    key={p.halving}
                                    className={`items-center p-3 rounded-lg border transition-all ${isMilestone
                                        ? 'bg-success/10 border-success/30'
                                        : 'bg-white/5 border-transparent hover:bg-white/10'
                                        }`}
                                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}
                                >
                                    <div className="font-mono text-base font-bold text-muted">{p.year}</div>
                                    <div className="text-right font-mono text-base text-cyan-200">
                                        {formatCurrency(p.btcPrice)}
                                    </div>
                                    <div className={`text-right font-mono text-base font-bold ${p.reachedGoal ? 'text-success' : 'text-white'}`}>
                                        {formatCurrency(p.investmentValue)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeculativeCalculator;

