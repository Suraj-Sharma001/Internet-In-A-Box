import { useState, useRef, useEffect } from 'react';

// Resolve API base: prefer env VITE_API_BASE_URL, fallback to dev proxy '/api'
const API_BASE = import.meta?.env?.VITE_API_BASE_URL?.replace(/\/$/, '') || '/api';

const ChatInterface = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant powered by SmolLM2. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('unknown'); // 'connected', 'disconnected', 'unknown'
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check server status on component mount
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        // Try FastAPI OpenAPI route first; fallback to root
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);
        const response = await fetch(`${API_BASE}/openapi.json`, {
          method: 'GET',
          signal: controller.signal,
        }).catch(() => fetch(`${API_BASE}/`, { method: 'GET' }));
        clearTimeout(timeout);
        if (response && response.ok) {
          setServerStatus('connected');
        } else {
          setServerStatus('disconnected');
        }
      } catch (error) {
        setServerStatus('disconnected');
      }
    };

    if (isOpen) {
      checkServerStatus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Hit the FastAPI server exactly like the Streamlit example
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const response = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input.trim() }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setServerStatus('connected'); // Update status on successful response
      
      // Use the exact response format from your FastAPI server
      const aiResponse = data.output || 'Sorry, I couldn\'t generate a response.';
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling FastAPI:', error);
      setServerStatus('disconnected'); // Update status on error
      
      let errorContent = 'Sorry, I\'m having trouble connecting to the AI service. ';
      if (error.name === 'AbortError') {
        errorContent += 'The request timed out. The local model may be busy. Please try again.';
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorContent += `Please make sure the FastAPI server is running and reachable at ${API_BASE}.`;
      } else if (error.message.includes('HTTP')) {
        errorContent += `Server error: ${error.message}`;
      } else {
        errorContent += 'Please check your connection and try again.';
      }
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        content: errorContent,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[80vh] bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <div>
              <h2 className="text-xl font-bold gradient-text">AI Assistant</h2>
              <div className="flex items-center gap-2">
                <p className="text-gray-400 text-sm">Powered by SmolLM2-360M</p>
                <div className={`w-2 h-2 rounded-full ${
                  serverStatus === 'connected' ? 'bg-green-500' : 
                  serverStatus === 'disconnected' ? 'bg-red-500' : 'bg-yellow-500'
                }`} title={
                  serverStatus === 'connected' ? 'AI service connected' : 
                  serverStatus === 'disconnected' ? 'AI service disconnected' : 'Checking connection...'
                }></div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-green-500 to-cyan-500 text-white'
                  : message.type === 'error'
                  ? 'bg-red-900/50 border border-red-500/50 text-red-300'
                  : 'bg-gray-800/80 border border-gray-700 text-gray-200'
              } rounded-2xl p-4 shadow-lg backdrop-blur`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                <div className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-green-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-4 shadow-lg backdrop-blur">
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                rows="1"
                className="w-full bg-gray-800/50 border border-gray-600 text-gray-200 px-4 py-3 rounded-xl 
                         focus:outline-none focus:border-green-500 transition-all text-sm
                         placeholder-gray-500 backdrop-blur resize-none"
                style={{
                  minHeight: '44px',
                  maxHeight: '120px'
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-xl 
                         hover:from-green-600 hover:to-cyan-600 transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed font-semibold
                         shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              {isLoading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <span>Send</span>
              )}
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;