"use client";

import { useState, useCallback, memo } from 'react';
import { Send } from 'lucide-react';

interface AssistantInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

/**
 * AssistantInput Component
 * Handles user text input and submission for the AI Assistant.
 */
function AssistantInput({ onSendMessage, isLoading }: AssistantInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  }, [input, isLoading, onSendMessage]);

  return (
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
  );
}

export default memo(AssistantInput);
