import { useState } from 'react';

const DirectorySelector = ({ onDirectorySelected }) => {
  const [selectedPath, setSelectedPath] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);

  const handleSelectDirectory = async () => {
    setIsSelecting(true);
    try {
      if ('showDirectoryPicker' in window) {
        const dirHandle = await window.showDirectoryPicker({
          mode: 'readwrite'
        });
        setSelectedPath(dirHandle.name);
        onDirectorySelected(dirHandle);
      } else {
        alert('Your browser does not support directory selection. Please use a modern browser like Chrome or Edge.');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error selecting directory:', err);
      }
    } finally {
      setIsSelecting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff0008_1px,transparent_1px),linear-gradient(to_bottom,#00ff0008_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="w-[95%] max-w-[1400px] border border-gray-800 rounded-3xl p-6 md:p-10 lg:p-12 xl:p-14 bg-gray-900/80 backdrop-blur-xl shadow-2xl relative z-10 fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block float mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-cyan-500 rounded-3xl shadow-2xl flex items-center justify-center">
                <span className="text-6xl">📁</span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-cyan-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white gradient-text mb-4">
            Internet-in-a-Box
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl font-light">Offline Knowledge System</p>
        </div>

        {/* Instructions Card */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-8 md:p-10 mb-8 card-hover backdrop-blur">
          <h2 className="text-3xl font-bold gradient-text mb-6 flex items-center gap-3 text-white">
            <span className="text-4xl ">🚀</span> Setup Required
          </h2>
          <div className="text-gray-300 space-y-4 text-base md:text-lg">
            <p className="flex items-start gap-3">
              <span className="text-green-400 mt-1 text-xl">→</span>
              <span>Welcome to your offline knowledge hub! Experience the internet without boundaries.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1 text-xl">→</span>
              <span>To get started, select a directory where all your offline content will be stored.</span>
            </p>
            
            <div className="mt-8 bg-black/40 rounded-xl p-6 border border-gray-700">
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-4">
                📦 This directory will contain:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-400 text-xl">📄</span>
                  </div>
                  <span>Downloaded PDFs & documents</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-cyan-400 text-xl">📚</span>
                  </div>
                  <span>Wikipedia dumps</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-purple-400 text-xl">🎓</span>
                  </div>
                  <span>Educational content</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400 text-xl">⚙️</span>
                  </div>
                  <span>Your personalized settings</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Path Display */}
        {selectedPath && (
          <div className="mb-8 p-6 bg-gradient-to-r from-green-900/20 to-cyan-900/20 border border-green-500/30 rounded-2xl fade-in backdrop-blur">
            <p className="text-sm mb-3 font-bold gradient-text flex items-center gap-2 text-white">
              <span>✓</span> Selected Directory:
            </p>
            <p className="text-gray-200 font-mono text-sm md:text-base break-all bg-black/50 p-4 rounded-xl border border-gray-700">
              {selectedPath}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleSelectDirectory}
            disabled={isSelecting}
            className="w-full text-white py-6 px-8 rounded-2xl 
                       neon-button font-bold text-xl
                       transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                       relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isSelecting ? (
                <>
                  <span className="animate-spin text-2xl">⏳</span> 
                  <span>Opening File Browser...</span>
                </>
              ) : selectedPath ? (
                <>
                  <span className="text-2xl">🔄</span>
                  <span>Change Directory</span>
                </>
              ) : (
                <>
                  <span className="text-2xl">📂</span>
                  <span>Select Storage Directory</span>
                </>
              )}
            </span>
          </button>

          {selectedPath && (
            <button
              onClick={() => onDirectorySelected(null)}
              className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-white py-6 px-8 rounded-2xl 
                         font-bold text-xl hover:from-green-600 hover:to-cyan-600 transition-all duration-300
                         shadow-lg hover:shadow-2xl hover:shadow-green-500/50 hover:scale-[1.02] transform
                         flex items-center justify-center gap-3"
            >
              <span>Continue</span>
              <span className="text-2xl">→</span>
              <span className="text-2xl">🚀</span>
            </button>
          )}
        </div>

        {/* Info Footer */}
        <div className="mt-10 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <span className="text-2xl">💡</span>
            <span className="text-gray-400 text-sm">Tip: Choose a location with plenty of storage space</span>
          </div>
          <p className="text-gray-600 text-sm">Recommended: External drive or dedicated folder (10GB+ free space)</p>
        </div>
      </div>
    </div>
  );
};

export default DirectorySelector;
