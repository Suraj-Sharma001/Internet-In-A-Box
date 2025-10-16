import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Onboarding from './components/Onboarding'
import ResourceList from './components/ResourceList'
import { fileExists, readJSON } from './utils/fileSystem'

function App() {
  const [dirHandle, setDirHandle] = useState(null)
  const [onboardingNeeded, setOnboardingNeeded] = useState(false)
  const [onboardingData, setOnboardingData] = useState(null)

  useEffect(() => {
    // If dirHandle is set, check if onboarding.json exists
    const checkOnboarding = async () => {
      if (!dirHandle) return
      const exists = await fileExists(dirHandle, 'onboarding.json')
      if (!exists) setOnboardingNeeded(true)
      else {
        const data = await readJSON(dirHandle, 'onboarding.json')
        setOnboardingData(data)
      }
    }
    checkOnboarding()
  }, [dirHandle])

  const handleDirectoryPicked = (handle) => {
    setDirHandle(handle)
    // keep a global reference for other components or utilities that may need it
    try {
      window.__CURRENT_DIR_HANDLE__ = handle
    } catch {
      // ignore in non-browser or restricted contexts
    }
  }

  const handleOnboardingComplete = async (answers) => {
    setOnboardingData(answers)
    setOnboardingNeeded(false)
  }

  return (
    <div className="app-root">
      <Navbar 
        dirHandle={dirHandle} 
        onPick={handleDirectoryPicked}
        onboardingData={onboardingData}
      />

      <main className="main-content">
        {!dirHandle && (
          <div className="welcome-section">
            <div className="welcome-card">
              <div className="welcome-icon">🌐</div>
              <h2>Welcome to Internet-in-a-Box</h2>
              <p className="welcome-text">
                Your personal offline knowledge hub. Access essential resources, documentation, 
                and learning materials even without an internet connection.
              </p>
              <div className="features">
                <div className="feature">
                  <span className="feature-icon">📚</span>
                  <div>
                    <strong>Offline Library</strong>
                    <p>Download and access resources anytime</p>
                  </div>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎯</span>
                  <div>
                    <strong>Personalized</strong>
                    <p>Get suggestions based on your interests</p>
                  </div>
                </div>
                <div className="feature">
                  <span className="feature-icon">⚡</span>
                  <div>
                    <strong>Fast & Local</strong>
                    <p>Everything stored on your device</p>
                  </div>
                </div>
              </div>
              <p className="muted small">Get started by selecting a directory above ↑</p>
            </div>
          </div>
        )}

        {dirHandle && (
          <>
            {/* only show resources after onboarding data is present */}
            {onboardingData && <ResourceList dirHandle={dirHandle} onboarding={onboardingData} />}

            <Onboarding
              open={onboardingNeeded}
              onClose={handleOnboardingComplete}
              dirHandle={dirHandle}
            />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p className="muted">
          Demo resources only — No backend required. All files are saved to your chosen directory.
        </p>
      </footer>
    </div>
  )
}

export default App
