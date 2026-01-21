import React, { useEffect, useRef, useState } from 'react';
import * as LightweightCharts from 'lightweight-charts';
import { useBinanceWebSocket } from '../../hooks/useBinanceWebSocket';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';

export const PriceChart = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);
    const [error, setError] = useState(null);
    const { candleData, historicalCandles, isConnected } = useBinanceWebSocket('btcusdt');

    // Initialize chart
    useEffect(() => {
        if (!chartContainerRef.current) return;

        try {
            console.log('Initializing chart inside container:', chartContainerRef.current);
            const chart = LightweightCharts.createChart(chartContainerRef.current, {
                layout: {
                    background: { type: LightweightCharts.ColorType.Solid, color: 'transparent' },
                    textColor: '#6b7280',
                    fontFamily: "'Inter', sans-serif",
                },
                grid: {
                    vertLines: { color: 'rgba(255, 255, 255, 0.03)' },
                    horzLines: { color: 'rgba(255, 255, 255, 0.03)' },
                },
                width: chartContainerRef.current.clientWidth || 800,
                height: 320,
                timeScale: {
                    timeVisible: true,
                    secondsVisible: false,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                rightPriceScale: {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                handleScroll: false,
                handleScale: false,
                crosshair: {
                    vertLine: {
                        color: 'rgba(247, 147, 26, 0.5)',
                        width: 1,
                        style: 2,
                        visible: true,
                        labelVisible: false
                    },
                    horzLine: {
                        color: 'rgba(247, 147, 26, 0.5)',
                        width: 1,
                        style: 2,
                        visible: true,
                        labelVisible: false
                    },
                },
            });

            const lineSeries = chart.addSeries(LightweightCharts.LineSeries, {
                color: '#FCD535', // Yellow
                lineWidth: 2,
                crosshairMarkerVisible: true,
                crosshairMarkerRadius: 4,
                lineType: 0, // Simple line
            });

            chartRef.current = chart;
            seriesRef.current = lineSeries;

            // Handle resize
            const handleResize = () => {
                if (chartContainerRef.current && chartRef.current) {
                    chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
                }
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                if (chartRef.current) {
                    chartRef.current.remove();
                    chartRef.current = null;
                }
            };
        } catch (err) {
            console.error('Error initializing chart:', err);
            setError(err.message);
        }
    }, []);

    // Load historical data
    useEffect(() => {
        if (seriesRef.current && historicalCandles && Array.isArray(historicalCandles) && historicalCandles.length > 0) {
            try {
                // Map candlestick data to line data
                const lineData = historicalCandles.map(c => ({
                    time: c.time,
                    value: c.close
                }));
                seriesRef.current.setData(lineData);
                chartRef.current?.timeScale().fitContent();
            } catch (err) {
                console.error('Error setting chart data:', err);
            }
        }
    }, [historicalCandles]);

    // Update with live data
    useEffect(() => {
        if (seriesRef.current && candleData && typeof candleData === 'object') {
            try {
                // Ensure data is valid for lightweight-charts
                if (candleData.time && candleData.close !== undefined) {
                    seriesRef.current.update({
                        time: candleData.time,
                        value: candleData.close
                    });
                }
            } catch (err) {
                console.error('Error updating chart:', err);
            }
        }
    }, [candleData]);

    if (error) {
        return (
            <div className="glass-panel flex flex-col items-center justify-center" style={{ height: '420px', gap: '1rem' }}>
                <AlertCircle className="text-danger" size={48} />
                <div className="text-center">
                    <h3 style={{ marginBottom: '0.5rem' }}>Error al cargar el gráfico</h3>
                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
            {/* Chart Header */}
            <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                        BTC / USDT
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>1w Candlestick</span>
                        <div className={`flex items-center gap-1 ${isConnected ? 'text-success' : 'text-danger'}`}
                            style={{ fontSize: '0.7rem' }}>
                            {isConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
                            {isConnected ? 'LIVE' : 'DISCONNECTED'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Container */}
            <div
                ref={chartContainerRef}
                style={{
                    width: '100%',
                    height: '320px',
                    paddingTop: '60px'
                }}
            />
        </div>
    );
};

export default PriceChart;
