import React, { useState, useMemo, useEffect } from 'react';
import { Building2, TrendingUp, Briefcase, Database, ExternalLink, RefreshCw } from 'lucide-react';

// Fallback ETF Bitcoin Holdings Data (Updated Jan 2026)
const ETF_HOLDINGS = [
    {
        id: 'ibit',
        name: 'iShares Bitcoin Trust',
        ticker: 'IBIT',
        provider: 'BlackRock',
        btcHoldings: 553419,
        marketCap: 53.2,
        url: 'https://www.blackrock.com/us/financial-professionals/products/bitcoin-etf'
    },
    {
        id: 'gbtc',
        name: 'Grayscale Bitcoin Trust',
        ticker: 'GBTC',
        provider: 'Grayscale',
        btcHoldings: 207891,
        marketCap: 20.0,
        url: 'https://grayscale.com/products/grayscale-bitcoin-trust/'
    },
    {
        id: 'fbtc',
        name: 'Fidelity Wise Origin Bitcoin Fund',
        ticker: 'FBTC',
        provider: 'Fidelity',
        btcHoldings: 201526,
        marketCap: 19.4,
        url: 'https://www.fidelity.com/products/etfs/bitcoin-etf'
    },
    {
        id: 'arkb',
        name: 'ARK 21Shares Bitcoin ETF',
        ticker: 'ARKB',
        provider: 'ARK Invest',
        btcHoldings: 54142,
        marketCap: 5.2,
        url: 'https://ark-funds.com/arkb'
    },
    {
        id: 'bitb',
        name: 'Bitwise Bitcoin ETF',
        ticker: 'BITB',
        provider: 'Bitwise',
        btcHoldings: 42370,
        marketCap: 4.1,
        url: 'https://bitwiseinvestments.com/crypto-funds/bitb'
    },
    {
        id: 'hodl',
        name: 'VanEck Bitcoin Trust',
        ticker: 'HODL',
        provider: 'VanEck',
        btcHoldings: 13119,
        marketCap: 1.3,
        url: 'https://www.vaneck.com/us/en/investments/bitcoin-etf-hodl/'
    },
    {
        id: 'btco',
        name: 'Invesco Galaxy Bitcoin ETF',
        ticker: 'BTCO',
        provider: 'Invesco',
        btcHoldings: 11205,
        marketCap: 1.1,
        url: 'https://www.invesco.com/us/financial-products/etfs/product-detail?audienceType=Investor&ticker=BTCO'
    },
    {
        id: 'ezbc',
        name: 'Franklin Bitcoin ETF',
        ticker: 'EZBC',
        provider: 'Franklin Templeton',
        btcHoldings: 9841,
        marketCap: 0.95,
        url: 'https://www.franklintempleton.com/investments/options/exchange-traded-funds/products'
    }
];

// Fallback Corporate Bitcoin Holdings Data (Updated Jan 2026)
const CORPORATE_HOLDINGS = [
    {
        id: 'microstrategy',
        name: 'MicroStrategy',
        ticker: 'MSTR',
        btcHoldings: 439000,
        avgPrice: 61725,
        industry: 'Business Intelligence',
        url: 'https://www.microstrategy.com/bitcoin'
    },
    {
        id: 'marathon',
        name: 'Marathon Digital',
        ticker: 'MARA',
        btcHoldings: 34794,
        avgPrice: 48500,
        industry: 'Bitcoin Mining',
        url: 'https://marathondh.com/'
    },
    {
        id: 'tesla',
        name: 'Tesla',
        ticker: 'TSLA',
        btcHoldings: 11509,
        avgPrice: 32610,
        industry: 'Automotive/Energy',
        url: 'https://www.tesla.com/'
    },
    {
        id: 'coinbase',
        name: 'Coinbase',
        ticker: 'COIN',
        btcHoldings: 9480,
        avgPrice: 28950,
        industry: 'Cryptocurrency Exchange',
        url: 'https://www.coinbase.com/'
    },
    {
        id: 'riot',
        name: 'Riot Platforms',
        ticker: 'RIOT',
        btcHoldings: 10427,
        avgPrice: 42300,
        industry: 'Bitcoin Mining',
        url: 'https://www.riotplatforms.com/'
    },
    {
        id: 'block',
        name: 'Block (Square)',
        ticker: 'SQ',
        btcHoldings: 8027,
        avgPrice: 24500,
        industry: 'Fintech',
        url: 'https://block.xyz/'
    },
    {
        id: 'hut8',
        name: 'Hut 8 Mining',
        ticker: 'HUT',
        btcHoldings: 9102,
        avgPrice: 38200,
        industry: 'Bitcoin Mining',
        url: 'https://hut8.com/'
    },
    {
        id: 'cleanspark',
        name: 'CleanSpark',
        ticker: 'CLSK',
        btcHoldings: 8445,
        avgPrice: 45800,
        industry: 'Bitcoin Mining',
        url: 'https://www.cleanspark.com/'
    }
];

const HoldingRow = ({ holding, type, currentPrice }) => {
    const currentValue = holding.btcHoldings * currentPrice;
    const profitLoss = type === 'corporate' && holding.avgPrice
        ? ((currentPrice - holding.avgPrice) / holding.avgPrice) * 100
        : null;

    return (
        <tr
            className="holding-row"
            style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.2s ease'
            }}
        >
            <td style={{ padding: '1rem 0.75rem', minWidth: '180px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            background: type === 'etf'
                                ? 'linear-gradient(135deg, #00D4FF, #A855F7)'
                                : 'linear-gradient(135deg, #F7931A, #FF3D71)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >
                        {type === 'etf' ? (
                            <Database size={18} color="#fff" />
                        ) : (
                            <Building2 size={18} color="#fff" />
                        )}
                    </div>
                    <div>
                        <div className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>
                            {holding.name}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {holding.ticker} {type === 'etf' && `• ${holding.provider}`}
                        </div>
                    </div>
                </div>
            </td>
            <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>
                <div className="font-mono font-bold" style={{ color: 'var(--accent-warning)' }}>
                    {holding.btcHoldings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-muted">BTC</div>
            </td>
            <td style={{ padding: '1rem 0.75rem', textAlign: 'right' }}>
                <div className="font-mono font-bold" style={{ color: 'var(--accent-success)' }}>
                    ${(currentValue / 1e9).toFixed(2)}B
                </div>
                {type === 'corporate' && holding.avgPrice && (
                    <div className="text-xs" style={{
                        color: profitLoss >= 0 ? 'var(--accent-success)' : 'var(--accent-danger)'
                    }}>
                        {profitLoss >= 0 ? '+' : ''}{profitLoss.toFixed(1)}%
                    </div>
                )}
            </td>
            <td style={{ padding: '1rem 0.75rem', textAlign: 'center' }}>
                {holding.url && (
                    <a
                        href={holding.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan hover:text-white transition-colors"
                    >
                        <ExternalLink size={14} />
                    </a>
                )}
            </td>
        </tr>
    );
};

export const InstitutionalHoldings = ({ currentPrice = 95800 }) => {
    const [activeTab, setActiveTab] = useState('etf'); // 'etf' or 'corporate'
    const [corporateData, setCorporateData] = useState(CORPORATE_HOLDINGS);
    const [etfData, setEtfData] = useState(ETF_HOLDINGS);
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchHoldings = async () => {
        setLoading(true);
        try {
            // Using CoinGecko's Public Companies API
            const response = await fetch('https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin');
            const data = await response.json();

            if (data && data.companies) {
                // Map the API data to our structure
                const mappedCompanies = data.companies.map((company, index) => {
                    // Try to match with our extensive fallback data for extra fields like URL/Industry
                    const fallbackMatch = CORPORATE_HOLDINGS.find(c => c.ticker === company.symbol || c.name.toLowerCase().includes(company.name.toLowerCase()));

                    return {
                        id: `api-corp-${index}`,
                        name: company.name,
                        ticker: company.symbol,
                        btcHoldings: company.total_holdings,
                        // If API provides entry_value_usd, use it, otherwise use fallback or estimate
                        avgPrice: fallbackMatch?.avgPrice || (company.total_entry_value_usd / company.total_holdings),
                        industry: fallbackMatch?.industry || 'Public Company',
                        url: fallbackMatch?.url || null
                    };
                });

                // Prioritize MicroStrategy (MSTR) at the top if found
                const mstrIndex = mappedCompanies.findIndex(c => c.ticker === 'MSTR');
                if (mstrIndex > -1) {
                    const mstr = mappedCompanies.splice(mstrIndex, 1)[0];
                    mappedCompanies.unshift(mstr);
                }

                setCorporateData(mappedCompanies.slice(0, 15));
                setLastUpdated(new Date());
            }
        } catch (error) {
            console.error('Failed to fetch corporate holdings:', error);
            // On error, keep using the static fallback (which is now updated to Jan 2026 estimates)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHoldings();
        // Refresh every 5 minutes
        const interval = setInterval(fetchHoldings, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const totalETFBTC = useMemo(() =>
        etfData.reduce((sum, etf) => sum + etf.btcHoldings, 0),
        [etfData]
    );

    const totalCorporateBTC = useMemo(() =>
        corporateData.reduce((sum, corp) => sum + corp.btcHoldings, 0),
        [corporateData]
    );

    const activeData = activeTab === 'etf' ? etfData : corporateData;
    const totalBTC = activeTab === 'etf' ? totalETFBTC : totalCorporateBTC;

    return (
        <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                paddingBottom: '1rem',
                marginBottom: '1rem'
            }}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Briefcase className="text-primary" size={20} />
                        <h2 className="font-bold text-lg">Holdings Institucionales</h2>
                        {loading && <RefreshCw size={14} className="animate-spin text-muted" />}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        {lastUpdated && !loading && (
                            <span className="text-muted mr-2 opacity-60">
                                {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        )}
                        <span className="text-muted">Total:</span>
                        <span className="font-mono font-bold text-warning">
                            {totalBTC.toLocaleString()} BTC
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('etf')}
                        className="flex-1 py-2 px-4 rounded text-sm font-bold transition-all"
                        style={{
                            background: activeTab === 'etf'
                                ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(168, 85, 247, 0.2))'
                                : 'rgba(255, 255, 255, 0.05)',
                            border: `1px solid ${activeTab === 'etf' ? 'var(--accent-secondary)' : 'rgba(255, 255, 255, 0.1)'}`,
                            color: activeTab === 'etf' ? 'var(--accent-secondary)' : 'var(--text-muted)'
                        }}
                    >
                        <Database size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                        ETFs ({etfData.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('corporate')}
                        className="flex-1 py-2 px-4 rounded text-sm font-bold transition-all"
                        style={{
                            background: activeTab === 'corporate'
                                ? 'linear-gradient(135deg, rgba(247, 147, 26, 0.2), rgba(255, 61, 113, 0.2))'
                                : 'rgba(255, 255, 255, 0.05)',
                            border: `1px solid ${activeTab === 'corporate' ? 'var(--accent-warning)' : 'rgba(255, 255, 255, 0.1)'}`,
                            color: activeTab === 'corporate' ? 'var(--accent-warning)' : 'var(--text-muted)'
                        }}
                    >
                        <Building2 size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                        Empresas ({corporateData.length})
                    </button>
                </div>
            </div>

            {/* Holdings Table */}
            <div style={{ flex: 1, overflowY: 'auto', marginRight: '-1rem', paddingRight: '1rem' }} className="custom-scrollbar">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead
                        style={{
                            position: 'sticky',
                            top: 0,
                            background: 'var(--bg-darker)',
                            zIndex: 10
                        }}
                    >
                        <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                            <th style={{
                                padding: '0.75rem',
                                textAlign: 'left',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: 'var(--text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                {activeTab === 'etf' ? 'ETF' : 'Empresa'}
                            </th>
                            <th style={{
                                padding: '0.75rem',
                                textAlign: 'right',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: 'var(--text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                BTC
                            </th>
                            <th style={{
                                padding: '0.75rem',
                                textAlign: 'right',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: 'var(--text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Valor
                            </th>
                            <th style={{
                                padding: '0.75rem',
                                textAlign: 'center',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: 'var(--text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Link
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeData.map(holding => (
                            <HoldingRow
                                key={holding.id}
                                holding={holding}
                                type={activeTab}
                                currentPrice={currentPrice}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary Footer */}
            <div
                style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                    padding: '1rem'
                }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-xs text-muted uppercase">Total en Holdings</div>
                        <div className="font-mono font-bold text-xl" style={{ color: 'var(--accent-primary)' }}>
                            ${((totalBTC * currentPrice) / 1e9).toFixed(2)}B USD
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-muted uppercase">Porcentaje Circulante</div>
                        <div className="font-mono font-bold text-lg text-cyan">
                            {((totalBTC / 19800000) * 100).toFixed(2)}%
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .holding-row:hover {
                    background: rgba(255, 255, 255, 0.03) !important;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default InstitutionalHoldings;
