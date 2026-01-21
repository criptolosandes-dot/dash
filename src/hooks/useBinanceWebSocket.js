import { useState, useEffect, useRef, useCallback } from 'react';

const WS_URL = 'wss://stream.binance.com:9443/ws';

export const useBinanceWebSocket = (symbol = 'btcusdt') => {
    const [price, setPrice] = useState(0);
    const [priceChange24h, setPriceChange24h] = useState(0);
    const [candleData, setCandleData] = useState(null);
    const [historicalCandles, setHistoricalCandles] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef(null);
    const reconnectTimeout = useRef(null);

    // Fetch historical klines for initial chart data
    const fetchHistoricalData = useCallback(async () => {
        try {
            const response = await fetch(
                `https://api.binance.com/api/v3/klines?symbol=${symbol.toUpperCase()}&interval=1w&limit=100`
            );
            const data = await response.json();

            const candles = data.map(k => ({
                time: k[0] / 1000,
                open: parseFloat(k[1]),
                high: parseFloat(k[2]),
                low: parseFloat(k[3]),
                close: parseFloat(k[4]),
            }));

            setHistoricalCandles(candles);
        } catch (error) {
            console.error('Failed to fetch historical data:', error);
        }
    }, [symbol]);

    // Fetch 24h ticker for price change
    const fetch24hTicker = useCallback(async () => {
        try {
            const response = await fetch(
                `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol.toUpperCase()}`
            );
            const data = await response.json();
            setPriceChange24h(parseFloat(data.priceChangePercent));
        } catch (error) {
            console.error('Failed to fetch 24h ticker:', error);
        }
    }, [symbol]);

    const connect = useCallback(() => {
        if (ws.current?.readyState === WebSocket.OPEN) return;

        const wsUrl = `${WS_URL}/${symbol}@kline_1w`;
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            console.log('✅ Connected to Binance WebSocket');
            setIsConnected(true);
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
                reconnectTimeout.current = null;
            }
        };

        ws.current.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.k) {
                    const kline = message.k;
                    const currentPrice = parseFloat(kline.c);

                    setPrice(currentPrice);
                    setCandleData({
                        time: Math.floor(kline.t / 1000),
                        open: parseFloat(kline.o),
                        high: parseFloat(kline.h),
                        low: parseFloat(kline.l),
                        close: parseFloat(kline.c),
                    });
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        ws.current.onerror = (error) => {
            console.error('❌ WebSocket Error:', error);
            setIsConnected(false);
        };

        ws.current.onclose = () => {
            console.log('🔌 WebSocket disconnected, attempting reconnect...');
            setIsConnected(false);
            // Attempt reconnect after 3 seconds
            reconnectTimeout.current = setTimeout(() => {
                connect();
            }, 3000);
        };
    }, [symbol]);

    useEffect(() => {
        fetchHistoricalData();
        fetch24hTicker();
        connect();

        // Refresh 24h ticker every minute
        const tickerInterval = setInterval(fetch24hTicker, 60000);

        return () => {
            clearInterval(tickerInterval);
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
            }
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [connect, fetchHistoricalData, fetch24hTicker]);

    return {
        price,
        priceChange24h,
        candleData,
        historicalCandles,
        isConnected
    };
};

export default useBinanceWebSocket;
