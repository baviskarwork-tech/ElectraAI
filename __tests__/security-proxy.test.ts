import { proxy } from '@/proxy';
import { NextRequest } from 'next/server';

describe('Security Proxy (Middleware)', () => {
  const mockRequest = (pathname: string) => ({
    nextUrl: { pathname },
    url: `http://localhost${pathname}`,
  } as unknown as NextRequest);

  it('36. adds mandatory security headers', () => {
    const req = mockRequest('/timeline');
    const res = proxy(req);
    
    expect(res.headers.get('X-Frame-Options')).toBe('DENY');
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(res.headers.get('Content-Security-Policy')).toContain("default-src 'self'");
    expect(res.headers.get('Strict-Transport-Security')).toContain('max-age=31536000');
  });

  it('37. allows non-admin routes to pass', () => {
    const req = mockRequest('/timeline');
    const res = proxy(req);
    // Should not redirect (status 200 for next())
    expect(res.status).toBe(200);
  });
});
