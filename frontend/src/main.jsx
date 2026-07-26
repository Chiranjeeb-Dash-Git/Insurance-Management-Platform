import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { InsuranceProvider } from './context/InsuranceContext.jsx'

// Global API URL Interceptor for Cloud Deployments (Vercel + Render)
const originalFetch = window.fetch;
const apiBase = import.meta.env.VITE_API_BASE_URL || '';
if (apiBase) {
  window.fetch = function (url, options) {
    if (typeof url === 'string' && url.startsWith('/api')) {
      url = apiBase + url;
    }
    return originalFetch(url, options);
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InsuranceProvider>
      <App />
    </InsuranceProvider>
  </React.StrictMode>,
)
