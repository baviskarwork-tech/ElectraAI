import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { onAuthStateChanged, User } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock('@/lib/google-services', () => ({
  auth: {},
  googleProvider: {},
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
}));

describe('useAuth Hook', () => {
  it('26. initializes with loading state', () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth: unknown, _callback: unknown) => {
      // Do nothing
      return jest.fn();
    });
    
    const { result } = renderHook(() => useAuth());
    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBe(null);
  });

  it('27. updates user state when auth changes', () => {
    let authCallback: (user: Partial<User> | null) => void = () => {};
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth: unknown, callback: (user: Partial<User> | null) => void) => {
      authCallback = callback;
      return jest.fn();
    });

    const { result } = renderHook(() => useAuth());
    
    act(() => {
      authCallback({ uid: '123', displayName: 'Test User' } as User);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.user).toEqual({ uid: '123', displayName: 'Test User' });
  });
});
