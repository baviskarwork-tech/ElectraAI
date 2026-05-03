import { useState, useEffect, useCallback } from 'react';
import { auth, signInWithPopup, googleProvider, signOut } from '@/lib/google-services';
import { onAuthStateChanged, User } from 'firebase/auth';
import Cookies from 'js-cookie';

/**
 * useAuth Hook
 * Manages the user authentication lifecycle using Firebase Auth and secure cookies.
 * Synchronizes auth state with middleware for route protection.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Listens for authentication state changes and manages secure cookies.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        Cookies.set('admin_session', 'true', { 
          expires: 1, 
          secure: true, 
          sameSite: 'strict' 
        });
      } else {
        Cookies.remove('admin_session');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Triggers the Google OAuth login popup.
   * Stable reference to prevent re-renders in consumers.
   */
  const login = useCallback(async (): Promise<void> => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error("Login failed:", error);
      }
    }
  }, []);

  /**
   * Logs the user out and clears sessions.
   * Stable reference to prevent re-renders in consumers.
   */
  const logout = useCallback(async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error("Logout failed:", error);
      }
    }
  }, []);

  return { user, loading, login, logout };
}
