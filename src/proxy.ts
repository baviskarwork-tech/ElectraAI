import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Security Middleware (Proxy)
 * Implements high-impact security hardening via strict HTTP headers.
 * Protects against XSS, Clickjacking, and other common web vulnerabilities.
 */
export function proxy(_request: NextRequest) {
  // Hardened CSP Header (Security Patch 7)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://maps.googleapis.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://maps.googleapis.com https://maps.gstatic.com;
    font-src 'self';
    connect-src 'self' https://*.googleapis.com https://*.firebaseio.com;
    frame-src 'self' https://www.google.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  const response = NextResponse.next();

  // Standard Enterprise Security Headers
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
