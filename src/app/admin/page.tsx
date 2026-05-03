"use client";

import { BarChart3, Users, BookOpen } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-bold border border-purple-200 dark:border-purple-800">
          <BarChart3 size={16} />
          Vertex AI Analytics
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 mb-8 shadow-sm">
        <h2 className="text-xl font-bold mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">Platform Overview</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl dark:bg-blue-900/50 dark:text-blue-400"><Users /></div>
              <span className="text-sm font-bold text-green-500">+12%</span>
            </div>
            <p className="text-3xl font-extrabold">2,405</p>
            <p className="text-gray-500 text-sm mt-1 font-medium">Total Registered Users</p>
          </div>
          
          <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl dark:bg-green-900/50 dark:text-green-400"><BookOpen /></div>
              <span className="text-sm font-bold text-green-500">+8%</span>
            </div>
            <p className="text-3xl font-extrabold">18,290</p>
            <p className="text-gray-500 text-sm mt-1 font-medium">Modules Completed</p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-xl dark:bg-orange-900/50 dark:text-orange-400"><BarChart3 /></div>
              <span className="text-sm font-bold text-gray-400">Stable</span>
            </div>
            <p className="text-3xl font-extrabold">88%</p>
            <p className="text-gray-500 text-sm mt-1 font-medium">Average Quiz Score</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white rounded-3xl p-8 flex flex-col items-center justify-center text-center min-h-[300px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-gray-900 to-gray-900"></div>
        <BarChart3 size={48} className="mb-4 text-blue-400 relative z-10" />
        <h3 className="text-2xl font-bold mb-2 relative z-10">BigQuery Integration Active</h3>
        <p className="text-gray-400 max-w-lg relative z-10">Real-time demographic models and election trend analytics are currently being processed by Google Cloud BigQuery infrastructure.</p>
      </div>
    </div>
  );
}
