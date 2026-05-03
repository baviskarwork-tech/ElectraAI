/**
 * Web Vitals Reporter
 * Used to monitor and report Core Web Vitals to improve user experience and performance signals.
 */

export interface WebVitalsMetric {
  id: string;
  name: string;
  startTime: number;
  value: number;
  label: 'web-vital' | 'custom';
}

export function reportWebVitals(metric: WebVitalsMetric): void {
  if (process.env.NODE_ENV === "development") {
    console.debug(`[Web Vital] ${metric.name}:`, metric.value);
  }
  
  // In production, these could be sent to Google Analytics or Vertex AI logs
}
