import React, { useState } from 'react';
import { useMatch } from '../../context/MatchContext';
import { TeamFlag } from '../common/TeamFlag';

export const ScorecardTab: React.FC = () => {
  const { currentMatch } = useMatch();
  const [selectedInnings, setSelectedInnings] = useState<'1' | '2'>('2');

  const inningsTeam = selectedInnings === '2' ? currentMatch.team1 : currentMatch.team2;
  const bowlingTeam = selectedInnings === '2' ? currentMatch.team2 : currentMatch.team1;

  return (
    <div className="rounded-2xl bg-[#0B0F24]/80 dark:bg-[#0B0F24]/90 bg-white/95 border border-slate-200 dark:border-purple-900/30 p-4 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col gap-5">
      {/* Innings Selector Segmented Control */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-purple-900/20 pb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
          Complete Match Scorecard
        </h3>
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#121832] rounded-xl border border-slate-200 dark:border-purple-900/30 text-xs font-semibold">
          <button
            onClick={() => setSelectedInnings('1')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedInnings === '1'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            1st Inn ({currentMatch.team2.teamCode} {currentMatch.team2.score}/{currentMatch.team2.wickets})
          </button>
          <button
            onClick={() => setSelectedInnings('2')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedInnings === '2'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            2nd Inn ({currentMatch.team1.teamCode} {currentMatch.team1.score}/{currentMatch.team1.wickets})
          </button>
        </div>
      </div>

      {/* Batting Section */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-800 dark:text-slate-200">
          <TeamFlag teamCode={inningsTeam.teamCode} size="sm" />
          <span>{inningsTeam.teamName} Batting</span>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-purple-900/20 bg-slate-50 dark:bg-[#121832]">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-purple-900/30 text-slate-400 uppercase text-[10px] bg-slate-100/50 dark:bg-[#0e1329]/50">
                <th className="py-2.5 px-3">Batter</th>
                <th className="py-2.5 px-3">Dismissal</th>
                <th className="py-2.5 px-2 text-right">R</th>
                <th className="py-2.5 px-2 text-right">B</th>
                <th className="py-2.5 px-2 text-right">4s</th>
                <th className="py-2.5 px-2 text-right">6s</th>
                <th className="py-2.5 px-3 text-right">SR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-purple-900/20 text-slate-800 dark:text-slate-200">
              {inningsTeam.players.map((p) => (
                <tr key={p.id} className="hover:bg-purple-500/5">
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                    {p.name} {p.isCaptain && '(c)'} {p.isWicketKeeper && '(wk)'}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 text-[11px]">
                    {p.status === 'Batting' ? (
                      <span className="text-emerald-400 font-bold">not out</span>
                    ) : p.dismissal ? (
                      p.dismissal
                    ) : (
                      'did not bat'
                    )}
                  </td>
                  <td className="py-2.5 px-2 text-right font-bold text-slate-900 dark:text-white font-mono-numbers">
                    {p.runs !== undefined ? p.runs : '-'}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-400 font-mono-numbers">
                    {p.balls !== undefined ? p.balls : '-'}
                  </td>
                  <td className="py-2.5 px-2 text-right text-slate-400 font-mono-numbers">
                    {p.fours !== undefined ? p.fours : '-'}
                  </td>
                  <td className="py-2.5 px-2 text-right text-purple-400 font-mono-numbers">
                    {p.sixes !== undefined ? p.sixes : '-'}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono-numbers">
                    {p.strikeRate !== undefined ? p.strikeRate.toFixed(1) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bowling Section */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-800 dark:text-slate-200">
          <TeamFlag teamCode={bowlingTeam.teamCode} size="sm" />
          <span>{bowlingTeam.teamName} Bowling</span>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-purple-900/20 bg-slate-50 dark:bg-[#121832]">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-purple-900/30 text-slate-400 uppercase text-[10px] bg-slate-100/50 dark:bg-[#0e1329]/50">
                <th className="py-2.5 px-3">Bowler</th>
                <th className="py-2.5 px-2 text-right">O</th>
                <th className="py-2.5 px-2 text-right">M</th>
                <th className="py-2.5 px-2 text-right">R</th>
                <th className="py-2.5 px-2 text-right">W</th>
                <th className="py-2.5 px-3 text-right">ECON</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-purple-900/20 text-slate-800 dark:text-slate-200">
              {bowlingTeam.players
                .filter((p) => p.overs && p.overs > 0)
                .map((b) => (
                  <tr key={b.id} className="hover:bg-purple-500/5">
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                      {b.name}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono-numbers">{b.overs}</td>
                    <td className="py-2.5 px-2 text-right text-slate-400 font-mono-numbers">{b.maidens || 0}</td>
                    <td className="py-2.5 px-2 text-right text-slate-400 font-mono-numbers">{b.runsConceded}</td>
                    <td className="py-2.5 px-2 text-right font-bold text-purple-400 font-mono-numbers">{b.wickets}</td>
                    <td className="py-2.5 px-3 text-right font-mono-numbers">{b.economy?.toFixed(2)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
