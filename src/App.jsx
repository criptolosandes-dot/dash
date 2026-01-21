import React, { useState, useEffect } from 'react';
import { TrendingUp, Activity } from 'lucide-react';
import './App.css';

// Components
import { TickerHeader } from './components/TickerHeader';
import { Footer } from './components/Footer';
import { NavigationMenu } from './components/NavigationMenu'; // Updated import
import { AltcoinList } from './components/AltcoinList';
import { InstitutionalHoldings } from './components/InstitutionalHoldings'; // Added import
import { FearAndGreedIndex } from './components/FearAndGreedIndex'; // Added import

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
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
      <TickerHeader price={price} priceChange24h={priceChange24h} />

      <div className="moon-dashboard-grid">

        {/* Left Column: Navigation Menu */}
        <aside className="left-sidebar">
          <div className="card-wrapper" style={{ position: 'sticky', top: '100px' }}>
            <NavigationMenu />
          </div>
        </aside>

        {/* Center Column: Main Content (Chart + Holdings) */}
        <main className="center-content">

          {/* Chart Row: Price Chart + Fear & Greed */}
          <div id="chart-section" className="chart-row-grid">
            {/* Price Chart Panel - Resized */}
            <div className="glass-panel flex flex-col gap-1" style={{ minHeight: '380px' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold tracking-wide">BTC/USDT Analysis</h2>
                <div className="flex gap-2">
                  <span className="badge badge-neutral">1H</span>
                  <span className="badge badge-success">4H</span>
                  <span className="badge badge-neutral">1D</span>
                </div>
              </div>
              <div style={{ flex: 1, minHeight: 0 }}>
                <PriceChart />
              </div>
            </div>

            {/* Fear & Greed Index */}
            <div className="glass-panel">
              <FearAndGreedIndex />
            </div>
          </div>

          {/* Exchange Actions - Moved below chart row */}
          <div className="grid grid-3 gap-4 mt-2">
            <a href="https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00BKKM83BW&utm_source=" target="_blank" rel="noopener noreferrer"
              className="btn flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
              style={{ background: 'rgba(252, 213, 53, 0.25)', color: '#FCD535', border: '1px solid rgba(252, 213, 53, 0.6)' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Binance_Logo.svg" alt="Binance" style={{ width: 16, height: 16 }} />
              BINANCE
            </a>
            <a href="https://share.bitget.com/u/NAL59U58" target="_blank" rel="noopener noreferrer"
              className="btn flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
              style={{ background: 'rgba(0, 240, 255, 0.25)', color: '#00F0FF', border: '1px solid rgba(0, 240, 255, 0.6)' }}>
              <TrendingUp size={16} />
              BITGET
            </a>
            <a href="https://www.bitmex.com/register/YOUR_CODE" target="_blank" rel="noopener noreferrer"
              className="btn flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all"
              style={{ background: 'rgba(255, 59, 48, 0.25)', color: '#FF3B30', border: '1px solid rgba(255, 59, 48, 0.6)' }}>
              <Activity size={16} />
              BITMEX
            </a>
          </div>

          {/* Institutional Holdings */}
          <div id="holdings-section" className="glass-panel mt-6">
            <InstitutionalHoldings currentPrice={currentPrice} />
          </div>
        </main>

        {/* Right Column: Tools & Altcoins */}
        <aside className="right-sidebar flex flex-col gap-6">
          {/* Top Altcoins */}
          <div className="glass-panel" style={{ maxHeight: '400px', overflow: 'hidden' }}>
            <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Market Movers</h3>
            <AltcoinList />
          </div>

          {/* Calculators - Explicitly visible */}
          <div id="dca-section">
            <DCASimulator currentPrice={currentPrice} />
          </div>

          <div id="calculator-section">
            <SpeculativeCalculator currentPrice={currentPrice} />
          </div>
        </aside>

      </div>

      {/* Floating AI Analyst */}
      <AIPanel />

      <Footer />

      {/* Styles for Layout */}
      <style>{`
        .moon-dashboard-grid {
          display: grid;
          grid-template-columns: 280px 1fr 340px;
          gap: 2rem;
          margin-bottom: 2rem;
          align-items: start;
        }
        
        .chart-row-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 280px;
          gap: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .left-sidebar {
          /* Fixed width sidebar */
        }

        .center-content {
          display: flex;
          flex-direction: column;
          min-width: 0; /* Prevents flex items from overflowing */
        }

        .right-sidebar {
          min-width: 0;
        }
        
        @media (max-width: 1400px) {
           .moon-dashboard-grid {
              grid-template-columns: 260px 1fr;
           }
           /* Move right sidebar content to bottom or standard flow instead of hiding */
           .right-sidebar {
              grid-column: 2;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 1.5rem;
           }
           /* If screen is too narrow for 2 cols in sidebar, stack them */
        }
        
        @media (max-width: 1100px) {
           .moon-dashboard-grid {
              grid-template-columns: 80px 1fr; /* Slim sidebar */
           }
           .chart-row-grid {
              grid-template-columns: 1fr; /* Stack chart and FearIndex on smaller screens */
           }
           .left-sidebar .card-wrapper {
              width: 80px;
              padding: 0;
              overflow: hidden;
           }
           /* Hide text labels in nav menu for slim sidebar */
           .left-sidebar .nav-text, 
           .left-sidebar h3, 
           .left-sidebar .border-t {
              display: none;
           }
           .left-sidebar .nav-icon {
              margin: 0 auto;
           }
           .right-sidebar {
              grid-template-columns: 1fr;
           }
        }

        @media (max-width: 768px) {
          .moon-dashboard-grid {
            grid-template-columns: 1fr;
          }
          .left-sidebar {
             display: none; /* Mobile menu would be better, but for now stack or hide */
          }
          .right-sidebar {
             grid-column: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
