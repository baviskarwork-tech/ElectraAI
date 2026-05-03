import { useState, useEffect } from 'react';
import { auth, signInWithPopup, googleProvider, signOut } from '@/lib/google-services';
import { onAuthStateChanged, User } from 'firebase/auth';
import Cookies from 'js-cookie';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        Cookies.set('admin_session', 'true', { expires: 1, secure: true, sameSite: 'strict' });
      } else {
        Cookies.remove('admin_session');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { user, loading, login, logout };
}
