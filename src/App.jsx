import React, { useState, useEffect } from 'react';
import { TrendingUp, Activity } from 'lucide-react';
import './App.css';

// Components
import { TickerHeader } from './components/TickerHeader';
import { Footer } from './components/Footer';
import { NavigationMenu } from './components/NavigationMenu'; // Updated import
import { AltcoinList } from './components/AltcoinList';
import { InstitutionalHoldings } from './components/InstitutionalHoldings'; // Added import
import { FearAndGreedIndex } from './components/FearAndGreedIndex';
import { HashrateDisplay } from './components/HashrateDisplay';
import { WalletsSection } from './components/WalletsSection';
import { LearnMore } from './components/LearnMore';

// Features
import { PriceChart }
  from './features/Chart/PriceChart';
import { SpeculativeCalculator } from './features/Calculator/SpeculativeCalculator';
import { AIPanel } from './features/AI/AIPanel';
import { DCASimulator } from './features/DCA/DCASimulator';

// Hooks
import { useBinanceWebSocket } from './hooks/useBinanceWebSocket';

function App() {
  const { price, priceChange24h } = useBinanceWebSocket('btcusdt');
  const currentPrice = price > 0 ? price : 102000;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="container" style={{ paddingTop: '150px', paddingBottom: '2rem' }}>
      <TickerHeader price={price} priceChange24h={priceChange24h} />

      <div className="moon-dashboard-grid">

        {/* Left Column: Navigation Menu */}
        <aside className="left-sidebar">
          <div className="card-wrapper" style={{ position: 'sticky', top: '150px' }}>
            <NavigationMenu />
          </div>
        </aside>

        {/* Center Column: Main Content Area */}
        <main className="center-content">

          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center mb-16 animate-slide-up" style={{ minHeight: '40vh', position: 'relative' }}>
            <div className="text-center">
              <h2 className="text-sm font-bold tracking-[8px] text-warning mb-4">EL CAMINO DE BITCOIN</h2>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                NO ES UNA MONEDA ES UNA SALIDA DE EMERGENCIA <br />
                <span className="text-gradient-gold">TODOS JUGAMOS BAJO LAS MISMAS REGLAS</span>
              </h1>
            </div>

            <div className="flex flex-col items-center gap-4 mt-8 animate-pulse-glow">
              <span className="text-xs font-bold tracking-widest text-muted">DESLIZA HACIA ABAJO</span>
              <div style={{ width: '1px', height: '40px', background: 'var(--accent-warning)' }}></div>
            </div>
          </div>

          {/* 1. Grafica de Bitcoin + Fear & Greed */}
          <div id="chart-section" className="section-wrapper mb-24" style={{ marginTop: '150px' }}>
            <div className="section-subtitle">
              <span className="section-line"></span> Pulso del Mercado
            </div>

            <div className="chart-row-grid">
              <div className="glass-panel flex flex-col gap-1" style={{ minHeight: '520px' }}>
                <div className="flex items-center justify-between mb-4 px-2">
                  <h2 className="text-2xl font-bold tracking-tight opacity-90">Análisis de Mercado Bitcoin</h2>
                </div>
                <div style={{ flex: 1, minHeight: 0 }}>
                  <PriceChart />
                </div>
              </div>

              <div className="glass-panel">
                <FearAndGreedIndex />
              </div>
            </div>
          </div>

          {/* 2. Exchanges */}
          <div id="exchanges-section" className="section-wrapper mb-24">
            <div className="section-subtitle">
              <span className="section-line"></span> Centro de Acción
            </div>

            <div className="grid grid-3 gap-8">
              <a href="https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00BKKM83BW&utm_source=" target="_blank" rel="noopener noreferrer"
                className="btn flex flex-col items-center justify-center gap-4 py-10 rounded-2xl font-bold text-lg hover:brightness-110 transition-all shadow-2xl glass-panel"
                style={{ color: '#FCD535', border: '1px solid rgba(252, 213, 53, 0.2)' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Binance_Logo.svg" alt="Binance" style={{ width: 32, height: 32 }} />
                BINANCE
              </a>
              <a href="https://share.bitget.com/u/NAL59U58" target="_blank" rel="noopener noreferrer"
                className="btn flex flex-col items-center justify-center gap-4 py-10 rounded-2xl font-bold text-lg hover:brightness-110 transition-all shadow-2xl glass-panel"
                style={{ color: '#00F0FF', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                <TrendingUp size={32} />
                BITGET
              </a>
              <a href="https://www.bitmex.com/register/YOUR_CODE" target="_blank" rel="noopener noreferrer"
                className="btn flex flex-col items-center justify-center gap-4 py-10 rounded-2xl font-bold text-lg hover:brightness-110 transition-all shadow-2xl glass-panel"
                style={{ color: '#FF3B30', border: '1px solid rgba(255, 59, 48, 0.2)' }}>
                <Activity size={32} />
                BITMEX
              </a>
            </div>
          </div>

          {/* 3. Portfolio Strategy */}
          <div className="section-wrapper mb-24">
            <div className="section-subtitle">
              <span className="section-line"></span> Estrategia de Portafolio
            </div>

            <div className="grid grid-2 gap-12">
              <div id="altcoins-section" className="glass-panel" style={{ maxHeight: '600px', overflow: 'hidden' }}>
                <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-6">Motores del Mercado</h3>
                <AltcoinList />
              </div>

              <div id="dca-section">
                <DCASimulator currentPrice={currentPrice} />
              </div>
            </div>
          </div>

          {/* 4. Institutional Intelligence */}
          <div id="holdings-section" className="section-wrapper mb-24">
            <div className="section-subtitle">
              <span className="section-line"></span> Inteligencia Institucional
            </div>
            <div className="glass-panel">
              <InstitutionalHoldings currentPrice={currentPrice} />
            </div>
          </div>

          {/* 5. Future Projections */}
          <div id="calculator-section" className="section-wrapper mb-20">
            <div className="section-subtitle">
              <span className="section-line"></span> Proyecciones Futuras
            </div>
            <SpeculativeCalculator currentPrice={currentPrice} />
          </div>

          {/* 6. Hashrate Section - Relocated */}
          <div id="hashrate-section" className="section-wrapper mb-24">
            <div className="section-subtitle">
              <span className="section-line"></span> Seguridad de la Red
            </div>
            <HashrateDisplay />
          </div>

          {/* 7. Wallets Section - NEW */}
          <div id="wallets-section" className="section-wrapper mb-24">
            <div className="section-subtitle">
              <span className="section-line"></span> Billeteras Digitales
            </div>
            <WalletsSection />
          </div>

          {/* 8. Learn More Section - Education */}
          <div id="learn-more" className="section-wrapper mb-24">
            <div className="section-subtitle">
              <span className="section-line"></span> Educación Bitcoin
            </div>
            <div className="glass-panel">
              <LearnMore />
            </div>
          </div>

        </main>
      </div>

      <AIPanel />
      <Footer />

      <style>{`
        .moon-dashboard-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3.5rem;
          margin-bottom: 2rem;
          align-items: start;
        }
        
        .chart-row-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .left-sidebar {
          /* Fixed width sidebar */
        }

        .center-content {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        @media (max-width: 1200px) {
           .moon-dashboard-grid {
              grid-template-columns: 80px 1fr;
              gap: 2rem;
           }
           .left-sidebar .card-wrapper {
              width: 80px;
              padding: 0;
              overflow: hidden;
           }
           .left-sidebar .nav-text, 
           .left-sidebar h3, 
           .left-sidebar .border-t {
              display: none;
           }
           .left-sidebar .nav-icon {
              margin: 0 auto;
           }
        }

        @media (max-width: 1024px) {
            .chart-row-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
        }

        @media (max-width: 768px) {
          .moon-dashboard-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .left-sidebar {
             display: none;
          }
          .section-number {
             font-size: 5rem;
             top: -30px;
             left: -10px;
             opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
