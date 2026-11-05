import React from 'react';
import { useMatch } from '../../context/MatchContext';
import { Activity, Flame, ShieldAlert, Award, ArrowUpRight } from 'lucide-react';

export const InsightsTab: React.FC = () => {
  const { currentMatch } = useMatch();
  const insight = currentMatch.insight;

  return (
    <div className="rounded-2xl bg-[#0B0F24]/80 dark:bg-[#0B0F24]/90 bg-white/95 border border-slate-200 dark:border-purple-900/30 p-4 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col gap-5">
      {/* Overview Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-[#151D3B] to-indigo-950/40 border border-purple-500/30">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-400 mb-1 uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>Strategic Match Assessment</span>
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white font-heading mb-2">
          {insight.headline}
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {insight.requiredRateAnalysis}
        </p>
      </div>

      {/* Grid of Key Factors & Pressure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Batting Pressure & Bowling Advantage */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 mb-3">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>Pressure Gauges</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Batting Pressure</span>
                  <span className="text-rose-400 font-bold">{insight.battingPressure}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Bowling Control</span>
                  <span className="text-cyan-400 font-bold">{insight.bowlingAdvantage}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full w-[65%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Turning Points List */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Key Turning Points</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {insight.turningPoints.map((tp, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <span>{tp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
