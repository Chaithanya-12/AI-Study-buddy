
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { chatWithAI } from '../services/geminiService';
import { Send, Zap, User, Bot, Loader2 } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await chatWithAI(input, history, simpleMode);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response || 'Sorry, I encountered an error.',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Ask Doubts</h2>
          <p className="text-sm text-slate-500">I'm here to clarify anything</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${simpleMode ? 'text-amber-600' : 'text-slate-400'}`}>
            Simple Mode (ELI5)
          </span>
          <button 
            onClick={() => setSimpleMode(!simpleMode)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${simpleMode ? 'bg-amber-400' : 'bg-slate-200'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${simpleMode ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
            <div className="bg-indigo-100 p-4 rounded-full text-indigo-600">
              <Bot size={48} />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Hi! I'm your Study Buddy.</p>
              <p className="text-sm">Ask me about Quantum Physics, Geometry, or any concept!</p>
            </div>
          </div>
        )}
        
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                m.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'
              }`}>
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 rounded-tl-none">
                <Loader2 className="animate-spin text-slate-400" size={20} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 text-center">
          Study Buddy focuses on helping you learn, not just giving answers.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
