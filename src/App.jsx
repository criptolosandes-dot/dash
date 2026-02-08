import React, { useState, useEffect } from 'react';
import { TrendingUp, Activity, Menu, X } from 'lucide-react';
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
import { CountryReserves } from './components/CountryReserves';
import { LearnMore } from './components/LearnMore';

// Features
import { PriceChart }
  from './features/Chart/PriceChart';
import { SpeculativeCalculator } from './features/Calculator/SpeculativeCalculator';
import { DCASimulator } from './features/DCA/DCASimulator';
import { ScrollToTop } from './components/ScrollToTop';

// Hooks
import { useBinanceWebSocket } from './hooks/useBinanceWebSocket';

function App() {
  const { price, priceChange24h } = useBinanceWebSocket('btcusdt');
  const currentPrice = price > 0 ? price : 102000;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="container dashboard-root">
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

            <div className="grid grid-3 gap-6 mobile-compact-grid">
              <a href="https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00BKKM83BW&utm_source=" target="_blank" rel="noopener noreferrer"
                className="btn flex flex-col items-center justify-center gap-3 py-6 rounded-2xl font-bold hover:brightness-110 transition-all shadow-xl glass-panel"
                style={{ color: '#FCD535', border: '1px solid rgba(252, 213, 53, 0.2)', minHeight: '140px' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Binance_Logo.svg" alt="Binance" style={{ width: 40, height: 40, marginBottom: '4px' }} />
                <span className="text-sm tracking-widest">BINANCE</span>
              </a>
              <a href="https://share.bitget.com/u/NAL59U58" target="_blank" rel="noopener noreferrer"
                className="btn flex flex-col items-center justify-center gap-3 py-6 rounded-2xl font-bold hover:brightness-110 transition-all shadow-xl glass-panel"
                style={{ color: '#00F0FF', border: '1px solid rgba(0, 240, 255, 0.2)', minHeight: '140px' }}>
                <TrendingUp size={40} />
                <span className="text-sm tracking-widest">BITGET</span>
              </a>
              <a href="https://www.bitmex.com/register/YOUR_CODE" target="_blank" rel="noopener noreferrer"
                className="btn flex flex-col items-center justify-center gap-3 py-6 rounded-2xl font-bold hover:brightness-110 transition-all shadow-xl glass-panel"
                style={{ color: '#FF3B30', border: '1px solid rgba(255, 59, 48, 0.2)', minHeight: '140px' }}>
                <Activity size={40} />
                <span className="text-sm tracking-widest">BITMEX</span>
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

          {/* New Country Reserves Section */}
          <div id="country-reserves-section" className="section-wrapper mb-24">
            <div className="section-subtitle">
              <span className="section-line"></span> Reservas de Países
            </div>
            <CountryReserves currentPrice={currentPrice} />
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay animate-slide-up" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-menu-content glass-panel" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-warning font-bold tracking-widest">NAVEGACIÓN</h3>
              <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <NavigationMenu onSelect={() => setIsMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Mobile Menu Toggle Button */}
      <button
        className="mobile-nav-toggle glass-panel"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{ display: isMobile ? 'flex' : 'none' }}>
        <Menu size={24} />
        <span>MENÚ</span>
      </button>

      <ScrollToTop />
      <Footer />

      {/* Global WhatsApp Floating Button */}
      <a href="https://wa.me/593978858638?text=Hola%20Cripto%20Los%20Andes,%20quiero%20acceder%20al%20conocimiento%20puro%20de%20Bitcoin"
        className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <svg className="whatsapp-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>

      <style>{`
        .dashboard-root {
          padding-top: 150px;
          padding-bottom: 2rem;
        }

        @media (max-width: 1024px) {
          .dashboard-root {
            padding-top: 80px !important;
          }
        }

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

        /* Mobile Nav Persistence */
        .mobile-nav-toggle {
          position: fixed;
          bottom: 30px;
          left: 20px;
          z-index: 10000;
          display: none;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem !important;
          background: rgba(11, 14, 20, 0.8) !important;
          border-color: var(--accent-secondary) !important;
          color: #fff;
          font-weight: 800;
          letter-spacing: 2px;
          font-size: 0.8rem;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(10px);
          z-index: 10001;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .mobile-menu-content {
          width: 100%;
          max-width: 400px;
          background: var(--bg-dark) !important;
          border-color: var(--accent-secondary) !important;
        }

        .close-menu-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
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
            .dashboard-root {
               padding-top: 100px;
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
          .mobile-nav-toggle {
             display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
