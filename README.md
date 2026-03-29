# 🏏 IPLBuzz — IPL 2026 Analytics Dashboard

> **A fully self-contained cricket analytics dashboard that rivals Cricbuzz and ESPNcricinfo — no server, no build step, no dependencies. Just open `index.html` in any browser.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-IPLBuzz-brightgreen?style=for-the-badge)](https://PrashobhPaul.github.io/IPLBuzz/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![Single File](https://img.shields.io/badge/Single%20File-845KB-blue?style=for-the-badge)]()
[![No Dependencies](https://img.shields.io/badge/Dependencies-Zero-orange?style=for-the-badge)]()

---

## 🌐 Live Demo

👉 **[https://PrashobhPaul.github.io/IPLBuzz/](https://PrashobhPaul.github.io/IPLBuzz/)**

---

## 📸 Screenshots

| Home Page | Match Analytics | Pre-Match Forecast |
|-----------|----------------|-------------------|
| Live result tile, Orange/Purple Cap, Tournament Prediction | Worm charts, Over analysis, Partnerships | H2H, Venue trends, Win predictor |

---

## ✨ What Makes This Different

Most IPL dashboards are either:
- Power BI files that need desktop software
- React/Node apps that need a server and `npm install`
- Basic scorecard pages with no analytics depth

**IPLBuzz is a single HTML file** with 94 JavaScript functions, all SVG charts hand-built from scratch, all 10 team logos embedded — and it runs instantly in any browser with no setup whatsoever.

---

## 🎯 Key Features

### 🏠 Smart Home Page
- **Dynamic date-awareness** — the page knows what day it is and automatically shows today's match, recent results, or upcoming fixtures accordingly
- **Live countdown timer** to match start (HH:MM:SS, converts to IST automatically)
- **🟠 Orange Cap** tracker — live top run-scorers with avg and SR
- **🟣 Purple Cap** tracker — live top wicket-takers with economy
- **🏆 Tournament winner prediction** — probability bars for all 10 teams based on points (45%), win rate (35%) and NRR (20%), updating after every match
- One-tap expandable full scorecard for the last completed match

### 📊 Match Analytics (6 deep-dive tabs per match)
#### 1. Scorecard
- Full batting card with dismissal details
- Colour-coded strike rate bars (green ≥175 / gold ≥125 / red <75)
- Bowling economy efficiency bars
- Fall of wickets chips
- Did Not Bat list

#### 2. Worm Chart
- SVG run progression line with gradient area fill
- Phase bands — Powerplay (blue) / Middle (amber) / Death (red)
- Wicket markers (W1–W9) at exact fall positions
- Per-over dots coloured by run rate
- Phase summary cards (runs / wickets / RR) for both innings

#### 3. Over Analysis
- Bar chart for every over, coloured by phase
- 15+ run overs highlighted in gold
- Wicket caps on each wicket over
- Bowler economy dual-bar chart (economy efficiency + wickets)
- Boundary breakdown — 4s / 6s / running / extras with % bars
- Both innings shown side by side

#### 4. Partnership Analysis
- Horizontal SVG bar chart — gold ≥80 runs / green ≥40 / grey <40
- Stacked contribution bar showing each stand's share of the total
- Key stand callout with match context narrative

#### 5. Player Analysis
- Batting strike rate chart with SR 100/150/200/250 benchmark lines
- Bowling performance dual-bar index (economy + wickets)
- Player impact rating cards (out of 10) with star ratings, team colour accents and performance bars — for both innings

#### 6. Key Moments Timeline
- Score milestone cards (50/100/150/200)
- Chronological match timeline with over number, emoji and context for every pivotal moment — both innings

### 🔮 Pre-Match Forecast
Every upcoming match comes with a full forecast tab:
- **Head-to-Head record** — win counts, percentage bar in team colours
- **Average 1st innings score** at the venue
- **Venue trends** — Won batting first vs batting second (last season)
- **Powerplay trends** — average PP score at the venue
- **Impact player** spotlight with key stats
- **Win prediction bar** — horizontal split bar showing pre-match edge with analysis basis and actual result banner after the game

### 📈 Stats Leaderboards (14 categories)
Auto-computed from match data — updates every time a new match is added:

| Batting | Bowling |
|---------|---------|
| Most Runs | Most Wickets |
| Highest Score | Best Bowling Average |
| Best Batting Average | Best Bowling Figures |
| Best Strike Rate | Most 5-Wicket Hauls |
| Most Hundreds | Best Economy |
| Most Fifties | Best Bowling Strike Rate |
| Most Fours | |
| Most Sixes | |

Each leaderboard has: rank medals 🥇🥈🥉 · team logo · player name · horizontal bar chart · value · sub-stats

### 📅 Schedule
- All 30 IPL 2026 matches
- Completed matches highlighted with result badges and scores
- Today's match highlighted in green with live dot
- Filter by team

### 🏆 Points Table
- Auto-sorted by points then NRR
- All 10 team logos
- Click any team row to open their team page

### 👕 Team Pages (10 teams, 3 tabs each)
- **Squad** — players grouped by role (Batsman / WK / All-Rounder / Bowler), colour-coded
- **Newsletter** — match reports with structured sections, stat grids, hero result banners
- **Fixtures** — all team matches

### 📡 Live Scores (Optional)
- Plug in a free [cricapi.com](https://cricketdata.org) key (100 calls/day)
- Auto-refreshes every 90 seconds during live matches
- Smart call budgeting — pauses when tab is hidden
- Falls back gracefully to static data when no key is provided

---

## 🛠️ Tech Stack

| What | How |
|------|-----|
| Framework | None — vanilla HTML + CSS + JS |
| Charts | Hand-built SVG (no D3, no Chart.js) |
| Fonts | Google Fonts CDN (Teko, Barlow Condensed, DM Sans) |
| Logos | All 10 team logos base64-embedded |
| Data | Static JS arrays, updated manually after each match |
| Live scores | [cricapi.com](https://cricketdata.org) (optional) |
| Hosting | GitHub Pages |
| Build step | None |
| Dependencies | Zero |

---

## 🚀 Getting Started

### Option 1 — Just open it
```
Download index.html → double-click → opens in browser
```

### Option 2 — Clone and run
```bash
git clone https://github.com/PrashobhPaul/IPLBuzz.git
cd IPLBuzz
open index.html   # macOS
# or
start index.html  # Windows
```

### Option 3 — Live on GitHub Pages
Visit: **[https://PrashobhPaul.github.io/IPLBuzz/](https://PrashobhPaul.github.io/IPLBuzz/)**

---

## 📝 Adding Match Data

After each IPL match, update three places in `index.html`:

### 1. Mark the schedule entry as completed
```js
{
  no:2, date:'Sun, Mar 29', d:'Mar 29',
  t1:'MI', t2:'KKR', time:'7:30 PM',
  completed: true,
  result: 'MI won by 5 wickets',
  t1score: '185/6', t1ov: '20',
  t2score: '186/5', t2ov: '19.2'
}
```

### 2. Update the POINTS table
```js
{team:'MI', m:1, w:1, l:0, nr:0, pts:2, nrr:'+0.320'}
```

### 3. Add to MATCHES array
```js
{
  id:'m2', no:2, ...
  inn1:{ batting:[...], bowling:[...], overR:[...], pships:[...], fow:[...] },
  inn2:{ batting:[...], bowling:[...], overR:[...], pships:[...], fow:[...] },
  ratings:[...]
}
```

Once added, **all leaderboards, cap trackers, tournament predictions, charts and home page** update automatically — no other changes needed.

---

## 🏟️ Matches Covered

| # | Date | Match | Venue |
|---|------|-------|-------|
| 1 | Mar 28 | RCB vs SRH ✅ | M. Chinnaswamy Stadium, Bengaluru |
| 2 | Mar 29 | MI vs KKR | Wankhede Stadium, Mumbai |
| 3 | Mar 30 | RR vs CSK | Sawai Mansingh Stadium, Jaipur |
| ... | ... | 30 matches total | ... |

---

## 🔑 Live Scores Setup (Optional)

1. Sign up free at [cricketdata.org](https://cricketdata.org)
2. Get your API key (100 calls/day free)
3. Paste it in the nav bar → click **Save**
4. Dashboard auto-refreshes every 90 seconds during live matches

---

## 📂 Project Structure

```
IPLBuzz/
├── index.html          # The entire app — HTML + CSS + JS in one file
└── README.md           # This file
```

That's it. One file. 845KB. The whole thing.

---

## 🤝 Contributing

Contributions are welcome! Ideas for improvement:

- [ ] Add more completed match data as the season progresses
- [ ] Orange/Purple cap historical trend chart
- [ ] Head-to-head player matchup stats
- [ ] Ball-by-ball win probability chart
- [ ] Historical season comparison (2024 vs 2025 vs 2026)
- [ ] Fantasy points calculator per player

To contribute:
1. Fork the repo
2. Add your match data or feature
3. Submit a pull request

---

## 📜 License

MIT License — free to use, modify and distribute.

---

## 🙏 Credits

- **Built by** [Prashobh Paul](https://github.com/PrashobhPaul)
- **Sponsored by** [The Canvas of Earth](https://youtube.com/@thecanvasofearth) — travel & art videos of India by Prashobh Paul
- **Live score data** (optional) via [cricapi.com](https://cricketdata.org)
- **Inspired by** the need for a deeper, analyst-grade cricket dashboard that works without a backend

---

## ⭐ If you find this useful

Give it a **star** ⭐ on GitHub — it helps others discover the project!

[![Star on GitHub](https://img.shields.io/github/stars/PrashobhPaul/IPLBuzz?style=social)](https://github.com/PrashobhPaul/IPLBuzz)
