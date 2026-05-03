import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, Auth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, Firestore } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Firebase Configuration
 * Utilizes environment variables with safe fallbacks for build-time stability.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mock-auth-domain.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mock-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "mock-storage-bucket.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:mockappid",
};

/**
 * Singleton Firebase Instance
 */
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

/**
 * Shared Service Instances
 */
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

/**
 * Saves user-specific progress to Firestore.
 * @param userId The unique identifier for the user
 * @param data The progress data to persist
 * @returns Promise resolving to a boolean indicating success
 */
export async function saveUserProgress(userId: string, data: Record<string, unknown>): Promise<boolean> {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, data, { merge: true });
    return true;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn("Firestore save failed, falling back gracefully", error);
    }
    return false;
  }
}

/**
 * Retrieves user-specific progress from Firestore.
 * @param userId The unique identifier for the user
 * @returns Promise resolving to the user data or null if not found
 */
export async function getUserProgress(userId: string): Promise<Record<string, unknown> | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn("Firestore fetch failed, falling back gracefully", error);
    }
    return null;
  }
}

/**
 * Singleton Gemini AI Client
 */
const geminiApiKey = process.env.GEMINI_API_KEY || "mock-gemini-key";
const genAI = new GoogleGenerativeAI(geminiApiKey);

/**
 * Factory for Gemini AI models.
 * @returns The initialized generative model instance
 */
export function getGeminiModel() {
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

export { app, auth, db, googleProvider, signInWithPopup, signOut };
