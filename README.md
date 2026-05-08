# IPLBuzz — IPL 2026 Analytics Dashboard

> Live analytics dashboard for IPL 2026. Single-file web app, zero dependencies.

🌐 **Live:** https://prashobhpaul.github.io/IPLBuzz/

---

## Project Structure

```
IPLBuzz/
├── index.html          ← Main app (all JS + data embedded)
├── README.md           ← This file
├── players/            ← Player headshots (add new ones here)
│   ├── virat-kohli.jpg
│   ├── rohit-sharma.jpg
│   └── [player-name].jpg   ← Add any new player photo here
└── logos/              ← Team logos (all 10 teams)
    ├── rcb.png
    ├── mi.png
    ├── csk.png
    ├── kkr.png
    ├── srh.png
    ├── rr.png
    ├── pbks.png
    ├── dc.png
    ├── gt.png
    └── lsg.png
```
## Adding a New Player Photo

1. Name the file: `firstname-lastname.jpg` (all lowercase, hyphen-separated)
   - Examples: `jasprit-bumrah.jpg`, `suryakumar-yadav.jpg`, `rinku-singh.jpg`
2. Drop it into the `players/` folder
3. That's it — the dashboard auto-picks it up. No code changes needed.
> Photos auto-appear in: Orange Cap · Purple Cap · POM · Stats leaderboard · Squad cards
If a photo file is missing, the dashboard automatically shows a team-coloured circle with the player's initials as a fallback.

## Features

- **Home** — Season overview, cap race, tournament predictor, countdown timer
- **Schedule** — Full 30-match schedule with team filters
- **Points Table** — Live standings with NRR
- **Teams** — Squad (with photos), Newsletter, Fixtures for all 10 teams
- **Match Centre** — Completed match scorecards
- **Match Analytics** — 7 tabs: Pre-Match Forecast · Scorecard · Worm Chart · Over Analysis · Partnerships · Player Analysis · Key Moments
- **Stats** — 14 leaderboard categories
- **🏏 AI Chatbot** — Powered by Claude, knows all live data

## Cricbuzz-style setup (zero-cost optimized)

This repo now follows a lightweight, Cricbuzz-like delivery pattern:

- **Instant app shell load** using a Service Worker (`sw.js`) that pre-caches the core app and core CSV datasets.
- **Stale-while-revalidate for data files** (`*.csv`, `*.json`) so stats/tables open immediately from cache and silently refresh in background.
- **Network-first for UI assets** with offline fallback for seamless experience in patchy networks.
- **Preload warmup on app boot** so frequently used tables (points, batting, bowling, schedule, teams) are available fast with minimal repeated network usage.

### Why this keeps cost at ~zero

- Static hosting friendly (GitHub Pages / Cloudflare Pages / Netlify free tiers).
- Browser cache + Service Worker reduce repeated bandwidth and origin hits.
- Existing fan-out Worker design keeps live API polling centralized instead of per-user API calls.

In short: one cheap backend poller for live updates + aggressive client caching = scalable and near-zero operating cost.
