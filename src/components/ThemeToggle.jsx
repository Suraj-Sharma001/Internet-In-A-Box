import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme()
  const [showDropdown, setShowDropdown] = useState(false)
  const currentTheme = themes[theme]

  return (
    <div className="theme-toggle-container">
      <button 
        className="theme-toggle-btn"
        onClick={() => setShowDropdown(!showDropdown)}
        title={`Current theme: ${currentTheme.name}`}
      >
        <span className="theme-icon">{currentTheme.icon}</span>
        <span className="theme-name">{currentTheme.name}</span>
      </button>
      
      {showDropdown && (
        <div className="theme-dropdown">
          {Object.entries(themes).map(([key, t]) => (
            <button
              key={key}
              className={`theme-option ${key === theme ? 'active' : ''}`}
              onClick={() => {
                setTheme(key)
                setShowDropdown(false)
              }}
            >
              <span className="theme-option-icon">{t.icon}</span>
              <span>{t.name}</span>
              {key === theme && <span className="check-icon">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
