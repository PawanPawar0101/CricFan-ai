import React, { useState } from 'react';
import { Sparkles, Filter } from 'lucide-react';
import { useMatch } from '../../context/MatchContext';

export const CommentaryTab: React.FC = () => {
  const { currentMatch } = useMatch();
  const [filter, setFilter] = useState<'ALL' | 'BOUNDARIES' | 'WICKETS'>('ALL');

  const commentaryList = currentMatch.commentary.filter((item) => {
    if (filter === 'BOUNDARIES') return item.type === 'FOUR' || item.type === 'SIX';
    if (filter === 'WICKETS') return item.type === 'WICKET';
    return true;
  });

  return (
    <div className="rounded-2xl bg-[#0B0F24]/80 dark:bg-[#0B0F24]/90 bg-white/95 border border-slate-200 dark:border-purple-900/30 p-4 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col gap-4">
      {/* Header and Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-purple-900/20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
            Live AI Ball-by-Ball Commentary
          </h3>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#121832] rounded-xl border border-slate-200 dark:border-purple-900/30 text-xs font-semibold">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === 'ALL'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            All Balls
          </button>
          <button
            onClick={() => setFilter('BOUNDARIES')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === 'BOUNDARIES'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Boundaries
          </button>
          <button
            onClick={() => setFilter('WICKETS')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === 'WICKETS'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Wickets
          </button>
        </div>
      </div>

      {/* Ball by Ball List */}
      <div className="space-y-3">
        {commentaryList.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No commentary matching this filter.
          </div>
        ) : (
          commentaryList.map((c) => {
            const isFour = c.type === 'FOUR';
            const isSix = c.type === 'SIX';
            const isWicket = c.type === 'WICKET';

            return (
              <div
                key={c.id}
                className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/20 hover:border-purple-500/30 transition-all flex items-start gap-3"
              >
                {/* Over & Ball Badge */}
                <div className="flex flex-col items-center justify-center min-w-[50px] p-2 rounded-xl bg-slate-200/70 dark:bg-[#151D3B] border border-slate-300 dark:border-purple-800/30 shrink-0">
                  <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                    {c.over}.{c.ball}
                  </span>
                  <span
                    className={`mt-1 text-[10px] font-black px-1.5 py-0.5 rounded ${
                      isSix
                        ? 'bg-purple-600 text-white'
                        : isFour
                        ? 'bg-blue-600 text-white'
                        : isWicket
                        ? 'bg-rose-600 text-white'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {isWicket ? 'W' : `${c.runs}r`}
                  </span>
                </div>

                {/* Commentary Narrative */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    <span>{c.bowler} to {c.batter}</span>
                    <span>•</span>
                    <span className="font-mono text-[10px]">{c.timestamp}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {c.text}
                  </p>

                  {/* AI Note Callout */}
                  {c.aiNote && (
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-purple-600 dark:text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20 w-fit">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span>{c.aiNote}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
