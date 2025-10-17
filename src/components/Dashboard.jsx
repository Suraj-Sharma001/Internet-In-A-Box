import { useState } from 'react';
import DownloadButton from './DownloadButton';
import ChatInterface from './ChatInterface';
import resourceData from '../utils/data';

const Dashboard = ({ userData, dirHandle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showChat, setShowChat] = useState(false);
  
  // Get actual resources from data.jsx
  const contentItems = resourceData.suggestionsFor(userData);

  const categories = [
    { id: 'all', name: 'All Content', icon: '🌐', gradient: 'from-green-400 to-cyan-500' },
    { id: 'pdf', name: 'PDFs', icon: '📄', gradient: 'from-blue-400 to-purple-500' },
    { id: 'wiki', name: 'Wikipedia', icon: '📚', gradient: 'from-purple-400 to-pink-500' },
    { id: 'docs', name: 'Documentation', icon: '📖', gradient: 'from-yellow-400 to-orange-500' },
    { id: 'courses', name: 'Courses', icon: '🎓', gradient: 'from-red-400 to-pink-500' },
    { id: 'tools', name: 'Tools', icon: '🛠️', gradient: 'from-cyan-400 to-blue-500' },
  ];

  // Remove handleDownload as downloads are now handled by DownloadButton component

  const filteredContent = contentItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate stats based on localStorage download flags
  const downloadedCount = contentItems.filter(item => 
    localStorage.getItem(`dl:${item.id}`) === '1'
  ).length;
  const totalSize = contentItems
    .filter(item => localStorage.getItem(`dl:${item.id}`) === '1')
    .reduce((acc, item) => {
      const size = parseFloat(item.size);
      return acc + (item.size.includes('GB') ? size * 1024 : size);
    }, 0);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black p-3 md:p-4 lg:p-6 xl:p-8 relative overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#00ff0008_1px,transparent_1px),linear-gradient(to_bottom,#00ff0008_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="w-full relative z-10">
        {/* Header */}
        <header className="border border-gray-800 rounded-3xl p-6 md:p-8 mb-8 bg-gray-900/80 backdrop-blur-xl shadow-2xl fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="text-5xl float" style={{ animationDuration: '3s' }}>🌐</div>
                <h1 className="text-4xl md:text-5xl font-black text-white gradient-text">
                  Internet-in-a-Box
                </h1>
              </div>
              <p className="text-gray-400 text-lg md:text-xl">
                Welcome back, <span className="font-bold gradient-text">{userData?.name || 'User'}</span>! 👋
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700 backdrop-blur">
              <div className="text-sm text-gray-400 mb-1">Storage Stats</div>
              <div className="text-3xl font-bold gradient-text mb-1">
                {downloadedCount} / {contentItems.length}
              </div>
              <div className="text-gray-500 text-sm">
                {totalSize >= 1024 ? `${(totalSize / 1024).toFixed(2)} GB` : `${totalSize.toFixed(0)} MB`} Used
              </div>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="mb-8 fade-in">
          <div className="relative">
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-3xl">
              🔍
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for content, topics, or categories..."
              className="w-full bg-gray-900/80 backdrop-blur-xl border-2 border-gray-800 text-gray-200 pl-20 pr-6 py-6 rounded-2xl 
                         focus:outline-none focus:border-green-500 transition-all text-lg
                         placeholder-gray-500 shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 text-2xl"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-8 fade-in">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 font-bold text-base
                ${activeCategory === cat.id
                  ? `bg-gradient-to-r ${cat.gradient} text-white border-transparent shadow-lg scale-105`
                  : 'bg-gray-900/80 text-gray-300 border-gray-800 hover:border-gray-700 backdrop-blur-xl'
                }`}
            >
              <span className="text-xl mr-2">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Personalized Recommendations */}
        {userData?.interests && userData.interests.length > 0 && activeCategory === 'all' && !searchQuery && (
          <div className="mb-8 p-6 md:p-8 border border-gray-800 rounded-3xl bg-gradient-to-br from-green-900/10 to-cyan-900/10 backdrop-blur-xl fade-in">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-4 flex items-center gap-2">
              <span className="text-3xl">⭐</span> Recommended for You
            </h2>
            <p className="text-gray-400 mb-4">
              Based on your interests: <span className="text-gray-300">{userData.interests.join(', ')}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {userData.interests.slice(0, 5).map((interest, idx) => (
                <span key={idx} className="px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-lg text-sm font-bold shadow-lg">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-5 fade-in">
          {filteredContent.map(item => (
            <div
              key={item.id}
              className="border border-gray-800 rounded-2xl p-4 md:p-5 bg-gray-900/80 backdrop-blur-xl 
                         hover:bg-gray-900 transition-all duration-300 card-hover shadow-xl h-full flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 px-3 py-1 rounded-full font-bold border border-gray-700">
                  {categories.find(c => c.id === item.category)?.icon} {item.category.toUpperCase()}
                </span>
                {localStorage.getItem(`dl:${item.id}`) === '1' && (
                  <span className="text-xs bg-gradient-to-r from-green-500 to-cyan-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                    ✓ Downloaded
                  </span>
                )}
              </div>

              {/* Icon and Title */}
              <div className="flex items-start gap-3 mb-4">
                <div className="text-4xl flex-shrink-0">
                  {item.category === 'pdf' ? '📄' : 
                   item.category === 'wiki' ? '📚' : 
                   item.category === 'docs' ? '📖' : '📦'}
                </div>
                <h3 className="text-gray-200 font-bold text-xl leading-tight line-clamp-2">
                  {item.title}
                </h3>
              </div>

              {/* Metadata */}
              <div className="space-y-2 mb-4 flex-grow">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="text-lg">📁</span>
                  <span>Type: <span className="text-gray-300">{item.type}</span></span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="text-lg">💾</span>
                  <span>Size: <span className="text-gray-300">{item.size}</span></span>
                </div>
              </div>

              {/* Action Button - Use DownloadButton component */}
              <DownloadButton 
                resource={{
                  id: item.id,
                  filename: item.filename,
                  url: item.url,
                  category: item.category
                }}
              />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredContent.length === 0 && (
          <div className="text-center py-20 fade-in">
            <div className="text-8xl mb-4">🔍</div>
            <p className="text-3xl font-bold gradient-text mb-2">No content found</p>
            <p className="text-gray-400 text-xl">Try adjusting your search or filter</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm border-t border-gray-800 pt-8 pb-4">
          <p className="text-lg mb-2 gradient-text font-bold">Internet-in-a-Box v1.0</p>
          <p className="mb-1">Offline Knowledge System</p>
          <p className="flex items-center justify-center gap-2">
            <span className="text-yellow-400">💡</span>
            Perfect for areas with limited connectivity
          </p>
        </footer>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-green-500 to-cyan-500 
                   text-white rounded-full shadow-2xl hover:shadow-green-500/50 
                   hover:scale-110 transition-all duration-300 z-40 
                   flex items-center justify-center text-2xl font-bold
                   border-2 border-white/20 backdrop-blur-sm"
        title="Chat with AI Assistant"
      >
        🤖
      </button>

      {/* Chat Interface Modal */}
      <ChatInterface 
        isOpen={showChat} 
        onClose={() => setShowChat(false)} 
      />
    </div>
  );
};

export default Dashboard;
