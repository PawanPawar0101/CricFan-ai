import React from 'react';
import { MapPin, Target, Sparkles, Users, FileText, BarChart2, LayoutDashboard } from 'lucide-react';
import { useMatch, MatchTab } from '../../context/MatchContext';
import { TeamFlag } from '../common/TeamFlag';

export const ScoreboardCard: React.FC = () => {
  const { currentMatch, activeTab, setActiveTab } = useMatch();
  const isLive = currentMatch.status === 'LIVE';

  return (
    <div className="flex flex-col gap-3.5">
      {/* Main Scoreboard Box */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0B0F24]/80 dark:bg-[#0B0F24]/90 bg-white/95 border border-slate-200 dark:border-purple-900/30 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
        {/* Subtle top purple/blue ambient gradient */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-indigo-600" />
        <div className="absolute top-1 right-1/4 w-72 h-16 bg-purple-500/10 blur-3xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {currentMatch.series} • {currentMatch.matchNumber}
          </div>

          <div className="text-center order-first sm:order-none w-full sm:w-auto">
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight font-heading">
              {currentMatch.team1.teamCode} <span className="text-purple-400 font-medium">vs</span> {currentMatch.team2.teamCode}
            </h1>
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>{currentMatch.venue}</span>
            </div>
          </div>

          <div>
            {isLive ? (
              <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-500 text-white shadow-md shadow-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </span>
            ) : (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30">
                {currentMatch.status}
              </span>
            )}
          </div>
        </div>

        {/* Core Score Display Row */}
        <div className="flex items-center justify-between py-2 sm:py-3 gap-2">
          {/* Team 1 (e.g. IND) */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            <TeamFlag teamCode={currentMatch.team1.teamCode} size="lg" className="sm:w-14 sm:h-14" />
            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tabular-nums tracking-tight">
                {currentMatch.team1.score}/{currentMatch.team1.wickets}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                {currentMatch.team1.overs} Overs
              </div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mt-0.5">
                {currentMatch.team1.teamCode}
              </div>
            </div>
          </div>

          {/* Center Target Box */}
          {currentMatch.target ? (
            <div className="flex flex-col items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-100 dark:bg-[#151D3B] border border-slate-200 dark:border-purple-800/40 shadow-inner shrink-0">
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">Target</span>
              <span className="text-base sm:text-xl font-black text-slate-900 dark:text-white font-heading tabular-nums">
                {currentMatch.target}
              </span>
            </div>
          ) : (
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">VS</div>
          )}

          {/* Team 2 (e.g. AUS) */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 flex-1 text-right">
            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tabular-nums tracking-tight">
                {currentMatch.team2.score}/{currentMatch.team2.wickets}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                {currentMatch.team2.overs} Overs
              </div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mt-0.5">
                {currentMatch.team2.teamCode}
              </div>
            </div>
            <TeamFlag teamCode={currentMatch.team2.teamCode} size="lg" className="sm:w-14 sm:h-14" />
          </div>
        </div>

        {/* Bottom Summary Ribbon (matches screenshot: "India need 35 runs from 10 balls | Required RR: 21.00 | CRR: 8.51") */}
        {isLive && currentMatch.runsRequired && (
          <div className="mt-4 p-2.5 sm:p-3 rounded-xl bg-slate-100 dark:bg-[#121B38] border border-cyan-500/30 dark:border-cyan-500/20 shadow-sm flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 flex-wrap text-center">
            <div className="flex items-center gap-1.5 text-cyan-500 dark:text-cyan-400">
              <Target className="w-4 h-4 shrink-0" />
              <span>{currentMatch.statusNote}</span>
            </div>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-600 dark:text-slate-300">
              Required RR: <strong className="text-rose-500 font-mono-numbers">{currentMatch.rrr?.toFixed(2)}</strong>
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-600 dark:text-slate-300">
              CRR: <strong className="text-cyan-400 font-mono-numbers">{currentMatch.crr.toFixed(2)}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Match Navigation Tabs (Horizontally scrollable on mobile) */}
      <div className="overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-white dark:bg-[#0F172E] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-purple-900/30'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('playing-xi')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'playing-xi'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-white dark:bg-[#0F172E] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-purple-900/30'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Playing XI</span>
          </button>

          <button
            onClick={() => setActiveTab('scorecard')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'scorecard'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-white dark:bg-[#0F172E] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-purple-900/30'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Scorecard</span>
          </button>

          <button
            onClick={() => setActiveTab('commentary')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'commentary'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-white dark:bg-[#0F172E] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-purple-900/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Commentary</span>
          </button>

          <button
            onClick={() => setActiveTab('insights')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'insights'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                : 'bg-white dark:bg-[#0F172E] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-purple-900/30'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Insights</span>
          </button>
        </div>
      </div>
    </div>
  );
};
