import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import DirectorySelector from './components/DirectorySelector';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [appState, setAppState] = useState('loading'); // loading, directory, onboarding, dashboard
  const [directoryHandle, setDirectoryHandle] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check localStorage for existing setup
    const checkExistingSetup = () => {
      const storedUserData = localStorage.getItem('internetInBoxUserData');
      const storedDirectory = localStorage.getItem('internetInBoxDirectory');
      
      if (storedUserData && storedDirectory) {
        setUserData(JSON.parse(storedUserData));
        setAppState('dashboard');
      } else if (storedDirectory) {
        setAppState('onboarding');
      } else {
        setAppState('directory');
      }
    };

    checkExistingSetup();
  }, []);

  const handleLoadingComplete = () => {
    const storedUserData = localStorage.getItem('internetInBoxUserData');
    const storedDirectory = localStorage.getItem('internetInBoxDirectory');
    
    if (storedUserData && storedDirectory) {
      setUserData(JSON.parse(storedUserData));
      setAppState('dashboard');
    } else if (storedDirectory) {
      setAppState('onboarding');
    } else {
      setAppState('directory');
    }
  };

  const handleDirectorySelected = async (dirHandle) => {
    if (!dirHandle) {
      setAppState('onboarding');
      return;
    }

    setDirectoryHandle(dirHandle);
    
    try {
      // Try to create a .second file to mark the directory
      const fileHandle = await dirHandle.getFileHandle('.second', { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify({ 
        initialized: true, 
        timestamp: new Date().toISOString() 
      }));
      await writable.close();
      
      // Store directory reference (name only, as handles can't be serialized)
      localStorage.setItem('internetInBoxDirectory', dirHandle.name);
      
      // Check if .second file already existed (returning user)
      const checkExistingData = localStorage.getItem('internetInBoxUserData');
      if (checkExistingData) {
        setUserData(JSON.parse(checkExistingData));
        setAppState('dashboard');
      } else {
        setAppState('onboarding');
      }
    } catch (error) {
      console.error('Error setting up directory:', error);
      alert('Error accessing directory. Please try again.');
    }
  };

  const handleOnboardingComplete = async (formData) => {
    setUserData(formData);
    
    try {
      // Save user data to localStorage
      localStorage.setItem('internetInBoxUserData', JSON.stringify(formData));
      
      // If we have directory handle, save to file system as well
      if (directoryHandle) {
        const userDataHandle = await directoryHandle.getFileHandle('user-profile.json', { create: true });
        const writable = await userDataHandle.createWritable();
        await writable.write(JSON.stringify(formData, null, 2));
        await writable.close();
      }
      
      setAppState('dashboard');
    } catch (error) {
      console.error('Error saving user data:', error);
      // Still proceed to dashboard even if file saving fails
      setAppState('dashboard');
    }
  };

  return (
    <div className="App">
      {appState === 'loading' && (
        <LoadingScreen onLoadComplete={handleLoadingComplete} />
      )}
      
      {appState === 'directory' && (
        <DirectorySelector onDirectorySelected={handleDirectorySelected} />
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

