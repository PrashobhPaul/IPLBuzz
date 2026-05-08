import React from 'react';

type MatchCard = {
  id: string;
  team1: string;
  team2: string;
  team1Score?: string;
  team2Score?: string;
  status: 'LIVE' | 'UPCOMING' | 'RESULT';
  venue?: string;
  time?: string;
  result?: string;
};

type Standing = { team: string; p: number; w: number; l: number; pts: number; nrr: string };

type IPLBuzzLiveDashboardProps = {
  liveMatch?: MatchCard;
  schedule: MatchCard[];
  points: Standing[];
  topStats: Array<{ label: string; value: string; sub?: string }>;
};

export default function IPLBuzzLiveDashboard({ liveMatch, schedule, points, topStats }: IPLBuzzLiveDashboardProps) {
  return (
    <div className="iplbuzz-wrap">
      <header className="hero">
        <h1>IPLBuzz Live</h1>
        <p>Live scores · Schedule · Points · Stats</p>
      </header>

      {liveMatch && (
        <section className="live-card">
          <div className="live-pill">● LIVE</div>
          <div className="teams-row">
            <div><h3>{liveMatch.team1}</h3><strong>{liveMatch.team1Score || '—'}</strong></div>
            <div className="vs">VS</div>
            <div><h3>{liveMatch.team2}</h3><strong>{liveMatch.team2Score || '—'}</strong></div>
          </div>
          <p className="meta">{liveMatch.venue || ''}</p>
        </section>
      )}

      <div className="grid">
        <section className="panel">
          <h2>Upcoming / Results</h2>
          {schedule.map((m) => (
            <article key={m.id} className="match-row">
              <div>
                <div className="title">{m.team1} vs {m.team2}</div>
                <div className="sub">{m.time || m.result || ''}</div>
              </div>
              <span className={`tag ${m.status.toLowerCase()}`}>{m.status}</span>
            </article>
          ))}
        </section>

        <section className="panel">
          <h2>Points Table</h2>
          <table>
            <thead><tr><th>Team</th><th>P</th><th>W</th><th>L</th><th>Pts</th><th>NRR</th></tr></thead>
            <tbody>
              {points.map((p) => (
                <tr key={p.team}><td>{p.team}</td><td>{p.p}</td><td>{p.w}</td><td>{p.l}</td><td>{p.pts}</td><td>{p.nrr}</td></tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="panel">
          <h2>Top Stats</h2>
          {topStats.map((s) => (
            <div key={s.label} className="stat-row"><span>{s.label}</span><b>{s.value}</b><small>{s.sub}</small></div>
          ))}
        </section>
      </div>

      <style>{`
        .iplbuzz-wrap{background:#080b12;color:#e7ecff;padding:16px;font-family:Inter,system-ui,sans-serif}
        .hero h1{margin:0;font-size:28px}.hero p{opacity:.7;margin:4px 0 14px}
        .live-card{border:1px solid #263250;background:linear-gradient(135deg,#0e1728,#141827);padding:14px;border-radius:12px;margin-bottom:14px}
        .live-pill{font-size:11px;color:#6cff9f;font-weight:700;letter-spacing:1px;margin-bottom:10px}
        .teams-row{display:flex;justify-content:space-between;align-items:center}.teams-row h3{margin:0 0 6px}
        .teams-row strong{font-size:22px}.vs{opacity:.5;font-weight:700}
        .meta{opacity:.7;margin:10px 0 0}
        .grid{display:grid;grid-template-columns:2fr 2fr 1.5fr;gap:12px}
        .panel{border:1px solid #263250;background:#111827;padding:12px;border-radius:12px}
        .panel h2{margin:0 0 10px;font-size:16px}
        .match-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #22304a}
        .match-row:last-child{border-bottom:none}.title{font-weight:600}.sub{font-size:12px;opacity:.75}
        .tag{font-size:10px;padding:3px 7px;border-radius:999px;border:1px solid}.tag.live{color:#6cff9f}.tag.upcoming{color:#ffd166}.tag.result{color:#8ea0c3}
        table{width:100%;border-collapse:collapse}th,td{padding:6px 4px;text-align:left;font-size:12px;border-bottom:1px solid #22304a}
        .stat-row{display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-bottom:1px solid #22304a}.stat-row small{opacity:.7}
        @media (max-width: 900px){.grid{grid-template-columns:1fr}}
      `}</style>
    </div>
  );
}
