/**
 * IPLBuzz — CricAPI CORS Proxy Worker
 *
 * DEPLOY STEPS:
 * 1. Go to https://workers.cloudflare.com  →  Create a Service
 * 2. Name it: cricapi-proxy
 * 3. Paste this entire file
 * 4. Click "Deploy"
 * 5. Copy the worker URL (e.g. https://cricapi-proxy.yourname.workers.dev)
 * 6. In IPLBuzz Admin → Settings → paste the Worker URL
 *
 * HOW IT WORKS:
 * index.html calls:  https://your-worker.workers.dev?url=https://api.cricapi.com/...
 * Worker forwards to CricAPI, adds CORS headers, returns response.
 *
 * ALLOWED ORIGINS: Update the list below to restrict to your domain only.
 */

const ALLOWED_ORIGINS = [
  'https://prashobhpaul.github.io',
  'http://localhost',
  'http://127.0.0.1',
  // Add more origins as needed
];

const ALLOWED_HOSTS = [
  'api.cricapi.com',
];

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
      });
    }

    const url = new URL(request.url);
    const targetParam = url.searchParams.get('url');

    if (!targetParam) {
      return jsonError(400, 'Missing ?url= parameter', request);
    }

    let targetUrl;
    try {
      targetUrl = new URL(targetParam);
    } catch (e) {
      return jsonError(400, 'Invalid URL: ' + targetParam, request);
    }

    // Security: only allow requests to approved hosts
    if (!ALLOWED_HOSTS.includes(targetUrl.hostname)) {
      return jsonError(403, 'Host not allowed: ' + targetUrl.hostname, request);
    }

    // Forward the request to CricAPI
    try {
      const upstream = await fetch(targetUrl.toString(), {
        method: request.method,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'IPLBuzz/1.0',
        },
        // CF will cache GET responses
        cf: { cacheTtl: 60, cacheEverything: true },
      });

      const body = await upstream.text();

      return new Response(body, {
        status: upstream.status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(request),
        },
      });
    } catch (e) {
      return jsonError(502, 'Upstream fetch failed: ' + e.message, request);
    }
  },
};

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowedOrigin = ALLOWED_ORIGINS.some(o => origin.startsWith(o))
    ? origin
    : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonError(status, message, request) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(request),
    },
  });
}
