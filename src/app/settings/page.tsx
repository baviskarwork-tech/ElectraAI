"use client";

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Settings, Bell, Shield } from 'lucide-react';
import { useEffect } from 'react';

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Settings /> Account Settings
      </h1>

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <UserIcon /> Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Name</label>
              <div className="font-medium">{user.displayName || 'No Name'}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <div className="font-medium">{user.email}</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Bell size={20} /> Notifications
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Election Alerts</div>
              <div className="text-sm text-gray-500">Get notified about upcoming elections in your region.</div>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Shield size={20} /> Security
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Data Sync</div>
              <div className="text-sm text-gray-500">Sync progress securely using Firebase.</div>
            </div>
            <div className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  );
}
