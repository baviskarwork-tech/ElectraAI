"use client";

import { memo, useCallback } from 'react';
import { useAssistant } from '@/hooks/useAssistant';
import { Bot } from 'lucide-react';
import AssistantMessages from './AssistantMessages';
import AssistantInput from './AssistantInput';

/**
 * AssistantChat Component
 * Handles the interactive chat interface with Google Gemini AI.
 * Orchestrates message history and user input via sub-components.
 */
function AssistantChat() {
  const { messages, isLoading, sendMessage } = useAssistant();

  /**
   * Dispatches the user message to the assistant hook.
   */
  const handleSendMessage = useCallback((text: string) => {
    sendMessage(text);
  }, [sendMessage]);

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col py-6">
      <header className="flex items-center gap-3 mb-6 px-4">
        <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none">
          <Bot size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Election AI Assistant</h1>
          <p className="text-sm text-gray-500">Powered by Google Gemini AI</p>
        </div>
      </header>

      <AssistantMessages messages={messages} isLoading={isLoading} />
      
      <AssistantInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default memo(AssistantChat);
