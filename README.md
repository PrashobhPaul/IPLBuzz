# IPLBuzz — IPL 2026 Analytics Dashboard

> Complete analytics dashboard for the **finished IPL 2026 season**. Single-file web app, zero dependencies, works fully offline.

🌐 **Live:** https://prashobhpaul.github.io/IPLBuzz/

🏆 **Champions:** Royal Challengers Bengaluru (beat Gujarat Titans in the Final).
🟠 **Orange Cap:** Vaibhav Sooryavanshi (776 runs) · 🟣 **Purple Cap:** Bhuvneshwar Kumar (29 wickets).

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

- **Home** — Season summary, champions banner, final standings (with playoff cut-off), season awards
- **Schedule** — Full 74-match fixture list (70 league + 4 playoffs) with results, grouped by date
- **Points Table** — Final league standings with NRR and playoff qualification
- **Teams** — Squad (with photos) and season performance for all 10 teams
- **Match Centre** — Every match with detailed scorecards
- **Match Analytics** — Scorecard · Worm Chart · Over Analysis · Partnerships · Player Analysis · Key Moments (all derived from ball-by-ball data)
- **Stats** — 16 full-season leaderboard categories (Orange Cap, Purple Cap, and more)
- **🏏 IPLBuzz Bot** — A built-in, fully offline analyst that answers from the season data baked into the app

## Data

All season data lives in CSV files that the app loads at startup (no backend, no API keys):

| File | What |
|---|---|
| `Schedule.csv` | All 74 matches — teams, venue, result, scores, POM, toss, playoff stage |
| `Points.csv` | Final league points table (P/W/L/NR/Pts/NRR) |
| `Batting.csv` · `Bowling.csv` | Per-innings batting & bowling scorecards for every match |
| `FOW.csv` · `Partnerships.csv` | Fall of wickets and partnerships per innings |
| `Overs.csv` | Over-by-over runs/wickets (powers the worm chart & over analysis) |
| `Teams.csv` · `Squads.csv` | Team metadata and squads |

Match data is sourced from **[Cricsheet](https://cricsheet.org)** ball-by-ball records (ODbL). Leaderboards, the points table, and all analytics are computed in-browser from these files, so the numbers always reconcile with the scorecards.

> **Note:** `admin.html` and `worker.js` were part of the original live-ops pipeline (Firebase + CricAPI polling) used while the season was in progress. The season is over, so the public app no longer depends on them — it reads everything from the static CSVs above.

## Zero-cost, offline-first delivery

- **Instant app-shell load** via a Service Worker (`sw.js`) that pre-caches the app and all CSV datasets.
- **Stale-while-revalidate** for data files so tables and stats open immediately from cache.
- **Fully static** — deploys on any free static host (GitHub Pages / Cloudflare Pages / Netlify) and runs offline after first load.
