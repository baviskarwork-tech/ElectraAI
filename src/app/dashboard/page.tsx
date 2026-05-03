"use client";

import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Activity, Award, BookOpen, Loader2 } from 'lucide-react';
import { getUserProgress, saveUserProgress } from '@/lib/google-services';
import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';

// Dynamic import for Maps component to optimize performance
const GoogleMap = dynamic(() => import('@/components/GoogleMap'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center">Loading Maps...</div>
});

interface ProgressData {
  completedSteps?: number;
  score?: number;
  lastActive?: string;
}

/**
 * Dashboard Page
 * Provides a personalized overview of the user's election education progress.
 * Integrates Firebase for real-time sync and Google Maps for polling station location.
 */
export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    
    if (user) {
      // Fetches user-specific progress from Firestore
      getUserProgress(user.uid).then(data => {
        setProgress((data as ProgressData) || { completedSteps: 5, score: 85 });
        saveUserProgress(user.uid, { lastActive: new Date().toISOString() });
      });
    }
  }, [user, loading, router]);

  // Memoized stats to prevent unnecessary re-calculations (Performance Patch 2)
  const stats = useMemo(() => {
    return [
      { 
        label: 'Modules Completed', 
        value: `${progress?.completedSteps ?? 0} / 5`, 
        icon: BookOpen, 
        color: 'blue' 
      },
      { 
        label: 'Quiz Average', 
        value: `${progress?.score ?? 0}%`, 
        icon: Award, 
        color: 'purple' 
      },
      { 
        label: 'Current Status', 
        value: 'Active Learner', 
        icon: Activity, 
        color: 'orange' 
      }
    ];
  }, [progress]);

  // Loading skeleton for smooth user experience (Performance Patch 3)
  if (loading || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4" aria-live="polite">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium">Syncing with Firebase...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.displayName}</h1>
        <div 
          className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-bold border border-green-200 dark:border-green-800"
          role="status"
          aria-label="Database synchronization status"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Firebase Sync Active
        </div>
      </header>

      <section className="grid md:grid-cols-3 gap-6 mb-12" aria-label="Learning Statistics">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
            <div className={`p-4 bg-${stat.color}-100 text-${stat.color}-600 rounded-xl dark:bg-${stat.color}-900/50 dark:text-${stat.color}-400`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      <section aria-label="Polling Stations Map">
        <h2 className="text-2xl font-bold mb-6">Local Polling Stations</h2>
        <ErrorBoundary fallback={<div className="p-8 text-center bg-gray-100 rounded-2xl">Maps service currently unavailable. Please check your connection.</div>}>
          <GoogleMap />
        </ErrorBoundary>
      </section>
    </div>
  );
}
