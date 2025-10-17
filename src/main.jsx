import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'

if (typeof window !== 'undefined') {
  const configuredBase = import.meta?.env?.VITE_API_BASE_URL ?? 'http://192.168.50.1:8000'
  window.__API_BASE__ = String(configuredBase).replace(/\/$/, '')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
