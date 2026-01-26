import { useState, useEffect } from 'react';

const ALTCOIN_SYMBOLS = [
    'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT',
    'ADAUSDT', 'AVAXUSDT', 'DOGEUSDT', 'DOTUSDT',
    'LINKUSDT', 'MATICUSDT'
];

const SYMBOL_NAMES = {
    'ETH': 'Ethereum',
    'SOL': 'Solana',
    'BNB': 'Binance Coin',
    'XRP': 'Ripple',
    'ADA': 'Cardano',
    'AVAX': 'Avalanche',
    'DOGE': 'Dogecoin',
    'DOT': 'Polkadot',
    'LINK': 'Chainlink',
    'MATIC': 'Polygon'
};

export const useAltcoinPrices = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPrices = async () => {
        try {
            // Fetch 24hr ticker for all symbols
            const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
            const data = await response.json();

            // Filter for our target altcoins
            const relevantCoins = data
                .filter(ticker => ALTCOIN_SYMBOLS.includes(ticker.symbol))
                .map(ticker => {
                    const symbol = ticker.symbol.replace('USDT', '');
                    return {
                        symbol: symbol,
                        name: SYMBOL_NAMES[symbol] || symbol,
                        price: parseFloat(ticker.lastPrice),
                        change: parseFloat(ticker.priceChangePercent)
                    };
                });

            // Sort by the order in ALTCOIN_SYMBOLS for consistency
            const sortedCoins = relevantCoins.sort((a, b) => {
                const indexA = ALTCOIN_SYMBOLS.indexOf(a.symbol + 'USDT');
                const indexB = ALTCOIN_SYMBOLS.indexOf(b.symbol + 'USDT');
                return indexA - indexB;
            });

            setCoins(sortedCoins);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch altcoin prices:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrices();
        // Update every 30 seconds to avoid rate limits while keeping data relatively fresh
        const interval = setInterval(fetchPrices, 30000);
        return () => clearInterval(interval);
    }, []);

    return { coins, loading };
};
