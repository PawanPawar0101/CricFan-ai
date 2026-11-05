import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import { useMatch } from '../../context/MatchContext';

export const WinningProbability: React.FC = () => {
  const { currentMatch } = useMatch();
  const prob = currentMatch.winProbability;

  const team1Chance = prob.team1Chance;
  const team2Chance = prob.team2Chance;

  // Donut geometry
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffsetTeam1 = circumference - (team1Chance / 100) * circumference;

  return (
    <div className="rounded-2xl bg-[#0B0F24]/80 dark:bg-[#0B0F24]/90 bg-white/95 border border-slate-200 dark:border-purple-900/30 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="font-heading tracking-wide">Winning Probability</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
          <TrendingUp className="w-3 h-3" />
          <span>Live Model</span>
        </div>
      </div>

      {/* Donut Chart and Legend Row */}
      <div className="flex items-center justify-between gap-4">
        {/* Animated Circular Donut */}
        <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="team1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <linearGradient id="team2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>

            {/* Background / Opponent Arc (Australia 32%) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="url(#team2Gradient)"
              strokeWidth="11"
              strokeLinecap="round"
            />

            {/* Team 1 Arc (India 68%) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="url(#team1Gradient)"
              strokeWidth="11"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffsetTeam1}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Numbers */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading tabular-nums tracking-tight">
              {team1Chance}%
            </span>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-300 uppercase tracking-tight">
              {prob.team1Code} Winning
            </span>
          </div>
        </div>

        {/* Legend on Right */}
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {prob.team1Name}
              </span>
            </div>
            <span className="text-xs font-mono font-black text-blue-500 dark:text-blue-400">
              {team1Chance}%
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {prob.team2Name}
              </span>
            </div>
            <span className="text-xs font-mono font-black text-amber-500 dark:text-amber-400">
              {team2Chance}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
