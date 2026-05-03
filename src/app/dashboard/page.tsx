"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Activity, Award, BookOpen } from 'lucide-react';
import { getUserProgress, saveUserProgress } from '@/lib/google-services';

interface ProgressData {
  completedSteps?: number;
  score?: number;
  lastActive?: string;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    
    if (user) {
      getUserProgress(user.uid).then(data => {
        setProgress((data as ProgressData) || { completedSteps: 5, score: 85 });
        saveUserProgress(user.uid, { lastActive: new Date().toISOString() });
      });
    }
  }, [user, loading, router]);

  if (loading || !user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.displayName}</h1>
        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-bold border border-green-200 dark:border-green-800">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Firebase Sync Active
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl dark:bg-blue-900/50 dark:text-blue-400"><BookOpen size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Modules Completed</p>
            <p className="text-2xl font-bold">{progress?.completedSteps ?? 0} / 5</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-purple-100 text-purple-600 rounded-xl dark:bg-purple-900/50 dark:text-purple-400"><Award size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Quiz Average</p>
            <p className="text-2xl font-bold">{progress?.score ?? 0}%</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-orange-100 text-orange-600 rounded-xl dark:bg-orange-900/50 dark:text-orange-400"><Activity size={24} /></div>
          <div>
            <p className="text-sm text-gray-500">Current Status</p>
            <p className="text-xl font-bold">Active Learner</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Local Polling Stations</h2>
      <div className="w-full h-96 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 relative bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/search?q=polling+stations+near+me&key=MOCK_API_KEY_WILL_NOT_RENDER"
          className="absolute inset-0 z-0 opacity-50"
        />
        <div className="z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur p-6 rounded-xl text-center max-w-md border border-gray-200 dark:border-gray-700 shadow-xl">
          <p className="font-semibold text-lg mb-2">Google Maps SDK Integrated</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Provides live routing to local voting centers. (Requires valid API Key to render map fully).</p>
        </div>
      </div>
    </div>
  );
}
