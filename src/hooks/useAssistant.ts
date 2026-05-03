import { useState, useCallback } from 'react';
import { Message } from '@/types';

/**
 * useAssistant Hook
 * Manages the state and communication with the Gemini AI Assistant.
 */
export function useAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm ElectraAI. How can I help you understand the election process today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Sends a message to the Gemini API and updates the local chat history.
   * @param prompt The user's question or message
   */
  const sendMessage = useCallback(async (prompt: string): Promise<void> => {
    if (!prompt.trim()) return;

    const userMessage: Message = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await res.json() as { text?: string };
      
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.text || "Sorry, I couldn't process that." 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Network error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, isLoading, sendMessage };
}
