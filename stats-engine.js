/* ============================================================
   IPLBuzz Stats Engine  v1.0
   Pure, dependency-free. Works in browser + Node.
   Input:  scorecards = { [matchNo]: { inn1, inn2, t1, t2, winner, pomPlayer } }
           where inn{1,2} = { team, batting:[{n,r,b,f,s,d}], bowling:[{n,o,r,w}] }
   Output: { orangeCap, purpleCap, leaderboards:{...}, points:[...] }
   ============================================================ */
(function (root) {
  'use strict';

  function oversToBalls(o) {
    var s = String(o), p = s.split('.');
    return (parseInt(p[0], 10) || 0) * 6 + (parseInt(p[1], 10) || 0);
  }

  function ensureBat(map, name, team) {
    var k = name + '|' + team;
    if (!map[k]) map[k] = {
      name: name, team: team, inn: 0, runs: 0, balls: 0,
      fours: 0, sixes: 0, hs: 0, hsNo: false, notOuts: 0,
      fifties: 0, hundreds: 0
    };
    return map[k];
  }

  function ensureBowl(map, name, team) {
    var k = name + '|' + team;
    if (!map[k]) map[k] = {
      name: name, team: team, inn: 0, wkts: 0, runs: 0,
      balls: 0, best_w: 0, best_r: 999, fifers: 0, fourfers: 0, maidens: 0
    };
    return map[k];
  }

  function processInnings(inn, bowlTeam, bats, bowls) {
    if (!inn) return;
    if (inn.batting) {
      inn.batting.forEach(function (b) {
        var p = ensureBat(bats, b.n, inn.team);
        p.inn++;
        p.runs += b.r || 0;
        p.balls += b.b || 0;
        p.fours += b.f || 0;
        p.sixes += b.s || 0;
        var notOut = (b.d || '').toLowerCase() === 'not out';
        if (notOut) p.notOuts++;
        if ((b.r || 0) > p.hs) { p.hs = b.r; p.hsNo = notOut; }
        if ((b.r || 0) >= 100) p.hundreds++;
        else if ((b.r || 0) >= 50) p.fifties++;
      });
    }
    if (inn.bowling) {
      inn.bowling.forEach(function (b) {
        var p = ensureBowl(bowls, b.n, bowlTeam);
        p.inn++;
        p.wkts += b.w || 0;
        p.runs += b.r || 0;
        p.balls += oversToBalls(b.o);
        if ((b.w || 0) > p.best_w || ((b.w || 0) === p.best_w && (b.r || 999) < p.best_r)) {
          p.best_w = b.w || 0; p.best_r = b.r || 0;
        }
        if ((b.w || 0) >= 5) p.fifers++;
        else if ((b.w || 0) >= 4) p.fourfers++;
      });
    }
  }

  function finalizeBat(arr) {
    arr.forEach(function (p) {
      var outs = p.inn - p.notOuts;
      p.avg = outs > 0 ? +(p.runs / outs).toFixed(2) : p.runs;
      p.sr = p.balls > 0 ? +((p.runs / p.balls) * 100).toFixed(2) : 0;
    });
    return arr;
  }

  function finalizeBowl(arr) {
    arr.forEach(function (p) {
      p.overs = Math.floor(p.balls / 6) + '.' + (p.balls % 6);
      p.econ = p.balls > 0 ? +((p.runs / p.balls) * 6).toFixed(2) : 0;
      p.avg = p.wkts > 0 ? +(p.runs / p.wkts).toFixed(2) : null;
      p.bsr = p.wkts > 0 ? +(p.balls / p.wkts).toFixed(2) : null;
      p.best = p.best_w + '/' + (p.best_w > 0 ? p.best_r : 0);
    });
    return arr;
  }

  function topN(arr, key, n, filterFn) {
    var a = filterFn ? arr.filter(filterFn) : arr.slice();
    a.sort(function (x, y) { return (y[key] || 0) - (x[key] || 0); });
    return a.slice(0, n || 15);
  }

  function lowN(arr, key, n, filterFn) {
    var a = (filterFn ? arr.filter(filterFn) : arr.slice())
      .filter(function (p) { return p[key] != null; });
    a.sort(function (x, y) { return x[key] - y[key]; });
    return a.slice(0, n || 15);
  }

  function computePoints(scorecards, teamList) {
    var pts = {};
    teamList.forEach(function (t) {
      pts[t] = { team: t, m: 0, w: 0, l: 0, nr: 0, pts: 0 };
    });
    Object.keys(scorecards).forEach(function (k) {
      var m = scorecards[k];
      if (!m || !m.completed) return;
      if (pts[m.t1]) pts[m.t1].m++;
      if (pts[m.t2]) pts[m.t2].m++;
      if (m.nr) {
        if (pts[m.t1]) { pts[m.t1].nr++; pts[m.t1].pts++; }
        if (pts[m.t2]) { pts[m.t2].nr++; pts[m.t2].pts++; }
        return;
      }
      if (pts[m.winner]) { pts[m.winner].w++; pts[m.winner].pts += 2; }
      var loser = m.winner === m.t1 ? m.t2 : m.t1;
      if (pts[loser]) pts[loser].l++;
    });
    return Object.values(pts).sort(function (a, b) {
      return b.pts - a.pts || (parseFloat(b.nrr || 0) - parseFloat(a.nrr || 0));
    });
  }

  function compute(scorecards, teamList) {
    var bats = {}, bowls = {}, pomCount = {};
    Object.keys(scorecards).forEach(function (k) {
      var m = scorecards[k];
      if (!m || !m.completed) return;
      processInnings(m.inn1, m.inn1 && m.inn1.team === m.t1 ? m.t2 : m.t1, bats, bowls);
      processInnings(m.inn2, m.inn2 && m.inn2.team === m.t1 ? m.t2 : m.t1, bats, bowls);
      if (m.pomPlayer) {
        var key = m.pomPlayer;
        pomCount[key] = pomCount[key] || { name: key, awards: 0, matches: [] };
        pomCount[key].awards++;
        pomCount[key].matches.push(m.no || k);
      }
    });
    var bat = finalizeBat(Object.values(bats));
    var bowl = finalizeBowl(Object.values(bowls));

    var leaderboards = {
      // Batting
      'bat-runs':  topN(bat, 'runs'),
      'bat-hs':    topN(bat, 'hs'),
      'bat-avg':   topN(bat.filter(function(p){return p.inn>=1;}), 'avg'),
      'bat-sr':    topN(bat.filter(function(p){return p.balls>=10;}), 'sr'),
      'bat-100s':  topN(bat.filter(function(p){return p.hundreds>0;}), 'hundreds'),
      'bat-50s':   topN(bat.filter(function(p){return (p.fifties+p.hundreds)>0;}), 'fifties'),
      'bat-4s':    topN(bat, 'fours'),
      'bat-6s':    topN(bat, 'sixes'),
      // Bowling
      'bowl-wkts': topN(bowl, 'wkts'),
      'bowl-avg':  lowN(bowl, 'avg',  15, function(p){return p.wkts>=1;}),
      'bowl-best': bowl.slice().sort(function(a,b){
                     return b.best_w-a.best_w || a.best_r-b.best_r;
                   }).slice(0,15),
      'bowl-5w':   topN(bowl.filter(function(p){return p.fifers>0;}), 'fifers'),
      'bowl-econ': lowN(bowl, 'econ', 15, function(p){return p.balls>=12;}),
      'bowl-sr':   lowN(bowl, 'bsr',  15, function(p){return p.wkts>=1;}),
      // Awards
      'pom-awards': Object.values(pomCount).sort(function(a,b){return b.awards-a.awards;})
    };

    return {
      orangeCap: leaderboards['bat-runs'][0] || null,
      purpleCap: leaderboards['bowl-wkts'][0] || null,
      leaderboards: leaderboards,
      points: computePoints(scorecards, teamList || []),
      allBat: bat,
      allBowl: bowl
    };
  }

  var api = { compute: compute, oversToBalls: oversToBalls };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.IPLStats = api;
})(typeof window !== 'undefined' ? window : this);
