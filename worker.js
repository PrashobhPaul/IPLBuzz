/**
 * IPLBuzz CricAPI Fan-Out Worker  v2
 *
 * WHY: Free CricAPI tier = ~100 hits/day. A browser-direct setup dies at 10 users.
 * HOW: This worker is the ONLY thing that hits CricAPI. It writes the response to
 *      Firebase RTDB at `iplbuzz/live`. All index.html clients read from Firebase,
 *      which is free + unlimited. Result: 1 CricAPI call per REFRESH_SECS regardless
 *      of how many users are on the site.
 *
 * TWO MODES:
 *  - Cron trigger  (scheduled event) → refresh cache
 *  - HTTP GET /refresh?key=...       → manual refresh (admin button)
 *  - HTTP GET /                      → health check
 *
 * SETUP (one time):
 *  1. wrangler secret put CRICAPI_KEY        → a7402ce9-...
 *  2. wrangler secret put FIREBASE_SECRET    → legacy DB secret from Firebase console
 *                                              (Project Settings → Service Accounts → DB secrets)
 *  3. wrangler secret put REFRESH_KEY        → any random string; admin uses it
 *  4. In wrangler.toml add:
 *       [triggers]
 *       crons = ["*\/2 * * * *"]          # every 2 minutes while matches are live
 *  5. Deploy. Done.
 *
 * CLIENT SIDE: index.html just does  db.ref('iplbuzz/live').on('value', ...)
 *              No CricAPI key in the browser. No CORS. No rate limits.
 */

const FIREBASE_DB = 'https://iplbuzz-2de05-default-rtdb.asia-southeast1.firebasedatabase.app';
const MATCH_ID_PATH = 'iplbuzz/currentMatchId'; // admin sets this when a match is live
const LIVE_PATH     = 'iplbuzz/live';
const META_PATH     = 'iplbuzz/liveMeta';

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(refreshCache(env).catch(e => console.error('cron:', e)));
  },

  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/' || url.pathname === '/health') {
      return json({ ok: true, service: 'iplbuzz-live-worker', ts: Date.now() });
    }

    if (url.pathname === '/refresh') {
      const key = url.searchParams.get('key');
      if (key !== env.REFRESH_KEY) return json({ error: 'unauthorized' }, 401);
      const result = await refreshCache(env);
      return json(result);
    }

    return json({ error: 'not found' }, 404);
  },
};

async function refreshCache(env) {
  // 1. Figure out which match to poll (admin sets this in Firebase)
  const midRes = await fbGet(MATCH_ID_PATH, env);
  const matchId = midRes && midRes.value;
  if (!matchId) {
    await fbPut(META_PATH, { status: 'idle', note: 'no currentMatchId set', ts: Date.now() }, env);
    return { status: 'idle', reason: 'no currentMatchId in Firebase' };
  }

  // 2. Call CricAPI — the ONE place this happens
  const apiUrl = `https://api.cricapi.com/v1/match_info?apikey=${env.CRICAPI_KEY}&id=${matchId}`;
  let payload, upstreamStatus;
  try {
    const r = await fetch(apiUrl, { headers: { 'User-Agent': 'IPLBuzz/2.0' } });
    upstreamStatus = r.status;
    payload = await r.json();
  } catch (e) {
    await fbPut(META_PATH, { status: 'error', error: String(e), ts: Date.now() }, env);
    return { status: 'error', error: String(e) };
  }

  // 3. Shape a compact object for the client — only what the live tile needs
  const data = payload && payload.data ? payload.data : null;
  const compact = data ? {
    matchId: data.id,
    name: data.name,
    status: data.status,
    matchType: data.matchType,
    venue: data.venue,
    date: data.date,
    teams: data.teams,
    teamInfo: data.teamInfo,
    score: data.score,
    tossWinner: data.tossWinner,
    tossChoice: data.tossChoice,
    matchWinner: data.matchWinner,
    updatedAt: Date.now()
  } : null;

  // 4. Fan-out: write once to Firebase, every client reads this instead of CricAPI
  await fbPut(LIVE_PATH, compact, env);
  await fbPut(META_PATH, {
    status: 'ok',
    upstreamStatus: upstreamStatus,
    hits: payload && payload.info ? payload.info.hitsUsed : null,
    limit: payload && payload.info ? payload.info.hitsLimit : null,
    ts: Date.now()
  }, env);

  return { status: 'ok', upstreamStatus, matchId };
}

/* ---- Firebase REST helpers (auth=legacy DB secret, no SDK needed) ---- */
async function fbGet(path, env) {
  const url = `${FIREBASE_DB}/${path}.json?auth=${env.FIREBASE_SECRET}`;
  const r = await fetch(url);
  if (!r.ok) return null;
  const v = await r.json();
  return { value: v };
}
async function fbPut(path, body, env) {
  const url = `${FIREBASE_DB}/${path}.json?auth=${env.FIREBASE_SECRET}`;
  return fetch(url, { method: 'PUT', body: JSON.stringify(body) });
}
function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}
