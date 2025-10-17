import { useState, useRef, useEffect } from 'react';

// Resolve API base: prefer env VITE_API_BASE_URL, fallback to dev proxy '/api'
const API_BASE = import.meta?.env?.VITE_API_BASE_URL?.replace(/\/$/, '') || '/api';

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. I can help you with questions about the content library, recommend resources, or answer general queries. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ML Model Integration - Call FastAPI endpoint similar to Streamlit example
  const getAIResponse = async (userMessage) => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout
      const resp = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userMessage }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        throw new Error(`HTTP ${resp.status}${text ? `: ${text}` : ''}`);
      }
      const data = await resp.json();
      return data?.output ?? 'Sorry, I could not generate a response.';
    } catch (e) {
      if (e.name === 'AbortError') {
        return 'The request timed out. The local model may be busy. Please try again.';
      }
      return `Failed to reach AI service at ${API_BASE}. ${e.message || e}`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const aiResponse = await getAIResponse(inputText);

    const botMessage = {
      id: messages.length + 2,
      text: aiResponse,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 fade-in"
        onClick={onClose}
      />
      
      {/* Chatbot Panel - Responsive */}
      <div className="fixed 
        right-0 bottom-0 top-0 w-full
        md:right-4 md:bottom-4 md:top-4 md:w-[450px] md:max-w-[calc(100vw-2rem)] md:rounded-3xl
        bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-gray-700 shadow-2xl z-50 flex flex-col overflow-hidden slide-in-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-cyan-500 p-4 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="text-3xl md:text-4xl">🤖</div>
            <div>
              <h2 className="text-white font-bold text-lg md:text-xl">AI Assistant</h2>
              <p className="text-green-100 text-xs md:text-sm">Always here to help!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-all text-xl md:text-2xl touch-manipulation"
          >
            ✕
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4 bg-gray-900/50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} fade-in`}
            >
              <div
                className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-3 md:p-4 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-green-500 to-cyan-500 text-white'
                    : 'bg-gray-800 text-gray-100 border border-gray-700'
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 md:mt-2 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start fade-in">
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-3 md:p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 md:p-4 bg-gray-900 border-t border-gray-700">
          <div className="flex gap-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 border-2 border-gray-700 text-gray-200 rounded-xl p-3 
                       focus:outline-none focus:border-green-500 transition-all resize-none
                       placeholder-gray-500 text-sm md:text-base touch-manipulation"
              rows="2"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-r from-green-500 to-cyan-500 text-white px-4 md:px-6 rounded-xl 
                       font-bold hover:from-green-600 hover:to-cyan-600 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl
                       touch-manipulation"
            >
              <span className="text-xl md:text-2xl">🚀</span>
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-2 text-center hidden md:block">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>

        {/* Quick Actions */}
        <div className="p-3 md:p-4 bg-gray-900/80 border-t border-gray-700">
          <p className="text-gray-400 text-xs mb-2">Quick Questions:</p>
          <div className="flex flex-wrap gap-2">
            {['How to download?', 'Recommend content', 'Search tips', 'Offline features'].map((q) => (
              <button
                key={q}
                onClick={() => setInputText(q)}
                className="text-xs bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-gray-300 px-3 py-2 rounded-full border border-gray-700 transition-all touch-manipulation"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
