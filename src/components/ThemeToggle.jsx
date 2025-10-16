import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme()
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)
  const menuRef = useRef(null)

  const current = themes[theme] || { name: 'Theme' }

  useEffect(() => {
    const onClick = (e) => {
      if (!menuRef.current || !btnRef.current) return
      if (!menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const order = ['system','light','dark','midnight','violet','ocean','forest','sunset','solar']

  return (
    <div className="theme-toggle-container">
      <button
        ref={btnRef}
        className="theme-toggle-btn"
        onClick={() => setOpen(!open)}
        title={`Theme: ${current.name}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="theme-icon">{current.icon || '🎨'}</span>
        <span className="theme-name">{current.name}</span>
      </button>

      {open && (
        <div className="theme-dropdown" ref={menuRef} role="menu">
          {order.filter(k => themes[k]).map((key) => {
            const t = themes[key]
            return (
              <button
                key={key}
                role="menuitemradio"
                aria-checked={key === theme}
                className={`theme-option ${key === theme ? 'active' : ''}`}
                onClick={() => { setTheme(key); setOpen(false) }}
              >
                <span className="theme-option-icon">{t.icon || '🎨'}</span>
                <span>{t.name}</span>
                {key === theme && <span className="check-icon">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
