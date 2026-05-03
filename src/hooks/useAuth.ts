import { useState, useEffect } from 'react';
import { auth, googleProvider, signInWithPopup, signOut } from '../lib/google-services';
import { User, onAuthStateChanged } from 'firebase/auth';
import Cookies from 'js-cookie';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Set cookie for simple admin guard verification
        Cookies.set('admin_session', 'true', { expires: 1 });
      } else {
        Cookies.remove('admin_session');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      Cookies.remove('admin_session');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return { user, loading, loginWithGoogle, logout };
}
