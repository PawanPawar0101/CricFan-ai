import React, { useState } from 'react';
import { useMatch } from '../../context/MatchContext';
import { TeamFlag } from '../common/TeamFlag';
import { Calendar, MapPin, Radio, CheckCircle, ArrowRight } from 'lucide-react';

export const MatchesView: React.FC = () => {
  const { matches, selectMatch, setCurrentNav } = useMatch();
  const [filter, setFilter] = useState<'ALL' | 'LIVE' | 'UPCOMING' | 'COMPLETED'>('ALL');

  const filteredMatches = matches.filter((m) => {
    if (filter === 'ALL') return true;
    return m.status === filter;
  });

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto py-4">
      {/* Header and Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
            International Cricket Schedule & Tournaments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time score updates, live simulations, and upcoming match fixtures
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#121832] rounded-xl border border-slate-200 dark:border-purple-900/30 text-xs font-semibold">
          {(['ALL', 'LIVE', 'UPCOMING', 'COMPLETED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === status
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMatches.map((m) => {
          const isLive = m.status === 'LIVE';

          return (
            <div
              key={m.id}
              onClick={() => {
                selectMatch(m.id);
                setCurrentNav('live');
              }}
              className="group p-5 rounded-2xl bg-[#0B0F24]/80 dark:bg-[#0B0F24]/90 bg-white/95 border border-slate-200 dark:border-purple-900/30 hover:border-purple-500/70 shadow-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{m.series}</span>
                {isLive ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    LIVE
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-purple-400">
                    {m.status}
                  </span>
                )}
              </div>

              {/* Teams & Scores */}
              <div className="flex items-center justify-between py-2 border-y border-slate-200 dark:border-purple-900/20 my-2">
                <div className="flex items-center gap-3">
                  <TeamFlag teamCode={m.team1.teamCode} size="md" />
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white block">
                      {m.team1.teamName}
                    </span>
                    {isLive && (
                      <span className="font-mono text-xs text-purple-400">
                        {m.team1.score}/{m.team1.wickets} ({m.team1.overs} ov)
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-400 uppercase">vs</span>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white block">
                      {m.team2.teamName}
                    </span>
                    {isLive && (
                      <span className="font-mono text-xs text-cyan-400">
                        {m.team2.score}/{m.team2.wickets} ({m.team2.overs} ov)
                      </span>
                    )}
                  </div>
                  <TeamFlag teamCode={m.team2.teamCode} size="md" />
                </div>
              </div>

              {/* Footer info */}
              <div className="flex items-center justify-between pt-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate max-w-[200px]">{m.venue}</span>
                </div>
                <div className="flex items-center gap-1 text-purple-500 group-hover:text-purple-400 font-semibold">
                  <span>Open Match</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
