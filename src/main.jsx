import { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🔥 Global Error Catch:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#2d0000', color: '#ffaaaa', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1>🛑 Critical Render Error</h1>
          <p>{this.state.error.toString()}</p>
          <pre style={{ background: 'rgba(0,0,0,0.5)', padding: '1rem', overflow: 'auto' }}>
            {this.state.error.stack}
          </pre>
          <button onClick={() => window.location.reload()} style={{ padding: '0.5rem 1rem', marginTop: '1rem', cursor: 'pointer' }}>
            Reiniciar Aplicación
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

console.log('🚀 Cripto Andes v2.5.1 starting with Error Boundary...');

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error('❌ Root element not found!');
}
