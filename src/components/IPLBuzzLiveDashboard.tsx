export default function IPLBuzzLiveDashboard() {
  const liveMatches = [
    {
      team1: 'MI',
      score1: '162/4',
      overs1: '18.3',
      team2: 'CSK',
      score2: '168/6',
      overs2: '20',
      status: 'CSK need 5 runs from 9 balls',
    },
  ];

  const schedules = [
    {
      date: '25 MAY',
      match: 'LSG vs GT',
      venue: 'Ekana Cricket Stadium, Lucknow',
      time: '7:30 PM',
    },
    {
      date: '26 MAY',
      match: 'PBKS vs SRH',
      venue: 'HPCA Stadium, Dharamshala',
      time: '7:30 PM',
    },
  ];

  const stats = [
    {
      title: 'Most Runs',
      player: 'Virat Kohli',
      value: '648',
    },
    {
      title: 'Most Wickets',
      player: 'Yuzvendra Chahal',
      value: '20',
    },
  ];

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <header className="border-b border-white/10 bg-gradient-to-r from-[#071b34] to-[#020817] px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h1 className="text-5xl font-black tracking-tight">
              IPL<span className="text-yellow-400">BUZZ</span>
            </h1>
            <p className="text-white/70 mt-3 text-lg">
              The World of T20 Cricket
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-black leading-tight text-right">
              LIVE CRICKET.
              <br />
              <span className="text-yellow-400">EVERY MOMENT.</span>
            </h2>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 xl:grid-cols-3 gap-8">
        <section className="xl:col-span-2 space-y-8">
          {liveMatches.map((match, index) => (
            <div
              key={index}
              className="rounded-3xl bg-gradient-to-br from-[#0b1f3a] to-[#08111f] border border-yellow-500/20 p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-red-400 font-bold">LIVE MATCH</p>
                  <h3 className="text-3xl font-black mt-2">
                    MI vs CSK
                  </h3>
                </div>

                <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full border border-red-500/30 font-bold">
                  LIVE
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
                <div>
                  <div className="w-24 h-24 mx-auto rounded-full bg-blue-600/20 flex items-center justify-center text-3xl font-black">
                    MI
                  </div>
                  <h4 className="text-5xl font-black mt-4">
                    {match.score1}
                  </h4>
                  <p className="text-white/60 mt-2">
                    {match.overs1} Overs
                  </p>
                </div>

                <div>
                  <div className="text-5xl font-black text-yellow-400">
                    VS
                  </div>
                  <p className="mt-6 text-white/70 font-semibold">
                    {match.status}
                  </p>
                </div>

                <div>
                  <div className="w-24 h-24 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center text-3xl font-black">
                    CSK
                  </div>
                  <h4 className="text-5xl font-black mt-4">
                    {match.score2}
                  </h4>
                  <p className="text-white/60 mt-2">
                    {match.overs2} Overs
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-3xl bg-[#081423] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black">Upcoming Matches</h3>
              <button className="text-yellow-400 font-semibold">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {schedules.map((match, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-400 font-black">
                        {match.date}
                      </p>
                      <h4 className="text-xl font-bold mt-2">
                        {match.match}
                      </h4>
                      <p className="text-white/60 mt-1 text-sm">
                        {match.venue}
                      </p>
                    </div>

                    <div className="text-blue-300 font-semibold">
                      {match.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-8">
          <div className="rounded-3xl bg-[#081423] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black">Stats</h3>
              <button className="text-yellow-400 font-semibold">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5"
                >
                  <p className="text-yellow-400 text-sm font-bold uppercase">
                    {stat.title}
                  </p>

                  <div className="flex items-end justify-between mt-4">
                    <h4 className="text-xl font-bold">
                      {stat.player}
                    </h4>

                    <div className="text-4xl font-black text-blue-300">
                      {stat.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
