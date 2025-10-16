import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [appState, setAppState] = useState('loading'); // loading, onboarding, dashboard
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check localStorage for existing setup
    const checkExistingSetup = () => {
      const storedUserData = localStorage.getItem('internetInBoxUserData');
      
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
        setAppState('dashboard');
      } else {
        setAppState('onboarding');
      }
    };

    checkExistingSetup();
  }, []);

  const handleLoadingComplete = () => {
    const storedUserData = localStorage.getItem('internetInBoxUserData');
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setAppState('dashboard');
    } else {
      setAppState('onboarding');
    }
  };

  const handleOnboardingComplete = (formData) => {
    setUserData(formData);
    
    // Save user data to localStorage
    localStorage.setItem('internetInBoxUserData', JSON.stringify(formData));
    
    setAppState('dashboard');
  };

  return (
    <div className="App">
      {appState === 'loading' && (
        <LoadingScreen onLoadComplete={handleLoadingComplete} />
      )}
      {appState !== 'loading' && (
        <Navbar
          onboardingData={userData}
        />
      )}
      
      {appState === 'onboarding' && (
        <OnboardingForm onComplete={handleOnboardingComplete} />
      )}
      
      {appState === 'dashboard' && (
        <Dashboard userData={userData} />
      )}
    </div>
  );
}

export default App;

