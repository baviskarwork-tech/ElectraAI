"use client";

import { useState } from 'react';
import { useAssistant } from '@/hooks/useAssistant';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AssistantPage() {
  const { messages, isLoading, sendMessage } = useAssistant();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col py-6">
      <div className="flex items-center gap-3 mb-6 px-4">
        <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none">
          <Bot size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Election AI Assistant</h1>
          <p className="text-sm text-gray-500">Powered by Google Gemini AI</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-6 pb-4">
        <AnimatePresence initial={false}>
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                  m.role === 'user' 
                    ? 'bg-white border-gray-200 text-blue-600' 
                    : 'bg-blue-600 border-blue-600 text-white'
                }`}>
                  {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`p-4 rounded-2xl shadow-sm border ${
                  m.role === 'user'
                    ? 'bg-blue-50 border-blue-100 text-gray-800 rounded-tr-none'
                    : 'bg-white border-gray-100 text-gray-800 rounded-tl-none dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="flex gap-3 max-w-[85%] items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <Loader2 size={20} className="animate-spin" />
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-none italic text-sm text-gray-500">
                ElectraAI is thinking...
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 px-4 relative">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about elections..."
          className="w-full p-4 pr-14 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl focus:border-blue-500 focus:ring-0 outline-none transition-all shadow-sm"
          disabled={isLoading}
          aria-label="Ask a question about elections"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-7 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
