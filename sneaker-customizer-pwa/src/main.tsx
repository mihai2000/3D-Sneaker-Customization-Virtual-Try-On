import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { CartProvider } from './providers/CartProvider';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement as HTMLElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  throw new Error('Root element not found');
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((reg) => {
        console.log('✅ Service Worker registered:', reg);
      })
      .catch((err) => {
        console.error('❌ Service Worker registration failed:', err);
      });
  });
}
