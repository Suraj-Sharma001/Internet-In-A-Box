import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navbar({ dirHandle, onPick, onboardingData }) {
  const [showPicker, setShowPicker] = useState(false)

  const pickDirectory = async () => {
    try {
      const handle = await window.showDirectoryPicker()
      onPick(handle)
      setShowPicker(false)
    } catch (err) {
      console.error('Directory pick cancelled or not supported', err)
    }
  }

  const clearDirectory = () => {
    onPick(null)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="logo-icon">📦</div>
          <div className="brand-text">
            <h1>Internet-in-a-Box</h1>
            <p className="tagline">Offline Knowledge Hub</p>
          </div>
        </div>

        <div className="navbar-actions">
          <ThemeToggle />
          
          {dirHandle ? (
            <div className="directory-info">
              <div className="dir-details">
                <span className="dir-icon">📁</span>
                <div className="dir-text">
                  <span className="dir-label">Storage:</span>
                  <strong className="dir-name">{dirHandle.name}</strong>
                </div>
              </div>
              <div className="dir-buttons">
                <button className="btn-icon" onClick={() => setShowPicker(!showPicker)} title="Change directory">
                  ⚙️
                </button>
                {showPicker && (
                  <div className="dropdown">
                    <button className="dropdown-item" onClick={pickDirectory}>
                      Change Directory
                    </button>
                    <button className="dropdown-item danger" onClick={clearDirectory}>
                      Clear Selection
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button className="btn primary" onClick={pickDirectory}>
              <span>📂</span> Choose Directory
            </button>
          )}

          {onboardingData && (
            <div className="user-badge">
              <span className="user-icon">👤</span>
              <span className="user-name">{onboardingData.institution || 'User'}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
