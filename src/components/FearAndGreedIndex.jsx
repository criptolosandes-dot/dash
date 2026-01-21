import React, { useState, useEffect } from 'react';
import { Gauge } from 'lucide-react';

export const FearAndGreedIndex = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFNG = async () => {
            try {
                const response = await fetch('https://api.alternative.me/fng/?limit=1');
                const result = await response.json();
                if (result.data && result.data.length > 0) {
                    setData(result.data[0]);
                }
            } catch (error) {
                console.error('Error fetching Fear & Greed Index:', error);
                // Fallback mock data
                setData({ value: "72", value_classification: "Greed", time_until_update: "123456" });
            } finally {
                setLoading(false);
            }
        };

        fetchFNG();
    }, []);

    const getValueColor = (value) => {
        const val = parseInt(value);
        if (val >= 75) return 'var(--accent-success)'; // Extreme Greed
        if (val >= 55) return '#a3e635'; // Greed
        if (val >= 45) return 'var(--accent-warning)'; // Neutral
        if (val >= 25) return '#f87171'; // Fear
        return 'var(--accent-danger)'; // Extreme Fear
    };

    if (loading) return <div className="animate-pulse h-full bg-white/5 rounded-lg"></div>;

    const color = getValueColor(data?.value || 0);

    return (
        <div className="h-full flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
                <Gauge size={18} className="text-muted" />
                <h3 className="text-sm font-bold text-muted uppercase tracking-wider">Fear & Greed</h3>
            </div>

            <div className="flex flex-col items-center justify-center py-4 relative">
                {/* Simple CSS Arc Mockup */}
                <div style={{
                    width: '120px',
                    height: '60px',
                    borderTopLeftRadius: '120px',
                    borderTopRightRadius: '120px',
                    border: '12px solid rgba(255,255,255,0.1)',
                    borderBottom: '0',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: `conic-gradient(from 180deg at 50% 100%, var(--accent-danger) 0deg, var(--accent-warning) 90deg, var(--accent-success) 180deg)`,
                        opacity: 0.3
                    }}></div>
                </div>

                {/* Value */}
                <div className="text-center mt-[-10px] z-10">
                    <span style={{
                        fontSize: '3rem',
                        fontWeight: '800',
                        color: color,
                        textShadow: `0 0 20px ${color}40`,
                        lineHeight: 1
                    }}>
                        {data?.value}
                    </span>
                    <p className="text-sm uppercase tracking-widest font-bold mt-1" style={{ color: color }}>
                        {data?.value_classification}
                    </p>
                </div>
            </div>

            <div className="text-center text-muted border-t border-white/5 pt-3 mt-2">
                Sentiment Market Update
            </div>
        </div>
    );
};
