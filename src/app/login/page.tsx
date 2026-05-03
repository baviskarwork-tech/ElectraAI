"use client";

import { useState, useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { User, LogIn, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

// Validation Schema for Login
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" })
});

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Login Page
 * Entry point for user authentication.
 * Supports Google OAuth and traditional email/password forms.
 */
function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});

  /**
   * Handles the submission of the email login form.
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);
    
    if (!result.success) {
      const formattedErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.issues.forEach(issue => {
        formattedErrors[issue.path[0] as keyof LoginFormData] = issue.message;
      });
      setErrors(formattedErrors);
    } else {
      setErrors({});
      // Simulated Email Login for demo
      alert("Traditional login submitted! In production, this uses Firebase Auth.");
    }
  }, [formData]);

  /**
   * Handles the email input change.
   */
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, email: e.target.value }));
  }, []);

  /**
   * Handles the password input change.
   */
  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, password: e.target.value }));
  }, []);

  /**
   * Redirects to dashboard if user is already authenticated.
   * Moved after hooks to comply with React Hook rules.
   */
  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} />
          </div>
          <h1 className="text-2xl font-bold">Welcome to ElectraAI</h1>
          <p className="text-gray-500 text-sm mt-2">Sign in to track your election learning progress.</p>
        </div>

        <button 
          onClick={login}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mb-6 shadow-sm"
          aria-label="Sign in with Google"
        >
          <Globe size={20} className="text-blue-500" />
          Continue with Google
        </button>

        <div className="relative flex items-center justify-center mb-6">
          <span className="bg-white dark:bg-gray-900 px-4 text-xs text-gray-400 z-10 uppercase tracking-widest font-bold">Or continue with email</span>
          <div className="absolute w-full h-px bg-gray-200 dark:bg-gray-800"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleEmailChange}
              className={`w-full bg-gray-50 dark:bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              aria-label="Email Address"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-red-500 text-xs mt-2 font-medium">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={handlePasswordChange}
              className={`w-full bg-gray-50 dark:bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              aria-label="Password"
              aria-invalid={!!errors.password}
            />
            {errors.password && <p className="text-red-500 text-xs mt-2 font-medium">{errors.password}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all mt-6 shadow-lg shadow-blue-200 dark:shadow-none"
            aria-label="Sign In"
          >
            <LogIn size={18} />
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default memo(LoginPage);
