import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import ChatBot from './ChatBot'

export default function Navbar({ onboardingData }) {
  const [showChatbot, setShowChatbot] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <div className="logo-icon">🌐</div>
            <div className="brand-text">
              <h1>Internet-in-a-Box</h1>
              <p className="tagline">Offline Knowledge Hub</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            <span className="text-2xl">{showMobileMenu ? '✕' : '☰'}</span>
          </button>

          {/* Desktop Actions */}
          <div className="navbar-actions hidden md:flex">
            <button 
              className="btn primary"
              onClick={() => setShowChatbot(!showChatbot)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>💬</span> Ask Me
            </button>

            <ThemeToggle />

            {onboardingData && (
              <div className="user-badge">
                <span className="user-icon">👤</span>
                <span className="user-name">{onboardingData.institution || 'User'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="mobile-menu md:hidden">
            <button 
              className="mobile-menu-item"
              onClick={() => {
                setShowChatbot(!showChatbot)
                setShowMobileMenu(false)
              }}
            >
              <span className="text-xl">💬</span>
              <span>Ask Me</span>
            </button>

            <div className="mobile-menu-item">
              <span className="text-xl">🎨</span>
              <ThemeToggle />
            </div>

            {onboardingData && (
              <div className="mobile-menu-item">
                <span className="text-xl">👤</span>
                <span className="font-bold">{onboardingData.name || onboardingData.institution || 'User'}</span>
              </div>
            )}
          </div>
        )}
      </nav>

      <ChatBot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
    </>
  )
}
