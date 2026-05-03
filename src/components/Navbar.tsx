"use client";

import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-2xl text-blue-600 dark:text-blue-400">
          ElectraAI
        </Link>
        <div className="hidden md:flex gap-4">
          <Link href="/timeline" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 transition-colors font-medium">Timeline</Link>
          <Link href="/quiz" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 transition-colors font-medium">Quiz</Link>
          <Link href="/assistant" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 transition-colors font-medium">Assistant</Link>
          <Link href="/admin" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 transition-colors font-medium">Admin</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {loading ? (
          <div className="w-24 h-10 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg"></div>
        ) : user ? (
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">
              {user.displayName || "Dashboard"}
            </Link>
            <button 
              onClick={logout}
              aria-label="Logout"
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <Link href="/login" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <User size={18} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
