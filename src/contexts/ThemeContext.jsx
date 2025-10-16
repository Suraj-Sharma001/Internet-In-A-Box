import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const themes = {
  light: {
    name: 'Light',
    icon: '☀️',
    bg: '#f8fafc',
    bgLight: '#ffffff',
    bgCard: '#ffffff',
    text: '#0f172a',
    textLight: '#334155',
    muted: '#64748b',
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    accent: '#8b5cf6',
    success: '#10b981',
    danger: '#ef4444',
    border: '#e2e8f0',
    shadow: 'rgba(15, 23, 42, 0.1)',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  dark: {
    name: 'Dark',
    icon: '🌙',
    bg: '#0f172a',
    bgLight: '#1e293b',
    bgCard: '#1e293b',
    text: '#f1f5f9',
    textLight: '#cbd5e1',
    muted: '#94a3b8',
    primary: '#60a5fa',
    primaryDark: '#3b82f6',
    accent: '#a78bfa',
    success: '#34d399',
    danger: '#f87171',
    border: '#334155',
    shadow: 'rgba(0, 0, 0, 0.3)',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  },
  ocean: {
    name: 'Ocean',
    icon: '🌊',
    bg: '#0c4a6e',
    bgLight: '#075985',
    bgCard: '#ffffff',
    text: '#0f172a',
    textLight: '#334155',
    muted: '#64748b',
    primary: '#0ea5e9',
    primaryDark: '#0284c7',
    accent: '#06b6d4',
    success: '#14b8a6',
    danger: '#f43f5e',
    border: '#e0f2fe',
    shadow: 'rgba(8, 47, 73, 0.2)',
    gradient: 'linear-gradient(135deg, #0c4a6e 0%, #075985 100%)',
  },
  sunset: {
    name: 'Sunset',
    icon: '🌅',
    bg: '#7c2d12',
    bgLight: '#9a3412',
    bgCard: '#ffffff',
    text: '#0f172a',
    textLight: '#334155',
    muted: '#64748b',
    primary: '#f97316',
    primaryDark: '#ea580c',
    accent: '#fb923c',
    success: '#84cc16',
    danger: '#dc2626',
    border: '#fed7aa',
    shadow: 'rgba(124, 45, 18, 0.2)',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)',
  },
  forest: {
    name: 'Forest',
    icon: '🌲',
    bg: '#14532d',
    bgLight: '#166534',
    bgCard: '#ffffff',
    text: '#0f172a',
    textLight: '#334155',
    muted: '#64748b',
    primary: '#22c55e',
    primaryDark: '#16a34a',
    accent: '#84cc16',
    success: '#10b981',
    danger: '#ef4444',
    border: '#dcfce7',
    shadow: 'rgba(20, 83, 45, 0.2)',
    gradient: 'linear-gradient(135deg, #14532d 0%, #166534 100%)',
  },
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('iot-theme')
    return saved && themes[saved] ? saved : 'light'
  })

  useEffect(() => {
    localStorage.setItem('iot-theme', theme)
    applyTheme(themes[theme])
  }, [theme])

  const applyTheme = (themeColors) => {
    const root = document.documentElement
    Object.entries(themeColors).forEach(([key, value]) => {
      if (key !== 'name' && key !== 'icon') {
        root.style.setProperty(`--${key}`, value)
      }
    })
  }

  const cycleTheme = () => {
    const themeKeys = Object.keys(themes)
    const currentIndex = themeKeys.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themeKeys.length
    setTheme(themeKeys[nextIndex])
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
