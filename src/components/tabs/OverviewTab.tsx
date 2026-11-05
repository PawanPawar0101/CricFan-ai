import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useMatch } from '../../context/MatchContext';
import { Zap, Flame, Shield, TrendingUp } from 'lucide-react';

export const OverviewTab: React.FC = () => {
  const { currentMatch } = useMatch();

  const data = currentMatch.runProgression;

  return (
    <div className="flex flex-col gap-5">
      {/* Run Progression Chart */}
      <div className="rounded-2xl bg-[#0B0F24]/80 dark:bg-[#0B0F24]/90 bg-white/95 border border-slate-200 dark:border-purple-900/30 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
              Innings Run Progression (Worm Graph)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comparative run progression over 20 overs
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-2.5 h-0.5 bg-blue-500 rounded" />
              {currentMatch.team1.teamCode}
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-0.5 bg-amber-400 rounded" />
              {currentMatch.team2.teamCode}
            </span>
          </div>
        </div>

        <div className="h-56 sm:h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="over" stroke="#94A3B8" fontSize={11} tickFormatter={(v) => `Ov ${v}`} />
              <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 200]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172E',
                  borderColor: '#8B5CF6',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="team1Runs"
                name={currentMatch.team1.teamCode}
                stroke="#38BDF8"
                strokeWidth={3}
                dot={{ r: 3, fill: '#38BDF8' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="team2Runs"
                name={currentMatch.team2.teamCode}
                stroke="#FBBF24"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 2, fill: '#FBBF24' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Match Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>Boundaries</span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono-numbers">
            12 <span className="text-xs font-normal text-slate-400">4s</span> • 6 <span className="text-xs font-normal text-slate-400">6s</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Dot Ball %</span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono-numbers">
            28.4%
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Powerplay (1-6)</span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono-numbers">
            46/1
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Top Striker</span>
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
            Rohit (172.2)
          </div>
        </div>
      </div>
    </div>
  );
};
