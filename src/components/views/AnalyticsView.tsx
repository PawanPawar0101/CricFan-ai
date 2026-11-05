import React from 'react';
import { useMatch } from '../../context/MatchContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { BarChart2, TrendingUp, Zap, Target } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { currentMatch } = useMatch();

  // Over by over run comparison
  const overData = [
    { over: 'Ov 1-4', team1: 30, team2: 38 },
    { over: 'Ov 5-8', team1: 28, team2: 34 },
    { over: 'Ov 9-12', team1: 28, team2: 38 },
    { over: 'Ov 13-16', team1: 46, team2: 41 },
    { over: 'Ov 17-20', team1: 24, team2: 39 },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto py-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
          Match Analytics & Phase Breakdown
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          In-depth scoring phases, boundary percentages, and bowler economy comparisons
        </p>
      </div>

      {/* Bar Chart: Phase Scoring */}
      <div className="rounded-2xl bg-[#0B0F24]/80 dark:bg-[#0B0F24]/90 bg-white/95 border border-slate-200 dark:border-purple-900/30 p-5 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Phase Scoring Comparison (Runs per 4 Overs)
            </h3>
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="over" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172E',
                  borderColor: '#8B5CF6',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="team1" name={currentMatch.team1.teamCode} fill="#38BDF8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="team2" name={currentMatch.team2.teamCode} fill="#A855F7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Analytical Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Middle Overs Acceleration</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            India scored 74 runs between overs 11 and 16, hitting 4 sixes against spin at a strike rate of 168.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <span>Boundary Percentage</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            64.1% of India’s runs have come from boundaries, compared to 58.9% for Australia.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Death Overs Projection</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            If India maintain current momentum without losing Rohit Sharma, win probability peaks at 82%.
          </p>
        </div>
      </div>
    </div>
  );
};
