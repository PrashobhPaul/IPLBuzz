# IPL 2026 Dashboard

A fully self-contained cricket analytics dashboard for IPL 2026 — no server, no dependencies, no build step. Just open `index.html` in any browser.

## Features

- **Live Scores** — Auto-refreshes every 90s with a free [cricapi.com](https://cricketdata.org) key (100 calls/day)
- **Match Centre** — Full scorecards + 6-tab analytics per match:
  - Worm Chart (innings run progression with wicket markers)
  - Over-by-Over bar charts (both innings)
  - Partnership analysis (horizontal SVG charts + stacked contribution bar)
  - Player Analysis (batting SR + bowling economy charts)
  - Key Moments timeline
- **Stats Leaderboards** — 14 categories (Most Runs, Best SR, Most Wickets, Best Economy, etc.) computed live from match data
- **Points Table** — Auto-sorted by points then NRR
- **Schedule** — All 30 matches with completed results highlighted
- **Team Pages** — Squad, Newsletter (match reports), Fixtures
- **All 10 Team Logos** embedded (no external requests)
- **Sponsored Ad Tile** — The Canvas of Earth YouTube channel by Prashobh Paul

## How to Use

1. Open `index.html` in any browser
2. Optionally get a free API key at [cricketdata.org](https://cricketdata.org) and paste it in the nav bar for live scores

## Adding Match Data

After each match, update the `MATCHES` array and `SCHEDULE` entry in the `<script>` block:

```js
// 1. Mark schedule entry as completed
{no:2, ..., completed:true, result:'MI won by 5 wkts', t1score:'180/6', t2score:'181/5'}

// 2. Update POINTS array
{team:'MI', m:1, w:1, l:0, nr:0, pts:2, nrr:'+0.200'}

// 3. Add to MATCHES array with full batting/bowling/over data
```

## Tech Stack

- Pure HTML + CSS + Vanilla JS — zero frameworks, zero dependencies
- SVG charts built programmatically (no Chart.js or D3)
- All assets (logos, fonts via Google Fonts CDN) embedded or linked

## Data Sources

- Match data manually entered from official scorecards
- Live scores via [cricapi.com](https://cricketdata.org) (optional)

## Credits

- Built as an analytics-first IPL dashboard
- Sponsored by [The Canvas of Earth](https://youtube.com/@thecanvasofearth) — travel & art videos of India by Prashobh Paul
