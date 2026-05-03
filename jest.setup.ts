import '@testing-library/jest-dom'
import 'whatwg-fetch'

// Polyfill Response.json if it's missing (needed for some Node/JSDOM environments)
if (typeof Response.json !== 'function') {
  Response.json = function(data: unknown, init?: ResponseInit) {
    const body = JSON.stringify(data);
    const responseInit = init || {};
    const headers = new Headers(responseInit.headers);
    headers.set('Content-Type', 'application/json');
    return new Response(body, {
      ...responseInit,
      headers
    });
  };
}
