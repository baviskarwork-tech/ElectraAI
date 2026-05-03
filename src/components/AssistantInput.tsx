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
 * Fully compliant with WCAG 2.1 accessibility standards.
 */
function AssistantInput({ onSendMessage, isLoading }: AssistantInputProps) {
  const [input, setInput] = useState('');

  /**
   * Handles form submission and triggers the message callback.
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  }, [input, isLoading, onSendMessage]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mt-4 px-4 relative"
      role="search"
      aria-label="Election Assistant Chat"
    >
      <label htmlFor="assistant-input" className="sr-only">
        Ask a question about elections
      </label>
      <input
        id="assistant-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question about elections..."
        className="w-full p-4 pr-14 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600"
        disabled={isLoading}
        aria-required="true"
        aria-invalid={input.trim() === '' && !isLoading}
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="absolute right-7 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200 dark:shadow-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label={isLoading ? "Processing message" : "Send question to ElectraAI"}
        aria-busy={isLoading}
      >
        <Send size={20} aria-hidden="true" />
      </button>
    </form>
  );
}

export default memo(AssistantInput);
