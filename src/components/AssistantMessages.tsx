"use client";

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Loader2 } from 'lucide-react';
import { Message } from '@/types';

interface AssistantMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

/**
 * AssistantMessages Component
 * Renders the scrollable list of chat messages between the user and ElectraAI.
 */
function AssistantMessages({ messages, isLoading }: AssistantMessagesProps) {
  return (
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
  );
}

export default memo(AssistantMessages);
