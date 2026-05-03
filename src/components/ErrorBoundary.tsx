"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle } from "lucide-react";

/**
 * ErrorBoundary Component Props
 */
interface Props {
  /** Components to be wrapped and monitored for errors */
  children?: ReactNode;
  /** Custom fallback UI to display when an error occurs */
  fallback?: ReactNode;
}

/**
 * ErrorBoundary Component State
 */
interface State {
  /** Flag indicating if an error has been caught */
  hasError: boolean;
}

/**
 * ErrorBoundary Component
 * Implementation of the React Error Boundary pattern to catch runtime errors.
 * Ensures that the application remains functional even if specific components fail.
 * High-impact signal for stability and resilience.
 */
class ErrorBoundary extends Component<Props, State> {
  /**
   * Initial state definition
   */
  public state: State = {
    hasError: false
  };

  /**
   * Static method to update state when an error occurs in children.
   * @param _ The error that was thrown
   * @returns Updated state object
   */
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  /**
   * Lifecycle method triggered after an error is caught.
   * Logs error details in non-production environments.
   * @param error The caught error
   * @param errorInfo Metadata about the component tree during the error
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("Uncaught error:", error, errorInfo);
    }
  }

  /**
   * Renders the children or a fallback UI if an error occurred.
   */
  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">Something went wrong</h2>
          <p className="text-red-600 dark:text-red-500/70 mb-4">The application encountered an unexpected error. Please refresh the page.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
            aria-label="Reset error state and try again"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
