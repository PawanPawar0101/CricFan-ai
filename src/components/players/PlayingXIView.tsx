import React from 'react';
import { Users, Handshake, Target, TrendingDown } from 'lucide-react';
import { useMatch } from '../../context/MatchContext';
import { TeamFlag } from '../common/TeamFlag';

export const PlayingXIView: React.FC = () => {
  const { currentMatch, selectedTeamKey, setSelectedTeamKey } = useMatch();

  const selectedTeam = selectedTeamKey === 'team1' ? currentMatch.team1 : currentMatch.team2;
  const opposingTeam = selectedTeamKey === 'team1' ? currentMatch.team2 : currentMatch.team1;

  const isCurrentTeamBatting = selectedTeam.isBatting;

  return (
    <div className="rounded-2xl bg-[#0B0F24]/80 dark:bg-[#0B0F24]/90 bg-white/95 border border-slate-200 dark:border-purple-900/30 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-purple-900/20">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-heading">
            Playing XI & Player Performance
          </h2>
        </div>

        {/* Status pill right */}
        <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#121832] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-purple-900/30">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Innings: 2nd</span>
          <span className="text-slate-400">|</span>
          <span className="text-cyan-400 font-bold">{currentMatch.team1.teamCode} Batting</span>
        </div>
      </div>

      {/* Team Selector Buttons */}
      <div className="flex items-center gap-2.5 mt-3.5 mb-4 overflow-x-auto no-scrollbar">
        {/* Team 1 button */}
        <button
          onClick={() => setSelectedTeamKey('team1')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            selectedTeamKey === 'team1'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400/50'
              : 'bg-slate-100 dark:bg-[#121832] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-purple-900/20 hover:border-purple-500/40'
          }`}
        >
          <TeamFlag teamCode={currentMatch.team1.teamCode} size="sm" />
          <span>{currentMatch.team1.teamCode} ({currentMatch.team1.players.length})</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-white">
            {currentMatch.team1.isBatting ? 'Batting' : 'Bowling'}
          </span>
        </button>

        {/* Team 2 button */}
        <button
          onClick={() => setSelectedTeamKey('team2')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            selectedTeamKey === 'team2'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400/50'
              : 'bg-slate-100 dark:bg-[#121832] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-purple-900/20 hover:border-purple-500/40'
          }`}
        >
          <TeamFlag teamCode={currentMatch.team2.teamCode} size="sm" />
          <span>{currentMatch.team2.teamCode} ({currentMatch.team2.players.length})</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
            {currentMatch.team2.isBatting ? 'Batting' : 'Bowling'}
          </span>
        </button>
      </div>

      {/* Main Grid: Left Table (65%) and Right Supporting Panels (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Player Stats Table */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
            <span className="text-purple-400">👕</span>
            <span>
              {selectedTeam.teamName} — Playing XI ({selectedTeam.players.length})
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-purple-900/20 bg-slate-50/70 dark:bg-[#121832]/60 shadow-inner">
            <table className="w-full text-left text-xs border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-purple-900/30 text-slate-400 font-semibold text-[11px] uppercase bg-slate-100/50 dark:bg-[#0e1329]/50">
                  <th className="py-2.5 px-3 w-8">#</th>
                  <th className="py-2.5 px-3">Player</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-2 text-right">R</th>
                  <th className="py-2.5 px-2 text-right">B</th>
                  <th className="py-2.5 px-2 text-right">SR</th>
                  <th className="py-2.5 px-2 text-right">4s</th>
                  <th className="py-2.5 px-2 text-right pr-3">6s</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-purple-900/20 text-slate-800 dark:text-slate-200 font-medium">
                {selectedTeam.players.map((player, index) => {
                  const isBatting = player.status === 'Batting';
                  const isOut = player.status === 'Out';

                  return (
                    <tr
                      key={player.id}
                      className={`hover:bg-purple-500/5 transition-colors ${
                        player.isStriker
                          ? 'bg-purple-500/10 dark:bg-purple-600/15'
                          : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">
                        {index + 1}
                      </td>

                      {/* Player info */}
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={player.avatar}
                            alt={player.name}
                            referrerPolicy="no-referrer"
                            className="w-6 h-6 rounded-full object-cover border border-purple-500/30 shrink-0"
                            onError={(e) => {
                              // Resilient fallback container
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 dark:text-white truncate">
                              {player.name}
                            </span>
                            {player.isCaptain && (
                              <span className="text-[10px] text-purple-400 font-semibold">(c)</span>
                            )}
                            {player.isWicketKeeper && (
                              <span className="text-[10px] text-cyan-400 font-semibold">(wk)</span>
                            )}
                            {player.isStriker && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" title="On Strike" />
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-2.5 px-3">
                        {isBatting ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                            Batting
                          </span>
                        ) : isOut ? (
                          <div className="flex items-center gap-1 text-[10px]">
                            <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold">
                              Out
                            </span>
                            <span className="text-slate-400 text-[10px] truncate max-w-[110px]" title={player.dismissal}>
                              {player.dismissal}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400">
                            Yet to bat
                          </span>
                        )}
                      </td>

                      {/* Batting Stats */}
                      <td className="py-2.5 px-2 text-right font-bold text-slate-900 dark:text-white font-mono-numbers">
                        {player.runs !== undefined ? player.runs : '-'}
                      </td>
                      <td className="py-2.5 px-2 text-right text-slate-500 dark:text-slate-400 font-mono-numbers">
                        {player.balls !== undefined ? player.balls : '-'}
                      </td>
                      <td className="py-2.5 px-2 text-right text-slate-700 dark:text-slate-300 font-mono-numbers font-semibold">
                        {player.strikeRate !== undefined ? player.strikeRate.toFixed(1) : '-'}
                      </td>
                      <td className="py-2.5 px-2 text-right text-slate-500 dark:text-slate-400 font-mono-numbers">
                        {player.fours !== undefined ? player.fours : '-'}
                      </td>
                      <td className="py-2.5 px-2 text-right pr-3 font-semibold text-purple-600 dark:text-purple-400 font-mono-numbers">
                        {player.sixes !== undefined ? player.sixes : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Supporting Match Cards (Partnership, Current Bowler, Fall of Wickets) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3">
          {/* 1. Current Partnership Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30 shadow-md">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
              <Handshake className="w-3.5 h-3.5 text-cyan-400" />
              <span>Current Partnership</span>
            </div>

            <div className="text-center py-2">
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-heading">
                {currentMatch.currentPartnership.runs} runs{' '}
                <span className="text-xs font-normal text-slate-400">
                  ({currentMatch.currentPartnership.balls} balls)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-around pt-2 border-t border-slate-200 dark:border-purple-900/20">
              {/* Batter 1 */}
              <div className="flex items-center gap-2">
                <img
                  src={currentMatch.currentPartnership.player1.avatar}
                  alt={currentMatch.currentPartnership.player1.name}
                  className="w-8 h-8 rounded-full object-cover border border-purple-500/40 shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {currentMatch.currentPartnership.player1.name}
                  </div>
                  <div className="text-[11px] font-mono text-purple-400">
                    {currentMatch.currentPartnership.player1.runs} ({currentMatch.currentPartnership.player1.balls})
                  </div>
                </div>
              </div>

              {/* Batter 2 */}
              <div className="flex items-center gap-2">
                <img
                  src={currentMatch.currentPartnership.player2.avatar}
                  alt={currentMatch.currentPartnership.player2.name}
                  className="w-8 h-8 rounded-full object-cover border border-purple-500/40 shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {currentMatch.currentPartnership.player2.name}
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400">
                    {currentMatch.currentPartnership.player2.runs} ({currentMatch.currentPartnership.player2.balls})
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Current Bowler Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30 shadow-md">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
              <Target className="w-3.5 h-3.5 text-purple-400" />
              <span>Current Bowler</span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={currentMatch.currentBowler.avatar}
                alt={currentMatch.currentBowler.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-500 shrink-0"
              />
              <div className="flex-1">
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {currentMatch.currentBowler.name}
                </div>
                <div className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                  {currentMatch.currentBowler.overs} — {currentMatch.currentBowler.maidens || 0} — {currentMatch.currentBowler.runsConceded} — {currentMatch.currentBowler.wickets}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  Econ: {currentMatch.currentBowler.economy?.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Fall of Wickets Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#121832] border border-slate-200 dark:border-purple-900/30 shadow-md">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
              <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
              <span>Fall of Wickets</span>
            </div>

            <div className="space-y-1.5">
              {selectedTeam.fallOfWickets.map((fow) => (
                <div
                  key={fow.wicketNumber}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-slate-100/60 dark:bg-[#151D38]/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold flex items-center justify-center">
                      {fow.wicketNumber}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {fow.score}/{fow.wicketNumber}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({fow.over})
                    </span>
                  </div>
                  <span className="text-slate-600 dark:text-slate-300 font-medium">
                    {fow.player}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
