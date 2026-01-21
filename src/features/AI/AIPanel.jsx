import React, { useState } from 'react';
import { Bot, Zap, Brain, Sparkles, Send, X, MessageCircle } from 'lucide-react';

// Mock AI responses based on common questions
const AI_RESPONSES = {
    'default': '¡Hola! Soy tu asistente de análisis de Cripto Andes. Puedo ayudarte a entender las métricas del dashboard, explicar la fórmula especulativa, o discutir tendencias del mercado. ¿En qué puedo ayudarte?',
    'formula': 'La fórmula PBTC = (RI × CP × 2^NH) / RF modela el precio teórico basado en: la recompensa inicial (50 BTC), el costo de producción minera, el número de halvings transcurridos, y la recompensa actual. Es un modelo especulativo que asume que el precio tiende hacia el equilibrio con los costos de minería.',
    'halving': 'El próximo halving de Bitcoin está programado para aproximadamente Abril 2028 (bloque ~1,050,000). Históricamente, los halvings han precedido ciclos alcistas significativos, aunque rendimientos pasados no garantizan resultados futuros.',
    'dca': 'Dollar Cost Averaging (DCA) es una estrategia que reduce el impacto de la volatilidad al invertir cantidades fijas regularmente. El simulador muestra cómo esta estrategia habría funcionado históricamente con diferentes puntos de entrada.',
    'buy': 'Para comprar Bitcoin, puedes usar exchanges regulados como Binance, Coinbase, o Kraken. Recuerda: nunca inviertas más de lo que puedas permitirte perder, y considera usar almacenamiento en frío (hardware wallets) para montos significativos.'
};

export const AIPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: AI_RESPONSES.default }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            let response = AI_RESPONSES.default;
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes('formula') || lowerInput.includes('fórmula') || lowerInput.includes('calcula')) {
                response = AI_RESPONSES.formula;
            } else if (lowerInput.includes('halving') || lowerInput.includes('reducción')) {
                response = AI_RESPONSES.halving;
            } else if (lowerInput.includes('dca') || lowerInput.includes('recurrente') || lowerInput.includes('mensual')) {
                response = AI_RESPONSES.dca;
            } else if (lowerInput.includes('comprar') || lowerInput.includes('buy') || lowerInput.includes('exchange')) {
                response = AI_RESPONSES.buy;
            }

            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsTyping(false);
        }, 1000);
    };

    const quickQuestions = [
        '¿Cómo funciona la fórmula?',
        '¿Cuándo es el próximo halving?',
        '¿Qué es DCA?'
    ];

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-50 rounded-full p-4 shadow-lg hover:scale-110 transition-transform"
                style={{
                    background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-purple))',
                    boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}
            >
                <Bot size={32} color="white" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                </span>
            </button>
        );
    }

    return (
        <div className="fixed bottom-8 right-8 z-50 glass-panel flex flex-col shadow-2xl"
            style={{
                width: '350px',
                height: '500px',
                maxHeight: '80vh',
                background: 'rgba(10, 14, 23, 0.95)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--glass-border)'
            }}>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2 p-4" style={{ borderBottom: 'var(--glass-border)' }}>
                <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-purple))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Brain size={16} />
                </div>
                <div>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>AI Analyst</h2>
                    <span className="text-muted" style={{ fontSize: '0.65rem' }}>Asistente en vivo</span>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="ml-auto p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X size={18} className="text-muted" />
                </button>
            </div>

            {/* Daily Insight (Compact) */}
            <div className="px-4 py-2">
                <div style={{
                    background: 'rgba(0, 212, 255, 0.05)',
                    border: '1px solid rgba(0, 212, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '0.75rem'
                }}>
                    <div className="flex items-center gap-2 mb-1">
                        <Zap size={12} className="text-warning" />
                        <span style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase' }} className="text-cyan">
                            Insight
                        </span>
                    </div>
                    <p style={{ fontSize: '0.7rem', lineHeight: 1.4 }} className="text-secondary">
                        "Sentimiento cautelosamente optimista. Soporte clave en $95k."
                    </p>
                </div>
            </div>

            {/* Chat Messages */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '0 1rem',
                margin: '0.5rem 0'
            }}>
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        style={{
                            marginBottom: '0.75rem',
                            display: 'flex',
                            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                        }}
                    >
                        <div style={{
                            maxWidth: '85%',
                            padding: '0.6rem 0.8rem',
                            borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                            background: msg.role === 'user'
                                ? 'linear-gradient(135deg, var(--accent-primary), #ff9f43)'
                                : 'rgba(255,255,255,0.08)',
                            color: msg.role === 'user' ? '#000' : 'var(--text-main)',
                            fontSize: '0.75rem',
                            lineHeight: 1.4
                        }}>
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                        <Bot size={12} />
                        <span style={{ fontSize: '0.7rem' }}>Escribiendo...</span>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 pt-2 mt-auto">
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                    {quickQuestions.map((q, idx) => (
                        <button
                            key={idx}
                            onClick={() => setInput(q)}
                            style={{
                                padding: '0.25rem 0.6rem',
                                fontSize: '0.65rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                whiteSpace: 'nowrap',
                                color: 'var(--text-secondary)'
                            }}
                        >
                            {q}
                        </button>
                    ))}
                </div>

                <div className="flex gap-2 relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Escribe un mensaje..."
                        className="input-dark"
                        style={{ flex: 1, fontSize: '0.8rem', paddingRight: '2.5rem' }}
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-1 top-1 bottom-1 aspect-square flex items-center justify-center rounded-lg hover:bg-white/10 text-primary transition-colors"
                        disabled={!input.trim()}
                    >
                        <Send size={16} />
                    </button>
                </div>

                <p className="text-muted text-center mt-2" style={{ fontSize: '0.6rem', opacity: 0.5 }}>
                    AI Beta by Cripto Andes
                </p>
            </div>
        </div>
    );
};

export default AIPanel;
