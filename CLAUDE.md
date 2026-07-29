# IPLBuzz — working agreement

Project: single-file IPL analytics dashboard (`index.html`) driven by CSV datasets, deployed on GitHub Pages. No backend; the app reads the CSVs directly and computes stats in-browser.

## Standing rules (apply to all of this owner's work)

- **Official records are the source of truth.** Always use official/authoritative records for match data, and correct any value — including Player of the Match — to match the official record when they differ. Match data here is sourced from Cricsheet ball-by-ball records.
- **PRs: raise and merge freely.** You are pre-authorized to open pull requests and merge them without asking for permission each time. Use judgement (merge when the work is complete and checks, if any, are green); no need to pause for approval.

## Data model

- `Schedule.csv` — one row per match (74: 70 league + 4 playoffs). Playoff rows carry a `stage` column (Qualifier 1/2, Eliminator, Final). `inn1_team`/`inn2_team` give batting order.
- `Batting.csv` / `Bowling.csv` / `FOW.csv` / `Partnerships.csv` — per-innings scorecards, keyed on `match_no` + `innings`. Player names are full display names.
- `Overs.csv` — over-by-over runs/wickets (powers worm chart + over analysis).
- `Points.csv` — final league standings; must reconcile exactly with `Schedule.csv` results.
- `Teams.csv` / `Squads.csv` — team metadata and squads.

When regenerating data, keep names, team abbreviations, and match numbering consistent across all files, and verify Orange/Purple Cap and the points table reconcile with the scorecards.
