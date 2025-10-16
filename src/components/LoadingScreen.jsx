import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadComplete }) => {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(dotsInterval);
          setTimeout(() => onLoadComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 float" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 float" style={{ animationDelay: '1s', animationDuration: '7s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 float" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff0008_1px,transparent_1px),linear-gradient(to_bottom,#00ff0008_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="text-center relative z-10 fade-in px-6 w-full max-w-4xl">
        {/* Logo Container */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <div className="w-40 h-40 bg-gradient-to-br from-green-500 to-cyan-500 rounded-3xl shadow-2xl flex items-center justify-center float" style={{ animationDuration: '3s' }}>
              <span className="text-7xl filter drop-shadow-2xl">🌐</span>
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-cyan-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-black mb-4 gradient-text">
          Internet-in-a-Box
        </h1>
        <p className="text-3xl mb-3 text-gray-400 font-light">Offline Knowledge System</p>

        <div className="mb-8">
          <p className="text-2xl mb-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            Initializing System{dots}
          </p>
          <p className="text-gray-500 text-lg">Building your personal internet</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-2xl mx-auto mb-6">
          <div className="bg-gray-800/50 backdrop-blur rounded-full h-6 border border-gray-700 overflow-hidden shadow-2xl relative">
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-cyan-500 to-green-600 transition-all duration-300 rounded-full relative shadow-lg shadow-green-500/50"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 shimmer"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 text-2xl font-bold">
              {progress}%
            </p>
            <p className="text-gray-500 text-sm">Please wait...</p>
          </div>
        </div>

        {/* Status Messages */}
        <div className="mt-12 max-w-xl mx-auto space-y-3">
          {progress > 20 && (
            <div className="fade-in flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl p-4 backdrop-blur">
              <span className="text-green-400 text-2xl">✓</span>
              <span className="text-gray-300 text-lg">Loading core modules...</span>
            </div>
          )}
          {progress > 40 && (
            <div className="fade-in flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 backdrop-blur">
              <span className="text-cyan-400 text-2xl">✓</span>
              <span className="text-gray-300 text-lg">Checking local storage...</span>
            </div>
          )}
          {progress > 60 && (
            <div className="fade-in flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 backdrop-blur">
              <span className="text-emerald-400 text-2xl">✓</span>
              <span className="text-gray-300 text-lg">Initializing knowledge base...</span>
            </div>
          )}
          {progress > 80 && (
            <div className="fade-in flex items-center gap-3 bg-green-500/20 border border-green-500/50 rounded-xl p-4 backdrop-blur pulse">
              <span className="text-green-400 text-2xl">🚀</span>
              <span className="text-green-300 text-lg font-semibold">System ready!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
