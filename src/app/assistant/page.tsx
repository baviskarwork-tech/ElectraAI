"use client";

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Dynamic import for high-impact performance optimization
const AssistantChat = dynamic(() => import('@/components/AssistantChat'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      <p className="text-gray-500 font-medium">Initializing AI Assistant...</p>
    </div>
  ),
});

/**
 * Assistant Page
 * Root page for the AI Election Assistant.
 * Uses dynamic imports to reduce initial bundle size and improve LCP.
 */
export default function AssistantPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <AssistantChat />
    </div>
  );
}
